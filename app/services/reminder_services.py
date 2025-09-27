import asyncpg
from typing import List, Optional
from datetime import datetime, time
from ..schemas.schemas import ReminderSetup, ReminderScheduleBase, ReminderUpdate


class ReminderService:
    def __init__(self, pool: asyncpg.Pool):
        self.pool = pool

    async def setup_reminder(self, reminder: ReminderSetup, nurse_id: str) -> str:
        """Setup a medication reminder for a patient"""
        async with self.pool.acquire() as conn:
            # Verify patient exists
            patient_exists = await conn.fetchval(
                "SELECT 1 FROM patients WHERE id = $1",
                reminder.patient_id
            )
            if not patient_exists:
                raise ValueError("Patient not found")

            # Verify nurse exists
            nurse_exists = await conn.fetchval(
                "SELECT 1 FROM nurses WHERE id = $1",
                nurse_id
            )
            if not nurse_exists:
                raise ValueError("Nurse not found")

            # Create reminder using your exact schema fields
            result = await conn.fetchrow(
                """
                INSERT INTO reminders (patient_id, nurse_id, message, scheduled_time, 
                                     frequency_interval, calls_per_day, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
                RETURNING id
                """,
                reminder.patient_id, nurse_id, reminder.message,
                reminder.scheduled_time, reminder.frequency_interval, reminder.calls_per_day
            )
            return str(result['id'])

    async def get_reminders_by_patient(self, patient_id: str) -> List[dict]:
        """Get all reminders for a specific patient"""
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT r.id, r.patient_id, r.nurse_id, r.message, r.scheduled_time,
                       r.frequency_interval, r.calls_per_day, r.status, r.call_duration,
                       r.attempted_at, r.completed_at, r.created_at, r.updated_at,
                       p.name as patient_name, n.name as nurse_name
                FROM reminders r
                JOIN patients p ON r.patient_id = p.id
                JOIN nurses n ON r.nurse_id = n.id
                WHERE r.patient_id = $1
                ORDER BY r.scheduled_time
                """,
                patient_id
            )
            return [dict(row) for row in results]

    async def get_reminders_by_nurse(self, nurse_id: str) -> List[dict]:
        """Get all reminders managed by a specific nurse"""
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT r.id, r.patient_id, r.message, r.scheduled_time,
                       r.frequency_interval, r.calls_per_day, r.status,
                       p.name as patient_name, p.phone_number as patient_phone
                FROM reminders r
                JOIN patients p ON r.patient_id = p.id
                WHERE r.nurse_id = $1 AND r.status = 'active'
                ORDER BY r.scheduled_time
                """,
                nurse_id
            )
            return [dict(row) for row in results]

    async def get_due_reminders(self) -> List[dict]:
        """Get reminders that are due for calling"""
        async with self.pool.acquire() as conn:
            now = datetime.utcnow()
            print(f"DEBUG: Current UTC time: {now}")

            # Get ALL reminders first to debug
            all_results = await conn.fetch(
                """
                SELECT r.id, r.scheduled_time, r.status, r.attempted_at,
                       p.name as patient_name
                FROM reminders r
                JOIN patients p ON r.patient_id = p.id
                ORDER BY r.scheduled_time
                """
            )

            print(f"DEBUG: Found {len(all_results)} total reminders:")
            for row in all_results:
                print(f"  - ID: {str(row['id'])[:8]}..., scheduled: {row['scheduled_time']}, status: {row['status']}")

            # Now get due ones
            results = await conn.fetch(
                """
                SELECT r.id, r.patient_id, r.nurse_id, r.message, r.scheduled_time,
                       r.frequency_interval, r.calls_per_day, r.attempted_at,
                       p.name as patient_name, p.phone_number as patient_phone, 
                       p.timezone as patient_timezone
                FROM reminders r
                JOIN patients p ON r.patient_id = p.id
                WHERE r.scheduled_time <= $1 
                  AND (r.status IS NULL OR r.status = 'active')
                  AND (r.attempted_at IS NULL OR r.attempted_at < NOW() - INTERVAL '1 hour')
                ORDER BY r.scheduled_time
                """,
                now
            )

            print(f"DEBUG: Found {len(results)} due reminders")
            return [dict(row) for row in results]

    async def update_reminder_attempt(self, reminder_id: str, success: bool = False, call_duration: int = None):
        """Update reminder after call attempt"""
        async with self.pool.acquire() as conn:
            if success:
                # Mark as completed
                await conn.execute(
                    """
                    UPDATE reminders 
                    SET attempted_at = NOW(), 
                        completed_at = NOW(),
                        status = 'completed',
                        call_duration = $2,
                        updated_at = NOW()
                    WHERE id = $1
                    """,
                    reminder_id, call_duration
                )
            else:
                # Mark as attempted but not completed
                await conn.execute(
                    """
                    UPDATE reminders 
                    SET attempted_at = NOW(),
                        call_duration = $2,
                        updated_at = NOW()
                    WHERE id = $1
                    """,
                    reminder_id, call_duration
                )

    async def add_reminder_schedule(self, schedule: ReminderScheduleBase) -> bool:
        """Add a scheduled time for a reminder (for recurring reminders)"""
        async with self.pool.acquire() as conn:
            try:
                await conn.execute(
                    """
                    INSERT INTO reminder_schedules (reminder_id, day_of_week, time_of_day, 
                                                   is_active, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, NOW(), NOW())
                    """,
                    schedule.reminder_id, schedule.day_of_week,
                    schedule.time_of_day, schedule.is_active
                )
                return True
            except asyncpg.UniqueViolationError:
                raise ValueError("Schedule already exists for this reminder and time")

    async def update_reminder(self, reminder_id: str, reminder_update: ReminderUpdate) -> bool:
        """Update reminder details"""
        async with self.pool.acquire() as conn:
            update_fields = []
            params = []
            param_count = 1

            for field, value in reminder_update.dict(exclude_unset=True).items():
                update_fields.append(f"{field} = ${param_count}")
                params.append(value)
                param_count += 1

            if not update_fields:
                exists = await conn.fetchval("SELECT 1 FROM reminders WHERE id = $1", reminder_id)
                return exists is not None

            # Always update the updated_at timestamp
            update_fields.append(f"updated_at = ${param_count}")
            params.append(datetime.utcnow())
            param_count += 1

            query = f"""
                UPDATE reminders 
                SET {', '.join(update_fields)}
                WHERE id = ${param_count}
            """
            params.append(reminder_id)

            result = await conn.execute(query, *params)
            return result == "UPDATE 1"

    async def delete_reminder(self, reminder_id: str) -> bool:
        """Delete/deactivate a reminder"""
        async with self.pool.acquire() as conn:
            result = await conn.execute(
                "UPDATE reminders SET status = 'cancelled', updated_at = NOW() WHERE id = $1",
                reminder_id
            )
            return result == "UPDATE 1"

    async def store_call_tracking(self, reminder_id: str, call_id: str, call_data: dict):
        """Store call tracking information in the reminders table for now"""
        async with self.pool.acquire() as conn:
            # Since you don't have a separate call_logs table, we'll store basic info in reminders
            await conn.execute(
                """
                UPDATE reminders 
                SET attempted_at = NOW(), updated_at = NOW()
                WHERE id = $1
                """,
                reminder_id
            )
            # You could add a call_logs table later if needed
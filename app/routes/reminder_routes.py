from fastapi import APIRouter, HTTPException
from ..schemas.schemas import ReminderSetup, ReminderScheduleBase, ReminderUpdate
from ..services.reminder_services import ReminderService


def create_reminder_router(reminder_service: ReminderService) -> APIRouter:
    router = APIRouter(prefix="/reminders", tags=["reminders"])

    @router.post("/setup")
    async def setup_reminder(reminder: ReminderSetup):
        """Setup a new medication reminder - nurse_id must be in the request body"""
        try:
            # Get nurse_id from the request body
            nurse_id = reminder.nurse_id
            reminder_id = await reminder_service.setup_reminder(reminder, nurse_id)
            return {
                "message": "Reminder setup successfully",
                "reminder_id": reminder_id,
                "scheduled_time": reminder.scheduled_time,
                "patient_id": reminder.patient_id
            }
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except AttributeError:
            raise HTTPException(status_code=400, detail="nurse_id is required in the request body")

    @router.get("/patient/{patient_id}")
    async def get_patient_reminders(patient_id: str):
        """Get all reminders for a specific patient"""
        return await reminder_service.get_reminders_by_patient(patient_id)

    @router.get("/nurse/{nurse_id}")
    async def get_nurse_reminders(nurse_id: str):
        """Get all reminders managed by a specific nurse"""
        return await reminder_service.get_reminders_by_nurse(nurse_id)

    @router.get("/due")
    async def get_due_reminders():
        """Get reminders that are due for calling"""
        return await reminder_service.get_due_reminders()

    @router.post("/schedule")
    async def add_reminder_schedule(schedule: ReminderScheduleBase):
        """Add a scheduled time for recurring reminders"""
        try:
            success = await reminder_service.add_reminder_schedule(schedule)
            if success:
                return {"message": "Schedule added successfully"}
            raise HTTPException(status_code=400, detail="Failed to add schedule")
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    @router.patch("/{reminder_id}")
    async def update_reminder(reminder_id: str, reminder_update: ReminderUpdate):
        """Update reminder details"""
        success = await reminder_service.update_reminder(reminder_id, reminder_update)
        if not success:
            raise HTTPException(status_code=404, detail="Reminder not found")
        return {"message": "Reminder updated successfully"}

    @router.post("/{reminder_id}/attempt")
    async def mark_reminder_attempted(reminder_id: str, success: bool = False, call_duration: int = None):
        """Mark a reminder as attempted (called)"""
        await reminder_service.update_reminder_attempt(reminder_id, success, call_duration)
        return {"message": "Reminder attempt recorded"}

    @router.delete("/{reminder_id}")
    async def cancel_reminder(reminder_id: str):
        """Cancel/deactivate a reminder"""
        success = await reminder_service.delete_reminder(reminder_id)
        if not success:
            raise HTTPException(status_code=404, detail="Reminder not found")
        return {"message": "Reminder cancelled successfully"}

    return router
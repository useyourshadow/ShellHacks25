import asyncpg
from typing import List, Optional
from ..schemas.schemas import PatientBase, PatientUpdate
from typing import List


class PatientService:
    def __init__(self, pool: asyncpg.Pool):
        self.pool = pool

    async def register_patient(self, patient: PatientBase, nurse_id: str) -> str:
        async with self.pool.acquire() as conn:
            # Verify the nurse exists
            nurse_exists = await conn.fetchval(
                "SELECT 1 FROM nurses WHERE id = $1",
                nurse_id
            )
            if not nurse_exists:
                raise ValueError("Nurse not found")

            try:
                result = await conn.fetchrow(
                    """
                    INSERT INTO patients (name, phone_number, age, care_giver, care_giver_relation, disease, nurse_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id
                    """,
                    patient.name, patient.phone_number,
                    patient.age, patient.care_giver, patient.care_giver_relation, patient.disease, nurse_id
                )
                return result['id']
            except asyncpg.UniqueViolationError:
                raise ValueError("Phone number already exists")

    async def get_patients_by_nurse(self, nurse_id: str) -> List[dict]:
            async with self.pool.acquire() as conn:
                results = await conn.fetch(
                    """
                    SELECT id, name, phone_number, age, care_giver, care_giver_relation, disease
                    FROM patients
                    WHERE nurse_id = $1
                    ORDER BY name
                    """,
                    nurse_id
                )
                # Convert asyncpg records to dicts
                return [dict(row) for row in results]
    async def get_patients(self, nurse_id: Optional[str] = None) -> List[dict]:
        async with self.pool.acquire() as conn:
            if nurse_id:
                results = await conn.fetch(
                    """
                    SELECT DISTINCT p.id, p.name, p.phone_number,
                                    p.age, p.care_giver, p.care_giver_relation, p.disease,
                                    p.created_at, p.updated_at
                    FROM patients p
                    JOIN reminders r ON p.id = r.patient_id
                    WHERE r.nurse_id = $1
                    ORDER BY p.name
                    """,
                    nurse_id
                )
            else:
                results = await conn.fetch(
                    """
                    SELECT id, name, phone_number,
                           age, care_giver, care_giver_relation, disease,
                           created_at, updated_at
                    FROM patients
                    ORDER BY name
                    """
                )
            return [dict(row) for row in results]

    async def get_patient_by_id(self, patient_id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                SELECT id, name, phone_number,
                       age, care_giver, care_giver_relation, disease,
                       created_at, updated_at
                FROM patients
                WHERE id = $1
                """,
                patient_id
            )
            return dict(result) if result else None

    async def update_patient(self, patient_id: str, patient_update: PatientUpdate) -> bool:
        async with self.pool.acquire() as conn:
            # Build dynamic update query
            update_fields = []
            params = []
            param_count = 1

            for field, value in patient_update.model.model_dump(exclude_unset=True).items():
                update_fields.append(f"{field} = ${param_count}")
                params.append(value)
                param_count += 1

            if not update_fields:
                # Check if patient exists
                exists = await conn.fetchval("SELECT 1 FROM patients WHERE id = $1", patient_id)
                return exists is not None

            query = f"""
                UPDATE patients
                SET {', '.join(update_fields)}, updated_at = NOW()
                WHERE id = ${param_count}
            """
            params.append(patient_id)

            result = await conn.execute(query, *params)
            return result == "UPDATE 1"

    async def delete_patient(self, patient_id: str) -> bool:
        async with self.pool.acquire() as conn:
            result = await conn.execute(
                "DELETE FROM patients WHERE id = $1",
                patient_id
            )
            return result == "DELETE 1"

import asyncpg
from typing import List, Optional
from ..schemas.schemas import PrescriptionBase, PrescriptionUpdate
import logging


class PrescriptionService:
    def __init__(self, pool: asyncpg.Pool):
        self.pool = pool

    async def add_prescription(self, prescription: PrescriptionBase) -> str:
        async with self.pool.acquire() as conn:
            # Verify patient exists
            patient_exists = await conn.fetchval(
                "SELECT 1 FROM patients WHERE id = $1",
                prescription.patient_id
            )
            if not patient_exists:
                raise ValueError("Patient not found")

            result = await conn.fetchrow(
                """
                INSERT INTO prescriptions (patient_id, medication_name, dosage, instructions)
                VALUES ($1, $2, $3, $4)
                RETURNING id
                """,
                prescription.patient_id, prescription.medication_name,
                prescription.dosage, prescription.instructions
            )
            return result['id']

    async def get_prescriptions_by_patient(self, patient_id: str) -> List[dict]:
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT p.id, p.medication_name, p.dosage, p.instructions, 
                       p.created_at, p.updated_at, pt.name as patient_name
                FROM prescriptions p
                JOIN patients pt ON p.patient_id = pt.id
                WHERE p.patient_id = $1
                ORDER BY p.medication_name
                """,
                patient_id
            )
            return [dict(row) for row in results]

    async def get_prescription_by_id(self, prescription_id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                SELECT p.id, p.patient_id, p.medication_name, p.dosage, p.instructions,
                       p.created_at, p.updated_at, pt.name as patient_name
                FROM prescriptions p
                JOIN patients pt ON p.patient_id = pt.id
                WHERE p.id = $1
                """,
                prescription_id
            )
            return dict(result) if result else None

    async def update_prescription(self, prescription_id: str, prescription_update: PrescriptionUpdate) -> bool:
        logging.info(f"Updating prescription {prescription_id} with {prescription_update.dict(exclude_unset=True)}")
        async with self.pool.acquire() as conn:
            update_fields = []
            params = []
            param_count = 1

            for field, value in prescription_update.dict(exclude_unset=True).items():
                update_fields.append(f"{field} = ${param_count}")
                params.append(value)
                param_count += 1

            if not update_fields:
                exists = await conn.fetchval("SELECT 1 FROM prescriptions WHERE id = $1", prescription_id)
                logging.info(f"No fields to update, exists={exists}")
                return exists is not None

            query = f"""
                UPDATE prescriptions
                SET {', '.join(update_fields)}, updated_at = NOW()
                WHERE id = ${param_count}
            """
            params.append(prescription_id)
            logging.info(f"Executing query: {query} with params {params}")

            result = await conn.execute(query, *params)
            logging.info(f"Update result: {result}")
            return result == "UPDATE 1"

    async def delete_prescription(self, prescription_id: str) -> bool:
        async with self.pool.acquire() as conn:
            result = await conn.execute(
                "DELETE FROM prescriptions WHERE id = $1",
                prescription_id
            )
            return result == "DELETE 1"
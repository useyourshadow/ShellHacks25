import asyncpg
from typing import List, Optional
from schemas.schemas import NurseBase, NurseUpdate, NurseLogin


class NurseService:
    def __init__(self, pool: asyncpg.Pool):
        self.pool = pool

    async def create_nurse(self, nurse: NurseBase) -> bool:
        async with self.pool.acquire() as conn:
            try:
                await conn.execute(
                    """
                    INSERT INTO nurses (name, email, password)
                    VALUES ($1, $2, $3)
                    """,
                    nurse.name, nurse.email, nurse.password
                )
                return True
            except Exception as e:
                print(f"🚨 ERROR: {e}")
                raise

    async def authenticate_nurse(self, login_data: NurseLogin) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                "SELECT id, name, email, password FROM nurses WHERE email = $1",
                login_data.email
            )

            if result and login_data.password == result['password']:
                return {
                    "id": str(result['id']),  # Ensure string conversion
                    "name": result['name'],
                    "email": result['email']
                }
            return None

    async def get_nurses(self) -> List[dict]:
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                "SELECT id, name, email FROM nurses ORDER BY name"
            )
            return [dict(row) for row in results]

    async def get_nurse_by_id(self, nurse_id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                "SELECT id, name, email FROM nurses WHERE id = $1",
                nurse_id
            )
            return dict(result) if result else None
 
    async def update_nurse(self, nurse_id: str, nurse_update: NurseUpdate) -> bool:
        async with self.pool.acquire() as conn:
            update_fields = []
            params = []
            param_count = 1

            update_data = nurse_update.model_dump(exclude_unset=True)

            if 'password' in update_data:
                # Save raw password directly
                update_data['password'] = update_data['password']

            for field, value in update_data.items():
                update_fields.append(f"{field} = ${param_count}")
                params.append(value)
                param_count += 1

            if not update_fields:
                exists = await conn.fetchval("SELECT 1 FROM nurses WHERE id = $1", nurse_id)
                return exists is not None

            query = f"""
                UPDATE nurses 
                SET {', '.join(update_fields)} 
                WHERE id = ${param_count}
            """
            params.append(nurse_id)

            result = await conn.execute(query, *params)
            return result == "UPDATE 1"

    async def delete_nurse(self, nurse_id: str) -> bool:
        async with self.pool.acquire() as conn:
            result = await conn.execute(
                "DELETE FROM nurses WHERE id = $1",
                nurse_id
            )
            return result == "DELETE 1"

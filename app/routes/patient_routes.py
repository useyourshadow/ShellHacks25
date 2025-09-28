from fastapi import APIRouter, HTTPException
from schemas.schemas import PatientBase, PatientUpdate
from services.patient_services import PatientService

def create_patient_router(patient_service: PatientService) -> APIRouter:
    router = APIRouter(prefix="/patients", tags=["patients"])

    @router.post("/register/{nurse_id}")
    async def register_patient(nurse_id: str, patient: PatientBase):
        try:
            patient_id = await patient_service.register_patient(patient, nurse_id)
            return {
                "message": "Patient registered successfully",
                "patient_id": patient_id,
                "nurse_id": nurse_id
            }
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    @router.get("/")
    async def get_patients():
        return await patient_service.get_patients()

    @router.get("/{patient_id}")
    async def get_patient(patient_id: str):
        patient = await patient_service.get_patient_by_id(patient_id)
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        return patient

    @router.patch("/{patient_id}")
    async def update_patient(patient_id: str, patient_update: PatientUpdate):
        success = await patient_service.update_patient(patient_id, patient_update)
        if not success:
            raise HTTPException(status_code=404, detail="Patient not found")
        return {"message": "Patient updated successfully"}

    @router.delete("/{patient_id}")
    async def delete_patient(patient_id: str):
        success = await patient_service.delete_patient(patient_id)
        if not success:
            raise HTTPException(status_code=404, detail="Patient not found")
        return {"message": "Patient deleted successfully"}

    return router

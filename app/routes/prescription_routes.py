from fastapi import APIRouter, HTTPException
from ..schemas.schemas import PrescriptionBase, PrescriptionUpdate
from ..services.prescription_services import PrescriptionService


def create_prescription_router(prescription_service: PrescriptionService) -> APIRouter:
    router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])

    @router.post("/")
    async def add_prescription(prescription: PrescriptionBase):
        """Add a prescription for a patient"""
        try:
            prescription_id = await prescription_service.add_prescription(prescription)
            return {
                "message": "Prescription added successfully",
                "prescription_id": prescription_id
            }
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    @router.get("/patient/{patient_id}")
    async def get_patient_prescriptions(patient_id: str):
        """Get all prescriptions for a specific patient"""
        return await prescription_service.get_prescriptions_by_patient(patient_id)

    @router.get("/{prescription_id}")
    async def get_prescription(prescription_id: str):
        prescription = await prescription_service.get_prescription_by_id(prescription_id)
        if not prescription:
            raise HTTPException(status_code=404, detail="Prescription not found")
        return prescription

    @router.patch("/{prescription_id}")
    async def update_prescription(prescription_id: str, prescription_update: PrescriptionUpdate):
        success = await prescription_service.update_prescription(prescription_id, prescription_update)
        if not success:
            raise HTTPException(status_code=404, detail="Prescription not found")
        return {"message": "Prescription updated successfully"}

    @router.delete("/{prescription_id}")
    async def delete_prescription(prescription_id: str):
        success = await prescription_service.delete_prescription(prescription_id)
        if not success:
            raise HTTPException(status_code=404, detail="Prescription not found")
        return {"message": "Prescription deleted successfully"}

    return router
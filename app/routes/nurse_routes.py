from fastapi import APIRouter, HTTPException
from ..schemas.schemas import PatientBase, PatientUpdate
from ..services.patient_services import PatientService
from ..services.nurse_services import NurseService
from ..schemas.schemas import NurseBase, NurseLogin

def create_nurse_router(nurse_service: NurseService, patient_service: PatientService) -> APIRouter:
    router = APIRouter(prefix="/nurses", tags=["nurses"])

    # --- Nurse Management Routes ---
    @router.get("/")
    async def get_all_nurses():
        """Get all nurses"""
        return await nurse_service.get_nurses()


    @router.get("/{nurse_id}")
    async def get_nurse(nurse_id: str):
        """Get a nurse by ID"""
        nurse = await nurse_service.get_nurse_by_id(nurse_id)
        if not nurse:
            raise HTTPException(status_code=404, detail="Nurse not found")
        return nurse

    @router.post("/register")
    async def register_nurse(nurse: NurseBase):
        nurse_id = await nurse_service.create_nurse(nurse)
        return {"message": "Nurse registered", "nurse_id": nurse_id}
    
    @router.post("/login")
    async def login_nurse(login_data: NurseLogin):
        nurse = await nurse_service.authenticate_nurse(login_data)
        if not nurse:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        return {"nurse": nurse}

    # --- Patient Routes Under Nurse ---
    @router.post("/{nurse_id}/patients")
    async def register_patient(nurse_id: str, patient: PatientBase):
        """Nurse registers a new patient"""
        try:
            patient_id = await patient_service.register_patient(patient, nurse_id)
            return {
                "message": "Patient registered successfully",
                "patient_id": patient_id,
                "nurse_id": nurse_id,
            }
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    @router.get("/{nurse_id}/patients")
    async def get_patients_by_nurse(nurse_id: str):
        """Get all patients assigned to a specific nurse"""
        patients = await patient_service.get_patients_by_nurse(nurse_id)
        if not patients:
            raise HTTPException(status_code=404, detail="No patients found for this nurse")
        return patients

    return router

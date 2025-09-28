from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from services.patient_services import PatientService
from services.prescription_services import PrescriptionService
from vapi import Vapi
from vapi.types.workflow_overrides import WorkflowOverrides
from config import VAPI_API_KEY
from vapi.types.schedule_plan import SchedulePlan
from datetime import datetime, timedelta, timezone

# Initialize Vapi client once
client = Vapi(token=VAPI_API_KEY)

# This function can now be imported in routes
def schedule_patient_call(phone_number: str, patient_name: str, workflow_id: str, phone_number_id: str, pill_name: str, minutes_from_now: int = 1):
    workflow_overrides = WorkflowOverrides(
        variableValues={
            "patient_name": patient_name,
            "pill_to_take": pill_name
        }
    )

    scheduled_time = (datetime.now(timezone.utc) + timedelta(minutes=minutes_from_now)).isoformat()
    schedule_plan = SchedulePlan(earliest_at=scheduled_time)

    call = client.calls.create(
        workflow_id=workflow_id,
        phone_number_id=phone_number_id,
        customer={"number": phone_number},
        workflow_overrides=workflow_overrides,
        schedule_plan=schedule_plan
    )
    return call.id


class CallRequest(BaseModel):
    patient_id: str

WORKFLOW_ID = "c743481b-36d8-48e5-b07c-f1e3f8975d58"
PHONE_NUMBER_ID = "e1a8d7af-e4b6-4c99-adc9-8d43e2539233"
def create_test_router(pool):
    test_routes = APIRouter()
    
    @test_routes.post("/schedule_by_prescription")
    async def schedule_call_by_prescription(prescription_id: str):
        prescription_service = PrescriptionService(pool)
        prescription = await prescription_service.get_prescription_by_id(prescription_id)

        if not prescription:
            raise HTTPException(status_code=404, detail="Prescription not found")

        # Fetch patient using patient_id from prescription
        patient_service = PatientService(pool)
        patient = await patient_service.get_patient_by_id(prescription["patient_id"])

        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")

        # Schedule the call
        call_id = schedule_patient_call(
            phone_number=patient["phone_number"],
            patient_name=patient["name"],
            workflow_id=WORKFLOW_ID,
            phone_number_id=PHONE_NUMBER_ID,
            pill_name=prescription["medication_name"]
        )

        return {"status": "scheduled", "call_id": call_id}
    return test_routes
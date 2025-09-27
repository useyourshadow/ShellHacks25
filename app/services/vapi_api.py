from datetime import datetime, timedelta, timezone
from vapi import Vapi
from vapi.types.workflow_overrides import WorkflowOverrides
from vapi.types.schedule_plan import SchedulePlan

# Initialize Vapi client once
client = Vapi(token="678a6c8d-61fb-4efd-a833-48ab580b23d7")

def schedule_patient_call(phone_number: str, patient_name: str, workflow_id: str, phone_number_id: str,  pill_name: str, minutes_from_now: int = 0):
    # Set workflow overrides with patient-specific info
    workflow_overrides = WorkflowOverrides(
        variableValues={
            "patient_name": patient_name,
            "pill_to_take": pill_name
        }
    )

    # Schedule time in UTC
    scheduled_time = (datetime.now(timezone.utc) + timedelta(minutes=minutes_from_now)).isoformat()
    schedule_plan = SchedulePlan(
        earliest_at=scheduled_time
    )

    # Create the call
    call = client.calls.create(
        workflow_id=workflow_id,
        phone_number_id=phone_number_id,
        customer={"number": phone_number},
        workflow_overrides=workflow_overrides,
        schedule_plan=schedule_plan
    )

    return call.id

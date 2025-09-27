from datetime import datetime, timedelta, timezone
from vapi import Vapi
from vapi.types.workflow_overrides import WorkflowOverrides
from vapi.types.schedule_plan import SchedulePlan

client = Vapi(token="678a6c8d-61fb-4efd-a833-48ab580b23d7")

workflow_overrides = WorkflowOverrides(
    variableValues={
        "patient_name": "Oliver Jen"
    }
)

scheduled_time = (datetime.now(timezone.utc) + timedelta(minutes=1)).isoformat()
schedule_plan = SchedulePlan(
    earliest_at=scheduled_time
)
call = client.calls.create(
    workflow_id="c743481b-36d8-48e5-b07c-f1e3f8975d58",
    phone_number_id="54c0221a-ff98-411e-8691-f9fc91e7d7ad",
    customer={"number": "+19416263605"},
    workflow_overrides=workflow_overrides,
    schedule_plan=schedule_plan
)

print(call.id)
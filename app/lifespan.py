from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from .config import DATABASE_URL, pwd_context, VAPI_API_KEY
import asyncpg
import logging
from vapi import Vapi
from vapi.types.workflow_overrides import WorkflowOverrides
from vapi.types.schedule_plan import SchedulePlan
from .services.nurse_services import NurseService
from .services.patient_services import PatientService
from .services.prescription_services import PrescriptionService
from .services.reminder_services import ReminderService
from .routes.patient_routes import create_patient_router
from .routes.prescription_routes import create_prescription_router
from .routes.nurse_routes import create_nurse_router
from .routes.reminder_routes import create_reminder_router
from .routes.call import create_test_router

# Module-level logger
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)



@asynccontextmanager
async def lifespan(app):
    services = {}
    try:
        pool = await asyncpg.create_pool(DATABASE_URL)
        logger.info("Database pool created")

        # Initialize all services
        nurse_service = NurseService(pool)
        patient_service = PatientService(pool)
        prescription_service = PrescriptionService(pool)
        reminder_service = ReminderService(pool)

        services['pool'] = pool

        # Create routers
        app.include_router(create_patient_router(patient_service))    
        app.include_router(create_nurse_router(nurse_service, patient_service))
        app.include_router(create_prescription_router(prescription_service))
        app.include_router(create_reminder_router(reminder_service))
        app.include_router(create_test_router(pool))

        logger.info("All services and routes initialized successfully")

    except Exception as exc:
        logger.error(f"Failed to initialize services: {exc}")
        raise

    yield

    # Cleanup
    try:
        if services.get('pool'):
            await services['pool'].close()
            logger.info("Database connection closed")
    except Exception as exc:
        logger.error(f"Error during cleanup: {exc}")

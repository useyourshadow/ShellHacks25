from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date

class Call(BaseModel):
    medication_id: str
    schedule: date
# Nurse Models
class NurseBase(BaseModel):
    name: str
    email: str
    password: str = Field(min_length=6, max_length=12)

class NurseUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = Field(min_length=6, max_length=12)

class NurseLogin(BaseModel):
    email: str
    password: str

# Patient Models
class PatientBase(BaseModel):
    name: str
    phone_number: str
    timezone: str
    age: int
    care_giver: str
    care_giver_relation: str
    disease: str

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = None
    timezone: Optional[str] = None

# Prescription Models
class PrescriptionBase(BaseModel):
    patient_id: str
    medication_name: str
    dosage: str
    instructions: str

class PrescriptionUpdate(BaseModel):
    medication_name: Optional[str] = None
    dosage: Optional[str] = None
    instructions: Optional[str] = None

# Reminder Models
class ReminderSetup(BaseModel):
    patient_id: str
    nurse_id: str  # Add this line if it's not there
    message: str
    scheduled_time: datetime
    frequency_interval: int
    calls_per_day: int

class ReminderScheduleBase(BaseModel):
    reminder_id: str
    day_of_week: int  # 0-6 (Monday-Sunday)
    time_of_day: str  # HH:MM format
    is_active: bool = True

class ReminderUpdate(BaseModel):
    message: Optional[str] = None
    frequency_interval: Optional[int] = None
    calls_per_day: Optional[int] = None
    status: Optional[str] = None

export interface Patient {
  name: string;
  phone_number: string;
  timezone: string;
  age: number;
  care_giver: string;
  care_giver_relation: string;
  disease: string;
}

export interface Prescription {
  patient_id: string;
  medication_name: string;
  dosage: string;
  instructions: string;
}

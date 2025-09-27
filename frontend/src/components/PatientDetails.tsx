// src/components/PatientDetails.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle2 } from "lucide-react";

interface PatientDetailsProps {
  patientId: string | null;
}

export function PatientDetails({ patientId }: PatientDetailsProps) {
  const [patient, setPatient] = useState<any | null>(null);

  useEffect(() => {
    if (!patientId) return;

    axios
      .get(`http://127.0.0.1:8000/patients/${patientId}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error(err));
  }, [patientId]);

  if (!patient) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
        <UserCircle2 className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">
          Select a patient to view details
        </h3>
        <p className="mt-1">
          Choose a patient from the list to see their information and prescriptions
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{patient.name}</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
        <div><span className="font-medium">ID:</span> {patient.id}</div>
        <div><span className="font-medium">Phone:</span> {patient.phone_number}</div>
        <div><span className="font-medium">Timezone:</span> {patient.timezone}</div>
        <div><span className="font-medium">Age:</span> {patient.age}</div>
        <div><span className="font-medium">Care Giver:</span> {patient.care_giver}</div>
        <div><span className="font-medium">Relation:</span> {patient.care_giver_relation}</div>
        <div className="col-span-2"><span className="font-medium">Disease:</span> {patient.disease}</div>
        <div><span className="font-medium">Created At:</span> {new Date(patient.created_at).toLocaleString()}</div>
        <div><span className="font-medium">Updated At:</span> {new Date(patient.updated_at).toLocaleString()}</div>
      </div>
      {/* Optionally: Add prescriptions, reminders, or other actions below */}
    </div>
  );
}

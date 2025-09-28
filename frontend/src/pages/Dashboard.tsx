import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { PatientDetails } from "../components/PatientDetails";

interface DashboardProps {
  refreshKey: number;
}

export function Dashboard({ refreshKey }: DashboardProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        key={refreshKey} // remounts Sidebar after new patient
        selectedPatientId={selectedPatientId}
        onPatientSelect={setSelectedPatientId}
      />
      <PatientDetails patientId={selectedPatientId} />
    </div>
  );
}

import { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { PatientDetails } from '../components/PatientDetails';

export function Dashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedPatientId={selectedPatientId}
          onPatientSelect={setSelectedPatientId}
        />
        <PatientDetails patientId={selectedPatientId} />
      </main>
    </div>
  );
}

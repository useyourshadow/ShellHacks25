// src/components/PatientDetails.tsx
import { UserCircle2 } from 'lucide-react';

interface PatientDetailsProps {
  patientId: number | null;
}

export function PatientDetails({ patientId }: PatientDetailsProps) {
  if (!patientId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
        <UserCircle2 className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Select a patient to view details</h3>
        <p className="mt-1">Choose a patient from the list to see their information and prescriptions</p>
      </div>
    );
  }

  // When a patient is selected, you would fetch and display their details here.
  // For now, we'll just show a placeholder.
  return (
    <div className="flex-1 p-8">
       <h2 className="text-2xl font-bold">Patient Details for ID: {patientId}</h2>
       {/* Details content would go here */}
    </div>
  );
}
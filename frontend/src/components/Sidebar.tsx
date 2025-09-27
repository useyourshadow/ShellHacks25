import { useEffect, useState } from "react";
import { PatientCard } from "./PatientCard";
import axios from "axios";

interface SidebarProps {
  selectedPatientId: string | null;
  onPatientSelect: (id: string) => void;
}


export function Sidebar({ selectedPatientId, onPatientSelect }: SidebarProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const nurseId = localStorage.getItem("nurseId");

  useEffect(() => {
    if (!nurseId) return;
    axios.get(`http://127.0.0.1:8000/nurses/${nurseId}/patients`)
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, [nurseId]);

  return (
    <div className="w-80 p-4 bg-white border-r overflow-y-auto">
      {patients.map(p => (
        <PatientCard
          key={p.id}
          patient={p}
          isSelected={selectedPatientId === p.id}
          onSelect={() => onPatientSelect(p.id)}
        />
      ))}
    </div>
  );
}

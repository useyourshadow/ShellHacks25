import { useState, useEffect } from "react";
import axios from "axios";
import { User, Plus, AlertCircle } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  phone_number: string;
  timezone: string;
  age: number;
  care_giver: string;
  care_giver_relation: string;
  disease: string;
}

interface Prescription {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  instructions: string;
  schedule?: string;
  lastTaken?: string;
  nextDue?: string;
}

interface PatientDetailsProps {
  patient: Patient | null;
  onEditPatient: (patientId: string) => void;
}

export function PatientDetails({ patient, onEditPatient }: PatientDetailsProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const API_BASE = "127.0.0.1:8000";

  // Fetch prescriptions for the selected patient
  const fetchPrescriptions = async () => {
    if (!patient) return;
    try {
      const response = await axios.get(`${API_BASE}/patients/${patient.id}/prescriptions`);
      setPrescriptions(response.data);
    } catch (err) {
      console.error("Failed to fetch prescriptions:", err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [patient]);

  // Add a prescription
  const handleAddPrescription = async () => {
    if (!patient) return;
    const newPrescription = {
      medication_name: "New Medicine",
      dosage: "1 pill",
      instructions: "Take daily",
      patient_id: patient.id,
    };
    try {
      await axios.post(`${API_BASE}/prescriptions/`, newPrescription);
      fetchPrescriptions();
    } catch (err) {
      console.error("Failed to add prescription:", err);
    }
  };

  // Edit a prescription
  const handleEditPrescription = async (id: string) => {
    const updates = { dosage: "Updated dosage" }; // Example update
    try {
      await axios.put(`${API_BASE}/prescriptions/${id}`, updates);
      fetchPrescriptions();
    } catch (err) {
      console.error("Failed to edit prescription:", err);
    }
  };

  // Remove a prescription
  const handleRemovePrescription = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/prescriptions/${id}`);
      fetchPrescriptions();
    } catch (err) {
      console.error("Failed to remove prescription:", err);
    }
  };

  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center">
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Select a patient to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{patient.name}</h2>
        <button onClick={() => onEditPatient(patient.id)} className="px-3 py-1 bg-blue-600 text-white rounded">
          Edit Patient
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleAddPrescription}
          className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add Prescription
        </button>
      </div>

      {prescriptions.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No prescriptions found</p>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Medicine</th>
              <th className="border p-2 text-left">Dosage</th>
              <th className="border p-2 text-left">Instructions</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="border p-2">{p.medication_name}</td>
                <td className="border p-2">{p.dosage}</td>
                <td className="border p-2">{p.instructions}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEditPrescription(p.id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemovePrescription(p.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

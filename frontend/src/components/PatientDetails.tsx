// src/components/PatientDetails.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { User, Phone, Edit, Trash2, Plus, Clock, AlertCircle } from "lucide-react";

interface PatientDetailsProps {
  patientId: string | null;
}

interface Prescription {
  id: string;
  medication_name: string;
  dosage: string;
  instructions: string;
  lastTaken?: string;
  nextDue?: string;
}

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

export function PatientDetails({ patientId }: PatientDetailsProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    if (!patientId) return;

    // Fetch patient info
    axios
      .get(`http://127.0.0.1:8000/patients/${patientId}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error(err));

    // Fetch patient prescriptions
    axios
      .get(`http://127.0.0.1:8000/prescriptions/patient/${patientId}`)
      .then(res => setPrescriptions(res.data))
      .catch(err => console.error(err));
  }, [patientId]);

  const onEditPrescription = (id: string) => {
    console.log("Edit prescription", id);
  };

  const onRemovePrescription = (id: string) => {
    console.log("Remove prescription", id);
  };

  const onSetupCall = (patientId: string, prescriptionId: string) => {
    console.log("Setup call", patientId, prescriptionId);
  };

  const onEditPatient = (id: string) => {
    console.log("Edit patient", id);
  };

  if (!patient) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">
          Select a patient to view details
        </h3>
        <p className="mt-1">Choose a patient from the list to see their information and prescriptions</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Patient Details</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Selected:</span>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm">
              {patient.name}
            </div>
          </div>
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          onClick={() => onEditPatient(patient.id)}
        >
          <Edit className="h-4 w-4" />
          Edit Page
        </button>
      </div>

      {/* Patient Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Age</span>
            <User className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-gray-900">{patient.age}</div>
        </div>
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Phone</span>
            <Phone className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-900">{patient.phone_number}</div>
          <div className="text-sm text-gray-600">Primary contact</div>
        </div>
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Caregiver</span>
            <User className="h-5 w-5 text-teal-500" />
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-900">{patient.care_giver}</div>
          <div className="text-sm text-gray-600">{patient.care_giver_relation}</div>
        </div>
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Disease</span>
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-900">{patient.disease}</div>
        </div>
      </div>

      {/* Prescriptions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
          <button className="flex items-center gap-2 text-sm px-3 py-1.5 border rounded hover:bg-gray-50">
            <Plus className="w-3 h-3" /> Add Prescription
          </button>
        </div>

        {prescriptions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No prescriptions found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-medium text-gray-700">Medicine</th>
                    <th className="text-left py-3 font-medium text-gray-700">Dosage</th>
                    <th className="text-left py-3 font-medium text-gray-700">Instructions</th>
                    <th className="text-left py-3 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p, idx) => (
                    <tr key={p.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 font-medium text-gray-900">{p.medication_name}</td>
                      <td className="py-3">{p.dosage}</td>
                      <td className="py-3">{p.instructions}</td>
                      <td className="py-3 flex gap-2">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                          onClick={() => onSetupCall(patient.id, p.id)}
                        >
                          <Phone className="h-3 w-3" /> Setup Call
                        </button>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                          onClick={() => onEditPrescription(p.id)}
                        >
                          <Edit className="h-3 w-3" /> Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                          onClick={() => onRemovePrescription(p.id)}
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {prescriptions.map(p => (
                <div key={p.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{p.medication_name}</h4>
                      <div className="text-sm text-gray-600">{p.dosage}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{p.instructions}</div>
                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2"
                      onClick={() => onSetupCall(patient.id, p.id)}
                    >
                      <Phone className="h-4 w-4" /> Setup Call
                    </button>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
                        onClick={() => onEditPrescription(p.id)}
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                      <button
                        className="flex-1 border border-red-300 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
                        onClick={() => onRemovePrescription(p.id)}
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// src/components/PatientDetails.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { User, Phone, Edit, Trash2, Plus, AlertCircle, X } from "lucide-react";
import { SetupCallModal } from "../SetupCallModal";
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
  // at top inside PatientDetails component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [editing, setEditing] = useState<Prescription | null>(null);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    medication_name: "",
    dosage: "",
    instructions: "",
  });

  useEffect(() => {
    if (!patientId) return;
    // Fetch patient info
    axios.get(`http://127.0.0.1:8000/patients/${patientId}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error(err));

    // Fetch prescriptions
    axios.get(`http://127.0.0.1:8000/prescriptions/patient/${patientId}`)
      .then(res => setPrescriptions(res.data))
      .catch(err => console.error(err));
  }, [patientId]);

  const refreshPrescriptions = () => {
    if (!patientId) return;
    axios.get(`http://127.0.0.1:8000/prescriptions/patient/${patientId}`)
      .then(res => setPrescriptions(res.data))
      .catch(err => console.error(err));
  };

  // Edit prescription
  const onEditPrescription = (p: Prescription) => {
    setEditing(p);
    setFormData({
      medication_name: p.medication_name,
      dosage: p.dosage,
      instructions: p.instructions,
    });
  };

  // Delete prescription
  const onRemovePrescription = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/prescriptions/${id}`);
      setPrescriptions(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Add new prescription
  const onAddPrescription = () => {
    setAdding(true);
    setFormData({ medication_name: "", dosage: "", instructions: "" });
  };

  // Save changes (edit or add)
  const onSaveChanges = async () => {
  console.log("Saving changes", { editing, adding, formData });
  try {
    if (editing) {
      console.log("PATCH request to:", `http://127.0.0.1:8000/prescriptions/${editing.id}`);
      const res = await axios.patch(`http://127.0.0.1:8000/prescriptions/${editing.id}`, formData);
      console.log("PATCH response:", res.data);
      setEditing(null);
    } else if (adding && patientId) {
      console.log("POST request to:", `http://127.0.0.1:8000/prescriptions/`);
      const res = await axios.post(`http://127.0.0.1:8000/prescriptions/`, {
        ...formData,
        patient_id: patientId,
      });
      console.log("POST response:", res.data);
      setAdding(false);
    }
    refreshPrescriptions();
  } catch (err) {
    console.error("Save failed:", err);
  }
};


const onSetupCall = (patientId: string, prescriptionId: string) => {
  const presc = prescriptions.find(p => p.id === prescriptionId);
  if (!presc) return;
  setSelectedPrescription(presc);
  setIsModalOpen(true);
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full min-h-screen w-full space-y-6">
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
      </div>

      {/* Prescriptions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Prescriptions</h3>
          <button
            className="flex items-center gap-2 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
            onClick={onAddPrescription}
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
          <div className="space-y-4">
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
                      onClick={() => onEditPrescription(p)}
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
        )}
      </div>

      {/* Modal for Edit/Add Prescription */}
      {(editing || adding) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button className="absolute top-2 right-2" onClick={() => { setEditing(null); setAdding(false); }}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-lg font-semibold mb-4">{editing ? "Edit Prescription" : "Add Prescription"}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  className="mt-1 w-full border px-2 py-1 rounded"
                  value={formData.medication_name}
                  onChange={(e) => setFormData({ ...formData, medication_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  className="mt-1 w-full border px-2 py-1 rounded"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                <textarea
                  className="mt-1 w-full border px-2 py-1 rounded"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded"
                onClick={onSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
  
      <SetupCallModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      patientName={patient.name}
      prescriptionId={selectedPrescription?.id}
      onSubmit={(data) => {
        console.log("Call scheduled:", data);
        refreshPrescriptions(); // refresh after scheduling if needed
      }}
    />

    </div>
    
  );
  
}



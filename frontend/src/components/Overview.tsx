import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { Header } from "./Header";
import { Dashboard } from "../pages/Dashboard";
import PatientMedicationModal from "../components/popup";
import axios from "axios";
import toast from "react-hot-toast";

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // for refreshing Dashboard sidebar

  const handleFormSubmit = async (data: any) => {
    try {
      const nurseId = localStorage.getItem("nurseId");
      if (!nurseId) return;

      const patientPayload = { ...data, nurse_id: nurseId };
      const patientResponse = await axios.post(
        `http://localhost:8000/nurses/${nurseId}/patients`,
        patientPayload
      );
      const patientId = patientResponse.data.patient_id;

      const medicationPromises = data.medications.map((med: any) =>
        axios.post(`http://localhost:8000/prescriptions/`, {
          patient_id: patientId,
          medication_name: med.medication_name,
          dosage: med.dosage,
          instructions: med.instructions,
        })
      );
      await Promise.all(medicationPromises);

      toast.success("Patient and medications added successfully!");
      setIsModalOpen(false);
      setRefreshKey(prev => prev + 1); // trigger Dashboard sidebar refresh
    } catch (error: any) {
      console.error("Error submitting patient:", error.response?.data || error.message);
      toast.error("Failed to register patient or medications");
    }
  };

  return (
    <Tabs.Root defaultValue="setup" className="h-screen w-screen flex flex-col">
      {/* Header always shows Add Patient button */}
      <Header onAddPatient={() => setIsModalOpen(true)} />

      {/* Patient Modal */}
      <PatientMedicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />


        <Dashboard refreshKey={refreshKey} />
    </Tabs.Root>
  );
}

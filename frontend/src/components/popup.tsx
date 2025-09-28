import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Pill, ChevronDown, Plus, Trash2 } from 'lucide-react';

// --- TypeScript Interfaces ---

interface PatientData {
  name: string;
  phone_number: string;
  age: number;
  care_giver: string;
  care_giver_relation: string;
  disease: string;
}

interface MedicationData {
  medication_name: string;
  dosage: string;
  instructions: string;
}

interface FormData extends PatientData {
  medications: MedicationData[];
}

interface PatientMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}


// --- Reusable PatientMedicationModal Component ---

/**
 * A modal component for adding patient and medication information.
 */
function PatientMedicationModal({ isOpen, onClose, onSubmit }: PatientMedicationModalProps) {
      const [isMedicationSectionOpen, setIsMedicationSectionOpen] = useState<boolean>(false);
  // Separate state for the dynamic list of medications
  const [medications, setMedications] = useState<MedicationData[]>([
    { medication_name: '', dosage: '', instructions: '' }
  ]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<PatientData>();

  // Watch all patient fields to check if they are filled
  const watchedPatientFields = watch([
    'name', 'phone_number', 'age', 'care_giver', 'care_giver_relation', 'disease'
  ]);

  const isPatientInfoComplete = watchedPatientFields.every(field => field && field.toString().trim() !== '');

  // Effect to automatically open the medication section once patient info is complete
  useEffect(() => {
    if (isPatientInfoComplete && !isMedicationSectionOpen) {
      setIsMedicationSectionOpen(true);
    }
  }, [isPatientInfoComplete, isMedicationSectionOpen]);

  // Handler to add a new medication entry
  const addMedication = () => {
    setMedications([...medications, { medication_name: '', dosage: '', instructions: '' }]);
  };

  // Handler to remove a medication entry by its index
  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };
  
  // Handler for manual updates to the medication state array
  const handleMedicationChange = (index: number, field: keyof MedicationData, value: string) => {
      const newMedications = [...medications];
      newMedications[index][field] = value;
      setMedications(newMedications);
  }

  // Wrapper for form submission
  const onFormSubmit = (data: PatientData) => {
    // Combine react-hook-form data with the manual medications state
    const finalData: FormData = { ...data, medications };
    onSubmit(finalData);
    handleClose(); // Close and reset after submission
  };

  // Resets form state and closes the modal
  const handleClose = () => {
    reset();
    setMedications([{ medication_name: '', dosage: '', instructions: '' }]);
    setIsMedicationSectionOpen(false);
    onClose();
  };

  // Render nothing if the modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" aria-modal="true">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            Add Patient & Medication Information
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body with Form */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Patient Information Section */}
            <div className="p-5 border rounded-lg">
              <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-4">
                <User className="h-4 w-4" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-600">Name *</label>
                  <input id="name" type="text" {...register('name', { required: 'Name is required' })} placeholder="Enter patient name" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                {/* Phone Number */}
                <div className="space-y-1">
                  <label htmlFor="phone_number" className="text-sm font-medium text-gray-600">Phone Number *</label>
                  <input id="phone_number" type="tel" {...register('phone_number', { required: 'Phone number is required' })} placeholder="Enter phone number" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  {errors.phone_number && <p className="text-xs text-red-500">{errors.phone_number.message}</p>}
                </div>
                 {/* Age */}
                <div className="space-y-1">
                  <label htmlFor="age" className="text-sm font-medium text-gray-600">Age *</label>
                  <input id="age" type="number" {...register('age', { required: 'Age is required', min: { value: 0, message: 'Age must be positive' } })} placeholder="Enter age" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
                </div>
                 {/* Care Giver */}
                <div className="space-y-1">
                  <label htmlFor="care_giver" className="text-sm font-medium text-gray-600">Care Giver *</label>
                  <input id="care_giver" type="text" {...register('care_giver', { required: 'Care giver is required' })} placeholder="Enter care giver name" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  {errors.care_giver && <p className="text-xs text-red-500">{errors.care_giver.message}</p>}
                </div>
                {/* Care Giver Relation */}
                <div className="space-y-1">
                  <label htmlFor="care_giver_relation" className="text-sm font-medium text-gray-600">Care Giver Relation *</label>
                  <input id="care_giver_relation" type="text" {...register('care_giver_relation', { required: 'Relation is required' })} placeholder="e.g., Spouse, Child" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  {errors.care_giver_relation && <p className="text-xs text-red-500">{errors.care_giver_relation.message}</p>}
                </div>
                {/* Disease */}
                <div className="space-y-1">
                  <label htmlFor="disease" className="text-sm font-medium text-gray-600">Disease/Condition *</label>
                  <input id="disease" type="text" {...register('disease', { required: 'Condition is required' })} placeholder="Enter primary condition" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  {errors.disease && <p className="text-xs text-red-500">{errors.disease.message}</p>}
                </div>
              </div>
            </div>

            {/* Medication Information Section */}
            <div className="border rounded-lg">
              <button
                type="button"
                onClick={() => isPatientInfoComplete && setIsMedicationSectionOpen(!isMedicationSectionOpen)}
                className={`w-full flex items-center justify-between p-5 ${isPatientInfoComplete ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                disabled={!isPatientInfoComplete}
              >
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  <h3 className="text-md font-semibold text-gray-700">Medication Information</h3>
                  {!isPatientInfoComplete && <span className="text-xs text-gray-500">(Complete patient info first)</span>}
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isMedicationSectionOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMedicationSectionOpen && (
                <div className="p-5 border-t space-y-4">
                  {medications.map((med, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50/50 space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm text-gray-600">Medication {index + 1}</h4>
                            {medications.length > 1 && (
                                <button type="button" onClick={() => removeMedication(index)} className="p-1 text-red-500 hover:bg-red-100 rounded-full">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label htmlFor={`med_name_${index}`} className="text-sm font-medium text-gray-600">Medication Name</label>
                                <input id={`med_name_${index}`} value={med.medication_name} onChange={(e) => handleMedicationChange(index, 'medication_name', e.target.value)} type="text" placeholder="Enter medication" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor={`med_dosage_${index}`} className="text-sm font-medium text-gray-600">Dosage</label>
                                <input id={`med_dosage_${index}`} value={med.dosage} onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)} type="text" placeholder="e.g., 10mg, 2 tablets" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor={`med_instr_${index}`} className="text-sm font-medium text-gray-600">Instructions</label>
                                <input id={`med_instr_${index}`} value={med.instructions} onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)} type="text" placeholder="e.g., Take with food" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                            </div>
                        </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMedication}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-dashed rounded-lg text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Medication
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer with Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isPatientInfoComplete}
                className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save Patient Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientMedicationModal;
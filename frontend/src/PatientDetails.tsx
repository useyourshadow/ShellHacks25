import { ArrowRight, Edit, Trash2, Phone, Clock, User, Plus, AlertCircle } from "lucide-react";
import { Patient, Prescription } from "../App";

interface PatientDetailsProps {
  patient: Patient | null;
  prescriptions: Prescription[];
  onEditPatient: (patientId: string) => void;
  onSetupCall: (patientId: string, prescriptionId?: string) => void;
  onEditPrescription: (prescriptionId: string) => void;
  onRemovePrescription: (prescriptionId: string) => void;
}

export function PatientDetails({ 
  patient, 
  prescriptions, 
  onEditPatient,
  onSetupCall, 
  onEditPrescription, 
  onRemovePrescription 
}: PatientDetailsProps) {
  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Select a patient to view details</p>
            <p className="text-gray-400 text-sm mt-2">
              Choose a patient from the list to see their information and prescriptions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Age</span>
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-900">{patient.age}</div>
            <div className="text-sm text-gray-600">{patient.condition}</div>
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Phone</span>
              <Phone className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-base sm:text-lg font-semibold text-gray-900">{patient.phone}</div>
            <div className="text-sm text-gray-600">Primary contact</div>
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Caregiver</span>
              <User className="h-5 w-5 text-teal-500" />
            </div>
            <div className="text-base sm:text-lg font-semibold text-gray-900">
              {patient.caregiver?.split(' (')[0] || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">
              {patient.caregiver?.match(/\((.*?)\)/)?.[1] || ''}
            </div>
          </div>
        </div>

        {/* Prescriptions Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Prescriptions</h3>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
              <Plus className="h-3 w-3" />
              Add Prescription
            </button>
          </div>
          
          {prescriptions.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No prescriptions found</p>
              <p className="text-gray-400 text-sm">Add a prescription to get started</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-medium text-gray-700">Medicine</th>
                      <th className="text-left py-3 font-medium text-gray-700">Dosage</th>
                      <th className="text-left py-3 font-medium text-gray-700">Schedule</th>
                      <th className="text-left py-3 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription, index) => (
                      <tr key={prescription.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{prescription.medicine}</div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                            {prescription.dosage}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {prescription.schedule}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="space-y-1">
                            {prescription.lastTaken && (
                              <div className="text-xs text-green-600">
                                Last: {prescription.lastTaken}
                              </div>
                            )}
                            {prescription.nextDue && (
                              <div className="text-xs text-amber-600">
                                Next: {prescription.nextDue}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                              onClick={() => onSetupCall(patient.id, prescription.id)}
                            >
                              <Phone className="h-3 w-3" />
                              Setup Call
                            </button>
                            <button
                              className="text-gray-600 hover:text-blue-600 p-1 rounded text-xs flex items-center gap-1 transition-colors"
                              onClick={() => onEditPrescription(prescription.id)}
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </button>
                            <button
                              className="text-gray-600 hover:text-red-600 p-1 rounded text-xs flex items-center gap-1 transition-colors"
                              onClick={() => onRemovePrescription(prescription.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{prescription.medicine}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white text-gray-700 border border-gray-200">
                            {prescription.dosage}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Schedule:</span> {prescription.schedule}
                      </div>
                      
                      {(prescription.lastTaken || prescription.nextDue) && (
                        <div className="space-y-1">
                          {prescription.lastTaken && (
                            <div className="text-sm text-green-600">
                              <span className="font-medium">Last taken:</span> {prescription.lastTaken}
                            </div>
                          )}
                          {prescription.nextDue && (
                            <div className="text-sm text-amber-600">
                              <span className="font-medium">Next due:</span> {prescription.nextDue}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        onClick={() => onSetupCall(patient.id, prescription.id)}
                      >
                        <Phone className="h-4 w-4" />
                        Setup Call for this Medicine
                      </button>
                      <div className="flex gap-2">
                        <button
                          className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                          onClick={() => onEditPrescription(prescription.id)}
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          className="flex-1 border border-red-300 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                          onClick={() => onRemovePrescription(prescription.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Implementation Mapping */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-gray-900">
            🔧 Implementation mapping
          </h4>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Route:</strong> /dashboard → Tabs: /dashboard/setup, /dashboard/overview</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Components:</strong> Header, PatientList, PatientDetails, PrescriptionTable</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Actions:</strong> onSelectPatient(...) → fetch /api/patients/:id/prescriptions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Edit Page button</strong> → navigate('/patients/:id/edit')</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Setup Call buttons</strong> → navigate('/schedule?patientId=...&prescriptionId=...')</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
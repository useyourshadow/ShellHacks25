// src/components/Notes.tsx
export function Notes() {
  return (
    <div className="p-4 mt-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
      <ul className="space-y-1.5 text-sm text-gray-600 list-disc list-inside">
        <li>Select a patient to view details</li>
        <li>Click 'Setup Call' to schedule with caregiver/patient</li>
        <li>Use search to find patients quickly</li>
      </ul>
    </div>
  );
}

// src/components/PatientCard.tsx
import * as Avatar from '@radix-ui/react-avatar';
import { User } from 'lucide-react';

interface Patient {
  name: string;
  age: number;
  condition: string;
}

interface PatientCardProps {
  patient: Patient;
  isSelected: boolean;
  onSelect: () => void;
}

export function PatientCard({ patient, isSelected, onSelect }: PatientCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden w-10 h-10 rounded-full bg-gray-200">
          <Avatar.Fallback>
            <User className="w-5 h-5 text-gray-500" />
          </Avatar.Fallback>
        </Avatar.Root>
        <div>
          <p className="font-semibold text-gray-800">{patient.name}</p>
          <div className="text-sm text-gray-500">
            <span>Age {patient.age}</span>
            <span className="inline-block mx-1.5 w-1 h-1 bg-gray-300 rounded-full align-middle"></span>
            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">{patient.condition}</span>
          </div>
        </div>
      </div>
      <button
        className={`px-4 py-1.5 text-sm font-semibold rounded-md ${
          isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}
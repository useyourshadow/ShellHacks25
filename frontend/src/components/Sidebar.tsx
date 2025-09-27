// src/components/Sidebar.tsx
import { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { PatientCard } from './PatientCard';
import { Notes } from './Notes';

// Mock data
const mockPatients = [
  { id: 1, name: 'Adam Johnson', age: 74, condition: 'Dementia' },
  // Add more patients here if you want
];

interface SidebarProps {
  selectedPatientId: number | null;
  onPatientSelect: (id: number) => void;
}

export function Sidebar({ selectedPatientId, onPatientSelect }: SidebarProps) {
  return (
    <aside className="w-[380px] bg-white border-r p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Patients</h2>
        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
          {mockPatients.length}
        </span>
      </div>
      
      {/* Search and Filters */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Select.Root>
          <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500"/>
              <Select.Value placeholder="All Conditions" />
            </div>
            <Select.Icon>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white border rounded-md shadow-lg p-1">
              <Select.Viewport>
                <Select.Item value="all" className="px-3 py-1.5 rounded text-sm hover:bg-gray-100 cursor-pointer outline-none">All Conditions</Select.Item>
                <Select.Item value="dementia" className="px-3 py-1.5 rounded text-sm hover:bg-gray-100 cursor-pointer outline-none">Dementia</Select.Item>
                <Select.Item value="diabetes" className="px-3 py-1.5 rounded text-sm hover:bg-gray-100 cursor-pointer outline-none">Diabetes</Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Patient List */}
      <div className="flex-grow space-y-2">
        {mockPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            isSelected={selectedPatientId === patient.id}
            onSelect={() => onPatientSelect(patient.id)}
          />
        ))}
      </div>
      
      <Notes />
    </aside>
  );
}
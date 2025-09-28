import { User, Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

interface HeaderProps {
  onAddPatient?: () => void;
}

export function Header({ onAddPatient }: HeaderProps) {  const [nurseName, setNurseName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("nurseName"); // Set this at login
    if (storedName) setNurseName(storedName);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-gray-800">Voice AI Care</h1>
        {/* Tab List only */}
         
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-5 h-5" />
          <span>
            Logged in: <strong>{nurseName || "Loading..."}</strong>
          </span>
        </div>
        <Button onClick={onAddPatient}>
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>
    </div>
  );
}
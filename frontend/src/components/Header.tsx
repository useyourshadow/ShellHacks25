import * as Tabs from "@radix-ui/react-tabs";
import { User, Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

export function Header() {
  const [nurseName, setNurseName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("nurseName"); // Set this at login
    if (storedName) setNurseName(storedName);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-gray-800">Voice AI Care</h1>
        {/* Tab List only */}
        <Tabs.List className="flex gap-4">
          <Tabs.Trigger
            value="setup"
            className="px-3 py-1.5 text-sm font-semibold text-gray-600 
              data-[state=active]:text-blue-600 
              data-[state=active]:border-b-2 
              data-[state=active]:border-blue-600 
              focus:outline-none"
          >
            Setup
          </Tabs.Trigger>
          <Tabs.Trigger
            value="overview"
            className="px-3 py-1.5 text-sm font-semibold text-gray-600 
              data-[state=active]:text-blue-600 
              data-[state=active]:border-b-2 
              data-[state=active]:border-blue-600 
              focus:outline-none"
          >
            Overview
          </Tabs.Trigger>
        </Tabs.List>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-5 h-5" />
          <span>
            Logged in: <strong>{nurseName || "Loading..."}</strong>
          </span>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>
    </div>
  );
}
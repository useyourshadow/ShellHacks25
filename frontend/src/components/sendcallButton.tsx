import axios from "axios";
import { useState } from "react";

export function PrescriptionItem({ prescription }: { prescription: any }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sendSchedule = async () => {
    try {
      setLoading(true);
      setStatus(null);
      const res = await axios.post(
        `http://127.0.0.1:8000/schedule_by_prescription`,
        null,
        { params: { prescription_id: prescription.id } }
      );
      setStatus(`✅ Scheduled! Call ID: ${res.data.call_id}`);
    } catch (err: any) {
      console.error("Failed to schedule", err);
      setStatus("❌ Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-2">
      <p><strong>{prescription.medication_name}</strong></p>
      <p>{prescription.dosage}</p>
      <p>{prescription.instructions}</p>

      <button
        onClick={sendSchedule}
        disabled={loading}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg"
      >
        {loading ? "Scheduling..." : "Send Schedule"}
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}

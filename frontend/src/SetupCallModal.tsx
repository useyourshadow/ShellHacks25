import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Calendar, Clock, Repeat } from "lucide-react";

interface SetupCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  prescriptionId?: string;
  onSubmit: (data: { date: string; time: string; recurring: string }) => void;
}

export function SetupCallModal({
  isOpen,
  onClose,
  patientName,
  prescriptionId,
  onSubmit,
}: SetupCallModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [recurring, setRecurring] = useState("none");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, time, recurring });
    onClose();
  };

  const sendSchedule = async () => {
    if (!prescriptionId) {
      toast.error("❌ No prescription ID provided");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `http://127.0.0.1:8000/schedule_by_prescription`,
        null,
        { params: { prescription_id: prescriptionId } }
      );

      toast.success(`✅ Scheduled! Call ID: ${res.data.call_id}`);
      onClose(); // close modal on success
    } catch (err) {
      console.error("Failed to schedule", err);
      toast.error("❌ Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Setup Call for {patientName}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" /> Select Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" /> Select Time
            </label>
            <input
              type="time"
              className="input input-bordered w-full"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Recurring */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Repeat className="h-4 w-4 text-gray-500" /> Recurring
            </label>
            <select
              className="select select-bordered w-full"
              value={recurring}
              onChange={(e) => setRecurring(e.target.value)}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={sendSchedule}
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Send Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

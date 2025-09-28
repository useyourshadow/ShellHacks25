import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import { useEffect } from "react";
import { useRef } from "react";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const picker = new Pikaday({
      field: inputRef.current,
      format: "YYYY-MM-DD",
      onSelect: (date) => {
        onChange(date.toISOString().split("T")[0]); // return YYYY-MM-DD
      },
    });

    return () => {
      picker.destroy();
    };
  }, [onChange]);

  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue={value}
      placeholder="Select a date"
      className="input input-bordered w-full max-w-xs"
    />
  );
}
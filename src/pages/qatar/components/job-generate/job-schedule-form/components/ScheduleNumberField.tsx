import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScheduleNumberFieldProps } from "../types";
import { v4 as uuidv4 } from "uuid";

const ScheduleNumberField: React.FC<ScheduleNumberFieldProps> = ({ 
  value, 
  onChange,
  readonly = true // Changed default to true to always auto-generate
}) => {
  // Generate a unique schedule number on component mount
  useEffect(() => {
    if (!value || value === "") {
      // Generate a schedule number based on date and random string
      const date = new Date();
      const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
      const timeStr = `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}`;
      const randomId = uuidv4().substring(0, 4);
      const scheduleNumber = `SCH-${dateStr}-${timeStr}-${randomId}`;
      
      // Call onChange with the new schedule number
      if (onChange) {
        const event = {
          target: {
            name: "scheduleNumber",
            value: scheduleNumber
          }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  }, []);

  return (
    <div className="mb-3">
      <Label htmlFor="scheduleNumber" className="font-bold text-gray-700 mb-1 block">
        SCHEDULE NUMBER:
      </Label>
      <Input
        type="text"
        id="scheduleNumber"
        name="scheduleNumber"
        value={value}
        onChange={onChange}
        className="bg-blue-50 border-blue-200 text-blue-900 font-semibold"
        placeholder="Auto-generated"
        readOnly={readonly}
      />
      <p className="text-xs text-gray-500 mt-1">
        Schedule number is auto-generated with date, time, and unique ID
      </p>
    </div>
  );
};

export default ScheduleNumberField;

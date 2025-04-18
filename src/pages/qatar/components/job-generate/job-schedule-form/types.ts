
import { QatarJob } from "../../../types/jobTypes";
import { ChangeEvent } from "react";

export interface JobScheduleFormData {
  scheduleNumber: string;
  vehicle: string;
  salesRep: string;
  driver: string;
  helper: string;
  scheduleDate: string;
  city?: string;
}

export interface JobScheduleFormProps {
  onSubmit: (data: JobScheduleFormData) => void;
  formData: JobScheduleFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobScheduleFormData>>;
  selectedJobs: QatarJob[];
  disabled: boolean;
  onVehicleChange?: (vehicle: string) => void;
}

export interface ScheduleFieldsProps {
  formData: JobScheduleFormData;
  selectedJobs: QatarJob[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: string) => void;
  onVehicleChange?: (vehicle: string) => void;
}

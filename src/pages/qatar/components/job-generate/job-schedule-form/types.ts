
import { QatarJob } from "../../../types/jobTypes";

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
}

export interface ScheduleFieldsProps {
  formData: JobScheduleFormData;
  selectedJobs: QatarJob[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: string) => void;
}

export interface ScheduleNumberFieldProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

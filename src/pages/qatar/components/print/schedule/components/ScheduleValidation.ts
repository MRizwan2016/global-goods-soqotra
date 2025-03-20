
import { toast } from "sonner";

const validateScheduleData = (scheduleData: any): boolean => {
  let isValid = true;
  
  // Validate required fields
  if (!scheduleData?.vehicle) {
    toast.warning("Vehicle information is missing");
    isValid = false;
  }
  if (!scheduleData?.driver) {
    toast.warning("Driver information is missing");
  }
  if (!scheduleData?.salesRep) {
    toast.warning("Sales Rep information is missing");
  }
  
  return isValid;
};

export default validateScheduleData;

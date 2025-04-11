
export const validateScheduleData = (scheduleData: any): boolean => {
  // Check if scheduleData is defined
  if (!scheduleData) {
    console.error("Schedule data is undefined");
    return false;
  }
  
  // Check for required fields
  if (!scheduleData.scheduleNumber) {
    console.error("Missing schedule number");
    return false;
  }
  
  // Even if vehicle or other fields are missing, we should still allow printing
  // Just log warnings instead of preventing print
  if (!scheduleData.vehicle) {
    console.warn("No vehicle selected for schedule");
  }
  
  if (!scheduleData.driver) {
    console.warn("No driver assigned for schedule");
  }
  
  return true;
};

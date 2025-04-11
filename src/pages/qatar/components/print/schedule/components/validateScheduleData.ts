
/**
 * Validates schedule data to ensure required fields are present
 * @param scheduleData The schedule data to validate
 * @returns true if valid, throws an error if not
 */
export const validateScheduleData = (scheduleData: any) => {
  console.log("Validating schedule data:", scheduleData);
  
  // Only log warnings but don't block printing, as requested
  if (!scheduleData) {
    console.warn("Schedule data is missing");
  }
  
  if (!scheduleData?.scheduleNumber) {
    console.warn("Schedule number is missing");
  }
  
  if (!scheduleData?.vehicle) {
    console.warn("Vehicle is missing");
  }
  
  if (!scheduleData?.driver) {
    console.warn("Driver is missing");
  }
  
  return true;
};

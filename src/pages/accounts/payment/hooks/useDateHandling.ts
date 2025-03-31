
import { useState } from "react";

/**
 * Hook for managing payment date selection
 */
export const useDateHandling = () => {
  // Get the current date
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      return selectedDate.toISOString().split('T')[0];
    }
    return today.toISOString().split('T')[0];
  };

  return {
    date,
    handleDateSelect
  };
};

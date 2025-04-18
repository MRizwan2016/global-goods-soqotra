
import { useState } from "react";

export const useDateFilter = () => {
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  return {
    filterDate,
    setFilterDate
  };
};


import { useState } from "react";

export const useStatusFilter = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  return {
    statusFilter,
    setStatusFilter
  };
};


import { useState } from "react";

export const useSortFilter = () => {
  const [sortBy, setSortBy] = useState("newest");
  
  return {
    sortBy,
    setSortBy
  };
};

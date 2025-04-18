
import { useState } from "react";

export const useJobNumber = (isEditMode: boolean, hasInitialJobNumber: boolean) => {
  const [isJobNumberGenerated, setIsJobNumberGenerated] = useState(
    isEditMode || hasInitialJobNumber || false
  );

  const generateJobNumber = () => {
    if (!isJobNumberGenerated) {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const random = Math.floor(Math.random() * 9000) + 1000;
      
      const newJobNumber = `QAT-${year}${month}${day}-${random}`;
      setIsJobNumberGenerated(true);
      
      return newJobNumber;
    }
    return "";
  };

  return {
    isJobNumberGenerated,
    setIsJobNumberGenerated,
    generateJobNumber,
  };
};

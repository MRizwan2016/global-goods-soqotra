
import { useState } from "react";
import { FormState } from "../types";

/**
 * Hook for handling form inputs
 */
export const useFormHandler = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (["amountPaid"].includes(name)) {
      const numValue = parseFloat(value) || 0;
      setFormState(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  return {
    formState,
    setFormState,
    handleInputChange,
    handleSelectChange
  };
};

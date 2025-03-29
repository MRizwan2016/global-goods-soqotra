
import { useState } from "react";
import { FormState } from "../types";

/**
 * Hook for handling form input changes
 */
export const useFormInputHandlers = (initialFormState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  
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

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setFormState(prev => ({ 
        ...prev, 
        paymentCollectDate: selectedDate.toISOString().split('T')[0] 
      }));
    }
  };
  
  return {
    formState,
    setFormState,
    handleInputChange,
    handleSelectChange,
    handleDateSelect
  };
};


import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues } from "../schema/sellingRateSchema";

export const useSellingRateFormState = (id?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing] = useState(!!id);
  const [sectors, setSectors] = useState<string[]>([]);

  const methods = useForm<SellingRateFormValues>({
    resolver: zodResolver(sellingRateSchema),
    defaultValues: {
      tariffNumber: "",
      freightType: "S",
      sector: "",
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveUntil: "",
      country: ""
    }
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = methods;

  return {
    isSubmitting,
    setIsSubmitting,
    isEditing,
    sectors,
    setSectors,
    methods,
    register,
    handleSubmit,
    watch,
    setValue,
    errors
  };
};

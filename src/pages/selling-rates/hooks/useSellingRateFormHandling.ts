
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues } from "../schema/sellingRateSchema";

export const useSellingRateFormHandling = () => {
  const methods = useForm<SellingRateFormValues>({
    resolver: zodResolver(sellingRateSchema),
    defaultValues: {
      tariffNumber: generateTariffNumber(),
      freightType: "S",
      sector: "",
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveUntil: "",
      country: ""
    }
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = methods;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };

  function generateTariffNumber() {
    const prefix = "TR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
  }

  return {
    methods,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    handleInputChange
  };
};


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues } from "../schema/sellingRateSchema";

export const useSellingRateFormHandling = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };

  const generateTariffNumber = (country: string = "") => {
    const prefix = "TR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    // Add country code to the tariff number
    const countryCode = getCountryCode(country);
    return `${prefix}${countryCode}${timestamp}${random}`;
  };
  
  // Helper function to get a 2-letter country code
  const getCountryCode = (countryName: string): string => {
    switch(countryName) {
      case "Kenya": return "KE";
      case "Sri Lanka": return "LK";
      case "Eritrea": return "ER";
      case "Sudan": return "SD";
      case "Saudi Arabia": return "SA";
      case "United Arab Emirates": return "AE";
      case "Somalia": return "SO";
      case "Tunisia": return "TN";
      case "Philippines": return "PH";
      case "Mozambique": return "MZ";
      case "Uganda": return "UG";
      case "Tanzania": return "TZ";
      default: return "XX";
    }
  };

  return {
    methods,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    handleInputChange,
    generateTariffNumber
  };
};

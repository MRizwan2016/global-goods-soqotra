import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues } from "../schema/sellingRateSchema";
import { SellingRatesService } from "@/services/SellingRatesService";
import { useCurrencyHandling } from "./useCurrencyHandling";
import { useDistrictRates } from "./useDistrictRates";
import { BoxType, CurrencyOption } from "../types/sellingRates";

export { BoxType, CurrencyOption };

export const useSellingRateForm = (id?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing] = useState(!!id);
  const [sectors, setSectors] = useState<string[]>([]);

  const {
    currencies,
    selectedCurrency,
    handleCurrencyChange
  } = useCurrencyHandling();

  const {
    districts,
    rateBoxes,
    districtRates,
    isDistrictRatesValid,
    updateDistrictsByCountry,
    handleRateChange,
    handlePromoDateChange,
    addCustomPackage
  } = useDistrictRates();

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
  const watchedCountry = watch("country");

  function generateTariffNumber() {
    const prefix = "TR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
  }

  useEffect(() => {
    if (isEditing && id) {
      setTimeout(() => {
        const mockSellingRates = {
          id: "1",
          freightType: "S",
          tariffNumber: "TR123456",
          effectiveFrom: "2023-01-01",
          effectiveUntil: "2023-12-31",
          district: "Central",
          country: "Kenya",
          sector: "Nairobi",
        };

        setValue("tariffNumber", mockSellingRates.tariffNumber);
        setValue("freightType", mockSellingRates.freightType as any);
        setValue("sector", mockSellingRates.sector);
        setValue("effectiveFrom", mockSellingRates.effectiveFrom);
        setValue("effectiveUntil", mockSellingRates.effectiveUntil);
        setValue("country", mockSellingRates.country);
      }, 500);
    }
  }, [isEditing, id, setValue]);

  useEffect(() => {
    updateDistrictsByCountry(watchedCountry);
    updateSectorsByCountry(watchedCountry);
  }, [watchedCountry]);

  const updateSectorsByCountry = (country: string) => {
    switch(country) {
      case "Kenya":
        setSectors(["Nairobi", "Mombasa", "Kisumu", "Nakuru"]);
        break;
      case "Sri Lanka":
        setSectors(["Colombo", "Kandy", "Galle", "Jaffna"]);
        break;
      case "Eritrea":
        setSectors(["Asmara", "Keren", "Massawa"]);
        break;
      case "Sudan":
        setSectors(["Khartoum", "Port Sudan", "Omdurman"]);
        break;
      case "Saudi Arabia":
        setSectors(["Riyadh", "Jeddah", "Mecca", "Medina"]);
        break;
      case "United Arab Emirates":
        setSectors(["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]);
        break;
      case "Somalia":
        setSectors(["Mogadishu", "Hargeisa", "Bosaso"]);
        break;
      case "Tunisia":
        setSectors(["Tunis", "Sfax", "Sousse"]);
        break;
      case "Philippines":
        setSectors(["Manila", "Cebu", "Davao", "Quezon City"]);
        break;
      case "Mozambique":
        setSectors(["Maputo", "Beira", "Nampula"]);
        break;
      case "Uganda":
        setSectors(["Kampala", "Entebbe", "Jinja"]);
        break;
      case "Tanzania":
        setSectors(["Dar es Salaam", "Zanzibar", "Dodoma"]);
        break;
      default:
        setSectors([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };

  const onSubmit = async (data: SellingRateFormValues) => {
    if (!isDistrictRatesValid) {
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      const formattedData = {
        ...data,
        districtRates,
      };
      
      const result = await SellingRatesService.saveSellingRates(formattedData);
      
      setIsSubmitting(false);
      return result;
    } catch (error) {
      console.error("Error saving selling rates:", error);
      setIsSubmitting(false);
      return false;
    }
  };

  return {
    isEditing,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    districts,
    rateBoxes,
    districtRates,
    isDistrictRatesValid,
    handleInputChange,
    handleRateChange,
    onSubmit,
    watch,
    methods,
    sectors,
    addCustomPackage,
    currencies,
    selectedCurrency,
    handleCurrencyChange,
    handlePromoDateChange
  };
};

export default useSellingRateForm;

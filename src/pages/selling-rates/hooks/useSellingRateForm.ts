
import { useState, useEffect } from "react";
import { SellingRatesService } from "@/services/SellingRatesService";
import { SellingRateFormValues } from "../schema/sellingRateSchema";
import { useCurrencyHandling } from "./useCurrencyHandling";
import { useDistrictRates } from "./useDistrictRates";
import { useSellingRateFormHandling } from "./useSellingRateFormHandling";
import { BoxType, CurrencyOption } from "../types/sellingRates";

// Re-export types using 'export type' to fix the isolatedModules error
export type { BoxType, CurrencyOption };

export const useSellingRateForm = (id?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing] = useState(!!id);
  const [sectors, setSectors] = useState<string[]>([]);

  const {
    methods,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    handleInputChange
  } = useSellingRateFormHandling();

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

  const watchedCountry = watch("country");

  useEffect(() => {
    updateDistrictsByCountry(watchedCountry);
    updateSectorsByCountry(watchedCountry);
  }, [watchedCountry]);

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


import { useEffect } from "react";
import { useSellingRateFormState } from "./useSellingRateFormState";
import { useSectorUpdate } from "./useSectorUpdate";
import { useFormSubmission } from "./useFormSubmission";
import { useCurrencyHandling } from "./useCurrencyHandling";
import { useDistrictRates } from "./useDistrictRates";

export const useSellingRateForm = (id?: string) => {
  const {
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
  } = useSellingRateFormState(id);

  const { updateSectorsByCountry } = useSectorUpdate(setSectors);

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

  const { onSubmit } = useFormSubmission(isDistrictRatesValid, setIsSubmitting, districtRates);

  const watchedCountry = watch("country");

  useEffect(() => {
    if (watchedCountry && !isEditing) {
      setValue("tariffNumber", generateTariffNumber(watchedCountry));
    }
  }, [watchedCountry, setValue, isEditing]);

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

  const generateTariffNumber = (country: string = "") => {
    const prefix = "TR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const countryCode = getCountryCode(country);
    return `${prefix}${countryCode}${timestamp}${random}`;
  };

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
    isEditing,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    districts,
    rateBoxes,
    districtRates,
    isDistrictRatesValid,
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

export type { BoxType, CurrencyOption } from '../types/sellingRates';
export default useSellingRateForm;

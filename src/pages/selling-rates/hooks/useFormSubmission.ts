
import { SellingRatesService } from "@/services/SellingRatesService";
import { SellingRateFormValues } from "../schema/sellingRateSchema";

export const useFormSubmission = (
  isDistrictRatesValid: boolean,
  setIsSubmitting: (value: boolean) => void,
  districtRates: any
) => {
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

  return { onSubmit };
};

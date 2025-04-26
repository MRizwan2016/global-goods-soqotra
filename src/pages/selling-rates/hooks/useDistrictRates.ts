
import { useDistricts } from './useDistricts';
import { useRateBoxes } from './useRateBoxes';
import { useDistrictRateValidation } from './useDistrictRateValidation';

export const useDistrictRates = () => {
  const { districts, updateDistrictsByCountry } = useDistricts();
  const { rateBoxes, addCustomPackage } = useRateBoxes();
  const { 
    districtRates, 
    isDistrictRatesValid, 
    handleRateChange, 
    handlePromoDateChange 
  } = useDistrictRateValidation();

  return {
    districts,
    rateBoxes,
    districtRates,
    isDistrictRatesValid,
    updateDistrictsByCountry,
    handleRateChange,
    handlePromoDateChange,
    addCustomPackage
  };
};

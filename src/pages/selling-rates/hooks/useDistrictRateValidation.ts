
import { useState } from 'react';
import { DistrictRates } from '../types/sellingRates';

export const useDistrictRateValidation = () => {
  const [districtRates, setDistrictRates] = useState<DistrictRates>({});
  const [isDistrictRatesValid, setIsDistrictRatesValid] = useState(true);

  const validateDistrictRates = (rates: DistrictRates) => {
    let isValid = true;
    
    Object.keys(rates).forEach(district => {
      Object.keys(rates[district]).forEach(boxId => {
        const baseRate = rates[district][boxId].baseRate;
        const promoRate = rates[district][boxId].promoRate;

        if (baseRate !== "" && (isNaN(parseFloat(baseRate)) || parseFloat(baseRate) < 0)) {
          isValid = false;
        }

        if (promoRate !== undefined && promoRate !== "" && 
            (isNaN(parseFloat(promoRate)) || parseFloat(promoRate) < 0)) {
          isValid = false;
        }
      });
    });
    
    setIsDistrictRatesValid(isValid);
    return isValid;
  };

  const handleRateChange = (
    district: string,
    boxId: string,
    value: string,
    type: 'baseRate' | 'promoRate' = 'baseRate'
  ) => {
    const updatedRates = { ...districtRates };
    
    if (!updatedRates[district]) {
      updatedRates[district] = {};
    }
    
    if (!updatedRates[district][boxId]) {
      updatedRates[district][boxId] = {
        baseRate: '',
        promoRate: '',
        promoStartDate: '',
        promoEndDate: ''
      };
    }

    if (type === 'baseRate') {
      updatedRates[district][boxId].baseRate = value;
    } else {
      updatedRates[district][boxId].promoRate = value;
    }
    
    setDistrictRates(updatedRates);
    validateDistrictRates(updatedRates);
  };

  const handlePromoDateChange = (
    district: string,
    boxId: string,
    startDate: string | undefined,
    endDate: string | undefined
  ) => {
    const updatedRates = { ...districtRates };
    
    if (!updatedRates[district]) {
      updatedRates[district] = {};
    }
    
    if (!updatedRates[district][boxId]) {
      updatedRates[district][boxId] = {
        baseRate: '',
        promoRate: '',
        promoStartDate: '',
        promoEndDate: ''
      };
    }

    updatedRates[district][boxId].promoStartDate = startDate || '';
    updatedRates[district][boxId].promoEndDate = endDate || '';
    
    setDistrictRates(updatedRates);
  };

  return {
    districtRates,
    isDistrictRatesValid,
    handleRateChange,
    handlePromoDateChange
  };
};

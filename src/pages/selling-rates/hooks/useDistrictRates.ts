import { useState } from 'react';
import { BoxType, RateWithPromo, DistrictRates } from '../types/sellingRates';

export const useDistrictRates = () => {
  const [districts, setDistricts] = useState<string[]>([]);
  const [rateBoxes, setRateBoxes] = useState<BoxType[]>([
    { id: "S", name: "SMALL" },
    { id: "M", name: "MEDIUM" },
    { id: "L", name: "LARGE" },
    { id: "XL", name: "EXTRA LARGE" },
    { id: "XXL", name: "DOUBLE XL" }
  ]);
  const [districtRates, setDistrictRates] = useState<DistrictRates>({});
  const [isDistrictRatesValid, setIsDistrictRatesValid] = useState(true);

  const updateDistrictsByCountry = (country: string) => {
    switch(country) {
      case "Sri Lanka":
        setDistricts(["Colombo", "Kandy", "Kurunegala", "Galle", "Addalachennai", "Nindavur"]);
        break;
      case "Tunisia":
        setDistricts(["Rades", "Tunis", "Sfax", "Sousse", "Gabes"]);
        break;
      case "Eritrea":
        setDistricts(["Anseba", "Debub", "Gash-Barka", "Maekel", "Northern Red Sea", "Southern Red Sea", "Mussawa", "Assab", "Hargeisa"]);
        break;
      case "Kenya":
        setDistricts(["Central", "Nairobi", "Coast", "Eastern", "Nyanza", "Rift Valley", "Western"]);
        break;
      case "Sudan":
        setDistricts(["Khartoum", "North Darfur", "South Darfur", "West Darfur", "Blue Nile"]);
        break;
      case "Saudi Arabia":
        setDistricts(["Riyadh", "Makkah", "Madinah", "Eastern Province", "Jizan"]);
        break;
      case "United Arab Emirates":
        setDistricts(["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Fujairah", "Ras Al Khaimah"]);
        break;
      case "Somalia":
        setDistricts(["Banaadir", "Galguduud", "Hiiraan", "Mudug", "Nugaal"]);
        break;
      case "Philippines":
        setDistricts(["Luzon 1", "Luzon 2", "Luzon 3", "Visayas", "Mindanao"]);
        break;
      case "Mozambique":
        setDistricts(["Maputo City", "Maputo Province", "Gaza", "Inhambane", "Sofala", "Manica"]);
        break;
      case "Uganda":
        setDistricts(["Kampala", "Wakiso", "Mukono", "Jinja", "Gulu", "Mbarara"]);
        break;
      case "Tanzania":
        setDistricts(["Dar es Salaam", "Arusha", "Dodoma", "Mwanza", "Zanzibar Urban"]);
        break;
      default:
        setDistricts([]);
    }
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

  const validateDistrictRates = (rates: DistrictRates) => {
    let isValid = true;
    
    Object.keys(rates).forEach(district => {
      Object.keys(rates[district]).forEach(boxId => {
        const baseRate = rates[district][boxId].baseRate;
        const promoRate = rates[district][boxId].promoRate;

        if (baseRate !== "" && (isNaN(parseFloat(baseRate)) || parseFloat(baseRate) < 0)) {
          isValid = false;
        }

        if (promoRate !== undefined && promoRate !== "" && (isNaN(parseFloat(promoRate)) || parseFloat(promoRate) < 0)) {
          isValid = false;
        }
      });
    });
    
    setIsDistrictRatesValid(isValid);
  };

  const addCustomPackage = (packageName: string) => {
    const id = `CUSTOM_${Date.now()}`;
    setRateBoxes(prev => [...prev, { id, name: packageName.toUpperCase() }]);
  };

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

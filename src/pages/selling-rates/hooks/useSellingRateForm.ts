import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues, districtRateSchema } from "../schema/sellingRateSchema";
import { SellingRatesService } from "@/services/SellingRatesService";

export type BoxType = {
  id: string;
  name: string;
};

export type CurrencyOption = {
  code: string;
  name: string;
  symbol: string;
};

export type RateWithPromo = {
  baseRate: string;
  promoRate?: string;
  promoStartDate?: string;
  promoEndDate?: string;
};

export const useSellingRateForm = (id?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing] = useState(!!id);
  const [districts, setDistricts] = useState<string[]>([]);
  const [rateBoxes, setRateBoxes] = useState<BoxType[]>([]);
  const [districtRates, setDistrictRates] = useState<{[key: string]: {[key: string]: {
    baseRate: string;
    promoRate?: string;
    promoStartDate?: string;
    promoEndDate?: string;
  }}}>({});
  const [isDistrictRatesValid, setIsDistrictRatesValid] = useState(true);
  const [sectors, setSectors] = useState<string[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>({
    code: 'QAR',
    name: 'Qatari Riyal',
    symbol: 'QR'
  });

  const currencies: CurrencyOption[] = [
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' }
  ];

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
    setRateBoxes([
      { id: "S", name: "SMALL" },
      { id: "M", name: "MEDIUM" },
      { id: "L", name: "LARGE" },
      { id: "XL", name: "EXTRA LARGE" },
      { id: "XXL", name: "DOUBLE XL" }
    ]);

    updateDistrictsByCountry(watchedCountry);
  }, []);

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

  const updateDistrictsByCountry = (country: string) => {
    switch(country) {
      case "Kenya":
        setDistricts(["Central", "Nairobi", "Coast", "Eastern", "Nyanza", "Rift Valley", "Western"]);
        break;
      case "Sri Lanka":
        setDistricts(["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya"]);
        break;
      case "Eritrea":
        setDistricts(["Anseba", "Debub", "Gash-Barka", "Maekel", "Northern Red Sea", "Southern Red Sea"]);
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
      case "Tunisia":
        setDistricts(["Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan"]);
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

  const handleCurrencyChange = (currencyCode: string) => {
    const newCurrency = currencies.find(c => c.code === currencyCode) || currencies[0];
    setSelectedCurrency(newCurrency);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };

  const validateDistrictRates = (rates: {[key: string]: {[key: string]: {
    baseRate: string;
    promoRate?: string;
    promoStartDate?: string;
    promoEndDate?: string;
  }}}) => {
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

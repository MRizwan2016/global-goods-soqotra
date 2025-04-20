import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellingRateSchema, SellingRateFormValues, districtRateSchema } from "../schema/sellingRateSchema";

// Mock data for sectors by country
const sectorsByCountry = {
  "Sri Lanka": ["COLOMBO : C", "JAFFNA : J", "KANDY : K", "GALLE : G"],
  "Kenya": ["NAIROBI : N", "MOMBASA : M", "KISUMU : K", "ELDORET : E"],
  "Eritrea": ["ASMARA : A", "MASSAWA : M", "ASSAB : S"],
  "Sudan": ["KHARTOUM : K", "PORT SUDAN : P", "NYALA : N"],
  "Saudi Arabia": ["RIYADH : R", "JEDDAH : J", "DAMMAM : D"],
  "United Arab Emirates": ["DUBAI : D", "ABU DHABI : A", "SHARJAH : S"],
  "Somalia": ["MOGADISHU : M", "BERBERA : B", "KISMAYO : K"],
  "Tunisia": ["TUNIS : T", "SFAX : S", "SOUSSE : U"]
};

// Mock data for districts by country
const mockDistrictsByCountry = {
  "Sri Lanka": [
    "AMPARA", "BATTICOLA", "COLOMBO", "GAMPAHA", "JAFFNA", 
    "KALUTARA", "KILINOCHCHI", "MANNAR", "MULATIV", "RATNAPURA",
    "POLONNARUWA", "CHILAW", "TRINCOMALLE", "VAUNIYA"
  ],
  "Kenya": ["NAIROBI", "MOMBASA", "KISUMU", "NAKURU", "ELDORET"],
  "Eritrea": ["ASMARA", "KEREN", "MASSAWA", "ASSAB", "BARENTU"],
  "Sudan": ["KHARTOUM", "PORT SUDAN", "OMDURMAN", "NYALA", "KASSALA"],
  "Saudi Arabia": ["RIYADH", "JEDDAH", "MECCA", "MEDINA", "DAMMAM"],
  "United Arab Emirates": ["DUBAI", "ABU DHABI", "SHARJAH", "AJMAN", "RAS AL KHAIMAH"],
  "Somalia": ["MOGADISHU", "HARGEISA", "KISMAYO", "BERBERA", "MARKA"],
  "Tunisia": ["TUNIS", "SFAX", "SOUSSE", "KAIROUAN", "BIZERTE"]
};

// Mock rate boxes
const mockRateBoxes = {
  "Sri Lanka": [
    { id: "box1", name: "CARTON BOX - SMALL [ 14 X 14 X 12=0.039 ]" },
    { id: "box2", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box3", name: "CARTON BOX - LARGE [ 23 X 23 X 23=0.251 ]" },
    { id: "box4", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" },
    { id: "box5", name: "WOODEN BOX - (6M) - BLACK [ 144 X 48 X 48=5.56 ]" },
    { id: "box6", name: "PERSONAL EFFECTS" },
    { id: "box7", name: "HOUSEHOLD GOODS" }
  ],
  "default": [
    { id: "box1", name: "CARTON BOX - SMALL [ 14 X 14 X 12=0.039 ]" },
    { id: "box2", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box3", name: "CARTON BOX - LARGE [ 23 X 23 X 23=0.251 ]" },
    { id: "box4", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" },
    { id: "box5", name: "WOODEN BOX - (6M) - BLACK [ 144 X 48 X 48=5.56 ]" },
    { id: "box6", name: "CAR" },
    { id: "box7", name: "TRUCK" },
    { id: "box8", name: "PERSONAL EFFECTS" },
    { id: "box9", name: "HOUSEHOLD GOODS" }
  ]
};

// Mock data for existing selling rates
const mockSellingRates = [
  { id: "1", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "POLONNARUWA", country: "Sri Lanka", sector: "COLOMBO : C" },
  { id: "2", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "CHILAW", country: "Sri Lanka", sector: "COLOMBO : C" },
  { id: "3", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "AMPARA", country: "Sri Lanka", sector: "COLOMBO : C" },
  { id: "4", freightType: "S", tariffNumber: "2", effectiveFrom: "01/01/2022", district: "NAIROBI", country: "Kenya", sector: "DOHA : D" },
];

// Generate sequential tariff number
const generateTariffNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const sequence = Math.floor(Math.random() * 9000) + 1000; // 4-digit random number
  return `TR${year}${month}${sequence}`;
};

export interface BoxType {
  id: string;
  name: string;
}

export const useSellingRateForm = (rateId?: string) => {
  const isEditing = Boolean(rateId);
  const existingRate = isEditing ? mockSellingRates.find(rate => rate.id === rateId) : null;

  const methods = useForm<SellingRateFormValues>({
    resolver: zodResolver(sellingRateSchema),
    defaultValues: {
      tariffNumber: existingRate?.tariffNumber || generateTariffNumber(),
      freightType: (existingRate?.freightType as "S" | "A" | "L") || "S",
      sector: existingRate?.sector || "",
      effectiveFrom: existingRate?.effectiveFrom || "",
      effectiveUntil: existingRate?.effectiveUntil || "",
      country: existingRate?.country || "Sri Lanka",
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = methods;

  const [districts, setDistricts] = useState<string[]>([]);
  const [rateBoxes, setRateBoxes] = useState<BoxType[]>([]);
  const [districtRates, setDistrictRates] = useState<{[key: string]: {[key: string]: string}}>({});
  const [isDistrictRatesValid, setIsDistrictRatesValid] = useState(true);
  const [sectors, setSectors] = useState<string[]>([]);

  useEffect(() => {
    // Set districts based on selected country
    setDistricts(mockDistrictsByCountry[watchedCountry as keyof typeof mockDistrictsByCountry] || []);
    
    // Set rate boxes based on selected country
    setRateBoxes(mockRateBoxes[watchedCountry as keyof typeof mockRateBoxes] || mockRateBoxes.default);
    
    // Set sectors based on selected country
    setSectors(sectorsByCountry[watchedCountry as keyof typeof sectorsByCountry] || []);
    
    // Reset sector if not available in new country
    if (!sectorsByCountry[watchedCountry]?.includes(watch('sector'))) {
      setValue('sector', sectorsByCountry[watchedCountry]?.[0] || '');
    }

    // Initialize district rates
    const newDistrictRates: {[key: string]: {[key: string]: string}} = {};
    districts.forEach(district => {
      newDistrictRates[district] = {};
      rateBoxes.forEach(box => {
        newDistrictRates[district][box.id] = "0";
      });
    });
    setDistrictRates(newDistrictRates);
  }, [watchedCountry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };
  
  const handleRateChange = (district: string, boxId: string, value: string) => {
    // Validate the input value (should be a positive number or empty)
    const isValid = value === "" || (!isNaN(Number(value)) && Number(value) >= 0);
    
    setDistrictRates(prev => ({
      ...prev,
      [district]: {
        ...prev[district],
        [boxId]: value
      }
    }));
    
    // Validate all district rates
    validateDistrictRates();
  };
  
  const validateDistrictRates = () => {
    try {
      districtRateSchema.parse(districtRates);
      setIsDistrictRatesValid(true);
      return true;
    } catch (error) {
      setIsDistrictRatesValid(false);
      return false;
    }
  };

  const onSubmit = (data: SellingRateFormValues) => {
    if (!validateDistrictRates()) {
      return false;
    }
    
    const formData = {
      ...data,
      districtRates
    };
    
    console.log("Form data to submit:", formData);
    return formData;
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
    sectors
  };
};

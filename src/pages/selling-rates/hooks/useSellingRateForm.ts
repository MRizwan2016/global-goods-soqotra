
import { useState, useEffect } from "react";

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

// Mock rate boxes by country
const mockRateBoxes = {
  "Sri Lanka": [
    { id: "box1", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box2", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" }
  ],
  "Kenya": [
    { id: "box1", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box2", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" }
  ],
  "default": [
    { id: "box1", name: "CARTON BOX - SMALL [ 19 X 19 X 19=0.176 ]" },
    { id: "box2", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box3", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" },
    { id: "box4", name: "CAR" },
    { id: "box5", name: "TRUCK" },
    { id: "box6", name: "PERSONAL EFFECTS" },
    { id: "box7", name: "HOUSEHOLD GOODS" }
  ]
};

// Mock data for existing selling rates
const mockSellingRates = [
  { id: "1", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "POLONNARUWA", country: "Sri Lanka", sector: "COLOMBO : C" },
  { id: "2", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "CHILAW", country: "Sri Lanka", sector: "COLOMBO : C" },
  { id: "3", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "AMPARA", country: "Sri Lanka", sector: "COLOMBO : C" },
  { id: "4", freightType: "S", tariffNumber: "2", effectiveFrom: "01/01/2022", district: "NAIROBI", country: "Kenya", sector: "DOHA : D" },
];

interface SellingRateFormState {
  tariffNumber: string;
  freightType: string;
  sector: string;
  effectiveFrom: string;
  country: string;
}

export interface BoxType {
  id: string;
  name: string;
}

export const useSellingRateForm = (rateId?: string) => {
  const isEditing = Boolean(rateId);
  
  const existingRate = isEditing 
    ? mockSellingRates.find(rate => rate.id === rateId) 
    : null;
    
  const [formState, setFormState] = useState<SellingRateFormState>({
    tariffNumber: existingRate?.tariffNumber || "",
    freightType: existingRate?.freightType || "S",
    sector: existingRate?.sector || "COLOMBO : C",
    effectiveFrom: existingRate?.effectiveFrom || "",
    country: existingRate?.country || "Sri Lanka",
  });
  
  const [districts, setDistricts] = useState<string[]>([]);
  const [rateBoxes, setRateBoxes] = useState<BoxType[]>([]);
  const [districtRates, setDistrictRates] = useState<{[key: string]: {[key: string]: string}}>({});
  
  useEffect(() => {
    // Set districts based on selected country
    setDistricts(mockDistrictsByCountry[formState.country as keyof typeof mockDistrictsByCountry] || []);
    
    // Set rate boxes based on selected country
    setRateBoxes(mockRateBoxes[formState.country as keyof typeof mockRateBoxes] || mockRateBoxes.default);
    
    // Initialize district rates
    const newDistrictRates: {[key: string]: {[key: string]: string}} = {};
    (mockDistrictsByCountry[formState.country as keyof typeof mockDistrictsByCountry] || []).forEach(district => {
      newDistrictRates[district] = {};
      (mockRateBoxes[formState.country as keyof typeof mockRateBoxes] || mockRateBoxes.default).forEach(box => {
        newDistrictRates[district][box.id] = "0";
      });
    });
    setDistrictRates(newDistrictRates);
  }, [formState.country]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRateChange = (district: string, boxId: string, value: string) => {
    setDistrictRates(prev => ({
      ...prev,
      [district]: {
        ...prev[district],
        [boxId]: value
      }
    }));
  };

  return {
    isEditing,
    formState,
    districts,
    rateBoxes,
    districtRates,
    handleInputChange,
    handleRateChange,
  };
};

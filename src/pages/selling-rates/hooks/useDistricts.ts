
import { useState } from 'react';

export const useDistricts = () => {
  const [districts, setDistricts] = useState<string[]>([]);

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

  return {
    districts,
    updateDistrictsByCountry
  };
};

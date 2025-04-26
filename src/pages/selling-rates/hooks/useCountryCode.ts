
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

export const useCountryCode = () => {
  return { getCountryCode };
};

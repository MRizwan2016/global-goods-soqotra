
export const useFormatters = () => {
  const formatVolume = (volume: number | undefined) => {
    if (volume === undefined || volume === null) return "0.000";
    return Number(volume).toFixed(3);
  };
  
  const formatWeight = (weight: number | undefined) => {
    if (weight === undefined || weight === null) return "0.00";
    return Number(weight).toFixed(2);
  };
  
  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return "0";
    return num.toString();
  };
  
  const formatDate = (date: string | undefined) => {
    if (!date) return "-";
    
    try {
      // Try to parse and format the date
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return date;
      
      return dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch {
      return date;
    }
  };

  return {
    formatVolume,
    formatWeight,
    formatNumber,
    formatDate
  };
};


export const useFormatters = () => {
  const formatVolume = (volume: number | undefined | string) => {
    if (volume === undefined || volume === null) return "0.000";
    
    // Convert to number if it's a string
    const numValue = typeof volume === 'string' ? parseFloat(volume) : volume;
    
    // Check if it's a valid number
    return !isNaN(numValue) ? numValue.toFixed(3) : "0.000";
  };
  
  const formatWeight = (weight: number | undefined | string) => {
    if (weight === undefined || weight === null) return "0.00";
    
    // Convert to number if it's a string
    const numValue = typeof weight === 'string' ? parseFloat(weight) : weight;
    
    // Check if it's a valid number
    return !isNaN(numValue) ? numValue.toFixed(2) : "0.00";
  };
  
  const formatNumber = (num: number | undefined | string) => {
    if (num === undefined || num === null) return "0";
    
    // Convert to number if it's a string
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    
    // Check if it's a valid number
    return !isNaN(numValue) ? numValue.toString() : "0";
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

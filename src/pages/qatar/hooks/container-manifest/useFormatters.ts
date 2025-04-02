
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

  return {
    formatVolume,
    formatWeight,
    formatNumber
  };
};


export const useFormatters = () => {
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);

  return {
    formatVolume,
    formatWeight
  };
};

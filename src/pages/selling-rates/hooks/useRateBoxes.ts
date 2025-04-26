
import { useState } from 'react';
import { BoxType } from '../types/sellingRates';

export const useRateBoxes = () => {
  const [rateBoxes, setRateBoxes] = useState<BoxType[]>([
    { id: "S", name: "SMALL" },
    { id: "M", name: "MEDIUM" },
    { id: "L", name: "LARGE" },
    { id: "XL", name: "EXTRA LARGE" },
    { id: "XXL", name: "DOUBLE XL" }
  ]);

  const addCustomPackage = (packageName: string) => {
    const id = `CUSTOM_${Date.now()}`;
    setRateBoxes(prev => [...prev, { id, name: packageName.toUpperCase() }]);
  };

  return {
    rateBoxes,
    addCustomPackage
  };
};

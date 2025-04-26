
import { useCountryCode } from './useCountryCode';

export const useTariffNumber = () => {
  const { getCountryCode } = useCountryCode();

  const generateTariffNumber = (country: string = "") => {
    const prefix = "TR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const countryCode = getCountryCode(country);
    return `${prefix}${countryCode}${timestamp}${random}`;
  };

  return { generateTariffNumber };
};

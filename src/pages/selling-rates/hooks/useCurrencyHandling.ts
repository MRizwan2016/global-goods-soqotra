
import { useState } from 'react';
import { CurrencyOption } from '../types/sellingRates';

export const useCurrencyHandling = () => {
  const currencies: CurrencyOption[] = [
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: 'ب.د' },
    { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل' }
  ];

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(currencies[0]);

  const handleCurrencyChange = (currencyCode: string) => {
    const newCurrency = currencies.find(c => c.code === currencyCode) || currencies[0];
    setSelectedCurrency(newCurrency);
  };

  return {
    currencies,
    selectedCurrency,
    handleCurrencyChange
  };
};

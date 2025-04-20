
import React from 'react';
import { BoxType, CurrencyOption } from '../hooks/useSellingRateForm';
import CustomPackageForm from './CustomPackageForm';
import { Input } from "@/components/ui/input";

interface RatesTableProps {
  districts: string[];
  rateBoxes: BoxType[];
  districtRates: {[key: string]: {[key: string]: {
    baseRate: string;
    promoRate?: string;
    promoStartDate?: string;
    promoEndDate?: string;
  }}};
  handleRateChange: (district: string, boxId: string, value: string, type: 'baseRate' | 'promoRate') => void;
  handlePromoDateChange: (district: string, boxId: string, startDate?: string, endDate?: string) => void;
  isDistrictRatesValid: boolean;
  addCustomPackage: (packageName: string) => void;
  selectedCurrency: CurrencyOption;
}

const RatesTable: React.FC<RatesTableProps> = ({
  districts,
  rateBoxes,
  districtRates,
  handleRateChange,
  handlePromoDateChange,
  isDistrictRatesValid,
  addCustomPackage,
  selectedCurrency
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">District Rates ({selectedCurrency.code})</h2>
        <CustomPackageForm onAddPackage={addCustomPackage} />
      </div>
      
      {!isDistrictRatesValid && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Please ensure all rates are valid numbers.
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-soqotra-blue text-white">
              <th className="text-left px-4 py-2">District</th>
              {rateBoxes.map(box => (
                <th key={box.id} className="px-4 py-2">
                  <div className="whitespace-normal">
                    <div>{box.name}</div>
                    <div className="text-xs font-normal mt-1">Base / Promo Rate</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {districts.map(district => (
              <tr key={district} className="border-b">
                <td className="px-4 py-2 font-semibold">{district}</td>
                {rateBoxes.map(box => {
                  const rates = districtRates[district]?.[box.id] || {
                    baseRate: '',
                    promoRate: '',
                    promoStartDate: '',
                    promoEndDate: ''
                  };
                  
                  return (
                    <td key={`${district}-${box.id}`} className="px-4 py-2">
                      <div className="space-y-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={rates.baseRate}
                          onChange={(e) => handleRateChange(district, box.id, e.target.value, 'baseRate')}
                          className="border border-gray-300 rounded w-full p-2 text-right"
                          placeholder="Base Rate"
                        />
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={rates.promoRate}
                          onChange={(e) => handleRateChange(district, box.id, e.target.value, 'promoRate')}
                          className="border border-gray-300 rounded w-full p-2 text-right bg-yellow-50"
                          placeholder="Promo Rate"
                        />
                        <div className="flex gap-2 text-xs">
                          <Input
                            type="date"
                            value={rates.promoStartDate}
                            onChange={(e) => handlePromoDateChange(district, box.id, e.target.value, rates.promoEndDate)}
                            className="w-1/2"
                          />
                          <Input
                            type="date"
                            value={rates.promoEndDate}
                            onChange={(e) => handlePromoDateChange(district, box.id, rates.promoStartDate, e.target.value)}
                            className="w-1/2"
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatesTable;

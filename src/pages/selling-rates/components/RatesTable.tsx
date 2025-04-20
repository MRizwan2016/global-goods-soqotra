
import React from 'react';
import { BoxType } from '../hooks/useSellingRateForm';
import CustomPackageForm from './CustomPackageForm';

interface RatesTableProps {
  districts: string[];
  rateBoxes: BoxType[];
  districtRates: {[key: string]: {[key: string]: string}};
  handleRateChange: (district: string, boxId: string, value: string) => void;
  isDistrictRatesValid: boolean;
  addCustomPackage: (packageName: string) => void;
}

const RatesTable: React.FC<RatesTableProps> = ({
  districts,
  rateBoxes,
  districtRates,
  handleRateChange,
  isDistrictRatesValid,
  addCustomPackage
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">District Rates</h2>
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
                <th key={box.id} className="px-4 py-2 whitespace-normal">{box.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {districts.map(district => (
              <tr key={district} className="border-b">
                <td className="px-4 py-2 font-semibold">{district}</td>
                {rateBoxes.map(box => (
                  <td key={`${district}-${box.id}`} className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={districtRates[district]?.[box.id] || ""}
                      onChange={(e) => handleRateChange(district, box.id, e.target.value)}
                      className="border border-gray-300 rounded w-full p-2 text-right"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatesTable;

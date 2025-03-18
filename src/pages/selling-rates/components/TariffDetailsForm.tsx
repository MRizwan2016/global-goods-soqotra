
import React from 'react';
import { Input } from "@/components/ui/input";

interface TariffDetailsFormProps {
  formState: {
    tariffNumber: string;
    freightType: string;
    sector: string;
    effectiveFrom: string;
    country: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const TariffDetailsForm: React.FC<TariffDetailsFormProps> = ({ 
  formState, 
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">TARIFF NUMBER:</label>
        <Input 
          name="tariffNumber"
          value={formState.tariffNumber}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">FREIGHT TYPE:</label>
        <select
          name="freightType"
          value={formState.freightType}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="L">L</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">SECTOR:</label>
        <select
          name="sector"
          value={formState.sector}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="COLOMBO : C">COLOMBO : C</option>
          <option value="DOHA : D">DOHA : D</option>
          <option value="MANILA : M">MANILA : M</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">EFFECTIVE FROM:</label>
        <Input 
          type="date"
          name="effectiveFrom"
          value={formState.effectiveFrom}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">COUNTRY:</label>
        <select
          name="country"
          value={formState.country}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="Sri Lanka">SRI LANKA</option>
          <option value="Kenya">KENYA</option>
          <option value="Eritrea">ERITREA</option>
          <option value="Sudan">SUDAN</option>
          <option value="Saudi Arabia">SAUDI ARABIA</option>
          <option value="United Arab Emirates">UNITED ARAB EMIRATES</option>
          <option value="Somalia">SOMALIA</option>
          <option value="Tunisia">TUNISIA</option>
        </select>
      </div>
    </div>
  );
};

export default TariffDetailsForm;

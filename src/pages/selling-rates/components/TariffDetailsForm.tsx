
import React from 'react';
import { Input } from "@/components/ui/input";
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SellingRateFormValues } from '../schema/sellingRateSchema';

interface TariffDetailsFormProps {
  register: UseFormRegister<SellingRateFormValues>;
  errors: FieldErrors<SellingRateFormValues>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const TariffDetailsForm: React.FC<TariffDetailsFormProps> = ({ 
  register, 
  errors, 
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
      <FormItem className="flex flex-col">
        <FormLabel className="text-sm font-medium mb-1 text-soqotra-slate">TARIFF NUMBER:</FormLabel>
        <FormControl>
          <Input 
            {...register("tariffNumber")}
            name="tariffNumber"
            onChange={handleInputChange}
            className={`border ${errors.tariffNumber ? 'border-red-500' : 'border-gray-300'} focus:border-soqotra-blue focus:ring-1 focus:ring-soqotra-blue`}
          />
        </FormControl>
        {errors.tariffNumber && (
          <FormMessage className="text-red-500 text-xs mt-1">
            {errors.tariffNumber.message}
          </FormMessage>
        )}
      </FormItem>
      
      <FormItem className="flex flex-col">
        <FormLabel className="text-sm font-medium mb-1 text-soqotra-slate">FREIGHT TYPE:</FormLabel>
        <FormControl>
          <select
            {...register("freightType")}
            name="freightType"
            onChange={handleInputChange}
            className={`bg-soqotra-blue text-white py-2 px-3 rounded text-sm hover:bg-soqotra-navy transition-colors ${errors.freightType ? 'border-red-500' : ''}`}
          >
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="L">L</option>
          </select>
        </FormControl>
        {errors.freightType && (
          <FormMessage className="text-red-500 text-xs mt-1">
            {errors.freightType.message}
          </FormMessage>
        )}
      </FormItem>
      
      <FormItem className="flex flex-col">
        <FormLabel className="text-sm font-medium mb-1 text-soqotra-slate">SECTOR:</FormLabel>
        <FormControl>
          <select
            {...register("sector")}
            name="sector"
            onChange={handleInputChange}
            className={`bg-soqotra-blue text-white py-2 px-3 rounded text-sm hover:bg-soqotra-navy transition-colors ${errors.sector ? 'border-red-500' : ''}`}
          >
            <option value="COLOMBO : C">COLOMBO : C</option>
            <option value="DOHA : D">DOHA : D</option>
            <option value="MANILA : M">MANILA : M</option>
          </select>
        </FormControl>
        {errors.sector && (
          <FormMessage className="text-red-500 text-xs mt-1">
            {errors.sector.message}
          </FormMessage>
        )}
      </FormItem>
      
      <FormItem className="flex flex-col">
        <FormLabel className="text-sm font-medium mb-1 text-soqotra-slate">EFFECTIVE FROM:</FormLabel>
        <FormControl>
          <Input 
            {...register("effectiveFrom")}
            type="date"
            name="effectiveFrom"
            onChange={handleInputChange}
            className={`border ${errors.effectiveFrom ? 'border-red-500' : 'border-gray-300'} focus:border-soqotra-blue focus:ring-1 focus:ring-soqotra-blue`}
          />
        </FormControl>
        {errors.effectiveFrom && (
          <FormMessage className="text-red-500 text-xs mt-1">
            {errors.effectiveFrom.message}
          </FormMessage>
        )}
      </FormItem>
      
      <FormItem className="flex flex-col">
        <FormLabel className="text-sm font-medium mb-1 text-soqotra-slate">COUNTRY:</FormLabel>
        <FormControl>
          <select
            {...register("country")}
            name="country"
            onChange={handleInputChange}
            className={`bg-soqotra-blue text-white py-2 px-3 rounded text-sm hover:bg-soqotra-navy transition-colors ${errors.country ? 'border-red-500' : ''}`}
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
        </FormControl>
        {errors.country && (
          <FormMessage className="text-red-500 text-xs mt-1">
            {errors.country.message}
          </FormMessage>
        )}
      </FormItem>
    </div>
  );
};

export default TariffDetailsForm;

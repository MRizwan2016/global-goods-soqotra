
import { useFormInitialization } from './useFormInitialization';
import { useTariffNumber } from './useTariffNumber';
import { SellingRateFormValues } from '../schema/sellingRateSchema';

export const useSellingRateFormHandling = () => {
  const methods = useFormInitialization();
  const { generateTariffNumber } = useTariffNumber();
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = methods;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SellingRateFormValues, value);
  };

  return {
    methods,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    handleInputChange,
    generateTariffNumber
  };
};

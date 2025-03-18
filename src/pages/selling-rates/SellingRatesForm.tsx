
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useSellingRateForm } from "./hooks/useSellingRateForm";
import { Form } from "@/components/ui/form";
import FormHeader from "./components/FormHeader";
import TariffDetailsForm from "./components/TariffDetailsForm";
import RatesTable from "./components/RatesTable";
import FormActions from "./components/FormActions";

const SellingRatesForm = () => {
  const { id } = useParams();
  
  const {
    isEditing,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    districts,
    rateBoxes,
    districtRates,
    isDistrictRatesValid,
    handleInputChange,
    handleRateChange,
    onSubmit,
    watch,
  } = useSellingRateForm(id);
  
  // Watch the country value to pass to FormHeader
  const country = watch("country");
  
  return (
    <Layout title={isEditing ? "Update Selling Tariff" : "Add Selling Tariff"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <FormHeader 
          isEditing={isEditing} 
          country={country}
        />
        
        {/* Form tag with native onSubmit handler */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <TariffDetailsForm 
              register={register}
              errors={errors}
              handleInputChange={handleInputChange}
            />
            
            <RatesTable 
              districts={districts}
              rateBoxes={rateBoxes}
              districtRates={districtRates}
              handleRateChange={handleRateChange}
              isDistrictRatesValid={isDistrictRatesValid}
            />
            
            <FormActions 
              isSubmitting={isSubmitting}
              isDistrictRatesValid={isDistrictRatesValid}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SellingRatesForm;

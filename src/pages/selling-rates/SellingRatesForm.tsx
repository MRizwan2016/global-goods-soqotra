
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useSellingRateForm } from "./hooks/useSellingRateForm";
import { Form } from "@/components/ui/form";
import FormHeader from "./components/FormHeader";
import TariffDetailsForm from "./components/TariffDetailsForm";
import RatesTable from "./components/RatesTable";
import FormActions from "./components/FormActions";
import { toast } from "sonner";

const SellingRatesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
    handleRateChange,
    onSubmit,
    watch,
    methods,
    sectors,
    addCustomPackage,
    currencies,
    selectedCurrency,
    handleCurrencyChange,
    handlePromoDateChange
  } = useSellingRateForm(id);
  
  const country = watch("country");

  const handleFormSubmit = async (data: any) => {
    const result = await onSubmit(data);
    if (result) {
      toast.success("Selling rates saved successfully!");
      toast.info("Rates have been applied to all related modules: Invoicing, Jobs, and Manifests.");
      setTimeout(() => {
        navigate("/selling-rates");
      }, 1500);
    }
  };
  
  return (
    <Layout title={isEditing ? "Update Selling Tariff" : "Add Selling Tariff"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <FormHeader 
          isEditing={isEditing} 
          country={country}
        />
        
        <Form {...methods}>
          <div className="p-6">
            <TariffDetailsForm 
              register={register}
              errors={errors}
              sectors={sectors}
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
            
            <RatesTable 
              districts={districts}
              rateBoxes={rateBoxes}
              districtRates={districtRates}
              handleRateChange={handleRateChange}
              handlePromoDateChange={handlePromoDateChange}
              isDistrictRatesValid={isDistrictRatesValid}
              addCustomPackage={addCustomPackage}
              selectedCurrency={selectedCurrency}
            />
            
            <FormActions 
              isSubmitting={isSubmitting}
              isDistrictRatesValid={isDistrictRatesValid}
              handleSubmit={handleSubmit}
              onSubmit={handleFormSubmit}
            />
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default SellingRatesForm;

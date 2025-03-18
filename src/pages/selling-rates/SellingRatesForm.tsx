
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useSellingRateForm } from "./hooks/useSellingRateForm";
import FormHeader from "./components/FormHeader";
import TariffDetailsForm from "./components/TariffDetailsForm";
import RatesTable from "./components/RatesTable";
import FormActions from "./components/FormActions";

const SellingRatesForm = () => {
  const { id } = useParams();
  
  const {
    isEditing,
    formState,
    districts,
    rateBoxes,
    districtRates,
    handleInputChange,
    handleRateChange,
  } = useSellingRateForm(id);
  
  return (
    <Layout title={isEditing ? "Update Selling Tariff" : "Add Selling Tariff"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <FormHeader 
          isEditing={isEditing} 
          country={formState.country} 
        />
        
        <div className="p-4">
          <TariffDetailsForm 
            formState={formState}
            handleInputChange={handleInputChange}
          />
          
          <RatesTable 
            districts={districts}
            rateBoxes={rateBoxes}
            districtRates={districtRates}
            handleRateChange={handleRateChange}
          />
          
          <FormActions 
            formState={formState}
            districtRates={districtRates}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SellingRatesForm;

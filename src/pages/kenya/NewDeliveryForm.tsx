
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useDeliveryForm } from "./hooks/useDeliveryForm";

// Import components
import FormHeader from "./components/FormHeader";
import DeliveryFormContent from "./components/delivery-form/DeliveryFormContent";
import FormActions from "./components/FormActions";

const NewDeliveryForm = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange, handleCheckboxChange, handleSelectChange, handleSubmit } = useDeliveryForm(navigate);

  return (
    <Layout title="Create New Delivery">
      <div className="space-y-6">
        <FormHeader />
        
        <form onSubmit={handleSubmit}>
          <DeliveryFormContent 
            formState={formState}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onSelectChange={handleSelectChange}
          />
          <FormActions onSubmit={handleSubmit} />
        </form>
      </div>
    </Layout>
  );
};

export default NewDeliveryForm;

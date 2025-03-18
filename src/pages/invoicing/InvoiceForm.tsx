
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import { packageOptions } from "@/data/packageOptions";
import { countrySectorMap } from "./constants/countrySectorMap";

// Import components
import InvoiceFormHeader from "./components/InvoiceFormHeader";
import BasicInformation from "./components/BasicInformation";
import PaymentDetails from "./components/PaymentDetails";
import PackageDetailsSection from "./components/PackageDetailsSection";
import ShipperConsigneeDetails from "./components/ShipperConsigneeDetails";
import FormActions from "./components/FormActions";

const InvoiceForm = () => {
  const { id } = useParams();
  const {
    formState,
    packageItems,
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    isEditing,
    handleInputChange,
    handleSelectChange,
    handlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
    handleSelectInvoice,
    handleSave,
    savedInvoiceId,
  } = useInvoiceForm(id);
  
  return (
    <Layout title={isEditing ? "Update Invoice" : "Add Invoice"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <InvoiceFormHeader isEditing={isEditing} />
        
        <div className="p-4">
          <BasicInformation 
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            showInvoiceSelector={showInvoiceSelector}
            setShowInvoiceSelector={setShowInvoiceSelector}
            availableInvoices={availableInvoices}
            handleSelectInvoice={handleSelectInvoice}
            isEditing={isEditing}
            countrySectorMap={countrySectorMap}
          />
          
          <ShipperConsigneeDetails
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          
          <PaymentDetails 
            formState={formState}
            handleInputChange={handleInputChange}
          />
          
          <PackageDetailsSection 
            formState={formState}
            handleInputChange={handleInputChange}
            packageOptions={packageOptions}
            handlePackageSelect={handlePackageSelect}
            handleManualPackage={handleManualPackage}
            handleAddPackage={handleAddPackage}
            packageItems={packageItems}
            handleRemovePackage={handleRemovePackage}
          />
          
          <FormActions 
            handleSave={handleSave} 
            invoiceId={id || savedInvoiceId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceForm;

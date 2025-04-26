
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import { packageOptions } from "@/data/packageOptions";
import { countrySectorMap } from "./constants/countrySectorMap";
import { useEffect } from "react";
import { ensureInvoiceAvailability } from "./utils/invoiceNumberGenerator";
import { toast } from "sonner";
import { JobNumberService } from "@/services/JobNumberService";

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
    updatePackagePricing,
  } = useInvoiceForm(id);

  // Check if the invoice has a job number but it's not in formState
  useEffect(() => {
    if (formState.invoiceNumber && !formState.jobNumber) {
      const jobNumber = JobNumberService.getJobNumberByInvoice(formState.invoiceNumber);
      
      if (jobNumber) {
        console.log(`Found job number ${jobNumber} for invoice ${formState.invoiceNumber}`);
        handleInputChange({
          target: { 
            name: 'jobNumber',
            value: jobNumber
          }
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, [formState.invoiceNumber, formState.jobNumber]);

  // Update fields when package items change
  useEffect(() => {
    if (packageItems.length > 0) {
      // Calculate total volume and weight
      let totalVolume = 0;
      let totalWeight = 0;
      
      packageItems.forEach(pkg => {
        totalVolume += parseFloat(pkg.volume || '0');
        totalWeight += parseFloat(pkg.weight || '0');
      });
      
      // Update form state with calculated values
      handleInputChange({
        target: { name: 'volume', value: totalVolume.toFixed(6) }
      } as React.ChangeEvent<HTMLInputElement>);
      
      handleInputChange({
        target: { name: 'weight', value: totalWeight.toFixed(2) }
      } as React.ChangeEvent<HTMLInputElement>);
      
      handleInputChange({
        target: { name: 'packages', value: packageItems.length.toString() }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [packageItems]);
  
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
            updatePackagePricing={updatePackagePricing}
          />
          
          <ShipperConsigneeDetails
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          
          <PaymentDetails 
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            updatePackagePricing={updatePackagePricing}
            packageItems={packageItems}
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

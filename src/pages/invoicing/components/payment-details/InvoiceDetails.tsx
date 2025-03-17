
import React from "react";
import InputField from "./InputField";

interface InvoiceDetailsProps {
  formState: any;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  formState,
}) => {
  return (
    <>
      <InputField 
        label="AGENT NAME"
        name="agentName"
        value={formState.agentName}
        readOnly
      />
      
      <InputField 
        label="AGENT NUMBER"
        name="agentNumber"
        value={formState.agentNumber}
        readOnly
      />
      
      <InputField 
        label="INVOICE NUMBER"
        name="invoiceNumber"
        value={formState.invoiceNumber}
        readOnly
      />
      
      <InputField 
        label="INVOICE DATE"
        name="invoiceDate"
        value={formState.invoiceDate}
        readOnly
      />
      
      <InputField 
        label="BRANCH"
        name="branchDisplay"
        value={formState.branch}
        readOnly
      />
      
      <InputField 
        label="SECTOR"
        name="sectorDisplay"
        value={formState.sector}
        readOnly
      />
      
      <InputField 
        label="WAREHOUSE"
        name="warehouseDisplay"
        value={formState.warehouse}
        readOnly
      />
      
      <InputField 
        label="FREIGHT BY"
        name="freightByDisplay"
        value={formState.freightBy}
        readOnly
      />
      
      <InputField 
        label="VOLUME"
        name="volumeDisplay"
        value={formState.volume}
        readOnly
      />
      
      <InputField 
        label="WEIGHT"
        name="weightDisplay"
        value={formState.weight}
        readOnly
      />
      
      <InputField 
        label="PACKAGES"
        name="packagesDisplay"
        value={formState.packages}
        readOnly
      />
      
      <InputField 
        label="DOOR TO DOOR"
        name="doorToDoorDisplay"
        value={formState.doorToDoor}
        readOnly
      />
    </>
  );
};

export default InvoiceDetails;

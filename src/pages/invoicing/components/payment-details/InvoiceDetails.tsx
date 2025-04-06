
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { mockInvoiceBooks } from "../../constants/mockInvoiceBooks";

interface InvoiceDetailsProps {
  formState: any;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  formState,
}) => {
  const [assignedUser, setAssignedUser] = useState<string>("");
  
  // Find the assigned user whenever the invoice number changes
  useEffect(() => {
    if (formState.invoiceNumber) {
      // Check localStorage first
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const bookWithInvoice = activeBooks.find((book: any) => 
        book.availablePages.includes(formState.invoiceNumber)
      );
      
      if (bookWithInvoice && bookWithInvoice.assignedTo) {
        setAssignedUser(bookWithInvoice.assignedTo);
      } else {
        // Fall back to mock data
        for (const book of mockInvoiceBooks) {
          if (book.available.includes(formState.invoiceNumber)) {
            setAssignedUser(book.assignedTo || '');
            break;
          }
        }
      }
    }
  }, [formState.invoiceNumber]);
  
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
      
      {assignedUser && (
        <InputField 
          label="ASSIGNED TO"
          name="assignedUser"
          value={assignedUser}
          readOnly
        />
      )}
      
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

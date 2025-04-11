
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { mockInvoiceBooks } from "../../constants/mockInvoiceBooks";
import { JobStorageService } from "@/pages/qatar/services/JobStorageService";

interface InvoiceDetailsProps {
  formState: any;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  formState,
}) => {
  const [assignedUser, setAssignedUser] = useState<string>("");
  const [jobNumber, setJobNumber] = useState<string>("");
  
  // Find the assigned user and job number whenever the invoice number changes
  useEffect(() => {
    if (formState.invoiceNumber) {
      updateAssignedUser(formState.invoiceNumber);
      updateJobNumber(formState.invoiceNumber);
    }
  }, [formState.invoiceNumber]);
  
  // Function to update assigned user
  const updateAssignedUser = (invoiceNumber: string) => {
    // Check localStorage first
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    let foundUser = "";
    
    // Look through all active books to find the one containing this invoice number
    for (const book of activeBooks) {
      if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
        foundUser = book.assignedTo || '';
        break;
      }
    }
    
    // If not found in active books, check stored books
    if (!foundUser) {
      const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      for (const book of storedBooks) {
        if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
          foundUser = book.assignedTo || '';
          break;
        }
      }
    }
    
    // If still not found, check mock data as fallback
    if (!foundUser) {
      for (const book of mockInvoiceBooks) {
        if (book.available.includes(invoiceNumber)) {
          foundUser = book.assignedTo || '';
          break;
        }
      }
    }
    
    setAssignedUser(foundUser);
  };

  // Function to update job number
  const updateJobNumber = (invoiceNumber: string) => {
    // First check if jobNumber is already in formState
    if (formState.jobNumber) {
      setJobNumber(formState.jobNumber);
      return;
    }

    // Look for linked job number in existing invoices
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const matchingInvoice = existingInvoices.find((inv: any) => inv.invoiceNumber === invoiceNumber);
    
    if (matchingInvoice && matchingInvoice.jobNumber) {
      setJobNumber(matchingInvoice.jobNumber);
    } else {
      // Try to find job by invoice number
      const jobNum = JobStorageService.getJobNumberByInvoiceNumber(invoiceNumber);
      if (jobNum) {
        setJobNumber(jobNum);
      } else {
        setJobNumber("");
      }
    }
  };
  
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
      
      {jobNumber && (
        <InputField 
          label="JOB NUMBER"
          name="jobNumber"
          value={jobNumber}
          readOnly
        />
      )}
      
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

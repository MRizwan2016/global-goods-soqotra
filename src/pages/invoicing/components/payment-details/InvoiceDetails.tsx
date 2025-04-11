
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { mockInvoiceBooks } from "../../constants/mockInvoiceBooks";
import { JobStorageService } from "@/pages/qatar/services/JobStorageService";
import { JobNumberService } from "@/services/JobNumberService";

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
  }, [formState.invoiceNumber, formState.jobNumber]);
  
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
    // First use formState jobNumber if available (this is the most up-to-date value)
    if (formState.jobNumber) {
      setJobNumber(formState.jobNumber);
      return;
    }

    // Look for job number using our JobNumberService
    const jobNum = JobNumberService.getJobNumberByInvoice(invoiceNumber);
    if (jobNum) {
      console.log("Found job number from service:", jobNum);
      setJobNumber(jobNum);
    } else {
      // As a fallback, look for linked job number in jobs directly
      const foundJobNumber = JobStorageService.getJobNumberByInvoiceNumber(invoiceNumber);
      if (foundJobNumber) {
        console.log("Found job number from storage:", foundJobNumber);
        setJobNumber(foundJobNumber);
      } else if (formState.country) {
        // If we have a country but no job number yet, show a preview
        const previewJobNumber = JobNumberService.peekNextJobNumber(formState.country);
        setJobNumber(`${previewJobNumber} (Preview)`);
      } else {
        setJobNumber("Will be generated");
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
      
      <InputField 
        label="JOB NUMBER"
        name="jobNumber"
        value={formState.jobNumber || jobNumber}
        readOnly
        className="font-bold text-black"
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

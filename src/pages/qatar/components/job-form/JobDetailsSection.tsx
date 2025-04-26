
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateTimeSelector from "./details/DateTimeSelector";
import JobTypeSelector from "./details/JobTypeSelector";
import VehicleSelector from "./details/VehicleSelector";
import CitySelector from "./details/CitySelector";
import { useJobForm } from "./context/JobFormContext";
import { toast } from "sonner";

// Replace BookItem with the proper interface
interface InvoiceBook {
  id: string;
  bookNumber: string;
  startNumber: string;
  endNumber: string;
  availablePages: string[];
  isActivated: boolean;
  country: string;
  branch?: string;
}

const JobDetailsSection = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();
  const [availableInvoices, setAvailableInvoices] = useState<string[]>([]);
  const [allInvoices, setAllInvoices] = useState<any[]>([]);

  useEffect(() => {
    // Load all invoices for data reference
    const loadAllInvoices = () => {
      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      setAllInvoices(invoices);
      
      // Extract invoice numbers that don't already have job numbers
      const availableNumbers = invoices
        .filter((inv: any) => !inv.jobNumber || inv.jobNumber === "")
        .map((inv: any) => inv.invoiceNumber);
      
      setAvailableInvoices(availableNumbers);
    };

    loadAllInvoices();
  }, []);

  // Handle invoice selection to load associated data
  const handleInvoiceChange = (value: string) => {
    // Update the jobData with the selected invoice
    handleSelectChange("invoiceNumber", value);
    
    // Find the selected invoice data to populate other fields
    const selectedInvoice = allInvoices.find(inv => inv.invoiceNumber === value);
    if (selectedInvoice) {
      // Update other fields based on invoice data
      if (selectedInvoice.consignee1) {
        handleSelectChange("customer", selectedInvoice.consignee1);
      }
      
      if (selectedInvoice.consigneeMobile) {
        handleSelectChange("mobileNumber", selectedInvoice.consigneeMobile);
      }
      
      if (selectedInvoice.country) {
        handleSelectChange("country", selectedInvoice.country);
      }
      
      if (selectedInvoice.sector) {
        handleSelectChange("sector", selectedInvoice.sector);
      }
      
      if (selectedInvoice.branch) {
        handleSelectChange("branch", selectedInvoice.branch);
      }
      
      // Show success message
      toast.success("Invoice details loaded successfully");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB DETAILS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobTypeSelector />
        
        <div>
          <Label htmlFor="invoiceNumber">INVOICE NUMBER</Label>
          <Select
            value={jobData.invoiceNumber || ""}
            onValueChange={handleInvoiceChange}
            disabled={!isJobNumberGenerated}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="SELECT INVOICE NUMBER" />
            </SelectTrigger>
            <SelectContent>
              {availableInvoices.map((invoice) => (
                <SelectItem key={invoice} value={invoice}>
                  {invoice}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DateTimeSelector />
        
        <div className="grid grid-cols-2 gap-4">
          <VehicleSelector />
          <CitySelector />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;

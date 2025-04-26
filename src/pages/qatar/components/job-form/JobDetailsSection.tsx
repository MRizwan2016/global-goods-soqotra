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

  useEffect(() => {
    // Load available invoice numbers from active books
    const loadAvailableInvoices = () => {
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const usedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]')
        .map((inv: any) => inv.invoiceNumber);
      
      const availableNumbers: string[] = [];
      activeBooks.forEach((book: any) => {
        if (book.availablePages) {
          const filtered = book.availablePages.filter(
            (num: string) => !usedInvoices.includes(num)
          );
          availableNumbers.push(...filtered);
        }
      });
      
      setAvailableInvoices(availableNumbers);
    };

    loadAvailableInvoices();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB DETAILS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobTypeSelector />
        
        <div>
          <Label htmlFor="invoiceNumber">INVOICE NUMBER</Label>
          <Select
            value={jobData.invoiceNumber || ""}
            onValueChange={(value) => handleSelectChange("invoiceNumber", value)}
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

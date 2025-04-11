
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

interface JobDetailsSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const JobDetailsSection = ({ jobData, handleInputChange, handleSelectChange, isEnabled = true }: JobDetailsSectionProps) => {
  const [availableInvoices, setAvailableInvoices] = useState<string[]>([]);

  // Load available invoice numbers from active books
  useEffect(() => {
    const fetchAvailableInvoices = () => {
      // Get active invoice books from localStorage
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]') as InvoiceBook[];
      const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]') as InvoiceBook[];
      
      // Get used invoice numbers to filter them out
      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
      
      let allAvailableInvoices: string[] = [];
      
      // Get invoices from active books
      if (activeBooks.length > 0) {
        activeBooks.forEach((book: any) => {
          if (book.availablePages) {
            // Filter out already used invoice numbers
            const availableFromBook = book.availablePages.filter(
              (invoice: string) => !usedInvoiceNumbers.includes(invoice)
            );
            allAvailableInvoices = [...allAvailableInvoices, ...availableFromBook];
          }
        });
      } else if (storedBooks.length > 0) {
        // If no active books, try stored books
        storedBooks.forEach((book: any) => {
          if (book.isActivated && book.availablePages) {
            // Filter out already used invoice numbers
            const availableFromBook = book.availablePages.filter(
              (invoice: string) => !usedInvoiceNumbers.includes(invoice)
            );
            allAvailableInvoices = [...allAvailableInvoices, ...availableFromBook];
          }
        });
      }
      
      setAvailableInvoices(allAvailableInvoices);
    };
    
    fetchAvailableInvoices();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB DETAILS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobTypeSelector 
          jobType={jobData.jobType} 
          handleSelectChange={handleSelectChange}
          isEnabled={isEnabled}
        />
        
        <div>
          <Label htmlFor="invoiceNumber" className="font-medium text-gray-700 mb-1 block">
            INVOICE NUMBER
          </Label>
          <Select
            value={jobData.invoiceNumber || ""}
            onValueChange={(value) => handleSelectChange("invoiceNumber", value)}
            disabled={!isEnabled}
          >
            <SelectTrigger id="invoiceNumber" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="SELECT INVOICE NUMBER" />
            </SelectTrigger>
            <SelectContent>
              {availableInvoices.length > 0 ? (
                availableInvoices.map((invoice, index) => (
                  <SelectItem key={index} value={invoice}>{invoice}</SelectItem>
                ))
              ) : (
                <SelectItem value="no-invoices-available">No available invoice numbers</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <DateTimeSelector 
          date={jobData.date} 
          time={jobData.time} 
          amPm={jobData.amPm} 
          sameDay={jobData.sameDay}
          collectDate={jobData.collectDate}
          jobType={jobData.jobType}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          isEnabled={isEnabled}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <VehicleSelector 
            vehicle={jobData.vehicle} 
            handleSelectChange={handleSelectChange}
            isEnabled={isEnabled}
          />
          
          <CitySelector 
            city={jobData.city} 
            handleSelectChange={handleSelectChange}
            isEnabled={isEnabled}
            country={jobData.country}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;


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
import { FileText } from "lucide-react";

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
  assignedTo?: string;
}

const JobDetailsSection = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();
  const [availableInvoices, setAvailableInvoices] = useState<{
    invoiceNumber: string;
    bookNumber: string;
    assignedTo?: string;
  }[]>([]);
  const [allInvoices, setAllInvoices] = useState<any[]>([]);

  useEffect(() => {
    // Load all invoices for data reference
    const loadAllInvoices = () => {
      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      setAllInvoices(invoices);
      
      // Load available invoices that don't have job numbers and aren't assigned
      loadAvailableInvoices();
    };

    loadAllInvoices();
  }, []);
  
  const loadAvailableInvoices = () => {
    // Get existing invoices that don't have job numbers
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoicesWithoutJobNumbers = existingInvoices
      .filter((inv: any) => !inv.jobNumber || inv.jobNumber === "");
    
    // Get unassigned invoice numbers from books
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    
    let availableNumbersList: {
      invoiceNumber: string;
      bookNumber: string;
      assignedTo?: string;
    }[] = [];
    
    // Add invoice numbers from existing invoices without job numbers
    invoicesWithoutJobNumbers.forEach((inv: any) => {
      // Find the book this invoice belongs to
      const bookInfo = getBookInfoByInvoiceNumber(inv.invoiceNumber);
      availableNumbersList.push({
        invoiceNumber: inv.invoiceNumber,
        bookNumber: bookInfo?.bookNumber || "Unknown",
        assignedTo: bookInfo?.assignedTo
      });
    });
    
    // Add invoice numbers from books that aren't used yet
    const usedNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
    
    activeBooks.forEach((book: any) => {
      if (book.availablePages) {
        const unusedPages = book.availablePages.filter(
          (page: string) => !usedNumbers.includes(page)
        );
        
        const pagesWithBookInfo = unusedPages.map((pageNumber: string) => ({
          invoiceNumber: pageNumber,
          bookNumber: book.bookNumber,
          assignedTo: book.assignedTo
        }));
        
        availableNumbersList = [...availableNumbersList, ...pagesWithBookInfo];
      }
    });
    
    // Filter out duplicates
    const uniqueInvoices: {[key: string]: any} = {};
    availableNumbersList.forEach(item => {
      if (!uniqueInvoices[item.invoiceNumber]) {
        uniqueInvoices[item.invoiceNumber] = item;
      }
    });
    
    setAvailableInvoices(Object.values(uniqueInvoices));
  };
  
  // Helper function to get book information for an invoice number
  const getBookInfoByInvoiceNumber = (invoiceNumber: string) => {
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const allStoredBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    const allBooks = [...activeBooks, ...allStoredBooks];
    
    for (const book of allBooks) {
      if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
        return {
          bookNumber: book.bookNumber,
          assignedTo: book.assignedTo
        };
      }
    }
    
    return null;
  };

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
      
      // Get book info
      const bookInfo = getBookInfoByInvoiceNumber(value);
      const bookMessage = bookInfo ? ` from Book #${bookInfo.bookNumber}` : '';
      
      // Show success message
      toast.success(`Invoice ${value}${bookMessage} details loaded successfully`);
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
            <SelectContent className="max-h-60 overflow-y-auto bg-white">
              {availableInvoices.map((invoice) => (
                <SelectItem 
                  key={invoice.invoiceNumber} 
                  value={invoice.invoiceNumber}
                  className="py-2 px-2 hover:bg-gray-100"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{invoice.invoiceNumber}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 pl-6">
                      Book: <span className="font-medium">{invoice.bookNumber}</span>
                      {invoice.assignedTo && (
                        <span className="ml-2 text-gray-500">({invoice.assignedTo})</span>
                      )}
                    </div>
                  </div>
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

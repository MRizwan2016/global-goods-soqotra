
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InvoiceSearchInput from "../cargo-search/InvoiceSearchInput";
import { mockInvoiceBooks } from "@/pages/invoicing/constants/mockInvoiceBooks";

interface InvoiceInformationSectionProps {
  invoiceNumber: string;
  lineNumber: string;
  shipper: string;
  consignee: string;
  warehouse: string;
  showSuggestions: boolean;
  setInvoiceNumber: (value: string) => void;
  setLineNumber: (value: string) => void;
  setShipper: (value: string) => void;
  setConsignee: (value: string) => void;
  setWarehouse: (value: string) => void;
  setShowSuggestions: (value: boolean) => void;
  onSelectInvoice: (invoice: any) => void;
}

const InvoiceInformationSection: React.FC<InvoiceInformationSectionProps> = ({
  invoiceNumber,
  lineNumber,
  shipper,
  consignee,
  warehouse,
  showSuggestions,
  setInvoiceNumber,
  setLineNumber,
  setShipper,
  setConsignee,
  setWarehouse,
  setShowSuggestions,
  onSelectInvoice
}) => {
  const [assignedUser, setAssignedUser] = useState<string>("");
  const [availableInvoices, setAvailableInvoices] = useState<any[]>([]);
  
  // Load available invoice numbers on component mount
  useEffect(() => {
    // Get active invoice books from localStorage
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    
    // Get used invoice numbers to filter them out
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
    
    // We want ALL invoice numbers for container loading (used and unused)
    let allInvoices: any[] = [];
    
    // Get invoices from active books
    if (activeBooks.length > 0) {
      activeBooks.forEach((book: any) => {
        if (book.availablePages && book.assignedTo) {
          const bookInvoices = book.availablePages.map((invoiceNo: string) => ({
            invoiceNumber: invoiceNo,
            bookNumber: book.bookNumber,
            assignedTo: book.assignedTo
          }));
            
          allInvoices = [...allInvoices, ...bookInvoices];
        }
      });
    } else if (storedBooks.length > 0) {
      // If no active books, try stored books
      storedBooks.forEach((book: any) => {
        if (book.isActivated && book.availablePages) {
          const bookInvoices = book.availablePages.map((invoiceNo: string) => ({
            invoiceNumber: invoiceNo,
            bookNumber: book.bookNumber,
            assignedTo: book.assignedTo || 'System User'
          }));
            
          allInvoices = [...allInvoices, ...bookInvoices];
        }
      });
    }
    
    if (allInvoices.length === 0) {
      // Fallback to mock data if no invoices found in storage
      mockInvoiceBooks.forEach(book => {
        // Use either available property (for backward compatibility) or invoiceNumbers
        const invoiceNumbersList = book.available || book.invoiceNumbers;
        const bookInvoices = invoiceNumbersList.map((invoiceNo) => ({
          invoiceNumber: invoiceNo,
          bookNumber: book.bookNumber,
          assignedTo: book.assignedTo || 'Default User'
        }));
          
        allInvoices = [...allInvoices, ...bookInvoices];
      });
    }
    
    // Also add existing invoices with their data
    existingInvoices.forEach((invoice: any) => {
      if (!allInvoices.some(inv => inv.invoiceNumber === invoice.invoiceNumber)) {
        allInvoices.push({
          invoiceNumber: invoice.invoiceNumber,
          bookNumber: "Used",
          assignedTo: invoice.salesRep || invoice.handOverBy || "Unknown"
        });
      }
    });
    
    setAvailableInvoices(allInvoices);
  }, []);
  
  // Find the assigned user whenever the invoice number changes
  useEffect(() => {
    if (invoiceNumber) {
      // Check in our loaded available invoices
      const selectedInvoice = availableInvoices.find(inv => inv.invoiceNumber === invoiceNumber);
      if (selectedInvoice && selectedInvoice.assignedTo) {
        setAssignedUser(selectedInvoice.assignedTo);
        return;
      }
      
      // Check localStorage if not found
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      let foundUser = "";
      
      // Look through all active books
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
          // Use either available property or invoiceNumbers
          const invoiceNumbersList = book.available || book.invoiceNumbers;
          if (invoiceNumbersList.includes(invoiceNumber)) {
            foundUser = book.assignedTo || '';
            break;
          }
        }
      }
      
      setAssignedUser(foundUser);
    } else {
      setAssignedUser("");
    }
  }, [invoiceNumber, availableInvoices]);

  const handleManualInvoiceSelect = (value: string) => {
    if (value) {
      setInvoiceNumber(value);
      // Lookup invoice data if available
      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const matchingInvoice = existingInvoices.find((inv: any) => inv.invoiceNumber === value);
      
      if (matchingInvoice) {
        // Pre-fill data from existing invoice
        setShipper(matchingInvoice.shipper1 || "");
        setConsignee(matchingInvoice.consignee1 || "");
        setWarehouse(matchingInvoice.warehouse || "");
        
        // Notify parent to handle full invoice selection
        onSelectInvoice(matchingInvoice);
      }
    }
  };
  
  return (
    <div>
      <div className="relative">
        <Label className="font-bold text-gray-700 mb-1 block">INVOICE NUMBER:</Label>
        <Select
          value={invoiceNumber}
          onValueChange={handleManualInvoiceSelect}
        >
          <SelectTrigger className="bg-white border border-gray-300 rounded">
            <SelectValue placeholder="Select invoice number" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {availableInvoices.map((invoice: any) => (
              <SelectItem 
                key={invoice.invoiceNumber} 
                value={invoice.invoiceNumber}
                className="flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span>{invoice.invoiceNumber}</span>
                  <span className="text-xs text-gray-500">Book {invoice.bookNumber}</span>
                </div>
                {invoice.assignedTo && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {invoice.assignedTo}
                  </span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {assignedUser && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
            {assignedUser}
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">CARGO GROUP/LINE NO.</Label>
        <Input 
          value={lineNumber}
          onChange={(e) => setLineNumber(e.target.value)}
          placeholder="Line number"
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
        <Input 
          value={shipper}
          onChange={(e) => setShipper(e.target.value)}
          placeholder="Shipper name"
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">CONSIGNEE:</Label>
        <Input 
          value={consignee}
          onChange={(e) => setConsignee(e.target.value)}
          placeholder="Consignee name"
        />
      </div>
      
      <div className="mt-3">
        <Label className="font-bold text-gray-700 mb-1 block">WAREHOUSE:</Label>
        <Input 
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          placeholder="Warehouse"
        />
      </div>
    </div>
  );
};

export default InvoiceInformationSection;

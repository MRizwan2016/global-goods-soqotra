
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  
  // Find the assigned user whenever the invoice number changes
  useEffect(() => {
    if (invoiceNumber) {
      // Check localStorage first
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
          if (book.available.includes(invoiceNumber)) {
            foundUser = book.assignedTo || '';
            break;
          }
        }
      }
      
      setAssignedUser(foundUser);
    } else {
      setAssignedUser("");
    }
  }, [invoiceNumber]);
  
  return (
    <div>
      <div className="relative">
        <InvoiceSearchInput 
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          onSelectInvoice={onSelectInvoice}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
        
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

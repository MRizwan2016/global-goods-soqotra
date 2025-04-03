
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InvoiceSearchInput from "../cargo-search/InvoiceSearchInput";

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
  return (
    <div>
      <InvoiceSearchInput 
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        onSelectInvoice={onSelectInvoice}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      
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

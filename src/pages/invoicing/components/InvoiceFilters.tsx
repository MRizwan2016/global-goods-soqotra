
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockInvoiceData } from "@/data/mockData";

interface InvoiceFiltersProps {
  sector: string;
  setSector: (value: string) => void;
  branch: string;
  setBranch: (value: string) => void;
  transport: string;
  setTransport: (value: string) => void;
  door: string;
  setDoor: (value: string) => void;
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
}

const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({
  sector,
  setSector,
  branch,
  setBranch,
  transport,
  setTransport,
  door,
  setDoor,
  invoiceNumber,
  setInvoiceNumber,
}) => {
  // Get unique invoice numbers
  const uniqueInvoiceNumbers = [...new Set(mockInvoiceData.map(i => i.invoiceNumber))];

  return (
    <div className="flex flex-wrap gap-2 w-full">
      <select 
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
      >
        <option value="ALL">ALL SECTORS</option>
        <option value="COLOMBO : C">COLOMBO : C</option>
        <option value="DOHA : D">DOHA : D</option>
      </select>
      
      <select 
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
      >
        <option value="ALL">ALL BRANCHES</option>
        <option value="MAIN">MAIN</option>
        <option value="DOHA">DOHA</option>
      </select>
      
      <select 
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
      >
        <option value="ALL">ALL TRANSPORT</option>
        <option value="SEA">SEA</option>
        <option value="AIR">AIR</option>
        <option value="LAND">LAND</option>
      </select>
      
      <select 
        value={door}
        onChange={(e) => setDoor(e.target.value)}
        className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
      >
        <option value="ALL">ALL D2D</option>
        <option value="YES">YES</option>
        <option value="NO">NO</option>
      </select>
      
      <select 
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        className="bg-blue-500 text-white py-2 px-3 rounded text-sm min-w-[150px]"
      >
        <option value="">INVOICE NUMBER</option>
        {uniqueInvoiceNumbers.map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      
      <Link to="/data-entry/invoicing/new" className="ml-auto">
        <Button className="bg-blue-500 hover:bg-blue-600">
          Add New
        </Button>
      </Link>
    </div>
  );
};

export default InvoiceFilters;

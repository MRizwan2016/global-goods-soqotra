
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FilterBarProps {
  sector: string;
  setSector: (value: string) => void;
  branch: string;
  setBranch: (value: string) => void;
  transport: string;
  setTransport: (value: string) => void;
  warehouses: string;
  setWarehouses: (value: string) => void;
  zones: string;
  setZones: (value: string) => void;
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sector,
  setSector,
  branch,
  setBranch,
  transport,
  setTransport,
  warehouses,
  setWarehouses,
  zones,
  setZones,
  invoiceNumber,
  setInvoiceNumber,
}) => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      <select 
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
      >
        <option value="ALL">ALL SECTORS</option>
        <option value="COLOMBO : C">COLOMBO : C</option>
        <option value="DOHA : D">DOHA : D</option>
      </select>
      
      <select 
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
      >
        <option value="ALL">ALL BRANCHES</option>
        <option value="MAIN">MAIN</option>
        <option value="DOHA">DOHA</option>
      </select>
      
      <select 
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
      >
        <option value="ALL">ALL</option>
        <option value="SEA">SEA</option>
        <option value="AIR">AIR</option>
      </select>
      
      <select 
        value={warehouses}
        onChange={(e) => setWarehouses(e.target.value)}
        className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
      >
        <option value="ALL">ALL</option>
        <option value="Galle">Galle</option>
        <option value="Kurunegala">Kurunegala</option>
        <option value="Colombo">Colombo</option>
        <option value="Kandy">Kandy</option>
      </select>
      
      <select 
        value={zones}
        onChange={(e) => setZones(e.target.value)}
        className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in"
      >
        <option value="ALL">ALL</option>
        <option value="Normal Rate">Normal Rate</option>
        <option value="Special Rate">Special Rate</option>
        <option value="Corporate Rate">Corporate Rate</option>
      </select>
      
      <select 
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        className="bg-[#33C3F0] text-white py-2 px-3 rounded text-sm hover:bg-[#1EA5E9] transition-colors animate-fade-in min-w-[150px]"
      >
        <option value="">INVOICE NUMBER</option>
        {[...new Set([
          "INV-2023-001", 
          "INV-2023-002", 
          "INV-2023-003", 
          "INV-2023-004", 
          "INV-2023-005"
        ])].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      
      <div className="ml-auto">
        <input
          type="text"
          placeholder="BARCODE"
          className="border border-gray-300 rounded px-2 py-1 text-sm hover:border-blue-400 transition-colors focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />
      </div>
    </div>
  );
};

export default FilterBar;

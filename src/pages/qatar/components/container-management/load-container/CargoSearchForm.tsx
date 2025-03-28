
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerCargo } from "../../../types/containerTypes";
import { toast } from "sonner";
import { Search, Barcode, FileSearch, Package, Plus } from "lucide-react";
import BarcodeSearch from "./cargo-search/BarcodeSearch";
import InvoiceSearchInput from "./cargo-search/InvoiceSearchInput";
import CargoDetailsInputs from "./cargo-search/CargoDetailsInputs";
import InsertCargoButton from "./cargo-search/InsertCargoButton";
import SearchMethodSelector from "./cargo-search/SearchMethodSelector";

interface CargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
  existingCargo: ContainerCargo[];
}

// Mock search results
const mockInvoiceSearch = (query: string): any[] => {
  if (!query) return [];
  return [
    {
      id: "mock1",
      invoiceNumber: query,
      lineNumber: "LN001",
      packageName: "General Cargo",
      volume: 1.2,
      weight: 300,
      shipper: "Qatar Trading Co.",
      consignee: "Kenya Imports Ltd",
      barcode: "BC123456789",
      wh: "WH001",
      d2d: true,
      quantity: 1
    },
    {
      id: "mock2",
      invoiceNumber: query,
      lineNumber: "LN002",
      packageName: "Electronics",
      volume: 0.8,
      weight: 150,
      shipper: "Tech Distributors LLC",
      consignee: "Digital Solutions Kenya",
      barcode: "BC987654321",
      wh: "WH002",
      d2d: false,
      quantity: 1
    }
  ];
};

const mockBarcodeSearch = (barcode: string): any | null => {
  if (!barcode) return null;
  return {
    id: "mock-barcode",
    invoiceNumber: "INV" + barcode.substring(2, 7),
    lineNumber: "LN003",
    packageName: "Barcode Item",
    volume: 0.5,
    weight: 75,
    shipper: "Barcode Shipper",
    consignee: "Barcode Consignee",
    barcode: barcode,
    wh: "WH003",
    d2d: true,
    quantity: 1
  };
};

const CargoSearchForm: React.FC<CargoSearchFormProps> = ({ 
  containerId, 
  onAddCargo,
  existingCargo 
}) => {
  const [searchMethod, setSearchMethod] = useState<"invoice" | "barcode">("invoice");
  const [invoiceQuery, setInvoiceQuery] = useState("");
  const [barcodeQuery, setBarcodeQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [cargoForm, setCargoForm] = useState({
    invoiceNumber: "",
    lineNumber: "",
    barcode: "",
    packageName: "",
    volume: "",
    weight: "",
    shipper: "",
    consignee: "",
    wh: "WH001",
    d2d: false,
    quantity: "1"
  });

  // Handle invoice search
  const handleInvoiceSearch = () => {
    if (!invoiceQuery) {
      toast.error("Please enter an invoice number");
      return;
    }
    
    const results = mockInvoiceSearch(invoiceQuery);
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.error("No results found for invoice: " + invoiceQuery);
    }
  };

  // Handle barcode search
  const handleBarcodeSearch = () => {
    if (!barcodeQuery) {
      toast.error("Please scan or enter a barcode");
      return;
    }
    
    const result = mockBarcodeSearch(barcodeQuery);
    
    if (result) {
      setSelectedResult(result);
      // Prefill the form with the result data
      setCargoForm({
        invoiceNumber: result.invoiceNumber,
        lineNumber: result.lineNumber,
        barcode: result.barcode,
        packageName: result.packageName,
        volume: result.volume.toString(),
        weight: result.weight.toString(),
        shipper: result.shipper,
        consignee: result.consignee,
        wh: result.wh || "WH001",
        d2d: result.d2d || false,
        quantity: result.quantity?.toString() || "1"
      });
      toast.success("Item found: " + result.packageName);
    } else {
      toast.error("No result found for barcode: " + barcodeQuery);
    }
  };

  // Select a result from the search results
  const handleSelectResult = (result: any) => {
    setSelectedResult(result);
    // Prefill the form with the result data
    setCargoForm({
      invoiceNumber: result.invoiceNumber,
      lineNumber: result.lineNumber,
      barcode: result.barcode,
      packageName: result.packageName,
      volume: result.volume.toString(),
      weight: result.weight.toString(),
      shipper: result.shipper,
      consignee: result.consignee,
      wh: result.wh || "WH001",
      d2d: result.d2d || false,
      quantity: result.quantity?.toString() || "1"
    });
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCargoForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Add cargo to the container
  const handleAddCargo = () => {
    // Validate form
    if (!cargoForm.invoiceNumber || !cargoForm.packageName || !cargoForm.volume || !cargoForm.weight) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check if this item is already in the container
    const isDuplicate = existingCargo.some(item => 
      item.barcode === cargoForm.barcode && cargoForm.barcode !== ""
    );
    
    if (isDuplicate) {
      toast.error("This item is already in the container");
      return;
    }
    
    // Create cargo item
    const newCargo: ContainerCargo = {
      id: uuidv4(),
      containerId: containerId,
      invoiceNumber: cargoForm.invoiceNumber,
      lineNumber: cargoForm.lineNumber || `LN${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: cargoForm.barcode || `BC${Math.floor(100000000 + Math.random() * 900000000)}`,
      packageName: cargoForm.packageName,
      volume: parseFloat(cargoForm.volume),
      weight: parseFloat(cargoForm.weight),
      shipper: cargoForm.shipper,
      consignee: cargoForm.consignee,
      wh: cargoForm.wh,
      d2d: cargoForm.d2d,
      quantity: parseInt(cargoForm.quantity) || 1
    };
    
    // Add to parent component
    onAddCargo(newCargo);
    
    // Reset form
    setCargoForm({
      invoiceNumber: "",
      lineNumber: "",
      barcode: "",
      packageName: "",
      volume: "",
      weight: "",
      shipper: "",
      consignee: "",
      wh: "WH001",
      d2d: false,
      quantity: "1"
    });
    
    // Reset search state
    setSearchResults([]);
    setSelectedResult(null);
    setInvoiceQuery("");
    setBarcodeQuery("");
    
    // Show success toast
    toast.success("Cargo added successfully");
  };

  return (
    <div className="space-y-6">
      <SearchMethodSelector 
        searchMethod={searchMethod}
        onMethodChange={setSearchMethod}
      />
      
      {searchMethod === "invoice" && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileSearch className="mr-2" size={18} />
              Invoice Search
            </CardTitle>
            <CardDescription>
              Search for cargo by invoice number
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-2 mb-4">
              <div className="flex-grow">
                <InvoiceSearchInput 
                  value={invoiceQuery}
                  onChange={(e) => setInvoiceQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInvoiceSearch()}
                />
              </div>
              <Button onClick={handleInvoiceSearch} className="flex-shrink-0">
                <Search className="mr-2" size={16} />
                Search
              </Button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Search Results</h3>
                <div className="border rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Invoice</th>
                        <th className="px-4 py-2 text-left">Package</th>
                        <th className="px-4 py-2 text-right">Volume</th>
                        <th className="px-4 py-2 text-right">Weight</th>
                        <th className="px-4 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((result) => (
                        <tr 
                          key={result.id} 
                          className={`border-b hover:bg-gray-50 ${
                            selectedResult?.id === result.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="px-4 py-2">{result.invoiceNumber}</td>
                          <td className="px-4 py-2">{result.packageName}</td>
                          <td className="px-4 py-2 text-right">{result.volume.toFixed(3)}</td>
                          <td className="px-4 py-2 text-right">{result.weight.toFixed(2)}</td>
                          <td className="px-4 py-2 text-center">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSelectResult(result)}
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {searchMethod === "barcode" && (
        <BarcodeSearch 
          value={barcodeQuery}
          onChange={setBarcodeQuery}
          onSearch={handleBarcodeSearch}
        />
      )}
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Package className="mr-2" size={18} />
            Cargo Details
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <CargoDetailsInputs 
            cargoForm={cargoForm}
            onChange={handleChange}
          />
          
          <div className="flex justify-end mt-6">
            <InsertCargoButton onClick={handleAddCargo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CargoSearchForm;

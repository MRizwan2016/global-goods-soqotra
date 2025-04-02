
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerCargo } from "../../../types/containerTypes";
import { toast } from "sonner";
import { Search, Barcode, FileSearch, Package, Plus, AlertCircle } from "lucide-react";
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

interface InvoiceSuggestion {
  invoiceNumber: string;
  shipper: string;
  consignee: string;
  packageName?: string;
  volume?: number;
  weight?: number;
  id?: string;
}

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
  const [invoiceSuggestions, setInvoiceSuggestions] = useState<InvoiceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  // Fetch invoice data from localStorage when component mounts
  useEffect(() => {
    // Get all saved invoices from localStorage
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Also check generated invoices if they exist
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    
    // Combine the invoices
    const allInvoices = [...savedInvoices, ...generatedInvoices];
    
    // Map to the format needed for suggestions
    const mappedInvoices = allInvoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      shipper: invoice.shipper1 || invoice.shipper || "Unknown Shipper",
      consignee: invoice.consignee1 || invoice.consignee || "Unknown Consignee",
      packageName: invoice.packageName || "General Cargo",
      volume: calculateTotalVolume(invoice),
      weight: calculateTotalWeight(invoice)
    }));
    
    // Store for later use
    localStorage.setItem('availableInvoices', JSON.stringify(mappedInvoices));
    
    console.log("Loaded invoice data for container loading:", mappedInvoices.length, "invoices");
  }, []);

  // Calculate total volume for an invoice (from packageDetails)
  const calculateTotalVolume = (invoice: any): number => {
    if (!invoice.packageDetails || !Array.isArray(invoice.packageDetails)) return 0;
    return invoice.packageDetails.reduce((total: number, pkg: any) => total + (parseFloat(pkg.volume) || 0), 0);
  };

  // Calculate total weight for an invoice (from packageDetails)
  const calculateTotalWeight = (invoice: any): number => {
    if (!invoice.packageDetails || !Array.isArray(invoice.packageDetails)) return 0;
    return invoice.packageDetails.reduce((total: number, pkg: any) => total + (parseFloat(pkg.weight) || 0), 0);
  };
  
  // Filter invoice suggestions based on query
  useEffect(() => {
    if (invoiceQuery.length >= 3) {
      const availableInvoices: InvoiceSuggestion[] = JSON.parse(localStorage.getItem('availableInvoices') || '[]');
      
      const filteredInvoices = availableInvoices.filter(invoice => 
        invoice.invoiceNumber.includes(invoiceQuery)
      );
      
      setInvoiceSuggestions(filteredInvoices);
      setShowSuggestions(filteredInvoices.length > 0);
    } else {
      setInvoiceSuggestions([]);
      setShowSuggestions(false);
    }
  }, [invoiceQuery]);

  // Handle invoice search
  const handleInvoiceSearch = () => {
    if (!invoiceQuery) {
      toast.error("Please enter an invoice number");
      return;
    }
    
    // Search in all available invoices
    const availableInvoices = JSON.parse(localStorage.getItem('availableInvoices') || '[]');
    const results = availableInvoices.filter((invoice: any) => 
      invoice.invoiceNumber.includes(invoiceQuery)
    );
    
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
    
    const mockResult = {
      id: "mock-barcode",
      invoiceNumber: "INV" + barcodeQuery.substring(2, 7),
      lineNumber: "LN003",
      packageName: "Barcode Item",
      volume: 0.5,
      weight: 75,
      shipper: "Barcode Shipper",
      consignee: "Barcode Consignee",
      barcode: barcodeQuery,
      wh: "WH003",
      d2d: true,
      quantity: 1
    };
    
    setSelectedResult(mockResult);
    // Prefill the form with the result data
    setCargoForm({
      invoiceNumber: mockResult.invoiceNumber,
      lineNumber: mockResult.lineNumber,
      barcode: mockResult.barcode,
      packageName: mockResult.packageName,
      volume: mockResult.volume.toString(),
      weight: mockResult.weight.toString(),
      shipper: mockResult.shipper,
      consignee: mockResult.consignee,
      wh: mockResult.wh || "WH001",
      d2d: mockResult.d2d || false,
      quantity: mockResult.quantity?.toString() || "1"
    });
    toast.success("Item found: " + mockResult.packageName);
  };

  // Handle selecting an invoice from the suggestions dropdown
  const handleSelectInvoice = (invoice: InvoiceSuggestion) => {
    setInvoiceQuery(invoice.invoiceNumber);
    setShowSuggestions(false);
    
    // Create a result object from the selected invoice
    const result = {
      id: invoice.id || uuidv4(),
      invoiceNumber: invoice.invoiceNumber,
      lineNumber: `LN${Math.floor(1000 + Math.random() * 9000)}`,
      packageName: invoice.packageName || "General Cargo",
      volume: invoice.volume || 1,
      weight: invoice.weight || 100,
      shipper: invoice.shipper,
      consignee: invoice.consignee,
      barcode: `BC${Math.floor(100000000 + Math.random() * 900000000)}`,
      wh: "WH001",
      d2d: false,
      quantity: 1
    };
    
    setSelectedResult(result);
    // Prefill the form
    setCargoForm({
      invoiceNumber: result.invoiceNumber,
      lineNumber: result.lineNumber,
      barcode: result.barcode,
      packageName: result.packageName,
      volume: result.volume.toString(),
      weight: result.weight.toString(),
      shipper: result.shipper,
      consignee: result.consignee,
      wh: "WH001",
      d2d: false,
      quantity: "1"
    });
    
    toast.success(`Invoice ${invoice.invoiceNumber} selected`);
  };

  // Select a result from the search results table
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
    
    // Check if this invoice+barcode combination is already in the container
    const isDuplicate = existingCargo.some(item => 
      item.invoiceNumber === cargoForm.invoiceNumber && 
      item.barcode === cargoForm.barcode && 
      cargoForm.barcode !== ""
    );
    
    if (isDuplicate) {
      toast.error("This package is already loaded in the container", {
        description: "Each package can only be loaded once",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
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
                  bookingFormSuggestions={invoiceSuggestions}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                  onSelectInvoice={handleSelectInvoice}
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

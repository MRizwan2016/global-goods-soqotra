
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { ContainerCargo } from "../../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { mockInvoiceData } from "@/data/mockData";
import SearchMethodSelector from "./cargo-search/SearchMethodSelector";
import InvoiceSearchInput from "./cargo-search/InvoiceSearchInput";
import BarcodeSearch from "./cargo-search/BarcodeSearch";
import CargoDetailsInputs from "./cargo-search/CargoDetailsInputs";
import InsertCargoButton from "./cargo-search/InsertCargoButton";

interface CargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
  existingCargo: ContainerCargo[];
}

const CargoSearchForm: React.FC<CargoSearchFormProps> = ({
  containerId,
  onAddCargo,
  existingCargo
}) => {
  const [searchBy, setSearchBy] = useState("GY");
  const [bookingForm, setBookingForm] = useState("");
  const [bookingFormSuggestions, setBookingFormSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [packageNumber, setPackageNumber] = useState("");
  const [packageName, setPackageName] = useState("");
  const [shipper, setShipper] = useState("");
  
  // State for current invoice data
  const [currentInvoiceData, setCurrentInvoiceData] = useState<any>(null);
  
  // Generate a unique barcode if not provided
  const generateBarcode = () => {
    const timestamp = new Date().getTime().toString().slice(-8);
    return `BC${timestamp}`;
  };

  // Enhanced mock invoices using real invoice data
  const enhancedMockInvoices = mockInvoiceData.map(invoice => ({
    invoiceNumber: invoice.invoiceNumber || `GY ${Math.floor(13136051 + Math.random() * 1000)}`,
    items: [{
      name: invoice.packageType || "Wooden Box", // Use the actual package type from invoice
      weight: invoice.weight || 10,
      volume: invoice.volume || 0.1
    }],
    shipper: invoice.shipper1,
    consignee: invoice.consignee1,
    packageType: invoice.packageType // Store the original package type
  }));

  useEffect(() => {
    if (bookingForm.length >= 2) {
      // Filter invoices that match the input
      const filtered = enhancedMockInvoices.filter(invoice => 
        invoice.invoiceNumber.toUpperCase().includes(bookingForm.toUpperCase())
      );
      setBookingFormSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [bookingForm]);

  const handleSelectInvoice = (invoice: any) => {
    setBookingForm(invoice.invoiceNumber);
    setCurrentInvoiceData(invoice);
    setShowSuggestions(false);
    
    // Auto-fill package data with proper package type
    if (invoice.items && invoice.items.length > 0) {
      // Use the package type from the invoice data
      setPackageName(invoice.packageType || invoice.items[0].name || "Wooden Box");
      setShipper(invoice.shipper || "");
    }
    
    toast.success(`Invoice ${invoice.invoiceNumber} selected`);
  };

  const handleBarcodeSearch = () => {
    if (barcode) {
      // Find invoice by barcode in a real app
      toast.info(`Searching for barcode: ${barcode}`);
    }
  };

  const handleInsertCargo = () => {
    if (!packageName || !shipper) {
      toast.error("Package name and shipper are required");
      return;
    }
    
    const generatedBarcode = barcode || generateBarcode();

    // Ensure we're using the correct volume from the invoice
    const invoiceVolume = currentInvoiceData?.items?.[0]?.volume;
    const invoiceWeight = currentInvoiceData?.items?.[0]?.weight;
    
    const newCargoItem: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber: bookingForm || "/00000000/N",
      lineNumber: packageNumber || "1",
      barcode: generatedBarcode,
      packageName: packageName, // Use the package type as set
      volume: typeof invoiceVolume === 'number' ? invoiceVolume : 0.1,
      weight: typeof invoiceWeight === 'number' ? invoiceWeight : 10,
      shipper,
      consignee: currentInvoiceData?.consignee || shipper,
      wh: "K",
      d2d: false
    };
    
    onAddCargo(newCargoItem);
    
    // Clear form fields
    setPackageName("");
    setPackageNumber("");
    
    toast.success("Item added to cargo list");
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchMethodSelector 
          searchBy={searchBy} 
          onSearchMethodChange={setSearchBy} 
        />
        
        <InvoiceSearchInput 
          bookingForm={bookingForm}
          onBookingFormChange={setBookingForm}
          bookingFormSuggestions={bookingFormSuggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          onSelectInvoice={handleSelectInvoice}
        />
      </div>
      
      <BarcodeSearch 
        barcode={barcode}
        onBarcodeChange={setBarcode}
        onBarcodeSearch={handleBarcodeSearch}
      />
      
      <CargoDetailsInputs 
        bookingForm={bookingForm}
        packageNumber={packageNumber}
        packageName={packageName}
        shipper={shipper}
        onPackageNumberChange={setPackageNumber}
        onPackageNameChange={setPackageName}
        onShipperChange={setShipper}
      />
      
      <InsertCargoButton onInsertCargo={handleInsertCargo} />
      
      {existingCargo.length > 0 && (
        <div className="mt-4 text-sm text-green-600">
          {existingCargo.length} package(s) added to this container. Scroll down to view the cargo list.
        </div>
      )}
    </div>
  );
};

export default CargoSearchForm;

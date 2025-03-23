
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ContainerCargo } from "../../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockInvoiceData } from "@/data/mockData";

interface CargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoSearchForm: React.FC<CargoSearchFormProps> = ({
  containerId,
  onAddCargo,
}) => {
  const [searchBy, setSearchBy] = useState("GY");
  const [bookingForm, setBookingForm] = useState("");
  const [bookingFormSuggestions, setBookingFormSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [packageNumber, setPackageNumber] = useState("");
  const [packageName, setPackageName] = useState("");
  const [shipper, setShipper] = useState("");
  
  // New state for current invoice data
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
      name: "Package " + invoice.packages,
      weight: invoice.weight || 10,
      volume: invoice.volume || 0.1
    }],
    shipper: invoice.shipper1,
    consignee: invoice.consignee1
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
    
    // Auto-fill package data if available
    if (invoice.items && invoice.items.length > 0) {
      const item = invoice.items[0];
      setPackageName(item.name);
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
    
    const newCargoItem: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber: bookingForm || "/00000000/N",
      lineNumber: "1",
      barcode: generatedBarcode,
      packageName,
      volume: currentInvoiceData?.items?.[0]?.volume || 0.1,
      weight: currentInvoiceData?.items?.[0]?.weight || 10,
      shipper,
      consignee: currentInvoiceData?.consignee || shipper,
      wh: "K",
      d2d: false
    };
    
    onAddCargo(newCargoItem);
    
    // Clear form fields
    setPackageName("");
    setShipper("");
    setBarcode("");
    setCurrentInvoiceData(null);
    
    toast.success("Item added to cargo list");
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="font-bold text-gray-700 mb-1 block">SEARCH BY:</Label>
          <Select value={searchBy} onValueChange={setSearchBy}>
            <SelectTrigger className="bg-blue-500 text-white">
              <SelectValue placeholder="GY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GY">GY</SelectItem>
              <SelectItem value="BARCODE">BARCODE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-2">
          <Label className="font-bold text-gray-700 mb-1 block">SEARCH BOOKING FORM:</Label>
          <div className="flex gap-2 relative">
            <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
              <PopoverTrigger asChild>
                <div className="flex-1 relative">
                  <Input
                    value={bookingForm}
                    onChange={(e) => setBookingForm(e.target.value)}
                    placeholder="Enter invoice number (GY 13136051)"
                    className="w-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="max-h-[200px] overflow-y-auto">
                  {bookingFormSuggestions.map((invoice) => (
                    <div 
                      key={invoice.invoiceNumber}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectInvoice(invoice)}
                    >
                      {invoice.invoiceNumber} - {invoice.shipper}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => toast.info("Searching for invoice...")}
            >
              <Search size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">SEARCH BARCODE:</Label>
        <div className="flex gap-2 items-center">
          <Barcode size={24} className="text-gray-700" />
          <Input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="BARCODE"
            className="flex-1"
          />
          <Button 
            variant="outline"
            className="border-blue-500 text-blue-500"
            onClick={handleBarcodeSearch}
          >
            <Search size={18} />
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">BOOKING FORM:</Label>
        <Input
          value={bookingForm}
          onChange={(e) => setBookingForm(e.target.value)}
          className="bg-gray-100"
          readOnly
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NUMBER:</Label>
        <Input
          value={packageNumber}
          onChange={(e) => setPackageNumber(e.target.value)}
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NAME:</Label>
        <Input
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        />
      </div>
      
      <div>
        <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
        <Input
          value={shipper}
          onChange={(e) => setShipper(e.target.value)}
        />
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={handleInsertCargo}
        >
          <Plus size={18} />
          Insert
        </Button>
      </div>
    </div>
  );
};

export default CargoSearchForm;

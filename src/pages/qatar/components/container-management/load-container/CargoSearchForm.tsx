
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Plus } from "lucide-react";
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

interface CargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoSearchForm: React.FC<CargoSearchFormProps> = ({
  containerId,
  onAddCargo,
}) => {
  const [searchBy, setSearchBy] = React.useState("GY");
  const [bookingForm, setBookingForm] = React.useState("");
  const [barcode, setBarcode] = React.useState("");
  const [packageNumber, setPackageNumber] = React.useState("");
  const [packageName, setPackageName] = React.useState("");
  const [shipper, setShipper] = React.useState("");

  const handleInsertCargo = () => {
    if (!packageName || !shipper) {
      toast.error("Package name and shipper are required");
      return;
    }
    
    const newCargoItem: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber: bookingForm || "/00000000/N",
      lineNumber: "1",
      barcode: barcode || undefined,
      packageName,
      volume: 0.1,
      weight: 10,
      shipper,
      consignee: shipper,
      wh: "K",
      d2d: false
    };
    
    onAddCargo(newCargoItem);
    
    // Clear form fields
    setPackageName("");
    setShipper("");
    setBarcode("");
    
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
          <div className="flex gap-2">
            <Input
              value={bookingForm}
              onChange={(e) => setBookingForm(e.target.value)}
              placeholder="Enter booking form number"
              className="flex-1"
            />
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Insert
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


import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Barcode, Search } from "lucide-react";

interface CargoFormProps {
  cargoForm: {
    invoiceNumber: string;
    lineNumber: string;
    barcode: string;
    packageName: string;
    volume: string;
    weight: string;
    shipper: string;
    consignee: string;
    wh: string;
    d2d: boolean;
    quantity: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  findInvoiceByNumber: () => void;
  scanning: boolean;
  toggleScanning: () => void;
}

const CargoFormFields: React.FC<CargoFormProps> = ({
  cargoForm,
  handleChange,
  findInvoiceByNumber,
  scanning,
  toggleScanning
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="relative">
        <Label htmlFor="invoiceNumber">Invoice Number*</Label>
        <div className="flex">
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            value={cargoForm.invoiceNumber}
            onChange={handleChange}
            placeholder="e.g. 13135619"
            required
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="ghost" 
            className="ml-1" 
            onClick={findInvoiceByNumber}
            title="Look up invoice"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="lineNumber">Line Number</Label>
        <Input
          id="lineNumber"
          name="lineNumber"
          value={cargoForm.lineNumber}
          onChange={handleChange}
          placeholder="e.g. LN001"
        />
      </div>
      
      <div>
        <Label htmlFor="barcode">Barcode</Label>
        <div className="flex">
          <Input
            id="barcode"
            name="barcode"
            value={cargoForm.barcode}
            onChange={handleChange}
            placeholder="e.g. BC123456789"
            className="flex-1"
          />
          <Button 
            onClick={toggleScanning} 
            variant={scanning ? "default" : "outline"} 
            size="sm"
            className={`ml-1 ${scanning ? "bg-green-600 hover:bg-green-700" : ""}`}
            title={scanning ? "Scanner Active" : "Start Scanner"}
          >
            <Barcode className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="packageName">Package Name*</Label>
        <Input
          id="packageName"
          name="packageName"
          value={cargoForm.packageName}
          onChange={handleChange}
          placeholder="e.g. Electronics"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="volume">Volume (m³)*</Label>
        <Input
          id="volume"
          name="volume"
          type="number"
          step="0.001"
          value={cargoForm.volume}
          onChange={handleChange}
          placeholder="e.g. 1.5"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="weight">Weight (kg)*</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          step="0.01"
          value={cargoForm.weight}
          onChange={handleChange}
          placeholder="e.g. 250"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="quantity">Quantity*</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={cargoForm.quantity}
          onChange={handleChange}
          placeholder="e.g. 1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="shipper">Shipper</Label>
        <Input
          id="shipper"
          name="shipper"
          value={cargoForm.shipper}
          onChange={handleChange}
          placeholder="e.g. ABC Company"
        />
      </div>
      
      <div>
        <Label htmlFor="consignee">Consignee</Label>
        <Input
          id="consignee"
          name="consignee"
          value={cargoForm.consignee}
          onChange={handleChange}
          placeholder="e.g. XYZ Company"
        />
      </div>
      
      <div>
        <Label htmlFor="wh">Warehouse</Label>
        <Input
          id="wh"
          name="wh"
          value={cargoForm.wh}
          onChange={handleChange}
          placeholder="e.g. WH001"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="d2d"
          name="d2d"
          checked={cargoForm.d2d}
          onCheckedChange={(checked) => {
            const event = {
              target: {
                name: "d2d",
                value: checked,
                type: "checkbox",
                checked,
              },
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange(event);
          }}
        />
        <Label htmlFor="d2d">Door-to-Door Delivery</Label>
      </div>
    </div>
  );
};

export default CargoFormFields;

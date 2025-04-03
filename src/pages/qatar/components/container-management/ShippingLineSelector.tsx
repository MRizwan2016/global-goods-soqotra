
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ship, Plus } from "lucide-react";
import { toast } from "sonner";

// Default shipping lines
const defaultShippingLines = [
  { id: "maersk", name: "Maersk Line" },
  { id: "msc", name: "MSC Shipping Line" },
  { id: "hyundai", name: "Hyundai Merchant Marine Line" },
  { id: "one", name: "ONE Line" },
  { id: "sealed", name: "Sealed Line" },
  { id: "hapag", name: "Hapag Lloyd Line" },
  { id: "gwc-marine", name: "GWC Marine" },
  { id: "gwc-shipping", name: "GWC Shipping Services" },
  { id: "evergreen", name: "Evergreen Shipping Line" },
];

interface ShippingLineSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ShippingLineSelector: React.FC<ShippingLineSelectorProps> = ({ 
  value, 
  onChange 
}) => {
  const [shippingLines, setShippingLines] = useState(defaultShippingLines);
  const [newShippingLine, setNewShippingLine] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddShippingLine = () => {
    if (!newShippingLine.trim()) {
      toast.error("Please enter a shipping line name");
      return;
    }

    const id = newShippingLine.toLowerCase().replace(/\s+/g, "-");
    const exists = shippingLines.some(line => line.id === id || line.name.toLowerCase() === newShippingLine.toLowerCase());
    
    if (exists) {
      toast.error("This shipping line already exists");
      return;
    }

    const newLine = { id, name: newShippingLine };
    setShippingLines(prev => [...prev, newLine]);
    onChange(id);
    setNewShippingLine("");
    setDialogOpen(false);
    toast.success(`Added new shipping line: ${newShippingLine}`);
  };

  // Log for debugging
  console.log("ShippingLineSelector rendered with value:", value);
  console.log("Available shipping lines:", shippingLines);

  // Make sure we have a valid value selected - never an empty string
  const validValue = value || (shippingLines.length > 0 ? shippingLines[0].id : "default-shipping-line");

  return (
    <div className="mb-4">
      <Label htmlFor="shippingLine" className="font-bold text-gray-700 mb-1 block">SHIPPING LINE:</Label>
      <div className="flex gap-2">
        <Select value={validValue} onValueChange={onChange}>
          <SelectTrigger 
            id="shippingLine" 
            className="bg-blue-500 text-white font-semibold border-0 hover:bg-blue-600 transition-colors"
          >
            <SelectValue placeholder="Select Shipping Line" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] bg-white z-50">
            {shippingLines.map(line => (
              <SelectItem 
                key={line.id} 
                value={line.id}
                className="py-2 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center">
                  <Ship className="mr-2 h-4 w-4 text-blue-500" />
                  {line.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              <Plus className="mr-1 h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Shipping Line</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="new-shipping-line" className="mb-2 block">Shipping Line Name</Label>
              <Input
                id="new-shipping-line"
                value={newShippingLine}
                onChange={(e) => setNewShippingLine(e.target.value)}
                placeholder="Enter shipping line name"
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleAddShippingLine}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Shipping Line
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShippingLineSelector;

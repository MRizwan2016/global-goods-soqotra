
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { JobItem } from "../../../types/jobTypes";
import { PackageDimensionsState } from "./types";

interface CustomPackageDialogProps {
  isJobNumberGenerated: boolean;
  onAddPackage: (item: JobItem) => void;
}

const CustomPackageDialog = ({ isJobNumberGenerated, onAddPackage }: CustomPackageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState<PackageDimensionsState>({
    length: "",
    width: "",
    height: "",
    weight: "",
  });
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("1");

  const handleNumericInput = (key: keyof PackageDimensionsState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setDimensions(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSellPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setSellPrice(value);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity(value);
    }
  };

  const resetForm = () => {
    setDimensions({ length: "", width: "", height: "", weight: "" });
    setSellPrice("");
    setQuantity("1");
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const { length, width, height, weight } = dimensions;
    
    if (!length || !width || !height || !sellPrice) {
      toast.error("Please enter dimensions and price");
      return;
    }

    const dimensionsStr = `${length}cm x ${width}cm x ${height}cm ${weight ? `(${weight}kg)` : ''}`;
    const packageName = `CUSTOM PACKAGE: ${dimensionsStr}`.toUpperCase();
    
    const newItem: JobItem = {
      id: uuidv4(),
      name: packageName,
      itemName: packageName,
      jobId: 'temp',
      sellPrice: parseFloat(sellPrice),
      quantity: parseInt(quantity || "1"),
      length: parseFloat(length),
      width: parseFloat(width),
      height: parseFloat(height),
      weight: weight ? parseFloat(weight) : undefined,
    };
    
    onAddPackage(newItem);
    
    resetForm();
    toast.success("Custom package added");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="bg-green-600 text-white hover:bg-green-700 transition-colors border-green-600"
          disabled={!isJobNumberGenerated}
        >
          <Package className="mr-1 h-4 w-4" />
          NEW PACKAGE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Package with Dimensions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="length" className="mb-1 block">Length (cm)</Label>
              <input
                id="length"
                value={dimensions.length}
                onChange={handleNumericInput("length")}
                className="border border-gray-300 px-3 py-2 rounded w-full"
                placeholder="Length"
              />
            </div>
            <div>
              <Label htmlFor="width" className="mb-1 block">Width (cm)</Label>
              <input
                id="width"
                value={dimensions.width}
                onChange={handleNumericInput("width")}
                className="border border-gray-300 px-3 py-2 rounded w-full"
                placeholder="Width"
              />
            </div>
            <div>
              <Label htmlFor="height" className="mb-1 block">Height (cm)</Label>
              <input
                id="height"
                value={dimensions.height}
                onChange={handleNumericInput("height")}
                className="border border-gray-300 px-3 py-2 rounded w-full"
                placeholder="Height"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="weight" className="mb-1 block">Weight (kg) - Optional</Label>
            <input
              id="weight"
              value={dimensions.weight}
              onChange={handleNumericInput("weight")}
              className="border border-gray-300 px-3 py-2 rounded w-full"
              placeholder="Weight (optional)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="packagePrice" className="mb-1 block">Price</Label>
              <input
                id="packagePrice"
                value={sellPrice}
                onChange={handleSellPriceChange}
                className="border border-gray-300 px-3 py-2 rounded w-full"
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="packageQuantity" className="mb-1 block">Quantity</Label>
              <input
                id="packageQuantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 px-3 py-2 rounded w-full"
                placeholder="1"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Add Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomPackageDialog;

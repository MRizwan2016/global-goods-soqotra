
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Edit, Package } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { JobItem } from "../../types/jobTypes";
import PackageItemsTable from "./PackageItemsTable";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface PackageDescriptionSectionProps {
  jobItems: JobItem[];
  onAddItem: (item: JobItem) => void;
  isEnabled?: boolean;
}

// Common package descriptions for personal effects
const COMMON_ITEMS = [
  "Large Carton Box Personal Effects",
  "Medium Carton Box Personal Effects",
  "Small Carton Box Personal Effects",
  "Suitcase Personal Effects",
  "Trunk Personal Effects",
  "Furniture - Table",
  "Furniture - Bed",
  "Furniture - Chair",
  "Furniture - Sofa",
  "Furniture - Cabinet",
  "Furniture - Chest of Drawers",
  "Electronic - Television",
  "Electronic - Refrigerator",
  "Electronic - Washing Machine",
  "Electronic - Air Conditioner",
  "Electronic - Computer",
  "Kitchen - Microwave",
  "Kitchen - Cookware Set",
  "Kitchen - Dishware Set",
  "Miscellaneous Goods"
];

const PackageDescriptionSection = ({ jobItems, onAddItem, isEnabled = true }: PackageDescriptionSectionProps) => {
  const [itemName, setItemName] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  
  // For custom package dimensions
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setItemName(e.target.value);
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

  const handleAddItem = () => {
    if (!itemName || !sellPrice) {
      alert("Please enter item description and sell price");
      return;
    }

    const parsedSellPrice = parseFloat(sellPrice);
    const parsedQuantity = parseInt(quantity || "1");

    if (isEditing && editingItemId) {
      // Inform parent component of the edit, typically you would need to implement
      // this in the parent component
      const updatedItem: JobItem = {
        id: editingItemId,
        jobId: 'temp', // Will be set by parent component
        itemName,
        sellPrice: parsedSellPrice,
        quantity: parsedQuantity,
      };
      
      // Here we would need to update the parent's state. Since we can't directly modify the parent's array,
      // we're simulating the update by removing the old item and adding the updated one.
      onAddItem(updatedItem);
      
      // Reset form
      resetForm();
    } else {
      // Add new item
      const newItem: JobItem = {
        id: uuidv4(),
        jobId: 'temp', // Will be set by parent component
        itemName,
        sellPrice: parsedSellPrice,
        quantity: parsedQuantity,
      };
      
      onAddItem(newItem);
      resetForm();
    }
  };

  const addCustomPackage = () => {
    if (!length || !width || !height || !sellPrice) {
      alert("Please enter dimensions and price");
      return;
    }

    const dimensions = `${length}cm x ${width}cm x ${height}cm ${weight ? `(${weight}kg)` : ''}`;
    const packageName = `Custom Package: ${dimensions}`;
    
    const newItem: JobItem = {
      id: uuidv4(),
      jobId: 'temp', // Will be set by parent component
      itemName: packageName,
      sellPrice: parseFloat(sellPrice),
      quantity: parseInt(quantity || "1"),
    };
    
    onAddItem(newItem);
    setIsPackageDialogOpen(false);
    resetPackageDimensions();
  };

  const resetForm = () => {
    setItemName("");
    setSellPrice("");
    setQuantity("1");
    setIsEditing(false);
    setEditingItemId(null);
  };

  const resetPackageDimensions = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setWeight("");
    setSellPrice("");
    setQuantity("1");
  };

  const handleEditItem = (item: JobItem) => {
    setItemName(item.itemName);
    setSellPrice(item.sellPrice.toString());
    setQuantity(item.quantity.toString());
    setIsEditing(true);
    setEditingItemId(item.id);
  };

  const handleDeleteItem = (id: string) => {
    // Since we can't directly modify the parent's array,
    // we're adding a deleted item with negative quantity to effectively remove it
    const deletedItem: JobItem = {
      id,
      jobId: 'temp', // Will be overwritten by parent component
      itemName: 'DELETED_ITEM',
      sellPrice: 0,
      quantity: -1, // Negative quantity signals deletion
    };
    onAddItem(deletedItem);
  };

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      setItemName(selectedValue);
    }
  };

  const handleNumericInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PACKAGE DESCRIPTION</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-2">
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
            ITEM DESCRIPTION
          </label>
          <div className="flex space-x-2">
            <select 
              id="itemSelect" 
              className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
              onChange={handleItemSelect}
              value=""
              disabled={!isEnabled}
            >
              <option value="">--- Select common item ---</option>
              {COMMON_ITEMS.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={itemName}
            onChange={handleItemNameChange}
            className="mt-2 border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Enter item description"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 mb-1">
            SELL PRICE
          </label>
          <input
            type="text"
            id="sellPrice"
            name="sellPrice"
            value={sellPrice}
            onChange={handleSellPriceChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="0.00"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            QUANTITY
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
              placeholder="1"
              disabled={!isEnabled}
            />
            
            <Button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={!isEnabled}
            >
              {isEditing ? <Edit className="mr-1 h-4 w-4" /> : <Plus className="mr-1 h-4 w-4" />}
              {isEditing ? 'UPDATE ITEM' : 'ADD ITEM'}
            </Button>
            
            {isEditing && (
              <Button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 transition-colors"
                disabled={!isEnabled}
              >
                <X className="mr-1 h-4 w-4" />
                CANCEL
              </Button>
            )}
            
            <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-green-600 text-white hover:bg-green-700 transition-colors border-green-600"
                  disabled={!isEnabled}
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
                        value={length}
                        onChange={handleNumericInput(setLength)}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                        placeholder="Length"
                      />
                    </div>
                    <div>
                      <Label htmlFor="width" className="mb-1 block">Width (cm)</Label>
                      <input
                        id="width"
                        value={width}
                        onChange={handleNumericInput(setWidth)}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                        placeholder="Width"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="mb-1 block">Height (cm)</Label>
                      <input
                        id="height"
                        value={height}
                        onChange={handleNumericInput(setHeight)}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                        placeholder="Height"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="weight" className="mb-1 block">Weight (kg) - Optional</Label>
                    <input
                      id="weight"
                      value={weight}
                      onChange={handleNumericInput(setWeight)}
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
                  <Button type="button" onClick={addCustomPackage} className="bg-green-600 hover:bg-green-700">
                    Add Package
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <PackageItemsTable 
        items={jobItems} 
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
};

export default PackageDescriptionSection;

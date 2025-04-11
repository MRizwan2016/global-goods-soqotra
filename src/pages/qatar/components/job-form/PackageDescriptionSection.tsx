
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { JobItem } from "../../types/jobTypes";
import { v4 as uuidv4 } from "uuid";
import PackageItemsTable from "./PackageItemsTable";

interface PackageDescriptionSectionProps {
  jobItems: JobItem[];
  onAddItem: (item: JobItem) => void;
  isEnabled?: boolean;
}

const PackageDescriptionSection: React.FC<PackageDescriptionSectionProps> = ({
  jobItems = [],
  onAddItem,
  isEnabled = true
}) => {
  const [itemName, setItemName] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("1");

  const handleAddItem = () => {
    if (!itemName || !sellPrice) {
      alert("Please enter item name and price");
      return;
    }

    const newItem: JobItem = {
      id: uuidv4(),
      jobId: "",
      itemName,
      sellPrice: parseFloat(sellPrice),
      quantity: parseInt(quantity, 10) || 1
    };

    onAddItem(newItem);
    
    // Clear form fields
    setItemName("");
    setSellPrice("");
    setQuantity("1");
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PACKAGE DESCRIPTION</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="col-span-2">
          <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">
            ITEM DESCRIPTION
          </label>
          <input
            id="itemDescription"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item description"
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 mb-1">
            SELL PRICE
          </label>
          <input
            id="sellPrice"
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            placeholder="0.00"
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            step="0.01"
            min="0"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            QUANTITY
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1"
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            min="1"
            disabled={!isEnabled}
          />
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-2"
          disabled={!isEnabled}
        >
          <Plus size={16} /> ADD ITEM
        </Button>
      </div>
      
      <PackageItemsTable items={jobItems} />
    </div>
  );
};

export default PackageDescriptionSection;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { JobItem } from "../../types/jobTypes";
import { v4 as uuidv4 } from "uuid";

interface PackageDescriptionSectionProps {
  jobItems: JobItem[];
  onAddItem: (item: JobItem) => void;
  isEnabled?: boolean;
}

const PackageDescriptionSection: React.FC<PackageDescriptionSectionProps> = ({ jobItems, onAddItem, isEnabled = true }) => {
  const [newItem, setNewItem] = useState<JobItem>({
    id: "",
    jobId: "",
    itemName: "",
    sellPrice: 0,
    quantity: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'sellPrice' || name === 'quantity') {
      setNewItem(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setNewItem(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.itemName) {
      alert("Please enter item name");
      return;
    }
    
    const itemToAdd = {
      ...newItem,
      id: uuidv4(),
      jobId: "" // This will be set when the job is created
    };
    
    onAddItem(itemToAdd);
    
    // Reset the form
    setNewItem({
      id: "",
      jobId: "",
      itemName: "",
      sellPrice: 0,
      quantity: 1
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-6">
      <h3 className="font-medium text-gray-900 mb-4">Package Description</h3>
      
      <div className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Description</label>
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sell Price</label>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Actions</label>
        </div>
      </div>
      
      {/* Item input row */}
      <div className="grid grid-cols-12 gap-3 mb-4">
        <div className="col-span-5">
          <input
            type="text"
            name="itemName"
            value={newItem.itemName}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="Enter item description"
            disabled={!isEnabled}
          />
        </div>
        <div className="col-span-3">
          <input
            type="number"
            name="sellPrice"
            value={newItem.sellPrice || ''}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="0.00"
            disabled={!isEnabled}
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            name="quantity"
            value={newItem.quantity || 1}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            min="1"
            disabled={!isEnabled}
          />
        </div>
        <div className="col-span-2">
          <Button 
            type="button"
            onClick={handleAddItem}
            className="bg-blue-600 hover:bg-blue-700 w-full"
            disabled={!isEnabled}
          >
            <Plus size={16} className="mr-1" /> Add
          </Button>
        </div>
      </div>
      
      {/* Added items list */}
      <div className="border rounded-md overflow-hidden">
        {jobItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No items added yet
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{item.itemName}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{item.sellPrice.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{item.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{(item.sellPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right font-medium">Total:</td>
                <td className="px-4 py-2 font-bold">
                  {jobItems.reduce((total, item) => total + (item.sellPrice * item.quantity), 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default PackageDescriptionSection;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus, Edit, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import CommonItems from "./CommonItems";
import { ItemFormProps } from "./types";

const ItemForm = ({ onSubmit, isJobNumberGenerated, initialState, isEditing, onCancelEdit }: ItemFormProps) => {
  const [itemName, setItemName] = useState(initialState?.itemName || initialState?.name || "");
  const [sellPrice, setSellPrice] = useState(initialState?.sellPrice ? initialState.sellPrice.toString() : "");
  const [quantity, setQuantity] = useState(initialState?.quantity ? initialState.quantity.toString() : "1");

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value.toUpperCase());
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
    setItemName("");
    setSellPrice("");
    setQuantity("1");
  };

  const handleSubmit = () => {
    if (!itemName || !sellPrice) {
      toast.error("Please enter item description and sell price");
      return;
    }

    onSubmit({
      id: initialState?.id || uuidv4(),
      name: itemName.toUpperCase(),
      itemName: itemName.toUpperCase(),
      jobId: initialState?.jobId || 'temp',
      sellPrice: parseFloat(sellPrice),
      quantity: parseInt(quantity || "1"),
    });

    if (!isEditing) {
      resetForm();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      <div className="lg:col-span-2">
        <Label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
          ITEM DESCRIPTION
        </Label>
        <CommonItems onSelect={setItemName} disabled={!isJobNumberGenerated} />
        <Input
          type="text"
          id="itemName"
          value={itemName}
          onChange={handleItemNameChange}
          className="mt-2"
          placeholder="ENTER ITEM DESCRIPTION"
          disabled={!isJobNumberGenerated}
        />
      </div>
      
      <div>
        <Label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 mb-1">
          SELL PRICE
        </Label>
        <Input
          type="text"
          id="sellPrice"
          value={sellPrice}
          onChange={handleSellPriceChange}
          placeholder="0.00"
          disabled={!isJobNumberGenerated}
        />
      </div>
      
      <div>
        <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          QUANTITY
        </Label>
        <div className="flex space-x-2">
          <Input
            type="text"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="1"
            disabled={!isJobNumberGenerated}
          />
          
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={!isJobNumberGenerated}
          >
            {isEditing ? <Edit className="mr-1 h-4 w-4" /> : <Plus className="mr-1 h-4 w-4" />}
            {isEditing ? 'UPDATE ITEM' : 'ADD ITEM'}
          </Button>
          
          {isEditing && onCancelEdit && (
            <Button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 transition-colors"
              disabled={!isJobNumberGenerated}
            >
              <X className="mr-1 h-4 w-4" />
              CANCEL
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemForm;

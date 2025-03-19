
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { packageOptions } from "../../data/packageOptions";
import { JobItem } from "../../types/jobTypes";

interface PackageSelectorProps {
  onAddItem: (item: JobItem) => void;
}

const PackageSelector = ({ onAddItem }: PackageSelectorProps) => {
  const [packageItem, setPackageItem] = useState({
    itemName: "",
    sellPrice: "",
    quantity: "1"
  });
  
  const handlePackageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePackageSelect = (value: string) => {
    setPackageItem(prev => ({
      ...prev,
      itemName: value
    }));
  };
  
  const handleInsertPackage = () => {
    if (!packageItem.itemName) return;
    
    const newItem: JobItem = {
      id: Date.now().toString(),
      jobId: "",
      itemName: packageItem.itemName,
      sellPrice: parseFloat(packageItem.sellPrice) || 0,
      quantity: parseInt(packageItem.quantity) || 1
    };
    
    onAddItem(newItem);
    
    // Reset package input fields
    setPackageItem({
      itemName: "",
      sellPrice: "",
      quantity: "1"
    });
  };
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <Label htmlFor="itemName">ITEM:</Label>
        <Select
          value={packageItem.itemName}
          onValueChange={handlePackageSelect}
        >
          <SelectTrigger id="itemName" className="bg-blue-600 text-white">
            <SelectValue placeholder="SELECT PACKAGE" />
          </SelectTrigger>
          <SelectContent>
            {packageOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="sellPrice">SELL:</Label>
        <Input 
          id="sellPrice"
          name="sellPrice"
          type="number"
          value={packageItem.sellPrice}
          onChange={handlePackageInputChange}
          placeholder="0"
        />
      </div>
      
      <div>
        <Label htmlFor="quantity">QUANTITY:</Label>
        <Input 
          id="quantity"
          name="quantity"
          type="number"
          value={packageItem.quantity}
          onChange={handlePackageInputChange}
          placeholder="1"
        />
      </div>
      
      <div>
        <Button 
          type="button" 
          className="bg-blue-600 hover:bg-blue-700 mt-3"
          onClick={handleInsertPackage}
          disabled={!packageItem.itemName}
        >
          INSERT
        </Button>
      </div>
    </div>
  );
};

export default PackageSelector;

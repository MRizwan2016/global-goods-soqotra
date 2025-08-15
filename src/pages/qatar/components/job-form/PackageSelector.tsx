
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobItem } from "../../types/jobTypes";
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackageSelectorProps {
  onAddItem: (item: JobItem) => void;
}

const packageOptions = [
  "TELEVISION",
  "TRAVELING BAG",
  "CARTON BOX - SMALL",
  "CARTON BOX - MEDIUM",
  "CARTON BOX - LARGE",
  "CARTON BOX - EXTRA LARGE",
  "TRAVELLING BAGS",
  "CARTON BOX - BULILIT",
  "CARTON BOX - JUMBO",
  "CARTON BOX - SUPER JUMBO",
  "WASHING MACHINE",
  "REFRIDGERATOR",
  "DRUM - SMALL",
  "DRUM - BIG",
  "WOODEN BOX - 1 METER",
  "WOODEN BOX - 1.5 METER",
  "WOODEN BOX - 2 METER",
  "WOODEN BOX - 2.5 METER",
  "WOODEN BOX - 3 METER", 
  "WOODEN BOX - 4 METER",
  "STEEL BOX",
  "GYM SET",
  "MICROWAVE OVEN",
  "OVEN",
  "4 BURNER",
  "DUVET",
  // Additional packages from the highlighted section
  "1 METER WOODEN BOX",
  "1.5 METER WOODEN BOX", 
  "2 METER WOODEN BOX",
  "2.5 METER WOODEN BOX",
  "3 METER WOODEN BOX",
  "4 METER WOODEN BOX",
  "1.314 METER WOODEN BOX"
];

const PackageSelector = ({ onAddItem }: PackageSelectorProps) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [pendingAddition, setPendingAddition] = useState(false);

  const handleAddItem = () => {
    if (selectedItem && quantity > 0 && !pendingAddition) {
      setPendingAddition(true);
      
      // Create a more detailed description with package information
      const packageDescription = `${selectedItem} - Qty: ${quantity}, Price: QAR ${sellPrice}`;
      
      const newItem: JobItem = {
        id: uuidv4(),
        name: selectedItem,
        itemName: selectedItem,
        sellPrice: sellPrice || 0,
        quantity: quantity || 1,
        description: packageDescription
      };
      
      onAddItem(newItem);
      
      // Don't reset selectedItem so user can add the same package multiple times
      // Reset price and quantity
      setSellPrice(0);
      setQuantity(1);
      
      // Reset pending state after a short delay
      setTimeout(() => setPendingAddition(false), 300);
    }
  };

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div>
        <Label htmlFor="packageOption">PACKAGE TYPE:</Label>
        <Select 
          value={selectedItem} 
          onValueChange={setSelectedItem}
        >
          <SelectTrigger id="packageOption" className="bg-white">
            <SelectValue placeholder="SELECT PACKAGE" />
          </SelectTrigger>
          <SelectContent className="bg-white max-h-64 overflow-y-auto z-[1000] shadow-lg border border-gray-200" side="bottom" align="start" sideOffset={4}>
            {packageOptions.map((option, index) => (
              <SelectItem 
                key={index} 
                value={option}
                className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer py-2 px-3"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="price">PRICE:</Label>
        <Input
          id="price"
          type="number"
          value={sellPrice || ''}
          onChange={(e) => setSellPrice(Number(e.target.value))}
          placeholder="0"
        />
      </div>
      
      <div>
        <Label htmlFor="quantity">QUANTITY:</Label>
        <Input
          id="quantity"
          type="number"
          value={quantity || ''}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="1"
          min="1"
        />
      </div>
      
      <div className="flex items-end">
        <Button 
          onClick={handleAddItem} 
          disabled={!selectedItem || quantity <= 0 || pendingAddition}
          className="bg-blue-600 hover:bg-blue-700 w-full disabled:bg-gray-300"
        >
          {pendingAddition ? "ADDING..." : "INSERT"}
        </Button>
      </div>
    </div>
  );
};

export default PackageSelector;

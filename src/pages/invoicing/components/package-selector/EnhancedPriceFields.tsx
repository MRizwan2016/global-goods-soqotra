import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { calculatePriceByDestination, calculateTotal } from "../../utils/packageDimensions";

interface EnhancedPriceFieldsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  packageItems?: any[];
}

const EnhancedPriceFields: React.FC<EnhancedPriceFieldsProps> = ({
  formState,
  handleInputChange,
  packageItems = []
}) => {
  
  // Calculate total pricing from package items
  useEffect(() => {
    const totalPriceFromPackages = packageItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price || "0"));
    }, 0);
    
    const totalDocumentsFeeFromPackages = packageItems.reduce((sum, item) => {
      return sum + (parseFloat(item.documentsFee || "0"));
    }, 0);
    
    // Auto-calculate freight from total weight
    const totalWeight = packageItems.reduce((sum, item) => {
      return sum + (parseFloat(item.weight || "0") * parseInt(item.quantity || "1"));
    }, 0);
    
    // Auto-calculate door-to-door based on destination and weight
    let doorToDoorCharge = 0;
    if (formState.destination && totalWeight > 0) {
      // Door-to-door pricing logic: base price + weight multiplier
      const basePrices: { [key: string]: number } = {
        "Qatar": 10,
        "Saudi Arabia": 15,
        "Eritrea": 11,
        "UAE": 12,
        "Oman": 13,
        "Bahrain": 10,
        "Kuwait": 14
      };
      
      const basePrice = basePrices[formState.destination] || 10;
      doorToDoorCharge = basePrice * totalWeight;
    }
    
    // Update form fields if they're different
    if (totalPriceFromPackages > 0 && formState.price !== totalPriceFromPackages.toFixed(2)) {
      const priceEvent = {
        target: {
          name: "price",
          value: totalPriceFromPackages.toFixed(2)
        }
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(priceEvent);
    }
    
    if (totalDocumentsFeeFromPackages > 0 && formState.documentsFee !== totalDocumentsFeeFromPackages.toFixed(2)) {
      const docEvent = {
        target: {
          name: "documentsFee",
          value: totalDocumentsFeeFromPackages.toFixed(2)
        }
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(docEvent);
    }
    
    // Update door-to-door charge if calculated
    if (doorToDoorCharge > 0 && formState.doorToDoorCharge !== doorToDoorCharge.toFixed(2)) {
      const doorEvent = {
        target: {
          name: "doorToDoorCharge",
          value: doorToDoorCharge.toFixed(2)
        }
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(doorEvent);
    }
    
  }, [packageItems, formState.destination]);

  // Auto-calculate total when price or documents fee changes
  useEffect(() => {
    const price = parseFloat(formState.price || "0");
    const documentsFee = parseFloat(formState.documentsFee || "0");
    const doorToDoorCharge = parseFloat(formState.doorToDoorCharge || "0");
    const calculatedTotal = price + documentsFee + doorToDoorCharge;
    
    if (calculatedTotal > 0 && formState.total !== calculatedTotal.toFixed(2)) {
      const totalEvent = {
        target: {
          name: "total",
          value: calculatedTotal.toFixed(2)
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(totalEvent);
    }
  }, [formState.price, formState.documentsFee, formState.doorToDoorCharge]);

  // Auto-calculate based on destination and cubic meter when they change
  useEffect(() => {
    if (formState.cubicMetre && formState.destination) {
      const { price, documentsFee } = calculatePriceByDestination(
        formState.cubicMetre, 
        formState.destination
      );
      
      if (price && formState.price !== price) {
        const priceEvent = {
          target: {
            name: "price",
            value: price
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(priceEvent);
      }
      
      if (documentsFee && formState.documentsFee !== documentsFee) {
        const docEvent = {
          target: {
            name: "documentsFee",
            value: documentsFee
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(docEvent);
      }
    }
  }, [formState.cubicMetre, formState.destination]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">PRICE</label>
        <Input
          name="price"
          value={formState.price || ""}
          onChange={handleInputChange}
          placeholder="0.00"
          className="font-medium"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">DOCUMENTS FEE</label>
        <Input
          name="documentsFee"
          value={formState.documentsFee || ""}
          onChange={handleInputChange}
          placeholder="0.00"
          className="font-medium"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">DOOR TO DOOR CHARGE</label>
        <Input
          name="doorToDoorCharge"
          value={formState.doorToDoorCharge || ""}
          onChange={handleInputChange}
          placeholder="0.00"
          className="font-medium bg-blue-50"
          readOnly
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">TOTAL</label>
        <Input
          name="total"
          value={formState.total || ""}
          readOnly
          placeholder="0.00"
          className="font-bold bg-green-50 text-green-700"
        />
      </div>
    </div>
  );
};

export default EnhancedPriceFields;
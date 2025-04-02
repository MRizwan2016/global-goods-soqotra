
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { calculatePriceByDestination, calculateTotal } from "../../utils/packageDimensions";

interface PriceFieldsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PriceFields: React.FC<PriceFieldsProps> = ({
  formState,
  handleInputChange,
}) => {
  // Calculate total when price or documents fee changes
  useEffect(() => {
    const price = parseFloat(formState.price) || 0;
    const documentsFee = parseFloat(formState.documentsFee) || 0;
    const total = calculateTotal(String(price), String(documentsFee));
    
    const event = {
      target: {
        name: "total",
        value: total
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(event);
  }, [formState.price, formState.documentsFee, handleInputChange]);

  // Update price and document fee when cubic meter or destination changes
  useEffect(() => {
    if (formState.cubicMetre && formState.destination) {
      const { price, documentsFee } = calculatePriceByDestination(
        formState.cubicMetre, 
        formState.destination
      );
      
      // Only update if destination-specific pricing is available
      if (price) {
        const priceEvent = {
          target: {
            name: "price",
            value: price
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(priceEvent);
      }
      
      if (documentsFee) {
        const docEvent = {
          target: {
            name: "documentsFee",
            value: documentsFee
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(docEvent);
      }
    }
  }, [formState.cubicMetre, formState.destination, handleInputChange]);

  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PRICE:</label>
        <Input 
          name="price"
          value={formState.price}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DOCUMENTS FEE:</label>
        <Input 
          name="documentsFee"
          value={formState.documentsFee}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">TOTAL:</label>
        <Input 
          name="total"
          value={formState.total}
          readOnly
          className="border border-gray-300 bg-gray-50 font-bold"
        />
      </div>
    </>
  );
};

export default PriceFields;

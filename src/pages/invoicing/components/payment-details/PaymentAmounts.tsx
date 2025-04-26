
import React, { useEffect } from "react";
import InputField from "./InputField";
import { calculateDocumentFee } from "../../utils/packageCalculations";

interface PaymentAmountsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  packageItems?: any[];
}

const PaymentAmounts: React.FC<PaymentAmountsProps> = ({
  formState,
  handleInputChange,
  packageItems = [],
}) => {
  // Calculate and update document fee based on package volume
  useEffect(() => {
    if (packageItems && packageItems.length) {
      // Calculate total volume from all packages
      let totalVolume = 0;
      packageItems.forEach(pkg => {
        if (pkg.volume) {
          totalVolume += parseFloat(pkg.volume.toString() || "0");
        }
      });

      // Add QAR 50 document fee only once if volume > 1 CBM
      const documentFee = calculateDocumentFee(totalVolume);
      
      // Update document fee in form
      const event = {
        target: {
          name: "document",
          value: documentFee.toString()
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  }, [packageItems, handleInputChange]);

  // Calculate and update freight based on package totals
  useEffect(() => {
    if (packageItems && packageItems.length) {
      // Calculate total amount from packages
      let totalAmount = 0;
      packageItems.forEach(pkg => {
        totalAmount += parseFloat(pkg.total || "0");
      });
      
      // Update freight in form if it's different
      if (parseFloat(formState.freight || "0") !== totalAmount) {
        const event = {
          target: {
            name: "freight",
            value: totalAmount.toString()
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleInputChange(event);
      }
    }
  }, [packageItems, formState.freight, handleInputChange]);

  return (
    <>
      <InputField 
        label={<span className="text-blue-600">FREIGHT</span>}
        name="freight"
        value={formState.freight}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-purple-600">DESTINATION TRANSPORT</span>}
        name="destinationTransport"
        value={formState.destinationTransport}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-indigo-600">DOCUMENT</span>}
        name="document"
        value={formState.document}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-teal-600">LOCAL TRANSPORT</span>}
        name="localTransport"
        value={formState.localTransport}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-cyan-600">PACKING</span>}
        name="packing"
        value={formState.packing}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-emerald-600">STORAGE</span>}
        name="storage"
        value={formState.storage}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-green-600">DESTINATION CLEARING</span>}
        name="destinationClearing"
        value={formState.destinationClearing}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-amber-600">DESTINATION DOOR DELIVERY</span>}
        name="destinationDoorDelivery"
        value={formState.destinationDoorDelivery}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-orange-600">OTHER</span>}
        name="other"
        value={formState.other}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-pink-600 font-semibold">GROSS</span>}
        name="gross"
        value={formState.gross}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-red-600">DISCOUNT</span>}
        name="discount"
        value={formState.discount}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label={<span className="text-blue-800 font-bold">NET</span>}
        name="net"
        value={formState.net}
        readOnly
        className="bg-gray-100 font-bold"
      />
    </>
  );
};

export default PaymentAmounts;

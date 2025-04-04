
import React from "react";
import InputField from "./InputField";

interface PaymentAmountsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PaymentAmounts: React.FC<PaymentAmountsProps> = ({
  formState,
  handleInputChange,
}) => {
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


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
        label="FREIGHT"
        name="freight"
        value={formState.freight}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="DESTINATION TRANSPORT"
        name="destinationTransport"
        value={formState.destinationTransport}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="DOCUMENT"
        name="document"
        value={formState.document}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="LOCAL TRANSPORT"
        name="localTransport"
        value={formState.localTransport}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="PACKING"
        name="packing"
        value={formState.packing}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="STORAGE"
        name="storage"
        value={formState.storage}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="DESTINATION CLEARING"
        name="destinationClearing"
        value={formState.destinationClearing}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="DESTINATION DOOR DELIVERY"
        name="destinationDoorDelivery"
        value={formState.destinationDoorDelivery}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="OTHER"
        name="other"
        value={formState.other}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="GROSS"
        name="gross"
        value={formState.gross}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="DISCOUNT"
        name="discount"
        value={formState.discount}
        onChange={handleInputChange}
        type="number"
      />
      
      <InputField 
        label="NET"
        name="net"
        value={formState.net}
        readOnly
        className="bg-gray-100 font-bold"
      />
    </>
  );
};

export default PaymentAmounts;

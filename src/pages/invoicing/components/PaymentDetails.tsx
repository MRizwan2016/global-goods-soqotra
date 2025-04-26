
import React, { useEffect } from "react";
import { DollarSign } from "lucide-react";
import { calculateNet } from "../utils/invoiceCalculations";
import PaymentAmounts from "./payment-details/PaymentAmounts";
import PaymentMethodSelector from "./payment-details/PaymentMethodSelector";
import PaymentStatusSelector from "./payment-details/PaymentStatusSelector";
import DatePicker from "./payment-details/DatePicker";
import AdditionalDetails from "./payment-details/AdditionalDetails";
import AgentSelector from "./payment-details/AgentSelector";

interface PaymentDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
  updatePackagePricing?: () => void;
  packageItems?: any[];
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
  updatePackagePricing,
  packageItems = []
}) => {
  // Calculate net amount when gross or discount changes
  useEffect(() => {
    const gross = parseFloat(formState.freight) || 0;
    const discount = parseFloat(formState.discount) || 0;
    const net = calculateNet(String(gross), String(discount));
    
    // Update net in form state if it's different
    if (formState.net !== net) {
      const netEvent = {
        target: {
          name: "net",
          value: net
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(netEvent);
    }
  }, [formState.freight, formState.discount]);

  // Function to handle agent selection
  const handleAgentSelect = (name: string, code: string) => {
    // Create events to update both name and number
    const nameEvent = {
      target: {
        name: "agentName",
        value: name
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    const codeEvent = {
      target: {
        name: "agentNumber",
        value: code
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    // Update form state
    handleInputChange(nameEvent);
    handleInputChange(codeEvent);
  };

  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
        <DollarSign className="mr-2 h-5 w-5 text-yellow-600" />
        Payment Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <PaymentAmounts 
            formState={formState}
            handleInputChange={handleInputChange}
            packageItems={packageItems}
          />
          
          <div className="mt-4">
            <AgentSelector
              agentName={formState.agentName}
              agentNumber={formState.agentNumber}
              onAgentSelect={handleAgentSelect}
            />
          </div>
        </div>
        
        <div>
          <PaymentMethodSelector 
            formState={formState}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          
          <div className="mt-4">
            <PaymentStatusSelector 
              formState={formState}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </div>
          
          <div className="mt-4">
            <DatePicker 
              label="Payment Date"
              name="paymentDate"
              value={formState.paymentDate}
              handleInputChange={handleInputChange}
            />
          </div>
          
          <div className="mt-4">
            <DatePicker 
              label="Banking Date"
              name="bankingDate"
              value={formState.bankingDate}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        
        <div>
          <AdditionalDetails 
            formState={formState}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;

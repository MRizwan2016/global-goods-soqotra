
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_STATUSES } from "../../../accounts/payment/constants/paymentConstants";

interface PaymentStatusSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PaymentStatusSelector: React.FC<PaymentStatusSelectorProps> = ({
  formState,
  handleInputChange,
}) => {
  const handleStatusChange = (value: string) => {
    const event = {
      target: {
        name: "paymentStatus",
        value,
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = PAYMENT_STATUSES.find(s => s.id === status);
    if (statusConfig) {
      return <Badge className={`ml-2 ${statusConfig.color} hover:bg-opacity-80`}>{statusConfig.name.toUpperCase()}</Badge>;
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">PAYMENT STATUS:</label>
      <div className="flex items-center">
        <Select 
          value={formState.paymentStatus || ""} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full border border-gray-300">
            <SelectValue placeholder="Select payment status" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_STATUSES.map(status => (
              <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formState.paymentStatus && getStatusBadge(formState.paymentStatus)}
      </div>
    </div>
  );
};

export default PaymentStatusSelector;

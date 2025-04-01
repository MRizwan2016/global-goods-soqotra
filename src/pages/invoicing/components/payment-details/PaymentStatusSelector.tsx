
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_STATUSES } from "../../../accounts/payment/constants/paymentConstants";

interface PaymentStatusSelectorProps {
  formState?: any;
  paymentStatus?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}

const PaymentStatusSelector: React.FC<PaymentStatusSelectorProps> = ({
  formState,
  paymentStatus,
  handleInputChange,
  handleSelectChange,
}) => {
  const handleStatusChange = (value: string) => {
    if (handleSelectChange) {
      handleSelectChange("paymentStatus", value);
    } else if (handleInputChange) {
      const event = {
        target: {
          name: "paymentStatus",
          value,
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      
      handleInputChange(event);
    }
  };

  // Determine the actual payment status value from either formState or direct prop
  const actualPaymentStatus = paymentStatus || (formState && formState.paymentStatus) || "";

  const getStatusBadge = (status: string) => {
    const statusConfig = PAYMENT_STATUSES.find(s => s.value === status);
    if (statusConfig) {
      return <Badge className={`ml-2 ${statusConfig.color} hover:bg-opacity-80`}>{statusConfig.label.toUpperCase()}</Badge>;
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">PAYMENT STATUS:</label>
      <div className="flex items-center">
        <Select 
          value={actualPaymentStatus} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full border border-gray-300">
            <SelectValue placeholder="Select payment status" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_STATUSES.map(status => (
              <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {actualPaymentStatus && getStatusBadge(actualPaymentStatus)}
      </div>
    </div>
  );
};

export default PaymentStatusSelector;

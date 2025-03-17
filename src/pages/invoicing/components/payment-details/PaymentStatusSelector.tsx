
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">PAYMENT STATUS:</label>
      <Select 
        value={formState.paymentStatus || ""} 
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full border border-gray-300">
          <SelectValue placeholder="Select payment status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="partial">Partially Paid</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentStatusSelector;

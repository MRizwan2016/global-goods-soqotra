
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
    switch (status) {
      case "paid":
        return <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">PAID</Badge>;
      case "partial":
        return <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">PARTIAL</Badge>;
      case "pending":
        return <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">PENDING</Badge>;
      case "overdue":
        return <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-200">OVERDUE</Badge>;
      default:
        return null;
    }
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="partial">Partially Paid</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        {formState.paymentStatus && getStatusBadge(formState.paymentStatus)}
      </div>
    </div>
  );
};

export default PaymentStatusSelector;

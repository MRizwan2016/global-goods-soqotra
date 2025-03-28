
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormState } from "../../types";

interface PaymentControlsProps {
  formState: FormState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PaymentControls: React.FC<PaymentControlsProps> = ({
  formState,
  handleInputChange,
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block text-gray-700">
        Remarks:
      </label>
      <Textarea
        name="remarks"
        value={formState.remarks}
        onChange={handleInputChange}
        className="h-[38px]"
        placeholder="Optional remarks or reference number"
      />
    </div>
  );
};

export default PaymentControls;

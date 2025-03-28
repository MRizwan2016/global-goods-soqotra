
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Check } from "lucide-react";

type ButtonType = "collect" | "complete" | "paid" | "view";

interface PaymentActionButtonProps {
  type: ButtonType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const PaymentActionButton: React.FC<PaymentActionButtonProps> = ({
  type,
  onClick,
  disabled = false,
  className = "",
}) => {
  const getButtonConfig = () => {
    switch (type) {
      case "collect":
        return {
          text: "Collect",
          icon: <CreditCard className="h-4 w-4 mr-1" />,
          classes: "bg-blue-600 hover:bg-blue-700 text-white",
        };
      case "complete":
        return {
          text: "Complete",
          icon: <Check className="h-4 w-4 mr-1" />,
          classes: "bg-amber-600 hover:bg-amber-700 text-white",
        };
      case "paid":
        return {
          text: "Paid",
          icon: <Check className="h-4 w-4 mr-1" />,
          classes: "bg-green-600 hover:bg-green-700 text-white",
        };
      case "view":
        return {
          text: "View Receipt",
          icon: <FileText className="h-4 w-4 mr-1" />,
          classes: "bg-gray-600 hover:bg-gray-700 text-white",
        };
      default:
        return {
          text: "Action",
          icon: null,
          classes: "bg-blue-600 hover:bg-blue-700 text-white",
        };
    }
  };

  const { text, icon, classes } = getButtonConfig();

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center transition-all duration-200 ${classes} ${className}`}
      size="sm"
    >
      {icon}
      {text}
    </Button>
  );
};

export default PaymentActionButton;

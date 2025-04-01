
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, CheckCircle2 } from "lucide-react";

type ButtonType = "pay" | "details" | "view";

interface InvoiceActionButtonProps {
  type: ButtonType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const InvoiceActionButton: React.FC<InvoiceActionButtonProps> = ({
  type,
  onClick,
  disabled = false,
  className = "",
}) => {
  const getButtonConfig = () => {
    switch (type) {
      case "pay":
        return {
          text: "Pay",
          icon: <DollarSign className="h-4 w-4 mr-1" />,
          variant: "default",
          classes: "bg-blue-600 hover:bg-blue-700",
        };
      case "details":
        return {
          text: "Details",
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          variant: "default",
          classes: "bg-green-600 hover:bg-green-700",
        };
      case "view":
        return {
          text: "View",
          icon: <FileText className="h-4 w-4 mr-1" />,
          variant: "outline",
          classes: "",
        };
      default:
        return {
          text: "Action",
          icon: null,
          variant: "default",
          classes: "",
        };
    }
  };

  const { text, icon, variant, classes } = getButtonConfig();

  // Simple click handler with proper event stopping
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`InvoiceActionButton clicked: ${type}`);
    // Call the provided onClick handler
    onClick();
  };

  return (
    <Button
      variant={variant as any}
      size="sm"
      className={`${classes} ${className}`}
      onClick={handleButtonClick}
      disabled={disabled}
      type="button"
    >
      {icon}
      {text}
    </Button>
  );
};

export default InvoiceActionButton;

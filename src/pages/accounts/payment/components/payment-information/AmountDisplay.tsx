
import React from "react";

interface AmountDisplayProps {
  label: string;
  value: number;
  currencySymbol: string;
  textColor?: string;
  isBold?: boolean;
  className?: string;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({
  label,
  value,
  currencySymbol,
  textColor = "text-gray-800",
  isBold = false,
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`${textColor} ${isBold ? 'font-semibold' : ''}`}>
        {currencySymbol} {value.toFixed(2)}
      </p>
    </div>
  );
};

export default AmountDisplay;


import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { itemVariants } from "../../utils/animationVariants";

interface AmountDisplayProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  currencySymbol: string;
  isReadOnly?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  symbolClassName?: string;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({
  label,
  name,
  value,
  onChange,
  currencySymbol,
  isReadOnly = true,
  className = "flex flex-col",
  labelClassName = "text-sm font-medium mb-1 text-gray-700",
  inputClassName = "bg-white border-gray-200 pl-8",
  symbolClassName = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
}) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      <label className={labelClassName}>{label}:</label>
      <div className="relative">
        <span className={symbolClassName}>
          {currencySymbol}
        </span>
        <Input
          name={name}
          value={value.toString()}
          onChange={onChange}
          type="number"
          className={inputClassName}
          readOnly={isReadOnly}
        />
      </div>
    </motion.div>
  );
};

export default AmountDisplay;

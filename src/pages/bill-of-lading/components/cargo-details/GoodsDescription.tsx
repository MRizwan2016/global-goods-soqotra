
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface GoodsDescriptionProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const GoodsDescription = ({ formState, handleInputChange }: GoodsDescriptionProps) => {
  return (
    <div className="flex flex-col md:col-span-3">
      <label className="text-sm font-medium mb-1">GOODS DESCRIPTION:</label>
      <Textarea 
        name="goodsDescription"
        value={formState.goodsDescription}
        onChange={handleInputChange}
        className="border border-gray-300 min-h-[150px]"
      />
    </div>
  );
};

export default GoodsDescription;

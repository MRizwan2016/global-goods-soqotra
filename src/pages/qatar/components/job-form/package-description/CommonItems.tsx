
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COMMON_ITEMS } from "./constants";
import { CommonItemsProps } from "./types";

const CommonItems = ({ onSelect, disabled }: CommonItemsProps) => {
  return (
    <Select onValueChange={onSelect} disabled={disabled}>
      <SelectTrigger className="border border-gray-300 px-3 py-2 rounded w-full">
        <SelectValue placeholder="--- SELECT COMMON ITEM ---" />
      </SelectTrigger>
      <SelectContent>
        {COMMON_ITEMS.map((item, index) => (
          <SelectItem key={index} value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonItems;

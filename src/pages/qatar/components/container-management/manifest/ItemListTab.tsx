
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell,
  TableFooter
} from "@/components/ui/table";
import { ItemListEntry } from "../../../types/containerTypes";

interface ItemListTabProps {
  itemList: ItemListEntry[];
  formatVolume: (volume: number) => string;
}

const ItemListTab: React.FC<ItemListTabProps> = ({
  itemList,
  formatVolume,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
        ITEM LIST
      </div>
      
      <Table>
        <TableHeader className="bg-blue-50">
          <TableRow>
            <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
            <TableHead className="font-bold text-blue-800">ITEM NAME</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">QUANTITY</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">VOLUME</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemList.map((item, index) => (
            <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{item.itemName}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-center">{formatVolume(item.volume)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-100">
            <TableCell colSpan={2} className="text-right font-bold">TOTAL:</TableCell>
            <TableCell className="text-center font-bold">{itemList.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
            <TableCell className="text-center font-bold">{formatVolume(itemList.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ItemListTab;

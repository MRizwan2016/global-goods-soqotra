
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
        INVOICE DETAILS
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="font-bold text-blue-800 text-center border-r border-gray-200">Num</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">INVOICE</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">SHIPPER</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">CONSIGNEE</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">PACKAGES</TableHead>
              <TableHead className="font-bold text-blue-800 text-center">VOLUME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemList.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center border-r border-gray-200">{index + 1}</TableCell>
                <TableCell className="border-r border-gray-200">{item.invoice}</TableCell>
                <TableCell className="border-r border-gray-200">{item.shipper}</TableCell>
                <TableCell className="border-r border-gray-200">{item.consignee}</TableCell>
                <TableCell className="text-center border-r border-gray-200">{item.packages}</TableCell>
                <TableCell className="text-center">{formatVolume(item.volume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-100">
              <TableCell colSpan={4} className="text-right font-bold">TOTAL:</TableCell>
              <TableCell className="text-center font-bold">{itemList.reduce((sum, item) => sum + item.packages, 0)}</TableCell>
              <TableCell className="text-center font-bold">{formatVolume(itemList.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ItemListTab;

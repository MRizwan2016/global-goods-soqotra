
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
import { ConsigneeListItem } from "../../../types/containerTypes";

interface ConsigneeListTabProps {
  consigneeList: ConsigneeListItem[];
  formatVolume: (volume: number) => string;
}

const ConsigneeListTab: React.FC<ConsigneeListTabProps> = ({
  consigneeList,
  formatVolume,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
        CONSIGNEE LIST
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="font-bold text-blue-800 text-center border-r border-gray-200">Num</TableHead>
              <TableHead className="font-bold text-blue-800 text-center border-r border-gray-200">INVOICE</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">SHIPPER</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">CONTACT</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">CONSIGNEE</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">CONTACT</TableHead>
              <TableHead className="font-bold text-blue-800 text-center">VOLUME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consigneeList.map((consignee, index) => (
              <TableRow key={consignee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center border-r border-gray-200">{index + 1}</TableCell>
                <TableCell className="text-center border-r border-gray-200">{consignee.invoice}</TableCell>
                <TableCell className="border-r border-gray-200">{consignee.shipper || "-"}</TableCell>
                <TableCell className="border-r border-gray-200">{consignee.shipperContact || "-"}</TableCell>
                <TableCell className="border-r border-gray-200">{consignee.consignee}</TableCell>
                <TableCell className="border-r border-gray-200">{consignee.consigneeContact || "-"}</TableCell>
                <TableCell className="text-center">{formatVolume(consignee.volume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-100">
              <TableCell colSpan={6} className="text-right font-bold">TOTAL:</TableCell>
              <TableCell className="text-center font-bold">{formatVolume(consigneeList.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ConsigneeListTab;

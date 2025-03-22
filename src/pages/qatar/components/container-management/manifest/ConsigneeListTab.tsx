
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
      
      <Table>
        <TableHeader className="bg-blue-50">
          <TableRow>
            <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">INVOICE</TableHead>
            <TableHead className="font-bold text-blue-800">CONSIGNEE</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">VOLUME</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consigneeList.map((consignee, index) => (
            <TableRow key={consignee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{consignee.invoice}</TableCell>
              <TableCell>{consignee.consignee}</TableCell>
              <TableCell className="text-center">{formatVolume(consignee.volume)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-100">
            <TableCell colSpan={3} className="text-right font-bold">TOTAL:</TableCell>
            <TableCell className="text-center font-bold">{formatVolume(consigneeList.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ConsigneeListTab;

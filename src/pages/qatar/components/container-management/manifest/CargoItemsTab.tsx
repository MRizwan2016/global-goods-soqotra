
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContainerCargo } from "../../../types/containerTypes";

interface CargoItemsTabProps {
  cargoItems: ContainerCargo[];
  formatVolume: (volume: number) => string;
  formatWeight: (weight: number) => string;
}

const CargoItemsTab: React.FC<CargoItemsTabProps> = ({
  cargoItems,
  formatVolume,
  formatWeight,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
        CARGO ITEMS
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-600">
            <TableRow>
              <TableHead className="text-white font-semibold text-center border-r border-white/20">Num</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">INVOICE</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">L. Num</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">BARCODE</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">PACKAGE</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">VOLUME</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">WEIGHT</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">CONSIGNEE</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">SHIPPER</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">W/H</TableHead>
              <TableHead className="text-white font-semibold border-r border-white/20">D2D</TableHead>
              <TableHead className="text-white font-semibold text-center">UNLOAD</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {cargoItems.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center border-r border-gray-200">{index + 1}</TableCell>
                <TableCell className="border-r border-gray-200">{item.invoiceNumber}</TableCell>
                <TableCell className="border-r border-gray-200">{item.lineNumber}</TableCell>
                <TableCell className="border-r border-gray-200">{item.barcode || "-"}</TableCell>
                <TableCell className="border-r border-gray-200">{item.packageName}</TableCell>
                <TableCell className="border-r border-gray-200">{formatVolume(item.volume)}</TableCell>
                <TableCell className="border-r border-gray-200">
                  <Input
                    value={formatWeight(item.weight)}
                    onChange={() => {}}
                    className="w-full p-1 text-sm"
                  />
                </TableCell>
                <TableCell className="border-r border-gray-200">{item.consignee}</TableCell>
                <TableCell className="border-r border-gray-200">{item.shipper}</TableCell>
                <TableCell className="border-r border-gray-200">{item.wh}</TableCell>
                <TableCell className="border-r border-gray-200">{item.d2d ? "Yes" : "No"}</TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all whitespace-normal p-2 h-auto text-xs"
                  >
                    {item.packageName}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-100">
              <TableCell colSpan={5} className="text-right font-bold">TOTAL:</TableCell>
              <TableCell className="font-bold">{formatVolume(cargoItems.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
              <TableCell className="font-bold">{formatWeight(cargoItems.reduce((sum, item) => sum + item.weight, 0))}</TableCell>
              <TableCell colSpan={5}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default CargoItemsTab;

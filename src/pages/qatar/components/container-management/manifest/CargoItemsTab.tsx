
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
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
      <div className="bg-blue-600 text-white py-1 mb-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white font-semibold text-center">Num</TableHead>
              <TableHead className="text-white font-semibold">INVOICE</TableHead>
              <TableHead className="text-white font-semibold">L. Num</TableHead>
              <TableHead className="text-white font-semibold">BARCODE</TableHead>
              <TableHead className="text-white font-semibold">PACKAGE</TableHead>
              <TableHead className="text-white font-semibold">VOLUME</TableHead>
              <TableHead className="text-white font-semibold">WEIGHT</TableHead>
              <TableHead className="text-white font-semibold">CONSIGNEE</TableHead>
              <TableHead className="text-white font-semibold">SHIPPER</TableHead>
              <TableHead className="text-white font-semibold">W/H</TableHead>
              <TableHead className="text-white font-semibold">D2D</TableHead>
              <TableHead className="text-white font-semibold text-center">UNLOAD</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      
      <Table>
        <TableBody>
          {cargoItems.map((item, index) => (
            <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{item.invoiceNumber}</TableCell>
              <TableCell>{item.lineNumber}</TableCell>
              <TableCell>{item.barcode || "-"}</TableCell>
              <TableCell>{item.packageName}</TableCell>
              <TableCell>{formatVolume(item.volume)}</TableCell>
              <TableCell>
                <Input
                  value={formatWeight(item.weight)}
                  onChange={() => {}}
                  className="w-full p-1 text-sm"
                />
              </TableCell>
              <TableCell>{item.consignee}</TableCell>
              <TableCell>{item.shipper}</TableCell>
              <TableCell>{item.wh}</TableCell>
              <TableCell>{item.d2d ? "Yes" : "No"}</TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 whitespace-normal p-2 h-auto text-xs"
                >
                  {item.packageName}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CargoItemsTab;

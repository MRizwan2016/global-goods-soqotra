
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ContainerCargo } from "../../../types/containerTypes";

interface CargoTableProps {
  cargoItems: ContainerCargo[];
  onRemoveItem: (id: string) => void;
}

const CargoTable: React.FC<CargoTableProps> = ({
  cargoItems,
  onRemoveItem,
}) => {
  if (cargoItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <h3 className="text-lg font-semibold mb-2 text-blue-700">Packages Added to Container</h3>
      <div className="bg-blue-600 text-white py-1 mb-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white font-semibold text-center">Num</TableHead>
              <TableHead className="text-white font-semibold">INVOICE</TableHead>
              <TableHead className="text-white font-semibold">PACKAGE Num</TableHead>
              <TableHead className="text-white font-semibold">PACKAGE</TableHead>
              <TableHead className="text-white font-semibold">VOLUME</TableHead>
              <TableHead className="text-white font-semibold">WEIGHT</TableHead>
              <TableHead className="text-white font-semibold">SHIPPER</TableHead>
              <TableHead className="text-white font-semibold">CONSIGNEE</TableHead>
              <TableHead className="text-white font-semibold text-center">REMOVE</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto border border-gray-200 rounded-sm">
        <Table>
          <TableBody>
            {cargoItems.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{item.invoiceNumber}</TableCell>
                <TableCell>{item.lineNumber}</TableCell>
                <TableCell>{item.packageName}</TableCell>
                <TableCell>{item.volume.toFixed(3)}</TableCell>
                <TableCell>{item.weight.toFixed(2)}</TableCell>
                <TableCell>{item.shipper}</TableCell>
                <TableCell>{item.consignee}</TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 p-1 h-auto"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CargoTable;

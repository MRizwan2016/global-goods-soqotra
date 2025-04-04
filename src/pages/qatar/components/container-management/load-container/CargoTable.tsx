
import React from "react";
import { ContainerCargo } from "../../../types/containerTypes";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CargoTableProps {
  cargoItems: ContainerCargo[];
  onRemoveCargo: (cargoId: string) => void;
  formatVolume?: (volume: number) => string;
  formatWeight?: (volume: number) => string;
}

const CargoTable: React.FC<CargoTableProps> = ({ 
  cargoItems, 
  onRemoveCargo,
  formatVolume = (v) => {
    // Ensure the value is a number before calling toFixed
    const numValue = Number(v);
    return !isNaN(numValue) ? numValue.toFixed(3) : "0.000";
  },
  formatWeight = (w) => {
    // Ensure the value is a number before calling toFixed
    const numValue = Number(w);
    return !isNaN(numValue) ? numValue.toFixed(2) : "0.00";
  }
}) => {
  if (cargoItems.length === 0) {
    return <p className="text-gray-500">No cargo items added yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Barcode</th>
            <th className="px-4 py-2 text-left">Invoice</th>
            <th className="px-4 py-2 text-left">Package</th>
            <th className="px-4 py-2 text-left">Shipper</th>
            <th className="px-4 py-2 text-left">Consignee</th>
            <th className="px-4 py-2 text-right">Volume</th>
            <th className="px-4 py-2 text-right">Weight</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cargoItems.map(item => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.barcode}</td>
              <td className="px-4 py-2">{item.invoiceNumber}</td>
              <td className="px-4 py-2">{item.packageName}</td>
              <td className="px-4 py-2">{item.shipper}</td>
              <td className="px-4 py-2">{item.consignee}</td>
              <td className="px-4 py-2 text-right">{formatVolume(item.volume)}</td>
              <td className="px-4 py-2 text-right">{formatWeight(item.weight)}</td>
              <td className="px-4 py-2 text-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onRemoveCargo(item.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 font-medium">
          <tr>
            <td colSpan={5} className="px-4 py-2 text-right">Total:</td>
            <td className="px-4 py-2 text-right">
              {formatVolume(cargoItems.reduce((sum, item) => sum + Number(item.volume || 0), 0))}
            </td>
            <td className="px-4 py-2 text-right">
              {formatWeight(cargoItems.reduce((sum, item) => sum + Number(item.weight || 0), 0))}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CargoTable;

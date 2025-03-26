
import React from "react";
import { ContainerCargo } from "../../../../types/containerTypes";
import { Package } from "lucide-react";

interface CargoItemsSectionProps {
  cargoItems: ContainerCargo[];
  formatVolume: (volume: number) => string;
  formatWeight: (weight: number) => string;
}

const CargoItemsSection: React.FC<CargoItemsSectionProps> = ({
  cargoItems,
  formatVolume,
  formatWeight
}) => {
  return (
    <div className="cargo-items mb-8 page-break-before">
      <div className="flex items-center mb-2">
        <Package className="mr-2 h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold uppercase">CARGO ITEMS</h2>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left uppercase">INVOICE</th>
            <th className="border p-2 text-left uppercase">LINE #</th>
            <th className="border p-2 text-left uppercase">PACKAGE</th>
            <th className="border p-2 text-left uppercase">VOLUME (m³)</th>
            <th className="border p-2 text-left uppercase">WEIGHT (kg)</th>
            <th className="border p-2 text-left uppercase">SHIPPER</th>
            <th className="border p-2 text-left uppercase">CONSIGNEE</th>
          </tr>
        </thead>
        <tbody>
          {cargoItems.length === 0 ? (
            <tr>
              <td colSpan={7} className="border p-4 text-center uppercase">NO CARGO ITEMS FOUND</td>
            </tr>
          ) : (
            cargoItems.map(item => (
              <tr key={item.id} className="border-b">
                <td className="border p-2 uppercase">{item.invoiceNumber}</td>
                <td className="border p-2">{item.lineNumber}</td>
                <td className="border p-2 uppercase">{item.packageName}</td>
                <td className="border p-2">{formatVolume(item.volume)}</td>
                <td className="border p-2">{formatWeight(item.weight)}</td>
                <td className="border p-2 uppercase">{item.shipper}</td>
                <td className="border p-2 uppercase">{item.consignee}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CargoItemsSection;

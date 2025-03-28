
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CargoItemsTabProps {
  cargoItems: any[];
}

const CargoItemsTab: React.FC<CargoItemsTabProps> = ({ cargoItems }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle>CARGO ITEMS</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 text-left">Invoice #</th>
                <th className="p-2 text-left">Line #</th>
                <th className="p-2 text-left">Barcode</th>
                <th className="p-2 text-left">Package</th>
                <th className="p-2 text-left">Volume (m³)</th>
                <th className="p-2 text-left">Weight (kg)</th>
                <th className="p-2 text-left">Shipper</th>
                <th className="p-2 text-left">Consignee</th>
                <th className="p-2 text-left">WH</th>
                <th className="p-2 text-left">D2D</th>
              </tr>
            </thead>
            <tbody>
              {cargoItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{item.invoiceNumber}</td>
                  <td className="p-2">{item.lineNumber}</td>
                  <td className="p-2">{item.barcode || "N/A"}</td>
                  <td className="p-2">{item.packageName}</td>
                  <td className="p-2">{item.volume}</td>
                  <td className="p-2">{item.weight}</td>
                  <td className="p-2">{item.shipper}</td>
                  <td className="p-2">{item.consignee}</td>
                  <td className="p-2">{item.wh}</td>
                  <td className="p-2">{item.d2d ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoItemsTab;

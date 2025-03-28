
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
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left border">INVOICE</th>
                <th className="p-2 text-left border">BARCODE</th>
                <th className="p-2 text-left border">PACKAGE</th>
                <th className="p-2 text-left border">VOLUME</th>
                <th className="p-2 text-left border">WEIGHT</th>
                <th className="p-2 text-left border">SHIPPER</th>
                <th className="p-2 text-left border">CONSIGNEE</th>
              </tr>
            </thead>
            <tbody>
              {cargoItems && cargoItems.length > 0 ? (
                cargoItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-2 border">{item.invoiceNumber}</td>
                    <td className="p-2 border">{item.barcode || 'N/A'}</td>
                    <td className="p-2 border">{item.packageName}</td>
                    <td className="p-2 border">{item.volume} m³</td>
                    <td className="p-2 border">{item.weight} kg</td>
                    <td className="p-2 border">{item.shipper}</td>
                    <td className="p-2 border">{item.consignee}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500 border">
                    NO CARGO ITEMS FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoItemsTab;

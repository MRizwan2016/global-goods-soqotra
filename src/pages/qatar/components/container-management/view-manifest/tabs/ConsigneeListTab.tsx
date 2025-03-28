
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConsigneeListTabProps {
  consigneeList: any[];
}

const ConsigneeListTab: React.FC<ConsigneeListTabProps> = ({ consigneeList }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle>CONSIGNEE LIST</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left border">INVOICE</th>
                <th className="p-2 text-left border">SHIPPER</th>
                <th className="p-2 text-left border">SHIPPER CONTACT</th>
                <th className="p-2 text-left border">CONSIGNEE</th>
                <th className="p-2 text-left border">CONSIGNEE CONTACT</th>
                <th className="p-2 text-left border">VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {consigneeList && consigneeList.length > 0 ? (
                consigneeList.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-2 border">{item.invoice}</td>
                    <td className="p-2 border">{item.shipper}</td>
                    <td className="p-2 border">{item.shipperContact || 'N/A'}</td>
                    <td className="p-2 border">{item.consignee}</td>
                    <td className="p-2 border">{item.consigneeContact || 'N/A'}</td>
                    <td className="p-2 border">{item.volume.toFixed(2)} m³</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500 border">
                    NO CONSIGNEES FOUND
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

export default ConsigneeListTab;

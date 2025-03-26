
import React from "react";
import { ConsigneeListItem } from "../../../../types/containerTypes";
import { Users } from "lucide-react";

interface ConsigneeListSectionProps {
  consigneeList: ConsigneeListItem[];
  formatVolume: (volume: number) => string;
}

const ConsigneeListSection: React.FC<ConsigneeListSectionProps> = ({
  consigneeList,
  formatVolume
}) => {
  return (
    <div className="consignee-list mb-8 page-break-before">
      <div className="flex items-center mb-2">
        <Users className="mr-2 h-5 w-5 text-purple-600" />
        <h2 className="text-lg font-semibold uppercase">CONSIGNEE CONTACT LIST</h2>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left uppercase">INVOICE</th>
            <th className="border p-2 text-left uppercase">SHIPPER</th>
            <th className="border p-2 text-left uppercase">SHIPPER CONTACT</th>
            <th className="border p-2 text-left uppercase">CONSIGNEE</th>
            <th className="border p-2 text-left uppercase">CONSIGNEE CONTACT</th>
            <th className="border p-2 text-left uppercase">VOLUME (m³)</th>
          </tr>
        </thead>
        <tbody>
          {consigneeList.length === 0 ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center uppercase">NO CONSIGNEES FOUND</td>
            </tr>
          ) : (
            consigneeList.map(consignee => (
              <tr key={consignee.id} className="border-b">
                <td className="border p-2 uppercase">{consignee.invoice}</td>
                <td className="border p-2 uppercase">{consignee.shipper}</td>
                <td className="border p-2 uppercase">{consignee.shipperContact}</td>
                <td className="border p-2 uppercase">{consignee.consignee}</td>
                <td className="border p-2 uppercase">{consignee.consigneeContact}</td>
                <td className="border p-2">{formatVolume(consignee.volume)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsigneeListSection;

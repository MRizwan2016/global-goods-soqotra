
import React from "react";
import { ItemListEntry } from "../../../../types/containerTypes";
import { FileCheck } from "lucide-react";

interface ItemListSectionProps {
  itemList: ItemListEntry[];
  formatVolume: (volume: number) => string;
}

const ItemListSection: React.FC<ItemListSectionProps> = ({
  itemList,
  formatVolume
}) => {
  return (
    <div className="item-list mb-8 page-break-before">
      <div className="flex items-center mb-2">
        <FileCheck className="mr-2 h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold uppercase">ITEM LIST BY INVOICE</h2>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left uppercase">INVOICE</th>
            <th className="border p-2 text-left uppercase">SHIPPER</th>
            <th className="border p-2 text-left uppercase">CONSIGNEE</th>
            <th className="border p-2 text-left uppercase">PACKAGES</th>
            <th className="border p-2 text-left uppercase">PACKAGE TYPE</th>
            <th className="border p-2 text-left uppercase">VOLUME (m³)</th>
          </tr>
        </thead>
        <tbody>
          {itemList.length === 0 ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center uppercase">NO ITEMS FOUND</td>
            </tr>
          ) : (
            itemList.map(item => (
              <tr key={item.id} className="border-b">
                <td className="border p-2 uppercase">{item.invoice}</td>
                <td className="border p-2 uppercase">{item.shipper}</td>
                <td className="border p-2 uppercase">{item.consignee}</td>
                <td className="border p-2">{item.packages}</td>
                <td className="border p-2 uppercase">{item.packageName}</td>
                <td className="border p-2">{formatVolume(item.volume)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemListSection;

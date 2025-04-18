
import React from "react";
import { PackageItemsTableProps } from "./package-items/types";
import EmptyState from "./package-items/EmptyState";
import TableHeader from "./package-items/TableHeader";
import ActionButtons from "./package-items/ActionButtons";

const PackageItemsTable: React.FC<PackageItemsTableProps> = ({
  items = [],
  onEdit,
  onDelete
}) => {
  // Filter out items with negative quantity (marked for deletion)
  const validItems = items.filter(item => item.quantity > 0);

  if (validItems.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {validItems.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 whitespace-nowrap uppercase">
                {item.itemName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {item.sellPrice.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {item.quantity}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {(item.sellPrice * item.quantity).toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <ActionButtons 
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageItemsTable;

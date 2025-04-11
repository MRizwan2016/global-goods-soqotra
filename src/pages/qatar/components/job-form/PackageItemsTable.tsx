
import React from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobItem } from "../../types/jobTypes";

interface PackageItemsTableProps {
  items: JobItem[];
  onEdit?: (item: JobItem) => void;
  onDelete?: (id: string) => void;
}

const PackageItemsTable: React.FC<PackageItemsTableProps> = ({
  items = [],
  onEdit,
  onDelete
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
        <p className="text-gray-500">No items added yet</p>
        <p className="text-sm text-gray-400 mt-1">Add items using the form above</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ITEM DESCRIPTION
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SELL PRICE
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              QUANTITY
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              TOTAL
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 whitespace-nowrap">
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
                <div className="flex justify-end gap-2">
                  {onEdit && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200"
                    >
                      <Edit size={16} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageItemsTable;

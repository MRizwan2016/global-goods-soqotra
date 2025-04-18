
import React from "react";

interface ItemSummaryProps {
  itemCounts: Record<string, number>;
}

const ItemSummary: React.FC<ItemSummaryProps> = ({ itemCounts }) => {
  // Check if there are any items
  const hasItems = Object.keys(itemCounts).length > 0;

  if (!hasItems) {
    return (
      <div className="border p-3 rounded-md">
        <h3 className="font-bold mb-2">Item Summary</h3>
        <p className="text-gray-500">No items found</p>
      </div>
    );
  }

  return (
    <div className="border p-3 rounded-md">
      <h3 className="font-bold mb-2">Item Summary</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 print:bg-white">
            <th className="text-left p-1 border">Item Description</th>
            <th className="text-right p-1 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(itemCounts).map(([item, count], index) => (
            <tr key={index} className="border-b">
              <td className="p-1 border">{item}</td>
              <td className="p-1 text-right border">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemSummary;

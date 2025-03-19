
import React from "react";

interface ItemSummaryProps {
  itemCounts: Record<string, number>;
}

const ItemSummary: React.FC<ItemSummaryProps> = ({ itemCounts }) => {
  return (
    <div className="border border-blue-300">
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(itemCounts).map(([itemName, count], index) => (
            <tr key={index} className={index < Object.entries(itemCounts).length - 1 ? "border-b border-blue-300" : ""}>
              <td className="p-2 font-bold border-r border-blue-300">{itemName}</td>
              <td className="p-2 text-right">{count}</td>
            </tr>
          ))}
          {Object.keys(itemCounts).length === 0 && (
            <tr>
              <td className="p-2 font-bold border-r border-blue-300">No items</td>
              <td className="p-2 text-right">0</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemSummary;

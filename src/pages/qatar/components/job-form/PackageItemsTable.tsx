
import { JobItem } from "../../types/jobTypes";
import { formatCurrency } from "../../utils/formatters";

interface PackageItemsTableProps {
  items: JobItem[];
}

const PackageItemsTable = ({ items }: PackageItemsTableProps) => {
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ITEM</th>
            <th className="border p-2 text-left">PRICE</th>
            <th className="border p-2 text-left">QTY</th>
            <th className="border p-2 text-left">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b">
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2">{formatCurrency(item.sellPrice)}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{formatCurrency(item.sellPrice * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageItemsTable;

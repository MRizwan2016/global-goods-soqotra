
import React from "react";
import { useJobForm } from "./context/JobFormContext";

const PackageItemsTable: React.FC = () => {
  const { jobItems } = useJobForm();
  
  // Calculate volume based on package type for display
  const getPackageDimensions = (packageName: string) => {
    const name = packageName?.toLowerCase() || '';
    if (name.includes('small')) return { dim: "30×30×30 cm", vol: 0.027 };
    if (name.includes('medium')) return { dim: "40×40×40 cm", vol: 0.064 };
    if (name.includes('large')) return { dim: "50×50×50 cm", vol: 0.125 };
    if (name.includes('extra large')) return { dim: "60×60×60 cm", vol: 0.216 };
    if (name.includes('jumbo')) return { dim: "70×70×70 cm", vol: 0.343 };
    if (name.includes('super jumbo')) return { dim: "80×80×80 cm", vol: 0.512 };
    if (name.includes('1 meter')) return { dim: "100×50×50 cm", vol: 0.25 };
    if (name.includes('1.5 meter')) return { dim: "150×50×50 cm", vol: 0.375 };
    if (name.includes('2 meter')) return { dim: "200×50×50 cm", vol: 0.5 };
    if (name.includes('2.5 meter')) return { dim: "250×50×50 cm", vol: 0.625 };
    if (name.includes('3 meter')) return { dim: "300×50×50 cm", vol: 0.75 };
    if (name.includes('4 meter')) return { dim: "400×50×50 cm", vol: 1.0 };
    if (name.includes('television')) return { dim: "120×80×20 cm", vol: 0.192 };
    if (name.includes('washing machine')) return { dim: "60×60×85 cm", vol: 0.306 };
    if (name.includes('refrigerator')) return { dim: "60×65×175 cm", vol: 0.683 };
    return { dim: "Custom", vol: 0.1 };
  };
  
  if (jobItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PACKAGE ITEMS</h3>
        <p className="text-gray-500 text-center py-8">No package items added yet.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PACKAGE ITEMS</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-3 py-2 text-center text-xs font-bold uppercase">Num</th>
              <th className="px-3 py-2 text-center text-xs font-bold uppercase">Item</th>
              <th className="px-3 py-2 text-center text-xs font-bold uppercase">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-center text-sm">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900">
                  {item.name || item.itemName}
                </td>
                <td className="px-3 py-2 text-center text-sm">{item.quantity || 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Summary Table */}
        <div className="mt-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-3 py-2 text-center text-xs font-bold uppercase">Num</th>
                <th className="px-3 py-2 text-center text-xs font-bold uppercase">Item</th>
                <th className="px-3 py-2 text-center text-xs font-bold uppercase">Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Group items by name and sum quantities */}
              {Object.entries(
                jobItems.reduce((acc: Record<string, number>, item) => {
                  const itemName = item.name || item.itemName || '';
                  acc[itemName] = (acc[itemName] || 0) + (item.quantity || 1);
                  return acc;
                }, {})
              ).map(([itemName, totalQuantity], index) => (
                <tr key={itemName} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-center text-sm">{index + 1}</td>
                  <td className="px-3 py-2 text-sm font-medium text-gray-900">{itemName}</td>
                  <td className="px-3 py-2 text-center text-sm">{String(totalQuantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PackageItemsTable;

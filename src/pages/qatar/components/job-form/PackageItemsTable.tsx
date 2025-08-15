
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Box #</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (m³)</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobItems.map((item, index) => {
              const packageInfo = getPackageDimensions(item.name || item.itemName || '');
              const totalVolume = packageInfo.vol * (item.quantity || 1);
              const totalPrice = (item.sellPrice || 0) * (item.quantity || 1);
              
              return (
                <tr key={item.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.boxNumber || (index + 1)}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.name || item.itemName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{packageInfo.dim}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity || 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{totalVolume.toFixed(3)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">QAR {item.sellPrice || 0}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">QAR {totalPrice}</td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-medium">
              <td className="px-4 py-4 text-sm text-gray-900" colSpan={3}>TOTALS:</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {jobItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {jobItems.reduce((sum, item) => {
                  const packageInfo = getPackageDimensions(item.name || item.itemName || '');
                  return sum + (packageInfo.vol * (item.quantity || 1));
                }, 0).toFixed(3)} m³
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                QAR {jobItems.reduce((sum, item) => sum + ((item.sellPrice || 0) * (item.quantity || 1)), 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageItemsTable;

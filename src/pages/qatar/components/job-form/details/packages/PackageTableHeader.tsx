
import React from "react";

const PackageTableHeader = () => {
  return (
    <thead className="bg-gray-100 sticky top-0">
      <tr className="text-xs font-medium text-gray-700">
        <th className="px-2 py-2 text-left border-b border-r border-gray-200">SR NO</th>
        <th className="px-2 py-2 text-left border-b border-r border-gray-200">DESCRIPTION</th>
        <th className="px-2 py-2 text-center border-b border-r border-gray-200">DIMENSIONS</th>
        <th className="px-2 py-2 text-center border-b border-r border-gray-200">VOLUME IN METERS</th>
        <th className="px-2 py-2 text-right border-b border-r border-gray-200">PRICE</th>
        <th className="px-2 py-2 text-right border-b border-r border-gray-200">DOCUMENTS FEE</th>
        <th className="px-2 py-2 text-right border-b border-gray-200">TOTAL</th>
      </tr>
    </thead>
  );
};

export default PackageTableHeader;

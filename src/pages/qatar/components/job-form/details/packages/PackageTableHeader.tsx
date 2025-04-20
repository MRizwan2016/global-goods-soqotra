
import React from "react";

const PackageTableHeader = () => {
  return (
    <thead className="bg-gray-100">
      <tr className="text-xs font-medium text-gray-600 uppercase">
        <th className="px-2 py-2 text-center border-r border-b border-gray-200 w-12">#</th>
        <th className="px-2 py-2 border-r border-b border-gray-200">Description</th>
        <th className="px-2 py-2 text-center border-r border-b border-gray-200">Dimensions</th>
        <th className="px-2 py-2 text-center border-r border-b border-gray-200">Volume (m³)</th>
        <th className="px-2 py-2 text-right border-r border-b border-gray-200">Price</th>
        <th className="px-2 py-2 text-right border-r border-b border-gray-200">Docs Fee</th>
        <th className="px-2 py-2 text-right border-b border-gray-200">Total</th>
      </tr>
    </thead>
  );
};

export default PackageTableHeader;

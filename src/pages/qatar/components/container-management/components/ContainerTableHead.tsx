
import React from "react";

const ContainerTableHead = () => {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <th className="p-3 text-left font-semibold">Container Number</th>
        <th className="p-3 text-left font-semibold">Type</th>
        <th className="p-3 text-left font-semibold">Status</th>
        <th className="p-3 text-left font-semibold">Shipping Line</th>
        <th className="p-3 text-left font-semibold">Direction</th>
        <th className="p-3 text-left font-semibold">Sector</th>
        <th className="p-3 text-left font-semibold">Volume</th>
        <th className="p-3 text-left font-semibold">Weight</th>
        <th className="p-3 text-left font-semibold">Actions</th>
      </tr>
    </thead>
  );
};

export default ContainerTableHead;

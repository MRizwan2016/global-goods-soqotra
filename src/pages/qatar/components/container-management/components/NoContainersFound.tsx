
import React from "react";
import { Package } from "lucide-react";

const NoContainersFound = () => {
  return (
    <tr>
      <td colSpan={9} className="p-6 text-center text-gray-500">
        <div className="flex flex-col items-center">
          <Package size={40} className="text-gray-300 mb-2" />
          <p className="mb-1">No containers found</p>
          <p className="text-sm text-gray-400">Try adjusting your search filters</p>
        </div>
      </td>
    </tr>
  );
};

export default NoContainersFound;

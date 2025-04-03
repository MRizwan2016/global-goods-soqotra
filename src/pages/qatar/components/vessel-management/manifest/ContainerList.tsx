
import React from "react";

interface ContainerListProps {
  containerData: any[];
}

const ContainerList: React.FC<ContainerListProps> = ({ containerData = [] }) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3 text-lg">Container List</h3>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 text-left">No.</th>
              <th className="p-2 text-left">Container Number</th>
              <th className="p-2 text-left">Seal Number</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Weight</th>
              <th className="p-2 text-left">Packages</th>
              <th className="p-2 text-left">Volume</th>
            </tr>
          </thead>
          <tbody>
            {containerData.length > 0 ? (
              containerData.map((container, index) => (
                <tr key={container.id || `container-${index}`} className="border-t hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{container.containerNumber || "N/A"}</td>
                  <td className="p-2">{container.sealNumber || "N/A"}</td>
                  <td className="p-2">{container.containerType || "N/A"}</td>
                  <td className="p-2">{container.weight || 0} kg</td>
                  <td className="p-2">{container.packages || 0}</td>
                  <td className="p-2">{container.volume || 0} m³</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No containers assigned to this vessel
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContainerList;

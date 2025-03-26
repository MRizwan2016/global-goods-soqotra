
import React from "react";
import { QatarContainer } from "../../types/containerTypes";
import { Button } from "@/components/ui/button";
import { PenLine, Truck, FileText, ClipboardList } from "lucide-react";

interface ContainerListProps {
  containerData: QatarContainer[];
  onEdit?: (containerId: string) => void;
  onLoad?: (containerId: string) => void;
  onViewManifest?: (containerId: string) => void;
  onCreateManifest?: (containerId: string) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({
  containerData,
  onEdit,
  onLoad,
  onViewManifest,
  onCreateManifest
}) => {
  return (
    <div className="p-6">
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Container Number</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Shipping Line</th>
              <th className="p-2 text-left">Direction</th>
              <th className="p-2 text-left">Sector</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {containerData.map((container) => (
              <tr key={container.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{container.containerNumber}</td>
                <td className="p-2">{container.containerType}</td>
                <td className="p-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      container.status === "Available" ? "bg-green-100 text-green-800" :
                      container.status === "In Transit" ? "bg-blue-100 text-blue-800" :
                      container.status === "Loading" ? "bg-yellow-100 text-yellow-800" :
                      container.status === "Loaded" ? "bg-purple-100 text-purple-800" :
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {container.status}
                  </span>
                </td>
                <td className="p-2">{container.shippingLine || "N/A"}</td>
                <td className="p-2">{container.direction || "N/A"}</td>
                <td className="p-2">{container.sector || "N/A"}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(container.id)}
                        title="Edit Container"
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                    )}
                    {onLoad && container.status !== "Loaded" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onLoad(container.id)}
                        title="Load Container"
                      >
                        <Truck className="h-4 w-4" />
                      </Button>
                    )}
                    {onCreateManifest && container.status !== "Loaded" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onCreateManifest(container.id)}
                        title="Create Manifest"
                      >
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    )}
                    {onViewManifest && container.status === "Loaded" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onViewManifest(container.id)}
                        title="View Manifest"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContainerList;

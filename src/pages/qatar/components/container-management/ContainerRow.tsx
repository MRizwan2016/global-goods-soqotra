
import React from "react";
import { Button } from "@/components/ui/button";
import { PenLine, Truck, ClipboardList, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { QatarContainer } from "../../types/containerTypes";

interface ContainerRowProps {
  container: QatarContainer;
  index: number;
  onEdit?: (containerId: string) => void;
  onLoad?: (containerId: string) => void;
  onViewManifest?: (containerId: string) => void;
  onCreateManifest?: (containerId: string) => void;
}

const ContainerRow = ({ 
  container, 
  index, 
  onEdit, 
  onLoad, 
  onViewManifest, 
  onCreateManifest 
}: ContainerRowProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.tr 
      key={container.id} 
      className="border-t hover:bg-blue-50 transition-colors"
      variants={itemVariants}
    >
      <td className="p-3 font-medium">{container.containerNumber}</td>
      <td className="p-3">{container.containerType || "N/A"}</td>
      <td className="p-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            container.status === "Available" ? "bg-green-100 text-green-800" :
            container.status === "In Transit" ? "bg-blue-100 text-blue-800" :
            container.status === "Loading" ? "bg-yellow-100 text-yellow-800" :
            container.status === "Loaded" ? "bg-purple-100 text-purple-800" :
            container.status === "CONFIRMED" ? "bg-teal-100 text-teal-800" :
            "bg-gray-100 text-gray-800"
          }`}
        >
          {container.status || "Pending"}
        </span>
      </td>
      <td className="p-3">{container.shippingLine || "N/A"}</td>
      <td className="p-3">{container.direction || "N/A"}</td>
      <td className="p-3">{container.sector || "N/A"}</td>
      <td className="p-3">{container.volume ? `${container.volume.toFixed(3)} m³` : "0.000 m³"}</td>
      <td className="p-3">{container.weight ? `${container.weight.toFixed(2)} kg` : "0.00 kg"}</td>
      <td className="p-3">
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(container.id)}
              title="Edit Container"
              className="bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          )}
          {onLoad && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoad(container.id)}
              title="Load Container"
              className="bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700"
            >
              <Truck className="h-4 w-4" />
            </Button>
          )}
          {onCreateManifest && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCreateManifest(container.id)}
              title="Create Manifest"
              className="bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700"
            >
              <ClipboardList className="h-4 w-4" />
            </Button>
          )}
          {onViewManifest && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewManifest(container.id)}
              title="View Manifest"
              className="bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
            >
              <FileText className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default ContainerRow;

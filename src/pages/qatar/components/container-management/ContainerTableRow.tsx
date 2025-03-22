
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { QatarContainer } from "../../types/containerTypes";

interface ContainerTableRowProps {
  container: QatarContainer;
  index: number;
  onSelect: (containerId: string) => void;
}

const ContainerTableRow: React.FC<ContainerTableRowProps> = ({ 
  container, 
  index, 
  onSelect 
}) => {
  return (
    <TableRow 
      className={index % 2 === 0 ? "bg-white hover:bg-blue-50 transition-colors" : "bg-gray-50 hover:bg-blue-50 transition-colors"}
    >
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell>{container.runningNumber}</TableCell>
      <TableCell>{container.containerNumber}</TableCell>
      <TableCell>{container.sealNumber}</TableCell>
      <TableCell>{container.containerType}</TableCell>
      <TableCell>{container.direction}</TableCell>
      <TableCell>{container.etd}</TableCell>
      <TableCell>{container.eta}</TableCell>
      <TableCell>{container.loadDate}</TableCell>
      <TableCell className="flex gap-2 justify-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 p-1 h-auto"
          onClick={() => onSelect(container.id)}
        >
          <Edit2 size={18} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ContainerTableRow;

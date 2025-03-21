
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit2 } from "lucide-react";
import { QatarContainer } from "../../types/containerTypes";

interface ContainerTableProps {
  containers: QatarContainer[];
  onContainerSelect: (containerId: string) => void;
}

const ContainerTable: React.FC<ContainerTableProps> = ({ 
  containers, 
  onContainerSelect 
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="font-bold text-blue-800 text-center">NUM</TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                RUNNING NUMBER <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                CONTAINER NUMBER <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                SEAL NUMBER <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                CONTAINER TYPE <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800">DIR/MIX</TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                E.T.D <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                E.T.A <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800">
              <div className="flex items-center gap-1">
                LOAD DATE <ArrowUpDown size={16} />
              </div>
            </TableHead>
            <TableHead className="font-bold text-blue-800 text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {containers.map((container, index) => (
            <TableRow 
              key={container.id} 
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
                  onClick={() => onContainerSelect(container.id)}
                >
                  <Edit2 size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContainerTable;

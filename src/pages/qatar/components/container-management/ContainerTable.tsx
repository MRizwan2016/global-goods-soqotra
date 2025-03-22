
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { QatarContainer } from "../../types/containerTypes";
import ContainerTableHeader from "./ContainerTableHeader";
import ContainerTableRow from "./ContainerTableRow";

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
        <ContainerTableHeader />
        <TableBody>
          {containers.map((container, index) => (
            <ContainerTableRow
              key={container.id}
              container={container}
              index={index}
              onSelect={onContainerSelect}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContainerTable;


import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

const ContainerTableHeader: React.FC = () => {
  return (
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
  );
};

export default ContainerTableHeader;

import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Ship } from "lucide-react";
import { QatarVessel } from "../types/vesselTypes";

interface VesselsTableProps {
  vessels: QatarVessel[];
  onVesselSelect: (vesselId: string) => void;
}

const VesselsTable: React.FC<VesselsTableProps> = ({ vessels, onVesselSelect }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-600 hover:bg-blue-600">
            <TableHead className="text-white text-center w-16">Num</TableHead>
            <TableHead className="text-white">Running Number</TableHead>
            <TableHead className="text-white">Vessel Name</TableHead>
            <TableHead className="text-white">Voyage</TableHead>
            <TableHead className="text-white">P.O.L</TableHead>
            <TableHead className="text-white">P.O.D</TableHead>
            <TableHead className="text-white">DIR/MIX</TableHead>
            <TableHead className="text-white">E.T.D</TableHead>
            <TableHead className="text-white">E.T.A</TableHead>
            <TableHead className="text-white">Load Date</TableHead>
            <TableHead className="text-white text-center w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vessels.length > 0 ? (
            vessels.map((vessel, index) => (
              <TableRow key={vessel.id} className="hover:bg-gray-50">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{vessel.runningNumber}</TableCell>
                <TableCell>{vessel.vesselName}</TableCell>
                <TableCell>{vessel.voyage}</TableCell>
                <TableCell>{vessel.portOfLoading}</TableCell>
                <TableCell>{vessel.portOfDischarge}</TableCell>
                <TableCell>{vessel.direction === "MIX" ? "M" : "D"}</TableCell>
                <TableCell>{vessel.etd}</TableCell>
                <TableCell>{vessel.eta}</TableCell>
                <TableCell>{vessel.loadDate || "-"}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onVesselSelect(vessel.id)}
                    className="hover:bg-blue-100 text-blue-600"
                  >
                    <Eye size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                <div className="flex flex-col items-center">
                  <Ship size={48} className="text-gray-300 mb-2" />
                  <p>No vessels found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VesselsTable;

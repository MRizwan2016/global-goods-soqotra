
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { QatarDriver } from "../../types/vehicleTypes";
import DriverTableRow from "./DriverTableRow";

interface DriverTableProps {
  drivers: QatarDriver[];
  onEditDriver: (driver: QatarDriver) => void;
}

const DriverTable: React.FC<DriverTableProps> = ({ drivers, onEditDriver }) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="font-bold text-blue-800 text-center">NUM</TableHead>
            <TableHead className="font-bold text-blue-800">CODE</TableHead>
            <TableHead className="font-bold text-blue-800">NAME</TableHead>
            <TableHead className="font-bold text-blue-800">MOBILE NUMBER</TableHead>
            <TableHead className="font-bold text-blue-800">LICENSE NUMBER</TableHead>
            <TableHead className="font-bold text-blue-800">LICENSE EXPIRY</TableHead>
            <TableHead className="font-bold text-blue-800">ASSIGNED VEHICLE</TableHead>
            <TableHead className="font-bold text-blue-800">STATUS</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver, index) => (
            <DriverTableRow 
              key={driver.id} 
              driver={driver} 
              index={index} 
              onEditClick={onEditDriver} 
            />
          ))}
        </TableBody>
      </Table>
      
      <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center">
        <div>Showing 1 to {drivers.length} of {drivers.length} entries</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled className="text-sm">Previous</Button>
          <Button variant="default" size="sm" className="bg-blue-600 text-white text-sm">1</Button>
          <Button variant="outline" size="sm" disabled className="text-sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default DriverTable;


import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, UserCheck } from "lucide-react";
import { QatarDriver } from "../../types/vehicleTypes";

interface DriverTableRowProps {
  driver: QatarDriver;
  index: number;
  onEditClick: (driver: QatarDriver) => void;
}

const DriverTableRow: React.FC<DriverTableRowProps> = ({ driver, index, onEditClick }) => {
  return (
    <TableRow className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell>{driver.code}</TableCell>
      <TableCell className="font-medium">{driver.name}</TableCell>
      <TableCell>{driver.mobileNumber}</TableCell>
      <TableCell>{driver.licenseNumber}</TableCell>
      <TableCell>{driver.licenseExpiry}</TableCell>
      <TableCell>
        {driver.assignedVehicleNumber ? 
          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
            {driver.assignedVehicleNumber}
          </span> : 
          <span className="text-gray-400">Not Assigned</span>
        }
      </TableCell>
      <TableCell>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          driver.employmentStatus === "ACTIVE" 
            ? "bg-green-100 text-green-800" 
            : driver.employmentStatus === "ON_LEAVE"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
          {driver.employmentStatus === "ACTIVE" 
            ? "Active" 
            : driver.employmentStatus === "ON_LEAVE"
            ? "On Leave"
            : "Inactive"}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600"
            onClick={() => onEditClick(driver)}
          >
            <Edit2 size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="text-green-600">
            <UserCheck size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DriverTableRow;

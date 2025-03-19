
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, UserCheck } from "lucide-react";
import { mockDrivers } from "../../data/mockVehicles";
import { QatarDriver } from "../../types/vehicleTypes";

const DriverList: React.FC = () => {
  // Add employment status to each driver
  const [drivers] = useState<QatarDriver[]>(
    mockDrivers.map((driver, index) => ({
      ...driver,
      // Add employment status - first 5 drivers active, others on different statuses
      employmentStatus: index < 5 ? "ACTIVE" : (index === 5 ? "ON_LEAVE" : "INACTIVE")
    }))
  );
  
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
            <TableHead className="font-bold text-blue-800">STATUS</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver, index) => (
            <TableRow key={driver.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{driver.code}</TableCell>
              <TableCell className="font-medium">{driver.name}</TableCell>
              <TableCell>{driver.mobileNumber}</TableCell>
              <TableCell>{driver.licenseNumber}</TableCell>
              <TableCell>{driver.licenseExpiry}</TableCell>
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
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-green-600">
                    <UserCheck size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
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

export default DriverList;

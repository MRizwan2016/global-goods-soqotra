
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
import { Edit2 } from "lucide-react";
import { mockVehicles } from "../../data/mockJobData";
import { QatarVehicle } from "../../types/vehicleTypes";

const VehicleList: React.FC = () => {
  const [vehicles] = useState<QatarVehicle[]>(mockVehicles);
  
  return (
    <div className="border border-gray-200 rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="font-bold text-blue-800 text-center">NUM</TableHead>
            <TableHead className="font-bold text-blue-800">TYPE</TableHead>
            <TableHead className="font-bold text-blue-800">FUEL</TableHead>
            <TableHead className="font-bold text-blue-800">ECC</TableHead>
            <TableHead className="font-bold text-blue-800">GEAR</TableHead>
            <TableHead className="font-bold text-blue-800">MILEAGE</TableHead>
            <TableHead className="font-bold text-blue-800">REGI. NUM</TableHead>
            <TableHead className="font-bold text-blue-800">DETAIL</TableHead>
            <TableHead className="font-bold text-blue-800">AVAILABLE</TableHead>
            <TableHead className="font-bold text-blue-800">LICENSE EXPIRE</TableHead>
            <TableHead className="font-bold text-blue-800">INSURANCE EXPIRE</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">MODIFY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle, index) => {
            const fuelType = vehicle.description.includes("DIESEL") ? "Diesel" : "Petrol";
            const gearType = "Manual";
            const ecc = fuelType === "Diesel" ? "3000" : "0";
            
            return (
              <TableRow key={vehicle.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{vehicle.type === "FORK LIFT" ? "Fork Lift" : "Lorry"}</TableCell>
                <TableCell>{fuelType}</TableCell>
                <TableCell>{ecc}</TableCell>
                <TableCell>{gearType}</TableCell>
                <TableCell>{vehicle.mileage}</TableCell>
                <TableCell className={vehicle.number === "74827" ? "text-blue-600 font-medium" : ""}>
                  {vehicle.number}
                </TableCell>
                <TableCell>{vehicle.description}</TableCell>
                <TableCell>{vehicle.status === "RUN" ? "Run" : "Garage"}</TableCell>
                <TableCell>{vehicle.licenseExpiry}</TableCell>
                <TableCell>{vehicle.insuranceExpiry}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center">
        <div>Showing 1 to {vehicles.length} of {vehicles.length} entries</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled className="text-sm">Previous</Button>
          <Button variant="default" size="sm" className="bg-blue-600 text-white text-sm">1</Button>
          <Button variant="outline" size="sm" disabled className="text-sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;

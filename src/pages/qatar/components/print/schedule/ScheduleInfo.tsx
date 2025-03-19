
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cityVehicleMapping } from "../../../data/cityVehicleMapping";

interface ScheduleInfoProps {
  scheduleData: any;
}

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({ scheduleData }) => {
  const { scheduleNumber, vehicle, salesRep, driver, helper, scheduleDate, city } = scheduleData || {};
  
  // Get city recommendations for this vehicle if no city is specified
  const vehicleCities = !city && vehicle 
    ? Object.entries(cityVehicleMapping)
        .filter(([_, vehicles]) => vehicles.includes(vehicle))
        .map(([cityCode, _]) => cityCode)
    : [];

  return (
    <div className="mb-4 pb-3 border-b">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <div>
          <strong>SCHEDULE NO:</strong> {scheduleNumber || "-"}
        </div>
        <div>
          <strong>DATE:</strong> {scheduleDate ? new Date(scheduleDate).toLocaleDateString() : "-"}
        </div>
        <div>
          <strong>VEHICLE:</strong> {vehicle || "-"}
          {vehicle && (
            <span className="text-xs ml-1 text-gray-600">
              (TYPE: {
                vehicle?.startsWith("41") ? "LORRY" :
                vehicle?.startsWith("119") ? "PETROL MANUAL" : 
                "OTHER"
              })
            </span>
          )}
        </div>
        <div>
          <strong>SALES REP:</strong> {salesRep || "-"}
        </div>
        <div>
          <strong>DRIVER:</strong> {driver || "-"}
        </div>
        <div>
          <strong>HELPER:</strong> {helper || "-"}
        </div>
        {/* Show city information */}
        {city && (
          <div className="col-span-2 md:col-span-3">
            <strong>CITY:</strong> {city}
            {cityVehicleMapping[city]?.length > 0 && (
              <Badge className="ml-2">
                Recommended Truck: {cityVehicleMapping[city][0]}
              </Badge>
            )}
          </div>
        )}
        {/* Show recommended cities for this vehicle */}
        {!city && vehicleCities.length > 0 && (
          <div className="col-span-2 md:col-span-3">
            <strong>RECOMMENDED FOR CITIES:</strong> {' '}
            {vehicleCities.map(cityCode => (
              <Badge key={cityCode} className="mr-1">{cityCode}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleInfo;

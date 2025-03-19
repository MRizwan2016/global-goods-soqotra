
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cityVehicleMapping } from "../../../../data/cityVehicleMapping";

interface CityDisplayProps {
  uniqueCities: string[];
}

const CityDisplay: React.FC<CityDisplayProps> = ({ uniqueCities }) => {
  if (uniqueCities.length === 0) return null;
  
  return (
    <div>
      <Label>CITIES:</Label>
      <div className="flex flex-wrap gap-1 mt-1">
        {uniqueCities.map(city => {
          const recommendedVehicle = cityVehicleMapping[city]?.[0];
          return (
            <Badge key={city} className="px-2 py-1 mb-1">
              {city} {recommendedVehicle && ` → ${recommendedVehicle}`}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default CityDisplay;

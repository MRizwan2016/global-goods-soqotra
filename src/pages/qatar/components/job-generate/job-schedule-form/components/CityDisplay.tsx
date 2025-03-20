
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cityVehicleMapping } from "../../../../data/cityVehicleMapping";
import { MapPin } from "lucide-react";

interface CityDisplayProps {
  uniqueCities: string[];
}

const CityDisplay: React.FC<CityDisplayProps> = ({ uniqueCities }) => {
  if (uniqueCities.length === 0) return null;
  
  return (
    <div>
      <Label className="font-bold block mb-2">CITIES/LOCATIONS:</Label>
      <div className="flex flex-wrap gap-1 mt-1">
        {uniqueCities.map(city => {
          const recommendedVehicle = cityVehicleMapping[city]?.[0];
          let color = "bg-gray-100";
          
          // Color-code badges based on vehicle
          if (recommendedVehicle === "41067") color = "bg-blue-100 text-blue-800";
          else if (recommendedVehicle === "41073") color = "bg-green-100 text-green-800";
          else if (recommendedVehicle === "514005") color = "bg-amber-100 text-amber-800";
          else if (recommendedVehicle === "119927") color = "bg-purple-100 text-purple-800";
          else if (recommendedVehicle === "74827") color = "bg-red-100 text-red-800";
          else if (recommendedVehicle === "41070") color = "bg-teal-100 text-teal-800";
          
          return (
            <Badge key={city} className={`px-2 py-1 mb-1 ${color}`}>
              <MapPin className="h-3 w-3 mr-1 inline" />
              {city} {recommendedVehicle && <span className="text-xs ml-1">→ {recommendedVehicle}</span>}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default CityDisplay;

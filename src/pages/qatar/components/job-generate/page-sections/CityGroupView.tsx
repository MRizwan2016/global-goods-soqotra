
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QatarJob } from "../../../types/jobTypes";

interface CityGroupViewProps {
  showCityView: boolean;
  toggleCityView: () => void;
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
  jobsByCity: Record<string, QatarJob[]>;
  cityNames: string[];
}

const CityGroupView: React.FC<CityGroupViewProps> = ({
  showCityView,
  toggleCityView,
  selectedCity,
  setSelectedCity,
  jobsByCity,
  cityNames,
}) => {
  return (
    <>
      <Button 
        onClick={toggleCityView}
        variant="outline"
        className={showCityView ? "bg-blue-50" : ""}
      >
        <MapPin className="mr-2 h-4 w-4" />
        {showCityView ? "Show All Jobs" : "Group by City"}
      </Button>
      
      {/* City Selection */}
      {showCityView && (
        <div className="flex-1 p-4 border rounded-md bg-gray-50">
          <h3 className="font-bold mb-2">Select City:</h3>
          <div className="flex flex-wrap gap-2">
            {cityNames.length > 0 ? (
              cityNames.map(city => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  onClick={() => setSelectedCity(city)}
                  className="mb-2"
                  size="sm"
                >
                  {city} ({jobsByCity[city].length} jobs)
                  {city === 'DOH' && <Badge className="ml-2 bg-blue-600">Truck: 41067</Badge>}
                  {city === 'RAK' && <Badge className="ml-2 bg-green-600">Truck: 41070</Badge>}
                  {city === 'WAK' && <Badge className="ml-2 bg-amber-600">Truck: 41073</Badge>}
                </Button>
              ))
            ) : (
              <p>No cities assigned to selected jobs</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CityGroupView;

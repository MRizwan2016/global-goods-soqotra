
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QatarJob } from "../../types/jobTypes";
import { cityVehicleMapping } from "../../data/cityVehicleMapping";
import { groupBy } from "lodash";

interface CitySelectionProps {
  jobsByCity: Record<string, QatarJob[]>;
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
}

const CitySelection: React.FC<CitySelectionProps> = ({ 
  jobsByCity, 
  selectedCity, 
  setSelectedCity 
}) => {
  const cityNames = Object.keys(jobsByCity).filter(c => c);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Select City:</h3>
      <div className="flex flex-wrap gap-2">
        {cityNames.length > 0 ? (
          cityNames.map(city => {
            const recommendedVehicle = cityVehicleMapping[city]?.[0];
            return (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                onClick={() => setSelectedCity(city)}
                className="mb-2"
              >
                {city} ({jobsByCity[city].length} jobs)
                {recommendedVehicle && (
                  <Badge className="ml-2">Truck: {recommendedVehicle}</Badge>
                )}
              </Button>
            );
          })
        ) : (
          <p>No cities with assigned jobs found</p>
        )}
      </div>
    </div>
  );
};

export default CitySelection;

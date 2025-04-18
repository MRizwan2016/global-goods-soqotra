
import { Scale, Box, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CargoTabProps {
  cargoDetails: {
    weight: string;
    volume: string;
    packages: string;
    description: string;
  };
  isDoorToDoor: boolean;
}

const CargoTab = ({ cargoDetails, isDoorToDoor }: CargoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Cargo Measurements</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="flex justify-center mb-2">
                  <Scale className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-sm font-medium">Weight</div>
                <div className="text-lg font-bold">{cargoDetails.weight} kg</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="flex justify-center mb-2">
                  <Box className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-sm font-medium">Volume</div>
                <div className="text-lg font-bold">{cargoDetails.volume} m³</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="flex justify-center mb-2">
                  <Package className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-sm font-medium">Packages</div>
                <div className="text-lg font-bold">{cargoDetails.packages}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Cargo Description</h4>
            <div className="border border-gray-200 rounded-md p-4">
              <p className="text-sm">{cargoDetails.description}</p>
            </div>
            
            <h4 className="text-sm font-medium mb-2 mt-4">Special Instructions</h4>
            <div className="border border-gray-200 rounded-md p-4">
              <p className="text-sm italic text-gray-500">
                {isDoorToDoor 
                  ? "This is a door-to-door delivery. Please ensure proper coordination with the receiver."
                  : "This is a warehouse pickup delivery. Customer will pick up from the destination warehouse."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoTab;

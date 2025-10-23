
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TunisiaMapInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tunisia Geographic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-52 bg-blue-50 rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Tunisia_relief_location_map.jpg/800px-Tunisia_relief_location_map.jpg" 
                alt="Map of Tunisia" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Key Geographic Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><span className="font-medium">Location:</span> Northern Africa, bordering the Mediterranean Sea, between Algeria and Libya</li>
              <li><span className="font-medium">Area:</span> 163,610 sq km</li>
              <li><span className="font-medium">Coastline:</span> 1,148 km along the Mediterranean Sea</li>
              <li><span className="font-medium">Major Ports:</span> Tunis, Rades, Sfax, Bizerte, Gabès, Skhira</li>
              <li><span className="font-medium">Distance from Doha:</span> Approximately 3,600 km</li>
              <li><span className="font-medium">Shipping Duration:</span> 14-21 days by sea from Qatar</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TunisiaMapInfo;

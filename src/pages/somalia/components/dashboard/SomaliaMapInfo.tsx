
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SomaliaMapInfo: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-[#1e2a3a]">Somalia Geographic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-52 bg-[#3b5998]/5 rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Somalia_map.png/800px-Somalia_map.png" 
                alt="Map of Somalia" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[#1e2a3a]">Key Geographic Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><span className="font-medium">Location:</span> Eastern Africa, bordering the Gulf of Aden and the Indian Ocean</li>
              <li><span className="font-medium">Area:</span> 637,657 sq km</li>
              <li><span className="font-medium">Coastline:</span> 3,025 km - longest coastline in mainland Africa</li>
              <li><span className="font-medium">Major Ports:</span> Mogadishu, Berbera, Kismayo, Bosaso</li>
              <li><span className="font-medium">Major Regions:</span> Somaliland, Puntland, South-Central Somalia</li>
              <li><span className="font-medium">Shipping Duration:</span> 10-14 days by sea from the Middle East</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SomaliaMapInfo;

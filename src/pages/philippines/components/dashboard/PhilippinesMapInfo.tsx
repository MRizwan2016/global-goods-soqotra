
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PhilippinesMapInfo: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-[#1e2a3a]">Philippines Geographic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-52 bg-[#3b5998]/5 rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Philippines_location_map.svg/1200px-Philippines_location_map.svg.png" 
                alt="Map of Philippines" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[#1e2a3a]">Key Geographic Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><span className="font-medium">Location:</span> Southeastern Asia, archipelago between the Philippine Sea and the South China Sea</li>
              <li><span className="font-medium">Area:</span> 300,000 sq km</li>
              <li><span className="font-medium">Islands:</span> 7,641 islands, of which about 2,000 are inhabited</li>
              <li><span className="font-medium">Major Islands:</span> Luzon, Mindanao, Visayas, Palawan</li>
              <li><span className="font-medium">Major Ports:</span> Manila, Cebu, Davao, Subic Bay, Batangas</li>
              <li><span className="font-medium">Shipping Duration:</span> 14-21 days by sea from Middle East</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhilippinesMapInfo;

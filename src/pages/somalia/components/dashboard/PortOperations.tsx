
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PortOperations: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Somalia Port Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">
            Somalia's strategic location on the Horn of Africa makes it an important gateway for trade between the Middle East, Africa, and beyond.
            Our operations cover the major ports in Somalia, providing comprehensive logistics solutions.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Mogadishu Port</h3>
              <p className="text-sm text-gray-700">Somalia's largest port, handling over 60% of the country's maritime trade. We provide full-service logistics operations with dedicated container facilities.</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Berbera Port</h3>
              <p className="text-sm text-gray-700">A major deep-water port serving Somaliland, with significant investment in infrastructure and a growing role in regional trade.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Kismayo Port</h3>
              <p className="text-sm text-gray-700">Located in southern Somalia, this port specializes in handling livestock exports and general cargo, with expanding operations.</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Bosaso Port</h3>
              <p className="text-sm text-gray-700">Serving northeastern Somalia (Puntland), Bosaso is an important hub for Gulf of Aden trade and connects to the Middle East.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortOperations;

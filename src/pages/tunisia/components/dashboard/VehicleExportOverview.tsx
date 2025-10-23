
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VehicleExportOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tunisia Vehicle Export Market</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">
            Tunisia represents a key market in North Africa for vehicle exports, particularly for SUVs and sedans from Qatar. 
            The strategic ports of Tunis and Rades serve as primary entry points for imported vehicles.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">SUV Exports</h3>
              <p className="text-sm text-gray-700">64% of vehicle exports to Tunisia comprise SUVs, with Toyota Land Cruiser, Nissan Patrol, and Toyota Fortuner being the most popular models.</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Sedan Exports</h3>
              <p className="text-sm text-gray-700">36% of vehicle exports to Tunisia are sedans, with Toyota Camry, Honda Accord, and Hyundai Sonata experiencing strong demand.</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Market Growth</h3>
            <p className="text-sm text-gray-700">
              The Tunisian vehicle import market has grown by 18% year-over-year, with particularly strong demand for newer model years with lower fuel consumption. Our specialized vehicle export services include comprehensive documentation, vehicle preparation, secure lashing for sea transport, and customs clearance assistance.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleExportOverview;

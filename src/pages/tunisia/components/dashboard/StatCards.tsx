
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck, Ship, Map } from "lucide-react";

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
            <Car size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">Vehicles Exported</p>
            <h3 className="text-2xl font-bold text-blue-900">3,847</h3>
            <p className="text-xs text-blue-600">+12% from last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-green-700">SUVs in Transit</p>
            <h3 className="text-2xl font-bold text-green-900">132</h3>
            <p className="text-xs text-green-600">Arriving in 5 days</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-500 text-white p-3 rounded-lg mr-4">
            <Ship size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-700">Port Operations</p>
            <h3 className="text-2xl font-bold text-amber-900">2</h3>
            <p className="text-xs text-amber-600">Tunis & Rades Ports</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-500 text-white p-3 rounded-lg mr-4">
            <Map size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-700">Active Routes</p>
            <h3 className="text-2xl font-bold text-purple-900">7</h3>
            <p className="text-xs text-purple-600">From Doha, Qatar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;

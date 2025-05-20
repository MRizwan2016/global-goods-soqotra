
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Ship } from "lucide-react";

const ShippingRoutesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="flex items-center text-lg font-semibold mb-3 text-blue-800">
          <Ship className="mr-2 h-5 w-5" />
          Active Shipping Routes to Tunisia
        </h3>
        <p className="text-gray-700 mb-4">
          Our primary shipping routes connect Doha, Qatar with Tunisia's two major ports: Tunis and Rades.
          These routes offer regular scheduled departures and specialized RoRo (Roll-on/Roll-off) services
          ideal for vehicle exports.
        </p>
        
        <div className="relative h-64 bg-white rounded-lg overflow-hidden mb-4 border border-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1566288623394-377af472d81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
              alt="Shipping route map" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Doha to Tunis Port</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Distance:</span> 3,580 km
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Transit Time:</span> 14-16 days
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Frequency:</span> Bi-weekly departures
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Vessel Types:</span> RoRo and container vessels
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Port Features:</span> Modern RoRo facilities, dedicated vehicle handling area
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800">Doha to Rades Port</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Distance:</span> 3,610 km
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Transit Time:</span> 16-21 days
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Frequency:</span> Weekly departures
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Vessel Types:</span> RoRo, container, and multi-purpose vessels
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">•</span>
                <div>
                  <span className="font-medium">Port Features:</span> Largest commercial port in Tunisia, efficient customs processing
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Schedule</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vessel Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Arabian Star</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Doha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tunis Port</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 25, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 10, 2023</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Gulf Express</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Doha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rades Port</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 2, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 18, 2023</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Doha Voyager</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Doha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tunis Port</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 8, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 24, 2023</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mediterranean Queen</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Doha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rades Port</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 16, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">July 5, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingRoutesTab;

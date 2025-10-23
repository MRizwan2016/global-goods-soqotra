
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck } from "lucide-react";

const TunisiaOperationsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Car className="mr-2 h-5 w-5 text-blue-600" />
              Vehicle Export Process
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">1</span>
                <span>Vehicle inspection and documentation at Doha facility</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">2</span>
                <span>Pre-shipment cleaning and preparation</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">3</span>
                <span>Transportation to Doha port</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">4</span>
                <span>Vehicle lashing and securing for sea transport</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">5</span>
                <span>Shipping to Tunis or Rades port (14-21 days)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">6</span>
                <span>Customs clearance at Tunisia port</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">7</span>
                <span>Final delivery to client location</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Truck className="mr-2 h-5 w-5 text-green-600" />
              Our Services
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-1">Comprehensive Documentation</h4>
                <p className="text-sm text-gray-700">Complete export documentation including bill of lading, commercial invoice, packing list, and certificates of origin.</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-1">Secure Vehicle Transport</h4>
                <p className="text-sm text-gray-700">Professional lashing and securing services to ensure damage-free transport of high-value vehicles.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-1">Customs Clearance</h4>
                <p className="text-sm text-gray-700">Experienced customs brokers to handle all Tunisian import requirements and documentation.</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-1">Door-to-Door Service</h4>
                <p className="text-sm text-gray-700">Complete logistics solution from Qatar pickup to final delivery in Tunisia.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vehicle Export Statistics</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Models</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SUVs</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">124 units</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Land Cruiser, Patrol, Fortuner</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+18% YoY</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sedans</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">78 units</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Camry, Accord, Sonata</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+12% YoY</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luxury</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28 units</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lexus, BMW, Mercedes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+22% YoY</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Commercial</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 units</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hilux, H1, Sprinter</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+8% YoY</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TunisiaOperationsTab;

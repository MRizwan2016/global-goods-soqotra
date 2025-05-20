
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const CustomsClearanceTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="flex items-center text-lg font-semibold mb-3 text-amber-800">
          <FileText className="mr-2 h-5 w-5" />
          Tunisia Customs Information
        </h3>
        <p className="text-gray-700 mb-4">
          Our team of experts handles all aspects of customs clearance for vehicles imported into Tunisia.
          We ensure compliance with local regulations and expedite the clearance process to minimize delays.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-amber-800">Required Documentation</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">1</span>
                <div>
                  <span className="font-medium">Original Bill of Lading:</span> For proof of shipping and ownership
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">2</span>
                <div>
                  <span className="font-medium">Commercial Invoice:</span> Detailing vehicle value and transaction details
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">3</span>
                <div>
                  <span className="font-medium">Certificate of Origin:</span> Proving the origin country of the vehicle
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">4</span>
                <div>
                  <span className="font-medium">Vehicle Title:</span> Original title document for the vehicle
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">5</span>
                <div>
                  <span className="font-medium">Packing List:</span> Detailing the vehicle specifications and any additional items
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full h-6 w-6 mr-2 flex-shrink-0 text-sm font-medium">6</span>
                <div>
                  <span className="font-medium">Technical Inspection Report:</span> For compliance with Tunisian standards
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Customs Process Timeline</h3>
            <div className="space-y-4">
              <div className="relative pl-8 pb-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-blue-200">
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">1</div>
                <h4 className="font-medium text-blue-800 mb-1">Pre-Arrival Documentation</h4>
                <p className="text-sm text-gray-700">Submit all required documents 3-5 days before vessel arrival</p>
              </div>
              
              <div className="relative pl-8 pb-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-blue-200">
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">2</div>
                <h4 className="font-medium text-blue-800 mb-1">Vessel Arrival</h4>
                <p className="text-sm text-gray-700">Notification received and customs broker engaged</p>
              </div>
              
              <div className="relative pl-8 pb-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-blue-200">
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">3</div>
                <h4 className="font-medium text-blue-800 mb-1">Customs Declaration</h4>
                <p className="text-sm text-gray-700">Filing of import declaration with Tunisian customs</p>
              </div>
              
              <div className="relative pl-8 pb-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-blue-200">
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">4</div>
                <h4 className="font-medium text-blue-800 mb-1">Physical Inspection</h4>
                <p className="text-sm text-gray-700">Vehicle inspection by customs officials (1-2 days)</p>
              </div>
              
              <div className="relative pl-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-blue-200">
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">5</div>
                <h4 className="font-medium text-blue-800 mb-1">Duties Payment & Release</h4>
                <p className="text-sm text-gray-700">Payment of customs duties and final release (1-2 days)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Import Duties & Taxes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Import Duty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Fees</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Passenger Cars (Sedans)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30% of value</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Registration fee: 5%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SUVs</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35% of value</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Luxury tax: 10-15%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luxury Vehicles</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40% of value</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Luxury tax: 20-30%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Commercial Vehicles</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25% of value</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Commercial usage fee: 3%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Note: Duties and taxes are subject to change. Our customs team provides up-to-date information for each shipment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomsClearanceTab;

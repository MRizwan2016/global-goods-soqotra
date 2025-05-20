
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ArrowRight, Phone, MapPin, Ship, Truck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { sriLankaShipmentData } from "@/data/mockData";

import StatCards from "./components/dashboard/StatCards";
import DeliveryCharts from "./components/dashboard/DeliveryCharts";
import ImageGallery from "./components/dashboard/ImageGallery";

const SriLankaDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  
  return (
    <Layout title="Sri Lanka Operations">
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Sri Lanka Operations</h1>
            <p className="text-gray-600">
              Central hub for all Sri Lanka-related logistics operations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip content="Contact Sri Lanka Office">
              <Link 
                to="#" 
                className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Phone size={20} />
              </Link>
            </Tooltip>
            <Tooltip content="View Locations">
              <Link 
                to="#" 
                className="p-2 bg-green-50 rounded-full text-green-600 hover:bg-green-100 transition-colors"
              >
                <MapPin size={20} />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatCards />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Country Overview</h2>
              <div className="flex flex-col gap-4">
                <p>
                  Sri Lanka, officially the Democratic Socialist Republic of Sri Lanka, is an island nation in South Asia. 
                  It is situated in the Indian Ocean, southwest of the Bay of Bengal, and southeast of the Arabian Sea.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Ship className="text-blue-600" size={18} />
                    <span className="font-medium">Main Ports:</span> Colombo, Hambantota, Trincomalee
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Truck className="text-green-600" size={18} />
                    <span className="font-medium">Major Logistics Hubs:</span> Colombo, Kandy, Galle
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FileText className="text-amber-600" size={18} />
                    <span className="font-medium">Customs Documentation:</span> Electronic submission required
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className="text-lg font-medium mb-2">Key Operational Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Currency: Sri Lankan Rupee (LKR)</li>
                    <li>Business Hours: Monday-Friday, 8:30 AM - 5:00 PM</li>
                    <li>Major Trade Partners: India, China, UAE, USA, UK</li>
                    <li>Main Exports: Textiles, tea, spices, rubber, gems</li>
                    <li>Import Regulations: Strict documentation requirements for all shipments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ImageGallery />
        </div>
      </div>
      
      {/* Shipment Charts */}
      <div className="mb-6">
        <DeliveryCharts />
      </div>
      
      {/* Tabs Section */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b rounded-none p-0 h-auto">
              <TabsTrigger 
                value="overview" 
                className="flex-1 rounded-none border-r data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-b-transparent py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="deliveries" 
                className="flex-1 rounded-none border-r data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-b-transparent py-3"
              >
                Deliveries
              </TabsTrigger>
              <TabsTrigger 
                value="warehouses" 
                className="flex-1 rounded-none border-r data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-b-transparent py-3"
              >
                Warehouses
              </TabsTrigger>
              <TabsTrigger 
                value="carriers" 
                className="flex-1 rounded-none border-r data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-b-transparent py-3"
              >
                Carriers
              </TabsTrigger>
              <TabsTrigger 
                value="customs" 
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-b-transparent py-3"
              >
                Customs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-6">
              <h3 className="text-xl font-semibold mb-4">Sri Lanka Operations Overview</h3>
              <p className="mb-4">
                Our Sri Lanka operations focus on efficient cargo handling through our network of warehouses and
                logistics partners across the country. We handle both import and export operations, with special
                expertise in textiles, tea, spices, and electronics shipments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-2">Import Operations</h4>
                  <p className="text-gray-600 mb-2">
                    We specialize in handling imports into Sri Lanka with efficient customs clearance and last-mile delivery.
                  </p>
                  <Link to="#" className="text-blue-600 flex items-center hover:underline text-sm font-medium">
                    View import procedures <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-2">Export Operations</h4>
                  <p className="text-gray-600 mb-2">
                    Our export services include documentation, packaging, container loading, and freight forwarding.
                  </p>
                  <Link to="#" className="text-blue-600 flex items-center hover:underline text-sm font-medium">
                    View export procedures <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deliveries" className="p-6">
              <h3 className="text-xl font-semibold mb-4">Delivery Operations</h3>
              <p className="mb-4">
                Our delivery network in Sri Lanka covers all major cities and regions, with specialized services
                for different cargo types and delivery urgencies.
              </p>
              <div className="border rounded-md p-4 mb-4">
                <h4 className="font-medium text-lg mb-2">Current Deliveries</h4>
                <p className="text-gray-600">
                  Track and manage ongoing deliveries across Sri Lanka
                </p>
                <div className="mt-3">
                  <Link to="#" className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors inline-flex items-center">
                    View active deliveries <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-lg mb-2">Delivery Analytics</h4>
                <p className="text-gray-600">
                  Performance metrics and statistics for Sri Lanka delivery operations
                </p>
                <div className="mt-3">
                  <Link to="#" className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-100 transition-colors inline-flex items-center">
                    View analytics <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="warehouses" className="p-6">
              <h3 className="text-xl font-semibold mb-4">Warehouse Network</h3>
              <p className="mb-4">
                We operate multiple warehouses across Sri Lanka to ensure efficient cargo handling and storage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-1">Colombo Central</h4>
                  <p className="text-gray-500 text-sm mb-2">Main Warehouse</p>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <span>123 Port Access Road, Colombo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-gray-400 mt-0.5" />
                      <span>+94 11 2456789</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-1">Kandy Distribution</h4>
                  <p className="text-gray-500 text-sm mb-2">Regional Hub</p>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <span>45 Industrial Zone, Kandy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-gray-400 mt-0.5" />
                      <span>+94 81 2345678</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-1">Galle Port Facility</h4>
                  <p className="text-gray-500 text-sm mb-2">Port Operations</p>
                  <div className="text-gray-600 text-sm space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <span>78 Harbor Road, Galle</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-gray-400 mt-0.5" />
                      <span>+94 91 2345678</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="carriers" className="p-6">
              <h3 className="text-xl font-semibold mb-4">Carrier Partners</h3>
              <p className="mb-4">
                We work with reliable carrier partners to ensure smooth operations in Sri Lanka.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carrier Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service Areas
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Lanka Logistics</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Road Transport</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">All Regions</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        +94 11 2345678
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Ceylon Express</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Last Mile Delivery</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Urban Areas</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        +94 11 3456789
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Island Freight</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Heavy Cargo</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Industrial Zones</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        +94 11 4567890
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="customs" className="p-6">
              <h3 className="text-xl font-semibold mb-4">Customs Information</h3>
              <p className="mb-4">
                Important information about customs procedures and documentation requirements for Sri Lanka.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-2">Documentation Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Commercial Invoice (original and 3 copies)</li>
                    <li>Packing List (original and 3 copies)</li>
                    <li>Bill of Lading/Airway Bill</li>
                    <li>Certificate of Origin</li>
                    <li>Import License (for restricted items)</li>
                    <li>SLTB Approval (for textile imports)</li>
                  </ul>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium text-lg mb-2">Customs Process</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Submit electronic declaration via ASYCUDA system</li>
                    <li>Pay applicable duties and taxes</li>
                    <li>Document verification by customs officer</li>
                    <li>Physical inspection (if required)</li>
                    <li>Release approval</li>
                    <li>Cargo clearance and delivery</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SriLankaDashboard;

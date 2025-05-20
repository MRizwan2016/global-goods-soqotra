
import React from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Map, Flag, Users, MapPin } from "lucide-react";

const UgandaDashboard = () => {
  return (
    <Layout title="Uganda Dashboard">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <BackButton to="/" />
            <h1 className="text-2xl font-bold mt-2">Uganda Operations Dashboard</h1>
            <p className="text-gray-600">Overview of shipping and logistics in Uganda</p>
          </div>
        </div>
        
        {/* Country overview section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Flag className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-semibold">About Uganda</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Uganda is a landlocked country in East Africa, bordered by Kenya, South Sudan, Democratic Republic of the Congo, Rwanda, and Tanzania. 
                  The country has a population of approximately 45 million people and its capital is Kampala.
                </p>
                <p className="text-gray-700 mb-4">
                  Uganda's economy is primarily based on agriculture, with coffee being one of its main export crops. The logistics sector 
                  is growing with increasing trade volumes through major corridors connecting to Kenya and Tanzania for sea access.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 mx-auto text-amber-600 mb-2" />
                    <p className="font-medium">Capital</p>
                    <p className="text-sm text-gray-600">Kampala</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 mx-auto text-blue-600 mb-2" />
                    <p className="font-medium">Population</p>
                    <p className="text-sm text-gray-600">~45 million</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Globe className="h-5 w-5 mx-auto text-green-600 mb-2" />
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-gray-600">English & Swahili</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Map className="h-5 w-5 mx-auto text-purple-600 mb-2" />
                    <p className="font-medium">Area</p>
                    <p className="text-sm text-gray-600">241,037 km²</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold">Shipping Routes</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Uganda relies on two main transit corridors for international trade:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
                  <li><span className="font-medium">Northern Corridor:</span> Connects Uganda through Kenya to the Port of Mombasa</li>
                  <li><span className="font-medium">Central Corridor:</span> Links Uganda through Tanzania to the Port of Dar es Salaam</li>
                </ul>
                <p className="text-gray-700">
                  Our operations prioritize efficient handling along both corridors, with main distribution centers in 
                  Kampala, Jinja, and Entebbe for faster domestic delivery.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Monthly Deliveries</span>
                      <span className="text-sm font-medium">152</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">On-Time Rate</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Customer Satisfaction</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Coverage</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" 
                  alt="Uganda landscape" 
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Northern Uganda</h3>
                  <p className="text-sm text-gray-600">Key transit routes and agricultural regions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Uganda image gallery */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Uganda Picture Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                alt="Uganda wildlife" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d" 
                alt="Uganda savannah" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a" 
                alt="Uganda landscape" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Uganda operations tabs */}
        <div>
          <Tabs defaultValue="deliveries" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
              <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
              <TabsTrigger value="carriers">Carriers</TabsTrigger>
              <TabsTrigger value="customs">Customs Clearance</TabsTrigger>
            </TabsList>
            <TabsContent value="deliveries" className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Delivery Operations</h3>
              <p className="text-gray-700 mb-3">
                Our Uganda delivery network covers all major cities and towns, with specialized routes for remote areas.
                We maintain a fleet of 28 vehicles operating across the country, with real-time tracking and optimized routing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-xl text-blue-600">86%</p>
                  <p className="text-sm text-gray-600">Urban Coverage</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-xl text-green-600">64%</p>
                  <p className="text-sm text-gray-600">Rural Coverage</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-xl text-amber-600">28</p>
                  <p className="text-sm text-gray-600">Delivery Vehicles</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-xl text-purple-600">42</p>
                  <p className="text-sm text-gray-600">Staff Members</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="warehouses" className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Warehouse Facilities</h3>
              <p className="text-gray-700 mb-3">
                We operate strategic warehousing facilities in Kampala, Entebbe, and Jinja, with a combined capacity of over 
                12,000 square meters for storage and distribution operations.
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Location</th>
                      <th className="py-2 px-4 text-left">Size (sqm)</th>
                      <th className="py-2 px-4 text-left">Staff</th>
                      <th className="py-2 px-4 text-left">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-t">Kampala Central</td>
                      <td className="py-2 px-4 border-t">6,500</td>
                      <td className="py-2 px-4 border-t">24</td>
                      <td className="py-2 px-4 border-t">82%</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-t">Entebbe Airport</td>
                      <td className="py-2 px-4 border-t">2,800</td>
                      <td className="py-2 px-4 border-t">12</td>
                      <td className="py-2 px-4 border-t">74%</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-t">Jinja Industrial</td>
                      <td className="py-2 px-4 border-t">3,200</td>
                      <td className="py-2 px-4 border-t">16</td>
                      <td className="py-2 px-4 border-t">68%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="carriers" className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Carrier Partners</h3>
              <p className="text-gray-700 mb-3">
                We collaborate with local and regional carriers for enhanced coverage and specialized delivery needs across Uganda.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Transeast Uganda Ltd.</p>
                  <p className="text-sm text-gray-600">National coverage with 42 vehicles</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Regional Movers Co.</p>
                  <p className="text-sm text-gray-600">Specialized in Northern Uganda</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Swift Courier Services</p>
                  <p className="text-sm text-gray-600">Urban deliveries and express options</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Lake Victoria Logistics</p>
                  <p className="text-sm text-gray-600">Coverage for lake region and islands</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Kampala Urban Deliveries</p>
                  <p className="text-sm text-gray-600">Metropolitan Kampala region</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Rwenzori Mountain Transport</p>
                  <p className="text-sm text-gray-600">Western Uganda and mountain regions</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="customs" className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Customs Clearance Information</h3>
              <p className="text-gray-700 mb-3">
                We provide comprehensive customs clearance services at all major Ugandan border posts and the Entebbe International Airport.
              </p>
              <div className="space-y-4 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Documentation Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Commercial Invoice</li>
                    <li>Packing List</li>
                    <li>Bill of Lading / Air Waybill</li>
                    <li>Certificate of Origin</li>
                    <li>Import Declaration Form (IDF)</li>
                    <li>Pre-export Verification of Conformity (PVoC)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Key Border Posts</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Malaba (Uganda-Kenya)</li>
                    <li>Busia (Uganda-Kenya)</li>
                    <li>Mutukula (Uganda-Tanzania)</li>
                    <li>Katuna (Uganda-Rwanda)</li>
                    <li>Entebbe International Airport</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Average Clearance Times</h4>
                  <p className="text-sm text-gray-700">
                    Standard clearance: 2-3 working days<br />
                    Express clearance: 24 hours (additional fees apply)<br />
                    Airport shipments: 1-2 working days
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default UgandaDashboard;

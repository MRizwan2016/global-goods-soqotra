
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { FileText, Filter, Printer, Ship } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import mockContainers from "./data/mockContainers";
import { mockVesselData } from "./components/vessel-management/mockVesselData";

const CargoManifest: React.FC = () => {
  const [activeTab, setActiveTab] = useState("container");
  const [country, setCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  
  // Filter containers based on search and country
  const filteredContainers = mockContainers.filter(container => {
    const matchesSearch = searchQuery.trim() === "" || 
      container.containerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (container.runningNumber && container.runningNumber.toString().includes(searchQuery));
      
    const matchesCountry = country === "all" || container.sector === country;
    
    return matchesSearch && matchesCountry && container.status === "CONFIRMED";
  });
  
  // Get vessels with confirmed manifests
  const vesselsWithManifests = mockVesselData.filter(vessel => 
    vessel.status === "LOADED" || vessel.status === "SAILED" || vessel.status === "ARRIVED"
  );
  
  // Filter vessels based on search and country
  const filteredVessels = vesselsWithManifests.filter(vessel => {
    const matchesSearch = searchQuery.trim() === "" || 
      vessel.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vessel.runningNumber.toString().includes(searchQuery);
      
    const matchesCountry = country === "all" || vessel.sector === country;
    
    return matchesSearch && matchesCountry;
  });
  
  const handlePrint = () => {
    // Add class to body for print styles
    document.body.classList.add('print-only-manifest');
    
    // Print the document
    window.print();
    
    // Remove class after printing
    setTimeout(() => {
      document.body.classList.remove('print-only-manifest');
    }, 500);
  };

  return (
    <Layout title="CARGO MANIFEST">
      <div className="container mx-auto py-6 animate-fade-in">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <FileText size={28} className="text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">CARGO MANIFEST TRACKING</h1>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Input
                    placeholder="Search manifests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-[200px]"
                  />
                </div>
                
                <div className="flex items-center">
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="QATAR">Qatar</SelectItem>
                      <SelectItem value="COLOMBO">Sri Lanka</SelectItem>
                      <SelectItem value="KENYA">Kenya</SelectItem>
                      <SelectItem value="INDIA">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <Select 
                    value={orientation} 
                    onValueChange={(val) => setOrientation(val as "portrait" | "landscape")}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Page orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="flex items-center gap-2" onClick={handlePrint}>
                  <Printer size={18} />
                  Print
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 mb-6 rounded-md border border-gray-200">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="container" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Filter size={18} />
                    <span>Container Manifests ({filteredContainers.length})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vessel" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Ship size={18} />
                    <span>Vessel Manifests ({filteredVessels.length})</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="container" className="print-container">
                  <div className="overflow-x-auto border rounded-md">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="p-3 text-left font-semibold">Container #</th>
                          <th className="p-3 text-left font-semibold">Running #</th>
                          <th className="p-3 text-left font-semibold">Type</th>
                          <th className="p-3 text-left font-semibold">Seal #</th>
                          <th className="p-3 text-left font-semibold">Country</th>
                          <th className="p-3 text-left font-semibold">Status</th>
                          <th className="p-3 text-left font-semibold">Date</th>
                          <th className="p-3 text-left font-semibold no-print">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContainers.length > 0 ? (
                          filteredContainers.map((container) => (
                            <tr key={container.id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="p-3">{container.containerNumber}</td>
                              <td className="p-3">{container.runningNumber || 'N/A'}</td>
                              <td className="p-3">{container.containerType}</td>
                              <td className="p-3">{container.sealNumber || 'N/A'}</td>
                              <td className="p-3">{container.sector || 'N/A'}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {container.status}
                                </span>
                              </td>
                              <td className="p-3">{container.confirmDate || 'N/A'}</td>
                              <td className="p-3 no-print">
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="h-8 bg-blue-600 hover:bg-blue-700"
                                    onClick={() => {
                                      // Create and dispatch event to view manifest
                                      const event = new CustomEvent('viewContainerManifest', { 
                                        detail: { containerId: container.id } 
                                      });
                                      document.dispatchEvent(event);
                                      // Navigate to container management
                                      window.location.href = '#/qatar/containers';
                                    }}
                                  >
                                    View
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8"
                                    onClick={() => handlePrint()}
                                  >
                                    <Printer size={14} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-4 text-center text-gray-500">
                              No confirmed container manifests found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="vessel" className="print-container">
                  <div className="overflow-x-auto border rounded-md">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="p-3 text-left font-semibold">Vessel Name</th>
                          <th className="p-3 text-left font-semibold">Running #</th>
                          <th className="p-3 text-left font-semibold">Voyage</th>
                          <th className="p-3 text-left font-semibold">Country</th>
                          <th className="p-3 text-left font-semibold">ETD</th>
                          <th className="p-3 text-left font-semibold">ETA</th>
                          <th className="p-3 text-left font-semibold">Status</th>
                          <th className="p-3 text-left font-semibold no-print">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVessels.length > 0 ? (
                          filteredVessels.map((vessel) => (
                            <tr key={vessel.id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="p-3">{vessel.vesselName}</td>
                              <td className="p-3">{vessel.runningNumber}</td>
                              <td className="p-3">{vessel.voyage || 'N/A'}</td>
                              <td className="p-3">{vessel.sector}</td>
                              <td className="p-3">{vessel.etd || 'N/A'}</td>
                              <td className="p-3">{vessel.eta || 'N/A'}</td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  vessel.status === 'LOADED' ? 'bg-blue-100 text-blue-800' :
                                  vessel.status === 'SAILED' ? 'bg-purple-100 text-purple-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {vessel.status || 'NEW'}
                                </span>
                              </td>
                              <td className="p-3 no-print">
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="h-8 bg-blue-600 hover:bg-blue-700"
                                    onClick={() => {
                                      // Navigate to vessel management manifest view
                                      window.location.href = '#/qatar/vessels';
                                      
                                      // Create and dispatch a custom event to view the vessel manifest
                                      const event = new CustomEvent('viewVesselManifest', { 
                                        detail: { vesselId: vessel.id } 
                                      });
                                      document.dispatchEvent(event);
                                    }}
                                  >
                                    View
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8"
                                    onClick={() => handlePrint()}
                                  >
                                    <Printer size={14} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-4 text-center text-gray-500">
                              No vessel manifests found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Print styles */}
      <style>
        {`
          @media print {
            @page {
              size: ${orientation === "landscape" ? "landscape" : "portrait"};
              margin: 15mm;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            table, th, td {
              border: 1px solid #ddd;
            }
            
            th, td {
              padding: 8px;
              text-align: left;
            }
            
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default CargoManifest;

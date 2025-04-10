
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChartBar, FileText, Package } from 'lucide-react';

const CargoReports = () => {
  const navigate = useNavigate();
  
  return (
    <Layout title="Cargo Reports">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">CARGO REPORTS</h1>
          
          <Tabs defaultValue="invoices" className="w-full">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="invoices" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center">
                <ChartBar className="h-4 w-4 mr-2" />
                Cargo Statistics
              </TabsTrigger>
              <TabsTrigger value="shipments" className="flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Shipments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoices" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Reports</CardTitle>
                  <CardDescription>Generate and view invoice reports</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <p className="text-gray-600">Select an invoice report type below:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button className="h-auto py-6 flex flex-col" variant="outline">
                      <FileText className="h-10 w-10 mb-2" />
                      <span>Daily Invoices</span>
                    </Button>
                    <Button className="h-auto py-6 flex flex-col" variant="outline">
                      <FileText className="h-10 w-10 mb-2" />
                      <span>Monthly Invoices</span>
                    </Button>
                    <Button className="h-auto py-6 flex flex-col" variant="outline">
                      <FileText className="h-10 w-10 mb-2" />
                      <span>Custom Date Range</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="statistics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cargo Volume Statistics</CardTitle>
                  <CardDescription>Advanced analytics and statistics for cargo volume and trends</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">Key Insights Available:</h3>
                    <ul className="list-disc pl-5 text-green-700 space-y-1">
                      <li>Volume analysis by country and region</li>
                      <li>Trend analysis and forecasting</li>
                      <li>Interactive charts and visualizations</li>
                      <li>Comparative analysis across time periods</li>
                    </ul>
                  </div>
                  
                  <img 
                    src="public/lovable-uploads/2af972cf-2fdb-49a0-a8bc-8ed5571d1071.png"
                    alt="Cargo Statistics Preview"
                    className="w-full h-64 object-cover object-center rounded-lg shadow-sm border border-gray-200"
                  />
                  
                  <Button onClick={() => navigate('/reports/cargo/statistics')} className="bg-blue-600 hover:bg-blue-700">
                    View Detailed Statistics
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Details</CardTitle>
                  <CardDescription>Comprehensive view of all shipments and their status</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h3 className="font-medium text-amber-800 mb-2">Track Your Shipments:</h3>
                    <ul className="list-disc pl-5 text-amber-700 space-y-1">
                      <li>View all shipments in one place</li>
                      <li>Filter by status, destination, and more</li>
                      <li>Export reports for offline analysis</li>
                      <li>View detailed shipment information</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-100 rounded-lg p-4">
                      <h4 className="font-medium text-green-800">Delivered</h4>
                      <p className="text-2xl font-bold text-green-900 mt-2">24</p>
                    </div>
                    <div className="bg-amber-100 rounded-lg p-4">
                      <h4 className="font-medium text-amber-800">In Transit</h4>
                      <p className="text-2xl font-bold text-amber-900 mt-2">12</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800">Pending</h4>
                      <p className="text-2xl font-bold text-gray-900 mt-2">8</p>
                    </div>
                  </div>
                  
                  <Button onClick={() => navigate('/reports/cargo/shipments')} className="bg-amber-600 hover:bg-amber-700">
                    View Shipments
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </Layout>
  );
};

export default CargoReports;

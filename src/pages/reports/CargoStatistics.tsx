
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ChartBar, ChartPie, MapPin, Package, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CargoStatistics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('volume');
  const [cargoData, setCargoData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  
  useEffect(() => {
    // Load invoice data for statistics
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Process data for volume statistics
    const volumeByCountry = invoices.reduce((acc: any, invoice: any) => {
      const country = invoice.country || 'Unknown';
      const volume = parseFloat(invoice.volume) || 0;
      
      if (!acc[country]) {
        acc[country] = 0;
      }
      acc[country] += volume;
      
      return acc;
    }, {});
    
    const volumeData = Object.keys(volumeByCountry).map(country => ({
      name: country,
      volume: parseFloat(volumeByCountry[country].toFixed(2))
    }));
    
    setCargoData(volumeData);
    
    // Process data for country distribution
    const countryDistribution = invoices.reduce((acc: any, invoice: any) => {
      const country = invoice.country || 'Unknown';
      
      if (!acc[country]) {
        acc[country] = 0;
      }
      acc[country] += 1;
      
      return acc;
    }, {});
    
    const countryStats = Object.keys(countryDistribution).map(country => ({
      name: country,
      value: countryDistribution[country]
    }));
    
    setCountryData(countryStats);
    
    // Generate trend data (mock data since we don't have real dates)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const trendStats = months.map(month => ({
      name: month,
      volume: Math.floor(Math.random() * 100) + 50,
      shipments: Math.floor(Math.random() * 40) + 10
    }));
    
    setTrendData(trendStats);
  }, []);
  
  return (
    <Layout title="Cargo Statistics">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ChartBar className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Cargo Statistics</h1>
          </div>
          <Button 
            onClick={() => navigate('/reports/cargo')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm border border-blue-100"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <ChartBar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-600">Total Volume</div>
                <div className="text-2xl font-bold text-blue-800">
                  {cargoData.reduce((sum, item) => sum + item.volume, 0).toFixed(2)} m³
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm border border-green-100"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-green-600">Total Shipments</div>
                <div className="text-2xl font-bold text-green-800">
                  {countryData.reduce((sum, item) => sum + item.value, 0)}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 shadow-sm border border-purple-100"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-600">Destinations</div>
                <div className="text-2xl font-bold text-purple-800">
                  {countryData.length}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChartBar className="h-5 w-5 text-blue-600 mr-2" />
              Cargo Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="volume" className="flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  Volume by Country
                </TabsTrigger>
                <TabsTrigger value="distribution" className="flex items-center">
                  <ChartPie className="h-4 w-4 mr-2" />
                  Country Distribution
                </TabsTrigger>
                <TabsTrigger value="trends" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trends
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="volume" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cargoData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'Volume (m³)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value} m³`, 'Volume']} />
                    <Legend verticalAlign="top" />
                    <Bar dataKey="volume" name="Volume (m³)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="distribution" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {countryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} shipments`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="trends" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="volume" name="Volume (m³)" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="shipments" name="Shipments" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default CargoStatistics;

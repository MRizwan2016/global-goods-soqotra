import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Package, Search, FileDown, Truck, Filter, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Shipment {
  id: string;
  invoiceNumber: string;
  destination: string;
  consignee1: string;
  date: string;
  packages: string;
  weight: string;
  volume: string;
  status: 'In Transit' | 'Delivered' | 'Pending';
}

const Shipments = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [countries, setCountries] = useState<string[]>([]);
  
  useEffect(() => {
    // Load invoice data and convert to shipments
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Extract unique countries and ensure they are strings
    const uniqueCountries = Array.from(
      new Set(
        invoices.map((invoice: any) => invoice.destination || 'Unknown')
      )
    ).map(country => String(country));
    
    setCountries(uniqueCountries);
    
    // Generate random statuses for demo
    const statuses = ['In Transit', 'Delivered', 'Pending'];
    
    // Convert invoices to shipments
    const shipmentsData = invoices.map((invoice: any) => ({
      id: invoice.id || `ship-${Math.random().toString(36).substring(2, 9)}`,
      invoiceNumber: invoice.invoiceNumber || 'Unknown',
      destination: invoice.destination || 'Unknown',
      consignee1: invoice.consignee1 || 'Unknown',
      date: invoice.date || new Date().toISOString().split('T')[0],
      packages: invoice.packages || '0',
      weight: invoice.weight || '0',
      volume: invoice.volume || '0',
      status: statuses[Math.floor(Math.random() * statuses.length)] as 'In Transit' | 'Delivered' | 'Pending'
    }));
    
    setShipments(shipmentsData);
  }, []);
  
  // Filter shipments based on search term and filters
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.consignee1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || shipment.destination === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });
  
  const exportToCSV = () => {
    // Simple CSV export of filtered data
    const headers = ['Invoice Number', 'Destination', 'Consignee', 'Date', 'Packages', 'Weight', 'Volume', 'Status'];
    const csvData = filteredShipments.map(shipment => [
      shipment.invoiceNumber,
      shipment.destination,
      shipment.consignee1,
      shipment.date,
      shipment.packages,
      shipment.weight,
      shipment.volume,
      shipment.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'shipments_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Exported shipments data to CSV');
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Transit': return 'bg-amber-100 text-amber-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const viewDetails = (id: string) => {
    // Navigate to invoice details view
    navigate(`/data-entry/invoicing/edit/${id}`);
  };

  return (
    <Layout title="Shipment Details">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Truck className="h-6 w-6 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Shipment Details</h1>
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
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-600">Total Packages</div>
                <div className="text-2xl font-bold text-blue-800">
                  {shipments.reduce((sum, item) => sum + parseInt(item.packages || '0'), 0)}
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
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-green-600">Delivered</div>
                <div className="text-2xl font-bold text-green-800">
                  {shipments.filter(item => item.status === 'Delivered').length}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 shadow-sm border border-amber-100"
          >
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-amber-600">In Transit</div>
                <div className="text-2xl font-bold text-amber-800">
                  {shipments.filter(item => item.status === 'In Transit').length}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 text-green-600 mr-2" />
              Shipment List
            </CardTitle>
            <Button 
              onClick={exportToCSV} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by invoice number, consignee, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Status Filter</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Country Filter</label>
                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Invoice</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Destination</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Consignee</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Packages</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Weight</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 border text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment, index) => (
                      <motion.tr
                        key={shipment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 border text-sm">{shipment.invoiceNumber}</td>
                        <td className="px-4 py-3 border text-sm">{shipment.date}</td>
                        <td className="px-4 py-3 border text-sm">{shipment.destination}</td>
                        <td className="px-4 py-3 border text-sm">{shipment.consignee1}</td>
                        <td className="px-4 py-3 border text-sm">{shipment.packages}</td>
                        <td className="px-4 py-3 border text-sm">{shipment.weight} kg</td>
                        <td className="px-4 py-3 border text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 border text-sm">
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => viewDetails(shipment.id)}
                            className="h-8 px-2"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                        No shipments found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Shipments;

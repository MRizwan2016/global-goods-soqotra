
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  ArrowRight, 
  Package, 
  Truck, 
  Users, 
  DollarSign,
  Map,
  CircleAlert,
  CheckCircle
} from "lucide-react";
import { mockDeliveries } from "./data/mockDeliveryData";
import DestinationCard from "@/components/dashboard/DestinationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Delivery data stats
const getDeliveryStats = () => {
  const total = mockDeliveries.length;
  const delivered = mockDeliveries.filter(d => 
    d.deliveryStatuses.some(s => s.status === 'delivered')
  ).length;
  
  const inTransit = mockDeliveries.filter(d => 
    d.deliveryStatuses.some(s => s.status === 'in-transit') &&
    !d.deliveryStatuses.some(s => s.status === 'delivered')
  ).length;
  
  const pending = total - delivered - inTransit;
  
  return {
    total,
    delivered,
    inTransit,
    pending
  };
};

// Count cargo by county
const cargoByCounty = [
  { name: "Nairobi", value: 42 },
  { name: "Mombasa", value: 28 },
  { name: "Kisumu", value: 15 },
  { name: "Nakuru", value: 10 },
  { name: "Other", value: 5 }
];

// Monthly shipment data
const monthlyShipments = [
  { name: "Jan", shipments: 48 },
  { name: "Feb", shipments: 52 },
  { name: "Mar", shipments: 61 },
  { name: "Apr", shipments: 65 },
  { name: "May", shipments: 75 },
  { name: "Jun", shipments: 68 }
];

// Pie chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const KenyaDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    inTransit: 0,
    pending: 0
  });
  
  useEffect(() => {
    setStats(getDeliveryStats());
    setIsLoaded(true);
  }, []);

  return (
    <Layout title="Kenya Operations Dashboard">
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kenya Operations</h1>
            <p className="text-gray-500">Cargo collection and delivery management</p>
          </div>
          
          <div className="flex gap-2 mt-3 md:mt-0">
            <Link to="/kenya/deliveries">
              <Button variant="outline" className="gap-1">
                View All Deliveries
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/kenya/delivery/new">
              <Button className="gap-1 bg-green-600 hover:bg-green-700">
                New Delivery
                <Package size={16} />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package size={24} className="text-blue-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Deliveries</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle size={24} className="text-green-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <h3 className="text-2xl font-bold">{stats.delivered}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="bg-orange-100 p-3 rounded-full">
                <Truck size={24} className="text-orange-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Transit</p>
                <h3 className="text-2xl font-bold">{stats.inTransit}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="bg-yellow-100 p-3 rounded-full">
                <CircleAlert size={24} className="text-yellow-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <h3 className="text-2xl font-bold">{stats.pending}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* CFS Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Mombasa CFS</CardTitle>
              <CardDescription>Container Freight Station near Mombasa Sea Port</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">Available Space:</div>
                  <div className="font-medium">75%</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">Cargo Volume:</div>
                  <div className="font-medium">450 m³</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">Shipments Handling:</div>
                  <div className="font-medium">125 per month</div>
                </div>
                <div className="mt-4">
                  <Link to="/kenya/mombasa-cfs">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Mombasa CFS
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Nairobi CFS</CardTitle>
              <CardDescription>Inland Container Depot for Nairobi Distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">Available Space:</div>
                  <div className="font-medium">60%</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">Cargo Volume:</div>
                  <div className="font-medium">320 m³</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">Shipments Handling:</div>
                  <div className="font-medium">95 per month</div>
                </div>
                <div className="mt-4">
                  <Link to="/kenya/nairobi-cfs">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Nairobi CFS
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader>
              <CardTitle>Monthly Shipments</CardTitle>
              <CardDescription>Total cargo deliveries by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyShipments}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="shipments" fill="#0a2463" name="Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader>
              <CardTitle>Delivery Distribution</CardTitle>
              <CardDescription>Cargo distribution by county</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cargoByCounty}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {cargoByCounty.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Deliveries */}
        <Card className="shadow-sm hover:shadow transition-shadow mb-6">
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
            <CardDescription>Latest cargo deliveries in process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Invoice #</th>
                    <th className="text-left p-2">Receiver</th>
                    <th className="text-left p-2">Destination</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Payment</th>
                    <th className="text-right p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDeliveries.slice(0, 5).map(delivery => {
                    const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1];
                    return (
                      <tr key={delivery.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{delivery.invoiceNumber}</td>
                        <td className="p-2">{delivery.receiver.name}</td>
                        <td className="p-2">{delivery.deliveryLocation.county}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${latestStatus.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              latestStatus.status === 'in-transit' ? 'bg-orange-100 text-orange-800' : 
                              latestStatus.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {latestStatus.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${delivery.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                              delivery.paymentStatus === 'partial' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {delivery.paymentStatus.charAt(0).toUpperCase() + delivery.paymentStatus.slice(1)}
                          </span>
                        </td>
                        <td className="p-2 text-right">
                          <Link to={`/kenya/delivery/${delivery.id}`}>
                            <Button variant="ghost" size="sm" className="h-8">
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link to="/kenya/deliveries">
                <Button variant="outline">View All Deliveries</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default KenyaDashboard;

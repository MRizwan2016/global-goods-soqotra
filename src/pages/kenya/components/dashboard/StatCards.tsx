
import { Package, Truck, CircleAlert, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardsProps {
  stats: {
    total: number;
    delivered: number;
    inTransit: number;
    pending: number;
  }
}

const StatCards = ({ stats }: StatCardsProps) => {
  return (
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
  );
};

export default StatCards;

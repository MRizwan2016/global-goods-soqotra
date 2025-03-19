
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertTriangle, Truck } from "lucide-react";

interface StatCardsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
}

const StatCards = ({ stats }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow animate-fade-in">
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 uppercase">TOTAL JOBS</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Truck className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 uppercase">COMPLETED</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 uppercase">IN PROGRESS</p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-orange-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 uppercase">PENDING</p>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;

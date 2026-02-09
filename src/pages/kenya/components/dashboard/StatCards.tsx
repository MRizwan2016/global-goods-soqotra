
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
  const cards = [
    { label: "Total Deliveries", value: stats.total, icon: Package },
    { label: "Delivered", value: stats.delivered, icon: CheckCircle },
    { label: "In Transit", value: stats.inTransit, icon: Truck },
    { label: "Pending", value: stats.pending, icon: CircleAlert },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <Card key={i} className="shadow-sm hover:shadow transition-shadow border border-gray-200">
          <CardContent className="flex items-center p-6">
            <div className="bg-[#3b5998]/10 p-3 rounded-full">
              <card.icon size={24} className="text-[#3b5998]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <h3 className="text-2xl font-bold text-[#1e2a3a]">{card.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;

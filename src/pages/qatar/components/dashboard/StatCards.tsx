
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
  const cards = [
    { label: "TOTAL JOBS", value: stats.total, icon: Truck },
    { label: "COMPLETED", value: stats.completed, icon: CheckCircle2 },
    { label: "IN PROGRESS", value: stats.inProgress, icon: Clock },
    { label: "PENDING", value: stats.pending, icon: AlertTriangle },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <Card key={i} className="border-l-4 border-l-[#3b5998] hover:shadow-md transition-shadow animate-fade-in border border-gray-200" style={{ animationDelay: `${i * 0.1}s` }}>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 uppercase">{card.label}</p>
              <p className="text-2xl font-bold text-[#1e2a3a]">{card.value}</p>
            </div>
            <div className="bg-[#3b5998]/10 p-3 rounded-full">
              <card.icon className="h-6 w-6 text-[#3b5998]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;

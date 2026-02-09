
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Ship, Map } from "lucide-react";

const StatCards: React.FC = () => {
  const cards = [
    { label: "Total Shipments", value: "2,364", sub: "+15% from last month", icon: Package },
    { label: "Active Deliveries", value: "108", sub: "32 scheduled today", icon: Truck },
    { label: "Port Operations", value: "7", sub: "Major ports served", icon: Ship },
    { label: "Islands Covered", value: "12", sub: "Full archipelago service", icon: Map },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <Card key={i} className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="bg-[#3b5998] text-white p-3 rounded-lg mr-4">
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <h3 className="text-2xl font-bold text-[#1e2a3a]">{card.value}</h3>
              <p className="text-xs text-gray-500">{card.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;

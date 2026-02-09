
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PortOperations: React.FC = () => {
  const ports = [
    { name: "Mogadishu Port", desc: "Somalia's largest port, handling over 60% of the country's maritime trade. We provide full-service logistics operations with dedicated container facilities." },
    { name: "Berbera Port", desc: "A major deep-water port serving Somaliland, with significant investment in infrastructure and a growing role in regional trade." },
    { name: "Kismayo Port", desc: "Located in southern Somalia, this port specializes in handling livestock exports and general cargo, with expanding operations." },
    { name: "Bosaso Port", desc: "Serving northeastern Somalia (Puntland), Bosaso is an important hub for Gulf of Aden trade and connects to the Middle East." },
  ];

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-[#1e2a3a]">Somalia Port Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">
            Somalia's strategic location on the Horn of Africa makes it an important gateway for trade between the Middle East, Africa, and beyond.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {ports.map((port, i) => (
              <div key={i} className="bg-[#3b5998]/5 border border-[#3b5998]/10 rounded-lg p-4">
                <h3 className="font-semibold text-[#1e2a3a] mb-2">{port.name}</h3>
                <p className="text-sm text-gray-700">{port.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortOperations;

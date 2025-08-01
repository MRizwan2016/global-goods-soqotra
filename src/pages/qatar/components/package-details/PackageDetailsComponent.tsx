import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

interface PackageDetailsComponentProps {
  packageItems?: Array<{
    id: string;
    name: string;
    quantity: number;
    description?: string;
    packageDetails?: string;
  }>;
}

const PackageDetailsComponent: React.FC<PackageDetailsComponentProps> = ({ packageItems = [] }) => {
  // Package details template that should be permanently included
  const standardPackageDetails = [
    {
      category: "CARTON BOXES",
      items: [
        "CARTON BOX - SMALL (30x20x15 cm)",
        "CARTON BOX - MEDIUM (40x30x20 cm)", 
        "CARTON BOX - LARGE (50x40x30 cm)",
        "CARTON BOX - EXTRA LARGE (60x50x40 cm)",
        "CARTON BOX - BULILIT (20x15x10 cm)",
        "CARTON BOX - JUMBO (70x50x40 cm)",
        "CARTON BOX - SUPER JUMBO (80x60x50 cm)"
      ]
    },
    {
      category: "WOODEN BOXES",
      items: [
        "WOODEN BOX - 1 METER (100x60x60 cm)",
        "WOODEN BOX - 1.5 METER (150x80x80 cm)",
        "WOODEN BOX - 2 METER (200x100x100 cm)",
        "WOODEN BOX - 2.5 METER (250x120x120 cm)",
        "WOODEN BOX - 3 METER (300x150x150 cm)",
        "WOODEN BOX - 4 METER (400x200x200 cm)",
        "WOODEN BOX - 1.314 METER (131.4x80x80 cm)"
      ]
    },
    {
      category: "APPLIANCES & EQUIPMENT",
      items: [
        "TELEVISION (Various sizes)",
        "WASHING MACHINE (Front/Top loading)",
        "REFRIGERATOR (Single/Double door)",
        "MICROWAVE OVEN",
        "OVEN (Electric/Gas)",
        "4 BURNER (Gas stove)",
        "GYM SET (Exercise equipment)"
      ]
    },
    {
      category: "BAGS & CONTAINERS",
      items: [
        "TRAVELING BAG (Small/Medium/Large)",
        "TRAVELLING BAGS (Set)",
        "DRUM - SMALL (50L capacity)",
        "DRUM - BIG (100L capacity)",
        "STEEL BOX (Reinforced)",
        "DUVET (Bedding items)"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Package Items */}
      {packageItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Current Package Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packageItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Standard Package Details - Permanently Included */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-800">
            SOQOTRA LOGISTICS - QATAR CARGO COLLECTION & DELIVERY MANAGEMENT
          </CardTitle>
          <p className="text-sm text-gray-600">Standard Package Types & Specifications</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {standardPackageDetails.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <h3 className="font-semibold text-blue-700 border-b border-blue-200 pb-2">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Package Handling Guidelines:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• All packages are handled with care according to international standards</li>
              <li>• Fragile items require special packaging and handling fees may apply</li>
              <li>• Custom wooden boxes available for oversized items</li>
              <li>• All packages are tracked from collection to delivery</li>
              <li>• Insurance available for valuable items</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              For custom packaging requirements or special handling instructions, 
              please contact SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageDetailsComponent;
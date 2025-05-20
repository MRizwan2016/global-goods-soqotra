
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";

const VehicleTypesTab: React.FC = () => {
  const vehicleCategories = [
    {
      category: "SUVs",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      percentage: 64,
      description: "SUVs are the most popular export category to Tunisia due to their versatility and suitability for various terrains.",
      popularModels: ["Toyota Land Cruiser", "Nissan Patrol", "Toyota Fortuner", "Kia Sorento", "Hyundai Santa Fe"]
    },
    {
      category: "Sedans",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      percentage: 28,
      description: "Sedans represent the second largest category, with strong demand for mid-size and executive models.",
      popularModels: ["Toyota Camry", "Honda Accord", "Hyundai Sonata", "Kia Optima", "Nissan Altima"]
    },
    {
      category: "Luxury Vehicles",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      percentage: 6,
      description: "Luxury vehicles cater to high-end clients looking for premium brands and latest models.",
      popularModels: ["Lexus LX", "BMW X5", "Mercedes-Benz GLE", "Audi Q7", "Range Rover Sport"]
    },
    {
      category: "Commercial Vehicles",
      image: "https://images.unsplash.com/photo-1626668893630-6ff28f2629cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      percentage: 2,
      description: "Commercial vehicles include pickup trucks and vans used for business and transport purposes.",
      popularModels: ["Toyota Hilux", "Hyundai H1", "Mercedes-Benz Sprinter", "Nissan Navara", "Mitsubishi L200"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="flex items-center text-lg font-semibold mb-3 text-blue-800">
          <Car className="mr-2 h-5 w-5" />
          Vehicle Categories
        </h3>
        <p className="text-gray-700 mb-4">
          Our vehicle export services to Tunisia focus on four primary categories, with SUVs and sedans making up the vast majority of shipments.
          Each vehicle undergoes thorough inspection, preparation, and specialized handling for sea transport.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicleCategories.map((category, index) => (
          <Card key={index}>
            <div className="h-48 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.category} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{category.category}</h3>
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                  {category.percentage}% of exports
                </span>
              </div>
              <p className="text-gray-700 mb-4">{category.description}</p>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Popular Models:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {category.popularModels.map((model, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vehicle Export Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Documentation</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Vehicle title or ownership document
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Commercial invoice
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Packing list
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Certificate of origin
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Bill of lading
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Export declaration
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Vehicle Preparation</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Thorough cleaning (interior and exterior)
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Fuel level reduced to 1/4 tank
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Battery disconnection for long transits
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Removal of personal items
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Pre-shipment inspection report
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full h-5 w-5 mr-2 flex-shrink-0 text-xs font-medium">•</span>
                  Photos documenting vehicle condition
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleTypesTab;

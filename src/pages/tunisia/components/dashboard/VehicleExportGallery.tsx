
import React from "react";
import { Card } from "@/components/ui/card";

const VehicleExportGallery: React.FC = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: "Vehicle Loading at Doha Port",
      description: "SUVs lined up for loading onto cargo vessels bound for Tunisia."
    },
    {
      src: "https://images.unsplash.com/photo-1577730763318-944b9216236c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Car Lashing Process",
      description: "Vehicles properly secured with specialized lashing equipment for sea transport."
    },
    {
      src: "https://images.unsplash.com/photo-1568844293986-4cd541724ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: "Cargo Ship Loading",
      description: "RoRo vessel carrying vehicles from Qatar to Tunis Port."
    },
    {
      src: "https://images.unsplash.com/photo-1617785899222-bfef6cc6938a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
      title: "Vehicle Inspection",
      description: "Pre-shipment quality inspection of vehicles bound for Tunisia."
    },
    {
      src: "https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      title: "Rades Port Operations",
      description: "Vehicles being unloaded at Rades Port in Tunisia."
    },
    {
      src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "SUV Model Popular in Tunisia",
      description: "Toyota Land Cruiser, one of the most exported SUV models to Tunisia."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">{image.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{image.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VehicleExportGallery;

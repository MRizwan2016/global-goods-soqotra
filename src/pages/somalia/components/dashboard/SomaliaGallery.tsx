
import React from "react";
import { Card } from "@/components/ui/card";

const SomaliaGallery: React.FC = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1610373188762-53b8eedb2936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: "Mogadishu Port",
      description: "Container operations at Somalia's primary shipping port"
    },
    {
      src: "https://images.unsplash.com/photo-1637333532911-bc868ad22261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Cargo Shipment",
      description: "Cargo loading for shipment to Somalia"
    },
    {
      src: "https://images.unsplash.com/photo-1549125764-92bf87142156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Container Management",
      description: "Modern container handling at Berbera Port"
    },
    {
      src: "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
      title: "Logistics Fleet",
      description: "Local delivery and distribution vehicles"
    },
    {
      src: "https://images.unsplash.com/photo-1581922140198-9201becd3b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Warehouse Operations",
      description: "Storage and distribution centers in Mogadishu"
    },
    {
      src: "https://images.unsplash.com/photo-1606146485652-75b352ce408a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Coastal Shipping",
      description: "Specialized services along Somalia's extensive coastline"
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

export default SomaliaGallery;

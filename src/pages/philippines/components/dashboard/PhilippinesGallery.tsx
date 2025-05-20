
import React from "react";
import { Card } from "@/components/ui/card";

const PhilippinesGallery: React.FC = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      title: "Manila Port Operations",
      description: "Container loading at Manila's primary shipping port"
    },
    {
      src: "https://images.unsplash.com/photo-1588159229128-10a5781d3561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Island Logistics",
      description: "Specialized shipping services to remote Philippine islands"
    },
    {
      src: "https://images.unsplash.com/photo-1566813916511-52a032ad85a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Warehouse Facilities",
      description: "Modern warehousing and distribution centers in Cebu"
    },
    {
      src: "https://images.unsplash.com/photo-1622827855133-1ed513e27c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Cargo Processing",
      description: "Efficient cargo handling and processing systems"
    },
    {
      src: "https://images.unsplash.com/photo-1580674787267-3fa1127695a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      title: "Last Mile Delivery",
      description: "Local delivery services throughout the Philippines"
    },
    {
      src: "https://images.unsplash.com/photo-1583401495411-d2f79dc99610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Manila Skyline",
      description: "Hub of our Philippine logistics operations"
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

export default PhilippinesGallery;

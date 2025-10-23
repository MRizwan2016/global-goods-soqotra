
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// No dummy images - placeholder for actual Sri Lanka operational images
const images: { src: string; alt: string; caption: string }[] = [];

const ImageGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-4">Sri Lanka Operations</h3>
        
        <div className="relative flex-grow rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">No operational images available</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;

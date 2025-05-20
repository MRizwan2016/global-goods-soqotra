
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Image URLs from the Dropbox link would go here
// For now, using placeholder images that would be replaced with actual Sri Lanka images
const images = [
  {
    src: "https://images.unsplash.com/photo-1586028363494-a154d33f2404?q=80&w=500&auto=format&fit=crop",
    alt: "Sri Lanka Landscape",
    caption: "Tea plantations in central highlands"
  },
  {
    src: "https://images.unsplash.com/photo-1546825258-67a2127b1e86?q=80&w=500&auto=format&fit=crop",
    alt: "Colombo Port",
    caption: "Busy Colombo container terminal"
  },
  {
    src: "https://images.unsplash.com/photo-1571844405605-e0fdbebf4944?q=80&w=500&auto=format&fit=crop",
    alt: "Sri Lanka Transportation",
    caption: "Road logistics network"
  },
  {
    src: "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?q=80&w=500&auto=format&fit=crop",
    alt: "Local Market",
    caption: "Fresh produce ready for export"
  }
];

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
        
        <div className="relative flex-grow rounded-md overflow-hidden bg-gray-100">
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {images[currentIndex].caption}
          </div>
          
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;


import React from "react";
import { Button } from "@/components/ui/button";
import { Truck, MapPin } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: 'vehicle' | 'city';
  setViewMode: (mode: 'vehicle' | 'city') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={viewMode === 'vehicle' ? "default" : "outline"}
        onClick={() => setViewMode('vehicle')}
        className="flex gap-2 items-center"
      >
        <Truck size={16} />
        By Vehicle
      </Button>
      <Button
        variant={viewMode === 'city' ? "default" : "outline"}
        onClick={() => setViewMode('city')}
        className="flex gap-2 items-center"
      >
        <MapPin size={16} />
        By City
      </Button>
    </div>
  );
};

export default ViewModeToggle;

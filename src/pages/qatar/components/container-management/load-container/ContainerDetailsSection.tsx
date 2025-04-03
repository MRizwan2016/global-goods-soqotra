
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/ui/grid";
import { QatarContainer } from "../../../types/containerTypes";
import { CalendarIcon, Package, Circle } from "lucide-react";

interface ContainerDetailsSectionProps {
  container: QatarContainer;
  onContainerChange?: (updatedContainer: QatarContainer) => void;
}

const ContainerDetailsSection: React.FC<ContainerDetailsSectionProps> = ({
  container,
  onContainerChange = () => {}
}) => {
  // Format container size
  const containerSize = container.containerSize ? `${container.containerSize} FT` : "N/A";
  
  // Format ETA and ETD dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateString;
    }
  };
  
  const etaDate = formatDate(container.eta);
  const etdDate = formatDate(container.etd);
  
  // Get status color
  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "OPEN": return "text-green-600";
      case "LOADED": return "text-orange-500";
      case "CONFIRMED": return "text-blue-600";
      case "SHIPPED": return "text-purple-600";
      case "ARRIVED": return "text-teal-600";
      default: return "text-gray-500";
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2 bg-gray-50">
        <CardTitle className="text-lg font-bold flex items-center">
          <Package className="mr-2" />
          Container Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <Grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <Label className="font-bold text-gray-700">Container Number:</Label>
            <div className="mt-1 font-medium text-lg">{container.containerNumber}</div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">Container Size:</Label>
            <div className="mt-1">{containerSize}</div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">Status:</Label>
            <div className="mt-1 flex items-center">
              <Circle className={`h-3 w-3 mr-2 ${getStatusColor(container.status)} fill-current`} />
              <span className="font-medium">{container.status || "OPEN"}</span>
            </div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">Ship:</Label>
            <div className="mt-1">{container.ship || "Not assigned"}</div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">Voyage:</Label>
            <div className="mt-1">{container.voyage || "Not assigned"}</div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">Sector:</Label>
            <div className="mt-1">{container.sector || "N/A"}</div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">ETD:</Label>
            <div className="mt-1 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
              {etdDate || "Not scheduled"}
            </div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">ETA:</Label>
            <div className="mt-1 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
              {etaDate || "Not scheduled"}
            </div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700">Created Date:</Label>
            <div className="mt-1">{formatDate(container.createdDate) || "N/A"}</div>
          </div>
        </Grid>
        
        {container.description && (
          <div className="mt-2">
            <Label className="font-bold text-gray-700">Description:</Label>
            <div className="mt-1 text-gray-700">{container.description}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContainerDetailsSection;

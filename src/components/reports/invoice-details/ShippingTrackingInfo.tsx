
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship, Box, Calendar } from "lucide-react";

interface ShippingTrackingInfoProps {
  containerNo?: string;
  vesselName?: string;
  voyage?: string;
  eta?: string;
  isLoaded: boolean;
}

const ShippingTrackingInfo: React.FC<ShippingTrackingInfoProps> = ({
  containerNo,
  vesselName,
  voyage,
  eta,
  isLoaded
}) => {
  if (!isLoaded) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Cargo has not been loaded into a container yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-lg font-medium text-blue-800">
          Shipping Tracking Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <Box className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Container Number</p>
              <p className="font-medium">{containerNo || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Ship className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Vessel Name</p>
              <p className="font-medium">{vesselName || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Ship className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Voyage</p>
              <p className="font-medium">{voyage || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">ETA at Destination</p>
              <p className="font-medium">{eta || 'N/A'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingTrackingInfo;

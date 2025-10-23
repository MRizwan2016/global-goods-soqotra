import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, User, Car, Database } from "lucide-react";

interface UPBIntegrationCardProps {
  activationStatus: string;
  userName: string;
  driverName: string;
  invoiceNumber?: string;
}

const UPBIntegrationCard: React.FC<UPBIntegrationCardProps> = ({
  activationStatus,
  userName,
  driverName,
  invoiceNumber
}) => {
  const getStatusIcon = () => {
    switch (activationStatus) {
      case "ACTIVATED":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "INACTIVE":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (activationStatus) {
      case "ACTIVATED":
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">ACTIVATED</Badge>;
      case "INACTIVE":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300">INACTIVE</Badge>;
      default:
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">PENDING ACTIVATION</Badge>;
    }
  };

  return (
    <Card className="w-full border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5 text-blue-600" />
          UPB Integration Status
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Book Status:</span>
          {getStatusBadge()}
        </div>
        
        {invoiceNumber && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Invoice Number:</span>
            <span className="text-sm font-semibold text-blue-700">{invoiceNumber}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
            <User className="h-4 w-4" />
            Assigned User:
          </span>
          <span className="text-sm font-semibold text-gray-900">{userName}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
            <Car className="h-4 w-4" />
            Driver:
          </span>
          <span className="text-sm font-semibold text-gray-900">{driverName}</span>
        </div>
        
        {activationStatus === "ACTIVATED" && (
          <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-200">
            <p className="text-xs text-green-700 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Successfully connected to UPB system
            </p>
          </div>
        )}
        
        {activationStatus !== "ACTIVATED" && (
          <div className="mt-3 p-2 bg-yellow-50 rounded-md border border-yellow-200">
            <p className="text-xs text-yellow-700 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Book activation required for full UPB integration
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UPBIntegrationCard;
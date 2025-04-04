
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { ViewManifestTabProps } from "../../../types/containerTypes";

const ViewManifestTab: React.FC<ViewManifestTabProps> = ({
  container,
  printOptions,
  onPrintOptionsChange,
  onPrint,
  onClose
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-800">
            View Container Manifest - {container.containerNumber}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
              onClick={onPrint}
            >
              <Printer size={16} />
              Print Manifest
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600"
              onClick={onClose}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <section className="bg-white p-6 shadow-sm rounded-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Container Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="block text-sm font-medium text-gray-600">Container Number</span>
                <span className="mt-1 text-gray-900">{container.containerNumber}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">Status</span>
                <span className="mt-1 text-gray-900">{container.status}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">Seal Number</span>
                <span className="mt-1 text-gray-900">{container.sealNumber || "N/A"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">Confirmed Date</span>
                <span className="mt-1 text-gray-900">{container.confirmDate || "N/A"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">ETD</span>
                <span className="mt-1 text-gray-900">{container.etd || "N/A"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">ETA</span>
                <span className="mt-1 text-gray-900">{container.eta || "N/A"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">Packages</span>
                <span className="mt-1 text-gray-900">{container.packages || "0"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">Volume</span>
                <span className="mt-1 text-gray-900">{container.volume ? `${container.volume.toFixed(3)} m³` : "0.000 m³"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-600">Weight</span>
                <span className="mt-1 text-gray-900">{container.weight ? `${container.weight.toFixed(2)} kg` : "0.00 kg"}</span>
              </div>
            </div>
          </section>
          
          <section className="mt-6">
            <p className="text-center text-gray-600">
              Manifest details will be displayed here...
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewManifestTab;

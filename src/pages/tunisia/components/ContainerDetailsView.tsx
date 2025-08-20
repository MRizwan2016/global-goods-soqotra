import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, Calendar, MapPin, Hash, Lock, FileText } from "lucide-react";
import { TunisiaContainer } from "../types/tunisiaTypes";
import HouseBillOfLadingGenerator from "./HouseBillOfLadingGenerator";

interface ContainerDetailsViewProps {
  container: TunisiaContainer;
  onBack: () => void;
}

const ContainerDetailsView: React.FC<ContainerDetailsViewProps> = ({
  container,
  onBack
}) => {
  const [showHBLGenerator, setShowHBLGenerator] = useState(false);

  if (showHBLGenerator) {
    return (
      <HouseBillOfLadingGenerator
        container={container}
        onBack={() => setShowHBLGenerator(false)}
      />
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sealed Containers
          </Button>
          <Button onClick={() => setShowHBLGenerator(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Generate House Bill of Lading
          </Button>
        </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">
              Container Details: {container.containerNumber}
            </h2>
            <p className="text-muted-foreground">
              Complete loading manifest and documentation
            </p>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
          <Lock className="h-3 w-3 mr-1" />
          SEALED
        </Badge>
      </div>

      {/* Container Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Container Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Container Number</div>
                <div className="font-semibold">{container.containerNumber}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Seal Number</div>
                <div className="font-semibold">{container.sealNumber}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-semibold">{container.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Loading Date</div>
                <div className="font-semibold">{container.dateOfLoading}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Container Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Loading Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {container.loadedVehicles.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Vehicles Loaded
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {container.personalEffects.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Personal Effects
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                QAR {container.totalFreightCharge.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Vehicle Charges
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                QAR {container.totalCharge.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Charges
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loaded Vehicles */}
      {container.loadedVehicles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Loaded Vehicles ({container.loadedVehicles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {container.loadedVehicles.map((vehicle, index) => (
                <Card key={vehicle.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-green-800">
                        Vehicle {index + 1}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {vehicle.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Make/Model:</span>
                        <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Year:</span>
                        <div className="font-medium">{vehicle.year}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Color:</span>
                        <div className="font-medium">{vehicle.color}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Country:</span>
                        <div className="font-medium">{vehicle.country}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Chassis:</span>
                        <div className="font-medium text-xs">{vehicle.chassisNumber}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Plate:</span>
                        <div className="font-medium">{vehicle.plateNumber}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Engine:</span>
                        <div className="font-medium text-xs">{vehicle.engineNumber}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Export Plate:</span>
                        <div className="font-medium">{vehicle.exportPlate}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">HS Code:</span>
                        <div className="font-medium">{vehicle.hsCode}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Freight:</span>
                        <div className="font-bold text-green-600">QAR {vehicle.freightCharge}</div>
                      </div>
                    </div>

                    {/* Vehicle Photos */}
                    {vehicle.photos && vehicle.photos.length > 0 && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Photos ({vehicle.photos.length}):
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {vehicle.photos.map((photo, photoIndex) => (
                            <img
                              key={photoIndex}
                              src={photo}
                              alt={`Vehicle ${index + 1} photo ${photoIndex + 1}`}
                              className="w-full h-16 object-cover rounded border hover:scale-110 transition-transform cursor-pointer"
                              onClick={() => window.open(photo, '_blank')}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personal Effects */}
      {container.personalEffects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Effects & Household Goods ({container.personalEffects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {container.personalEffects.map((effects, index) => (
                <Card key={effects.id} className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-blue-800">
                        Effects Package {index + 1}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {effects.volume} CBM
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Description:</span>
                        <div className="font-medium">{effects.description}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <div className="font-medium">{effects.quantity}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Volume:</span>
                        <div className="font-medium">{effects.volume} CBM</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">HS Code:</span>
                        <div className="font-medium">{effects.hsCode}</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Charges:</span>
                        <div className="font-bold text-blue-600">QAR {effects.charges}</div>
                      </div>
                    </div>

                    {/* Effects Photos */}
                    {effects.photos && effects.photos.length > 0 && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Photos ({effects.photos.length}):
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {effects.photos.map((photo, photoIndex) => (
                            <img
                              key={photoIndex}
                              src={photo}
                              alt={`Effects ${index + 1} photo ${photoIndex + 1}`}
                              className="w-full h-16 object-cover rounded border hover:scale-110 transition-transform cursor-pointer"
                              onClick={() => window.open(photo, '_blank')}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContainerDetailsView;
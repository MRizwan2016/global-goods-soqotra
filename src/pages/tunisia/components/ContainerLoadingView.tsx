import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Car, Package, Lock, Truck } from "lucide-react";
import { TunisiaContainer, TunisiaVehicle, PersonalEffects } from "../types/tunisiaTypes";
import VehicleLoadingForm from "./VehicleLoadingForm";
import PersonalEffectsForm from "./PersonalEffectsForm";

interface ContainerLoadingViewProps {
  container: TunisiaContainer;
  onBack: () => void;
  onVehicleAdd: (vehicle: Omit<TunisiaVehicle, 'id'>) => void;
  onPersonalEffectsAdd: (effects: Omit<PersonalEffects, 'id'>) => void;
  onContainerSeal: () => void;
  onVehicleRemove: (vehicleId: string) => void;
  onPersonalEffectsRemove: (effectsId: string) => void;
  invoices: any[];
}

const ContainerLoadingView: React.FC<ContainerLoadingViewProps> = ({
  container,
  onBack,
  onVehicleAdd,
  onPersonalEffectsAdd,
  onContainerSeal,
  onVehicleRemove,
  onPersonalEffectsRemove,
  invoices
}) => {
  const [activeForm, setActiveForm] = useState<'none' | 'vehicle' | 'effects'>('none');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EMPTY': return 'bg-gray-100 text-gray-800';
      case 'LOADING': return 'bg-orange-100 text-orange-800';
      case 'LOADED': return 'bg-green-100 text-green-800';
      case 'SEALED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canAddVehicle = container.loadedVehicles.length < container.maxVehicles;
  const canSealContainer = container.loadedVehicles.length > 0 && container.status !== 'SEALED';

  if (activeForm === 'vehicle') {
    return (
      <VehicleLoadingForm
        onVehicleAdd={(vehicle) => {
          onVehicleAdd(vehicle);
          setActiveForm('none');
        }}
        onCancel={() => setActiveForm('none')}
        maxVehicles={container.maxVehicles}
        currentVehicleCount={container.loadedVehicles.length}
        invoices={invoices}
      />
    );
  }

  if (activeForm === 'effects') {
    return (
      <PersonalEffectsForm
        onPersonalEffectsAdd={(effects) => {
          onPersonalEffectsAdd(effects);
          setActiveForm('none');
        }}
        onCancel={() => setActiveForm('none')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-primary">
              Container: {container.containerNumber}
            </h2>
            <p className="text-muted-foreground">
              Seal: {container.sealNumber} | Type: {container.type} | Date: {container.dateOfLoading}
            </p>
          </div>
        </div>
        <Badge className={getStatusColor(container.status)}>
          {container.status}
        </Badge>
      </div>

      {/* Container Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Container Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {container.loadedVehicles.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Vehicles Loaded
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {container.personalEffects.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Personal Effects
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                QAR {container.totalFreightCharge.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Vehicle Charges
              </div>
            </div>
            <div className="text-center">
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

      {/* Action Buttons */}
      {container.status !== 'SEALED' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => setActiveForm('vehicle')}
            disabled={!canAddVehicle}
            className="h-16 text-lg"
          >
            <Car className="h-6 w-6 mr-2" />
            {canAddVehicle ? 'Load Vehicle' : 'Container Full'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveForm('effects')}
            className="h-16 text-lg"
          >
            <Package className="h-6 w-6 mr-2" />
            Add Personal Effects
          </Button>
          {canSealContainer && (
            <Button
              onClick={onContainerSeal}
              variant="default"
              className="h-16 text-lg bg-green-600 hover:bg-green-700"
            >
              <Lock className="h-6 w-6 mr-2" />
              Seal Container
            </Button>
          )}
        </div>
      )}

      {/* Loaded Vehicles */}
      {container.loadedVehicles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Loaded Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {container.loadedVehicles.map((vehicle, index) => (
                <Card key={vehicle.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-green-800">
                        Vehicle {index + 1}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {vehicle.type}
                        </Badge>
                        {container.status !== 'SEALED' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-6 px-2 text-xs"
                            onClick={() => onVehicleRemove(vehicle.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><strong>Make/Model:</strong> {vehicle.make} {vehicle.model}</div>
                      <div><strong>Year:</strong> {vehicle.year}</div>
                      <div><strong>Color:</strong> {vehicle.color}</div>
                      <div><strong>Chassis:</strong> {vehicle.chassisNumber}</div>
                      <div><strong>Freight:</strong> QAR {vehicle.freightCharge}</div>
                    </div>
                    {vehicle.photos && vehicle.photos.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">
                          Photos: {vehicle.photos.length}
                        </div>
                        <div className="flex gap-1">
                          {vehicle.photos.slice(0, 3).map((photo, photoIndex) => (
                            <img
                              key={photoIndex}
                              src={photo}
                              alt={`Vehicle ${index + 1} photo ${photoIndex + 1}`}
                              className="w-12 h-12 object-cover rounded border"
                            />
                          ))}
                          {vehicle.photos.length > 3 && (
                            <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs">
                              +{vehicle.photos.length - 3}
                            </div>
                          )}
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
            <CardTitle>Personal Effects & Household Goods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {container.personalEffects.map((effects, index) => (
                <Card key={effects.id} className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-blue-800">
                        Effects Package {index + 1}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {effects.volume} CBM
                        </Badge>
                        {container.status !== 'SEALED' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-6 px-2 text-xs"
                            onClick={() => onPersonalEffectsRemove(effects.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><strong>Description:</strong> {effects.description}</div>
                      <div><strong>Quantity:</strong> {effects.quantity}</div>
                      <div><strong>Volume:</strong> {effects.volume} CBM</div>
                      <div><strong>HS Code:</strong> {effects.hsCode}</div>
                      <div><strong>Charges:</strong> QAR {effects.charges}</div>
                    </div>
                    {effects.photos && effects.photos.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">
                          Photos: {effects.photos.length}
                        </div>
                        <div className="flex gap-1">
                          {effects.photos.slice(0, 3).map((photo, photoIndex) => (
                            <img
                              key={photoIndex}
                              src={photo}
                              alt={`Effects ${index + 1} photo ${photoIndex + 1}`}
                              className="w-12 h-12 object-cover rounded border"
                            />
                          ))}
                          {effects.photos.length > 3 && (
                            <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs">
                              +{effects.photos.length - 3}
                            </div>
                          )}
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

export default ContainerLoadingView;
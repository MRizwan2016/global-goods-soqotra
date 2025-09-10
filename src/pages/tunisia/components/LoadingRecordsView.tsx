import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Package, Car, FileText, Edit, Receipt } from "lucide-react";
import { TunisiaContainer } from "../types/tunisiaTypes";
import { format } from "date-fns";

interface LoadingRecord {
  id: string;
  containerNumber: string;
  loadingDate: string;
  vehicles: Array<{
    exportPlate: string;
    make: string;
    model: string;
    customerName: string;
    loadedAt: string;
  }>;
  personalEffects: Array<{
    description: string;
    volume: number;
    customerName: string;
    loadedAt: string;
  }>;
  totalVehicles: number;
  totalPersonalEffects: number;
  totalRevenue: number;
}

interface LoadingRecordsViewProps {
  containers: TunisiaContainer[];
  invoices: any[];
  onBack: () => void;
  onContainerEdit: (containerId: string) => void;
}

const LoadingRecordsView: React.FC<LoadingRecordsViewProps> = ({
  containers,
  invoices,
  onBack,
  onContainerEdit
}) => {
  // Generate loading records from containers
  const loadingRecords: LoadingRecord[] = containers
    .filter(container => container.status === 'SEALED' && 
            (container.loadedVehicles.length > 0 || container.personalEffects.length > 0))
    .map(container => ({
      id: container.id,
      containerNumber: container.containerNumber,
      loadingDate: container.dateOfLoading,
      vehicles: container.loadedVehicles.map(vehicle => ({
        exportPlate: vehicle.exportPlate,
        make: `${vehicle.make} ${vehicle.model}`,
        model: `${vehicle.year} ${vehicle.color}`,
        customerName: vehicle.customerInfo?.name || 'N/A',
        loadedAt: vehicle.loadedAt || container.dateOfLoading
      })),
      personalEffects: container.personalEffects.map(effect => ({
        description: effect.description,
        volume: effect.volume,
        customerName: 'N/A', // Would need to link to customer from invoice
        loadedAt: container.dateOfLoading
      })),
      totalVehicles: container.loadedVehicles.length,
      totalPersonalEffects: container.personalEffects.length,
      totalRevenue: container.totalCharge
    }));

  const totalStats = {
    totalContainers: loadingRecords.length,
    totalVehicles: loadingRecords.reduce((sum, record) => sum + record.totalVehicles, 0),
    totalPersonalEffects: loadingRecords.reduce((sum, record) => sum + record.totalPersonalEffects, 0),
    totalRevenue: loadingRecords.reduce((sum, record) => sum + record.totalRevenue, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Loading Records</h1>
          <p className="text-muted-foreground">Complete loading history for vehicles and personal effects</p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Containers</p>
                <p className="text-xl font-bold">{totalStats.totalContainers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-xl font-bold">{totalStats.totalVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Personal Effects</p>
                <p className="text-xl font-bold">{totalStats.totalPersonalEffects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">QAR {totalStats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading Records */}
      <div className="space-y-4">
        {loadingRecords.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No loading records found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Records will appear here once containers are loaded and sealed.
              </p>
            </CardContent>
          </Card>
        ) : (
          loadingRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Container {record.containerNumber}
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">SEALED</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Loaded: {format(new Date(record.loadingDate), 'PPP')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">QAR {record.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.totalVehicles} vehicles • {record.totalPersonalEffects} effects
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onContainerEdit(record.id)}
                        className="text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit/Reload
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Loaded Invoices Section */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Receipt className="h-4 w-4" />
                      Loaded Invoices
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {record.vehicles.map((vehicle, index) => {
                        const relatedInvoice = invoices.find(inv => 
                          inv.vehicle?.exportPlate === vehicle.exportPlate ||
                          inv.vehicle?.chassisNumber === vehicle.exportPlate
                        );
                        return (
                          <div key={index} className="border rounded p-3 bg-green-50 border-green-200">
                            <div className="text-sm">
                              <div className="font-medium text-green-800">
                                {relatedInvoice?.invoiceNumber || `INV-${vehicle.exportPlate}`}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Export: {vehicle.exportPlate}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {vehicle.make} - {vehicle.customerName}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Vehicles */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Vehicles ({record.totalVehicles})
                      </h4>
                    {record.vehicles.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No vehicles loaded</p>
                    ) : (
                      <div className="space-y-2">
                        {record.vehicles.map((vehicle, index) => (
                          <div key={index} className="border rounded p-3 text-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{vehicle.make}</p>
                                <p className="text-muted-foreground">{vehicle.model}</p>
                                <p className="text-xs text-blue-600">Export: {vehicle.exportPlate}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Customer</p>
                                <p className="text-xs font-medium">{vehicle.customerName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {format(new Date(vehicle.loadedAt), 'MMM dd, HH:mm')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Personal Effects */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Personal Effects ({record.totalPersonalEffects})
                    </h4>
                    {record.personalEffects.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No personal effects loaded</p>
                    ) : (
                      <div className="space-y-2">
                        {record.personalEffects.map((effect, index) => (
                          <div key={index} className="border rounded p-3 text-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{effect.description}</p>
                                <p className="text-muted-foreground">{effect.volume} CBM</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                  {format(new Date(effect.loadedAt), 'MMM dd, HH:mm')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LoadingRecordsView;
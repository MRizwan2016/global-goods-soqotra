import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Truck, Calendar, Package, Car, Unlock, Edit2, Trash2 } from "lucide-react";
import { TunisiaContainer } from "../types/tunisiaTypes";

interface SealedContainersViewProps {
  containers: TunisiaContainer[];
  onBack: () => void;
  onContainerView: (container: TunisiaContainer) => void;
  onContainerReopen?: (containerId: string) => void;
  onContainerEdit?: (containerId: string, updatedContainer: Partial<TunisiaContainer>) => void;
  onContainerDelete?: (containerId: string) => void;
  isAdmin?: boolean;
}

const SealedContainersView: React.FC<SealedContainersViewProps> = ({
  containers,
  onBack,
  onContainerView,
  onContainerReopen,
  onContainerEdit,
  onContainerDelete,
  isAdmin = false
}) => {
  const sealedContainers = containers.filter(container => container.status === 'SEALED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-primary">
              Sealed Container Management
            </h2>
            <p className="text-muted-foreground">
              View and manage sealed containers with loading details
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {sealedContainers.length} Sealed Containers
        </Badge>
      </div>

      {/* Sealed Containers Grid */}
      {sealedContainers.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Truck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Sealed Containers</h3>
            <p className="text-muted-foreground mb-4">
              No containers have been sealed yet. Load and seal containers to see them here.
            </p>
            <Button onClick={onBack}>
              Go to Container Loading
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sealedContainers.map((container) => (
            <Card key={container.id} className="border-2 border-blue-200 bg-blue-50 hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-blue-800 mb-1">
                      {container.containerNumber}
                    </CardTitle>
                    <div className="text-sm text-blue-600">
                      Seal: {container.sealNumber}
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    SEALED
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Container Info */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-blue-600" />
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{container.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-blue-600" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{container.dateOfLoading}</span>
                  </div>
                </div>

                {/* Loading Summary */}
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Vehicles</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {container.loadedVehicles.length}/{container.maxVehicles}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Personal Effects</span>
                    </div>
                    <span className="text-sm font-bold text-orange-600">
                      {container.personalEffects.length}
                    </span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Charges</span>
                      <span className="text-lg font-bold text-primary">
                        QAR {container.totalCharge.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Types Summary */}
                {container.loadedVehicles.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(container.loadedVehicles.map(v => v.type))).map(type => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    onClick={() => onContainerView(container)}
                    className="flex-1"
                    variant="outline"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {isAdmin && (
                    <div className="flex gap-1">
                      {onContainerEdit && (
                        <Button 
                          onClick={() => onContainerEdit && onContainerEdit(container.id, {})}
                          variant="outline"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700 border-blue-300 hover:border-blue-400"
                          title="Edit container details"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      {onContainerReopen && (
                        <Button 
                          onClick={() => onContainerReopen(container.id)}
                          variant="outline"
                          size="icon"
                          className="text-orange-600 hover:text-orange-700 border-orange-300 hover:border-orange-400"
                          title="Reopen for more loading (Admin only)"
                        >
                          <Unlock className="h-4 w-4" />
                        </Button>
                      )}
                      {onContainerDelete && (
                        <Button 
                          onClick={() => onContainerDelete && confirm('Are you sure you want to delete this sealed container?') && onContainerDelete(container.id)}
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                          title="Delete container (Admin only)"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Statistics */}
      {sealedContainers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {sealedContainers.reduce((sum, c) => sum + c.loadedVehicles.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Vehicles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {sealedContainers.reduce((sum, c) => sum + c.personalEffects.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Personal Effects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  QAR {sealedContainers.reduce((sum, c) => sum + c.totalCharge, 0).toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {sealedContainers.length}
                </div>
                <div className="text-sm text-muted-foreground">Sealed Containers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SealedContainersView;
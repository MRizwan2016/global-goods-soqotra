
import { Driver, Vehicle } from "../../types/deliveryTracking";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Truck, Warehouse, Clock } from "lucide-react";

interface TransportTabProps {
  assignedDriver?: Driver;
  assignedVehicle?: Vehicle;
  collectionDate: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  originWarehouse: string;
  destinationWarehouse: string;
}

const TransportTab = ({
  assignedDriver,
  assignedVehicle,
  collectionDate,
  estimatedDeliveryDate,
  actualDeliveryDate,
  originWarehouse,
  destinationWarehouse,
}: TransportTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transport & Scheduling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm mb-3">Schedule Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="font-medium mr-2">Collection Date:</span>
                  <span>{collectionDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  <span className="font-medium mr-2">Estimated Delivery:</span>
                  <span>{estimatedDeliveryDate}</span>
                </div>
                {actualDeliveryDate && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    <span className="font-medium mr-2">Actual Delivery:</span>
                    <span>{actualDeliveryDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">Warehouse Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Warehouse size={16} className="text-blue-500" />
                  <span className="font-medium mr-2">Origin:</span>
                  <span>{originWarehouse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Warehouse size={16} className="text-green-500" />
                  <span className="font-medium mr-2">Destination:</span>
                  <span>{destinationWarehouse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-purple-500" />
                  <span className="font-medium mr-2">Transit Time:</span>
                  <span>
                    {/* Calculate days between collection and estimated delivery */}
                    {Math.round(
                      (new Date(estimatedDeliveryDate).getTime() - new Date(collectionDate).getTime()) / 
                      (1000 * 60 * 60 * 24)
                    )} days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assigned Transport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm mb-3">Driver</h3>
              {assignedDriver ? (
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span> {assignedDriver.name}
                    </div>
                    <div>
                      <span className="font-medium">License:</span> {assignedDriver.licenseNumber}
                    </div>
                    <div>
                      <span className="font-medium">Contact:</span> {assignedDriver.contactNumber}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assignedDriver.status === 'available' ? 'bg-green-100 text-green-800' : 
                        assignedDriver.status === 'on-delivery' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {assignedDriver.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <p className="text-gray-500 italic">No driver assigned</p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-3">Vehicle</h3>
              {assignedVehicle ? (
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Registration:</span> {assignedVehicle.registrationNumber}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {assignedVehicle.type.charAt(0).toUpperCase() + assignedVehicle.type.slice(1)}
                    </div>
                    <div>
                      <span className="font-medium">Capacity:</span> {assignedVehicle.capacity}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assignedVehicle.status === 'available' ? 'bg-green-100 text-green-800' : 
                        assignedVehicle.status === 'on-delivery' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {assignedVehicle.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <p className="text-gray-500 italic">No vehicle assigned</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportTab;

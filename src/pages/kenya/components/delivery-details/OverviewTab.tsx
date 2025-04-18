
import { CargoDelivery } from "../../types/deliveryTracking";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, MapPin, Truck } from "lucide-react";

interface OverviewTabProps {
  delivery: CargoDelivery;
}

const OverviewTab = ({ delivery }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Sender & Receiver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
              <User size={14} className="text-green-600" />
              Sender Information
            </h4>
            <div className="grid grid-cols-1 gap-1 text-sm ml-5">
              <div><span className="font-medium">Name:</span> {delivery.sender.name}</div>
              <div><span className="font-medium">Contact:</span> {delivery.sender.contactNumber}</div>
              <div><span className="font-medium">Address:</span> {delivery.sender.address}</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
              <User size={14} className="text-blue-600" />
              Receiver Information
            </h4>
            <div className="grid grid-cols-1 gap-1 text-sm ml-5">
              <div><span className="font-medium">Name:</span> {delivery.receiver.name}</div>
              <div><span className="font-medium">Contact:</span> {delivery.receiver.contactNumber}</div>
              <div><span className="font-medium">Address:</span> {delivery.receiver.address}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Delivery Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
              <MapPin size={14} className="text-red-600" />
              Destination Details
            </h4>
            <div className="grid grid-cols-1 gap-1 text-sm ml-5">
              <div><span className="font-medium">County:</span> {delivery.deliveryLocation.county}</div>
              <div><span className="font-medium">District:</span> {delivery.deliveryLocation.district}</div>
              <div><span className="font-medium">Full Address:</span> {delivery.deliveryLocation.address}</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
              <Truck size={14} className="text-purple-600" />
              Warehouse Information
            </h4>
            <div className="grid grid-cols-1 gap-1 text-sm ml-5">
              <div><span className="font-medium">Origin:</span> {delivery.originWarehouse}</div>
              <div><span className="font-medium">Destination:</span> {delivery.destinationWarehouse}</div>
              <div><span className="font-medium">Door to Door:</span> {delivery.isDoorToDoor ? "Yes" : "No"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* ... Transport Details and Payment & Schedules cards kept in separate components */}
    </div>
  );
};

export default OverviewTab;

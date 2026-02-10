
import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, PhoneCall, MapPin, ChevronLeft, ChevronRight, CarFront, UserRoundCog } from "lucide-react";
import { getStatusBadge, getPaymentBadge } from "@/pages/kenya/utils/statusUtils";
import { CargoDelivery } from "../types/deliveryTracking";
import { useNavigate, Link } from "react-router-dom";

interface DeliveryTableProps {
  entries: CargoDelivery[];
  onViewDelivery: (deliveryId: string) => void;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ entries, onViewDelivery }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#1e2a3a] hover:bg-[#1e2a3a]">
          <TableHead className="w-24">Invoice #</TableHead>
          <TableHead>Receiver</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="w-28">Collection Date</TableHead>
          <TableHead className="w-28">Delivery Date</TableHead>
          <TableHead className="w-28">Status</TableHead>
          <TableHead className="w-24">Payment</TableHead>
          <TableHead className="w-24">D2D</TableHead>
          <TableHead className="w-24">Packages</TableHead>
          <TableHead className="w-20 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.length > 0 ? (
          entries.map((delivery) => {
            const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1];
            return (
              <TableRow key={delivery.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{delivery.invoiceNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User size={14} className="mr-1 text-gray-500" />
                    {delivery.receiver.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <PhoneCall size={14} className="mr-1 text-gray-500" />
                    {delivery.receiver.contactNumber}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-gray-500" />
                    {delivery.deliveryLocation.county}, {delivery.deliveryLocation.district}
                  </div>
                </TableCell>
                <TableCell>{delivery.collectionDate}</TableCell>
                <TableCell>{delivery.estimatedDeliveryDate}</TableCell>
                <TableCell>{getStatusBadge(latestStatus?.status || 'pending')}</TableCell>
                <TableCell>{getPaymentBadge(delivery.paymentStatus)}</TableCell>
                <TableCell>{delivery.isDoorToDoor ? "Yes" : "No"}</TableCell>
                <TableCell className="text-center">{delivery.cargoDetails.packages}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 px-2 text-xs"
                    onClick={() => onViewDelivery(delivery.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={11} className="text-center py-6 text-gray-500">
              No delivery records found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DeliveryTable;

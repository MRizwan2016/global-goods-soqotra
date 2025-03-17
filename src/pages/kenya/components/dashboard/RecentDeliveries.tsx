
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CargoDelivery } from "../../types/deliveryTracking";

interface RecentDeliveriesProps {
  deliveries: CargoDelivery[];
}

const RecentDeliveries = ({ deliveries }: RecentDeliveriesProps) => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow mb-6">
      <CardHeader>
        <CardTitle>Recent Deliveries</CardTitle>
        <CardDescription>Latest cargo deliveries in process</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Invoice #</th>
                <th className="text-left p-2">Receiver</th>
                <th className="text-left p-2">Destination</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Payment</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.slice(0, 5).map(delivery => {
                const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1];
                return (
                  <tr key={delivery.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{delivery.invoiceNumber}</td>
                    <td className="p-2">{delivery.receiver.name}</td>
                    <td className="p-2">{delivery.deliveryLocation.county}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${latestStatus.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          latestStatus.status === 'in-transit' ? 'bg-orange-100 text-orange-800' : 
                          latestStatus.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {latestStatus.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${delivery.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                          delivery.paymentStatus === 'partial' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {delivery.paymentStatus.charAt(0).toUpperCase() + delivery.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <Link to={`/kenya/delivery/${delivery.id}`}>
                        <Button variant="ghost" size="sm" className="h-8">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link to="/kenya/deliveries">
            <Button variant="outline">View All Deliveries</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentDeliveries;

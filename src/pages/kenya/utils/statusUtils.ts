
import { Badge } from "@/components/ui/badge";

export const formatStatusLabel = (status: string): string => {
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'pending':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500">Processing</Badge>;
    case 'in-transit':
      return <Badge className="bg-orange-500">In Transit</Badge>;
    case 'at-warehouse':
      return <Badge className="bg-purple-500">At Warehouse</Badge>;
    case 'out-for-delivery':
      return <Badge className="bg-indigo-500">Out for Delivery</Badge>;
    case 'delivered':
      return <Badge className="bg-green-500">Delivered</Badge>;
    case 'failed':
      return <Badge className="bg-red-500">Failed</Badge>;
    default:
      return <Badge className="bg-gray-500">{status}</Badge>;
  }
};

export const getPaymentBadge = (status: string) => {
  switch(status) {
    case 'completed':
      return <Badge className="bg-green-500">Paid</Badge>;
    case 'partial':
      return <Badge className="bg-amber-500">Partial</Badge>;
    case 'pending':
      return <Badge className="bg-red-500">Unpaid</Badge>;
    default:
      return <Badge className="bg-gray-500">{status}</Badge>;
  }
};

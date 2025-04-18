
import { Badge } from "@/components/ui/badge";
import React from 'react';

export const formatStatusLabel = (status: string): string => {
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getStatusBadge = (status: string): React.ReactNode => {
  switch(status) {
    case 'pending':
      return <Badge variant="default" className="bg-yellow-500">Pending</Badge>;
    case 'processing':
      return <Badge variant="default" className="bg-blue-500">Processing</Badge>;
    case 'in-transit':
      return <Badge variant="default" className="bg-orange-500">In Transit</Badge>;
    case 'at-warehouse':
      return <Badge variant="default" className="bg-purple-500">At Warehouse</Badge>;
    case 'out-for-delivery':
      return <Badge variant="default" className="bg-indigo-500">Out for Delivery</Badge>;
    case 'delivered':
      return <Badge variant="default" className="bg-green-500">Delivered</Badge>;
    case 'failed':
      return <Badge variant="default" className="bg-red-500">Failed</Badge>;
    default:
      return <Badge variant="default" className="bg-gray-500">{formatStatusLabel(status)}</Badge>;
  }
};

export const getPaymentBadge = (status: string): React.ReactNode => {
  switch(status) {
    case 'completed':
      return <Badge variant="default" className="bg-green-500">Paid</Badge>;
    case 'partial':
      return <Badge variant="default" className="bg-amber-500">Partial</Badge>;
    case 'pending':
      return <Badge variant="default" className="bg-red-500">Unpaid</Badge>;
    default:
      return <Badge variant="default" className="bg-gray-500">{formatStatusLabel(status)}</Badge>;
  }
};

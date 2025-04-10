
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Shipment {
  id: string;
  invoiceNumber: string;
  destination: string;
  consignee1: string;
  date: string;
  packages: string;
  weight: string;
  volume: string;
  status: 'In Transit' | 'Delivered' | 'Pending';
}

interface ShipmentTableProps {
  shipments: Shipment[];
  getStatusColor: (status: string) => string;
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({ shipments, getStatusColor }) => {
  const navigate = useNavigate();
  
  const viewDetails = (id: string) => {
    navigate(`/data-entry/invoicing/edit/${id}`);
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Invoice</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Date</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Destination</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Consignee</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Packages</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Weight</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 border text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.length > 0 ? (
            shipments.map((shipment, index) => (
              <motion.tr
                key={shipment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3 border text-sm">{shipment.invoiceNumber}</td>
                <td className="px-4 py-3 border text-sm">{shipment.date}</td>
                <td className="px-4 py-3 border text-sm">{shipment.destination}</td>
                <td className="px-4 py-3 border text-sm">{shipment.consignee1}</td>
                <td className="px-4 py-3 border text-sm">{shipment.packages}</td>
                <td className="px-4 py-3 border text-sm">{shipment.weight} kg</td>
                <td className="px-4 py-3 border text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={() => viewDetails(shipment.id)}
                    className="h-8 px-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                No shipments found matching your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;

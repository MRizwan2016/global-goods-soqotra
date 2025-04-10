
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShipmentHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Truck className="h-6 w-6 text-green-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Shipment Details</h1>
      </div>
      <Button 
        onClick={() => navigate('/reports/cargo')} 
        variant="outline"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reports
      </Button>
    </div>
  );
};

export default ShipmentHeader;

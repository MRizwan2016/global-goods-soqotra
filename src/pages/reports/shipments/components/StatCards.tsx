
import React from 'react';
import { Package, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardsProps {
  shipments: Array<{
    packages: string;
    status: string;
  }>;
}

const StatCards: React.FC<StatCardsProps> = ({ shipments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm border border-blue-100"
      >
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-blue-600">Total Packages</div>
            <div className="text-2xl font-bold text-blue-800">
              {shipments.reduce((sum, item) => sum + parseInt(item.packages || '0'), 0)}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm border border-green-100"
      >
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Truck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-green-600">Delivered</div>
            <div className="text-2xl font-bold text-green-800">
              {shipments.filter(item => item.status === 'Delivered').length}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 shadow-sm border border-amber-100"
      >
        <div className="flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Truck className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-amber-600">In Transit</div>
            <div className="text-2xl font-bold text-amber-800">
              {shipments.filter(item => item.status === 'In Transit').length}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatCards;

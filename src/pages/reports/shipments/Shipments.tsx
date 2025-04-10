
import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import ShipmentHeader from './components/ShipmentHeader';
import StatCards from './components/StatCards';
import ShipmentsContent from './components/ShipmentsContent';
import { useShipmentData } from './hooks/useShipmentData';

const Shipments = () => {
  const {
    shipments,
    filteredShipments,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    countryFilter,
    setCountryFilter,
    countries,
    getStatusColor
  } = useShipmentData();

  return (
    <Layout title="Shipment Details">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <ShipmentHeader />
        
        <StatCards shipments={shipments} />
        
        <ShipmentsContent
          filteredShipments={filteredShipments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          countries={countries}
          getStatusColor={getStatusColor}
        />
      </motion.div>
    </Layout>
  );
};

export default Shipments;

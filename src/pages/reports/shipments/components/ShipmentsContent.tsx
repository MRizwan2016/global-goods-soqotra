
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Package } from 'lucide-react';
import ShipmentFilters from './ShipmentFilters';
import ShipmentTable from './ShipmentTable';
import { exportToCSV } from '../utils/exportUtils';

interface ShipmentsContentProps {
  filteredShipments: any[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  countryFilter: string;
  setCountryFilter: (value: string) => void;
  countries: string[];
  getStatusColor: (status: string) => string;
}

const ShipmentsContent: React.FC<ShipmentsContentProps> = ({
  filteredShipments,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  countryFilter,
  setCountryFilter,
  countries,
  getStatusColor
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 text-green-600 mr-2" />
          Shipment List
        </CardTitle>
        <Button 
          onClick={() => exportToCSV(filteredShipments)} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <ShipmentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          countries={countries}
        />
        
        <ShipmentTable 
          shipments={filteredShipments} 
          getStatusColor={getStatusColor} 
        />
      </CardContent>
    </Card>
  );
};

export default ShipmentsContent;


import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, CheckSquare, XSquare } from 'lucide-react';
import { toast } from 'sonner';

interface ShipmentPackage {
  id: string;
  invoiceNumber: string;
  sender: string;
  loadingDate: string;
  expectedDeliveryDate: string;
  packages: number;
  receivedPackages: number | null;
  isReceived: boolean;
}

const PackageReceiptSystem = () => {
  // Mock shipment data
  const [shipments, setShipments] = useState<ShipmentPackage[]>([
    {
      id: '1',
      invoiceNumber: 'GY-KE-23001',
      sender: 'Mombasa CFS',
      loadingDate: '2025-04-15',
      expectedDeliveryDate: '2025-04-17',
      packages: 12,
      receivedPackages: null,
      isReceived: false
    },
    {
      id: '2',
      invoiceNumber: 'GY-KE-23002',
      sender: 'Mombasa CFS',
      loadingDate: '2025-04-16',
      expectedDeliveryDate: '2025-04-18',
      packages: 8,
      receivedPackages: 8,
      isReceived: true
    },
    {
      id: '3',
      invoiceNumber: 'GY-KE-23003',
      sender: 'Mombasa CFS',
      loadingDate: '2025-04-17',
      expectedDeliveryDate: '2025-04-19',
      packages: 15,
      receivedPackages: 15,
      isReceived: true
    },
    {
      id: '4',
      invoiceNumber: 'GY-KE-23004',
      sender: 'Mombasa CFS',
      loadingDate: '2025-04-18',
      expectedDeliveryDate: '2025-04-20',
      packages: 5,
      receivedPackages: null,
      isReceived: false
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [receivedCounts, setReceivedCounts] = useState<{[key: string]: number}>({});
  
  // Filter shipments based on search
  const filteredShipments = shipments.filter(shipment => 
    shipment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Mark shipment as received
  const handleReceiveShipment = (shipmentId: string, isReceived: boolean) => {
    const receivedCount = receivedCounts[shipmentId] || 0;
    const shipment = shipments.find(s => s.id === shipmentId);
    
    if (!shipment) return;
    
    if (isReceived && receivedCount <= 0) {
      toast.error(`Please enter the number of packages received for ${shipment.invoiceNumber}`);
      return;
    }
    
    if (isReceived && receivedCount > shipment.packages) {
      toast.error(`Received packages cannot be more than expected packages (${shipment.packages})`);
      return;
    }
    
    setShipments(shipments.map(s => {
      if (s.id === shipmentId) {
        const updated = { 
          ...s, 
          isReceived, 
          receivedPackages: isReceived ? receivedCount : null 
        };
        
        if (isReceived) {
          toast.success(`Packages for invoice ${s.invoiceNumber} marked as received (${receivedCount} of ${s.packages})`);
        } else {
          toast.info(`Receipt status cleared for invoice ${s.invoiceNumber}`);
        }
        
        return updated;
      }
      return s;
    }));
  };
  
  // Handle change in received packages count
  const handleReceivedCountChange = (shipmentId: string, value: string) => {
    const count = parseInt(value) || 0;
    setReceivedCounts({
      ...receivedCounts,
      [shipmentId]: count
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-blue-50">
        <CardTitle>Nairobi CFS Package Receipt System</CardTitle>
        <CardDescription>
          Acknowledge receipt of packages from Mombasa CFS
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex justify-between mb-4 gap-2 items-center">
          <h3 className="text-lg font-medium">Incoming Shipments</h3>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[120px]">Invoice #</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Loading Date</TableHead>
                <TableHead>Expected Arrival</TableHead>
                <TableHead className="text-center">Expected Packages</TableHead>
                <TableHead className="text-center">Received Packages</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.length > 0 ? (
                filteredShipments.map(shipment => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.invoiceNumber}</TableCell>
                    <TableCell>{shipment.sender}</TableCell>
                    <TableCell>{shipment.loadingDate}</TableCell>
                    <TableCell>{shipment.expectedDeliveryDate}</TableCell>
                    <TableCell className="text-center">{shipment.packages}</TableCell>
                    <TableCell className="text-center">
                      {shipment.isReceived ? (
                        shipment.receivedPackages
                      ) : (
                        <Input 
                          type="number"
                          min="1"
                          max={shipment.packages.toString()}
                          placeholder="0"
                          className="w-20 mx-auto h-8 text-center"
                          value={receivedCounts[shipment.id] || ''}
                          onChange={(e) => handleReceivedCountChange(shipment.id, e.target.value)}
                        />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={
                          shipment.isReceived 
                            ? "bg-green-500" 
                            : "bg-yellow-500"
                        }
                      >
                        {shipment.isReceived ? "Received" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!shipment.isReceived ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 border-green-200 hover:bg-green-100 text-green-600 flex items-center gap-1"
                            onClick={() => handleReceiveShipment(shipment.id, true)}
                          >
                            <CheckSquare size={16} />
                            Mark Received
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600 flex items-center gap-1"
                            onClick={() => handleReceiveShipment(shipment.id, false)}
                          >
                            <XSquare size={16} />
                            Clear
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No incoming shipments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          {filteredShipments.length} shipments found • 
          {shipments.filter(s => s.isReceived).length} received • 
          {shipments.filter(s => !s.isReceived).length} pending
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageReceiptSystem;

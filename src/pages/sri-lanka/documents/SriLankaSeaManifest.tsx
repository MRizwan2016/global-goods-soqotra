import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Printer, CalendarIcon, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SeaManifestProps {
  shipments: any[];
  vesselInfo?: any;
}

const SriLankaSeaManifest: React.FC<SeaManifestProps> = ({ shipments, vesselInfo }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [vesselName, setVesselName] = useState<string>('');
  const [voyageNumber, setVoyageNumber] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date(Date.now() + 7 * 86400000));

  const manifestNumber = `SM${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}001`;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveManifest = () => {
    const manifestData = {
      id: manifestNumber,
      vesselName,
      voyageNumber,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      arrivalDate: format(arrivalDate, 'yyyy-MM-dd'),
      shipments,
      createdAt: new Date().toISOString(),
      type: 'sea'
    };

    const existingManifests = JSON.parse(localStorage.getItem('savedSeaManifests') || '[]');
    existingManifests.push(manifestData);
    localStorage.setItem('savedSeaManifests', JSON.stringify(existingManifests));
    
    toast.success('Sea Manifest saved successfully!');
  };

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="p-4 border-b no-print">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sea Freight Manifest</h2>
          <div className="flex gap-2">
            <Button onClick={handleSaveManifest}>
              <Save className="h-4 w-4 mr-2" />
              Save Manifest
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Vessel Name" value={vesselName} onChange={(e) => setVesselName(e.target.value)} />
          <Input placeholder="Voyage Number" value={voyageNumber} onChange={(e) => setVoyageNumber(e.target.value)} />
        </div>
      </div>

      {/* Manifest Content */}
      <div ref={printRef} className="p-4">
        <div className="border border-black p-3">
          <div className="text-center border-b border-black pb-3 mb-3">
            <h1 className="text-lg font-bold">SEA FREIGHT MANIFEST</h1>
            <p className="text-sm">ALMARAAM LOGISTICS SERVICES</p>
            <div className="text-right text-xs">
              <div>Manifest No: {manifestNumber}</div>
              <div>Date: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Shipment Details */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 text-xs">S.No</th>
                <th className="border border-black p-1 text-xs">BL No</th>
                <th className="border border-black p-1 text-xs">SHIPPER</th>
                <th className="border border-black p-1 text-xs">CONSIGNEE</th>
                <th className="border border-black p-1 text-xs">PCS</th>
                <th className="border border-black p-1 text-xs">WEIGHT</th>
                <th className="border border-black p-1 text-xs">DIMENSIONS (INCHES)</th>
                <th className="border border-black p-1 text-xs">CBM</th>
                <th className="border border-black p-1 text-xs">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment, index) => (
                <tr key={index}>
                  <td className="border border-black p-1 text-center text-xs">{index + 1}</td>
                  <td className="border border-black p-1 text-xs">{shipment.invoiceNumber}</td>
                  <td className="border border-black p-1 text-xs">{shipment.shipperName}</td>
                  <td className="border border-black p-1 text-xs">{shipment.consigneeName}</td>
                  <td className="border border-black p-1 text-center text-xs">{shipment.packages}</td>
                  <td className="border border-black p-1 text-center text-xs">{shipment.weight}</td>
                  <td className="border border-black p-1 text-xs">{shipment.length}×{shipment.width}×{shipment.height}</td>
                  <td className="border border-black p-1 text-center text-xs">{shipment.volume}</td>
                  <td className="border border-black p-1 text-xs">{shipment.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SriLankaSeaManifest;
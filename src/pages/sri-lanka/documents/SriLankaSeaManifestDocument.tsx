import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SeaManifestDocumentProps {
  shipments: any[];
  vesselInfo?: any;
}

const SHIPPING_LINES: Record<string, { name: string; prefix: string }> = {
  'msc': { name: 'MSC - MEDITERRANEAN SHIPPING', prefix: 'MSC' },
  'maersk': { name: 'MAERSK LINE', prefix: 'MAEU' },
  'cma': { name: 'CMA CGM', prefix: 'CMAU' },
  'hapag': { name: 'HAPAG-LLOYD', prefix: 'HLCU' },
  'evergreen': { name: 'EVERGREEN LINE', prefix: 'EISU' },
  'one': { name: 'OCEAN NETWORK EXPRESS', prefix: 'ONEY' },
};

const SriLankaSeaManifestDocument: React.FC<SeaManifestDocumentProps> = ({ shipments, vesselInfo }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [vesselName, setVesselName] = useState<string>('');
  const [voyageNumber, setVoyageNumber] = useState<string>('');
  const [blNumber, setBlNumber] = useState<string>('');
  const [containerNumber, setContainerNumber] = useState<string>('');
  const [sealNumber, setSealNumber] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date(Date.now() + 14 * 86400000));

  const manifestNumber = `SM${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}001`;

  const handleSaveManifest = () => {
    const manifestData = {
      id: manifestNumber,
      vesselName,
      voyageNumber,
      blNumber,
      containerNumber,
      sealNumber,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      arrivalDate: format(arrivalDate, 'yyyy-MM-dd'),
      shipments,
      createdAt: new Date().toISOString(),
      type: 'sea'
    };
    const existing = JSON.parse(localStorage.getItem('savedSeaManifests') || '[]');
    existing.push(manifestData);
    localStorage.setItem('savedSeaManifests', JSON.stringify(existing));
    toast.success('Sea Manifest saved successfully!');
  };

  const getTotalWeight = () =>
    shipments.reduce((t, s) => t + (parseFloat(s.totalWeight || s.weight) || 0), 0).toFixed(2);

  const getTotalVolume = () =>
    shipments.reduce((t, s) => {
      const pkgVol = s.packages?.reduce((sum: number, p: any) => sum + (p.volume || 0), 0) || 0;
      return t + (pkgVol || parseFloat(s.volume) || 0);
    }, 0).toFixed(3);

  const getTotalPieces = () =>
    shipments.reduce((t, s) => t + (parseInt(s.packages?.length || s.pieces) || 1), 0);

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="p-4 border-b no-print space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Sea Freight Manifest</h2>
          <Button onClick={handleSaveManifest} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Manifest
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input placeholder="Vessel Name" value={vesselName} onChange={(e) => setVesselName(e.target.value)} />
          <Input placeholder="Voyage Number" value={voyageNumber} onChange={(e) => setVoyageNumber(e.target.value)} />
          <Input placeholder="B/L Number" value={blNumber} onChange={(e) => setBlNumber(e.target.value)} />
          <Input placeholder="Container Number" value={containerNumber} onChange={(e) => setContainerNumber(e.target.value)} />
          <Input placeholder="Seal Number" value={sealNumber} onChange={(e) => setSealNumber(e.target.value)} />
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("flex-1 justify-start text-left font-normal text-sm")}>
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  ETD: {format(departureDate, "dd/MM/yy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={departureDate} onSelect={(d) => d && setDepartureDate(d)} initialFocus className="pointer-events-auto" />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("flex-1 justify-start text-left font-normal text-sm")}>
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  ETA: {format(arrivalDate, "dd/MM/yy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={arrivalDate} onSelect={(d) => d && setArrivalDate(d)} initialFocus className="pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Manifest Content */}
      <div ref={printRef} className="p-4">
        <div className="border border-black p-3">
          {/* Header */}
          <div className="text-center border-b border-black pb-3 mb-3">
            <div className="flex justify-between items-center">
              <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Logo" className="h-12 w-16 object-contain" />
              <div>
                <h1 className="text-lg font-bold">SEA FREIGHT MANIFEST</h1>
                <p className="text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
              </div>
              <div className="text-right text-xs">
                <div>Manifest No: {manifestNumber}</div>
                <div>Date: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Vessel Information */}
          <div className="border border-black mb-3">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1.5 text-left">VESSEL NAME</th>
                  <th className="border border-black p-1.5 text-left">VOYAGE NO</th>
                  <th className="border border-black p-1.5 text-left">B/L NUMBER</th>
                  <th className="border border-black p-1.5 text-left">CONTAINER NO</th>
                  <th className="border border-black p-1.5 text-left">SEAL NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1.5 font-bold">{vesselName || '—'}</td>
                  <td className="border border-black p-1.5">{voyageNumber || '—'}</td>
                  <td className="border border-black p-1.5">{blNumber || '—'}</td>
                  <td className="border border-black p-1.5">{containerNumber || '—'}</td>
                  <td className="border border-black p-1.5">{sealNumber || '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Route Information */}
          <div className="border border-black mb-3">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1.5 text-left">PORT OF LOADING</th>
                  <th className="border border-black p-1.5 text-left">PORT OF DISCHARGE</th>
                  <th className="border border-black p-1.5 text-left">ETD</th>
                  <th className="border border-black p-1.5 text-left">ETA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1.5 font-bold">HAMAD PORT, DOHA</td>
                  <td className="border border-black p-1.5 font-bold">COLOMBO PORT, SRI LANKA</td>
                  <td className="border border-black p-1.5">{format(departureDate, 'dd/MM/yyyy')}</td>
                  <td className="border border-black p-1.5">{format(arrivalDate, 'dd/MM/yyyy')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cargo Summary */}
          <div className="border border-black mb-3">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1.5">TOTAL SHIPMENTS</th>
                  <th className="border border-black p-1.5">TOTAL PACKAGES</th>
                  <th className="border border-black p-1.5">TOTAL WEIGHT (KG)</th>
                  <th className="border border-black p-1.5">TOTAL VOLUME (CBM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1.5 text-center font-bold">{shipments.length}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{getTotalPieces()}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{getTotalWeight()}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{getTotalVolume()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Shipment Details */}
          <div className="border border-black">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1">S.No</th>
                  <th className="border border-black p-1">HBL No</th>
                  <th className="border border-black p-1">SHIPPER</th>
                  <th className="border border-black p-1">CONSIGNEE</th>
                  <th className="border border-black p-1">DESTINATION</th>
                  <th className="border border-black p-1">PCS</th>
                  <th className="border border-black p-1">WEIGHT (KG)</th>
                  <th className="border border-black p-1">VOL (CBM)</th>
                  <th className="border border-black p-1">DESCRIPTION</th>
                  <th className="border border-black p-1">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length > 0 ? shipments.map((shipment, index) => {
                  const pkgVol = shipment.packages?.reduce((s: number, p: any) => s + (p.volume || 0), 0) || 0;
                  return (
                    <tr key={index}>
                      <td className="border border-black p-1 text-center">{index + 1}</td>
                      <td className="border border-black p-1">{shipment.invoiceNumber || `HBL-${index + 1}`}</td>
                      <td className="border border-black p-1">{shipment.shipper?.name || shipment.shipperName || 'SHIPPER'}</td>
                      <td className="border border-black p-1">{shipment.consignee?.name || shipment.consigneeName || 'CONSIGNEE'}</td>
                      <td className="border border-black p-1">{shipment.consignee?.district || shipment.consigneeDistrict || 'COLOMBO'}</td>
                      <td className="border border-black p-1 text-center">{shipment.packages?.length || 1}</td>
                      <td className="border border-black p-1 text-center">{parseFloat(shipment.totalWeight || shipment.weight || '0').toFixed(1)}</td>
                      <td className="border border-black p-1 text-center">{(pkgVol || parseFloat(shipment.volume || '0')).toFixed(3)}</td>
                      <td className="border border-black p-1">
                        {shipment.packages?.map((p: any) => p.name).filter(Boolean).join(', ') || shipment.description || 'PERSONAL EFFECTS'}
                      </td>
                      <td className="border border-black p-1">{shipment.remarks || 'NIL'}</td>
                    </tr>
                  );
                }) : (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="border border-black p-1 text-center">{i + 1}</td>
                      <td className="border border-black p-1">HBL-{i + 1}</td>
                      <td className="border border-black p-1">SAMPLE SHIPPER {i + 1}</td>
                      <td className="border border-black p-1">SAMPLE CONSIGNEE {i + 1}</td>
                      <td className="border border-black p-1">COLOMBO</td>
                      <td className="border border-black p-1 text-center">1</td>
                      <td className="border border-black p-1 text-center">50.0</td>
                      <td className="border border-black p-1 text-center">0.500</td>
                      <td className="border border-black p-1">PERSONAL EFFECTS</td>
                      <td className="border border-black p-1">NIL</td>
                    </tr>
                  ))
                )}
                {/* Empty rows */}
                {Array.from({ length: Math.max(0, 10 - shipments.length) }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td className="border border-black p-1 h-6"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex border-t border-black mt-3 pt-3">
            <div className="w-1/3 pr-3">
              <div className="text-xs font-bold mb-1">PREPARED BY:</div>
              <div className="text-xs">Cargo Executive</div>
              <div className="text-xs">Date: {new Date().toLocaleDateString()}</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">SIGNATURE</div>
            </div>
            <div className="w-1/3 px-3 border-l border-black">
              <div className="text-xs font-bold mb-1">CHECKED BY:</div>
              <div className="text-xs">Operations Manager</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">SIGNATURE</div>
            </div>
            <div className="w-1/3 pl-3 border-l border-black">
              <div className="text-xs font-bold mb-1">APPROVED BY:</div>
              <div className="text-xs">General Manager</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">SIGNATURE</div>
            </div>
          </div>

          <div className="mt-3 text-center text-[7pt] text-gray-500 border-t border-black pt-2">
            SOQOTRA LOGISTICS SERVICES | DOHA, QATAR | OPS@SOQOTRA.QA | TEL: 44421987
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaSeaManifestDocument;

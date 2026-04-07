import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Printer, Download, CalendarIcon, Clock, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AirManifestProps {
  shipments: any[];
  flightInfo?: any;
}

interface AirlineInfo {
  name: string;
  prefix: string;
  iataCode: string;
}

const AIRLINES: Record<string, AirlineInfo> = {
  'qatar': { name: 'QATAR AIRWAYS', prefix: '157', iataCode: 'QR' },
  'sri-lankan': { name: 'SRI LANKAN AIRWAYS', prefix: '603', iataCode: 'UL' },
  'gulf': { name: 'GULF AIRWAYS', prefix: '072', iataCode: 'GF' },
  'oman': { name: 'OMAN AIRWAYS', prefix: '910', iataCode: 'WY' },
  'air-india': { name: 'AIR INDIA AIRWAYS', prefix: '098', iataCode: 'AI' },
  'etihad': { name: 'ETIHAD AIRWAYS', prefix: '607', iataCode: 'EY' },
  'emirates': { name: 'EMIRATES AIRWAYS', prefix: '176', iataCode: 'EK' }
};

const SriLankaAirManifest: React.FC<AirManifestProps> = ({ shipments, flightInfo }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [selectedAirline, setSelectedAirline] = useState<string>('qatar');
  const [mawbSuffix, setMawbSuffix] = useState<string>('');
  const [flightNumber, setFlightNumber] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date(Date.now() + 86400000));
  const [departureTime, setDepartureTime] = useState<string>('23:59');
  const [arrivalTime, setArrivalTime] = useState<string>('06:30');

  const manifestNumber = `AM${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}001`;
  
  const getMawbNumber = () => {
    const airline = AIRLINES[selectedAirline];
    return mawbSuffix ? `${airline.prefix}-${mawbSuffix}` : `${airline.prefix}-`;
  };

  const getFlightNumber = () => {
    const airline = AIRLINES[selectedAirline];
    return flightNumber ? `${airline.iataCode} ${flightNumber}` : `${airline.iataCode} `;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Air Freight Manifest - ${manifestNumber}</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 11px; }
              .print-container { max-width: 100%; margin: 0 auto; background: white; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; font-size: 10px; }
              .font-bold { font-weight: bold; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .bg-gray { background-color: #f0f0f0; }
              @media print {
                body { margin: 0; padding: 10px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getTotalWeight = () => {
    return shipments.reduce((total, shipment) => total + (parseFloat(shipment.weight) || 0), 0).toFixed(2);
  };

  const getTotalPieces = () => {
    return shipments.reduce((total, shipment) => total + (parseInt(shipment.pieces) || 1), 0);
  };

  const handleSaveManifest = () => {
    const manifestData = {
      id: manifestNumber,
      mawbNumber: getMawbNumber(),
      flightNumber: getFlightNumber(),
      airline: AIRLINES[selectedAirline].name,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      arrivalDate: format(arrivalDate, 'yyyy-MM-dd'),
      departureTime,
      arrivalTime,
      shipments,
      createdAt: new Date().toISOString(),
      type: 'air'
    };

    const existingManifests = JSON.parse(localStorage.getItem('savedAirManifests') || '[]');
    existingManifests.push(manifestData);
    localStorage.setItem('savedAirManifests', JSON.stringify(existingManifests));
    
    toast.success('Air Manifest saved successfully!');
  };

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="p-4 border-b no-print space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Air Freight Manifest</h2>
          <div className="flex items-center gap-2">
            <Button onClick={handleSaveManifest} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Manifest
            </Button>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Manifest
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium w-20">Airline:</label>
              <Select value={selectedAirline} onValueChange={setSelectedAirline}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AIRLINES).map(([key, airline]) => (
                    <SelectItem key={key} value={key}>
                      {airline.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium w-20">MAWB:</label>
              <Input 
                type="text" 
                placeholder="8-9 digits" 
                value={mawbSuffix}
                onChange={(e) => setMawbSuffix(e.target.value)}
                className="w-32"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium w-20">Flight No:</label>
              <Input 
                type="text" 
                placeholder="Flight number" 
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="w-32"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium w-24">Departure:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-40 justify-start text-left font-normal")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(departureDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => date && setDepartureDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Input 
                type="time" 
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-24"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium w-24">Arrival:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-40 justify-start text-left font-normal")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(arrivalDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={arrivalDate}
                    onSelect={(date) => date && setArrivalDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Input 
                type="time" 
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-24"
              />
            </div>
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
                <h1 className="text-lg font-bold">AIR FREIGHT MANIFEST</h1>
                <p className="text-sm">ALMARAAM LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
              </div>
              <div className="text-right text-xs">
                <div>Manifest No: {manifestNumber}</div>
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>Time: {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          {/* MAWB Information */}
          <div className="border border-black mb-3">
            <table className="w-full">
              <tr className="bg-gray-100">
                <td className="font-bold p-2">AIRLINE</td>
                <td className="font-bold p-2">AIRLINE CODE</td>
                <td className="font-bold p-2">MAWB NUMBER</td>
                <td className="font-bold p-2">FLIGHT NUMBER</td>
              </tr>
              <tr>
                <td className="p-2">{AIRLINES[selectedAirline].name}</td>
                <td className="p-2">{AIRLINES[selectedAirline].iataCode}</td>
                <td className="p-2 font-bold">{getMawbNumber()}</td>
                <td className="p-2">{getFlightNumber()}</td>
              </tr>
            </table>
          </div>

          {/* Flight Information */}
          <div className="border border-black mb-3">
            <table className="w-full">
              <tr className="bg-gray-100">
                <td className="font-bold p-2">FLIGHT DETAILS</td>
                <td className="font-bold p-2">ROUTE</td>
                <td className="font-bold p-2">DEPARTURE</td>
                <td className="font-bold p-2">ARRIVAL</td>
              </tr>
              <tr>
                <td className="p-2">{getFlightNumber()}</td>
                <td className="p-2">DOH → CMB</td>
                <td className="p-2">{format(departureDate, 'dd/MM/yyyy')} {departureTime}</td>
                <td className="p-2">{format(arrivalDate, 'dd/MM/yyyy')} {arrivalTime}</td>
              </tr>
            </table>
          </div>

          {/* Cargo Summary */}
          <div className="border border-black mb-3">
            <table className="w-full">
              <tr className="bg-gray-100">
                <td className="font-bold p-2">TOTAL PIECES</td>
                <td className="font-bold p-2">TOTAL WEIGHT (KG)</td>
                <td className="font-bold p-2">TOTAL HAWB</td>
                <td className="font-bold p-2">AIRCRAFT TYPE</td>
              </tr>
              <tr>
                <td className="p-2 text-center font-bold">{getTotalPieces()}</td>
                <td className="p-2 text-center font-bold">{getTotalWeight()}</td>
                <td className="p-2 text-center font-bold">{shipments.length}</td>
                <td className="p-2 text-center">CARGO AIRCRAFT</td>
              </tr>
            </table>
          </div>

          {/* Shipment Details */}
          <div className="border border-black">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1 text-xs">S.No</th>
                  <th className="border border-black p-1 text-xs">HAWB No</th>
                  <th className="border border-black p-1 text-xs">SHIPPER</th>
                  <th className="border border-black p-1 text-xs">CONSIGNEE</th>
                  <th className="border border-black p-1 text-xs">Cartons Box</th>
                  <th className="border border-black p-1 text-xs">PCS</th>
                  <th className="border border-black p-1 text-xs">WEIGHT</th>
                  <th className="border border-black p-1 text-xs">DIMENSIONS (CM)</th>
                  <th className="border border-black p-1 text-xs">DESCRIPTION</th>
                  <th className="border border-black p-1 text-xs">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length > 0 ? shipments.map((shipment, index) => (
                  <tr key={index}>
                    <td className="border border-black p-1 text-center text-xs">{index + 1}</td>
                    <td className="border border-black p-1 text-xs">{shipment.awbNumber || shipment.invoiceNumber || `GY-${index + 13138400}`}</td>
                    <td className="border border-black p-1 text-xs">{shipment.shipper || shipment.shipperName || "SHIPPER NAME"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.consignee || shipment.consigneeName || "CONSIGNEE NAME"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.destination || shipment.consigneeDistrict || "COLOMBO"}</td>
                    <td className="border border-black p-1 text-center text-xs">{shipment.pieces || 1}</td>
                    <td className="border border-black p-1 text-center text-xs">{shipment.weight || "25.0"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.dimensions || shipment.length && shipment.width && shipment.height ? `${shipment.length}×${shipment.width}×${shipment.height}` : "50×50×50"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.description || "PERSONAL EFFECTS"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.remarks || "NIL"}</td>
                  </tr>
                )) : (
                  // Sample data for demonstration
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="border border-black p-1 text-center text-xs">{index + 1}</td>
                      <td className="border border-black p-1 text-xs">GY-1313840{index + 1}</td>
                      <td className="border border-black p-1 text-xs">SAMPLE SHIPPER {index + 1}</td>
                      <td className="border border-black p-1 text-xs">SAMPLE CONSIGNEE {index + 1}</td>
                      <td className="border border-black p-1 text-xs">COLOMBO</td>
                      <td className="border border-black p-1 text-center text-xs">1</td>
                      <td className="border border-black p-1 text-center text-xs">25.0</td>
                      <td className="border border-black p-1 text-xs">50×50×50</td>
                      <td className="border border-black p-1 text-xs">PERSONAL EFFECTS</td>
                      <td className="border border-black p-1 text-xs">NIL</td>
                    </tr>
                  ))
                )}
                {/* Empty rows for formatting */}
                {Array.from({ length: Math.max(0, 10 - shipments.length) }).map((_, index) => (
                  <tr key={`empty-${index}`}>
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
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">
                SIGNATURE
              </div>
            </div>
            
            <div className="w-1/3 px-3 border-l border-black">
              <div className="text-xs font-bold mb-1">CHECKED BY:</div>
              <div className="text-xs">Operations Manager</div>
              <div className="text-xs">Date: {new Date().toLocaleDateString()}</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">
                SIGNATURE & STAMP
              </div>
            </div>

            <div className="w-1/3 pl-3 border-l border-black">
              <div className="text-xs font-bold mb-1">APPROVED BY:</div>
              <div className="text-xs">Manager - Operations & Pricing</div>
              <div className="text-xs">Date: {new Date().toLocaleDateString()}</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">
                MANAGER SIGNATURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaAirManifest;
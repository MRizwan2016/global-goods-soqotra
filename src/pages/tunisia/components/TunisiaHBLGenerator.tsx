import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Printer } from "lucide-react";

interface TunisiaHBLGeneratorProps {
  onBack: () => void;
}

const TunisiaHBLGenerator: React.FC<TunisiaHBLGeneratorProps> = ({ onBack }) => {
  const [hblData, setHblData] = useState({
    blNumber: "2025/04726/15134",
    date: new Date().toISOString().split('T')[0],
    shipper: {
      name: "MR. ALGHAMMAM DHAKER",
      address: "DOHA, QATAR"
    },
    consignee: {
      name: "MR. ALGHAMMAM DHAKER",
      address: "TUNIS, TUNISIA"
    },
    vessel: "SOURCE BLESSING / 531S",
    portOfLoading: "HAMAD SEA PORT",
    portOfDischarge: "TUNIS",
    containerNumber: "MSKU1359156 / 40'HC",
    cargoDescription: "SAID TO CONTAIN\n01 X 40' HC (PART) CONTAINER\n1 UNIT OF RENAULT DUSTER STATION WAGON\nMAKE: RENAULT\nMODEL: DUSTER STATION WAGON\nMODEL YEAR: 2022\nCHASSIS NO: VF1HSRMX2NA014944\nENGINE NO: R039963\nCYLINDERS: 4\nCOLOR: WHITE\nMADE IN ROMANIA\nEXPORT PLATE: 376283\nH.S. CODE: 87032113\nGROSS WEIGHT: 1450 KGS",
    weight: "1,450.00KGS"
  });
  
  const [showPrintView, setShowPrintView] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  if (showPrintView) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center no-print">
          <Button variant="outline" onClick={() => setShowPrintView(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Edit HBL
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print HBL
          </Button>
        </div>

        {/* HBL Print View - Front */}
        <div className="bg-white shadow-lg print:shadow-none" style={{ width: "210mm", height: "297mm", margin: "0 auto", padding: "10mm", fontSize: "10px", lineHeight: "1.2" }}>
          {/* Header */}
          <div className="border-2 border-black mb-2">
            <div className="flex justify-between items-center p-1">
              <div>
                <h1 className="text-lg font-bold">BILL OF LADING</h1>
                <p className="text-xs">FOR MULTIMODAL TRANSPORT OR PORT TO PORT SHIPMENT</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">NEGOTIABLE</p>
                <p className="font-bold text-sm">ORIGINAL</p>
                <div className="border border-black p-1 mt-1">
                  <p className="text-xs">Page</p>
                  <p className="font-bold">1 / 1</p>
                </div>
              </div>
            </div>
          </div>

          {/* BL Number and Reference */}
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-xs"><strong>B/L no.</strong></p>
              <p className="font-bold text-sm">{hblData.blNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs">Reference no.</p>
              <p className="text-sm">256893702</p>
            </div>
          </div>

          {/* Shipper and Agent */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Shipper</p>
              <p className="font-bold text-sm">{hblData.shipper.name}</p>
              <p className="text-xs">{hblData.shipper.address}</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <p className="text-xs">Agent</p>
                <div className="text-center">
                  <h2 className="text-lg font-bold text-green-600">SOQOTRA</h2>
                  <p className="text-xs">LOGISTICS SERVICES AND TRADING</p>
                  <div className="text-xs mt-1">
                    <p>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING W.L.L.</p>
                    <p>Office 3, 1st Floor, Building 53, Street 76, Azizja Commercial Street,</p>
                    <p>P.O. Box: 55881, Al Aziziyah, Doha, State of Qatar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consignee */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Consignee</p>
              <p className="font-bold text-sm">{hblData.consignee.name}</p>
              <p className="text-xs">{hblData.consignee.address}</p>
            </div>
            <div>
              <p className="text-xs">Name of carrier</p>
              <p className="font-bold text-sm">MAERSK LINE</p>
            </div>
          </div>

          {/* Vessel and Port Information */}
          <div className="grid grid-cols-4 gap-1 mb-2 text-xs">
            <div className="border border-black p-1">
              <p className="font-bold">Vessel</p>
              <p>{hblData.vessel}</p>
            </div>
            <div className="border border-black p-1">
              <p className="font-bold">Port of loading</p>
              <p>{hblData.portOfLoading}</p>
            </div>
            <div className="border border-black p-1">
              <p className="font-bold">Port of discharge</p>
              <p>{hblData.portOfDischarge}</p>
            </div>
            <div className="border border-black p-1">
              <p className="font-bold">Final destination</p>
              <p>TUNIS</p>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="border border-black mb-2">
            <div className="grid grid-cols-4 gap-0">
              <div className="border-r border-black p-1">
                <p className="text-xs font-bold">Marks and nos; Container no.</p>
              </div>
              <div className="border-r border-black p-1 col-span-2">
                <p className="text-xs font-bold">Number and kind of packages; Description of goods</p>
              </div>
              <div className="p-1">
                <p className="text-xs font-bold">Gross weight</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-0" style={{ minHeight: "120px" }}>
              <div className="border-r border-black p-1">
                <p className="text-xs">{hblData.containerNumber}</p>
                <p className="text-xs">SEAL: ML-SA0029977</p>
              </div>
              <div className="border-r border-black p-1 col-span-2">
                <div className="whitespace-pre-line text-xs">
                  {hblData.cargoDescription}
                </div>
                <div className="mt-4 text-center">
                  <p className="font-bold text-xs">SHIPPER ON BOARD : 03/08/2025</p>
                </div>
              </div>
              <div className="p-1">
                <p className="font-bold text-xs">{hblData.weight}</p>
              </div>
            </div>
          </div>

          {/* Legal Text & Footer */}
          <div className="text-xs leading-tight mb-2">
            <p className="font-bold">
              RECEIVED the goods in apparent good order and condition and, as far as ascertained by 
              reasonable means of checking, as specified above unless otherwise stated.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="font-bold">Freight payable at</p>
              <p>DOHA, QATAR</p>
              <br />
              <p className="font-bold">Number of original Bs/L</p>
              <p>1</p>
            </div>
            <div>
              <p className="font-bold">Place and date of issue</p>
              <p>DOHA, QATAR 2025-08-03</p>
            </div>
            <div>
              <p className="font-bold">Signature</p>
              <div className="h-8 border-b border-black mt-4"></div>
            </div>
          </div>
        </div>

        <style>{`
          @media print {
            * {
              visibility: hidden !important;
            }
            
            /* Only show the HBL container and its children */
            .bg-white[style*="210mm"],
            .bg-white[style*="210mm"] * {
              visibility: visible !important;
            }
            
            /* Hide everything else completely */
            body > div:not(:has(.bg-white[style*="210mm"])) {
              display: none !important;
            }
            
            /* Reset body and html margins */
            body, html {
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Hide any navigation, buttons, or dashboard elements */
            .no-print, nav, aside, header:not(.print-header), 
            footer:not(.print-footer), button, .sidebar,
            [role="navigation"], [role="banner"], [role="complementary"] {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* Ensure HBL fits properly on A4 */
            .bg-white[style*="210mm"] {
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 10mm !important;
              font-size: 10px !important;
              line-height: 1.2 !important;
              box-sizing: border-box !important;
            }
            
            @page { 
              size: A4; 
              margin: 0mm; 
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Tunisia House Bill of Lading Generator</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>HBL Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">B/L Number</label>
              <Input
                value={hblData.blNumber}
                onChange={(e) => setHblData(prev => ({ ...prev, blNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={hblData.date}
                onChange={(e) => setHblData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cargo Description</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Detailed Description</label>
              <Textarea
                rows={8}
                value={hblData.cargoDescription}
                onChange={(e) => setHblData(prev => ({ ...prev, cargoDescription: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setShowPrintView(true)}>
              Generate HBL
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TunisiaHBLGenerator;
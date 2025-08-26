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
        <div className="bg-white shadow-lg print:shadow-none print-page" style={{ width: "210mm", height: "297mm", margin: "0 auto", padding: "8mm", fontSize: "9px", lineHeight: "1.1" }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-1">
            <div>
              <h1 className="text-base font-bold">BILL OF LADING</h1>
              <p className="text-xs">FOR MULTIMODAL TRANSPORT OR PORT TO PORT SHIPMENT</p>
            </div>
            <div className="text-right">
              <div className="flex gap-4">
                <p className="font-bold text-sm">NEGOTIABLE</p>
                <p className="font-bold text-sm">ORIGINAL</p>
              </div>
              <div className="border border-black p-1 mt-1 inline-block">
                <p className="text-xs">Page</p>
                <p className="font-bold text-center">1 / 1</p>
              </div>
            </div>
          </div>

          {/* Shipper Section */}
          <div className="border border-black mb-1">
            <div className="border-b border-black p-1">
              <p className="text-xs font-bold">Shipper</p>
            </div>
            <div className="p-1">
              <p className="font-bold text-sm">{hblData.shipper.name}</p>
              <p className="text-xs">{hblData.shipper.address}</p>
            </div>
          </div>

          {/* BL Number and Reference */}
          <div className="flex justify-between mb-1">
            <div>
              <p className="text-xs"><strong>B/L no.</strong></p>
              <p className="font-bold text-sm">{hblData.blNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs">Reference no.</p>
              <p className="text-sm">256893702</p>
            </div>
          </div>

          {/* Agent Section */}
          <div className="text-center mb-1">
            <p className="text-xs">Agent</p>
            <h2 className="text-lg font-bold text-green-600">SOQOTRA</h2>
            <p className="text-xs font-bold">LOGISTICS SERVICES AND TRADING</p>
            <div className="text-xs mt-1">
              <p>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING W.L.L.</p>
              <p>Office 3, 1st Floor, Building 53, Street 76, Azizja Commercial Street,</p>
              <p>P.O. Box: 55881, Al Aziziyah, Doha, State of Qatar.</p>
            </div>
          </div>

          {/* Consignee Section */}
          <div className="border border-black mb-1">
            <div className="border-b border-black p-1">
              <p className="text-xs font-bold">Consignee</p>
            </div>
            <div className="p-1">
              <p className="font-bold text-sm">{hblData.consignee.name}</p>
              <p className="text-xs">{hblData.consignee.address}</p>
            </div>
          </div>

          {/* Carrier and Export References */}
          <div className="grid grid-cols-2 gap-2 mb-1">
            <div>
              <p className="text-xs">Name of carrier</p>
              <p className="font-bold text-sm">MAERSK LINE</p>
            </div>
            <div>
              <p className="text-xs">Export references</p>
              <p className="text-sm">256893702</p>
            </div>
          </div>

          {/* Notify Address */}
          <div className="border border-black mb-1">
            <div className="border-b border-black p-1">
              <p className="text-xs font-bold">Notify address</p>
            </div>
            <div className="p-1">
              <p className="font-bold text-sm">{hblData.consignee.name}</p>
              <p className="text-xs">{hblData.consignee.address}</p>
            </div>
          </div>

          {/* Booking Number and Notes */}
          <div className="grid grid-cols-2 gap-2 mb-1">
            <div>
              <p className="text-xs">Booking no.</p>
              <p className="text-sm">256893702</p>
            </div>
            <div>
              <p className="text-xs">Notes</p>
              <div className="text-xs">
                <p><strong>IPSEN LOGISTICS SOLUTION,</strong></p>
                <p><strong>ZONE PORTUAIRE RADES, ROUTE DU BAC, 2040,</strong></p>
                <p><strong>RADES, TUNISIA.</strong></p>
                <p><strong>TEL: +216 31 300 250 / +216 70 016 101</strong></p>
                <p><strong>EMAIL: c.fouza@ipsenlogistics.com.tn</strong></p>
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="grid grid-cols-4 gap-1 mb-1">
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Pre-carriage by</p>
            </div>
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Place of receipt by pre-carrier</p>
            </div>
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Vessel</p>
              <p className="text-xs">{hblData.vessel}</p>
            </div>
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Port of loading</p>
              <p className="text-xs">{hblData.portOfLoading}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 mb-1">
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Port of discharge</p>
              <p className="text-xs">{hblData.portOfDischarge}</p>
            </div>
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Place of delivery by on-carrier</p>
              <p className="text-xs">TUNIS</p>
            </div>
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Marks and nos; Container no.</p>
            </div>
            <div className="border border-black p-1">
              <p className="text-xs font-bold">Number and kind of packages; Description of goods</p>
            </div>
          </div>

          {/* Main Cargo Section */}
          <div className="border border-black mb-1">
            <div className="grid grid-cols-12 gap-0" style={{ minHeight: "100px" }}>
              <div className="border-r border-black p-1 col-span-2">
                <p className="text-xs">{hblData.containerNumber}</p>
                <p className="text-xs">SEAL: ML-SA0029977</p>
              </div>
              <div className="border-r border-black p-1 col-span-8">
                <div className="whitespace-pre-line text-xs">
                  {hblData.cargoDescription}
                </div>
                <div className="mt-4 text-center">
                  <p className="font-bold text-xs">SHIPPER ON BOARD :03/08/2025</p>
                </div>
              </div>
              <div className="border-r border-black p-1 col-span-1 text-center">
                <p className="text-xs font-bold">Gross weight</p>
                <p className="font-bold text-xs">{hblData.weight}</p>
              </div>
              <div className="p-1 col-span-1 text-center">
                <p className="text-xs font-bold">Measurement</p>
                <p className="text-xs">00</p>
              </div>
            </div>
          </div>

          {/* Freight Details */}
          <div className="grid grid-cols-4 gap-1 mb-1 text-xs">
            <div className="border border-black p-1">
              <p className="font-bold">Freight details</p>
            </div>
            <div className="border border-black p-1">
              <p className="font-bold">Charges</p>
            </div>
            <div className="border border-black p-1">
              <p className="font-bold">Currency</p>
            </div>
            <div className="border border-black p-1">
              <p className="font-bold">Declared value</p>
            </div>
          </div>

          {/* Legal Text */}
          <div className="text-xs leading-tight mb-1">
            <p className="font-bold">
              RECEIVED the goods in apparent good order and condition and, as far as ascertained by 
              reasonable means of checking, as specified above unless otherwise stated.
            </p>
            <p className="mt-1">
              The Carrier, in accordance with and to the extent of the provisions contained in this Bill of 
              Lading, shall have liberty to sub-contract, undertakes to perform and/or to procure 
              performance of the combined transport and the delivery of the goods, including all 
              services related thereto, from the place and time of taking the goods in charge to the place and 
              time of delivery and accepts responsibility for such transport and such services.
            </p>
            <p className="mt-1">
              One of the Bills of Lading must be surrendered duly endorsed in exchange for the goods or 
              delivery order.
            </p>
            <p className="mt-1">
              IN WITNESS whereof Bill(s) of Lading has/have been signed in the number indicated below, 
              one of which being accomplished the other(s) to be void.
            </p>
          </div>

          {/* Footer */}
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

        {/* HBL Print View - Back Side */}
        <div className="bg-white shadow-lg print:shadow-none print-page mt-4" style={{ width: "210mm", height: "297mm", margin: "0 auto", padding: "8mm", fontSize: "8px", lineHeight: "1.1", pageBreakBefore: "always" }}>
          <div className="text-xs">
            <h2 className="font-bold mb-2">Definitions</h2>
            <div className="space-y-1 text-justify">
              <p><strong>"BL"</strong> means Bill of Lading.</p>
              <p><strong>"Carrier"</strong> means the Multimodal Transport Operator who issues this BL and is named on the face of it and assumes liability as set out herein for the performance of multimodal transport.</p>
              <p><strong>"Merchant"</strong> means and includes the Shipper, the Consignee, the Consignor, the Holder of this BL, the Receiver and the Owner of the Goods.</p>
              <p><strong>"Goods"</strong> means the cargo described on the face hereof as accepted by the Carrier.</p>
              <p><strong>"Consignee"</strong> means the person entitled to receive the goods from the Carrier.</p>
              <p><strong>"Taken in charge"</strong> means that the goods have been handed over to and received for carriage by the Carrier at the place named for that purpose in this BL.</p>
              <p><strong>"Goods"</strong> means any property including live animals as well as containers, pallets or similar articles of transport or packaging not supplied by the Carrier, irrespective of whether such property is a ship or in partial or total under deck.</p>
            </div>

            <h3 className="font-bold mt-4 mb-2">1. Applicability</h3>
            <p className="mb-2">The provisions of the heading "Multimodal Transport" these conditions shall also apply if only one mode of transport is performed.</p>

            <h3 className="font-bold mt-4 mb-2">2. Issuance of this BL</h3>
            <p className="mb-2">2.1. By accepting delivery of this BL the Carrier gives undertaking to carry or arrange the carriage of the goods from the place of acceptance or taking in charge to the place of delivery designated in this BL.</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-bold mb-2">2.2. Identity Liability and limits of a Person concluding a contract</h3>
                <p className="mb-2">Only when this BL is signed by the Carrier and when the person(s) acting within the scope of their employment, or any other person of whose services he makes use for the performance of the contract set out in this BL, shall be responsible for any loss or damage.</p>
                
                <h3 className="font-bold mb-2">3.1. The BL is issued in a negotiable form unless it is marked "non-negotiable"</h3>
                <p className="mb-2">It shall constitute title to the goods and the holder hereof being entitled hereon mentioned.</p>
                
                <h3 className="font-bold mb-2">3.2. Description of Goods</h3>
                <p className="mb-2">No description of goods on this BL unless such information unless is contrary indication, such as shipper's weight load and count - shipper packed containers or similar commodities has been made in his own proper inspection thereof.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">8.3. Subject to the provisions of subclauses 8.1. and 8.2. inclusive</h3>
                <p className="mb-2">The Carrier shall in no event be or become liable for any loss of or damage to the goods in an amount exceeding the equivalent of 666.67 SDR per package or unit or 2 SDR per kilo of gross weight of the goods lost or damaged, whichever is the higher, unless the nature and value of the goods have been declared by the Merchant before shipment and inserted in this BL and extra freight paid.</p>
                
                <h3 className="font-bold mb-2">8.4. Where goods are carried on or under deck</h3>
                <p className="mb-2">If any container or freight unit stowed on deck is lost overboard or jettisoned, the liability of the Carrier shall be limited to an amount not exceeding one half of the limitation of liability.</p>
                
                <h3 className="font-bold mb-2">8.5. Where the Carrier establishes that in the circumstances of the case</h3>
                <p className="mb-2">The loss or damage could not have resulted from any wrongful act or negligence on his part.</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-bold mb-2">9. Notice of loss or damage and time for suit</h3>
              <p className="mb-2">9.1. Unless notice of loss or damage and the general nature of such loss or damage be given in writing to the Carrier at the latest before the removal of the goods, such removal shall be prima facie evidence of the delivery by the Carrier of the goods as described in this BL.</p>
              
              <h3 className="font-bold mb-2">10. Both to blame collision clause</h3>
              <p className="mb-2">If the ship comes into collision with another ship as a result of the negligence of the other ship and any act, neglect or default of the Master, mariner, pilot or the servants of the Carrier in the navigation or in the management of the ship, the Merchant will indemnify the Carrier against all claims by or liability to the other ship.</p>
              
              <h3 className="font-bold mb-2">11. Method and Route of Transportation</h3>
              <p className="mb-2">11.1. Subject to the provisions set out in the BL, the Carrier has the liberty to carry the goods on or under deck and to choose or substitute the means, route and procedure to be followed in the handling, stowage, carriage and transportation of the goods.</p>
              
              <h3 className="font-bold mb-2">12. Delivery</h3>
              <p className="mb-2">12.1. Goods shall be deemed to be delivered when they have been handed over or placed at the disposal of the Consignee or of the person entitled to delivery in accordance with the contract or with the customs, laws or practices.</p>
              
              <h3 className="font-bold mb-2">13. Freight and Charges</h3>
              <p className="mb-2">13.1. Freight shall be considered as earned in full, without any reduction or detriment on account of any claim, counter claim or set-off.</p>
              
              <h3 className="font-bold mb-2">14. Lien</h3>
              <p className="mb-2">The Carrier shall have a lien on the goods and any documents relating thereto for any amount due at any time to the Carrier under this BL and for the cost of recovering same, and may enforce such lien in any reasonable manner which he may think fit.</p>
              
              <h3 className="font-bold mb-2">15. Variation</h3>
              <p className="mb-2">No servant or agent of the Carrier is empowered to waive or vary any of these terms unless such waiver or variation is in writing and signed by a director or officer of the Carrier.</p>
              
              <h3 className="font-bold mb-2">16. Law and Jurisdiction</h3>
              <p className="mb-2">16.1. Any dispute arising under this BL shall be decided according to English Law and any claim or action shall be brought within one year after delivery of the goods or the date when the goods should have been delivered.</p>
            </div>
          </div>
        </div>

        <style>{`
          @media print {
            /* Hide everything first */
            body * {
              visibility: hidden !important;
            }
            
            /* Reset page settings */
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              height: auto !important;
              overflow: visible !important;
            }
            
            /* Show only print pages */
            .print-page,
            .print-page * {
              visibility: visible !important;
            }
            
            /* Position print pages correctly */
            .print-page {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 8mm !important;
              box-sizing: border-box !important;
              page-break-after: always !important;
            }
            
            /* Hide all other elements */
            .no-print,
            nav, aside, header, footer, button,
            [role="navigation"], [role="banner"], [role="complementary"],
            .sidebar, .dashboard, .container > *:not(.print-page) {
              display: none !important;
              visibility: hidden !important;
            }
            
            @page {
              size: A4;
              margin: 0;
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
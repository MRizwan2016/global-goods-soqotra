import React from "react";
import { HouseBillOfLading } from "../types/tunisiaInvoiceTypes";

interface HouseBillOfLadingDocumentProps {
  hbl: HouseBillOfLading;
}

const HouseBillOfLadingDocument: React.FC<HouseBillOfLadingDocumentProps> = ({ hbl }) => {
  return (
    <div className="hbl-document"
         style={{
           width: '100%',
           height: 'auto',
           backgroundColor: 'white',
           color: 'black'
         }}>
      {/* HBL Content */}
      {/* FRONT PAGE - Full A4 size with inline styles for print */}
      <div 
        className="hbl-front-page"
        style={{
          width: '210mm',
          height: '297mm',
          margin: '0 auto',
          padding: '10mm',
          backgroundColor: 'white',
          color: 'black',
          boxSizing: 'border-box',
          pageBreakAfter: 'always',
          pageBreakInside: 'avoid',
          display: 'block',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="border-2 border-black mb-4">
          <div className="grid grid-cols-12 text-xs">
            {/* Left section */}
            <div className="col-span-8 border-r border-black">
              <div className="p-2 border-b border-black">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-lg font-bold">BILL OF LADING</h1>
                    <p className="text-xs">FOR MULTIMODAL TRANSPORT OR PORT TO PORT SHIPMENT</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">NEGOTIABLE</p>
                    <p className="font-bold">ORIGINAL</p>
                  </div>
                </div>
              </div>

              {/* Shipper */}
              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Shipper</div>
                <div className="text-sm">
                  <p className="font-semibold">{hbl.shipper.name}</p>
                  <p>{hbl.shipper.address}</p>
                  {hbl.shipper.phone && <p>{hbl.shipper.phone}</p>}
                </div>
              </div>

              {/* Consignee */}
              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Consignee</div>
                <div className="text-sm">
                  <p className="font-semibold">{hbl.consignee.name}</p>
                  <p>{hbl.consignee.address}</p>
                  {hbl.consignee.idNumber && <p>ID: {hbl.consignee.idNumber}</p>}
                </div>
              </div>

              {/* Notify address */}
              {hbl.notifyParty && (
                <div className="p-2 border-b border-black">
                  <div className="text-xs font-bold mb-1">Notify address</div>
                  <div className="text-sm">
                    <p className="font-semibold">{hbl.notifyParty.name}</p>
                    <p>{hbl.notifyParty.address}</p>
                  </div>
                </div>
              )}

              {/* Pre-carriage and vessel info */}
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black border-b border-black">
                  <div className="text-xs font-bold mb-1">Pre-carriage by</div>
                  <div className="text-sm min-h-[40px]"></div>
                </div>
                <div className="p-2 border-b border-black">
                  <div className="text-xs font-bold mb-1">Place of receipt by pre-carrier</div>
                  <div className="text-sm min-h-[40px]"></div>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black border-b border-black">
                  <div className="text-xs font-bold mb-1">Vessel</div>
                  <div className="text-sm">{hbl.vessel}</div>
                </div>
                <div className="p-2 border-b border-black">
                  <div className="text-xs font-bold mb-1">Port of loading</div>
                  <div className="text-sm">{hbl.portOfLoading}</div>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black border-b border-black">
                  <div className="text-xs font-bold mb-1">Port of discharge</div>
                  <div className="text-sm">{hbl.portOfDischarge}</div>
                </div>
                <div className="p-2 border-b border-black">
                  <div className="text-xs font-bold mb-1">Place of delivery by on-carrier</div>
                  <div className="text-sm">{hbl.finalDestination}</div>
                </div>
              </div>

              {/* Container and cargo details */}
              <div className="p-2">
                <div className="grid grid-cols-12 text-xs font-bold border-b border-gray-400 pb-1 mb-2">
                  <div className="col-span-4">Marks and nos; Container no.</div>
                  <div className="col-span-4">Number and kind of packages; Description of goods</div>
                  <div className="col-span-2">Gross weight</div>
                  <div className="col-span-2">Measurement</div>
                </div>
                <div className="min-h-[200px]">
                  <div className="text-sm space-y-2">
                    <p><strong>{hbl.containerNumber}</strong></p>
                    <p><strong>SEAL:</strong> {hbl.sealNumber}</p>
                    <div className="mt-4">
                      <p><strong>{hbl.cargo.description}</strong></p>
                      <p><strong>Packages:</strong> {hbl.cargo.packages}</p>
                      {hbl.cargo.marks && <p><strong>Marks:</strong> {hbl.cargo.marks}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{hbl.cargo.weight}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="col-span-4">
              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">B/L no.</div>
                <div className="text-sm font-bold">{hbl.blNumber}</div>
              </div>

              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Reference no.</div>
                <div className="text-sm">{hbl.id}</div>
              </div>

              {/* Company logo/info */}
              <div className="p-2 border-b border-black text-center">
                <div className="text-lg font-bold text-green-600">SOQOTRA</div>
                <div className="text-xs">LOGISTICS SERVICES AND TRADING</div>
                <div className="text-xs mt-2">
                  <p>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING W.L.L.</p>
                  <p>Office 3, 1st Floor, Building: 53, Street 76, Azzia Commercial Street,</p>
                  <p>P.O. Box: 55561, Al Aziziyah, Doha, State of Qatar.</p>
                </div>
              </div>

              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Name of carrier</div>
                <div className="text-sm">{hbl.carrier}</div>
              </div>

              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Export references</div>
                <div className="text-sm">{hbl.id}</div>
              </div>

              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Booking no.</div>
                <div className="text-sm">{hbl.id}</div>
              </div>

              <div className="p-2">
                <div className="text-xs font-bold mb-1">Notes</div>
                <div className="text-xs min-h-[300px]">
                  {hbl.specialInstructions && (
                    <div className="mb-4">
                      <p className="font-bold">SPECIAL INSTRUCTIONS:</p>
                      <p>{hbl.specialInstructions}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <p><strong>IPSEN LOGISTICS SOLUTION,</strong></p>
                    <p><strong>ZONE PORTUAIRE RADES, ROUTE DU BAC, 2040,</strong></p>
                    <p><strong>RADES, TUNISIA.</strong></p>
                    <p><strong>TEL: +216 31 300 250 / +216 70 016 101</strong></p>
                    <p><strong>EMAIL: c.fouzi@ipsenlogistics.com.tn</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BACK PAGE - Full A4 size with inline styles for print */}
      <div 
        className="hbl-back-page"
        style={{
          width: '210mm',
          height: '297mm',
          margin: '0 auto',
          padding: '10mm',
          backgroundColor: 'white',
          color: 'black',
          boxSizing: 'border-box',
          pageBreakBefore: 'always',
          pageBreakInside: 'avoid',
          display: 'block',
          overflow: 'hidden'
        }}
      >
        {/* Terms and Conditions */}
        <div className="border-2 border-black">
          <div className="border-b border-black">
            <div className="grid grid-cols-12 text-xs">
              <div className="col-span-3 p-2 border-r border-black">
                <div className="font-bold mb-1">Freight details</div>
              </div>
              <div className="col-span-3 p-2 border-r border-black">
                <div className="font-bold mb-1">Charges</div>
              </div>
              <div className="col-span-2 p-2 border-r border-black">
                <div className="font-bold mb-1">Currency</div>
              </div>
              <div className="col-span-2 p-2 border-r border-black">
                <div className="font-bold mb-1">Declared value</div>
              </div>
              <div className="col-span-2 p-2">
                <div className="font-bold mb-1">particulars furnished by shipper</div>
              </div>
            </div>
          </div>

          <div className="p-4 text-xs space-y-2">
            <div className="text-center font-bold text-lg mb-4">TERMS AND CONDITIONS</div>
            
            <div className="space-y-2">
              <p><strong>1. DEFINITIONS</strong></p>
              <p>"Carrier" means SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING W.L.L. on whose behalf this Bill of Lading has been signed.</p>
              <p>"Merchant" includes the shipper, consignee, receiver, holder of this Bill of Lading and the owner of the goods.</p>
              
              <p><strong>2. CARRIER'S RESPONSIBILITY</strong></p>
              <p>The Carrier shall be liable for loss or damage to the goods occurring between the time when the goods are loaded on and the time when they are discharged from the vessel, but not otherwise.</p>
              
              <p><strong>3. LIMITATION OF LIABILITY</strong></p>
              <p>The Carrier's liability shall not exceed the lesser of the actual value of the goods lost or damaged or the equivalent of 2 Special Drawing Rights per kilogram of gross weight of the goods lost or damaged.</p>
              
              <p><strong>4. NOTICE OF CLAIM</strong></p>
              <p>Unless notice of loss or damage and the general nature of such loss or damage is given in writing to the Carrier before or at the time of removal of the goods, such removal shall be prima facie evidence of delivery by the Carrier of the goods as described in this Bill of Lading.</p>
              
              <p><strong>5. TIME BAR</strong></p>
              <p>The Carrier shall be discharged from all liability in respect of loss or damage unless suit is brought within one year after delivery of the goods or the date when the goods should have been delivered.</p>
              
              <p><strong>6. GENERAL AVERAGE</strong></p>
              <p>General Average shall be adjusted according to York-Antwerp Rules 1994 and settled at any port or place at the option of the Carrier.</p>
              
              <p><strong>7. GOVERNING LAW</strong></p>
              <p>This Bill of Lading shall be governed by and construed in accordance with English law and any dispute arising hereunder shall be decided in the English courts.</p>
              
              <p><strong>8. BOTH TO BLAME COLLISION CLAUSE</strong></p>
              <p>If the ship comes into collision with another ship as a result of the negligence of the other ship and any act, neglect or default of the master, mariner, pilot or the servants of the Carrier in the navigation or in the management of the ship, the merchants will indemnify the Carrier against all loss or liability.</p>
            </div>
            
            <div className="mt-4 pt-2 border-t border-black">
              <p><strong>RECEIVED</strong> the goods herein described in apparent good order and condition unless otherwise noted above to be transported and delivered subject to the terms and conditions herein.</p>
              <p><strong>IN WITNESS WHEREOF</strong>, the number of Bills of Lading indicated below have been signed, one of which being accomplished, the others to stand void.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-t border-black">
            <div className="p-2 border-r border-black">
              <div className="text-xs font-bold mb-1">Freight payable at</div>
              <div className="text-sm">{hbl.freightDetails.place}</div>
            </div>
            <div className="p-2 border-r border-black">
              <div className="text-xs font-bold mb-1">Place and date of issue</div>
              <div className="text-sm">{hbl.freightDetails.place}, {hbl.freightDetails.dateOfIssue}</div>
            </div>
            <div className="p-2">
              <div className="text-xs font-bold mb-1">Signature</div>
              <div className="text-sm">
                <p><strong>Number of original Bs/L</strong></p>
                <p>1</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-center mt-4">
          <p>AWBEDITOR.COM</p>
        </div>
      </div>
    </div>
  );
};

export default HouseBillOfLadingDocument;
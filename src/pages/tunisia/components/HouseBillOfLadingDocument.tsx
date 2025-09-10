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
        {/* Main Border Container */}
        <div className="border-2 border-black min-h-full">
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-black">
            {/* Left section - 8 columns */}
            <div className="col-span-8 border-r border-black">
              <div className="p-2 border-b border-black">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-lg font-bold">BILL OF LADING</h1>
                    <p className="text-xs">FOR MULTIMODAL TRANSPORT OR PORT TO PORT SHIPMENT</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">NEGOTIABLE</p>
                    <p className="font-bold text-lg">ORIGINAL</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right section - 4 columns */}
            <div className="col-span-4">
              <div className="p-2 border-b border-black">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Page</span>
                  <div className="border border-black px-2 py-1 text-xs">1 / 1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              {/* Shipper Section */}
              <div className="p-2 border-b border-black">
                <div className="text-xs font-bold mb-1">Shipper</div>
                <div className="text-sm">
                  <p className="font-bold">{hbl.shipper.name}</p>
                  <p>{hbl.shipper.address}</p>
                  {hbl.shipper.phone && <p>{hbl.shipper.phone}</p>}
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-2 border-b border-black">
                <div className="text-xs mb-1">B/L no.</div>
                <div className="text-sm font-bold">{hbl.blNumber}</div>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black">
                  <div className="text-xs mb-1">Agent</div>
                  <div className="text-sm min-h-[60px] flex items-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600 mb-1">SOQOTRA</div>
                      <div className="text-xs font-bold">LOGISTICS SERVICES AND TRADING</div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs mb-1"></div>
                  <div className="text-xs">
                    <p>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING W.L.L.</p>
                    <p>Office 3, 1st Floor, Building: 53, Street 76, Azzia Commercial Street,</p>
                    <p>P.O. Box: 55561, Al Aziziyah, Doha, State of Qatar.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-2">
                <div className="text-xs mb-1">Reference no.</div>
                <div className="text-sm">{hbl.id.slice(-8)}</div>
              </div>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              {/* Consignee Section */}
              <div className="p-2">
                <div className="text-xs font-bold mb-1">Consignee</div>
                <div className="text-sm">
                  <p className="font-bold">{hbl.consignee.name}</p>
                  <p>{hbl.consignee.address}</p>
                  {hbl.consignee.idNumber && <p>ID: {hbl.consignee.idNumber}</p>}
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-2">
                <div className="text-xs mb-1">Name of carrier</div>
                <div className="text-sm font-bold">{hbl.carrier}</div>
              </div>
            </div>
          </div>

          {/* Fifth Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              {/* Notify address Section */}
              <div className="p-2">
                <div className="text-xs font-bold mb-1">Notify address</div>
                <div className="text-sm">
                  {hbl.notifyParty ? (
                    <>
                      <p className="font-bold">{hbl.notifyParty.name}</p>
                      <p>{hbl.notifyParty.address}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold">{hbl.consignee.name}</p>
                      <p>{hbl.consignee.address}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-2">
                <div className="text-xs mb-1">Export references</div>
                <div className="text-sm">{hbl.id.slice(-8)}</div>
              </div>
            </div>
          </div>

          {/* Sixth Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black">
                  <div className="text-xs mb-1">Pre-carriage by</div>
                  <div className="text-sm min-h-[30px]"></div>
                </div>
                <div className="p-2">
                  <div className="text-xs mb-1">Place of receipt by pre-carrier</div>
                  <div className="text-sm min-h-[30px]"></div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-2">
                <div className="text-xs mb-1">Booking no.</div>
                <div className="text-sm">{hbl.id.slice(-8)}</div>
              </div>
            </div>
          </div>

          {/* Seventh Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black">
                  <div className="text-xs mb-1">Vessel</div>
                  <div className="text-sm font-bold">{hbl.vessel}</div>
                </div>
                <div className="p-2">
                  <div className="text-xs mb-1">Port of loading</div>
                  <div className="text-sm font-bold">{hbl.portOfLoading}</div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-2">
                <div className="text-xs mb-1">Notes</div>
                <div className="text-xs">
                  <p className="font-bold">IPSEN LOGISTICS SOLUTION,</p>
                  <p className="font-bold">ZONE PORTUAIRE RADES, ROUTE DU BAC, 2040,</p>
                  <p className="font-bold">RADES, TUNISIA.</p>
                  <p className="font-bold">TEL: +216 31 300 250 / +216 70 016 101</p>
                  <p className="font-bold">EMAIL: c.fouzi@ipsenlogistics.com.tn</p>
                  {hbl.specialInstructions && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="font-bold">SPECIAL INSTRUCTIONS:</p>
                      <p>{hbl.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Eighth Row */}
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 border-r border-black">
              <div className="grid grid-cols-2">
                <div className="p-2 border-r border-black">
                  <div className="text-xs mb-1">Port of discharge</div>
                  <div className="text-sm font-bold">{hbl.portOfDischarge}</div>
                </div>
                <div className="p-2">
                  <div className="text-xs mb-1">Place of delivery by on-carrier</div>
                  <div className="text-sm font-bold">{hbl.finalDestination}</div>
                </div>
              </div>
            </div>
            <div className="col-span-4 border-t border-black"></div>
          </div>

          {/* Cargo Details Table Header */}
          <div className="grid grid-cols-12">
            <div className="col-span-8 border-r border-black">
              <div className="grid grid-cols-8 text-xs font-bold border-b border-black">
                <div className="col-span-2 p-1 border-r border-black">Marks and nos; Container no.</div>
                <div className="col-span-4 p-1 border-r border-black">Number and kind of packages; Description of goods</div>
                <div className="col-span-1 p-1 border-r border-black">Gross weight</div>
                <div className="col-span-1 p-1">Measurement</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="grid grid-cols-4 text-xs font-bold border-b border-black">
                <div className="col-span-1 p-1 border-r border-black">particulars furnished by shipper</div>
                <div className="col-span-3 p-1"></div>
              </div>
            </div>
          </div>

          {/* Cargo Details Content */}
          <div className="grid grid-cols-12 min-h-[300px]">
            <div className="col-span-8 border-r border-black">
              <div className="grid grid-cols-8 h-full">
                <div className="col-span-2 p-2 border-r border-black">
                  <div className="text-sm space-y-1">
                    <p className="font-bold">{hbl.containerNumber}</p>
                    <p><strong>SEAL:</strong> {hbl.sealNumber}</p>
                  </div>
                </div>
                <div className="col-span-4 p-2 border-r border-black">
                  <div className="text-xs space-y-1">
                    <p className="font-bold">SAID TO CONTAIN</p>
                    <p className="font-bold">{hbl.cargo.packages}</p>
                    <div className="whitespace-pre-line mt-2">
                      {hbl.cargo.description}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-bold">SHIPPER ON BOARD :{new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 p-2 border-r border-black">
                  <div className="text-sm text-center">
                    <p className="font-bold">{hbl.cargo.weight}</p>
                  </div>
                </div>
                <div className="col-span-1 p-2">
                  <div className="text-sm text-center">
                    <p className="font-bold">00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4"></div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-black">
            <div className="grid grid-cols-5 text-xs">
              <div className="p-2 border-r border-black">
                <div className="font-bold mb-1">Freight details</div>
              </div>
              <div className="p-2 border-r border-black">
                <div className="font-bold mb-1">Charges</div>
              </div>
              <div className="p-2 border-r border-black">
                <div className="font-bold mb-1">Currency</div>
              </div>
              <div className="p-2 border-r border-black">
                <div className="font-bold mb-1">Declared value</div>
              </div>
              <div className="p-2">
                <div className="font-bold mb-1">particulars furnished by shipper</div>
              </div>
            </div>
            <div className="border-t border-black p-4 text-xs">
              <p><strong>RECEIVED</strong> the goods in apparent good order and condition and, as far as ascertained by reasonable means of checking, as specified above unless otherwise stated.</p>
              <p>The Carrier, in accordance with and to the extent of the provisions contained in this Bill of Lading, undertakes to perform and/or to procure performance of the combined transport and the delivery of the goods, including all services related thereto and including the taking in charge and delivery of the goods.</p>
              <p>The merchant and accepts responsibility for such transport and such services.</p>
              <p>One of the Bills of Lading must be surrendered duly endorsed in exchange for the goods or delivery order.</p>
              <p><strong>IN WITNESS WHEREOF</strong> Bill(s) of Lading have/has been signed in the number indicated below, one of which being accomplished the other(s) to be void.</p>
            </div>
            <div className="border-t border-black">
              <div className="grid grid-cols-3">
                <div className="p-2 border-r border-black">
                  <div className="text-xs font-bold mb-1">Freight payable at</div>
                  <div className="text-sm">{hbl.freightDetails.place}</div>
                </div>
                <div className="p-2 border-r border-black">
                  <div className="text-xs font-bold mb-1">Place and date of issue</div>
                  <div className="text-sm">{hbl.freightDetails.place} {hbl.freightDetails.dateOfIssue}</div>
                </div>
                <div className="p-2">
                  <div className="text-xs font-bold mb-1">Signature</div>
                  <div className="text-sm">
                    <div className="text-xs font-bold mb-1">Number of original Bs/L</div>
                    <div className="text-lg font-bold">1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-center mt-2">
          <p>AWBEDITOR.COM</p>
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
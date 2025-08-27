import React from "react";
import { HouseBillOfLading } from "../types/tunisiaInvoiceTypes";

interface HouseBillOfLadingDocumentProps {
  hbl: HouseBillOfLading;
}

const HouseBillOfLadingDocument: React.FC<HouseBillOfLadingDocumentProps> = ({ hbl }) => {
  return (
    <div className="bill-of-lading-document">
      {/* FRONT PAGE */}
      <div className="hbl-front-page">
        <div className="w-full h-full p-4 bg-white">
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
      </div>

      {/* BACK PAGE */}
      <div className="hbl-back-page">
        <div className="w-full h-full p-4 bg-white">
          {/* Bottom section - Terms and Conditions */}
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

            <div className="p-4 text-xs space-y-3">
              <p><strong>RECEIVED</strong> the goods in apparent good order and condition, and as far as ascertained by reasonable means of checking, as specified above unless otherwise stated.</p>
              <p>The Carrier, in accordance with and to the extent of the provisions contained in this Bill of Lading, undertakes to perform and/or to procure performance of the combined transport and the delivery of the goods, including all services related to perform from the place and time of taking the goods in charge until delivery, taking the goods in charge and accepts responsibility for such transport and such services.</p>
              <p>The surrender and accepts responsibility for such transport and such services endorsed in exchange for the goods or delivery order.</p>
              <p><strong>One of the Bills of Lading</strong> has/have been signed in the number indicated below, one of which being accomplished the other(s) to be void.</p>
              <p><strong>IN WITNESS whereof</strong> Bill(s) of Lading has/have been signed in the number indicated below, one of which being accomplished the other(s) to be void.</p>
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
    </div>
  );
};

export default HouseBillOfLadingDocument;
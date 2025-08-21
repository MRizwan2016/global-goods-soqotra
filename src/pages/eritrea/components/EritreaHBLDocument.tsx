import React from "react";

interface HBLData {
  id: string;
  blNumber: string;
  date: string;
  shipper: {
    name: string;
    address: string;
    phone?: string;
  };
  consignee: {
    name: string;
    address: string;
    idNumber?: string;
  };
  notifyParty?: {
    name: string;
    address: string;
  };
  agent: string;
  carrier: string;
  vessel: string;
  voyage?: string;
  portOfLoading: string;
  portOfDischarge: string;
  finalDestination: string;
  containerNumber: string;
  sealNumber: string;
  cargo: {
    description: string;
    weight: string;
    packages: string;
    marks?: string;
  };
  freightDetails: {
    payable: boolean;
    place: string;
    dateOfIssue: string;
  };
  specialInstructions?: string;
}

interface EritreaHBLDocumentProps {
  hbl: HBLData;
}

const EritreaHBLDocument: React.FC<EritreaHBLDocumentProps> = ({ hbl }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-6 print:text-sm">
      {/* Header */}
      <div className="border-2 border-black mb-6">
        <div className="bg-gray-100 p-4 text-center border-b border-black">
          <h1 className="text-2xl font-bold">HOUSE BILL OF LADING</h1>
          <p className="text-sm mt-1">NON-NEGOTIABLE</p>
        </div>
        
        <div className="p-4 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-2">AL MARAAM CARGO COMPANY</h2>
            <p className="text-sm">P.O. Box 23135, Doha, Qatar</p>
            <p className="text-sm">Tel: +974 4460 4664</p>
            <p className="text-sm">Email: accounts@almaraamcc.com</p>
          </div>
          <div className="text-right">
            <div className="border border-black p-2">
              <p className="font-bold">B/L No: {hbl.blNumber}</p>
              <p className="text-sm">Date: {new Date(hbl.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipper and Consignee */}
      <div className="border border-black mb-4">
        <div className="grid grid-cols-2">
          <div className="border-r border-black p-4">
            <h3 className="font-bold bg-gray-100 p-1 border border-black">SHIPPER</h3>
            <div className="mt-2">
              <p className="font-semibold">{hbl.shipper.name}</p>
              <p className="text-sm whitespace-pre-line">{hbl.shipper.address}</p>
              {hbl.shipper.phone && <p className="text-sm">Tel: {hbl.shipper.phone}</p>}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold bg-gray-100 p-1 border border-black">CONSIGNEE</h3>
            <div className="mt-2">
              <p className="font-semibold">{hbl.consignee.name}</p>
              <p className="text-sm whitespace-pre-line">{hbl.consignee.address}</p>
              {hbl.consignee.idNumber && <p className="text-sm">ID: {hbl.consignee.idNumber}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Notify Party */}
      {hbl.notifyParty && (
        <div className="border border-black mb-4">
          <div className="p-4">
            <h3 className="font-bold bg-gray-100 p-1 border border-black">NOTIFY PARTY</h3>
            <div className="mt-2">
              <p className="font-semibold">{hbl.notifyParty.name}</p>
              <p className="text-sm whitespace-pre-line">{hbl.notifyParty.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Vessel and Voyage */}
      <div className="border border-black mb-4">
        <div className="grid grid-cols-4 text-center">
          <div className="border-r border-black p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">VESSEL</h4>
            <p className="text-sm mt-1">{hbl.vessel}</p>
          </div>
          <div className="border-r border-black p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">VOYAGE NO.</h4>
            <p className="text-sm mt-1">{hbl.voyage || "N/A"}</p>
          </div>
          <div className="border-r border-black p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">PORT OF LOADING</h4>
            <p className="text-sm mt-1">{hbl.portOfLoading}</p>
          </div>
          <div className="p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">PORT OF DISCHARGE</h4>
            <p className="text-sm mt-1">{hbl.portOfDischarge}</p>
          </div>
        </div>
      </div>

      {/* Container and Seal */}
      <div className="border border-black mb-4">
        <div className="grid grid-cols-3 text-center">
          <div className="border-r border-black p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">CONTAINER NO.</h4>
            <p className="text-sm mt-1">{hbl.containerNumber}</p>
          </div>
          <div className="border-r border-black p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">SEAL NO.</h4>
            <p className="text-sm mt-1">{hbl.sealNumber}</p>
          </div>
          <div className="p-2">
            <h4 className="font-bold text-xs bg-gray-100 p-1">FINAL DESTINATION</h4>
            <p className="text-sm mt-1">{hbl.finalDestination}</p>
          </div>
        </div>
      </div>

      {/* Cargo Details */}
      <div className="border border-black mb-4">
        <div className="bg-gray-100 p-2 border-b border-black">
          <h3 className="font-bold text-center">PARTICULARS FURNISHED BY SHIPPER</h3>
        </div>
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 text-center">
            <h4 className="font-bold text-xs">MARKS & NUMBERS</h4>
          </div>
          <div className="border-r border-black p-2 text-center">
            <h4 className="font-bold text-xs">NO. OF PACKAGES</h4>
          </div>
          <div className="border-r border-black p-2 text-center">
            <h4 className="font-bold text-xs">DESCRIPTION OF GOODS</h4>
          </div>
          <div className="p-2 text-center">
            <h4 className="font-bold text-xs">GROSS WEIGHT</h4>
          </div>
        </div>
        <div className="grid grid-cols-4 min-h-32">
          <div className="border-r border-black p-2">
            <p className="text-sm">{hbl.cargo.marks}</p>
          </div>
          <div className="border-r border-black p-2 text-center">
            <p className="text-sm">{hbl.cargo.packages}</p>
          </div>
          <div className="border-r border-black p-2">
            <p className="text-sm whitespace-pre-line">{hbl.cargo.description}</p>
          </div>
          <div className="p-2 text-center">
            <p className="text-sm">{hbl.cargo.weight}</p>
          </div>
        </div>
      </div>

      {/* Freight Details */}
      <div className="border border-black mb-4">
        <div className="grid grid-cols-2">
          <div className="border-r border-black p-4">
            <h4 className="font-bold">FREIGHT PAYABLE AT:</h4>
            <p className="text-sm mt-1">{hbl.freightDetails.place}</p>
            <p className="text-sm">
              <span className="font-semibold">
                {hbl.freightDetails.payable ? "FREIGHT PREPAID" : "FREIGHT COLLECT"}
              </span>
            </p>
          </div>
          <div className="p-4">
            <h4 className="font-bold">NUMBER OF ORIGINAL B/L:</h4>
            <p className="text-sm mt-1">THREE (3)</p>
            <h4 className="font-bold mt-2">PLACE & DATE OF ISSUE:</h4>
            <p className="text-sm">{hbl.freightDetails.place}</p>
            <p className="text-sm">{new Date(hbl.freightDetails.dateOfIssue).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      {hbl.specialInstructions && (
        <div className="border border-black mb-4">
          <div className="p-4">
            <h4 className="font-bold">SPECIAL INSTRUCTIONS:</h4>
            <p className="text-sm mt-1 whitespace-pre-line">{hbl.specialInstructions}</p>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="border border-black mb-6">
        <div className="p-4">
          <h4 className="font-bold mb-2">TERMS AND CONDITIONS</h4>
          <div className="text-xs space-y-1">
            <p>1. This Bill of Lading is subject to the terms and conditions on the reverse side hereof.</p>
            <p>2. The Carrier shall not be liable for loss or damage to the goods unless the nature and value of such goods have been declared by the Shipper before shipment.</p>
            <p>3. In case of any deviation from the terms and conditions contained herein, the Carrier's liability shall be limited to the terms of the Hague Rules or Hague-Visby Rules as applicable.</p>
            <p>4. The goods are received in apparent good order and condition unless otherwise noted herein.</p>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="border border-black">
        <div className="grid grid-cols-2">
          <div className="border-r border-black p-4">
            <h4 className="font-bold mb-8">FOR THE CARRIER:</h4>
            <div className="border-t border-black pt-2">
              <p className="text-sm">AL MARAAM CARGO COMPANY</p>
              <p className="text-xs">As Agent</p>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold mb-8">SIGNATURE:</h4>
            <div className="border-t border-black pt-2">
              <p className="text-xs">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-600">
        <p>This House Bill of Lading is issued by Al Maraam Cargo Company - Member of FIATA</p>
      </div>
    </div>
  );
};

export default EritreaHBLDocument;
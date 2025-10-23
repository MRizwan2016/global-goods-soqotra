import React from "react";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";

interface AlgeriaHBLDocumentProps {
  invoice: AlgeriaInvoice;
}

const AlgeriaHBLDocument: React.FC<AlgeriaHBLDocumentProps> = ({ invoice }) => {
  const getTotalWeight = () => {
    const vehicleWeight = invoice.vehicle ? 2250 : 0;
    const effectsWeight = invoice.personalEffects?.reduce((sum, effect) => sum + effect.weight, 0) || 0;
    return (vehicleWeight + effectsWeight).toFixed(2);
  };

  const getTotalVolume = () => {
    const vehicleVolume = invoice.vehicle ? 14 : 0;
    const effectsVolume = invoice.personalEffects?.reduce((sum, effect) => sum + effect.volume, 0) || 0;
    return (vehicleVolume + effectsVolume).toFixed(3);
  };

  const getTotalPackages = () => {
    return invoice.personalEffects?.reduce((sum, effect) => sum + effect.quantity, 0) || 0;
  };

  return (
    <div className="bg-white p-8 max-w-[210mm] mx-auto text-black print:p-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-4">
        <h1 className="text-xl font-bold mb-1">
          BILL OF LADING FOR MULTIMODAL TRANSPORT OR PORT TO PORT SHIPMENT
        </h1>
        <p className="text-sm font-semibold">NEGOTIABLE ORIGINAL</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        {/* Left Column - Shipper */}
        <div className="border border-black p-3">
          <h3 className="font-bold mb-2 text-xs">Shipper</h3>
          <p className="font-semibold">{invoice.customer.prefix} {invoice.customer.name}</p>
          <p>DOHA</p>
          <p>QATAR</p>
          {invoice.customer.idNumber && (
            <>
              <p className="mt-1">QID NO: {invoice.customer.idNumber}</p>
              <p>PASSPORT NO: {invoice.customer.idNumber}</p>
            </>
          )}
        </div>

        {/* Right Column - Agent */}
        <div className="border border-black p-3">
          <h3 className="font-bold mb-2 text-xs">Agent</h3>
          <div className="mb-3">
            <img 
              src="/soqotra-solutions-logo.jpg" 
              alt="Soqotra Solutions" 
              className="h-12 mb-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <p className="font-semibold text-xs">SOQOTRA LOGISTICS SERVICES,</p>
          <p className="text-xs">TRANSPORTATION & TRADING W.L.L.</p>
          <p className="text-xs mt-1">Office 3, 1st Floor, Building: 53, Street 76,</p>
          <p className="text-xs">Azizia Commercial Street,</p>
          <p className="text-xs">P.O. Box: 55861, Al Aziziyah, Doha,</p>
          <p className="text-xs">State of Qatar.</p>
        </div>
      </div>

      {/* Consignee & Notify */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <h3 className="font-bold mb-2 text-xs">Consignee</h3>
          <p className="font-semibold">{invoice.customer.prefix} {invoice.customer.name}</p>
          <p className="whitespace-pre-line">{invoice.customer.address}</p>
          {invoice.customer.idNumber && (
            <p className="mt-1">PASSPORT NO: {invoice.customer.idNumber}</p>
          )}
        </div>

        <div className="border border-black p-3">
          <h3 className="font-bold mb-2 text-xs">Name of carrier</h3>
          <p className="font-semibold">MAERSK LINE</p>
        </div>
      </div>

      {/* Notify Address */}
      <div className="border border-black p-3 mb-4 text-sm">
        <h3 className="font-bold mb-2 text-xs">Notify address</h3>
        <p className="font-semibold">{invoice.customer.prefix} {invoice.customer.name}</p>
        <p>TUNIS</p>
        <p>TUNISIA</p>
        {invoice.customer.idNumber && (
          <p>PASSPORT NO: {invoice.customer.idNumber}</p>
        )}
      </div>

      {/* Export References & Vessel Info */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Export references</h3>
          <p className="font-semibold">{invoice.invoiceNumber.split('/')[1] || invoice.invoiceNumber}</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Booking no.</h3>
          <p>-</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Notes</h3>
          <p className="text-xs">IPSEN LOGISTICS SOLUTIONS P/C</p>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Pre-carriage by</h3>
          <p className="text-xs">Place of receipt by pre-carrier</p>
          <p className="font-semibold mt-1">ZONE PORTUAIRE RADES,</p>
          <p>ROUTE DU BAC, 2040 RADES</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Vessel</h3>
          <p className="font-semibold">SLS TOPAZ / 542S</p>
        </div>
      </div>

      {/* Ports */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Port of loading</h3>
          <p className="font-semibold">HAMAD SEA PORT</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Port of discharge</h3>
          <p className="font-semibold">TUNIS</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Place of delivery by on-carrier</h3>
          <p className="font-semibold">TUNIS</p>
        </div>
      </div>

      {/* Cargo Table */}
      <table className="w-full border-collapse mb-4 text-xs">
        <thead>
          <tr className="border border-black">
            <th className="border border-black p-2 text-left bg-gray-50">Marks and nos; Container no.</th>
            <th className="border border-black p-2 text-left bg-gray-50">Number and kind of packages; Description of goods</th>
            <th className="border border-black p-2 text-center bg-gray-50">Weight</th>
            <th className="border border-black p-2 text-center bg-gray-50">Measurement</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-black">
            <td className="border border-black p-2 align-top">
              {invoice.vehicle && (
                <>
                  <p className="font-semibold">CONTAINER NO: -</p>
                  <p className="font-semibold">SEAL NO: -</p>
                  <p className="mt-1">VOLUME: {getTotalVolume()} CBM</p>
                  <p className="mt-1">CHASSIS NO:</p>
                  <p className="font-semibold">{invoice.vehicle.chassisNumber}</p>
                  <p className="mt-1">MADE IN {invoice.vehicle.country}</p>
                </>
              )}
            </td>
            <td className="border border-black p-2 align-top">
              <p className="font-semibold mb-1">01 X 45' (PART) CONTAINER</p>
              <p className="mb-2">SAID TO CONTAIN</p>
              
              {invoice.vehicle && (
                <div className="mb-2">
                  <p className="font-semibold">1 UNIT OF {invoice.vehicle.make} {invoice.vehicle.model}</p>
                  <p className="uppercase">{invoice.vehicle.type}</p>
                  <div className="grid grid-cols-2 gap-x-4 mt-1">
                    <p>ENGINE NO: {invoice.vehicle.engineNumber}</p>
                    <p>CYLINDER NO: 4</p>
                    <p>COLOR: {invoice.vehicle.color.toUpperCase()}</p>
                    <p>MODEL YEAR {invoice.vehicle.year}</p>
                    <p>EXPORT NO PLATE: {invoice.vehicle.exportPlate}</p>
                    <p>HS CODE: {invoice.vehicle.hsCode}</p>
                  </div>
                </div>
              )}
              
              {invoice.personalEffects && invoice.personalEffects.length > 0 && (
                <div>
                  <p className="font-semibold">{getTotalPackages()} PACKAGES OF PERSONAL EFFECTS & HOUSEHOLD GOODS</p>
                  <p>HS CODE: 980100</p>
                  <p>VOLUME: {invoice.personalEffects.reduce((sum, effect) => sum + effect.volume, 0).toFixed(3)} CBM</p>
                </div>
              )}

              <p className="mt-2 text-xs italic">SHIPPER ON BOARD: {invoice.date}</p>
            </td>
            <td className="border border-black p-2 text-center align-top">
              <p className="font-semibold">{getTotalWeight()}KGS</p>
            </td>
            <td className="border border-black p-2 text-center align-top">
              <p className="font-semibold">{getTotalVolume()} CBM</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Freight Details */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Freight details</h3>
          <p>-</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Charges</h3>
          <p>-</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Currency</h3>
          <p>-</p>
        </div>
      </div>

      {/* Declaration Text */}
      <div className="border border-black p-3 mb-4 text-xs leading-relaxed">
        <p className="font-semibold mb-2">Declared value</p>
        <p className="mb-2 italic">particulars furnished by shipper</p>
        <p className="mb-2">
          RECEIVED the goods in apparent good order and condition and, as far as ascertained by reasonable means of checking, as specified above unless otherwise stated.
        </p>
        <p className="mb-2">
          The Carrier, in accordance with and to the extent of the provisions contained in this Bill of Lading, and with liberty to sub-contract, undertakes to perform and/or in his own name to procure performance of the combined transport and the delivery of the goods, including all services related thereto, from the place and time of taking the goods in charge to the place and time of delivery and accepts responsibility for such transport and such services.
        </p>
        <p>
          One of the Bills of Lading must be surrendered duly endorsed in exchange for the goods or delivery order.
        </p>
        <p className="mt-2 font-semibold">
          IN WITNESS whereof Bill(s) of Lading has/have been signed in the number indicated below, one of which being accomplished the other(s) to be void.
        </p>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Freight payable at</h3>
          <p className="font-semibold">DOHA, QATAR</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Place and date of issue</h3>
          <p className="font-semibold">DOHA, QATAR {invoice.date}</p>
        </div>
        <div className="border border-black p-3">
          <h3 className="font-bold mb-1 text-xs">Number of original Bs/L</h3>
          <p className="font-semibold text-center text-2xl">1</p>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-4 border border-black p-4">
        <h3 className="font-bold mb-4 text-sm">Signature</h3>
        <div className="h-16 border-b border-gray-300 mb-2"></div>
        <p className="text-center text-xs italic">AWBEDITOR.COM</p>
      </div>
    </div>
  );
};

export default AlgeriaHBLDocument;

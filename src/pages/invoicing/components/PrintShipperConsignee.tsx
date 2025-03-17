
interface ShipperConsigneeProps {
  shipper1: string;
  shipper2?: string;
  consignee1: string;
  consigneeIdNumber: string;
}

const PrintShipperConsignee = ({ shipper1, shipper2, consignee1, consigneeIdNumber }: ShipperConsigneeProps) => {
  return (
    <div className="flex border-t border-black">
      {/* Shipper */}
      <div className="w-1/2 border-r border-black p-2">
        <div className="font-bold underline">SHIPPER:</div>
        <div>{shipper1 || "DISSANAYAKE D P C"}</div>
        <div>{shipper2 || "-"}</div>
        <div>-</div>
        <div>THUMAMA, DOHA</div>
      </div>
      
      {/* Consignee */}
      <div className="w-1/2 p-2">
        <div className="font-bold underline">CONSIGNEE:</div>
        <div>{consignee1 || "DISSANAYAKE D P C"}</div>
        <div>NO 47/2</div>
        <div>KOTADENIYA</div>
        <div>DANOWITA, SRI LANKA</div>
        <div>PASSPORT NO : {consigneeIdNumber || "OL7449595"}</div>
      </div>
    </div>
  );
};

export default PrintShipperConsignee;

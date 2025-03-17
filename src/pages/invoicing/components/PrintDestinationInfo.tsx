
interface DestinationInfoProps {
  warehouse: string;
  subZone?: string;
}

const PrintDestinationInfo = ({ warehouse, subZone }: DestinationInfoProps) => {
  return (
    <div className="border-t border-black p-2 flex">
      <div className="font-bold">Destination Warehouse: {warehouse || "Colombo"}</div>
      {subZone && <div className="mx-4 font-bold">({subZone})</div>}
      <div className="mx-4 font-bold">(WAREHOUSE COLLECT)</div>
      <div className="ml-auto font-bold">SEACARGO</div>
    </div>
  );
};

export default PrintDestinationInfo;


interface DestinationInfoProps {
  warehouse: string;
}

const PrintDestinationInfo = ({ warehouse }: DestinationInfoProps) => {
  return (
    <div className="border-t border-black p-2 flex">
      <div className="font-bold">Destination Warehouse: {warehouse || "Colombo"}</div>
      <div className="mx-4 font-bold">(WAREHOUSE COLLECT)</div>
      <div className="ml-auto font-bold">SEACARGO</div>
    </div>
  );
};

export default PrintDestinationInfo;

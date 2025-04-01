
import React from "react";

interface PortsProps {
  portOfLoading: string;
  portOfDischarge: string;
}

const Ports: React.FC<PortsProps> = ({ portOfLoading, portOfDischarge }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF LOADING</h2>
        <p>{portOfLoading}</p>
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF DISCHARGE</h2>
        <p>{portOfDischarge}</p>
      </div>
    </div>
  );
};

export default Ports;

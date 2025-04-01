
import React from "react";

interface PortsProps {
  portOfLoading: string;
  portOfDischarge: string;
  finalDestination?: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Ports: React.FC<PortsProps> = ({ 
  portOfLoading, 
  portOfDischarge,
  finalDestination,
  editable = false,
  onChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF LOADING</h2>
        {editable ? (
          <input
            type="text"
            name="portOfLoading"
            value={portOfLoading}
            onChange={onChange}
            className="w-full border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{portOfLoading}</p>
        )}
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">PORT OF DISCHARGE</h2>
        {editable ? (
          <input
            type="text"
            name="portOfDischarge"
            value={portOfDischarge}
            onChange={onChange}
            className="w-full border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{portOfDischarge}</p>
        )}
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">FINAL DESTINATION</h2>
        {editable ? (
          <input
            type="text"
            name="finalDestination"
            value={finalDestination || ""}
            onChange={onChange}
            className="w-full border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{finalDestination || portOfDischarge}</p>
        )}
      </div>
    </div>
  );
};

export default Ports;

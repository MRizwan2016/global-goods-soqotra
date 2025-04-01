
import React from "react";

const Signatures: React.FC = () => {
  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="border-t border-gray-400 pt-2">
            <p className="font-bold">Shipper's Signature</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-gray-400 pt-2">
            <p className="font-bold">Carrier's Signature</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-center">
        <p>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
      </div>
    </>
  );
};

export default Signatures;

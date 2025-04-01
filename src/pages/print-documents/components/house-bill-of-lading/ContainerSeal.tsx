
import React from "react";

interface ContainerSealProps {
  containerNo: string;
  sealNo: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContainerSeal: React.FC<ContainerSealProps> = ({ 
  containerNo, 
  sealNo,
  editable = false,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">CONTAINER NO</h2>
        {editable ? (
          <input
            type="text"
            name="containerNo"
            value={containerNo}
            onChange={onChange}
            className="w-full border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{containerNo}</p>
        )}
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">SEAL NO</h2>
        {editable ? (
          <input
            type="text"
            name="sealNo"
            value={sealNo}
            onChange={onChange}
            className="w-full border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{sealNo}</p>
        )}
      </div>
    </div>
  );
};

export default ContainerSeal;


import React from "react";

interface ContainerSealProps {
  containerNo: string;
  sealNo: string;
}

const ContainerSeal: React.FC<ContainerSealProps> = ({ containerNo, sealNo }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">CONTAINER NO</h2>
        <p>{containerNo}</p>
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">SEAL NO</h2>
        <p>{sealNo}</p>
      </div>
    </div>
  );
};

export default ContainerSeal;

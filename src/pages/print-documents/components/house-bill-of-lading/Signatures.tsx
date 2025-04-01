
import React from "react";

interface SignaturesProps {
  dateOfIssue: string;
}

const Signatures: React.FC<SignaturesProps> = ({ dateOfIssue }) => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4">
      <div>
        <p className="font-bold mb-8">FOR THE CARRIER:</p>
        <div className="border-t border-black w-48 pt-1">
          <p className="text-center">AUTHORIZED SIGNATURE</p>
        </div>
      </div>
      <div>
        <p className="font-bold">DATE OF ISSUE:</p>
        <p>{dateOfIssue}</p>
        <p className="mt-6 text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
      </div>
    </div>
  );
};

export default Signatures;

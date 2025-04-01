
import React from "react";

interface SignaturesProps {
  dateOfIssue: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Signatures: React.FC<SignaturesProps> = ({ 
  dateOfIssue,
  editable = false,
  onChange
}) => {
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
        {editable ? (
          <input
            type="date"
            name="dateOfIssue"
            value={dateOfIssue}
            onChange={onChange}
            className="border border-gray-300 px-2 py-1"
          />
        ) : (
          <p>{dateOfIssue}</p>
        )}
        <p className="mt-6 text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
      </div>
    </div>
  );
};

export default Signatures;

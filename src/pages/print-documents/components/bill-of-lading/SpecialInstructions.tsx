
import React from "react";

interface SpecialInstructionsProps {
  specialInstructions: string;
}

const SpecialInstructions: React.FC<SpecialInstructionsProps> = ({ specialInstructions }) => {
  return (
    <div className="border p-3 mb-6">
      <h2 className="font-bold mb-2">Special Instructions:</h2>
      <p>{specialInstructions}</p>
    </div>
  );
};

export default SpecialInstructions;

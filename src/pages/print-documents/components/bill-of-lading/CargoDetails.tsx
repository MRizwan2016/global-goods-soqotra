
import React from "react";

interface CargoDetailsProps {
  packages: string;
  weight: string;
  volume: string;
  marks: string;
  description: string;
  cargoType: string;
  formatDescription: (description: string) => React.ReactNode;
  blData: any;
}

const CargoDetails: React.FC<CargoDetailsProps> = ({
  packages,
  weight,
  volume,
  marks,
  description,
  cargoType,
  formatDescription,
  blData
}) => {
  return (
    <div className="border p-3 mb-6">
      <h2 className="font-bold mb-2">Cargo Details:</h2>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="col-span-1">
          <p className="font-semibold">Packages:</p>
          <p>{packages}</p>
        </div>
        <div className="col-span-1">
          <p className="font-semibold">Weight:</p>
          <p>{weight}</p>
        </div>
        <div className="col-span-1">
          <p className="font-semibold">Volume:</p>
          <p>{volume}</p>
        </div>
        <div className="col-span-1">
          <p className="font-semibold">Marks:</p>
          <p>{marks}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold">Description of Goods:</p>
        <div className="whitespace-pre-line min-h-[150px]">
          {formatDescription(description)}
        </div>
        
        {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
          <div className="mt-3 border-t pt-2 border-gray-400">
            <p className="font-semibold">VEHICLE DETAILS:</p>
            {blData.vehicleMake && <p>Make: {blData.vehicleMake}</p>}
            {blData.vehicleModel && <p>Model: {blData.vehicleModel}</p>}
            {blData.vehicleYear && <p>Year: {blData.vehicleYear}</p>}
            {blData.vehicleColor && <p>Color: {blData.vehicleColor}</p>}
            {blData.chassisNumber && <p>Chassis/VIN: {blData.chassisNumber}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CargoDetails;

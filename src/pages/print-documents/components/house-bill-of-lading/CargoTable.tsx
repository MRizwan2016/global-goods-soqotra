
import React from "react";

interface CargoTableProps {
  marks: string;
  description: string;
  weight: string;
  volume: string;
  cargoType: string;
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    chassisNumber?: string;
  };
  formatDescription: (description: string) => React.ReactNode;
}

const CargoTable: React.FC<CargoTableProps> = ({
  marks,
  description,
  weight,
  volume,
  cargoType,
  vehicleDetails,
  formatDescription
}) => {
  return (
    <div className="mb-6">
      <table className="w-full border-collapse border-2 border-black">
        <thead>
          <tr>
            <th className="border-2 border-black p-2 w-1/6">MARKS & NUMBERS</th>
            <th className="border-2 border-black p-2 w-3/6">DESCRIPTION OF GOODS</th>
            <th className="border-2 border-black p-2 w-1/6">GROSS WEIGHT (KG)</th>
            <th className="border-2 border-black p-2 w-1/6">MEASUREMENT (CBM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-black p-2 align-top" rowSpan={1}>
              {marks}
            </td>
            <td className="border-2 border-black p-3 align-top min-h-[200px]">
              <p className="font-bold mb-2">SHIPPER'S LOAD, COUNT & SEAL</p>
              <p className="mb-2">SAID TO CONTAIN:</p>
              <div className="whitespace-pre-line">
                {formatDescription(description)}
              </div>
              
              {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
                <div className="mt-3 border-t pt-2 border-gray-400">
                  <p className="font-bold">VEHICLE DETAILS:</p>
                  {vehicleDetails?.make && <p>Make: {vehicleDetails.make}</p>}
                  {vehicleDetails?.model && <p>Model: {vehicleDetails.model}</p>}
                  {vehicleDetails?.year && <p>Year: {vehicleDetails.year}</p>}
                  {vehicleDetails?.color && <p>Color: {vehicleDetails.color}</p>}
                  {vehicleDetails?.chassisNumber && <p>Chassis/VIN: {vehicleDetails.chassisNumber}</p>}
                </div>
              )}
            </td>
            <td className="border-2 border-black p-2 text-center align-middle">{weight}</td>
            <td className="border-2 border-black p-2 text-center align-middle">{volume}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;


import React from "react";

interface CargoTableProps {
  marks: string;
  description: string;
  packages: string;
  weight: string;
  volume: string;
  cargoType: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  chassisNumber?: string;
  formatDescription: (description: string) => React.ReactNode;
}

const CargoTable: React.FC<CargoTableProps> = ({
  marks,
  description,
  packages,
  weight,
  volume,
  cargoType,
  editable = false,
  onChange,
  vehicleMake,
  vehicleModel,
  vehicleYear,
  vehicleColor,
  chassisNumber,
  formatDescription
}) => {
  return (
    <div className="mb-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2 w-1/6 text-left">MARKS & NUMBERS</th>
            <th className="border border-gray-800 p-2 w-3/6 text-left">DESCRIPTION OF GOODS</th>
            <th className="border border-gray-800 p-2 w-1/6 text-center">GROSS WEIGHT (KG)</th>
            <th className="border border-gray-800 p-2 w-1/6 text-center">MEASUREMENT (CBM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-800 p-2 align-top">
              {editable ? (
                <input 
                  type="text" 
                  name="marks"
                  value={marks} 
                  onChange={onChange}
                  className="w-full border border-gray-300 p-1"
                />
              ) : (
                <span>{marks}</span>
              )}
            </td>
            <td className="border border-gray-800 p-2 align-top cargo-description">
              <p className="font-bold mb-2">SHIPPER'S LOAD, COUNT & SEAL</p>
              <p className="mb-2">SAID TO CONTAIN:</p>
              
              {editable ? (
                <textarea 
                  name="description"
                  value={description} 
                  onChange={onChange}
                  className="w-full border border-gray-300 p-1 min-h-[150px]"
                  rows={6}
                />
              ) : (
                <div className="whitespace-pre-line break-words min-h-[150px] overflow-visible">
                  {formatDescription(description)}
                </div>
              )}
              
              {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck" || 
                description.toLowerCase().includes("mazda") || 
                description.toLowerCase().includes("vehicle") || 
                description.toLowerCase().includes("car")) && (
                <div className="mt-3 border-t pt-2 border-gray-400">
                  <p className="font-bold">VEHICLE DETAILS:</p>
                  {vehicleMake && <p>Make: {vehicleMake}</p>}
                  {vehicleModel && <p>Model: {vehicleModel}</p>}
                  {vehicleYear && <p>Year: {vehicleYear}</p>}
                  {vehicleColor && <p>Color: {vehicleColor}</p>}
                  {chassisNumber && <p>Chassis/VIN: {chassisNumber}</p>}
                </div>
              )}
            </td>
            <td className="border border-gray-800 p-2 text-center align-middle">
              {editable ? (
                <input 
                  type="text" 
                  name="weight"
                  value={weight} 
                  onChange={onChange}
                  className="w-full text-center border border-gray-300 p-1"
                />
              ) : (
                <span>{weight}</span>
              )}
            </td>
            <td className="border border-gray-800 p-2 text-center align-middle">
              {editable ? (
                <input 
                  type="text" 
                  name="volume"
                  value={volume} 
                  onChange={onChange}
                  className="w-full text-center border border-gray-300 p-1"
                />
              ) : (
                <span>{volume}</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;

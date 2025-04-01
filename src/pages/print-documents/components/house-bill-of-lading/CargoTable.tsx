
import React from "react";

interface CargoTableProps {
  marks: string;
  description: string;
  packages?: string;
  weight: string;
  volume: string;
  cargoType: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  chassisNumber?: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formatDescription?: (description: string) => React.ReactNode;
}

const CargoTable: React.FC<CargoTableProps> = ({
  marks,
  description,
  packages,
  weight,
  volume,
  cargoType,
  vehicleMake,
  vehicleModel,
  vehicleYear,
  vehicleColor,
  chassisNumber,
  editable = false,
  onChange,
  formatDescription = (text) => text
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
              {editable ? (
                <input
                  type="text"
                  name="marks"
                  value={marks}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              ) : (
                marks
              )}
            </td>
            <td className="border-2 border-black p-3 align-top min-h-[200px]">
              <p className="font-bold mb-2">SHIPPER'S LOAD, COUNT & SEAL</p>
              <p className="mb-2">SAID TO CONTAIN:</p>
              {editable ? (
                <>
                  <textarea
                    name="description"
                    value={description}
                    onChange={onChange}
                    className="w-full border border-gray-300 px-2 py-1 mb-3"
                    rows={4}
                  />
                  
                  {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
                    <div className="mt-3 border-t pt-2 border-gray-400">
                      <p className="font-bold">VEHICLE DETAILS:</p>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <input
                          type="text"
                          name="vehicleMake"
                          value={vehicleMake || ""}
                          onChange={onChange}
                          className="border border-gray-300 px-2 py-1"
                          placeholder="Make"
                        />
                        <input
                          type="text"
                          name="vehicleModel"
                          value={vehicleModel || ""}
                          onChange={onChange}
                          className="border border-gray-300 px-2 py-1"
                          placeholder="Model"
                        />
                        <input
                          type="text"
                          name="vehicleYear"
                          value={vehicleYear || ""}
                          onChange={onChange}
                          className="border border-gray-300 px-2 py-1"
                          placeholder="Year"
                        />
                        <input
                          type="text"
                          name="vehicleColor"
                          value={vehicleColor || ""}
                          onChange={onChange}
                          className="border border-gray-300 px-2 py-1"
                          placeholder="Color"
                        />
                        <input
                          type="text"
                          name="chassisNumber"
                          value={chassisNumber || ""}
                          onChange={onChange}
                          className="border border-gray-300 px-2 py-1 col-span-2"
                          placeholder="Chassis/VIN Number"
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="whitespace-pre-line">
                    {formatDescription(description)}
                  </div>
                  
                  {(cargoType.toLowerCase() === "car" || cargoType.toLowerCase() === "truck") && (
                    <div className="mt-3 border-t pt-2 border-gray-400">
                      <p className="font-bold">VEHICLE DETAILS:</p>
                      {vehicleMake && <p>Make: {vehicleMake}</p>}
                      {vehicleModel && <p>Model: {vehicleModel}</p>}
                      {vehicleYear && <p>Year: {vehicleYear}</p>}
                      {vehicleColor && <p>Color: {vehicleColor}</p>}
                      {chassisNumber && <p>Chassis/VIN: {chassisNumber}</p>}
                    </div>
                  )}
                </>
              )}
            </td>
            <td className="border-2 border-black p-2 text-center align-middle">
              {editable ? (
                <input
                  type="text"
                  name="weight"
                  value={weight}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              ) : (
                weight
              )}
            </td>
            <td className="border-2 border-black p-2 text-center align-middle">
              {editable ? (
                <input
                  type="text"
                  name="volume"
                  value={volume}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              ) : (
                volume
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;

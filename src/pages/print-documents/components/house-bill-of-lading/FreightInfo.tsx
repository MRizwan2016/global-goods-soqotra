
import React from "react";

interface FreightInfoProps {
  freightPrepaid: boolean;
  packages?: string;
  vessel: string;
  finalDestination?: string;
  voyage?: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FreightInfo: React.FC<FreightInfoProps> = ({
  freightPrepaid,
  packages,
  vessel,
  finalDestination,
  voyage,
  editable = false,
  onChange
}) => {
  const handleFreightTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: "freightPrepaid",
          value: e.target.value === "prepaid"
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">FREIGHT DETAILS</h2>
        {editable ? (
          <>
            <div className="mb-2">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="freightType"
                  value="prepaid"
                  checked={freightPrepaid}
                  onChange={handleFreightTypeChange}
                  className="mr-1"
                />
                <span>FREIGHT PREPAID</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="freightType"
                  value="collect"
                  checked={!freightPrepaid}
                  onChange={handleFreightTypeChange}
                  className="mr-1"
                />
                <span>FREIGHT COLLECT</span>
              </label>
            </div>
            <div>
              <label className="block">PACKAGES:</label>
              <input
                type="text"
                name="packages"
                value={packages || ""}
                onChange={onChange}
                className="w-full border border-gray-300 px-2 py-1"
              />
            </div>
          </>
        ) : (
          <>
            <p>FREIGHT {freightPrepaid ? "PREPAID" : "COLLECT"}</p>
            <p>PACKAGES: {packages}</p>
          </>
        )}
      </div>
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">ADDITIONAL INFORMATION</h2>
        {editable ? (
          <>
            <div className="mb-2">
              <label className="block">VESSEL:</label>
              <input
                type="text"
                name="vessel"
                value={vessel}
                onChange={onChange}
                className="w-full border border-gray-300 px-2 py-1"
              />
            </div>
            {voyage && (
              <div className="mb-2">
                <label className="block">VOYAGE:</label>
                <input
                  type="text"
                  name="voyage"
                  value={voyage}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-2 py-1"
                />
              </div>
            )}
            <div>
              <label className="block">FINAL DESTINATION:</label>
              <input
                type="text"
                name="finalDestination"
                value={finalDestination || ""}
                onChange={onChange}
                className="w-full border border-gray-300 px-2 py-1"
              />
            </div>
          </>
        ) : (
          <>
            <p>VESSEL/VOYAGE: {vessel}{voyage ? `/${voyage}` : ""}</p>
            <p>FINAL DESTINATION: {finalDestination}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FreightInfo;

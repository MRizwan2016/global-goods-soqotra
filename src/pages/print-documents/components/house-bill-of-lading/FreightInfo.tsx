
import React from "react";

interface FreightInfoProps {
  freightPrepaid: boolean;
  packages: string;
  vessel?: string;
  voyage?: string;
  finalDestination?: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FreightInfo: React.FC<FreightInfoProps> = ({
  freightPrepaid,
  packages,
  vessel,
  voyage,
  finalDestination,
  editable = false,
  onChange
}) => {
  const handleFreightToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          name: "freightPrepaid",
          value: e.target.checked ? "true" : "false"
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black p-3">
        <h2 className="font-bold border-b border-black pb-1 mb-1">FREIGHT DETAILS</h2>
        {editable ? (
          <>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="freightPrepaid"
                  checked={freightPrepaid}
                  onChange={handleFreightToggle}
                  className="mr-2"
                />
                <span>FREIGHT PREPAID</span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">PACKAGES:</span>
              <input
                type="text"
                name="packages"
                value={packages}
                onChange={onChange}
                className="border border-gray-300 px-2 py-1 w-20"
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
            <div className="mb-2 flex items-center">
              <span className="mr-2 w-24">VESSEL:</span>
              <input
                type="text"
                name="vessel"
                value={vessel || ""}
                onChange={onChange}
                className="border border-gray-300 px-2 py-1 flex-1"
              />
            </div>
            <div className="mb-2 flex items-center">
              <span className="mr-2 w-24">VOYAGE:</span>
              <input
                type="text"
                name="voyage"
                value={voyage || ""}
                onChange={onChange}
                className="border border-gray-300 px-2 py-1 flex-1"
              />
            </div>
          </>
        ) : (
          <>
            <p>VESSEL/VOYAGE: {vessel}{voyage ? `/${voyage}` : ""}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FreightInfo;

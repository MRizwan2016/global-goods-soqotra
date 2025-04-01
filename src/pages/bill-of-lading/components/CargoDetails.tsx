
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface CargoDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CargoDetails = ({ formState, handleInputChange }: CargoDetailsProps) => {
  const showVehicleDetails = formState.cargoType === "Car" || formState.cargoType === "Truck";

  return (
    <div className="mt-6">
      <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
        CARGO DETAILS
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">GROSS WEIGHT (KG):</label>
          <Input 
            name="grossWeight"
            value={formState.grossWeight}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">NET WEIGHT (KG):</label>
          <Input 
            name="netWeight"
            value={formState.netWeight}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">MEASUREMENT (CBM):</label>
          <Input 
            name="measurement"
            value={formState.measurement}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">PACKAGES:</label>
          <Input 
            name="packages"
            value={formState.packages}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CONTAINER NO:</label>
          <Input 
            name="containerNo"
            value={formState.containerNo}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SEAL NO:</label>
          <Input 
            name="sealNo"
            value={formState.sealNo}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">MARKS AND NUMBERS:</label>
          <Input 
            name="marksAndNumbers"
            value={formState.marksAndNumbers}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">SHIPPING MARKS:</label>
          <Input 
            name="shippingMarks"
            value={formState.shippingMarks}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">FREIGHT CHARGES:</label>
          <Select
            name="freightCharges"
            value={formState.freightCharges || "Prepaid"}
            onChange={handleInputChange}
            className="border border-gray-300"
          >
            <option value="Prepaid">Prepaid</option>
            <option value="Collect">Collect</option>
          </Select>
        </div>
        
        <div className="flex flex-col md:col-span-3">
          <label className="text-sm font-medium mb-1">GOODS DESCRIPTION:</label>
          <Textarea 
            name="goodsDescription"
            value={formState.goodsDescription}
            onChange={handleInputChange}
            className="border border-gray-300 min-h-[100px]"
          />
        </div>

        {/* Show vehicle details section if cargo type is Car or Truck */}
        {showVehicleDetails && (
          <>
            <div className="md:col-span-3">
              <h3 className="font-medium text-blue-700 border-b border-blue-300 pb-1 mb-3">VEHICLE DETAILS</h3>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">MAKE:</label>
              <Input 
                name="vehicleMake"
                value={formState.vehicleMake || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">MODEL:</label>
              <Input 
                name="vehicleModel"
                value={formState.vehicleModel || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">YEAR:</label>
              <Input 
                name="vehicleYear"
                value={formState.vehicleYear || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">COLOR:</label>
              <Input 
                name="vehicleColor"
                value={formState.vehicleColor || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">CHASSIS/VIN NUMBER:</label>
              <Input 
                name="chassisNumber"
                value={formState.chassisNumber || ""}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CargoDetails;

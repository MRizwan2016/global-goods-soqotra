
import { Input } from "@/components/ui/input";

interface ShippingDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  destinations: string[];
  getCargoTypes: (destination: string) => string[];
}

const ShippingDetails = ({ formState, handleInputChange, destinations, getCargoTypes }: ShippingDetailsProps) => {
  return (
    <div className="mt-6">
      <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
        SHIPPING DETAILS
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">ORIGIN:</label>
          <Input 
            name="origin"
            value={formState.origin}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DESTINATION:</label>
          <select
            name="destination"
            value={formState.destination}
            onChange={handleInputChange}
            className="border border-gray-300 py-2 px-3 rounded"
          >
            <option value="">Select Destination</option>
            {destinations.map((dest, idx) => (
              <option key={idx} value={dest}>{dest}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">CARGO TYPE:</label>
          <select
            name="cargoType"
            value={formState.cargoType}
            onChange={handleInputChange}
            className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
          >
            {getCargoTypes(formState.destination).map((type, idx) => (
              <option key={idx} value={type}>{type.toUpperCase()}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">VESSEL:</label>
          <Input 
            name="vessel"
            value={formState.vessel}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">VOYAGE NO:</label>
          <Input 
            name="voyageNo"
            value={formState.voyageNo}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">LOADING PORT:</label>
          <Input 
            name="loadingPort"
            value={formState.loadingPort}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DISCHARGE PORT:</label>
          <Input 
            name="dischargePort"
            value={formState.dischargePort}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">PLACE OF ISSUE:</label>
          <Input 
            name="placeOfIssue"
            value={formState.placeOfIssue}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DATE OF ISSUE:</label>
          <Input 
            type="date"
            name="dateOfIssue"
            value={formState.dateOfIssue}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;


import { Input } from "@/components/ui/input";

interface BLHeaderProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  isEditing: boolean;
}

const BLHeader = ({ formState, handleInputChange, isEditing }: BLHeaderProps) => {
  return (
    <div className="p-4 bg-green-50 border-b border-green-100">
      <h3 className="text-lg font-medium text-green-800">
        {isEditing ? "Update Bill of Lading" : "Create New Bill of Lading"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mt-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">BL NUMBER:</label>
          <Input 
            name="blNumber"
            value={formState.blNumber}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DATE:</label>
          <Input 
            type="date"
            name="date"
            value={formState.date}
            onChange={handleInputChange}
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">STATUS:</label>
          <select
            name="status"
            value={formState.status}
            onChange={handleInputChange}
            className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
          >
            <option value="Shipped">SHIPPED</option>
            <option value="In Transit">IN TRANSIT</option>
            <option value="Delivered">DELIVERED</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BLHeader;

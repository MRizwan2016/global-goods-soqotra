
import { Input, Textarea } from "@/components/ui/input";

interface CargoDetailsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CargoDetails = ({ formState, handleInputChange }: CargoDetailsProps) => {
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
        
        <div className="flex flex-col md:col-span-3">
          <label className="text-sm font-medium mb-1">GOODS DESCRIPTION:</label>
          <Textarea 
            name="goodsDescription"
            value={formState.goodsDescription}
            onChange={handleInputChange}
            className="border border-gray-300 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CargoDetails;

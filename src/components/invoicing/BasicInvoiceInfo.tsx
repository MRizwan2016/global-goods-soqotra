
import { SelectField } from "./FormFields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InvoiceSelector from "./InvoiceSelector";

interface BasicInvoiceInfoProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  isEditing: boolean;
  availableInvoices: { bookNumber: string; invoiceNumber: string }[];
}

const BasicInvoiceInfo = ({ 
  formState, 
  handleInputChange, 
  isEditing,
  availableInvoices 
}: BasicInvoiceInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <SelectField
        name="sector"
        label="SECTOR"
        value={formState.sector}
        onChange={handleInputChange}
        options={[
          { value: "COLOMBO : C", label: "COLOMBO : C" },
          { value: "DOHA : D", label: "DOHA : D" },
          { value: "MANILA : M", label: "MANILA : M" }
        ]}
      />
      
      <SelectField
        name="branch"
        label="BRANCH"
        value={formState.branch}
        onChange={handleInputChange}
        options={[
          { value: "DOHA : HOF", label: "DOHA : HOF" },
          { value: "DUBAI : DXB", label: "DUBAI : DXB" },
          { value: "COLOMBO : CMB", label: "COLOMBO : CMB" }
        ]}
      />
      
      <SelectField
        name="warehouse"
        label="WAREHOUSE"
        value={formState.warehouse}
        onChange={handleInputChange}
        options={[
          { value: "Colombo : C", label: "Colombo : C" },
          { value: "Manila : M", label: "Manila : M" },
          { value: "Doha : D", label: "Doha : D" }
        ]}
      />
      
      <SelectField
        name="salesRep"
        label="SALES REP"
        value={formState.salesRep}
        onChange={handleInputChange}
        options={[
          { value: "ABDUL/262", label: "ABDUL/262" },
          { value: "AHMED/101", label: "AHMED/101" },
          { value: "SARAH/305", label: "SARAH/305" }
        ]}
      />
      
      <SelectField
        name="doorToDoor"
        label="DOOR TO DOOR"
        value={formState.doorToDoor}
        onChange={handleInputChange}
        options={[
          { value: "NO", label: "NO" },
          { value: "YES", label: "YES" }
        ]}
      />
      
      <SelectField
        name="driver"
        label="DRIVER"
        value={formState.driver}
        onChange={handleInputChange}
        options={[
          { value: "ABDUL HAMEED/D", label: "ABDUL HAMEED/D" },
          { value: "MOHAMMED ALI/D", label: "MOHAMMED ALI/D" },
          { value: "RAJEEV KUMAR/D", label: "RAJEEV KUMAR/D" }
        ]}
      />
      
      <SelectField
        name="district"
        label="DISTRICT"
        value={formState.district}
        onChange={handleInputChange}
        options={[
          { value: "COLOMBO : C - C", label: "COLOMBO : C - C" },
          { value: "DOHA : D - D", label: "DOHA : D - D" },
          { value: "MANILA : M - M", label: "MANILA : M - M" }
        ]}
      />
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">VOLUME:</label>
        <Input 
          name="volume"
          value={formState.volume}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <SelectField
        name="catZone"
        label="CAT/ ZONE"
        value={formState.catZone}
        onChange={handleInputChange}
        options={[
          { value: "Normal Rate : 0", label: "Normal Rate : 0" },
          { value: "Premium Rate : 1", label: "Premium Rate : 1" },
          { value: "Economy Rate : 2", label: "Economy Rate : 2" }
        ]}
      />
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WEIGHT:</label>
        <Input 
          name="weight"
          value={formState.weight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <SelectField
        name="freightBy"
        label="FREIGHT BY"
        value={formState.freightBy}
        onChange={handleInputChange}
        options={[
          { value: "SEA", label: "SEA" },
          { value: "AIR", label: "AIR" },
          { value: "LAND", label: "LAND" }
        ]}
      />
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PACKAGES:</label>
        <Input 
          name="packages"
          value={formState.packages}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <InvoiceSelector
        isEditing={isEditing}
        invoiceNumber={formState.invoiceNumber}
        onInvoiceChange={handleInputChange}
        availableInvoices={availableInvoices}
      />
      
      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium mb-1">REMARKS:</label>
        <Textarea 
          name="remarks"
          value={formState.remarks}
          onChange={handleInputChange}
          className="border border-gray-300 min-h-[80px]"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">INVOICE DATE:</label>
        <Input 
          type="date"
          name="invoiceDate"
          value={formState.invoiceDate}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <SelectField
        name="giftCargo"
        label="GIFT CARGO"
        value={formState.giftCargo}
        onChange={handleInputChange}
        options={[
          { value: "NO", label: "NO" },
          { value: "YES", label: "YES" }
        ]}
      />
      
      <SelectField
        name="prePaid"
        label="PRE PAID"
        value={formState.prePaid}
        onChange={handleInputChange}
        options={[
          { value: "NO", label: "NO" },
          { value: "YES", label: "YES" }
        ]}
      />
    </div>
  );
};

export default BasicInvoiceInfo;

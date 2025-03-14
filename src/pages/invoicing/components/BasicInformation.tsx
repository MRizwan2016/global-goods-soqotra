
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BasicInformationProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
  countrySectorMap: Record<string, string>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
  showInvoiceSelector,
  setShowInvoiceSelector,
  availableInvoices,
  handleSelectInvoice,
  isEditing,
  countrySectorMap,
}) => {
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const countries = Object.keys(countrySectorMap);

  const handleCountrySelect = (country: string) => {
    handleSelectChange('country', country);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">SECTOR:</label>
        <select
          name="sector"
          value={formState.sector}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="COLOMBO : C">COLOMBO : C</option>
          <option value="DOHA : D">DOHA : D</option>
          <option value="MANILA : M">MANILA : M</option>
          <option value="NAIROBI : N">NAIROBI : N</option>
          <option value="RIYADH : R">RIYADH : R</option>
          <option value="DUBAI : U">DUBAI : U</option>
          <option value="ASMARA : A">ASMARA : A</option>
          <option value="KHARTOUM : K">KHARTOUM : K</option>
          <option value="TUNIS : T">TUNIS : T</option>
          <option value="KAMPALA : K">KAMPALA : K</option>
          <option value="KUWAIT : K">KUWAIT : K</option>
          <option value="MUSCAT : M">MUSCAT : M</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">BRANCH:</label>
        <select
          name="branch"
          value={formState.branch}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="DOHA : HOF">DOHA : HOF</option>
          <option value="DUBAI : DXB">DUBAI : DXB</option>
          <option value="COLOMBO : CMB">COLOMBO : CMB</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WAREHOUSE:</label>
        <select
          name="warehouse"
          value={formState.warehouse}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="Colombo : C">Colombo : C</option>
          <option value="Manila : M">Manila : M</option>
          <option value="Doha : D">Doha : D</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">SALES REP:</label>
        <select
          name="salesRep"
          value={formState.salesRep}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="ABDUL/262">ABDUL/262</option>
          <option value="AHMED/101">AHMED/101</option>
          <option value="SARAH/305">SARAH/305</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DOOR TO DOOR:</label>
        <select
          name="doorToDoor"
          value={formState.doorToDoor}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="NO">NO</option>
          <option value="YES">YES</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DRIVER:</label>
        <select
          name="driver"
          value={formState.driver}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="ABDUL HAMEED/D">ABDUL HAMEED/D</option>
          <option value="MOHAMMED ALI/D">MOHAMMED ALI/D</option>
          <option value="RAJEEV KUMAR/D">RAJEEV KUMAR/D</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">DISTRICT:</label>
        <select
          name="district"
          value={formState.district}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="COLOMBO : C - C">COLOMBO : C - C</option>
          <option value="DOHA : D - D">DOHA : D - D</option>
          <option value="MANILA : M - M">MANILA : M - M</option>
          <option value="ANURADHAPURA : K - K">ANURADHAPURA : K - K</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">VOLUME:</label>
        <Input 
          name="volume"
          value={formState.volume}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">CAT/ ZONE:</label>
        <select
          name="catZone"
          value={formState.catZone}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="Normal Rate : 0">Normal Rate : 0</option>
          <option value="Premium Rate : 1">Premium Rate : 1</option>
          <option value="Economy Rate : 2">Economy Rate : 2</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">WEIGHT:</label>
        <Input 
          name="weight"
          value={formState.weight}
          onChange={handleInputChange}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">FREIGHT BY:</label>
        <select
          name="freightBy"
          value={formState.freightBy}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="SEA">SEA</option>
          <option value="AIR">AIR</option>
          <option value="LAND">LAND</option>
        </select>
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
        <label className="text-sm font-medium mb-1">INVOICE NUMBER:</label>
        <div className="flex gap-2">
          <Input 
            name="invoiceNumber"
            value={formState.invoiceNumber}
            onChange={handleInputChange}
            className="border border-gray-300"
            readOnly={!isEditing}
            placeholder="Select an invoice number"
          />
          {!isEditing && (
            <Button 
              type="button"
              onClick={() => setShowInvoiceSelector(!showInvoiceSelector)}
              className="bg-blue-500 hover:bg-blue-600 px-2"
            >
              <BookOpen size={18} />
            </Button>
          )}
        </div>
        
        {showInvoiceSelector && (
          <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 max-h-60 overflow-y-auto absolute z-10">
            <h4 className="font-medium text-sm mb-2 px-2">Select an Invoice Number</h4>
            {availableInvoices.length > 0 ? (
              <div className="grid grid-cols-2 gap-1">
                {availableInvoices.map((inv) => (
                  <div 
                    key={inv.invoiceNumber}
                    onClick={() => handleSelectInvoice(inv.invoiceNumber)}
                    className="text-sm py-1 px-2 hover:bg-blue-50 cursor-pointer rounded flex justify-between"
                  >
                    <span>{inv.invoiceNumber}</span>
                    <span className="text-gray-500">(Book {inv.bookNumber})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 p-2">No available invoice numbers</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">COUNTRY:</label>
        <div className="flex gap-2">
          <Input 
            name="country"
            value={formState.country}
            onChange={handleInputChange}
            className="border border-gray-300"
            readOnly
            placeholder="Select a country"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 px-2"
              >
                <Globe size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 p-1 w-48 max-h-60 overflow-y-auto" align="end">
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className="cursor-pointer text-sm py-1 px-2 hover:bg-blue-50 rounded"
                >
                  {country}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
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
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">GIFT CARGO:</label>
        <select
          name="giftCargo"
          value={formState.giftCargo}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="NO">NO</option>
          <option value="YES">YES</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">PRE PAID:</label>
        <select
          name="prePaid"
          value={formState.prePaid}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="NO">NO</option>
          <option value="YES">YES</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">SUB ZONE:</label>
        <select
          name="subZone"
          value={formState.subZone}
          onChange={handleInputChange}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="1 : Colombo">1 : Colombo</option>
          <option value="2 : Kandy">2 : Kandy</option>
          <option value="3 : Galle">3 : Galle</option>
        </select>
      </div>
    </div>
  );
};

export default BasicInformation;

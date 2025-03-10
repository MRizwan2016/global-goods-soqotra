
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  InvoiceTableHead,
  InvoiceTableCell
} from "@/components/ui/table";

// Mock data for districts by country
const mockDistrictsByCountry = {
  "Sri Lanka": [
    "AMPARA", "BATTICOLA", "COLOMBO", "GAMPAHA", "JAFFNA", 
    "KALUTARA", "KILINOCHCHI", "MANNAR", "MULATIV", "RATNAPURA",
    "POLONNARUWA", "CHILAW", "TRINCOMALLE", "VAUNIYA"
  ],
  "Kenya": ["NAIROBI", "MOMBASA", "KISUMU", "NAKURU", "ELDORET"],
  "Eritrea": ["ASMARA", "KEREN", "MASSAWA", "ASSAB", "BARENTU"],
  "Sudan": ["KHARTOUM", "PORT SUDAN", "OMDURMAN", "NYALA", "KASSALA"],
  "Saudi Arabia": ["RIYADH", "JEDDAH", "MECCA", "MEDINA", "DAMMAM"],
  "United Arab Emirates": ["DUBAI", "ABU DHABI", "SHARJAH", "AJMAN", "RAS AL KHAIMAH"],
  "Somalia": ["MOGADISHU", "HARGEISA", "KISMAYO", "BERBERA", "MARKA"],
  "Tunisia": ["TUNIS", "SFAX", "SOUSSE", "KAIROUAN", "BIZERTE"]
};

// Mock rate boxes by country
const mockRateBoxes = {
  "Sri Lanka": [
    { id: "box1", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box2", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" }
  ],
  "Kenya": [
    { id: "box1", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box2", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" }
  ],
  "default": [
    { id: "box1", name: "CARTON BOX - SMALL [ 19 X 19 X 19=0.176 ]" },
    { id: "box2", name: "CARTON BOX - MEDIUM [ 19 X 19 X 29=0.176 ]" },
    { id: "box3", name: "WOODEN BOX - (4M) - BLACK [ 96 X 48 X 48=3.71 ]" },
    { id: "box4", name: "CAR" },
    { id: "box5", name: "TRUCK" },
    { id: "box6", name: "PERSONAL EFFECTS" },
    { id: "box7", name: "HOUSEHOLD GOODS" }
  ]
};

// Mock data for existing selling rates
const mockSellingRates = [
  { id: "1", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "POLONNARUWA", country: "Sri Lanka" },
  { id: "2", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "CHILAW", country: "Sri Lanka" },
  { id: "3", freightType: "S", tariffNumber: "1", effectiveFrom: "01/01/2021", district: "AMPARA", country: "Sri Lanka" },
  { id: "4", freightType: "S", tariffNumber: "2", effectiveFrom: "01/01/2022", district: "NAIROBI", country: "Kenya" },
];

const SellingRatesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const existingRate = isEditing 
    ? mockSellingRates.find(rate => rate.id === id) 
    : null;
    
  const [formState, setFormState] = useState({
    tariffNumber: existingRate?.tariffNumber || "",
    freightType: existingRate?.freightType || "S",
    sector: existingRate?.sector || "COLOMBO : C",
    effectiveFrom: existingRate?.effectiveFrom || "",
    country: existingRate?.country || "Sri Lanka",
  });
  
  const [districts, setDistricts] = useState<string[]>([]);
  const [rateBoxes, setRateBoxes] = useState<any[]>([]);
  const [districtRates, setDistrictRates] = useState<{[key: string]: {[key: string]: string}}>({});
  
  useEffect(() => {
    // Set districts based on selected country
    setDistricts(mockDistrictsByCountry[formState.country as keyof typeof mockDistrictsByCountry] || []);
    
    // Set rate boxes based on selected country
    setRateBoxes(mockRateBoxes[formState.country as keyof typeof mockRateBoxes] || mockRateBoxes.default);
    
    // Initialize district rates
    const newDistrictRates: {[key: string]: {[key: string]: string}} = {};
    (mockDistrictsByCountry[formState.country as keyof typeof mockDistrictsByCountry] || []).forEach(district => {
      newDistrictRates[district] = {};
      (mockRateBoxes[formState.country as keyof typeof mockRateBoxes] || mockRateBoxes.default).forEach(box => {
        newDistrictRates[district][box.id] = "0";
      });
    });
    setDistrictRates(newDistrictRates);
  }, [formState.country]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRateChange = (district: string, boxId: string, value: string) => {
    setDistrictRates(prev => ({
      ...prev,
      [district]: {
        ...prev[district],
        [boxId]: value
      }
    }));
  };
  
  const handleSave = () => {
    if (!formState.tariffNumber) {
      toast.error("Please enter a tariff number");
      return;
    }
    
    if (!formState.effectiveFrom) {
      toast.error("Please select an effective date");
      return;
    }
    
    console.log("Saving selling rates:", { ...formState, districtRates });
    toast.success("Selling rates saved successfully");
    
    navigate("/data-entry/selling-rates");
  };
  
  return (
    <Layout title={isEditing ? "Update Selling Tariff" : "Add Selling Tariff"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            {isEditing 
              ? `Update Selling Tariff - ${formState.country}` 
              : `Add Selling Tariff - ${formState.country}`}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">TARIFF NUMBER:</label>
              <Input 
                name="tariffNumber"
                value={formState.tariffNumber}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">FREIGHT TYPE:</label>
              <select
                name="freightType"
                value={formState.freightType}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="L">L</option>
              </select>
            </div>
            
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
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">EFFECTIVE FROM:</label>
              <Input 
                type="date"
                name="effectiveFrom"
                value={formState.effectiveFrom}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">COUNTRY:</label>
              <select
                name="country"
                value={formState.country}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="Sri Lanka">SRI LANKA</option>
                <option value="Kenya">KENYA</option>
                <option value="Eritrea">ERITREA</option>
                <option value="Sudan">SUDAN</option>
                <option value="Saudi Arabia">SAUDI ARABIA</option>
                <option value="United Arab Emirates">UNITED ARAB EMIRATES</option>
                <option value="Somalia">SOMALIA</option>
                <option value="Tunisia">TUNISIA</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <InvoiceTableHead className="w-48">DISTRICT/ZONE</InvoiceTableHead>
                  {rateBoxes.map(box => (
                    <InvoiceTableHead key={box.id}>
                      {box.name}
                    </InvoiceTableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {districts.map(district => (
                  <TableRow key={district}>
                    <InvoiceTableCell className="font-medium">{district}</InvoiceTableCell>
                    {rateBoxes.map(box => (
                      <InvoiceTableCell key={box.id}>
                        <Input
                          type="number"
                          value={districtRates[district]?.[box.id] || "0"}
                          onChange={(e) => handleRateChange(district, box.id, e.target.value)}
                          className="border border-gray-300 w-full"
                        />
                      </InvoiceTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
            <Button 
              onClick={() => navigate("/data-entry/selling-rates")}
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellingRatesForm;

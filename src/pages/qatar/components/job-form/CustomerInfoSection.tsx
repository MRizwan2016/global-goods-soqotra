
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useJobForm } from "./context/JobFormContext";
import PackageButton from "./details/PackageButton";

const CustomerInfoSection = () => {
  const { jobData, handleInputChange, handleSelectChange, isJobNumberGenerated } = useJobForm();
  
  // Define sectors by country
  const getSectorByCountry = (countryName: string) => {
    switch(countryName) {
      case "Sri Lanka":
        return ["COLOMBO : C", "GAMPAHA : G", "KALUTARA : K"];
      case "Qatar":
        return ["DOHA : D", "AL RAYYAN : R", "AL WAKRAH : W"];
      case "UAE":
        return ["DUBAI : D", "ABU DHABI : A", "SHARJAH : S"];
      case "Bahrain":
        return ["MANAMA : M", "RIFFA : R"];
      case "Saudi Arabia":
        return ["RIYADH : R", "JEDDAH : J", "DAMMAM : D"];
      case "Tunisia":
        return ["TUNIS : T", "SFAX : S", "SOUSSE : O"];
      case "Uganda":
        return ["KAMPALA : K", "ENTEBBE : E", "JINJA : J"];
      case "Somalia":
        return ["MOGADISHU : M", "HARGEISA : H", "KISMAYO : K"];
      case "Ethiopia":
        return ["ADDIS ABABA : A", "DIRE DAWA : D", "GONDAR : G"];
      case "Philippines":
        return ["MANILA : M", "CEBU : C", "DAVAO : D"];
      case "Oman":
        return ["MUSCAT : M", "SALALAH : S", "SOHAR : H"];
      default:
        return [];
    }
  };

  // Define branches by country
  const getBranchesByCountry = (countryName: string) => {
    switch(countryName) {
      case "Sri Lanka":
        return ["HEAD OFFICE", "COLOMBO BRANCH", "KANDY BRANCH"];
      case "Qatar":
        return ["HEAD OFFICE", "INDUSTRIAL AREA", "AL KHOR BRANCH", "WAKRA BRANCH"];
      case "UAE":
        return ["HEAD OFFICE", "DUBAI BRANCH", "ABU DHABI BRANCH"];
      case "Bahrain":
        return ["HEAD OFFICE", "MANAMA BRANCH"];
      case "Saudi Arabia":
        return ["HEAD OFFICE", "RIYADH BRANCH", "JEDDAH BRANCH"];
      case "Tunisia":
        return ["HEAD OFFICE", "TUNIS BRANCH", "SFAX BRANCH"];
      case "Uganda":
        return ["HEAD OFFICE", "KAMPALA BRANCH", "ENTEBBE BRANCH"];
      case "Somalia":
        return ["HEAD OFFICE", "MOGADISHU BRANCH", "HARGEISA BRANCH"];
      case "Ethiopia":
        return ["HEAD OFFICE", "ADDIS ABABA BRANCH", "DIRE DAWA BRANCH"];
      case "Philippines":
        return ["HEAD OFFICE", "MANILA BRANCH", "CEBU BRANCH"];
      case "Oman":
        return ["HEAD OFFICE", "MUSCAT BRANCH", "SALALAH BRANCH"];
      default:
        return [];
    }
  };

  // Get available sectors and branches based on selected country
  const availableSectors = getSectorByCountry(jobData.country);
  const availableBranches = getBranchesByCountry(jobData.country);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PERSONAL EFFECTS CUSTOMER INFORMATION</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="jobNumberDisplay" className="font-medium text-gray-700 mb-1 block">
            JOB NUMBER:
          </Label>
          <input
            type="text"
            id="jobNumberDisplay"
            name="jobNumberDisplay"
            value={jobData.jobNumber}
            className="border border-gray-300 px-3 py-2 rounded w-full font-semibold bg-gray-50 text-lg"
            readOnly
          />
        </div>
        
        <div>
          <Label htmlFor="customer" className="font-medium text-gray-700 mb-1 block">
            CUSTOMER:
          </Label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={jobData.customer}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Customer name"
            disabled={!isJobNumberGenerated}
          />
        </div>
        
        <div>
          <Label htmlFor="mobileNumber" className="font-medium text-gray-700 mb-1 block">
            MOBILE NUMBER:
          </Label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={jobData.mobileNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Customer mobile number"
            disabled={!isJobNumberGenerated}
          />
        </div>
        
        <div>
          <Label htmlFor="landNumber" className="font-medium text-gray-700 mb-1 block">
            LAND NUMBER:
          </Label>
          <input
            type="text"
            id="landNumber"
            name="landNumber"
            value={jobData.landNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Land line number"
            disabled={!isJobNumberGenerated}
          />
        </div>
        
        <div>
          <Label htmlFor="country" className="font-medium text-gray-700 mb-1 block">
            COUNTRY:
          </Label>
          <Select
            value={jobData.country}
            onValueChange={(value) => handleSelectChange("country", value)}
            disabled={!isJobNumberGenerated}
          >
            <SelectTrigger id="country" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <SelectValue placeholder="SELECT COUNTRY" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Sri Lanka">SRI LANKA</SelectItem>
              <SelectItem value="Qatar">QATAR</SelectItem>
              <SelectItem value="UAE">UAE</SelectItem>
              <SelectItem value="Bahrain">BAHRAIN</SelectItem>
              <SelectItem value="Saudi Arabia">SAUDI ARABIA</SelectItem>
              <SelectItem value="Tunisia">TUNISIA</SelectItem>
              <SelectItem value="Uganda">UGANDA</SelectItem>
              <SelectItem value="Somalia">SOMALIA</SelectItem>
              <SelectItem value="Ethiopia">ETHIOPIA</SelectItem>
              <SelectItem value="Philippines">PHILIPPINES</SelectItem>
              <SelectItem value="Oman">OMAN</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sector" className="font-medium text-gray-700 mb-1 block">
            SECTOR:
          </Label>
          <Select
            value={jobData.sector}
            onValueChange={(value) => handleSelectChange("sector", value)}
            disabled={!isJobNumberGenerated || !jobData.country}
          >
            <SelectTrigger id="sector" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <SelectValue placeholder="SELECT SECTOR" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {availableSectors.length > 0 ? (
                availableSectors.map((sector, index) => (
                  <SelectItem key={index} value={sector}>{sector}</SelectItem>
                ))
              ) : (
                <SelectItem value="no-sector" disabled>Select a country first</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <Label htmlFor="branch" className="font-medium text-gray-700 mb-1 block">
              BRANCH:
            </Label>
            <Select
              value={jobData.branch}
              onValueChange={(value) => handleSelectChange("branch", value)}
              disabled={!isJobNumberGenerated || !jobData.country}
            >
              <SelectTrigger id="branch" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <SelectValue placeholder="SELECT BRANCH" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {availableBranches.length > 0 ? (
                  availableBranches.map((branch, index) => (
                    <SelectItem key={index} value={branch}>{branch}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-branch" disabled>Select a country first</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="pt-7">
            <PackageButton />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="remarks" className="font-medium text-gray-700 mb-1 block">
            REMARKS:
          </Label>
          <Textarea
            id="remarks"
            name="remarks"
            value={jobData.remarks}
            onChange={handleInputChange}
            placeholder="Enter any additional information about personal effects or household goods"
            className="border border-gray-300 rounded w-full h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            disabled={!isJobNumberGenerated}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoSection;


import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobForm } from "../context/JobFormContext";
import PackageButton from "../details/PackageButton";

// Helper functions to get sector and branch data by country
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

interface PackageInfo {
  sr_no: number;
  description: string;
  dimensions: string;
  volume_in_meters: number;
  price: string;
  documents_fee: string;
  total: string;
}

interface SectorBranchSelectorProps {
  onPackageSelect: (pkg: PackageInfo) => void;
}

const SectorBranchSelector = ({ onPackageSelect }: SectorBranchSelectorProps) => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();
  
  const availableSectors = getSectorByCountry(jobData.country);
  const availableBranches = getBranchesByCountry(jobData.country);

  return (
    <>
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
          <PackageButton onSelectPackage={onPackageSelect} />
        </div>
      </div>
    </>
  );
};

export default SectorBranchSelector;

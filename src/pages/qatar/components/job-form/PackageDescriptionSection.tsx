
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PackageSelector from "./PackageSelector";
import PackageItemsTable from "./PackageItemsTable";
import { JobItem } from "../../types/jobTypes";

interface PackageDescriptionSectionProps {
  jobItems: JobItem[];
  onAddItem: (item: JobItem) => void;
}

const PackageDescriptionSection = ({ jobItems, onAddItem }: PackageDescriptionSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="bg-blue-600 text-white py-2 px-4">
        <CardTitle className="text-md">PACKAGE DESCRIPTION</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <PackageSelector onAddItem={onAddItem} />
        <PackageItemsTable items={jobItems} />
      </CardContent>
    </Card>
  );
};

export default PackageDescriptionSection;

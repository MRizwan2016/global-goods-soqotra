
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { packageOptions, PackageOption } from "@/data/packageOptions";
import { toast } from "sonner";
import { Upload, FileUp, Save, ArrowLeft } from "lucide-react";

interface ImportedPackage {
  srNo: number;
  description: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  volumeInMeters: number;
  price: number;
  documentsFee: number;
  total: number;
}

const PackageOptionsImport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importedData, setImportedData] = useState<ImportedPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for demonstration based on the image
  const sampleData: ImportedPackage[] = [
    {
      srNo: 1,
      description: "1 METER WOODEN BOX",
      dimensions: { length: 48, width: 32, height: 36 },
      volumeInMeters: 0.928,
      price: 338.55,
      documentsFee: 0.00,
      total: 338.55
    },
    {
      srNo: 2,
      description: "1.5 METER WOODEN BOX",
      dimensions: { length: 48, width: 36, height: 48 },
      volumeInMeters: 1.391,
      price: 507.83,
      documentsFee: 50.00,
      total: 557.83
    },
    {
      srNo: 3,
      description: "2 METER WOODEN BOX",
      dimensions: { length: 48, width: 48, height: 48 },
      volumeInMeters: 1.855,
      price: 677.10,
      documentsFee: 50.00,
      total: 727.10
    },
    {
      srNo: 4, 
      description: "2.5 METER WOODEN BOX",
      dimensions: { length: 60, width: 48, height: 48 },
      volumeInMeters: 2.319,
      price: 846.38,
      documentsFee: 50.00,
      total: 896.38
    },
    {
      srNo: 5,
      description: "3 METER WOODEN BOX",
      dimensions: { length: 72, width: 48, height: 48 },
      volumeInMeters: 2.783,
      price: 1015.65,
      documentsFee: 50.00,
      total: 1065.65
    },
    {
      srNo: 6,
      description: "4 METER WOODEN BOX",
      dimensions: { length: 96, width: 48, height: 48 },
      volumeInMeters: 3.710,
      price: 1354.20,
      documentsFee: 50.00,
      total: 1404.20
    },
    {
      srNo: 7,
      description: "1.14 METER WOODEN BOX",
      dimensions: { length: 48, width: 36, height: 48 },
      volumeInMeters: 1.391,
      price: 507.83,
      documentsFee: 50.00,
      total: 557.83
    },
    {
      srNo: 8,
      description: "BULLILIT CARTON BOX",
      dimensions: { length: 14, width: 14, height: 12 },
      volumeInMeters: 0.039,
      price: 14.40,
      documentsFee: 0.00,
      total: 14.40
    },
    {
      srNo: 9,
      description: "SMALL CARTON BOX",
      dimensions: { length: 19, width: 19, height: 19 },
      volumeInMeters: 0.115,
      price: 41.99,
      documentsFee: 0.00,
      total: 41.99
    },
    {
      srNo: 10,
      description: "MEDIUM CARTON",
      dimensions: { length: 19, width: 19, height: 29 },
      volumeInMeters: 0.176,
      price: 64.10,
      documentsFee: 0.00,
      total: 64.10
    },
    {
      srNo: 11,
      description: "LARGE CARTON BOX",
      dimensions: { length: 23, width: 23, height: 23 },
      volumeInMeters: 0.204,
      price: 74.49,
      documentsFee: 0.00,
      total: 74.49
    },
    {
      srNo: 12,
      description: "EXTRA LARGE CARTON BOX",
      dimensions: { length: 24, width: 24, height: 30 },
      volumeInMeters: 0.290,
      price: 105.80,
      documentsFee: 0.00,
      total: 105.80
    },
    {
      srNo: 13,
      description: "JUMBO CARTON BOX",
      dimensions: { length: 24, width: 24, height: 26 },
      volumeInMeters: 0.251,
      price: 91.69,
      documentsFee: 0.00,
      total: 91.69
    },
    {
      srNo: 14,
      description: "SUPER JUMBO CARTON BOX",
      dimensions: { length: 30, width: 30, height: 30 },
      volumeInMeters: 0.453,
      price: 165.31,
      documentsFee: 0.00,
      total: 165.31
    },
    {
      srNo: 15,
      description: "TRAVELLING BAG",
      dimensions: { length: 16, width: 23, height: 32 },
      volumeInMeters: 0.198,
      price: 72.10,
      documentsFee: 0.00,
      total: 72.10
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would parse the Excel/CSV file
    // For now, we'll use the sample data
    setIsLoading(true);
    
    setTimeout(() => {
      setImportedData(sampleData);
      setIsLoading(false);
      toast.success("Package options data imported successfully");
    }, 1000);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleManualEntry = () => {
    // For demonstration, we'll load the sample data
    setImportedData(sampleData);
    toast.success("Sample data loaded for demonstration");
  };

  const handleUpdatePackages = () => {
    // In a real app, this would update the database
    // For now, we'll just show a success message
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Package options updated successfully (Simulated)");
      // Navigate back to the package options list
      navigate("/master/package-options");
    }, 1500);
  };

  return (
    <Layout title="Import Package Options">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-green-800">Import Package Options</h3>
            <p className="text-sm text-green-600 mt-1">
              Upload a spreadsheet or enter data manually to update package options
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => navigate("/master/package-options")}
              className="bg-gray-500 hover:bg-gray-600"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to List
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Button
              onClick={handleImportClick}
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isLoading}
            >
              <Upload size={18} className="mr-2" />
              Import Spreadsheet
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            
            <Button
              onClick={handleManualEntry}
              className="bg-teal-500 hover:bg-teal-600"
              disabled={isLoading}
            >
              <FileUp size={18} className="mr-2" />
              Load Sample Data
            </Button>
          </div>

          {importedData.length > 0 && (
            <>
              <div className="border rounded-lg overflow-hidden mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell className="font-medium">SR NO</TableCell>
                      <TableCell className="font-medium">DESCRIPTION</TableCell>
                      <TableCell className="font-medium">DIMENSIONS (L×W×H)</TableCell>
                      <TableCell className="font-medium">VOLUME IN METERS</TableCell>
                      <TableCell className="font-medium">PRICE</TableCell>
                      <TableCell className="font-medium">DOCUMENTS FEE</TableCell>
                      <TableCell className="font-medium">TOTAL</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importedData.map((pkg) => (
                      <TableRow key={pkg.srNo}>
                        <TableCell>{pkg.srNo}</TableCell>
                        <TableCell>{pkg.description}</TableCell>
                        <TableCell>
                          {`${pkg.dimensions.length}×${pkg.dimensions.width}×${pkg.dimensions.height}`}
                        </TableCell>
                        <TableCell>{pkg.volumeInMeters.toFixed(3)}</TableCell>
                        <TableCell>{`QAR ${pkg.price.toFixed(2)}`}</TableCell>
                        <TableCell>{`QAR ${pkg.documentsFee.toFixed(2)}`}</TableCell>
                        <TableCell className="font-bold">{`QAR ${pkg.total.toFixed(2)}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleUpdatePackages}
                  className="bg-green-500 hover:bg-green-600"
                  disabled={isLoading}
                >
                  <Save size={18} className="mr-2" />
                  Update Package Options
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PackageOptionsImport;

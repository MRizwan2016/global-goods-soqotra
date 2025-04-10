
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, FileSpreadsheet, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';

const PackageOptionsImport = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImported, setIsImported] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Read and preview the file
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        // Only show first 5 rows in preview
        setPreviewData(data.slice(0, 5));
      } catch (error) {
        console.error("Error reading Excel file:", error);
        toast.error("Failed to read Excel file. Please ensure it's a valid Excel file.");
      }
    };
    reader.readAsBinaryString(selectedFile);
  };
  
  const handleImport = async () => {
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          
          // Process and validate the data
          const processedData = data.map((row: any) => ({
            id: `pkg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            description: row.description || row.Description || row.name || row.Name || 'Unknown Package',
            dimensions: {
              length: row.length || row.Length || 0,
              width: row.width || row.Width || 0,
              height: row.height || row.Height || 0
            },
            pricing: {
              standard: row.standardPrice || row.StandardPrice || 0,
              express: row.expressPrice || row.ExpressPrice || 0
            },
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          
          // Save to localStorage
          const existingPackages = JSON.parse(localStorage.getItem('packageOptions') || '[]');
          const updatedPackages = [...existingPackages, ...processedData];
          localStorage.setItem('packageOptions', JSON.stringify(updatedPackages));
          
          setIsImported(true);
          setIsLoading(false);
          toast.success(`Successfully imported ${processedData.length} package options`);
        } catch (error) {
          console.error("Error processing Excel data:", error);
          toast.error("Failed to process Excel data. Please check the file format.");
          setIsLoading(false);
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error during import:", error);
      toast.error("Failed to import package options");
      setIsLoading(false);
    }
  };
  
  return (
    <Layout title="Import Package Options">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
          <h3 className="text-lg font-medium text-purple-800 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-purple-700" />
            Import Package Options
          </h3>
        </div>
        
        <div className="p-6">
          {!isImported ? (
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h4 className="text-sm font-medium text-purple-800 mb-2">Instructions:</h4>
                <ul className="list-disc pl-5 text-sm text-purple-700 space-y-1">
                  <li>Prepare an Excel file with package data</li>
                  <li>Include columns: description, length, width, height, standardPrice, expressPrice</li>
                  <li>Upload the file using the button below</li>
                  <li>Review the preview and confirm import</li>
                </ul>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label 
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-purple-500 mb-2" />
                  <span className="text-lg font-medium text-gray-700">Click to upload Excel file</span>
                  <span className="text-sm text-gray-500 mt-1">.xlsx or .xls format</span>
                </label>
                {file && (
                  <div className="mt-4 text-sm font-medium text-green-600">
                    Selected: {file.name}
                  </div>
                )}
              </div>
              
              {previewData.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-2">Preview (first 5 rows):</h4>
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(previewData[0]).map((key) => (
                            <th 
                              key={key} 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {previewData.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            {Object.values(row).map((value: any, j) => (
                              <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleImport}
                  disabled={!file || isLoading}
                  className="bg-purple-600 hover:bg-purple-700 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Import Package Data
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => navigate("/master/package/list")}
                  variant="outline"
                  className="border-gray-300 hover:border-purple-400"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Import Successful</h3>
              <p className="text-gray-500 mb-6">Your package options have been imported successfully.</p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => navigate("/master/package/list")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  View Package List
                </Button>
                <Button
                  onClick={() => {
                    setFile(null);
                    setPreviewData([]);
                    setIsImported(false);
                  }}
                  variant="outline"
                >
                  Import Another File
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default PackageOptionsImport;

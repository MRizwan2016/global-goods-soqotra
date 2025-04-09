
import { useState, useEffect } from "react";
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
import { Edit, Trash, Plus, Search, FileUp, Globe, Package } from "lucide-react";
import { packageOptions, PackageOption } from "@/data/packageOptions";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PackageOptionsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPackages, setFilteredPackages] = useState<PackageOption[]>(packageOptions);
  const [destinationTab, setDestinationTab] = useState("sri-lanka");
  const [displayMode, setDisplayMode] = useState<"volume" | "weight">("volume");

  useEffect(() => {
    const filtered = packageOptions.filter((pkg) =>
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackages(filtered);
  }, [searchTerm]);

  // Set display mode based on selected tab
  useEffect(() => {
    if (["sri-lanka", "philippines"].includes(destinationTab)) {
      setDisplayMode("volume");
    } else {
      setDisplayMode("weight");
    }
  }, [destinationTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id: number) => {
    navigate(`/master/package-options/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    // In a real application, this would make an API call to delete the package
    toast.success("Package option deleted successfully (Simulated)");
    // For demonstration, we filter out the deleted package
    setFilteredPackages(filteredPackages.filter(pkg => pkg.id !== id));
  };

  const handleAddNew = () => {
    navigate("/master/package-options/add");
  };

  const handleImportPackages = () => {
    navigate("/master/package-options/import");
  };

  // Helper to get price for specific destination
  const getPriceForDestination = (pkg: PackageOption, destination: string) => {
    switch (destination) {
      case "sri-lanka":
        return {
          price: pkg.pricing.sriLanka.price,
          docFee: pkg.pricing.sriLanka.documentsFee,
          total: pkg.pricing.sriLanka.price + pkg.pricing.sriLanka.documentsFee
        };
      case "philippines":
        return {
          price: pkg.pricing.philippines.price,
          docFee: pkg.pricing.philippines.documentsFee,
          total: pkg.pricing.philippines.price + pkg.pricing.philippines.documentsFee
        };
      case "kenya-mombasa":
        return {
          price: pkg.pricing.kenya.mombasa.price,
          docFee: pkg.pricing.kenya.mombasa.documentsFee,
          total: pkg.pricing.kenya.mombasa.price + pkg.pricing.kenya.mombasa.documentsFee
        };
      case "kenya-nairobi":
        return {
          price: pkg.pricing.kenya.nairobi.price,
          docFee: pkg.pricing.kenya.nairobi.documentsFee,
          total: pkg.pricing.kenya.nairobi.price + pkg.pricing.kenya.nairobi.documentsFee
        };
      case "eritrea-asmara":
        return {
          price: pkg.pricing.eritrea.asmara.price,
          docFee: pkg.pricing.eritrea.asmara.documentsFee,
          total: pkg.pricing.eritrea.asmara.price + pkg.pricing.eritrea.asmara.documentsFee
        };
      case "eritrea-hargeisa":
        return {
          price: pkg.pricing.eritrea.hargeisa.price,
          docFee: pkg.pricing.eritrea.hargeisa.documentsFee,
          total: pkg.pricing.eritrea.hargeisa.price + pkg.pricing.eritrea.hargeisa.documentsFee
        };
      case "sudan-port-sudan":
        return {
          price: pkg.pricing.sudan.portSudan.price,
          docFee: pkg.pricing.sudan.portSudan.documentsFee,
          total: pkg.pricing.sudan.portSudan.price + pkg.pricing.sudan.portSudan.documentsFee
        };
      default:
        return { price: pkg.price, docFee: pkg.documentsFee, total: pkg.total };
    }
  };

  return (
    <Layout title="Package Options">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-green-800">Package Options</h3>
          <div className="flex space-x-2">
            <Button
              onClick={handleImportPackages}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <FileUp size={18} className="mr-2" />
              Import Packages
            </Button>
            <Button
              onClick={handleAddNew}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus size={18} className="mr-2" />
              Add Package Option
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search package options..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="sri-lanka" value={destinationTab} onValueChange={setDestinationTab}>
            <div className="mb-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2">
                <TabsTrigger value="sri-lanka" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Sri Lanka
                </TabsTrigger>
                <TabsTrigger value="philippines" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Philippines
                </TabsTrigger>
                <TabsTrigger value="kenya-mombasa" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Kenya (Mombasa)
                </TabsTrigger>
                <TabsTrigger value="kenya-nairobi" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Kenya (Nairobi)
                </TabsTrigger>
                <TabsTrigger value="eritrea-asmara" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Eritrea (Asmara)
                </TabsTrigger>
                <TabsTrigger value="eritrea-hargeisa" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Eritrea (Hargeisa)
                </TabsTrigger>
                <TabsTrigger value="sudan-port-sudan" className="text-xs md:text-sm">
                  <Globe className="mr-1 h-4 w-4" />
                  Sudan
                </TabsTrigger>
              </TabsList>
            </div>

            {["sri-lanka", "philippines", "kenya-mombasa", "kenya-nairobi", "eritrea-asmara", "eritrea-hargeisa", "sudan-port-sudan"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <Card>
                  <div className="p-2 bg-gray-50 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <Package className="h-5 w-5" />
                        <span className="font-medium">
                          {displayMode === "volume" ? "Volume-Based Pricing" : "Weight-Based Pricing"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {displayMode === "volume" ? "Prices calculated per cubic meter" : "Prices calculated per kilogram"}
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell className="font-medium">ID</TableCell>
                          <TableCell className="font-medium">Description</TableCell>
                          <TableCell className="font-medium">Dimensions (L×W×H)</TableCell>
                          {displayMode === "volume" ? (
                            <TableCell className="font-medium">Volume (m³)</TableCell>
                          ) : (
                            <TableCell className="font-medium">Weight (kg)</TableCell>
                          )}
                          <TableCell className="font-medium">Price</TableCell>
                          <TableCell className="font-medium">Docs Fee</TableCell>
                          <TableCell className="font-medium">Total</TableCell>
                          <TableCell className="font-medium">Actions</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPackages.map((pkg) => {
                          const priceInfo = getPriceForDestination(pkg, tab);
                          return (
                            <TableRow key={pkg.id}>
                              <TableCell>{pkg.id}</TableCell>
                              <TableCell>{pkg.description}</TableCell>
                              <TableCell>
                                {`${pkg.dimensions.length}×${pkg.dimensions.width}×${pkg.dimensions.height}`}
                              </TableCell>
                              {displayMode === "volume" ? (
                                <TableCell>{pkg.volumeInMeters.toFixed(3)}</TableCell>
                              ) : (
                                <TableCell>{pkg.weightInKg}</TableCell>
                              )}
                              <TableCell>{priceInfo.price.toFixed(2)}</TableCell>
                              <TableCell>{priceInfo.docFee.toFixed(2)}</TableCell>
                              <TableCell className="font-bold">{priceInfo.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={() => handleEdit(pkg.id)}
                                    className="bg-blue-500 hover:bg-blue-600 p-1 h-8 w-8"
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(pkg.id)}
                                    className="bg-red-500 hover:bg-red-600 p-1 h-8 w-8"
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PackageOptionsList;


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
import { Edit, Trash, Plus, Search } from "lucide-react";
import { packageOptions, PackageOption } from "@/data/packageOptions";
import { toast } from "sonner";

const PackageOptionsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPackages, setFilteredPackages] = useState<PackageOption[]>(packageOptions);

  useEffect(() => {
    const filtered = packageOptions.filter((pkg) =>
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackages(filtered);
  }, [searchTerm]);

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

  return (
    <Layout title="Package Options">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-green-800">Package Options</h3>
          <Button
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus size={18} className="mr-2" />
            Add Package Option
          </Button>
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

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="font-medium">ID</TableCell>
                  <TableCell className="font-medium">Description</TableCell>
                  <TableCell className="font-medium">Dimensions (L×W×H)</TableCell>
                  <TableCell className="font-medium">Volume (m³)</TableCell>
                  <TableCell className="font-medium">Price</TableCell>
                  <TableCell className="font-medium">Docs Fee</TableCell>
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="font-medium">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.id}</TableCell>
                    <TableCell>{pkg.description}</TableCell>
                    <TableCell>
                      {`${pkg.dimensions.length}×${pkg.dimensions.width}×${pkg.dimensions.height}`}
                    </TableCell>
                    <TableCell>{pkg.volumeInMeters.toFixed(3)}</TableCell>
                    <TableCell>{pkg.price.toFixed(2)}</TableCell>
                    <TableCell>{pkg.documentsFee.toFixed(2)}</TableCell>
                    <TableCell className="font-bold">{pkg.total.toFixed(2)}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackageOptionsList;

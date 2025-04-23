
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { mockDrivers } from "./data/mockDeliveryData";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  Phone,
  UserRoundCog,
  BadgeCheck,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Driver } from "./types/deliveryTracking";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Extended Driver type with assigned invoice
interface ExtendedDriver extends Driver {
  assignedInvoice?: string;
}

const DriverManagement = () => {
  // Add sample invoice numbers to some drivers
  const extendedDrivers: ExtendedDriver[] = mockDrivers.map((driver, index) => ({
    ...driver,
    assignedInvoice: index < 3 ? `GY-KE-${23000 + index}` : undefined
  }));

  const [drivers, setDrivers] = useState<ExtendedDriver[]>(extendedDrivers);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    licenseNumber: "",
    contactNumber: "",
    status: "available"
  });

  const filteredDrivers = drivers.filter((driver) => {
    const searchMatch = 
      driver.name.toLowerCase().includes(searchText.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      driver.contactNumber.includes(searchText) ||
      (driver.assignedInvoice && driver.assignedInvoice.toLowerCase().includes(searchText.toLowerCase()));

    const statusMatch = statusFilter === "all" || driver.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "on-delivery":
        return <Badge className="bg-blue-500">On Delivery</Badge>;
      case "unavailable":
        return <Badge className="bg-red-500">Unavailable</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.licenseNumber || !newDriver.contactNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newDriverRecord: ExtendedDriver = {
      id: `driver-${Date.now()}`,
      name: newDriver.name,
      licenseNumber: newDriver.licenseNumber,
      contactNumber: newDriver.contactNumber,
      status: newDriver.status as 'available' | 'on-delivery' | 'unavailable'
    };

    setDrivers([newDriverRecord, ...drivers]);
    setIsAddDriverOpen(false);
    setNewDriver({
      name: "",
      licenseNumber: "",
      contactNumber: "",
      status: "available"
    });

    toast.success("Driver added successfully");
  };

  const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDriver(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout title="Driver Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya/deliveries" />
            <h3 className="text-lg font-medium text-green-800">Kenya Driver Management</h3>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
            onClick={() => setIsAddDriverOpen(true)}
          >
            <Plus size={16} />
            Add New Driver
          </Button>
        </div>

        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">Driver Directory</h1>
              <p className="text-gray-500 text-sm">Manage your delivery personnel</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <Button 
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className="h-8 text-xs"
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "available" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("available")}
                  className="h-8 text-xs bg-green-500 hover:bg-green-600 border-green-500"
                >
                  Available
                </Button>
                <Button 
                  variant={statusFilter === "on-delivery" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("on-delivery")}
                  className="h-8 text-xs bg-blue-500 hover:bg-blue-600 border-blue-500"
                >
                  On Delivery
                </Button>
                <Button 
                  variant={statusFilter === "unavailable" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("unavailable")}
                  className="h-8 text-xs bg-red-500 hover:bg-red-600 border-red-500"
                >
                  Unavailable
                </Button>
              </div>

              <div className="relative ml-auto">
                <Input
                  type="text"
                  placeholder="Search drivers or invoices..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead>Name</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Invoice</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.length > 0 ? (
                  filteredDrivers.map((driver) => (
                    <TableRow key={driver.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <UserRoundCog size={16} className="mr-2 text-gray-500" />
                          {driver.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <BadgeCheck size={16} className="mr-2 text-gray-500" />
                          {driver.licenseNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 text-gray-500" />
                          {driver.contactNumber}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        {driver.assignedInvoice ? (
                          <div className="flex items-center">
                            <FileText size={16} className="mr-2 text-gray-500" />
                            <span className="text-blue-600 font-medium">{driver.assignedInvoice}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No invoice assigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No drivers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {filteredDrivers.length} {filteredDrivers.length === 1 ? 'driver' : 'drivers'} found
          </div>
        </div>
      </div>

      {/* Add Driver Dialog */}
      <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Driver</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name</Label>
              <Input
                id="driverName"
                name="name"
                value={newDriver.name}
                onChange={handleDriverInputChange}
                placeholder="Enter driver's full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                value={newDriver.licenseNumber}
                onChange={handleDriverInputChange}
                placeholder="Enter license number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={newDriver.contactNumber}
                onChange={handleDriverInputChange}
                placeholder="Enter contact number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={newDriver.status}
                onChange={handleDriverInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="available">Available</option>
                <option value="on-delivery">On Delivery</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDriverOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDriver}>
              Add Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DriverManagement;

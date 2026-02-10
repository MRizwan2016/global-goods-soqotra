
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { mockVehicles } from "./data/mockDeliveryData";
import { Button } from "@/components/ui/button";
import { Vehicle } from "./types/deliveryTracking";
import AddVehicleDialog from "./components/Vehicle/AddVehicleDialog";
import VehicleFilterBar from "./components/Vehicle/VehicleFilterBar";
import VehicleTable from "./components/Vehicle/VehicleTable";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<{
    registrationNumber: string;
    type: "truck" | "van" | "motorcycle";
    capacity: string;
    status: "available" | "on-delivery" | "maintenance";
  }>({
    registrationNumber: "",
    type: "truck",
    capacity: "",
    status: "available"
  });

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchMatch =
      vehicle.registrationNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.capacity.toLowerCase().includes(searchText.toLowerCase());

    const statusMatch = statusFilter === "all" || vehicle.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleAddVehicle = () => {
    if (!newVehicle.registrationNumber || !newVehicle.capacity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const vehicleToAdd: Vehicle = {
      id: `v-${Date.now()}`,
      ...newVehicle,
    };

    setVehicles(prev => [vehicleToAdd, ...prev]);
    setIsAddVehicleDialogOpen(false);
    setNewVehicle({
      registrationNumber: "",
      type: "truck",
      capacity: "",
      status: "available"
    });
    toast.success("New vehicle added successfully");
  };

  return (
    <Layout title="Vehicle Management">
      <PageBreadcrumb className="mb-4" />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya/deliveries" />
            <h3 className="text-lg font-medium text-green-800">Kenya Fleet Management</h3>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
            onClick={() => setIsAddVehicleDialogOpen(true)}
          >
            <Plus size={16} />
            Add New Vehicle
          </Button>
        </div>

        <AddVehicleDialog
          open={isAddVehicleDialogOpen}
          setOpen={setIsAddVehicleDialogOpen}
          newVehicle={newVehicle}
          setNewVehicle={setNewVehicle}
          onAddVehicle={handleAddVehicle}
        />

        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">Vehicle Inventory</h1>
              <p className="text-gray-500 text-sm">Manage your fleet of delivery vehicles</p>
            </div>
            <VehicleFilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
          <VehicleTable vehicles={filteredVehicles} />
          <div className="mt-4 text-sm text-gray-500">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? "vehicle" : "vehicles"} found
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleManagement;

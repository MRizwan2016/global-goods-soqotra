
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Truck } from "lucide-react";
import VehicleList from "./components/vehicle-management/VehicleList";
import VehicleStats from "./components/vehicle-management/VehicleStats";
import VehicleForm from "./components/vehicle-management/VehicleForm";
import { mockVehicles } from "./data/mockVehicles";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const VehicleManagement = () => {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  return (
    <Layout title="Vehicle Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BackButton to="/qatar" />
            <h1 className="text-xl font-bold">QATAR VEHICLE MANAGEMENT</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAddVehicle(!showAddVehicle)}
              className="bg-green-600 hover:bg-green-700"
            >
              {showAddVehicle ? (
                <>
                  <Truck className="mr-2 h-4 w-4" /> View Vehicles
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                </>
              )}
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" /> Export List
            </Button>
          </div>
        </div>
        
        {showAddVehicle ? (
          <VehicleForm onCancel={() => setShowAddVehicle(false)} />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">Vehicle List</TabsTrigger>
              <TabsTrigger value="stats">Vehicle Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-0">
              <div className="mb-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                <h3 className="font-medium mb-1">Vehicle Management</h3>
                <p className="text-sm text-gray-600">
                  Total Vehicles: <span className="font-semibold">{mockVehicles.length}</span> | 
                  Active Vehicles: <span className="font-semibold">{mockVehicles.filter(v => v.status === "RUN").length}</span> | 
                  In Maintenance: <span className="font-semibold">{mockVehicles.filter(v => v.status === "MAINTENANCE").length}</span> |
                  In Garage: <span className="font-semibold">{mockVehicles.filter(v => v.status === "GARAGE").length}</span>
                </p>
              </div>
              
              <VehicleList />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <VehicleStats />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default VehicleManagement;

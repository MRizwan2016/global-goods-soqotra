
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockVehicles } from "../../data/mockVehicles";

// Calculate vehicle statistics
const vehicleStats = [
  {
    type: "Lorry",
    total: mockVehicles.filter(v => v.type.includes("LORRY")).length,
    running: mockVehicles.filter(v => v.type.includes("LORRY") && v.status === "RUN").length,
    maintenance: mockVehicles.filter(v => v.type.includes("LORRY") && v.status === "MAINTENANCE").length,
    garage: mockVehicles.filter(v => v.type.includes("LORRY") && v.status === "GARAGE").length,
  },
  {
    type: "Truck",
    total: mockVehicles.filter(v => v.type.includes("TRUCK")).length,
    running: mockVehicles.filter(v => v.type.includes("TRUCK") && v.status === "RUN").length,
    maintenance: mockVehicles.filter(v => v.type.includes("TRUCK") && v.status === "MAINTENANCE").length,
    garage: mockVehicles.filter(v => v.type.includes("TRUCK") && v.status === "GARAGE").length,
  },
  {
    type: "Fork Lift",
    total: mockVehicles.filter(v => v.type === "FORK LIFT").length,
    running: mockVehicles.filter(v => v.type === "FORK LIFT" && v.status === "RUN").length,
    maintenance: mockVehicles.filter(v => v.type === "FORK LIFT" && v.status === "MAINTENANCE").length,
    garage: mockVehicles.filter(v => v.type === "FORK LIFT" && v.status === "GARAGE").length,
  },
];

const VehicleStats: React.FC = () => {
  // Create stats for specific vehicles
  const specificVehicleUsage = [
    { name: "41067", used: 42, total: 65, utilization: 64 },
    { name: "41073", used: 38, total: 60, utilization: 63 },
    { name: "41070", used: 31, total: 58, utilization: 53 },
    { name: "514005", used: 22, total: 45, utilization: 49 },
    { name: "119927", used: 18, total: 40, utilization: 45 },
    { name: "74827", used: 15, total: 35, utilization: 43 },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Vehicle Types Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vehicleStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total" fill="#3b82f6" />
                <Bar dataKey="running" name="Running" fill="#22c55e" />
                <Bar dataKey="maintenance" name="Maintenance" fill="#f59e0b" />
                <Bar dataKey="garage" name="In Garage" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Vehicle Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={specificVehicleUsage}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilization" name="Utilization %" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Total Fleet Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockVehicles.length}</p>
            <p className="text-sm text-gray-500">Vehicles in the system</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Available Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {mockVehicles.filter(v => v.status === "RUN").length}
            </p>
            <p className="text-sm text-gray-500">Ready for assignment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Maintenance Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">
              {mockVehicles.filter(v => v.status === "MAINTENANCE").length}
            </p>
            <p className="text-sm text-gray-500">Vehicles in maintenance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleStats;

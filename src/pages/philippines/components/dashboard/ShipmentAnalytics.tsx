
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for the Philippines shipment data
const philippinesMonthlyData = [
  { name: "Jan", shipments: 352 },
  { name: "Feb", shipments: 389 },
  { name: "Mar", shipments: 420 },
  { name: "Apr", shipments: 378 },
  { name: "May", shipments: 405 },
  { name: "Jun", shipments: 425 }
];

// Mock data for shipment types
const shipmentTypeData = [
  { name: "Manila", value: 485 },
  { name: "Cebu", value: 310 },
  { name: "Davao", value: 245 },
  { name: "Subic Bay", value: 178 },
  { name: "Other", value: 196 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const ShipmentAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Philippines Shipment Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Monthly Shipments</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={philippinesMonthlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shipments" fill="#0088FE" name="Shipments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Port Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={shipmentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {shipmentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentAnalytics;

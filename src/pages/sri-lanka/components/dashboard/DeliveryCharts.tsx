
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { sriLankaShipmentData } from "@/data/mockData";

// Mock data for regional distribution
const regionalData = [
  { name: "Colombo", value: 485 },
  { name: "Galle", value: 221 },
  { name: "Kandy", value: 198 },
  { name: "Jaffna", value: 145 },
  { name: "Other", value: 153 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const DeliveryCharts: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Sri Lanka Shipment Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium mb-3">Shipments by City</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={sriLankaShipmentData}
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
                  <Bar dataKey="shipments" fill="#8884d8" name="Shipments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Regional Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={regionalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionalData.map((entry, index) => (
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

export default DeliveryCharts;

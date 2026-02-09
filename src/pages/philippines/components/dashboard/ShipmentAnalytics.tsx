
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const philippinesMonthlyData = [
  { name: "Jan", shipments: 352 },
  { name: "Feb", shipments: 389 },
  { name: "Mar", shipments: 420 },
  { name: "Apr", shipments: 378 },
  { name: "May", shipments: 405 },
  { name: "Jun", shipments: 425 }
];

const shipmentTypeData = [
  { name: "Manila", value: 485 },
  { name: "Cebu", value: 310 },
  { name: "Davao", value: 245 },
  { name: "Subic Bay", value: 178 },
  { name: "Other", value: 196 }
];

const NAVY_PALETTE = ['#1e2a3a', '#3b5998', '#5a7ab5', '#8ba3cc', '#b8cce2'];

const ShipmentAnalytics: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-[#1e2a3a]">Philippines Shipment Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[#1e2a3a] mb-3">Monthly Shipments</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={philippinesMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shipments" fill="#3b5998" name="Shipments" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-[#1e2a3a] mb-3">Port Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipmentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#3b5998"
                    dataKey="value"
                  >
                    {shipmentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={NAVY_PALETTE[index % NAVY_PALETTE.length]} />
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


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { sriLankaShipmentData } from "@/data/mockData";

// Empty data - no dummy data
const regionalData: { name: string; value: number }[] = [];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const DeliveryCharts: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Sri Lanka Shipment Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium mb-3">Shipments by City</h4>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">No shipment data available</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Regional Distribution</h4>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">No regional data available</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryCharts;

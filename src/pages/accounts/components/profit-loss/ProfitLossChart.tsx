
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ProfitLossData } from "../../types/profitLossTypes";

interface ProfitLossChartProps {
  data: ProfitLossData | null;
}

const ProfitLossChart: React.FC<ProfitLossChartProps> = ({ data }) => {
  if (!data || !data.monthlyData || data.monthlyData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No data available for chart</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data.monthlyData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
        />
        <Legend />
        <Bar dataKey="revenue" name="Revenue" fill="#4ade80" />
        <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
        <Bar dataKey="profit" name="Net Profit" fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfitLossChart;

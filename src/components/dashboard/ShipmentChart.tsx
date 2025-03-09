
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ShipmentChartProps {
  data: any[];
  title: string;
  dataKey: string;
  barColor?: string;
}

const ShipmentChart = ({ data, title, dataKey, barColor = "#3e92cc" }: ShipmentChartProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-4 text-gray-800">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill={barColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShipmentChart;

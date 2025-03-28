
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface ShipmentChartProps {
  data: Array<{name: string, shipments: number}>;
  title: string;
  color: string;
}

const ShipmentChart = ({ data, title, color }: ShipmentChartProps) => {
  return (
    <div className="bg-white rounded-md p-4 shadow-lg transition-transform hover:shadow-xl duration-300">
      <h3 className={`text-lg font-medium mb-4 text-${color}-600`}>{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="shipments" fill={`#${color === 'blue' ? '0a2463' : color === 'red' ? 'dc2626' : color === 'green' ? '16a34a' : 'f59e0b'}`} name="Shipments" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface ShipmentAnalyticsProps {
  kenyaData: Array<{name: string, shipments: number}>;
  tunisiaData: Array<{name: string, shipments: number}>;
  ugandaData: Array<{name: string, shipments: number}>;
  philippinesData: Array<{name: string, shipments: number}>;
}

const ShipmentAnalytics = ({ 
  kenyaData, 
  tunisiaData, 
  ugandaData, 
  philippinesData 
}: ShipmentAnalyticsProps) => {
  return (
    <div className="mb-8 animate-fade-in" style={{animationDelay: "0.6s"}}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ShipmentChart 
          data={kenyaData} 
          title="Kenya Shipments - 2023" 
          color="blue" 
        />
        <ShipmentChart 
          data={tunisiaData} 
          title="Tunisia Shipments - 2023" 
          color="red" 
        />
        <ShipmentChart 
          data={ugandaData} 
          title="Uganda Shipments - 2023" 
          color="green" 
        />
        <ShipmentChart 
          data={philippinesData} 
          title="Philippines Shipments - 2023" 
          color="amber" 
        />
      </div>
    </div>
  );
};

export default ShipmentAnalytics;

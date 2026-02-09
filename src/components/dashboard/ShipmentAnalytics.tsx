
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

const NAVY_COLORS: Record<string, string> = {
  blue: '#1e2a3a',
  red: '#3b5998',
  green: '#2c4a6e',
  amber: '#4a6fa5',
};

const ShipmentChart = ({ data, title, color }: ShipmentChartProps) => {
  const barColor = NAVY_COLORS[color] || '#1e2a3a';
  
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-sm font-semibold text-[#1e2a3a] mb-4 uppercase tracking-wide">{title}</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
            <XAxis dataKey="name" fontSize={12} tick={{ fill: '#64748b' }} />
            <YAxis fontSize={12} tick={{ fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)' 
              }} 
            />
            <Legend />
            <Bar dataKey="shipments" fill={barColor} name="Shipments" radius={[4, 4, 0, 0]} />
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
    <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
      <h2 className="text-lg font-semibold text-[#1e2a3a] mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#3b5998] rounded-full inline-block"></span>
        Shipment Analytics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ShipmentChart 
          data={kenyaData} 
          title="Kenya Shipments — 2023" 
          color="blue" 
        />
        <ShipmentChart 
          data={tunisiaData} 
          title="Tunisia Shipments — 2023" 
          color="red" 
        />
        <ShipmentChart 
          data={ugandaData} 
          title="Uganda Shipments — 2023" 
          color="green" 
        />
        <ShipmentChart 
          data={philippinesData} 
          title="Philippines Shipments — 2023" 
          color="amber" 
        />
      </div>
    </div>
  );
};

export default ShipmentAnalytics;

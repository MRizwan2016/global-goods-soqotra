
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NAVY_PALETTE = ['#1e2a3a', '#3b5998', '#5a7ab5', '#8ba3cc', '#b8cce2'];

interface DeliveryChartsProps {
  monthlyShipments: Array<{name: string, shipments: number}>;
  cargoByCounty: Array<{name: string, value: number}>;
  chartColors: string[];
}

const DeliveryCharts = ({ monthlyShipments, cargoByCounty }: DeliveryChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="shadow-sm hover:shadow transition-shadow border border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#1e2a3a]">Monthly Shipments</CardTitle>
          <CardDescription>Total cargo deliveries by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyShipments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="shipments" fill="#3b5998" name="Shipments" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm hover:shadow transition-shadow border border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#1e2a3a]">Delivery Distribution</CardTitle>
          <CardDescription>Cargo distribution by county</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cargoByCounty}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#3b5998"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cargoByCounty.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={NAVY_PALETTE[index % NAVY_PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryCharts;

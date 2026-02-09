
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleStats } from "../../types/jobTypes";

interface VehicleStatisticsProps {
  vehicleStats: VehicleStats[];
  totals: {
    totalJobs: number;
    totalDeliveries: number;
    totalCollections: number;
  };
}

const VehicleStatistics = ({ vehicleStats, totals }: VehicleStatisticsProps) => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow mb-6 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg uppercase text-[#1e2a3a]">VEHICLE STATISTICS</CardTitle>
        <CardDescription>VEHICLE ALLOCATION AND JOB DISTRIBUTION</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#3b5998]/10 text-[#1e2a3a]">
                <th className="border p-2 text-center">NUM</th>
                <th className="border p-2 text-center">VEHICLE</th>
                <th className="border p-2 text-center">TOTAL JOBS</th>
                <th className="border p-2 text-center">DELIVERIES</th>
                <th className="border p-2 text-center">COLLECTIONS</th>
              </tr>
            </thead>
            <tbody>
              {vehicleStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center font-medium">{stat.vehicle}</td>
                  <td className="border p-2 text-center">{stat.totalJobs}</td>
                  <td className="border p-2 text-center">{stat.deliveries}</td>
                  <td className="border p-2 text-center">{stat.collections}</td>
                </tr>
              ))}
              <tr className="bg-[#3b5998] text-white font-bold">
                <td className="border p-2 text-right" colSpan={2}>TOTAL JOBS:</td>
                <td className="border p-2 text-center">{totals.totalJobs}</td>
                <td className="border p-2 text-center">{totals.totalDeliveries}</td>
                <td className="border p-2 text-center">{totals.totalCollections}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleStatistics;

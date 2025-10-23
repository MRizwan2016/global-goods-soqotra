import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, CheckCircle, Clock, DollarSign, RefreshCw } from "lucide-react";
import { VehicleJobStorageService } from "../../services/VehicleJobStorageService";
import { mockVehicles } from "../../data/mockVehicles";

interface VehicleStats {
  vehicleId: string;
  totalJobs: number;
  deliveries: number;
  collections: number;
  completedJobs: number;
  pendingJobs: number;
  totalRevenue: number;
}

interface VehicleStatisticsPanelProps {
  onRefresh?: () => void;
}

const VehicleStatisticsPanel: React.FC<VehicleStatisticsPanelProps> = ({ onRefresh }) => {
  const [vehicleStats, setVehicleStats] = useState<VehicleStats[]>([]);
  const [totals, setTotals] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadStatistics = () => {
    setIsLoading(true);
    try {
      const { vehicleStats: stats, totals: totalStats } = VehicleJobStorageService.getVehicleStatistics();
      setVehicleStats(stats);
      setTotals(totalStats);
    } catch (error) {
      console.error('Error loading vehicle statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  const handleRefresh = () => {
    VehicleJobStorageService.updateVehicleStatistics();
    loadStatistics();
    onRefresh?.();
  };

  const getVehicleName = (vehicleId: string) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId || v.number === vehicleId);
    return vehicle ? `${vehicle.number} - ${vehicle.description}` : vehicleId;
  };

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle Statistics</h2>
        <Button 
          onClick={handleRefresh} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalJobs || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.deliveries || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.collections || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.completedJobs || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">QAR {(totals.totalRevenue || 0).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicleStats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No vehicle assignments found</p>
              <p className="text-sm">Assign jobs to vehicles to see statistics</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left">Vehicle</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Total Jobs</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Deliveries</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Collections</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Completed</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Pending</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Revenue (QAR)</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleStats.map((stats) => (
                    <tr key={stats.vehicleId} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 font-medium">
                        {getVehicleName(stats.vehicleId)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {stats.totalJobs}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {stats.deliveries}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {stats.collections}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          {stats.completedJobs}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <span className="inline-flex items-center gap-1 text-orange-600">
                          <Clock className="h-4 w-4" />
                          {stats.pendingJobs}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {stats.totalRevenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleStatisticsPanel;

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trophy, Medal, Award, TrendingUp, BarChart3, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface LeaderboardRow {
  rep_id: string;
  rep_name: string;
  employee_number: string | null;
  operation: string;
  jobs_closed: number;
  total_revenue: number;
  net_revenue: number;
  region: string | null;
  week_start: string | null;
  month_start: string | null;
  year: number | null;
}

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

const EmployeeLeaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");
  const [operationFilter, setOperationFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: rows, error } = await supabase
        .from("weekly_performance_leaderboard" as any)
        .select("*");
      if (!error && rows) {
        setData(rows as unknown as LeaderboardRow[]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentYear = now.getFullYear();

  const filtered = useMemo(() => {
    return data.filter((r) => {
      if (operationFilter !== "all" && r.operation !== operationFilter) return false;
      if (!r.week_start) return false;
      if (period === "week") {
        return new Date(r.week_start) >= weekStart;
      } else if (period === "month") {
        return r.month_start && new Date(r.month_start) >= monthStart;
      }
      return r.year === currentYear;
    });
  }, [data, period, operationFilter]);

  // Aggregate by rep
  const repAgg = useMemo(() => {
    const map = new Map<string, { rep_name: string; employee_number: string | null; operation: string; jobs: number; revenue: number }>();
    filtered.forEach((r) => {
      const existing = map.get(r.rep_id) || { rep_name: r.rep_name, employee_number: r.employee_number, operation: r.operation, jobs: 0, revenue: 0 };
      existing.jobs += Number(r.jobs_closed);
      existing.revenue += Number(r.total_revenue);
      map.set(r.rep_id, existing);
    });
    return Array.from(map.values())
      .filter((r) => r.jobs > 0)
      .sort((a, b) => b.jobs - a.jobs);
  }, [filtered]);

  // Region distribution
  const regionData = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((r) => {
      const region = r.region || "Unknown";
      map.set(region, (map.get(region) || 0) + Number(r.jobs_closed));
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .filter((r) => r.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [filtered]);

  const top5 = repAgg.slice(0, 5);
  const operations = [...new Set(data.map((r) => r.operation))].sort();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-700" />;
    return <span className="text-muted-foreground font-bold text-lg">{rank}</span>;
  };

  const periodLabel = period === "week" ? "This Week" : period === "month" ? "This Month" : "Year to Date";

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-600 p-2 rounded-xl shadow-lg">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Employee Performance Leaderboard</h1>
            <p className="text-sm text-muted-foreground">{periodLabel} Rankings</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/control-panel")} variant="outline" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">Year to Date</SelectItem>
          </SelectContent>
        </Select>
        <Select value={operationFilter} onValueChange={setOperationFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Operations</SelectItem>
            {operations.map((op) => (
              <SelectItem key={op} value={op}>{op}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center text-muted-foreground">Loading...</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 mx-auto text-yellow-600 mb-1" />
                <p className="text-2xl font-bold text-yellow-700">{repAgg.length}</p>
                <p className="text-xs text-yellow-600">Active Reps</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                <p className="text-2xl font-bold text-blue-700">{repAgg.reduce((s, r) => s + r.jobs, 0)}</p>
                <p className="text-xs text-blue-600">Total Jobs</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 mx-auto text-green-600 mb-1" />
                <p className="text-2xl font-bold text-green-700">{repAgg.reduce((s, r) => s + r.revenue, 0).toLocaleString()}</p>
                <p className="text-xs text-green-600">Total Revenue</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Trophy className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                <p className="text-2xl font-bold text-purple-700">{regionData.length}</p>
                <p className="text-xs text-purple-600">Regions</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top 5 Sales Reps — Jobs Closed</CardTitle>
              </CardHeader>
              <CardContent>
                {top5.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={top5} layout="vertical" margin={{ left: 10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="rep_name" type="category" width={100} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="jobs" fill="#f59e0b" radius={[0, 6, 6, 0]} name="Jobs" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-10">No data for this period</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Job Distribution by Region</CardTitle>
              </CardHeader>
              <CardContent>
                {regionData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={regionData} cx="50%" cy="50%" outerRadius={100} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {regionData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-10">No data for this period</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Leaderboard Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-4">
              {repAgg.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left w-16">Rank</th>
                        <th className="p-3 text-left">Rep Name</th>
                        <th className="p-3 text-left hidden sm:table-cell">Employee ID</th>
                        <th className="p-3 text-left hidden md:table-cell">Operation</th>
                        <th className="p-3 text-right">Jobs</th>
                        <th className="p-3 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {repAgg.map((rep, i) => {
                        const rank = i + 1;
                        const isTop3 = rank <= 3;
                        return (
                          <tr
                            key={i}
                            className={`border-b transition-colors ${
                              rank === 1 ? "bg-yellow-50/70" : rank === 2 ? "bg-gray-50/70" : rank === 3 ? "bg-amber-50/50" : "hover:bg-muted/30"
                            }`}
                          >
                            <td className="p-3">{getRankIcon(rank)}</td>
                            <td className="p-3 font-medium">{rep.rep_name}</td>
                            <td className="p-3 hidden sm:table-cell text-muted-foreground">{rep.employee_number || "—"}</td>
                            <td className="p-3 hidden md:table-cell text-muted-foreground">{rep.operation}</td>
                            <td className="p-3 text-right font-semibold">{rep.jobs}</td>
                            <td className="p-3 text-right font-semibold">{rep.revenue.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10">No performance data for the selected period</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EmployeeLeaderboard;

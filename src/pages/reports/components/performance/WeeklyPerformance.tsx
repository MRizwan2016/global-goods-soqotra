import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import StaffDetailView from "./StaffDetailView";

const WeeklyPerformance: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<{ name: string; type: string; id?: string; date?: string } | null>(null);
  
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ["staff-weekly-performance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_weekly_performance")
        .select("*")
        .order("week_start", { ascending: false })
        .limit(100);

      if (error) throw error;
      return data;
    },
  });

  const columns = [
    {
      id: "week_start",
      header: "Week Starting",
      accessorKey: "week_start",
      cell: (info: any) => format(new Date(info.getValue()), "dd MMM yyyy"),
    },
    {
      id: "staff_name",
      header: "Staff Name",
      accessorKey: "staff_name",
    },
    {
      id: "staff_type",
      header: "Type",
      accessorKey: "staff_type",
    },
    {
      id: "total_jobs",
      header: "Total Jobs",
      accessorKey: "total_jobs",
    },
    {
      id: "completed_jobs",
      header: "Completed",
      accessorKey: "completed_jobs",
    },
    {
      id: "delivery_jobs",
      header: "Deliveries",
      accessorKey: "delivery_jobs",
    },
    {
      id: "collection_jobs",
      header: "Collections",
      accessorKey: "collection_jobs",
    },
    {
      id: "total_packages",
      header: "Packages",
      accessorKey: "total_packages",
    },
    {
      id: "total_volume_cbm",
      header: "Volume (CBM)",
      accessorKey: "total_volume_cbm",
      cell: (info: any) => info.getValue()?.toFixed(2) || "0.00",
    },
    {
      id: "total_weight_kg",
      header: "Weight (KG)",
      accessorKey: "total_weight_kg",
      cell: (info: any) => info.getValue()?.toFixed(2) || "0.00",
    },
    {
      id: "total_revenue_qr",
      header: "Revenue (QR)",
      accessorKey: "total_revenue_qr",
      cell: (info: any) => info.getValue()?.toFixed(2) || "0.00",
    },
    {
      id: "on_time_completion_rate",
      header: "On-Time %",
      accessorKey: "on_time_completion_rate",
      cell: (info: any) => `${(info.getValue() * 100)?.toFixed(1) || "0.0"}%`,
    },
    {
      id: "avg_satisfaction",
      header: "Satisfaction",
      accessorKey: "avg_satisfaction",
      cell: (info: any) => info.getValue()?.toFixed(1) || "N/A",
    },
  ];

  const dummyRow = {
    week_start: new Date().toISOString().slice(0, 10),
    staff_name: "SAMPLE STAFF",
    staff_type: "driver",
    staff_id: "sample-staff-id",
    total_jobs: 1,
    completed_jobs: 1,
    delivery_jobs: 0,
    collection_jobs: 1,
    total_packages: 3,
    total_volume_cbm: 1.35,
    total_weight_kg: 120,
    total_revenue_qr: 810,
    on_time_completion_rate: 1,
    avg_satisfaction: 5,
  };
  const tableData = (performanceData && performanceData.length > 0) ? performanceData : [dummyRow];

  if (selectedStaff) {
    return (
      <StaffDetailView
        staffName={selectedStaff.name}
        staffType={selectedStaff.type}
        staffId={selectedStaff.id}
        collectionDate={selectedStaff.date}
        onBack={() => setSelectedStaff(null)}
      />
    );
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        defaultSortField="week_start"
        defaultSortDirection="desc"
        onRowClick={(row) => setSelectedStaff({ 
          name: row.staff_name, 
          type: row.staff_type,
          id: row.staff_id,
          date: row.week_start
        })}
      />
    </div>
  );
};

export default WeeklyPerformance;

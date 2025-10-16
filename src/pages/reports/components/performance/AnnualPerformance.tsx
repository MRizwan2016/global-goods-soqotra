import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";

const AnnualPerformance: React.FC = () => {
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ["staff-annual-performance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_annual_performance")
        .select("*")
        .order("year", { ascending: false })
        .limit(100);

      if (error) throw error;
      return data;
    },
  });

  const columns = [
    {
      id: "year",
      header: "Year",
      accessorKey: "year",
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

  return (
    <div>
      <DataTable
        columns={columns}
        data={performanceData || []}
        isLoading={isLoading}
        defaultSortField="year"
        defaultSortDirection="desc"
      />
    </div>
  );
};

export default AnnualPerformance;

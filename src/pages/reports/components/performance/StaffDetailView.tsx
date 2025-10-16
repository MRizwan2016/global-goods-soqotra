import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface StaffDetailViewProps {
  staffName: string;
  staffType: string;
  onBack: () => void;
  staffId?: string;
  collectionDate?: string;
}

const StaffDetailView: React.FC<StaffDetailViewProps> = ({
  staffName,
  staffType,
  onBack,
  staffId,
  collectionDate,
}) => {
  const navigate = useNavigate();

  // Fetch actual staff performance data with invoice details
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ["staff-detail", staffName, staffType, collectionDate],
    queryFn: async () => {
      const query = supabase
        .from("collection_performance")
        .select(`
          *,
          invoices!invoice_id (
            id,
            invoice_no,
            book_no,
            invoice_code,
            total_amount,
            total_cbm,
            total_gross_weight_kg,
            num_packages,
            shipper_name,
            consignee_name
          )
        `)
        .eq("staff_name", staffName)
        .eq("staff_type", staffType);

      if (collectionDate) {
        query.eq("collection_date", collectionDate);
      }

      const { data, error } = await query.order("collection_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Calculate job details from performance data
  const jobDetails = performanceData?.map((perf: any, index: number) => {
    const invoice = perf.invoices;
    const jobNumber = perf.job_id || `${perf.staff_type?.toUpperCase().substring(0, 2)}-${new Date(perf.collection_date).getFullYear()}${String(index + 1).padStart(4, "0")}`;
    const gyInvoiceNumber = invoice 
      ? `${invoice.invoice_code || ""}${String(invoice.book_no || "").padStart(3, "0")}${String(invoice.invoice_no || "").padStart(3, "0")}`
      : "N/A";

    return {
      id: perf.id,
      job_number: jobNumber,
      gy_invoice_number: gyInvoiceNumber,
      invoice_id: invoice?.id,
      cargo_details: invoice ? `${invoice.shipper_name || "Unknown"} to ${invoice.consignee_name || "Unknown"}` : "N/A",
      volume_cbm: perf.total_cbm || 0,
      invoice_value: perf.total_revenue_qr || 0,
      packages: perf.total_packages || 0,
      weight_kg: perf.total_weight_kg || 0,
    };
  }) || [];

  const columns = [
    {
      id: "job_number",
      header: "Job Numbers",
      accessorKey: "job_number",
      cell: (info: any) => {
        const invoiceId = info.row.original.invoice_id;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{info.getValue()}</span>
            {invoiceId && (
              <ExternalLink 
                className="h-4 w-4 text-primary cursor-pointer hover:text-primary/80"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/reports/cargo/invoice/${invoiceId}`);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      id: "gy_invoice_number",
      header: "GY Invoice Number",
      accessorKey: "gy_invoice_number",
      cell: (info: any) => (
        <span className="font-mono text-sm">{info.getValue()}</span>
      ),
    },
    {
      id: "cargo_details",
      header: "Cargo Details",
      accessorKey: "cargo_details",
    },
    {
      id: "packages",
      header: "Packages",
      accessorKey: "packages",
    },
    {
      id: "volume_cbm",
      header: "Volume (CBM)",
      accessorKey: "volume_cbm",
      cell: (info: any) => `${info.getValue()?.toFixed(2)} CBM`,
    },
    {
      id: "weight_kg",
      header: "Weight (KG)",
      accessorKey: "weight_kg",
      cell: (info: any) => `${info.getValue()?.toFixed(2)} KG`,
    },
    {
      id: "invoice_value",
      header: "Invoice Value (QR)",
      accessorKey: "invoice_value",
      cell: (info: any) => `QR ${info.getValue()?.toFixed(2)}`,
    },
  ];

  const totalVolume = jobDetails.reduce((sum, job) => sum + job.volume_cbm, 0);
  const totalValue = jobDetails.reduce((sum, job) => sum + job.invoice_value, 0);
  const totalPackages = jobDetails.reduce((sum, job) => sum + job.packages, 0);
  const totalWeight = jobDetails.reduce((sum, job) => sum + job.weight_kg, 0);

  // Get staff member info from first record
  const staffInfo = performanceData?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading staff details...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={onBack} variant="outline" size="sm">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to List
      </Button>

      <Card>
        <CardHeader className="bg-muted/50">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">
                  STAFF ID: {staffId || staffInfo?.staff_id || "N/A"}
                </p>
                <p className="text-sm font-medium">
                  STAFF DETAILS: {staffInfo?.location ? `Location: ${staffInfo.location}` : "N/A"}
                </p>
                <CardTitle className="text-xl mt-2">
                  STAFF NAME: {staffName.toUpperCase()}
                </CardTitle>
              </div>
            </div>
            <p className="text-sm font-medium">
              DEPARTMENT: {staffType.toUpperCase()} / CARGO {staffInfo?.job_type?.toUpperCase() || "COLLECTION"} / CUSTOMER SERVICE / OPERATIONS
            </p>
            {collectionDate && (
              <p className="text-sm font-medium text-primary">
                DATE: {new Date(collectionDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).toUpperCase()}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Click on the <ExternalLink className="inline h-3 w-3" /> icon next to job numbers to view invoice details
            </p>
          </div>
          
          <DataTable columns={columns} data={jobDetails} isLoading={isLoading} />

          <div className="mt-6 p-4 bg-muted/30 rounded-lg space-y-2">
            <h3 className="font-semibold text-lg mb-3">TOTAL SUMMARY</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Invoice Value</p>
                <p className="text-xl font-bold">QR {totalValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-xl font-bold">{totalVolume.toFixed(2)} CBM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Weight</p>
                <p className="text-xl font-bold">{totalWeight.toFixed(2)} KG</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Packages</p>
                <p className="text-xl font-bold">{totalPackages}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-sm font-medium">JOBS COMPLETED</p>
                <p className="text-lg font-bold">{jobDetails.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium">LOCATION</p>
                <p className="text-lg">{staffInfo?.location || staffInfo?.city || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">STATUS</p>
                <p className="text-lg">{staffInfo?.job_status || "COMPLETED"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDetailView;

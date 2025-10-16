import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";

interface StaffDetailViewProps {
  staffName: string;
  staffType: string;
  onBack: () => void;
}

const StaffDetailView: React.FC<StaffDetailViewProps> = ({
  staffName,
  staffType,
  onBack,
}) => {
  // Dummy data matching the sample image
  const jobDetails = [
    {
      id: "1",
      job_number: "QA-2024-001",
      gy_invoice_number: "INV-2024-001",
      cargo_details: "Personal Effects - 5 boxes",
      volume_cbm: 2.5,
      invoice_value: 1250.0,
    },
    {
      id: "2",
      job_number: "QA-2024-002",
      gy_invoice_number: "INV-2024-002",
      cargo_details: "Furniture - 3 items",
      volume_cbm: 3.2,
      invoice_value: 1800.0,
    },
    {
      id: "3",
      job_number: "QA-2024-003",
      gy_invoice_number: "INV-2024-003",
      cargo_details: "Electronics - 2 boxes",
      volume_cbm: 1.8,
      invoice_value: 950.0,
    },
  ];

  const columns = [
    {
      id: "job_number",
      header: "Job Numbers",
      accessorKey: "job_number",
    },
    {
      id: "gy_invoice_number",
      header: "GY Invoice Number",
      accessorKey: "gy_invoice_number",
    },
    {
      id: "cargo_details",
      header: "Cargo Details",
      accessorKey: "cargo_details",
    },
    {
      id: "volume_cbm",
      header: "Volume",
      accessorKey: "volume_cbm",
      cell: (info: any) => `${info.getValue()?.toFixed(2)} CBM`,
    },
    {
      id: "invoice_value",
      header: "Invoice Value",
      accessorKey: "invoice_value",
      cell: (info: any) => `QR ${info.getValue()?.toFixed(2)}`,
    },
  ];

  const totalVolume = jobDetails.reduce((sum, job) => sum + job.volume_cbm, 0);
  const totalValue = jobDetails.reduce((sum, job) => sum + job.invoice_value, 0);

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
                <p className="text-sm font-medium">STAFF NO: 001</p>
                <p className="text-sm font-medium">STAFF QID/PP: 27214410871</p>
                <CardTitle className="text-xl mt-2">
                  STAFF NAME: {staffName.toUpperCase()}
                </CardTitle>
              </div>
            </div>
            <p className="text-sm font-medium">
              DEPARTMENT: {staffType.toUpperCase()} / CARGO COLLECTION / CUSTOMER
              SERVICE / OPERATIONS
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={jobDetails} />

          <div className="mt-6 p-4 bg-muted/30 rounded-lg space-y-2">
            <h3 className="font-semibold text-lg mb-3">TOTAL SUMMARY</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Invoice Value</p>
                <p className="text-xl font-bold">QR {totalValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-xl font-bold">{totalVolume.toFixed(2)} CBM</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-sm font-medium">DAILY</p>
                <p className="text-lg">3 Jobs</p>
              </div>
              <div>
                <p className="text-sm font-medium">WEEKLY</p>
                <p className="text-lg">15 Jobs</p>
              </div>
              <div>
                <p className="text-sm font-medium">MONTHLY</p>
                <p className="text-lg">62 Jobs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDetailView;

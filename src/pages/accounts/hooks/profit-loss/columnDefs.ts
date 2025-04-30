
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/ui/data-table";

export const getProfitLossColumnDefs = (): Column[] => {
  return [
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => <span>{row.date}</span>,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
    },
    {
      id: "country",
      header: "Country",
      accessorKey: "country",
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => (
        <Badge className={row.type === "revenue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {row.type === "revenue" ? "Revenue" : "Expense"}
        </Badge>
      ),
    },
    {
      id: "expenseType",
      header: "Category",
      accessorKey: "expenseType",
      cell: ({ row }) => row.expenseType || "-",
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className={row.type === "revenue" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          ${parseFloat(row.amount).toFixed(2)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        if (row.type === "expense") return "-";
        
        return row.status === "paid" ? (
          <Badge className="bg-green-100 text-green-800">Paid</Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
        );
      },
    },
  ];
};


import React from "react";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/ui/data-table";
import { Tooltip } from "@/components/ui/tooltip";

export const getProfitLossColumnDefs = (): Column[] => {
  return [
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        return <span>{row.original.date}</span>;
      },
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        return (
          <Tooltip content={row.original.description || ""}>
            <span className="block max-w-[200px] truncate">
              {row.original.description || ""}
            </span>
          </Tooltip>
        );
      },
    },
    {
      id: "country",
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        return row.original.country || "-";
      },
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        const type = row.original.type || "expense";
        return (
          <Badge className={type === "revenue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {type === "revenue" ? "Revenue" : "Expense"}
          </Badge>
        );
      },
    },
    {
      id: "expenseType",
      header: "Category",
      accessorKey: "expenseType",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        return row.original.expenseType || "-";
      },
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        const type = row.original.type || "expense";
        const amount = row.original.amount || 0;
        return (
          <span className={type === "revenue" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            ${parseFloat(amount).toFixed(2)}
          </span>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        // Add null check for row.original
        if (!row?.original) return null;
        
        // If expense type, return dash
        if (row.original.type === "expense") return "-";
        
        // Add null check for status
        const status = row.original.status || "pending";
        return status === "paid" ? (
          <Badge className="bg-green-100 text-green-800">Paid</Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
        );
      },
    },
  ];
};

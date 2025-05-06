
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/ui/data-table";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const getProfitLossColumnDefs = (): Column[] => {
  return [
    {
      id: "country",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1 p-0 font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            COUNTRY
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "country",
      cell: ({ row }) => {
        if (!row?.original) return null;
        return (
          <span className="font-medium">{row.original.country || "-"}</span>
        );
      },
    },
    {
      id: "containerJobNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1 p-0 font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CONTAINER JOB NUMBER
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "containerJobNumber",
      cell: ({ row }) => {
        if (!row?.original) return null;
        return row.original.containerJobNumber || "-";
      },
    },
    {
      id: "amountInQar",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1 p-0 font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            AMOUNT IN QAR
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "amountInQar",
      cell: ({ row }) => {
        if (!row?.original) return null;
        const amount = row.original.amountInQar || 0;
        return (
          <span className="font-medium text-right block">
            {parseFloat(amount).toFixed(0)}
          </span>
        );
      },
    },
    {
      id: "shippingLine",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1 p-0 font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            SHIPPING LINE
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "shippingLine",
      cell: ({ row }) => {
        if (!row?.original) return null;
        return row.original.shippingLine || "-";
      },
    },
    {
      id: "otherExpenses",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1 p-0 font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            OTHER EXPENSES
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "otherExpenses",
      cell: ({ row }) => {
        if (!row?.original) return null;
        const expenses = row.original.otherExpenses || 0;
        return (
          <span className="text-right block">
            {parseFloat(expenses).toFixed(0)}
          </span>
        );
      },
    },
    {
      id: "netProfit",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1 p-0 font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NET PROFIT
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "netProfit",
      cell: ({ row }) => {
        if (!row?.original) return null;
        const profit = row.original.netProfit || 0;
        return (
          <span className="font-medium text-right block text-green-600">
            {parseFloat(profit).toFixed(0)}
          </span>
        );
      },
    },
  ];
};

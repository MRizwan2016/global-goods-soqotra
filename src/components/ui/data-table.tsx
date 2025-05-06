
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

export interface Column {
  id: string;
  header: string | React.FC<any>;
  accessorKey?: string;
  cell?: (info: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  defaultSortField?: string;
  defaultSortDirection?: 'asc' | 'desc';
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data = [],
  isLoading = false,
  defaultSortField,
  defaultSortDirection = 'desc'
}) => {
  // Initialize sorting state
  const initialSorting: SortingState = defaultSortField 
    ? [{ id: defaultSortField, desc: defaultSortDirection === 'desc' }] 
    : [];
  
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  
  // Make sure data is an array and not null/undefined
  const safeData = Array.isArray(data) ? data : [];
  
  const table = useReactTable({
    data: safeData,
    columns: columns.map(col => ({
      id: col.id,
      accessorKey: col.accessorKey,
      cell: col.cell ? info => col.cell?.(info) : undefined,
      header: col.header,
    })),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  
  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    );
  }
  
  if (safeData.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center border rounded-md">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-slate-50">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="font-bold">
                  {header.isPlaceholder ? null : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow key={row.id} className="border-b hover:bg-slate-50/80">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

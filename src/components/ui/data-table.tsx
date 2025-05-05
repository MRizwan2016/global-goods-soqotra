
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface Column {
  id: string;
  header: string;
  accessorKey?: string;
  cell?: (info: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data = [],
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    );
  }
  
  // Make sure data is an array and not null/undefined
  const safeData = Array.isArray(data) ? data : [];
  
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
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeData.map((row, rowIndex) => {
            if (!row) {
              console.warn("Found null or undefined row at index", rowIndex);
              return null; // Skip rendering this row
            }
            
            return (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column.id}`}>
                    {column.cell 
                      ? column.cell({ row: { original: row } }) 
                      : column.accessorKey
                        ? row[column.accessorKey] !== undefined && row[column.accessorKey] !== null 
                            ? row[column.accessorKey] 
                            : "-"
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            );
          }).filter(Boolean)}
        </TableBody>
      </Table>
    </div>
  );
};

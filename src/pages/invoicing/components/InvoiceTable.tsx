
import React from "react";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  InvoiceTableHead,
  InvoiceTableCell 
} from "@/components/ui/table";
import InvoiceTableRow from "./InvoiceTableRow";

interface InvoiceTableProps {
  currentEntries: any[];
  indexOfFirstEntry: number;
  handlePrintInvoice: (id: string) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  currentEntries,
  indexOfFirstEntry,
  handlePrintInvoice
}) => {
  return (
    <div className="overflow-x-auto border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-soqotra-blue hover:bg-soqotra-blue">
            <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Modify</InvoiceTableHead>
            <InvoiceTableHead className="w-28">Inv. Date</InvoiceTableHead>
            <InvoiceTableHead className="w-28">Inv. Number</InvoiceTableHead>
            <InvoiceTableHead>Shipper</InvoiceTableHead>
            <InvoiceTableHead>Consignee</InvoiceTableHead>
            <InvoiceTableHead className="w-16">S/A</InvoiceTableHead>
            <InvoiceTableHead className="w-20">W/H</InvoiceTableHead>
            <InvoiceTableHead className="w-16">D2D</InvoiceTableHead>
            <InvoiceTableHead className="w-28">NIC</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Vol</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Weight</InvoiceTableHead>
            <InvoiceTableHead className="w-16">Pkgs</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Gross</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Disc</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Net</InvoiceTableHead>
            <InvoiceTableHead className="w-16">Paid</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Sta Chg</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Offer Disc</InvoiceTableHead>
            <InvoiceTableHead className="w-16">Delete</InvoiceTableHead>
            <InvoiceTableHead className="w-16">View</InvoiceTableHead>
            <InvoiceTableHead className="w-16">Print</InvoiceTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEntries.length > 0 ? (
            currentEntries.map((item, index) => (
              <InvoiceTableRow 
                key={item.id}
                item={item} 
                index={index} 
                indexOffset={indexOfFirstEntry}
                onPrint={handlePrintInvoice}
              />
            ))
          ) : (
            <TableRow>
              <InvoiceTableCell colSpan={22} className="text-center py-4">
                No data available in table
              </InvoiceTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;

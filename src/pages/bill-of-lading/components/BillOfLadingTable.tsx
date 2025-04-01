
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  InvoiceTableHead,
  InvoiceTableCell 
} from "@/components/ui/table";
import { Edit, Trash, Printer } from "lucide-react";

interface BillOfLadingTableProps {
  currentEntries: any[];
  indexOfFirstEntry: number;
  handlePrintClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

const BillOfLadingTable = ({ 
  currentEntries, 
  indexOfFirstEntry, 
  handlePrintClick, 
  handleDeleteClick 
}: BillOfLadingTableProps) => {
  return (
    <div className="overflow-x-auto border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-soqotra-blue hover:bg-soqotra-blue">
            <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
            <InvoiceTableHead className="w-20">Modify</InvoiceTableHead>
            <InvoiceTableHead className="w-28">BL Number</InvoiceTableHead>
            <InvoiceTableHead className="w-28">Date</InvoiceTableHead>
            <InvoiceTableHead>Shipper</InvoiceTableHead>
            <InvoiceTableHead>Consignee</InvoiceTableHead>
            <InvoiceTableHead>Origin</InvoiceTableHead>
            <InvoiceTableHead>Destination</InvoiceTableHead>
            <InvoiceTableHead>Cargo Type</InvoiceTableHead>
            <InvoiceTableHead>Vessel</InvoiceTableHead>
            <InvoiceTableHead>Status</InvoiceTableHead>
            <InvoiceTableHead className="w-16">Print</InvoiceTableHead>
            <InvoiceTableHead className="w-16">Delete</InvoiceTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEntries.length > 0 ? (
            currentEntries.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                <InvoiceTableCell className="text-center">
                  <Link to={`/data-entry/bill-of-lading/edit/${item.id}`} className="inline-block text-blue-500 hover:text-blue-700">
                    <Edit size={16} className="inline-block" />
                  </Link>
                </InvoiceTableCell>
                <InvoiceTableCell>{item.blNumber}</InvoiceTableCell>
                <InvoiceTableCell>{item.date}</InvoiceTableCell>
                <InvoiceTableCell>{item.shipper}</InvoiceTableCell>
                <InvoiceTableCell>{item.consignee}</InvoiceTableCell>
                <InvoiceTableCell>{item.origin}</InvoiceTableCell>
                <InvoiceTableCell>{item.destination}</InvoiceTableCell>
                <InvoiceTableCell>{item.cargoType}</InvoiceTableCell>
                <InvoiceTableCell>{item.vessel}</InvoiceTableCell>
                <InvoiceTableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                    item.status === "In Transit" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {item.status}
                  </span>
                </InvoiceTableCell>
                <InvoiceTableCell className="text-center">
                  <button
                    onClick={() => handlePrintClick(item.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Printer size={16} className="inline-block" />
                  </button>
                </InvoiceTableCell>
                <InvoiceTableCell className="text-center">
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} className="inline-block" />
                  </button>
                </InvoiceTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <InvoiceTableCell colSpan={13} className="text-center py-4">
                No data available in table
              </InvoiceTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillOfLadingTable;

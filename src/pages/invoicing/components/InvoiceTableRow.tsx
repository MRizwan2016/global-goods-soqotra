
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash, Eye, Printer } from "lucide-react";
import { TableRow, InvoiceTableCell } from "@/components/ui/table";
import { toast } from "sonner";

interface InvoiceRowProps {
  item: any;
  index: number;
  indexOffset: number;
  onPrint: (id: string) => void;
}

const InvoiceTableRow: React.FC<InvoiceRowProps> = ({ 
  item, 
  index, 
  indexOffset,
  onPrint
}) => {
  const navigate = useNavigate();

  const handlePrintClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPrint(item.id);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/data-entry/invoicing/preview/${item.id}`);
  };

  return (
    <TableRow key={item.id} className="hover:bg-gray-50">
      <InvoiceTableCell className="text-center">{indexOffset + index + 1}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Link to={`/data-entry/invoicing/edit/${item.id}`}>
          <Edit size={16} className="text-blue-500 inline-block" />
        </Link>
      </InvoiceTableCell>
      <InvoiceTableCell>{item.date}</InvoiceTableCell>
      <InvoiceTableCell className="font-medium text-blue-700">{item.invoiceNumber || "-"}</InvoiceTableCell>
      <InvoiceTableCell>{item.shipper1}</InvoiceTableCell>
      <InvoiceTableCell>{item.consignee1}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.salesAgent}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.warehouse}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.doorToDoor ? "Yes" : "No"}</InvoiceTableCell>
      <InvoiceTableCell>{item.nic}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.volume}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.weight}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.packages}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.gross}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.discount}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.net}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.paid ? "Yes" : "No"}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.statusCharge}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{item.offerDiscount}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Trash size={16} className="text-red-500 inline-block cursor-pointer" onClick={() => toast.error("Delete functionality not implemented")} />
      </InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Eye size={16} className="text-green-500 inline-block cursor-pointer" onClick={handleViewClick} />
      </InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Printer 
          size={16} 
          className="text-blue-500 inline-block cursor-pointer" 
          onClick={handlePrintClick}
        />
      </InvoiceTableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;

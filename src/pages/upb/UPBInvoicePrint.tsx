import React from "react";
import { useParams } from "react-router-dom";
import { InvoiceDetailsView } from "@/components/reports/InvoiceDetailsView";

const UPBInvoicePrint = () => {
  // Use the existing InvoiceDetailsView component for proper invoice display
  return <InvoiceDetailsView />;
};

export default UPBInvoicePrint;
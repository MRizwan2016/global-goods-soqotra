
import React from "react";
import Layout from "@/components/layout/Layout";
import PaymentHeader from "./components/PaymentHeader";
import SearchFilters from "./components/SearchFilters";
import StatusTabs from "./components/StatusTabs";
import { useInvoiceData } from "./hooks/useInvoiceData";

const PaymentReceivable = () => {
  const { invoices } = useInvoiceData();

  return (
    <Layout title="Payment Receivable">
      <div className="space-y-6">
        <PaymentHeader />
        <SearchFilters />
        <StatusTabs invoices={invoices} />
      </div>
    </Layout>
  );
};

export default PaymentReceivable;

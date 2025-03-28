
import React from "react";
import { Button } from "@/components/ui/button";

const PaymentHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">Payment Receivable</h1>
      <Button>
        Download Report
      </Button>
    </div>
  );
};

export default PaymentHeader;

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";
import AlgeriaPaymentReceiptGenerator from "./AlgeriaPaymentReceiptGenerator";
import AlgeriaHBLDocument from "./AlgeriaHBLDocument";
import { Printer } from "lucide-react";

interface AlgeriaInvoiceListProps {
  invoices: AlgeriaInvoice[];
  onEdit: (invoice: AlgeriaInvoice) => void;
}

const AlgeriaInvoiceList: React.FC<AlgeriaInvoiceListProps> = ({ invoices, onEdit }) => {
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<AlgeriaInvoice | null>(null);
  const [selectedInvoiceForHBL, setSelectedInvoiceForHBL] = useState<AlgeriaInvoice | null>(null);

  const handlePrintHBL = () => {
    window.print();
  };

  if (selectedInvoiceForPayment) {
    return (
      <AlgeriaPaymentReceiptGenerator
        invoice={selectedInvoiceForPayment}
        onBack={() => setSelectedInvoiceForPayment(null)}
      />
    );
  }

  if (selectedInvoiceForHBL) {
    return (
      <>
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #algeria-hbl-print, #algeria-hbl-print * { visibility: visible; }
            #algeria-hbl-print { position: absolute; left: 0; top: 0; width: 100%; }
            .print\\:hidden { display: none !important; }
          }
        `}</style>
        <div className="space-y-4">
          <div className="flex gap-4 print:hidden">
            <Button variant="outline" onClick={() => setSelectedInvoiceForHBL(null)}>
              Back to Invoices
            </Button>
            <Button onClick={handlePrintHBL}>
              <Printer className="h-4 w-4 mr-2" />
              Print HBL
            </Button>
          </div>
          <div id="algeria-hbl-print">
            <AlgeriaHBLDocument invoice={selectedInvoiceForHBL} />
          </div>
        </div>
      </>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground mb-2">No invoices created yet.</p>
          <p className="text-xs text-muted-foreground">Create a new invoice to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Invoice No.</th>
                <th className="py-2 pr-4">HBL No.</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Export Plate</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-0 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-muted/50">
                  <td className="py-2 pr-4 font-medium">{inv.invoiceNumber}</td>
                  <td className="py-2 pr-4 text-xs">{inv.hblNumber || "-"}</td>
                  <td className="py-2 pr-4">{inv.date}</td>
                  <td className="py-2 pr-4">{inv.customer?.name || "-"}</td>
                  <td className="py-2 pr-4">{inv.vehicle?.exportPlate || "-"}</td>
                  <td className="py-2 pr-4">QAR {inv.totalAmount?.toLocaleString()}</td>
                  <td className="py-2 pr-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      inv.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inv.paymentStatus || inv.status}
                    </span>
                  </td>
                  <td className="py-2 pr-0 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button size="sm" variant="outline" onClick={() => onEdit(inv)}>
                        Edit
                      </Button>
                      {inv.hblNumber && (
                        <Button size="sm" variant="outline" onClick={() => setSelectedInvoiceForHBL(inv)}>
                          HBL
                        </Button>
                      )}
                      {inv.paymentStatus !== 'paid' && (
                        <Button size="sm" onClick={() => setSelectedInvoiceForPayment(inv)}>
                          Pay
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">{invoices.length} invoice(s) found</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgeriaInvoiceList;

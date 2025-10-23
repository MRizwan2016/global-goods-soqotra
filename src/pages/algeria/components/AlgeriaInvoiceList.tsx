import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";

interface AlgeriaInvoiceListProps {
  invoices: AlgeriaInvoice[];
  onEdit: (invoice: AlgeriaInvoice) => void;
}

const AlgeriaInvoiceList: React.FC<AlgeriaInvoiceListProps> = ({ invoices, onEdit }) => {
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
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Export Plate</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-0 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-muted/50">
                  <td className="py-2 pr-4 font-medium">{inv.invoiceNumber}</td>
                  <td className="py-2 pr-4">{inv.date}</td>
                  <td className="py-2 pr-4">{inv.customer?.name || "-"}</td>
                  <td className="py-2 pr-4">{inv.vehicle?.exportPlate || "-"}</td>
                  <td className="py-2 pr-4">{inv.totalAmount?.toLocaleString()}</td>
                  <td className="py-2 pr-4">{inv.status}</td>
                  <td className="py-2 pr-0 text-right">
                    <Button size="sm" variant="outline" onClick={() => onEdit(inv)}>
                      Open
                    </Button>
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

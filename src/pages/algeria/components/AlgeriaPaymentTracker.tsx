import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, CreditCard, FileText, ArrowLeft } from "lucide-react";
import { AlgeriaStorageService } from "../services/AlgeriaStorageService";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";
import AlgeriaPaymentReceiptGenerator from "./AlgeriaPaymentReceiptGenerator";
import { useNavigate } from "react-router-dom";

const AlgeriaPaymentTracker = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<AlgeriaInvoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<AlgeriaInvoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<AlgeriaInvoice | null>(null);
  const [showReceiptGenerator, setShowReceiptGenerator] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "unpaid">("all");

  useEffect(() => {
    const loadInvoices = async () => {
      const storedInvoices = await AlgeriaStorageService.loadInvoices();
      setInvoices(storedInvoices);
      setFilteredInvoices(storedInvoices);
    };

    loadInvoices();
  }, []);

  useEffect(() => {
    let filtered = invoices;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.vehicle.exportPlate.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by payment status
    if (statusFilter !== "all") {
      filtered = filtered.filter(invoice => 
        statusFilter === "paid" ? invoice.paymentStatus === "paid" : invoice.paymentStatus !== "paid"
      );
    }

    setFilteredInvoices(filtered);
  }, [searchQuery, statusFilter, invoices]);

  const handlePaymentClick = (invoice: AlgeriaInvoice) => {
    setSelectedInvoice(invoice);
    setShowReceiptGenerator(true);
  };

  const handleViewInvoice = (invoice: AlgeriaInvoice) => {
    console.log("View invoice:", invoice);
  };

  const handleBackFromReceipt = async () => {
    setShowReceiptGenerator(false);
    setSelectedInvoice(null);
    const storedInvoices = await AlgeriaStorageService.loadInvoices();
    setInvoices(storedInvoices);
  };

  const formatCurrency = (amount: number) => {
    return `QAR ${amount.toLocaleString()}`;
  };

  if (showReceiptGenerator && selectedInvoice) {
    return (
      <AlgeriaPaymentReceiptGenerator
        invoice={selectedInvoice}
        onBack={handleBackFromReceipt}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/algeria")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Algeria Payment Tracker - Vehicles & Personal Effects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number, customer name, or vehicle plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All ({invoices.length})
              </Button>
              <Button
                variant={statusFilter === "unpaid" ? "default" : "outline"}
                onClick={() => setStatusFilter("unpaid")}
                size="sm"
              >
                Unpaid ({invoices.filter(inv => inv.paymentStatus !== "paid").length})
              </Button>
              <Button
                variant={statusFilter === "paid" ? "default" : "outline"}
                onClick={() => setStatusFilter("paid")}
                size="sm"
              >
                Paid ({invoices.filter(inv => inv.paymentStatus === "paid").length})
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Export Plate</TableHead>
                  <TableHead>Vehicle Amount</TableHead>
                  <TableHead>Personal Effects</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const personalEffectsTotal = invoice.personalEffects?.reduce((sum, effect) => sum + effect.charges, 0) || 0;
                  
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>{invoice.customer.name}</TableCell>
                      <TableCell>
                        <span className="font-mono font-semibold text-primary">
                          {invoice.vehicle.exportPlate}
                        </span>
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.vehicle.freightCharge)}</TableCell>
                      <TableCell>{formatCurrency(personalEffectsTotal)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={invoice.paymentStatus === "paid" ? "default" : "destructive"}
                        >
                          {invoice.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {invoice.paymentStatus !== "paid" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handlePaymentClick(invoice)}
                            >
                              <CreditCard className="h-4 w-4 mr-1" />
                              Pay
                            </Button>
                          )}
                          {invoice.paymentStatus === "paid" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handlePaymentClick(invoice)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Receipt
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || statusFilter !== "all" 
                ? "No invoices found matching your criteria." 
                : "No invoices found. Create your first invoice to get started."
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgeriaPaymentTracker;

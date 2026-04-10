import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Warehouse, Eye, Printer, MessageCircle, Mail } from 'lucide-react';
import { useWarehouseStorage, WarehouseStorageRecord } from '@/hooks/useWarehouseStorage';
import StorageInvoicePDF from './StorageInvoicePDF';
import StoragePaymentDialog from './StoragePaymentDialog';
import ReceiptView from '@/components/payment/ReceiptView';
import { supabase } from '@/integrations/supabase/client';

const WarehouseStorageInvoiceList: React.FC = () => {
  const { records, loading, updateRecord, loadRecords, totalUnpaidFees } = useWarehouseStorage();
  const [viewingReceipt, setViewingReceipt] = useState<any>(null);

  const handleViewReceipt = async (record: WarehouseStorageRecord) => {
    // Look up the payment transaction for this record
    const { data } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('invoice_number', record.invoice_number)
      .ilike('remarks', '%Storage Fee%')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setViewingReceipt({
        receiptNumber: data.receipt_number || `STR-${record.id.slice(-6)}`,
        invoiceNumber: data.invoice_number,
        date: data.payment_date || new Date().toLocaleDateString(),
        customer: record.customer_name || '-',
        amount: data.amount_paid,
        paymentMethod: data.payment_method || 'Cash',
        currency: data.currency || 'QAR',
        remarks: data.remarks || 'Storage Fee Payment',
      });
    }
  };

  if (loading) return null;
  if (records.length === 0) return null;

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Warehouse className="h-5 w-5 text-primary" />
              Warehouse Storage Invoices
            </CardTitle>
            {totalUnpaidFees > 0 && (
              <Badge variant="destructive" className="text-sm">
                Unpaid Total: QAR {totalUnpaidFees.toFixed(2)}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Cargo Type</TableHead>
                  <TableHead>Received Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Fee (QAR)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.invoice_number}</TableCell>
                    <TableCell>{record.customer_name || '-'}</TableCell>
                    <TableCell>{record.country}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {record.cargo_type === 'vehicle' ? 'Vehicle' : 'Personal Effects'}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.warehouse_received_date}</TableCell>
                    <TableCell>{record.feeResult?.daysInStorage || 0}</TableCell>
                    <TableCell className="font-bold">
                      {record.feeResult?.totalFee?.toFixed(2) || '0.00'}
                    </TableCell>
                    <TableCell>
                      {record.storage_fee_paid ? (
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">Unpaid</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 flex-wrap">
                        <StorageInvoicePDF record={record} />
                        {!record.storage_fee_paid ? (
                          <StoragePaymentDialog
                            record={record}
                            onPaymentComplete={async (id, amount) => {
                              await updateRecord(id, {
                                storage_fee_paid: true,
                                paid_amount: amount,
                                paid_date: new Date().toISOString().split('T')[0],
                              });
                              await loadRecords();
                            }}
                          />
                        ) : (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-xs"
                              onClick={() => handleViewReceipt(record)}
                            >
                              <Eye className="h-3 w-3" />
                              Receipt
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {viewingReceipt && (
        <ReceiptView
          isOpen={!!viewingReceipt}
          onClose={() => setViewingReceipt(null)}
          receiptData={viewingReceipt}
        />
      )}
    </>
  );
};

export default WarehouseStorageInvoiceList;

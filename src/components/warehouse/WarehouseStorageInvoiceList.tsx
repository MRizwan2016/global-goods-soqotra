import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Warehouse } from 'lucide-react';
import { useWarehouseStorage, WarehouseStorageRecord } from '@/hooks/useWarehouseStorage';
import StorageInvoicePDF from './StorageInvoicePDF';
import StoragePaymentDialog from './StoragePaymentDialog';

const WarehouseStorageInvoiceList: React.FC = () => {
  const { records, loading, updateRecord, loadRecords, totalUnpaidFees } = useWarehouseStorage();

  if (loading) return null;
  if (records.length === 0) return null;

  return (
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
                    <div className="flex items-center gap-1">
                      <StorageInvoicePDF record={record} />
                      {!record.storage_fee_paid && record.feeResult && record.feeResult.totalFee > 0 && (
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
  );
};

export default WarehouseStorageInvoiceList;

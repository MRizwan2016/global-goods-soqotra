import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Warehouse } from 'lucide-react';
import { useWarehouseStorage, WarehouseStorageRecord } from '@/hooks/useWarehouseStorage';
import { getStorageRowClass } from '@/utils/storageFeesCalculator';
import StorageFeesBadge from './StorageFeesBadge';
import StorageInvoicePDF from './StorageInvoicePDF';
import StoragePaymentDialog from './StoragePaymentDialog';
import AddStorageRecordDialog from './AddStorageRecordDialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface WarehouseStoragePanelProps {
  country: string;
}

const WarehouseStoragePanel: React.FC<WarehouseStoragePanelProps> = ({ country }) => {
  const { t, isRTL } = useLanguage();
  const { records, loading, addRecord, updateRecord, totalUnpaidFees, loadRecords } = useWarehouseStorage(country);

  if (loading) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Warehouse className="h-5 w-5 text-primary" />
            {t('storage.warehouseManager')}
          </CardTitle>
          <div className="flex items-center gap-3">
            {totalUnpaidFees > 0 && (
              <Badge variant="destructive" className="text-sm">
                {t('storage.unpaidTotal')}: QAR {totalUnpaidFees.toFixed(2)}
              </Badge>
            )}
            <AddStorageRecordDialog country={country} onAdd={addRecord} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">{t('storage.noRecords')}</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.invoiceNumber')}</TableHead>
                  <TableHead>{t('table.customer')}</TableHead>
                  <TableHead>{t('storage.cargoType')}</TableHead>
                  <TableHead>{t('storage.receivedDate')}</TableHead>
                  <TableHead>{t('storage.storageFee')}</TableHead>
                  <TableHead>{t('table.status')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id} className={record.feeResult ? getStorageRowClass(record.feeResult.status) : ''}>
                    <TableCell className="font-medium">{record.invoice_number}</TableCell>
                    <TableCell>{record.customer_name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {record.cargo_type === 'vehicle' ? t('storage.vehicle') : t('storage.personalEffects')}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.warehouse_received_date}</TableCell>
                    <TableCell>
                      {record.feeResult && <StorageFeesBadge feeResult={record.feeResult} />}
                    </TableCell>
                    <TableCell>
                      {record.storage_fee_paid ? (
                        <Badge className="bg-green-100 text-green-800">{t('status.paid')}</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">{t('status.unpaid')}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <StorageInvoicePDF record={record} />
                        {!record.storage_fee_paid && record.feeResult && record.feeResult.totalFee > 0 && (
                          <StoragePaymentDialog record={record} onPaymentComplete={async (id, amount) => {
                            await updateRecord(id, {
                              storage_fee_paid: true,
                              paid_amount: amount,
                              paid_date: new Date().toISOString().split('T')[0],
                            });
                            await loadRecords();
                          }} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WarehouseStoragePanel;

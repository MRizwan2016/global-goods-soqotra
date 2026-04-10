import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Printer } from 'lucide-react';
import { WarehouseStorageRecord } from '@/hooks/useWarehouseStorage';
import { useLanguage } from '@/contexts/LanguageContext';

interface StorageInvoicePDFProps {
  record: WarehouseStorageRecord;
}

const StorageInvoicePDF: React.FC<StorageInvoicePDFProps> = ({ record }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();
  const fee = record.feeResult;

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Storage Invoice</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: Arial, sans-serif; font-size: 12px; direction: ${isRTL ? 'rtl' : 'ltr'}; }
        .header { text-align: center; border-bottom: 2px solid #1e2a3a; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; color: #1e2a3a; }
        .subtitle { font-size: 14px; color: #666; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: ${isRTL ? 'right' : 'left'}; }
        th { background: #1e2a3a; color: white; }
        .total-row { font-weight: bold; background: #f5f5f5; font-size: 14px; }
        .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #999; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
        .badge-amber { background: #fff3cd; color: #856404; }
        .badge-red { background: #f8d7da; color: #721c24; }
      </style></head><body>${content.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 text-xs">
          <FileText className="h-3 w-3" />
          {t('storage.invoice')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {t('storage.invoice')}
            <Button size="sm" onClick={handlePrint} className="gap-1">
              <Printer className="h-4 w-4" /> {t('action.print')}
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div ref={printRef} dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="header">
            <div className="title">SOQOTRA LOGISTICS SERVICES</div>
            <div className="subtitle">{t('storage.invoiceTitle')}</div>
            <div className="subtitle">{t('storage.storageFee')} — رسوم التخزين</div>
          </div>

          <table>
            <tbody>
              <tr><th style={{ width: '40%' }}>Invoice Number</th><td>{record.invoice_number}</td></tr>
              <tr><th>Customer</th><td>{record.customer_name || '-'}</td></tr>
              <tr><th>Cargo Type</th><td>{record.cargo_type === 'vehicle' ? 'Vehicle' : 'Personal Effects'}</td></tr>
              <tr><th>Warehouse Received Date</th><td>{record.warehouse_received_date}</td></tr>
              <tr><th>Days in Storage</th><td>{fee?.daysInStorage || 0}</td></tr>
              {record.cargo_type === 'vehicle' && (
                <tr><th>Grace Period</th><td>{record.grace_period_days} Days</td></tr>
              )}
              <tr><th>Chargeable Days</th><td>{fee?.chargeableDays || 0}</td></tr>
              <tr><th>Daily Rate</th><td>QAR {fee?.dailyRate?.toFixed(2) || '0.00'}</td></tr>
              {record.cargo_type === 'personal_effects' && (
                <tr><th>Volume (CBM)</th><td>{record.total_cbm}</td></tr>
              )}
            </tbody>
          </table>

          <table>
            <tbody>
              <tr className="total-row">
                <th style={{ width: '40%' }}>Total Storage Fee</th>
                <td>QAR {fee?.totalFee?.toFixed(2) || '0.00'}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ borderTop: '1px solid #333', paddingTop: '5px', width: '200px', textAlign: 'center' }}>
              {t('storage.customerSignature')}
            </div>
            <div style={{ borderTop: '1px solid #333', paddingTop: '5px', width: '200px', textAlign: 'center' }}>
              {t('storage.authorizedSignature')}
            </div>
          </div>

          <div className="footer">
            SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL — {record.country}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StorageInvoicePDF;

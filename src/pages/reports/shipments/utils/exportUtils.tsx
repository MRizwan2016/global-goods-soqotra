
import { toast } from 'sonner';

interface Shipment {
  invoiceNumber: string;
  destination: string;
  consignee1: string;
  date: string;
  packages: string;
  weight: string;
  volume: string;
  status: string;
}

export const exportToCSV = (shipments: Shipment[]) => {
  // Simple CSV export of filtered data
  const headers = ['Invoice Number', 'Destination', 'Consignee', 'Date', 'Packages', 'Weight', 'Volume', 'Status'];
  const csvData = shipments.map(shipment => [
    shipment.invoiceNumber,
    shipment.destination,
    shipment.consignee1,
    shipment.date,
    shipment.packages,
    shipment.weight,
    shipment.volume,
    shipment.status
  ]);
  
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'shipments_report.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success('Exported shipments data to CSV');
};

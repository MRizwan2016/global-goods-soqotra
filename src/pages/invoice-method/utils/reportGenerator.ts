
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { fetchInvoices } from './reports/invoiceHelpers';
import { createSummaryReport, createWeeklyReport, createMonthlyReport, createDetailedReport } from './reports/reportCreators';

// Main function to generate report based on type
export const generatePaymentReport = async (reportType: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const invoices = fetchInvoices();
        
        let workbook;
        let filename;
        
        switch (reportType) {
          case 'SUMMARY':
            workbook = createSummaryReport(invoices);
            filename = 'Payment_Summary_Report.xlsx';
            break;
          case 'WEEKLY':
            workbook = createWeeklyReport(invoices);
            filename = 'Weekly_Collection_Report.xlsx';
            break;
          case 'MONTHLY':
            workbook = createMonthlyReport(invoices);
            filename = 'Monthly_Collection_Report.xlsx';
            break;
          case 'DETAILED':
            workbook = createDetailedReport(invoices);
            filename = 'Detailed_Payment_Report.xlsx';
            break;
          default:
            throw new Error(`Unknown report type: ${reportType}`);
        }
        
        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // Download file
        saveAs(data, filename);
        
        resolve();
      }, 1000); // Adding a slight delay to simulate processing
    } catch (error) {
      console.error("Error generating report:", error);
      reject(error);
    }
  });
};

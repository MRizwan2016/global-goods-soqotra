
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { Invoice } from "../../components/status-tabs/Invoice";
import { calculateTotals, categorizeInvoices } from './invoiceHelpers';
import { generateWeeklyData, generateMonthlyData } from './dateReports';
import { generateExcelWorksheet } from './excelHelpers';

// Create a simple summary report
export const createSummaryReport = (invoices: Invoice[]) => {
  const totals = calculateTotals(invoices);
  const weeklyData = generateWeeklyData(invoices);
  const monthlyData = generateMonthlyData(invoices);
  
  // Create summary data - fixed type errors by ensuring amounts are numbers
  const summaryData = [
    { Category: 'PAID INVOICES', Count: totals.paidCount, Amount: totals.totalPaidAmount.toFixed(2) },
    { Category: 'UNPAID INVOICES', Count: totals.unpaidCount, Amount: totals.totalUnpaidAmount.toFixed(2) },
    { Category: 'PARTIAL PAYMENT INVOICES', Count: totals.partialCount, Amount: totals.totalPartialInvoiceAmount.toFixed(2) },
    { Category: 'PARTIAL PAID AMOUNT', Count: '-', Amount: totals.totalPartialPaidAmount.toFixed(2) },
    { Category: 'PARTIAL REMAINING AMOUNT', Count: '-', Amount: totals.totalPartialRemainingAmount.toFixed(2) },
    { Category: 'WEEKLY COLLECTION', Count: weeklyData.count, Amount: weeklyData.total.toFixed(2) },
    { Category: 'MONTHLY COLLECTION', Count: monthlyData.count, Amount: monthlyData.total.toFixed(2) },
  ];

  // Create type-safe data for the worksheet
  const typeSafeSummaryData = summaryData.map(item => ({
    Category: item.Category,
    Count: item.Count === '-' ? 0 : item.Count, // Convert string '-' to 0 for Count
    Amount: parseFloat(item.Amount)             // Convert string to number for Amount
  }));

  const headers = ['Category', 'Count', 'Amount'];
  const worksheet = generateExcelWorksheet(typeSafeSummaryData, headers);
  
  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');
  
  return workbook;
};

// Create a weekly collection report
export const createWeeklyReport = (invoices: Invoice[]) => {
  const weeklyData = generateWeeklyData(invoices);
  
  // Define a type for our report row to ensure type safety
  type ReportRow = {
    'SL.No.': string | number;
    'Invoice Number': string;
    'Customer': string;
    'Date': string;
    'Payment Date': string;
    'Amount': string | number;
    'Payment Method': string;
  };
  
  // Map invoices to the format needed for the report
  const reportData: ReportRow[] = weeklyData.invoices.map((invoice, index) => ({
    'SL.No.': index + 1,
    'Invoice Number': invoice.invoiceNumber,
    'Customer': invoice.customerName,
    'Date': invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A',
    'Payment Date': invoice.paymentDate ? format(new Date(invoice.paymentDate), 'MMM dd, yyyy') : 'N/A',
    'Amount': (invoice.paidAmount || 0).toFixed(2),
    'Payment Method': invoice.paymentMethod || 'N/A'
  }));
  
  // Add summary row at the bottom with type safety
  reportData.push({
    'SL.No.': '',
    'Invoice Number': '',
    'Customer': '',
    'Date': '',
    'Payment Date': 'TOTAL',
    'Amount': weeklyData.total.toFixed(2),
    'Payment Method': ''
  });
  
  const headers = ['SL.No.', 'Invoice Number', 'Customer', 'Date', 'Payment Date', 'Amount', 'Payment Method'];
  const worksheet = generateExcelWorksheet(reportData, headers);
  
  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Weekly Report (${weeklyData.period})`);
  
  return workbook;
};

// Create a monthly collection report
export const createMonthlyReport = (invoices: Invoice[]) => {
  const monthlyData = generateMonthlyData(invoices);
  
  // Define a type for our report row to ensure type safety
  type ReportRow = {
    'SL.No.': string | number;
    'Invoice Number': string;
    'Customer': string;
    'Date': string;
    'Payment Date': string;
    'Amount': string | number;
    'Payment Method': string;
  };
  
  // Map invoices to the format needed for the report
  const reportData: ReportRow[] = monthlyData.invoices.map((invoice, index) => ({
    'SL.No.': index + 1,
    'Invoice Number': invoice.invoiceNumber,
    'Customer': invoice.customerName,
    'Date': invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A',
    'Payment Date': invoice.paymentDate ? format(new Date(invoice.paymentDate), 'MMM dd, yyyy') : 'N/A',
    'Amount': (invoice.paidAmount || 0).toFixed(2),
    'Payment Method': invoice.paymentMethod || 'N/A'
  }));
  
  // Add summary row at the bottom with type safety
  reportData.push({
    'SL.No.': '',
    'Invoice Number': '',
    'Customer': '',
    'Date': '',
    'Payment Date': 'TOTAL',
    'Amount': monthlyData.total.toFixed(2),
    'Payment Method': ''
  });
  
  const headers = ['SL.No.', 'Invoice Number', 'Customer', 'Date', 'Payment Date', 'Amount', 'Payment Method'];
  const worksheet = generateExcelWorksheet(reportData, headers);
  
  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Monthly Report (${monthlyData.period})`);
  
  return workbook;
};

// Create a detailed payment report
export const createDetailedReport = (invoices: Invoice[]) => {
  const { paid, unpaid, partial } = categorizeInvoices(invoices);
  const workbook = XLSX.utils.book_new();
  
  // Create paid invoices sheet
  if (paid.length > 0) {
    const paidData = paid.map((invoice, index) => ({
      'SL.No.': index + 1,
      'Invoice Number': invoice.invoiceNumber,
      'Customer': invoice.customerName,
      'Date': invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A',
      'Payment Date': invoice.paymentDate ? format(new Date(invoice.paymentDate), 'MMM dd, yyyy') : 'N/A',
      'Amount': (invoice.paidAmount || 0).toFixed(2),
      'Status': 'PAID'
    }));
    
    const paidWorksheet = generateExcelWorksheet(paidData, []);
    XLSX.utils.book_append_sheet(workbook, paidWorksheet, 'Paid Invoices');
  }
  
  // Create unpaid invoices sheet
  if (unpaid.length > 0) {
    const unpaidData = unpaid.map((invoice, index) => ({
      'SL.No.': index + 1,
      'Invoice Number': invoice.invoiceNumber,
      'Customer': invoice.customerName,
      'Date': invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A',
      'Due Amount': (invoice.netAmount || 0).toFixed(2),
      'Status': 'UNPAID'
    }));
    
    const unpaidWorksheet = generateExcelWorksheet(unpaidData, []);
    XLSX.utils.book_append_sheet(workbook, unpaidWorksheet, 'Unpaid Invoices');
  }
  
  // Create partial payment sheet
  if (partial.length > 0) {
    const partialData = partial.map((invoice, index) => ({
      'SL.No.': index + 1,
      'Invoice Number': invoice.invoiceNumber,
      'Customer': invoice.customerName,
      'Date': invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A',
      'Total Amount': (invoice.netAmount || 0).toFixed(2),
      'Paid Amount': (invoice.paidAmount || 0).toFixed(2),
      'Balance': ((invoice.netAmount || 0) - (invoice.paidAmount || 0)).toFixed(2),
      'Status': 'PARTIAL'
    }));
    
    const partialWorksheet = generateExcelWorksheet(partialData, []);
    XLSX.utils.book_append_sheet(workbook, partialWorksheet, 'Partial Payments');
  }
  
  return workbook;
};

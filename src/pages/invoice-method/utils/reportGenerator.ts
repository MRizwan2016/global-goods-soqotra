
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameWeek, isSameMonth } from 'date-fns';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Invoice } from "../components/status-tabs/Invoice";

// Helper function to fetch invoices from storage
const fetchInvoices = (): Invoice[] => {
  try {
    // Get invoices from localStorage (in a real app, this would be an API call)
    const storedInvoices = localStorage.getItem('invoices');
    const invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
    
    // Also check if there are any generated invoices
    const generatedInvoices = localStorage.getItem('generatedInvoices');
    const additionalInvoices = generatedInvoices ? JSON.parse(generatedInvoices) : [];
    
    // Combine all invoices
    return [...invoices, ...additionalInvoices];
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
};

// Helper to get payment status categories
const categorizeInvoices = (invoices: Invoice[]) => {
  const paid: Invoice[] = [];
  const unpaid: Invoice[] = [];
  const partial: Invoice[] = [];
  
  invoices.forEach(invoice => {
    const netAmount = invoice.netAmount || 0;
    const paidAmount = invoice.paidAmount || 0;
    
    if (paidAmount <= 0) {
      unpaid.push(invoice);
    } else if (paidAmount >= netAmount) {
      paid.push(invoice);
    } else {
      partial.push(invoice);
    }
  });
  
  return { paid, unpaid, partial };
};

// Calculate total amounts
const calculateTotals = (invoices: Invoice[]) => {
  const { paid, unpaid, partial } = categorizeInvoices(invoices);
  
  const totalPaidAmount = paid.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  const totalUnpaidAmount = unpaid.reduce((sum, inv) => sum + (inv.netAmount || 0), 0);
  const totalPartialInvoiceAmount = partial.reduce((sum, inv) => sum + (inv.netAmount || 0), 0);
  const totalPartialPaidAmount = partial.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  const totalPartialRemainingAmount = totalPartialInvoiceAmount - totalPartialPaidAmount;
  
  return {
    totalPaidAmount,
    totalUnpaidAmount,
    totalPartialInvoiceAmount,
    totalPartialPaidAmount,
    totalPartialRemainingAmount,
    paidCount: paid.length,
    unpaidCount: unpaid.length,
    partialCount: partial.length
  };
};

// Generate weekly report data
const generateWeeklyData = (invoices: Invoice[]) => {
  const now = new Date();
  const startDate = startOfWeek(now);
  const endDate = endOfWeek(now);
  
  // Filter invoices paid this week
  const weeklyInvoices = invoices.filter(invoice => {
    if (!invoice.paymentDate) return false;
    const paymentDate = new Date(invoice.paymentDate);
    return isSameWeek(paymentDate, now);
  });
  
  const weeklyTotal = weeklyInvoices.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  
  return {
    period: `${format(startDate, 'MMM dd, yyyy')} - ${format(endDate, 'MMM dd, yyyy')}`,
    invoices: weeklyInvoices,
    total: weeklyTotal,
    count: weeklyInvoices.length
  };
};

// Generate monthly report data
const generateMonthlyData = (invoices: Invoice[]) => {
  const now = new Date();
  const startDate = startOfMonth(now);
  const endDate = endOfMonth(now);
  
  // Filter invoices paid this month
  const monthlyInvoices = invoices.filter(invoice => {
    if (!invoice.paymentDate) return false;
    const paymentDate = new Date(invoice.paymentDate);
    return isSameMonth(paymentDate, now);
  });
  
  const monthlyTotal = monthlyInvoices.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  
  return {
    period: format(now, 'MMMM yyyy'),
    invoices: monthlyInvoices,
    total: monthlyTotal,
    count: monthlyInvoices.length
  };
};

// Generate an Excel worksheet from data
const generateExcelWorksheet = (data: any[], headers: string[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add header styling and column widths
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  const headerRange = {
    s: { r: 0, c: 0 },
    e: { r: 0, c: range.e.c }
  };
  
  return worksheet;
};

// Create a simple summary report
const createSummaryReport = (invoices: Invoice[]) => {
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
const createWeeklyReport = (invoices: Invoice[]) => {
  const weeklyData = generateWeeklyData(invoices);
  
  // Map invoices to the format needed for the report
  const reportData = weeklyData.invoices.map((invoice, index) => ({
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
    'Amount': parseFloat(weeklyData.total.toFixed(2)),  // Convert to number
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
const createMonthlyReport = (invoices: Invoice[]) => {
  const monthlyData = generateMonthlyData(invoices);
  
  // Map invoices to the format needed for the report
  const reportData = monthlyData.invoices.map((invoice, index) => ({
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
    'Amount': parseFloat(monthlyData.total.toFixed(2)),  // Convert to number
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
const createDetailedReport = (invoices: Invoice[]) => {
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


import { saveAs } from "file-saver";
import { ProfitLossData, Transaction } from "../../types/profitLossTypes";
import { formatDate } from "@/lib/utils";

/**
 * Convert an array of objects to CSV format
 */
const objectsToCSV = (data: any[]): string => {
  if (data.length === 0) return '';
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const csvRows = [headers.join(',')];
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Handle string values that might contain commas
      if (typeof value === 'string') {
        // Escape quotes and wrap in quotes
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Export transactions to CSV format
 */
export const exportTransactionsToCSV = (data: Transaction[], filename: string = 'transactions.csv'): void => {
  // Format transaction data for CSV
  const csvData = data.map(transaction => ({
    Date: formatDate(transaction.date),
    Description: transaction.description,
    Country: transaction.country,
    Type: transaction.type === 'revenue' ? 'Revenue' : 'Expense',
    Category: transaction.expenseType || '-',
    Amount: transaction.amount.toFixed(2),
    Status: transaction.type === 'revenue' ? 
      (transaction.status === 'paid' ? 'Paid' : 'Pending') : '-'
  }));
  
  const csv = objectsToCSV(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
};

/**
 * Export monthly profit/loss data to CSV
 */
export const exportMonthlyDataToCSV = (data: ProfitLossData['monthlyData'], filename: string = 'monthly_profit_loss.csv'): void => {
  const csvData = data.map(month => ({
    Month: month.month,
    Revenue: month.revenue.toFixed(2),
    Expenses: month.expenses.toFixed(2),
    Profit: month.profit.toFixed(2)
  }));
  
  const csv = objectsToCSV(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
};

/**
 * Export summary data to CSV
 */
export const exportSummaryToCSV = (data: ProfitLossData, countryData: Record<string, any>, filename: string = 'profit_loss_summary.csv'): void => {
  // Format summary data
  const summaryData = [
    { Category: 'Total Revenue', Value: data.revenue.paid.toFixed(2) },
    { Category: 'Total Expenses', Value: data.expenses.total.toFixed(2) },
    { Category: 'Net Profit', Value: (data.revenue.paid - data.expenses.total).toFixed(2) },
    { Category: 'Profit Margin', Value: `${(data.revenue.paid > 0 ? (data.revenue.paid - data.expenses.total) / data.revenue.paid * 100 : 0).toFixed(1)}%` },
    { Category: 'Paid Invoices', Value: data.revenue.paidCount.toString() },
    { Category: 'Pending Invoices', Value: data.revenue.pendingCount.toString() },
    { Category: 'Expense Entries', Value: data.expenses.count.toString() }
  ];
  
  // Add country profit data
  Object.entries(countryData).forEach(([country, data]) => {
    const countryProfit = data.revenue - data.expenses;
    summaryData.push({ Category: `${country} - Revenue`, Value: data.revenue.toFixed(2) });
    summaryData.push({ Category: `${country} - Expenses`, Value: data.expenses.toFixed(2) });
    summaryData.push({ Category: `${country} - Profit`, Value: countryProfit.toFixed(2) });
  });
  
  const csv = objectsToCSV(summaryData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
};

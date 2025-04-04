
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameWeek, isSameMonth } from 'date-fns';
import { Invoice } from "../../components/status-tabs/Invoice";

// Generate weekly report data
export const generateWeeklyData = (invoices: Invoice[]) => {
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
export const generateMonthlyData = (invoices: Invoice[]) => {
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

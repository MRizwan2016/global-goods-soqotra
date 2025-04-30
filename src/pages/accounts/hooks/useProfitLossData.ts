
import { useState, useEffect } from "react";
import { 
  ProfitLossData, 
  CountryProfitData, 
  Transaction 
} from "../types/profitLossTypes";
import { getProfitLossColumnDefs } from "./profit-loss/columnDefs";
import { 
  filterData, 
  getCountryFromLocation,
  getCountryNameFromCode,
  generateSampleExpenses
} from "./profit-loss/filterUtils";
import { 
  calculateMonthlyData,
  calculateCountryProfit
} from "./profit-loss/calculationUtils";

export const useProfitLossData = (
  country: string = "all", 
  dateRange: { from?: Date; to?: Date } = {},
  refreshKey: number = 0
) => {
  const [profitLossData, setProfitLossData] = useState<ProfitLossData | null>(null);
  const [profitLossByCountry, setProfitLossByCountry] = useState<Record<string, CountryProfitData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get column definitions for the data table
  const columnDefs = getProfitLossColumnDefs();

  useEffect(() => {
    const fetchProfitLossData = async () => {
      setIsLoading(true);
      
      try {
        // Load invoices from localStorage
        const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
        
        // Load expenses from localStorage (create if doesn't exist)
        const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
        
        // If expenses storage doesn't exist, create it with some sample data
        if (!localStorage.getItem("expenses")) {
          const sampleExpenses = generateSampleExpenses();
          localStorage.setItem("expenses", JSON.stringify(sampleExpenses));
        }
        
        // Process and filter data by country and date range if provided
        const filteredInvoices = filterData(invoices, country, dateRange);
        const filteredExpenses = filterData(expenses, country, dateRange);
        
        // Calculate total revenue from invoices
        const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.totalAmount || "0"), 0);
        const paidRevenue = filteredInvoices
          .filter(inv => inv.paymentStatus === "paid")
          .reduce((sum, inv) => sum + parseFloat(inv.totalAmount || "0"), 0);
        const pendingRevenue = filteredInvoices
          .filter(inv => inv.paymentStatus !== "paid")
          .reduce((sum, inv) => sum + parseFloat(inv.totalAmount || "0"), 0);
        
        // Calculate total expenses
        const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || "0"), 0);
        
        // Create transaction list for detailed view
        const transactions: Transaction[] = [
          ...filteredInvoices.map(inv => ({
            id: inv.id,
            date: inv.date || inv.createdAt,
            description: `Invoice ${inv.invoiceNumber} - ${inv.consigneeName || inv.shipperName || "Customer"}`,
            country: getCountryFromLocation(inv.locationTo || ""),
            type: "revenue",
            amount: parseFloat(inv.totalAmount || "0"),
            status: inv.paymentStatus || "pending"
          })),
          ...filteredExpenses.map(exp => ({
            id: exp.id,
            date: exp.date,
            description: exp.description,
            country: exp.country,
            type: "expense",
            expenseType: exp.category,
            amount: parseFloat(exp.amount || "0"),
            status: "paid" // Expenses are considered paid by default
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Calculate monthly data for charts
        const monthlyData = calculateMonthlyData(transactions);
        
        // Calculate profit by country
        const countryProfitData = calculateCountryProfit(transactions);
        
        // Build the final data object
        const data: ProfitLossData = {
          revenue: {
            total: totalRevenue,
            paid: paidRevenue,
            pending: pendingRevenue,
            invoiceCount: filteredInvoices.length,
            paidCount: filteredInvoices.filter(inv => inv.paymentStatus === "paid").length,
            pendingCount: filteredInvoices.filter(inv => inv.paymentStatus !== "paid").length,
          },
          expenses: {
            total: totalExpenses,
            count: filteredExpenses.length,
          },
          transactions,
          monthlyData,
        };
        
        setProfitLossData(data);
        setProfitLossByCountry(countryProfitData);
      } catch (error) {
        console.error("Error loading profit and loss data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfitLossData();
  }, [country, dateRange, refreshKey]);
  
  return { profitLossData, profitLossByCountry, isLoading, columnDefs };
};

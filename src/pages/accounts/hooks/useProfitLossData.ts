
import { useState, useEffect } from "react";
import { ProfitLossData, CountryProfitData, Transaction } from "../types/profitLossTypes";
import { filterData, generateSampleExpenses } from "./profit-loss/filterUtils";
import { calculateMonthlyData, calculateCountryProfit } from "./profit-loss/calculationUtils";
import { getProfitLossColumnDefs } from "./profit-loss/columnDefs.tsx";
import { DateRange } from "react-day-picker";

export const useProfitLossData = (
  country: string,
  dateRange: DateRange,
  refreshKey: number = 0
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profitLossData, setProfitLossData] = useState<ProfitLossData | null>(null);
  const [profitLossByCountry, setProfitLossByCountry] = useState<Record<string, CountryProfitData>>({});
  const [error, setError] = useState<string | null>(null);
  
  // Load and process the profit/loss data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, fetch data from an API
        // For this demo, generate sample data
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Generate fake data
        const expenseItems = generateSampleExpenses();
        
        // Simulate invoice data
        const invoices = [
          {
            id: 'inv-1',
            date: '2025-03-15',
            description: 'Shipping Services - March',
            country: 'Qatar',
            type: 'revenue' as const,
            amount: 5250.50,
            status: 'paid' as const
          },
          {
            id: 'inv-2',
            date: '2025-03-22',
            description: 'Container Transport',
            country: 'UAE',
            type: 'revenue' as const,
            amount: 3125.75,
            status: 'paid' as const
          },
          {
            id: 'inv-3',
            date: '2025-04-05',
            description: 'Logistics Services - April',
            country: 'Kenya',
            type: 'revenue' as const,
            amount: 4750.00,
            status: 'pending' as const
          },
          {
            id: 'inv-4',
            date: '2025-04-15',
            description: 'Export Documentation',
            country: 'Qatar',
            type: 'revenue' as const,
            amount: 875.25,
            status: 'pending' as const
          },
          {
            id: 'inv-5',
            date: '2025-03-30',
            description: 'International Freight',
            country: 'Saudi Arabia',
            type: 'revenue' as const,
            amount: 7325.00,
            status: 'paid' as const
          },
        ];
        
        // Ensure valid expense items
        const validExpenses = expenseItems.filter(exp => 
          exp && typeof exp === 'object' && exp.id && exp.date && exp.description
        );
        
        // Combine transactions
        const allTransactions: Transaction[] = [
          ...invoices.map(inv => ({
            id: inv.id,
            date: inv.date,
            description: inv.description,
            country: inv.country,
            type: inv.type,
            amount: inv.amount,
            status: inv.status
          })),
          ...validExpenses.map((exp: any) => ({
            id: exp.id,
            date: exp.date,
            description: exp.description,
            country: exp.country || 'Unknown',
            type: 'expense' as const,
            amount: parseFloat(exp.amount) || 0,
            expenseType: exp.category || 'Miscellaneous'
          }))
        ];
        
        // Apply filters
        const filteredTransactions = filterData(allTransactions, country, dateRange);
        
        // Calculate revenue and expense totals
        const revenue = {
          total: filteredTransactions
            .filter(t => t.type === 'revenue')
            .reduce((sum, t) => sum + (t.amount || 0), 0),
          paid: filteredTransactions
            .filter(t => t.type === 'revenue' && t.status === 'paid')
            .reduce((sum, t) => sum + (t.amount || 0), 0),
          pending: filteredTransactions
            .filter(t => t.type === 'revenue' && t.status === 'pending')
            .reduce((sum, t) => sum + (t.amount || 0), 0),
          invoiceCount: filteredTransactions.filter(t => t.type === 'revenue').length,
          paidCount: filteredTransactions.filter(t => t.type === 'revenue' && t.status === 'paid').length,
          pendingCount: filteredTransactions.filter(t => t.type === 'revenue' && t.status === 'pending').length,
        };
        
        const expenseData = {
          total: filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + (t.amount || 0), 0),
          count: filteredTransactions.filter(t => t.type === 'expense').length
        };
        
        // Calculate monthly data
        const monthlyData = calculateMonthlyData(filteredTransactions);
        
        // Calculate country profit data
        const countryProfitData = calculateCountryProfit(filteredTransactions);
        
        // Log for debugging
        console.log("Filtered transactions:", filteredTransactions);
        console.log("Monthly data:", monthlyData);
        
        setProfitLossData({
          revenue,
          expenses: expenseData,
          transactions: filteredTransactions,
          monthlyData
        });
        
        setProfitLossByCountry(countryProfitData);
      } catch (error) {
        console.error("Error loading profit/loss data:", error);
        setError("Failed to load profit and loss data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [country, dateRange, refreshKey]);
  
  const columnDefs = getProfitLossColumnDefs();
  
  return {
    profitLossData,
    profitLossByCountry,
    isLoading,
    error,
    columnDefs
  };
};

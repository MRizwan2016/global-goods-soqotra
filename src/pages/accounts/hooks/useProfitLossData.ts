
import { useState, useEffect } from "react";
import { 
  ProfitLossData, 
  CountryProfitData, 
  Transaction 
} from "../types/profitLossTypes";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/ui/data-table";

export const useProfitLossData = (
  country: string = "all", 
  dateRange: { from?: Date; to?: Date } = {},
  refreshKey: number = 0
) => {
  const [profitLossData, setProfitLossData] = useState<ProfitLossData | null>(null);
  const [profitLossByCountry, setProfitLossByCountry] = useState<Record<string, CountryProfitData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Column definitions for the data table
  const columnDefs: Column[] = [
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => <span>{row.date}</span>,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
    },
    {
      id: "country",
      header: "Country",
      accessorKey: "country",
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => (
        <Badge className={row.type === "revenue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {row.type === "revenue" ? "Revenue" : "Expense"}
        </Badge>
      ),
    },
    {
      id: "expenseType",
      header: "Category",
      accessorKey: "expenseType",
      cell: ({ row }) => row.expenseType || "-",
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className={row.type === "revenue" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          ${parseFloat(row.amount).toFixed(2)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        if (row.type === "expense") return "-";
        
        return row.status === "paid" ? (
          <Badge className="bg-green-100 text-green-800">Paid</Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
        );
      },
    },
  ];

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

// Helper functions

function filterData(data: any[], country: string, dateRange: { from?: Date; to?: Date }) {
  return data.filter(item => {
    // Filter by country if specified
    if (country && country !== "all") {
      const itemCountry = item.country || getCountryFromLocation(item.locationTo || "");
      
      if (itemCountry.toLowerCase() !== country && 
          itemCountry.toLowerCase() !== getCountryNameFromCode(country)?.toLowerCase()) {
        return false;
      }
    }
    
    // Filter by date range if specified
    if (dateRange.from || dateRange.to) {
      const itemDate = new Date(item.date || item.createdAt || new Date());
      
      if (dateRange.from && itemDate < dateRange.from) {
        return false;
      }
      
      if (dateRange.to) {
        const endDate = new Date(dateRange.to);
        endDate.setHours(23, 59, 59);
        
        if (itemDate > endDate) {
          return false;
        }
      }
    }
    
    return true;
  });
}

function calculateMonthlyData(transactions: Transaction[]) {
  const monthlyData: Record<string, any> = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('default', { month: 'short', year: 'numeric' });
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        month: monthLabel,
        revenue: 0,
        expenses: 0,
        profit: 0,
      };
    }
    
    if (transaction.type === "revenue" && transaction.status === "paid") {
      monthlyData[monthYear].revenue += transaction.amount;
    } else if (transaction.type === "expense") {
      monthlyData[monthYear].expenses += transaction.amount;
    }
    
    monthlyData[monthYear].profit = monthlyData[monthYear].revenue - monthlyData[monthYear].expenses;
  });
  
  // Convert to array and sort by month
  return Object.values(monthlyData).sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');
    
    if (aYear !== bYear) {
      return parseInt(aYear) - parseInt(bYear);
    }
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(aMonth) - months.indexOf(bMonth);
  });
}

function calculateCountryProfit(transactions: Transaction[]) {
  const countryProfit: Record<string, CountryProfitData> = {};
  
  transactions.forEach(transaction => {
    const country = transaction.country || "Unknown";
    
    if (!countryProfit[country]) {
      countryProfit[country] = {
        revenue: 0,
        expenses: 0,
      };
    }
    
    if (transaction.type === "revenue" && transaction.status === "paid") {
      countryProfit[country].revenue += transaction.amount;
    } else if (transaction.type === "expense") {
      countryProfit[country].expenses += transaction.amount;
    }
  });
  
  return countryProfit;
}

function getCountryFromLocation(location: string): string {
  // Extract country from location string like "Doha, Qatar"
  const parts = location.split(',');
  if (parts.length > 1) {
    return parts[parts.length - 1].trim();
  }
  return location.trim();
}

function getCountryNameFromCode(code: string): string | undefined {
  const countryMap: Record<string, string> = {
    'qa': 'Qatar',
    'ke': 'Kenya',
    'er': 'Eritrea',
    'sd': 'Sudan',
    'tn': 'Tunisia',
    'ph': 'Philippines',
    'mz': 'Mozambique',
    'sa': 'Saudi Arabia',
    'ae': 'UAE',
    'om': 'Oman',
    'lk': 'Sri Lanka',
  };
  
  return countryMap[code.toLowerCase()];
}

function generateSampleExpenses() {
  const countries = ['Qatar', 'Kenya', 'UAE', 'Saudi Arabia', 'Oman'];
  const categories = ['Shipping', 'Salaries', 'Vehicle Maintenance', 'Office Rent', 'Utilities', 'Insurance', 'Fuel'];
  const expenses = [];
  
  // Generate some sample expenses for the last 6 months
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6)); // Random date in the last 6 months
    
    expenses.push({
      id: `exp-${i+1}`,
      date: date.toISOString().split('T')[0],
      description: `${categories[Math.floor(Math.random() * categories.length)]} Expense`,
      amount: (Math.floor(Math.random() * 10000) / 10 + 100).toFixed(2),
      category: categories[Math.floor(Math.random() * categories.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      paymentMethod: 'Bank Transfer',
      createdAt: date.toISOString()
    });
  }
  
  return expenses;
}

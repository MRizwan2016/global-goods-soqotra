
import { Transaction, CountryProfitData } from "../../types/profitLossTypes";

/**
 * Calculate monthly data for charts and reporting
 */
export function calculateMonthlyData(transactions: Transaction[]) {
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

/**
 * Calculate profit and loss by country
 */
export function calculateCountryProfit(transactions: Transaction[]) {
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

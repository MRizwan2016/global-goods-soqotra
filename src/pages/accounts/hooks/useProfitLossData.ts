
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { ProfitLossData, CountryProfitData } from "../types/profitLossTypes";

export const useProfitLossData = (
  selectedCountry: string,
  dateRange: DateRange,
  refreshKey: number
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profitLossData, setProfitLossData] = useState<ProfitLossData | null>(null);
  const [profitLossByCountry, setProfitLossByCountry] = useState<Record<string, CountryProfitData>>({});

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProfitLossData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample data that matches your screenshot
        const mockProfitLossData: ProfitLossData = {
          revenue: {
            total: 1780,
            paid: 1780,
            pending: 0,
            invoiceCount: 3,
            paidCount: 3,
            pendingCount: 0
          },
          expenses: {
            total: 0,
            count: 0
          },
          transactions: [
            {
              id: "1",
              date: "2023-06-15",
              description: "Cargo shipment",
              country: "SRI LANKA",
              type: "revenue",
              amount: 350,
              status: "paid",
              containerJobNumber: "CONT-2023-001",
              amountInQar: 350,
              shippingLine: "",
              otherExpenses: 0,
              netProfit: 350
            },
            {
              id: "2",
              date: "2023-06-18",
              description: "Cargo shipment",
              country: "KENYA",
              type: "revenue",
              amount: 650,
              status: "paid",
              containerJobNumber: "CONT-2023-002",
              amountInQar: 650,
              shippingLine: "",
              otherExpenses: 0,
              netProfit: 650
            },
            {
              id: "3",
              date: "2023-06-25",
              description: "Cargo shipment",
              country: "PHILIPPINES",
              type: "revenue",
              amount: 780,
              status: "paid",
              containerJobNumber: "CONT-2023-003",
              amountInQar: 780,
              shippingLine: "",
              otherExpenses: 0,
              netProfit: 780
            }
          ],
          monthlyData: [
            { month: "Jan", revenue: 0, expenses: 0, profit: 0 },
            { month: "Feb", revenue: 0, expenses: 0, profit: 0 },
            { month: "Mar", revenue: 0, expenses: 0, profit: 0 },
            { month: "Apr", revenue: 0, expenses: 0, profit: 0 },
            { month: "May", revenue: 0, expenses: 0, profit: 0 },
            { month: "Jun", revenue: 1780, expenses: 0, profit: 1780 },
            { month: "Jul", revenue: 0, expenses: 0, profit: 0 },
            { month: "Aug", revenue: 0, expenses: 0, profit: 0 },
            { month: "Sep", revenue: 0, expenses: 0, profit: 0 },
            { month: "Oct", revenue: 0, expenses: 0, profit: 0 },
            { month: "Nov", revenue: 0, expenses: 0, profit: 0 },
            { month: "Dec", revenue: 0, expenses: 0, profit: 0 }
          ]
        };
        
        // Filter by country if selected
        if (selectedCountry && selectedCountry !== "all") {
          mockProfitLossData.transactions = mockProfitLossData.transactions.filter(
            t => t.country.toLowerCase() === selectedCountry.toLowerCase()
          );
        }
        
        // Generate country-specific profit/loss data
        const countryData: Record<string, CountryProfitData> = {};
        
        mockProfitLossData.transactions.forEach(transaction => {
          const country = transaction.country || "Other";
          
          if (!countryData[country]) {
            countryData[country] = {
              revenue: 0,
              expenses: 0
            };
          }
          
          if (transaction.type === "revenue") {
            countryData[country].revenue += transaction.amount;
          } else {
            countryData[country].expenses += transaction.amount;
          }
        });
        
        setProfitLossData(mockProfitLossData);
        setProfitLossByCountry(countryData);
      } catch (error) {
        console.error("Error fetching profit loss data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfitLossData();
  }, [selectedCountry, dateRange, refreshKey]);
  
  return { profitLossData, profitLossByCountry, isLoading };
};

export default useProfitLossData;

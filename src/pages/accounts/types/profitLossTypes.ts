
export interface RevenueData {
  total: number;
  paid: number;
  pending: number;
  invoiceCount: number;
  paidCount: number;
  pendingCount: number;
}

export interface ExpensesData {
  total: number;
  count: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  country: string;
  type: 'revenue' | 'expense';
  amount: number;
  status?: 'paid' | 'pending';
  expenseType?: string;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ProfitLossData {
  revenue: RevenueData;
  expenses: ExpensesData;
  transactions: Transaction[];
  monthlyData: MonthlyData[];
}

export interface CountryProfitData {
  revenue: number;
  expenses: number;
}

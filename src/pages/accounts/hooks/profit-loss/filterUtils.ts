
/**
 * Utility functions for filtering and processing profit/loss data
 */

// Filter data based on country and date range
export function filterData(data: any[], country: string, dateRange: { from?: Date; to?: Date }) {
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

// Extract country from location string
export function getCountryFromLocation(location: string): string {
  // Extract country from location string like "Doha, Qatar"
  const parts = location.split(',');
  if (parts.length > 1) {
    return parts[parts.length - 1].trim();
  }
  return location.trim();
}

// Get full country name from country code
export function getCountryNameFromCode(code: string): string | undefined {
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

// Generate sample expenses for demo purposes
export function generateSampleExpenses() {
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

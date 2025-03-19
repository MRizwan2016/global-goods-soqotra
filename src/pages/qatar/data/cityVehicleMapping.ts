
// Map of cities to recommended truck/vehicle numbers
export const cityVehicleMapping: Record<string, string[]> = {
  // Qatar cities
  'DOH': ['41067'], // Doha uses truck 41067
  'RAK': ['41070'], // Al Rayyan/Rakhia uses truck 41070
  'WAK': ['41073'], // Al Wakrah uses truck 41073
  'UMS': ['41067', '41070'], // Umm Salal can use either truck
  'KHO': ['41073'], // Al Khor uses truck 41073
  'DAY': ['41070'], // Daayen uses truck 41070
  'SHA': ['41067'], // Al Shamal uses truck 41067
  'WSB': ['119927'], // Warehouse locations use different vehicles
  
  // International cargo collecting countries
  'KENYA': ['41067'],
  'PHILIPPINES': ['41070'],
  'SOMALIA': ['41073'],
  'ERITREA': ['41067'],
  'SUDAN': ['41070'],
  'UGANDA': ['41073'],
  'MOZAMBIQUE': ['41067'],
  'TUNISIA': ['41070']
};

// Get recommended vehicles for a city
export const getRecommendedVehiclesForCity = (cityCode: string): string[] => {
  return cityVehicleMapping[cityCode] || [];
};

// Get all cities that use a specific vehicle
export const getCitiesForVehicle = (vehicleNumber: string): string[] => {
  return Object.entries(cityVehicleMapping)
    .filter(([_, vehicles]) => vehicles.includes(vehicleNumber))
    .map(([city, _]) => city);
};

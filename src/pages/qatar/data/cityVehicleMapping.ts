
export const cityVehicleMapping = {
  "Doha": ["41067", "41073"],
  "Al Rayyan": ["41070", "514005"],
  "Al Wakrah": ["41073", "119927"],
  "Al Khor": ["41067", "41070"],
  "Umm Salal": ["514005", "74827"],
  "Industrial Area": ["514005", "119927"],
  "Lusail": ["41067", "74827"],
  "The Pearl": ["41067", "74827"]
};

/**
 * Gets all cities that a specific vehicle can operate in
 * @param vehicleNumber The vehicle's identification number
 * @returns Array of city names where the vehicle operates
 */
export const getCitiesForVehicle = (vehicleNumber: string): string[] => {
  const cities: string[] = [];
  
  // Loop through all cities in the mapping
  Object.entries(cityVehicleMapping).forEach(([city, vehicles]) => {
    // If this vehicle is in the list for this city, add the city to the result
    if (vehicles.includes(vehicleNumber)) {
      cities.push(city);
    }
  });
  
  return cities;
};

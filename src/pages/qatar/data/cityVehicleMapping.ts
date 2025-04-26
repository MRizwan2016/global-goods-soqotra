
// Map of cities to recommended truck/vehicle numbers
export const cityVehicleMapping: Record<string, string[]> = {
  // Vehicle 41067 cities
  'MUAITHAR': ['41067'],
  'BAAYA': ['41067'],
  'ONAIZA': ['41067'],
  'WESTBAY': ['41067'],
  'DAFFNA': ['41067'],
  'KARARA': ['41067'],
  'KATARA': ['41067'],
  'UMM SALAAL ALI': ['41067'],
  'UMM SALAAL MOHAMED': ['41067'],
  'UM GARAN': ['41067'],
  'UM AL AFFAI': ['41067'],
  'MAKAINIS': ['41067'],
  'AL SAAD': ['41067'],
  'ABU NAKLA': ['41067'],
  'PEARL QATAR': ['41067'],
  'ABU SAMRA': ['41067'],
  'SHAMAL': ['41067'],
  'AL ASIRI': ['41067'],
  'ABU FANTAS': ['41067'],
  'AL JUMAILIYAH': ['41067'],
  'AL MESSILA': ['41067'],
  'AL MIRQAB': ['41067'],
  'AL NASAR STREET': ['41067'],
  'RAWDATH AL HAMMAR': ['41067'],
  'AL KEESA': ['41067'],
  'SOUQ AL NAJADA': ['41067'],
  'AL WAAB': ['41067'],
  'AL RUWAIS': ['41067'],
  'AL WAJBA': ['41067'],
  'AL ZOBARA': ['41067'],
  'AZIZIYA': ['41067'],
  'BANI HAJAR': ['41067'],
  'GARAFA': ['41067'],
  'BIN OMRAN': ['41067'],
  'BU SIDRA': ['41067'],
  'AL DAKEERA': ['41067'],
  'DUHAIL': ['41067'],
  'DUKHAAN': ['41067'],
  'EDUCATION CITY': ['41067'],
  'FEREEJ ABDUL AZIZ': ['41067'],
  'FEREEJ AL SUDAN': ['41067'],
  'FURUSIYA STREET': ['41067'],
  'JAMALIA': ['41067'],
  'ISAGAWA': ['41067'],
  'KARARA AIR BASE': ['41067'],
  'LAKHTA': ['41067'],
  'LEQTAFIYA': ['41067'],
  'LUAIB': ['41067'],
  'LUSAIL': ['41067'],
  'MARIKIYA': ['41067'],
  'MARKIYA': ['41067'],
  'MOORA': ['41067'],
  'MUSHERIEB': ['41067'],
  'MESHAF': ['41067'],
  'AL KHOR': ['41067', '74827'], // Note: Al Khor is mapped to multiple vehicles
  'SALWA ROAD': ['41067'],
  'RAS LAFFAN': ['41067', '74827'], // Note: Ras Laffan is mapped to multiple vehicles
  'RUMEILAH': ['41067'],
  'SAHANIYA': ['41067'],
  'SIMSIMA': ['41067'],
  'SHUKAIMA': ['41067'],
  'UMBERIQA': ['41067'],
  'UMM AL AHAMED': ['41067'],
  'UMM AL SANEEM': ['41067'],
  'LEKHBA': ['41067'],
  'UM SALAL ALI': ['41067'],
  'UM SALAL MOHAMED': ['41067'],
  
  // Vehicle 41073 cities
  'MATHAR AL QADEEM': ['41073'],
  'HILAL': ['41073'],
  'AL HILAL': ['41073'],
  'THUMAMA': ['41073'],
  'MANSOORA': ['41073'],
  'NAJMA': ['41073'],
  'MUNTAZA': ['41073'],
  'LABOUR CITY': ['41073'],
  'ASIAN TOWN': ['41073'],
  'MAMOORA': ['41073'],
  'MESSAIMEER': ['41073'],
  'NUAIJA': ['41073'],
  'EZDAN OASIA': ['41073'],
  'WUKAIR': ['41073'],
  'WAKRA': ['41073'],
  'BIRKATH AL AWAMAR': ['41073'],
  'NEW SALATHA': ['41073'],
  'SHELIYAH': ['41073'],
  'OLD SALATHA': ['41073'],
  'OLD AL GHANAM': ['41073'],
  'BARWA VILLAGE': ['41073'],
  'AL HITMI': ['41073'],
  'AIN KHALITH': ['41073'],
  'MATHAR AL KADEEM': ['41073'],
  'INDUSTRIAL AREA': ['41073'],
  'ABU HAMOOR': ['41073'],
  'BARWA MADINA': ['41073'],
  'DOHA CITY': ['41073'],
  'DOHA JADEED': ['41073'],
  'BARWA CITY': ['41073'],
  'BARWA AL BARHA': ['41073'],
  'MESSAIEED': ['41073'],
  
  // Industrial Area Street Numbers (using 514005 vehicle)
  'STREET NO. 1': ['514005'],
  'STREET NO. 2': ['514005'],
  'STREET NO. 3': ['514005'],
  'STREET NO. 4': ['514005'],
  'STREET NO. 5': ['514005'],
  'STREET NO. 6': ['514005'],
  'STREET NO. 7': ['514005'],
  'STREET NO. 8': ['514005'],
  'STREET NO. 9': ['514005'],
  'STREET NO. 10': ['514005'],
  'STREET NO. 11': ['514005'],
  'STREET NO. 12': ['514005'],
  'STREET NO. 13': ['514005'],
  'STREET NO. 14': ['514005'],
  'STREET NO. 15': ['514005'],
  'STREET NO. 16': ['514005'],
  'STREET NO. 17': ['514005'],
  'STREET NO. 18': ['514005'],
  'STREET NO. 19': ['514005'],
  'STREET NO. 20': ['514005'],
  
  // Warehouse areas (using 119927 vehicle)
  'WAREHOUSE 1': ['119927'],
  'WAREHOUSE 2': ['119927'],
  'WAREHOUSE 3': ['119927'],
  'WAREHOUSE 4': ['119927'],
  'WAREHOUSE 5': ['119927'],
  'WAREHOUSE 6': ['119927'],
  'LOGISTICS VILLAGE': ['119927'],
  
  // Special areas (using 74827 vehicle)
  'DUKHAN': ['74827'],
  'SEALINE BEACH': ['74827'],
  'UMM BAB': ['74827'],
  'ZEKREET': ['74827']
  // Note: Removed duplicate entries for AL KHOR and RAS LAFFAN
  // They are now handled above with multiple vehicle assignments
};

/**
 * Get cities assigned to a specific vehicle
 * @param vehicleNumber The vehicle number to search for
 * @returns Array of city names assigned to the vehicle
 */
export const getCitiesForVehicle = (vehicleNumber: string): string[] => {
  const assignedCities: string[] = [];
  
  // Loop through all city entries and check if the vehicle is listed
  for (const [city, vehicles] of Object.entries(cityVehicleMapping)) {
    if (vehicles.includes(vehicleNumber)) {
      assignedCities.push(city);
    }
  }
  
  return assignedCities;
};

/**
 * Get recommended vehicles for a specific city
 * @param city The city to get vehicles for
 * @returns Array of vehicle numbers recommended for the city
 */
export const getVehiclesForCity = (city: string): string[] => {
  return cityVehicleMapping[city] || [];
};

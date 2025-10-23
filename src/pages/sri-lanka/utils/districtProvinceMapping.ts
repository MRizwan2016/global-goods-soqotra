/**
 * Sri Lanka District to Province mapping based on official data
 */
export const DISTRICT_PROVINCE_MAP: Record<string, string> = {
  // Northern Province
  'JAFFNA': 'NORTHERN',
  'KILLINOCHCHI': 'NORTHERN', 
  'MANNAR': 'NORTHERN',
  'MULLAITIVU': 'NORTHERN',
  'VAVUNIYA': 'NORTHERN',
  
  // North Western Province
  'PUTTALAM': 'NORTH WESTERN',
  'KURUNEGALA': 'NORTH WESTERN',
  
  // Western Province
  'GAMPAHA': 'WESTERN',
  'COLOMBO': 'WESTERN',
  'KALUTARA': 'WESTERN',
  
  // North Central Province
  'ANURADHAPURA': 'NORTH CENTRAL',
  'POLONNARUWA': 'NORTH CENTRAL',
  
  // Central Province
  'MATALE': 'CENTRAL',
  'KANDY': 'CENTRAL',
  'NUWARA ELIYA': 'CENTRAL',
  
  // Sabaragamuwa Province
  'KEGALLE': 'SABARAGAMUWA',
  'RATNAPURA': 'SABARAGAMUWA',
  
  // Eastern Province
  'TRINCOMALEE': 'EASTERN',
  'BATTICALOA': 'EASTERN',
  'AMPARA': 'EASTERN',
  
  // Uva Province
  'BADULLA': 'UVA',
  'MONARAGALA': 'UVA',
  
  // Southern Province
  'HAMBANTOTA': 'SOUTHERN',
  'MATARA': 'SOUTHERN',
  'GALLE': 'SOUTHERN'
};

/**
 * Get province for a given district
 */
export const getProvinceForDistrict = (district: string): string => {
  const upperDistrict = district.toUpperCase();
  return DISTRICT_PROVINCE_MAP[upperDistrict] || '';
};

/**
 * Get all districts for a given province
 */
export const getDistrictsForProvince = (province: string): string[] => {
  const upperProvince = province.toUpperCase();
  return Object.entries(DISTRICT_PROVINCE_MAP)
    .filter(([_, prov]) => prov === upperProvince)
    .map(([district, _]) => district);
};

/**
 * Get all available districts
 */
export const getAllDistricts = (): string[] => {
  return Object.keys(DISTRICT_PROVINCE_MAP).sort();
};

/**
 * Get all available provinces
 */
export const getAllProvinces = (): string[] => {
  return [...new Set(Object.values(DISTRICT_PROVINCE_MAP))].sort();
};

/**
 * Extracts vehicle details from a description string
 */
export const extractVehicleDetails = (description: string) => {
  const details: any = {
    make: "",
    model: "",
    year: "",
    color: "",
    chassis: ""
  };
  
  if (!description) return details;
  
  const makeMatch = description.match(/make:?\s*([^,\n]+)/i);
  if (makeMatch && makeMatch[1]) details.make = makeMatch[1].trim();
  
  const modelMatch = description.match(/model:?\s*([^,\n]+)/i);
  if (modelMatch && modelMatch[1]) details.model = modelMatch[1].trim();
  
  const yearMatch = description.match(/year:?\s*([^,\n]+)/i);
  if (yearMatch && yearMatch[1]) details.year = yearMatch[1].trim();
  
  const colorMatch = description.match(/color:?\s*([^,\n]+)/i);
  if (colorMatch && colorMatch[1]) details.color = colorMatch[1].trim();
  
  const chassisMatch = description.match(/chassis:?\s*([^,\n]+)/i) || 
                        description.match(/vin:?\s*([^,\n]+)/i);
  if (chassisMatch && chassisMatch[1]) details.chassis = chassisMatch[1].trim();
  
  return details;
};

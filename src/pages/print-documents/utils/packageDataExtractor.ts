
/**
 * Generates package description from invoice data
 */
export const getPackageDescription = (invoice: any) => {
  let description = "PERSONAL EFFECTS AND HOUSEHOLD GOODS";
  
  const packageDetails = invoice.packageDetails || invoice.packageItems || [];
  if (packageDetails && packageDetails.length > 0) {
    const packageNames = packageDetails.map((p: any) => p.name || "1 METER WOODEN BOX").join(", ");
    description = `${packageNames}\nPERSONAL EFFECTS AND HOUSEHOLD GOODS`;
    
    const carPackage = packageDetails.find((p: any) => 
      p.name && (p.name.toLowerCase().includes("car") || p.name.toLowerCase().includes("vehicle")));
    
    if (carPackage) {
      description += "\n\nVEHICLE DETAILS:";
      if (carPackage.description) {
        description += `\n${carPackage.description}`;
      }
    }
  }
  
  return description;
};

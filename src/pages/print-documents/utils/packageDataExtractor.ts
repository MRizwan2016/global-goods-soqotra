
/**
 * Generates package description from invoice data
 */
export const getPackageDescription = (invoice: any) => {
  let description = "SAID TO CONTAIN PERSONAL EFFECTS";
  
  const packageDetails = invoice.packageDetails || invoice.packageItems || [];
  if (packageDetails && packageDetails.length > 0) {
    const packageNames = packageDetails.map((p: any) => p.name || "PACKAGE").join(", ");
    description = `${packageNames}\nSAID TO CONTAIN PERSONAL EFFECTS`;
    
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

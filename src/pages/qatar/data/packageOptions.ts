
// Import package options from the centralized data store
import { packageOptions as centralPackageOptions } from "@/data/packageOptions";

// Extract package descriptions for use in Qatar module
export const packageOptions = centralPackageOptions.map(pkg => pkg.description);

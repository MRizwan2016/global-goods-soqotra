
import { toast } from "sonner";

/**
 * Service to manage selling rates and their interconnection with other modules
 */
export class SellingRatesService {
  /**
   * Saves selling rates and updates related modules
   */
  static saveSellingRates(rateData: any) {
    try {
      // Save to local storage for now (in a real app, this would be an API call)
      localStorage.setItem('sellingRates', JSON.stringify(rateData));
      
      // Update all related modules
      this.updateInvoicingModule(rateData);
      this.updateJobsModule(rateData);
      this.updateManifestModule(rateData);
      this.updateJobStatusModule(rateData);
      this.updatePrintScheduleModule(rateData);
      
      return true;
    } catch (error) {
      console.error("Failed to save selling rates:", error);
      toast.error("Failed to save selling rates");
      return false;
    }
  }
  
  /**
   * Update the invoicing module with new selling rates
   */
  private static updateInvoicingModule(rateData: any) {
    console.log("Updating invoicing module with new rates", rateData);
    
    // Store rates specifically for invoicing
    localStorage.setItem('invoicingRates', JSON.stringify({
      country: rateData.country,
      sector: rateData.sector,
      rates: rateData.districtRates,
      effectiveFrom: rateData.effectiveFrom,
      effectiveUntil: rateData.effectiveUntil
    }));
  }
  
  /**
   * Update the jobs module with new selling rates
   */
  private static updateJobsModule(rateData: any) {
    console.log("Updating jobs module with new rates", rateData);
    
    // Store rates specifically for jobs
    localStorage.setItem('jobsRates', JSON.stringify({
      country: rateData.country,
      sector: rateData.sector,
      rates: rateData.districtRates,
      effectiveFrom: rateData.effectiveFrom,
      effectiveUntil: rateData.effectiveUntil
    }));
  }
  
  /**
   * Update the manifest module with new selling rates
   */
  private static updateManifestModule(rateData: any) {
    console.log("Updating manifest module with new rates", rateData);
    
    // Store rates specifically for manifests
    localStorage.setItem('manifestRates', JSON.stringify({
      country: rateData.country,
      sector: rateData.sector,
      rates: rateData.districtRates,
      effectiveFrom: rateData.effectiveFrom,
      effectiveUntil: rateData.effectiveUntil
    }));
  }
  
  /**
   * Update the job status module with new selling rates
   */
  private static updateJobStatusModule(rateData: any) {
    console.log("Updating job status module with new rates", rateData);
    
    // Store rates specifically for job status
    localStorage.setItem('jobStatusRates', JSON.stringify({
      country: rateData.country,
      sector: rateData.sector,
      rates: rateData.districtRates,
      effectiveFrom: rateData.effectiveFrom,
      effectiveUntil: rateData.effectiveUntil
    }));
  }
  
  /**
   * Update the print schedule module with new selling rates
   */
  private static updatePrintScheduleModule(rateData: any) {
    console.log("Updating print schedule module with new rates", rateData);
    
    // Store rates specifically for print schedules
    localStorage.setItem('printScheduleRates', JSON.stringify({
      country: rateData.country,
      sector: rateData.sector,
      rates: rateData.districtRates,
      effectiveFrom: rateData.effectiveFrom,
      effectiveUntil: rateData.effectiveUntil
    }));
  }
  
  /**
   * Get selling rates for a specific country and district
   */
  static getRatesForPackage(country: string, district: string, packageId: string) {
    try {
      const ratesJson = localStorage.getItem('sellingRates');
      if (!ratesJson) return null;
      
      const rates = JSON.parse(ratesJson);
      if (rates.country !== country) return null;
      
      return rates.districtRates[district]?.[packageId] || null;
    } catch (error) {
      console.error("Error fetching rates:", error);
      return null;
    }
  }
}

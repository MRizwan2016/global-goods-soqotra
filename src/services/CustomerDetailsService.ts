/**
 * Service for storing and retrieving customer details by mobile number
 */

export interface CustomerDetails {
  mobileNumber: string;
  shipperPrefix: string;
  shipperName: string;
  shipperCity: string;
  shipperAddress: string;
  shipperEmail: string;
  shipperIdNumber: string;
  shipperCountry: string;
  consigneePrefix: string;
  consigneeName: string;
  consigneeCity: string;
  consigneeAddress: string;
  consigneeMobile: string;
  consigneeEmail: string;
  consigneeIdNumber: string;
  consigneeCountry: string;
  jobNumber?: string;
  lastUsed: string;
}

export class CustomerDetailsService {
  private static readonly STORAGE_KEY = 'customerDetails';

  /**
   * Store customer details by mobile number
   */
  static storeCustomerDetails(details: CustomerDetails): void {
    try {
      const existingDetails = this.getAllCustomerDetails();
      const existingIndex = existingDetails.findIndex(
        customer => customer.mobileNumber === details.mobileNumber
      );

      const updatedDetails = {
        ...details,
        lastUsed: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        // Update existing customer
        existingDetails[existingIndex] = updatedDetails;
      } else {
        // Add new customer
        existingDetails.push(updatedDetails);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingDetails));
      console.log(`Customer details stored for mobile: ${details.mobileNumber}`);
    } catch (error) {
      console.error('Error storing customer details:', error);
    }
  }

  /**
   * Get customer details by mobile number
   */
  static getCustomerDetailsByMobile(mobileNumber: string): CustomerDetails | null {
    try {
      const allDetails = this.getAllCustomerDetails();
      const customer = allDetails.find(customer => 
        customer.mobileNumber === mobileNumber ||
        customer.mobileNumber === `+974${mobileNumber}` ||
        customer.mobileNumber.replace('+974', '') === mobileNumber
      );
      
      if (customer) {
        console.log(`Found customer details for mobile: ${mobileNumber}`);
        return customer;
      }
      
      console.log(`No customer details found for mobile: ${mobileNumber}`);
      return null;
    } catch (error) {
      console.error('Error retrieving customer details:', error);
      return null;
    }
  }

  /**
   * Get all customer details
   */
  static getAllCustomerDetails(): CustomerDetails[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error parsing customer details:', error);
      return [];
    }
  }

  /**
   * Get unique mobile numbers for dropdown suggestions
   */
  static getMobileNumbers(): string[] {
    try {
      const allDetails = this.getAllCustomerDetails();
      return [...new Set(allDetails.map(customer => customer.mobileNumber))];
    } catch (error) {
      console.error('Error getting mobile numbers:', error);
      return [];
    }
  }

  /**
   * Link job number to customer details
   */
  static linkJobToCustomer(mobileNumber: string, jobNumber: string): void {
    try {
      const customer = this.getCustomerDetailsByMobile(mobileNumber);
      if (customer) {
        customer.jobNumber = jobNumber;
        customer.lastUsed = new Date().toISOString();
        this.storeCustomerDetails(customer);
        console.log(`Linked job ${jobNumber} to customer with mobile ${mobileNumber}`);
      } else {
        console.log(`No customer found to link job ${jobNumber} to mobile ${mobileNumber}`);
      }
    } catch (error) {
      console.error('Error linking job to customer:', error);
    }
  }

  /**
   * Create or update customer details from invoice data
   */
  static createFromInvoiceData(
    mobileNumber: string,
    shipperName: string,
    shipperCity: string,
    jobNumber?: string
  ): void {
    try {
      const customerDetails: CustomerDetails = {
        mobileNumber,
        shipperPrefix: '',
        shipperName,
        shipperCity,
        shipperAddress: '',
        shipperEmail: '',
        shipperIdNumber: '',
        shipperCountry: 'Qatar',
        consigneePrefix: '',
        consigneeName: shipperName, // Default to same as shipper
        consigneeCity: shipperCity,
        consigneeAddress: '',
        consigneeMobile: '',
        consigneeEmail: '',
        consigneeIdNumber: '',
        consigneeCountry: 'Qatar',
        jobNumber,
        lastUsed: new Date().toISOString()
      };
      
      this.storeCustomerDetails(customerDetails);
      console.log(`Created customer details from invoice data for mobile: ${mobileNumber}`);
    } catch (error) {
      console.error('Error creating customer from invoice data:', error);
    }
  }

  /**
   * Search customers by partial mobile number
   */
  static searchCustomersByMobile(partialMobile: string): CustomerDetails[] {
    try {
      const allDetails = this.getAllCustomerDetails();
      return allDetails.filter(customer => 
        customer.mobileNumber.includes(partialMobile)
      ).sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime());
    } catch (error) {
      console.error('Error searching customers:', error);
      return [];
    }
  }

  /**
   * Delete customer details
   */
  static deleteCustomerDetails(mobileNumber: string): boolean {
    try {
      const allDetails = this.getAllCustomerDetails();
      const filteredDetails = allDetails.filter(
        customer => customer.mobileNumber !== mobileNumber
      );
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredDetails));
      console.log(`Deleted customer details for mobile: ${mobileNumber}`);
      return true;
    } catch (error) {
      console.error('Error deleting customer details:', error);
      return false;
    }
  }
}

export default CustomerDetailsService;
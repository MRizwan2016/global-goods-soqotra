
// Constants for job number storage
const JOB_NUMBER_COUNTER_KEY = 'job_number_counter';
const JOB_NUMBERS_USED_KEY = 'job_numbers_used';
const JOB_NUMBER_FORMAT_LENGTH = 5;

/**
 * Service to manage job numbers across the application
 */
export const JobNumberService = {
  /**
   * Generate a new unique job number
   * @returns A 5-digit job number as a string
   */
  generateJobNumber: (): string => {
    try {
      // Get current counter from localStorage or initialize to 10000 (for 5 digits)
      const currentCounter = localStorage.getItem(JOB_NUMBER_COUNTER_KEY);
      let counterValue = currentCounter ? parseInt(currentCounter, 10) + 1 : 10000;
      
      // Reset to 10000 if it exceeds 99999
      if (counterValue > 99999) {
        counterValue = 10000;
      }
      
      // Get list of used job numbers to ensure uniqueness
      const usedJobNumbers = JobNumberService.getUsedJobNumbers();
      
      // Find next available number
      while (usedJobNumbers.includes(counterValue.toString())) {
        counterValue++;
        if (counterValue > 99999) {
          counterValue = 10000;
        }
      }
      
      // Save counter back to localStorage
      localStorage.setItem(JOB_NUMBER_COUNTER_KEY, counterValue.toString());
      
      // Add to used job numbers
      JobNumberService.addUsedJobNumber(counterValue.toString());
      
      return counterValue.toString();
    } catch (error) {
      console.error('Error generating job number:', error);
      // Fallback to a random 5-digit number
      return (10000 + Math.floor(Math.random() * 89999)).toString();
    }
  },
  
  /**
   * Get list of job numbers that have already been used
   * @returns Array of used job numbers
   */
  getUsedJobNumbers: (): string[] => {
    try {
      const usedNumbers = localStorage.getItem(JOB_NUMBERS_USED_KEY);
      return usedNumbers ? JSON.parse(usedNumbers) : [];
    } catch (error) {
      console.error('Error retrieving used job numbers:', error);
      return [];
    }
  },
  
  /**
   * Add a job number to the list of used job numbers
   * @param jobNumber The job number to add
   */
  addUsedJobNumber: (jobNumber: string): void => {
    try {
      const usedNumbers = JobNumberService.getUsedJobNumbers();
      if (!usedNumbers.includes(jobNumber)) {
        usedNumbers.push(jobNumber);
        localStorage.setItem(JOB_NUMBERS_USED_KEY, JSON.stringify(usedNumbers));
      }
    } catch (error) {
      console.error('Error adding used job number:', error);
    }
  },
  
  /**
   * Check if a job number exists
   * @param jobNumber The job number to check
   * @returns True if the job number has been used
   */
  jobNumberExists: (jobNumber: string): boolean => {
    return JobNumberService.getUsedJobNumbers().includes(jobNumber);
  },
  
  /**
   * Format job number to ensure it's 5 digits
   * @param jobNumber The job number to format
   * @returns Formatted job number as a string
   */
  formatJobNumber: (jobNumber: string | number): string => {
    const numStr = typeof jobNumber === 'number' ? jobNumber.toString() : jobNumber;
    return numStr.padStart(JOB_NUMBER_FORMAT_LENGTH, '0');
  }
};

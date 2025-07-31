interface CompletedJob {
  jobNumber: string;
  customerName: string;
  mobileNumber: string;
  completedDate: string;
  invoiceNumber?: string;
  status: 'assigned' | 'completed';
}

export class JobNumberManagementService {
  private static readonly STORAGE_KEY = 'completedJobs';
  private static readonly ACTIVE_JOBS_KEY = 'activeJobs';

  /**
   * Mark a job as completed and move it to completed jobs storage
   */
  static completeJob(jobNumber: string, customerName: string, mobileNumber: string, invoiceNumber?: string): void {
    try {
      const completedJobs = this.getCompletedJobs();
      const activeJobs = this.getActiveJobs();
      
      // Find the job in active jobs
      const jobIndex = activeJobs.findIndex(job => job.jobNumber === jobNumber);
      if (jobIndex !== -1) {
        const completedJob: CompletedJob = {
          jobNumber,
          customerName,
          mobileNumber,
          completedDate: new Date().toISOString(),
          invoiceNumber,
          status: 'completed'
        };
        
        // Add to completed jobs
        completedJobs.push(completedJob);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(completedJobs));
        
        // Remove from active jobs
        activeJobs.splice(jobIndex, 1);
        localStorage.setItem(this.ACTIVE_JOBS_KEY, JSON.stringify(activeJobs));
        
        console.log(`Job ${jobNumber} marked as completed`);
      }
    } catch (error) {
      console.error('Error completing job:', error);
    }
  }

  /**
   * Get all completed jobs
   */
  static getCompletedJobs(): CompletedJob[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (error) {
      console.error('Error loading completed jobs:', error);
      return [];
    }
  }

  /**
   * Get all active (assigned but not completed) jobs
   */
  static getActiveJobs(): any[] {
    try {
      return JSON.parse(localStorage.getItem(this.ACTIVE_JOBS_KEY) || '[]');
    } catch (error) {
      console.error('Error loading active jobs:', error);
      return [];
    }
  }

  /**
   * Add a new active job
   */
  static addActiveJob(jobNumber: string, customerName: string, mobileNumber: string): void {
    try {
      const activeJobs = this.getActiveJobs();
      
      // Check if job already exists
      const existingJob = activeJobs.find(job => job.jobNumber === jobNumber);
      if (!existingJob) {
        const newJob = {
          jobNumber,
          customerName,
          mobileNumber,
          assignedDate: new Date().toISOString(),
          status: 'assigned'
        };
        
        activeJobs.push(newJob);
        localStorage.setItem(this.ACTIVE_JOBS_KEY, JSON.stringify(activeJobs));
        
        console.log(`New active job added: ${jobNumber}`);
      }
    } catch (error) {
      console.error('Error adding active job:', error);
    }
  }

  /**
   * Get jobs by mobile number (both active and completed)
   */
  static getJobsByMobile(mobileNumber: string): { active: any[], completed: CompletedJob[] } {
    try {
      const activeJobs = this.getActiveJobs().filter(job => 
        job.mobileNumber === mobileNumber
      );
      
      const completedJobs = this.getCompletedJobs().filter(job => 
        job.mobileNumber === mobileNumber
      );
      
      return { active: activeJobs, completed: completedJobs };
    } catch (error) {
      console.error('Error getting jobs by mobile:', error);
      return { active: [], completed: [] };
    }
  }

  /**
   * Remove all dummy/test data and keep only real jobs
   */
  static cleanDummyData(): void {
    try {
      const activeJobs = this.getActiveJobs();
      const completedJobs = this.getCompletedJobs();
      
      // Filter out any dummy data (jobs with test patterns)
      const cleanActiveJobs = activeJobs.filter(job => 
        !job.jobNumber.includes('TEST') && 
        !job.jobNumber.includes('DUMMY') &&
        job.customerName && 
        job.mobileNumber
      );
      
      const cleanCompletedJobs = completedJobs.filter(job => 
        !job.jobNumber.includes('TEST') && 
        !job.jobNumber.includes('DUMMY') &&
        job.customerName && 
        job.mobileNumber
      );
      
      localStorage.setItem(this.ACTIVE_JOBS_KEY, JSON.stringify(cleanActiveJobs));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cleanCompletedJobs));
      
      console.log('Dummy data cleaned successfully');
    } catch (error) {
      console.error('Error cleaning dummy data:', error);
    }
  }

  /**
   * Get summary statistics
   */
  static getJobStats(): { totalActive: number, totalCompleted: number, todayCompleted: number } {
    try {
      const activeJobs = this.getActiveJobs();
      const completedJobs = this.getCompletedJobs();
      
      const today = new Date().toDateString();
      const todayCompleted = completedJobs.filter(job => 
        new Date(job.completedDate).toDateString() === today
      ).length;
      
      return {
        totalActive: activeJobs.length,
        totalCompleted: completedJobs.length,
        todayCompleted
      };
    } catch (error) {
      console.error('Error getting job stats:', error);
      return { totalActive: 0, totalCompleted: 0, todayCompleted: 0 };
    }
  }
}
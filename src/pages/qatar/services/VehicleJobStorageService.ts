import { QatarJob } from "../types/jobTypes";

export class VehicleJobStorageService {
  private static STORAGE_KEY = 'vehicle_job_assignments';
  private static VEHICLE_STATS_KEY = 'vehicle_statistics';

  /**
   * Store job assignment to vehicle
   */
  static assignJobToVehicle(jobId: string, vehicleId: string, assignmentDate: string = new Date().toISOString()) {
    try {
      const assignments = this.getAssignments();
      const existingIndex = assignments.findIndex(a => a.jobId === jobId);
      
      const assignment = {
        jobId,
        vehicleId,
        assignmentDate,
        status: 'assigned'
      };

      if (existingIndex >= 0) {
        assignments[existingIndex] = assignment;
      } else {
        assignments.push(assignment);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assignments));
      this.updateVehicleStatistics();
      
      return true;
    } catch (error) {
      console.error('Error assigning job to vehicle:', error);
      return false;
    }
  }

  /**
   * Get all vehicle assignments
   */
  static getAssignments() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (error) {
      console.error('Error getting assignments:', error);
      return [];
    }
  }

  /**
   * Get assignments for specific vehicle
   */
  static getAssignmentsForVehicle(vehicleId: string) {
    return this.getAssignments().filter((assignment: any) => assignment.vehicleId === vehicleId);
  }

  /**
   * Update vehicle statistics after job allocation
   */
  static updateVehicleStatistics() {
    try {
      const assignments = this.getAssignments();
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      
      // Group assignments by vehicle
      const vehicleStats: { [key: string]: any } = {};
      
      assignments.forEach((assignment: any) => {
        const job = jobs.find((j: QatarJob) => j.id === assignment.jobId);
        if (!job) return;

        if (!vehicleStats[assignment.vehicleId]) {
          vehicleStats[assignment.vehicleId] = {
            vehicleId: assignment.vehicleId,
            totalJobs: 0,
            deliveries: 0,
            collections: 0,
            completedJobs: 0,
            pendingJobs: 0,
            totalRevenue: 0
          };
        }

        const stats = vehicleStats[assignment.vehicleId];
        stats.totalJobs++;

        if (job.jobType === 'DELIVERY') {
          stats.deliveries++;
        } else if (job.jobType === 'COLLECTION') {
          stats.collections++;
        }

        if (job.status === 'COMPLETED') {
          stats.completedJobs++;
          // Add revenue if available
          if (job.advanceAmount) {
            stats.totalRevenue += parseFloat(job.advanceAmount.toString());
          }
        } else {
          stats.pendingJobs++;
        }
      });

      localStorage.setItem(this.VEHICLE_STATS_KEY, JSON.stringify(Object.values(vehicleStats)));
      
      return Object.values(vehicleStats);
    } catch (error) {
      console.error('Error updating vehicle statistics:', error);
      return [];
    }
  }

  /**
   * Get vehicle statistics
   */
  static getVehicleStatistics() {
    try {
      const stats = JSON.parse(localStorage.getItem(this.VEHICLE_STATS_KEY) || '[]');
      
      // Calculate totals
      const totals = stats.reduce((acc: any, vehicle: any) => {
        acc.totalJobs += vehicle.totalJobs || 0;
        acc.deliveries += vehicle.deliveries || 0;
        acc.collections += vehicle.collections || 0;
        acc.completedJobs += vehicle.completedJobs || 0;
        acc.pendingJobs += vehicle.pendingJobs || 0;
        acc.totalRevenue += vehicle.totalRevenue || 0;
        return acc;
      }, {
        totalJobs: 0,
        deliveries: 0,
        collections: 0,
        completedJobs: 0,
        pendingJobs: 0,
        totalRevenue: 0
      });

      return { vehicleStats: stats, totals };
    } catch (error) {
      console.error('Error getting vehicle statistics:', error);
      return { vehicleStats: [], totals: {} };
    }
  }

  /**
   * Mark job as completed
   */
  static completeJob(jobId: string) {
    try {
      const assignments = this.getAssignments();
      const assignmentIndex = assignments.findIndex((a: any) => a.jobId === jobId);
      
      if (assignmentIndex >= 0) {
        assignments[assignmentIndex].status = 'completed';
        assignments[assignmentIndex].completedDate = new Date().toISOString();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assignments));
        this.updateVehicleStatistics();
      }
      
      return true;
    } catch (error) {
      console.error('Error completing job:', error);
      return false;
    }
  }

  /**
   * Clear all assignments (for testing)
   */
  static clearAllAssignments() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.VEHICLE_STATS_KEY);
  }
}
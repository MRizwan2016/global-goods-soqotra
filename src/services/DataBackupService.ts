import { toast } from "sonner";

export interface BackupData {
  timestamp: string;
  version: string;
  data: {
    invoices: any[];
    payments: any[];
    jobs: any[];
    users: any[];
    userPasswords: Record<string, string>;
    adminPassword: string;
    vessels: any[];
    containers: any[];
    manifests: any[];
    eritreaInvoices: any[];
    tunisiaInvoices: any[];
    qatarJobs: any[];
    [key: string]: any;
  };
}

class DataBackupService {
  private static readonly BACKUP_VERSION = "1.0.0";
  
  /**
   * Get all localStorage data keys that should be backed up
   */
  private static getBackupKeys(): string[] {
    return [
      'invoices',
      'payments', 
      'jobs',
      'users',
      'vessels',
      'containers',
      'manifests',
      'eritreaInvoices',
      'tunisiaInvoices',
      'qatarJobs',
      'currentUser',
      'resetTokens'
    ];
  }

  /**
   * Export all data to a downloadable JSON file
   */
  static exportAllData(): void {
    try {
      const backupData: BackupData = {
        timestamp: new Date().toISOString(),
        version: this.BACKUP_VERSION,
        data: {} as any
      };

      // Collect all data from localStorage
      this.getBackupKeys().forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            // Try to parse as JSON, fallback to string
            backupData.data[key] = JSON.parse(item);
          } catch {
            backupData.data[key] = item;
          }
        }
      });

      // Create and download the file
      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `data-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(link.href);
      
      toast.success("Data exported successfully! Check your Downloads folder.", {
        duration: 5000
      });
      
    } catch (error) {
      console.error('Export failed:', error);
      toast.error("Failed to export data. Please try again.");
    }
  }

  /**
   * Import data from a backup file
   */
  static async importData(file: File): Promise<boolean> {
    try {
      const text = await file.text();
      const backupData: BackupData = JSON.parse(text);
      
      // Validate backup format
      if (!backupData.timestamp || !backupData.data) {
        throw new Error('Invalid backup file format');
      }

      // Create a restore point first
      this.createRestorePoint();

      // Import the data
      Object.entries(backupData.data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          const dataToStore = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, dataToStore);
        }
      });

      toast.success(`Data imported successfully from ${backupData.timestamp}`, {
        duration: 5000
      });
      
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      toast.error("Failed to import data. Please check the file format.");
      return false;
    }
  }

  /**
   * Create a restore point before importing
   */
  private static createRestorePoint(): void {
    const restoreData: BackupData = {
      timestamp: new Date().toISOString(),
      version: this.BACKUP_VERSION,
      data: {} as any
    };

    this.getBackupKeys().forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          restoreData.data[key] = JSON.parse(item);
        } catch {
          restoreData.data[key] = item;
        }
      }
    });

    localStorage.setItem('__restore_point__', JSON.stringify(restoreData));
  }

  /**
   * Restore from the last restore point
   */
  static restoreFromLastPoint(): boolean {
    try {
      const restorePoint = localStorage.getItem('__restore_point__');
      if (!restorePoint) {
        toast.error("No restore point found");
        return false;
      }

      const backupData: BackupData = JSON.parse(restorePoint);
      
      // Clear current data
      this.getBackupKeys().forEach(key => {
        localStorage.removeItem(key);
      });

      // Restore the data
      Object.entries(backupData.data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          const dataToStore = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, dataToStore);
        }
      });

      toast.success("Data restored from restore point successfully");
      return true;
    } catch (error) {
      console.error('Restore failed:', error);
      toast.error("Failed to restore data");
      return false;
    }
  }

  /**
   * Auto-backup - saves to localStorage with timestamp
   */
  static createAutoBackup(): void {
    try {
      const backupData: BackupData = {
        timestamp: new Date().toISOString(),
        version: this.BACKUP_VERSION,
        data: {} as any
      };

      this.getBackupKeys().forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            backupData.data[key] = JSON.parse(item);
          } catch {
            backupData.data[key] = item;
          }
        }
      });

      // Store in localStorage with timestamp
      const backupKey = `auto_backup_${Date.now()}`;
      localStorage.setItem(backupKey, JSON.stringify(backupData));

      // Keep only last 5 auto-backups
      this.cleanupOldAutoBackups();
      
    } catch (error) {
      console.error('Auto-backup failed:', error);
    }
  }

  /**
   * Clean up old auto-backups, keep only last 5
   */
  private static cleanupOldAutoBackups(): void {
    try {
      const autoBackupKeys = Object.keys(localStorage)
        .filter(key => key.startsWith('auto_backup_'))
        .sort()
        .reverse();

      // Remove old backups beyond the 5 most recent
      autoBackupKeys.slice(5).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }

  /**
   * Get list of auto-backups
   */
  static getAutoBackups(): Array<{ key: string; timestamp: string; size: string }> {
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith('auto_backup_'))
        .map(key => {
          const data = localStorage.getItem(key);
          const backup = data ? JSON.parse(data) : null;
          return {
            key,
            timestamp: backup?.timestamp || 'Unknown',
            size: data ? `${(data.length / 1024).toFixed(1)} KB` : '0 KB'
          };
        })
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    } catch (error) {
      console.error('Failed to get auto-backups:', error);
      return [];
    }
  }

  /**
   * Clear all data (with confirmation)
   */
  static clearAllData(): void {
    if (confirm('This will permanently delete all your data. Are you sure?')) {
      this.createRestorePoint();
      
      this.getBackupKeys().forEach(key => {
        localStorage.removeItem(key);
      });
      
      toast.success("All data cleared. Use 'Restore Last Point' to undo if needed.");
    }
  }
}

export default DataBackupService;

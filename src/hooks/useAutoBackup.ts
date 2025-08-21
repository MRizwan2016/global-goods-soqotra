import { useEffect, useRef } from 'react';
import DataBackupService from '@/services/DataBackupService';

/**
 * Hook to automatically create backups at specified intervals
 * @param intervalMinutes - How often to create backups (in minutes), default 30 minutes
 * @param enabled - Whether auto-backup is enabled, default true
 */
export const useAutoBackup = (intervalMinutes: number = 30, enabled: boolean = true) => {
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Create initial backup on first load
    DataBackupService.createAutoBackup();

    // Set up interval for regular backups
    intervalRef.current = setInterval(() => {
      DataBackupService.createAutoBackup();
    }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMinutes, enabled]);

  // Also create backup on page unload (user closing browser/tab)
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = () => {
      DataBackupService.createAutoBackup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled]);
};
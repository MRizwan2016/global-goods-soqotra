import { supabase } from "@/integrations/supabase/client";
import { syncScheduleBundleToExternal } from "@/lib/externalSync";

export interface Schedule {
  id: string;
  schedule_number: string;
  schedule_date: string;
  vehicle: string;
  sales_rep: string | null;
  driver: string | null;
  helper: string | null;
  country: string;
  total_jobs: number;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface ScheduleJob {
  id: string;
  schedule_id: string;
  job_data: any;
  created_at: string;
}

export class ScheduleService {
  static async saveSchedule(scheduleData: {
    schedule_number: string;
    schedule_date: string;
    vehicle: string;
    sales_rep?: string;
    driver?: string;
    helper?: string;
    country: string;
    jobs: any[];
  }): Promise<{ success: boolean; schedule?: Schedule; error?: string }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      // Insert schedule
      const { data: schedule, error: scheduleError } = await supabase
        .from('schedules')
        .insert({
          schedule_number: scheduleData.schedule_number,
          schedule_date: scheduleData.schedule_date,
          vehicle: scheduleData.vehicle,
          sales_rep: scheduleData.sales_rep || null,
          driver: scheduleData.driver || null,
          helper: scheduleData.helper || null,
          country: scheduleData.country,
          total_jobs: scheduleData.jobs.length,
          created_by: user?.user?.id || null
        })
        .select()
        .single();

      if (scheduleError) {
        console.error('Schedule save error:', scheduleError);
        return { success: false, error: scheduleError.message };
      }

      // Insert schedule jobs
      if (scheduleData.jobs.length > 0) {
        const jobsToInsert = scheduleData.jobs.map(job => ({
          schedule_id: schedule.id,
          job_data: job
        }));

        const { error: jobsError } = await supabase
          .from('schedule_jobs')
          .insert(jobsToInsert);

        if (jobsError) {
          console.error('Schedule jobs save error:', jobsError);
          return { success: false, error: jobsError.message };
        }
      }

      await syncScheduleBundleToExternal(schedule, scheduleData.jobs);

      return { success: true, schedule };
    } catch (error) {
      console.error('Schedule service error:', error);
      return { success: false, error: 'Failed to save schedule' };
    }
  }

  static async getSchedules(filters: {
    country?: string;
    vehicle?: string;
    schedule_number?: string;
    date_from?: string;
    date_to?: string;
  } = {}): Promise<{ success: boolean; schedules?: Schedule[]; error?: string }> {
    try {
      let query = supabase
        .from('schedules')
        .select('*')
        .order('schedule_date', { ascending: false })
        .order('schedule_number', { ascending: false });

      if (filters.country) {
        query = query.eq('country', filters.country);
      }

      if (filters.vehicle && filters.vehicle !== 'ALL VEHICLES') {
        query = query.eq('vehicle', filters.vehicle);
      }

      if (filters.schedule_number) {
        query = query.eq('schedule_number', filters.schedule_number);
      }

      if (filters.date_from) {
        query = query.gte('schedule_date', filters.date_from);
      }

      if (filters.date_to) {
        query = query.lte('schedule_date', filters.date_to);
      }

      const { data: schedules, error } = await query;

      if (error) {
        console.error('Get schedules error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, schedules: schedules || [] };
    } catch (error) {
      console.error('Get schedules service error:', error);
      return { success: false, error: 'Failed to fetch schedules' };
    }
  }

  static async getScheduleWithJobs(scheduleId: string): Promise<{
    success: boolean;
    schedule?: Schedule;
    jobs?: ScheduleJob[];
    error?: string;
  }> {
    try {
      const { data: schedule, error: scheduleError } = await supabase
        .from('schedules')
        .select('*')
        .eq('id', scheduleId)
        .single();

      if (scheduleError) {
        console.error('Get schedule error:', scheduleError);
        return { success: false, error: scheduleError.message };
      }

      const { data: jobs, error: jobsError } = await supabase
        .from('schedule_jobs')
        .select('*')
        .eq('schedule_id', scheduleId)
        .order('created_at', { ascending: true });

      if (jobsError) {
        console.error('Get schedule jobs error:', jobsError);
        return { success: false, error: jobsError.message };
      }

      return { success: true, schedule, jobs: jobs || [] };
    } catch (error) {
      console.error('Get schedule with jobs service error:', error);
      return { success: false, error: 'Failed to fetch schedule details' };
    }
  }

  static async getUniqueVehicles(country?: string): Promise<string[]> {
    try {
      let query = supabase
        .from('schedules')
        .select('vehicle');

      if (country) {
        query = query.eq('country', country);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get unique vehicles error:', error);
        return [];
      }

      const vehicles = [...new Set(data?.map(item => item.vehicle) || [])];
      return vehicles.sort();
    } catch (error) {
      console.error('Get unique vehicles service error:', error);
      return [];
    }
  }

  static async getUniqueScheduleNumbers(country?: string): Promise<string[]> {
    try {
      let query = supabase
        .from('schedules')
        .select('schedule_number');

      if (country) {
        query = query.eq('country', country);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get unique schedule numbers error:', error);
        return [];
      }

      const scheduleNumbers = [...new Set(data?.map(item => item.schedule_number) || [])];
      return scheduleNumbers.sort();
    } catch (error) {
      console.error('Get unique schedule numbers service error:', error);
      return [];
    }
  }
}
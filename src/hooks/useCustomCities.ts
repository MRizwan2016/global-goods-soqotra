import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Manages persistent custom cities (per country) stored in `custom_cities` table.
 * Cities entered manually by staff are saved permanently and reused across all
 * invoices and collection jobs.
 */
export const useCustomCities = (country: string = 'Sri Lanka') => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!country) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('custom_cities')
        .select('name')
        .eq('country', country)
        .order('name', { ascending: true });
      if (error) throw error;
      setCities((data || []).map((d: any) => d.name));
    } catch (err) {
      console.error('useCustomCities load error:', err);
    } finally {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => {
    reload();
  }, [reload]);

  const addCity = useCallback(async (rawName: string) => {
    const name = (rawName || '').trim().toUpperCase();
    if (!name) return false;
    if (cities.includes(name)) return true;
    try {
      const { error } = await supabase
        .from('custom_cities')
        .insert({ name, country });
      if (error && !String(error.message || '').includes('duplicate')) {
        console.error('addCity error:', error);
        return false;
      }
      setCities((prev) => Array.from(new Set([...prev, name])).sort());
      return true;
    } catch (err) {
      console.error('addCity exception:', err);
      return false;
    }
  }, [cities, country]);

  return { cities, loading, addCity, reload };
};

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SalesRepOption {
  value: string;
  label: string;
}

export function useSalesReps(country?: string) {
  const [salesReps, setSalesReps] = useState<SalesRepOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      let query = supabase
        .from('sales_representatives')
        .select('id, name, country, is_active')
        .eq('is_active', true)
        .order('name');

      if (country) {
        query = query.eq('country', country);
      }

      const { data, error } = await query;
      if (!error && data) {
        setSalesReps(data.map(r => ({
          value: r.name,
          label: r.name,
        })));
      }
      setLoading(false);
    };
    load();
  }, [country]);

  return { salesReps, loading };
}

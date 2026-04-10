import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isPast } from "date-fns";

export interface MaintenanceAlert {
  vehicle_number: string;
  next_service_due: string;
  service_type: string;
}

export function useMaintenanceAlerts() {
  const { data: alerts = [] } = useQuery({
    queryKey: ["maintenance-alerts"],
    queryFn: async () => {
      // Get the latest maintenance record per vehicle that has a next_service_due
      const { data, error } = await supabase
        .from("vehicle_maintenance")
        .select("vehicle_number, next_service_due, service_type")
        .not("next_service_due", "is", null)
        .order("service_date", { ascending: false });
      if (error) throw error;

      // Deduplicate: keep only the latest per vehicle
      const latest = new Map<string, MaintenanceAlert>();
      for (const r of data || []) {
        if (!latest.has(r.vehicle_number)) {
          latest.set(r.vehicle_number, r as MaintenanceAlert);
        }
      }

      // Filter to overdue only
      return Array.from(latest.values()).filter(a => isPast(new Date(a.next_service_due)));
    },
    refetchInterval: 5 * 60 * 1000, // every 5 min
  });

  const isVehicleOverdue = (vehicleNumber: string) =>
    alerts.some(a => a.vehicle_number === vehicleNumber);

  return { alerts, isVehicleOverdue };
}

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LoadMetric {
  packages: number;
  volume: number;
  weight: number;
  loadDate: string;
}

interface ContainerRef {
  runningNumber: string;
}

interface VesselRef {
  id: string;
  runningNumber: string;
  containers?: string[];
}

const emptyMetric = (): LoadMetric => ({
  packages: 0,
  volume: 0,
  weight: 0,
  loadDate: "",
});

const mergeLatestDate = (current: string, next?: string | null) => {
  if (!next) return current;
  if (!current) return next;
  return next > current ? next : current;
};

export function useContainerLoadMetrics(
  countryName: string,
  containers: ContainerRef[],
  vessels: VesselRef[] = [],
  refreshKey?: string,
) {
  const [containerMetrics, setContainerMetrics] = useState<Record<string, LoadMetric>>({});

  const runningNumbers = useMemo(
    () => containers.map((container) => container.runningNumber).filter(Boolean),
    [containers],
  );
  const runningNumbersKey = useMemo(() => runningNumbers.join("|"), [runningNumbers]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (runningNumbers.length === 0) {
        setContainerMetrics({});
        return;
      }

      const [packageResponse, invoiceResponse] = await Promise.all([
        supabase
          .from("regional_invoice_packages")
          .select("container_running_number, quantity, cubic_metre, weight, loaded_at")
          .in("container_running_number", runningNumbers)
          .eq("loading_status", "LOADED"),
        supabase
          .from("regional_invoices")
          .select("container_running_number, total_packages, total_volume, total_weight, loaded_at")
          .in("container_running_number", runningNumbers),
      ]);

      if (packageResponse.error) {
        console.error("Error fetching package load metrics:", packageResponse.error);
      }

      if (invoiceResponse.error) {
        console.error("Error fetching invoice load metrics:", invoiceResponse.error);
      }

      const nextMetrics: Record<string, LoadMetric> = {};
      const packageBackedContainers = new Set<string>();

      (invoiceResponse.data || []).forEach((invoice) => {
        const runningNumber = invoice.container_running_number;
        if (!runningNumber) return;

        const current = nextMetrics[runningNumber] || emptyMetric();
        current.packages += Number(invoice.total_packages || 0);
        current.volume += Number(invoice.total_volume || 0);
        current.weight += Number(invoice.total_weight || 0);
        current.loadDate = mergeLatestDate(current.loadDate, invoice.loaded_at);
        nextMetrics[runningNumber] = current;
      });

      (packageResponse.data || []).forEach((pkg) => {
        const runningNumber = pkg.container_running_number;
        if (!runningNumber) return;

        if (!packageBackedContainers.has(runningNumber)) {
          nextMetrics[runningNumber] = emptyMetric();
          packageBackedContainers.add(runningNumber);
        }

        const current = nextMetrics[runningNumber];
        current.packages += Number(pkg.quantity || 1);
        current.volume += Number(pkg.cubic_metre || 0);
        current.weight += Number(pkg.weight || 0);
        current.loadDate = mergeLatestDate(current.loadDate, pkg.loaded_at);
      });

      setContainerMetrics(nextMetrics);
    };

    void fetchMetrics();
  }, [countryName, refreshKey, runningNumbers, runningNumbersKey]);

  const vesselMetrics = useMemo(() => {
    const metrics: Record<string, LoadMetric> = {};

    vessels.forEach((vessel) => {
      const current = emptyMetric();

      (vessel.containers || []).forEach((containerRef) => {
        const containerMetric = containerMetrics[containerRef];
        if (!containerMetric) return;

        current.packages += containerMetric.packages;
        current.volume += containerMetric.volume;
        current.weight += containerMetric.weight;
        current.loadDate = mergeLatestDate(current.loadDate, containerMetric.loadDate);
      });

      metrics[vessel.id] = current;
    });

    return metrics;
  }, [containerMetrics, vessels]);

  return { containerMetrics, vesselMetrics };
}

CREATE TABLE public.vehicle_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_number TEXT NOT NULL,
  driver_name TEXT,
  service_date DATE NOT NULL DEFAULT CURRENT_DATE,
  next_service_due DATE,
  service_type TEXT NOT NULL DEFAULT 'Oil Change',
  description TEXT,
  cost NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.vehicle_maintenance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view vehicle_maintenance"
  ON public.vehicle_maintenance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage vehicle_maintenance"
  ON public.vehicle_maintenance FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_vehicle_maintenance_updated_at
  BEFORE UPDATE ON public.vehicle_maintenance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

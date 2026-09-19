CREATE TABLE public.tunisia_roro_shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sr integer,
  plate text,
  consignee text NOT NULL,
  passport text,
  description text,
  model integer,
  colour text,
  chassis text,
  cbm numeric DEFAULT 0,
  weight numeric DEFAULT 0,
  bl text,
  vessel text,
  loading_status text DEFAULT '',
  swb_issued boolean NOT NULL DEFAULT false,
  released boolean NOT NULL DEFAULT false,
  freight numeric NOT NULL DEFAULT 0,
  storage_charges numeric NOT NULL DEFAULT 0,
  amount_paid numeric NOT NULL DEFAULT 0,
  swb_doc_name text,
  swb_doc_url text,
  swb_doc_uploaded_at timestamptz,
  sector text NOT NULL DEFAULT 'LA GOULETTE',
  notes text,
  last_edited_by text,
  last_edited_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.tunisia_roro_shipments TO authenticated;
GRANT ALL ON public.tunisia_roro_shipments TO service_role;

ALTER TABLE public.tunisia_roro_shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated staff can view roro shipments"
  ON public.tunisia_roro_shipments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can insert roro shipments"
  ON public.tunisia_roro_shipments FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can update roro shipments"
  ON public.tunisia_roro_shipments FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins can delete roro shipments"
  ON public.tunisia_roro_shipments FOR DELETE TO authenticated USING (public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_roro_plate ON public.tunisia_roro_shipments (plate);
CREATE INDEX idx_roro_vessel ON public.tunisia_roro_shipments (vessel);

CREATE TRIGGER update_tunisia_roro_shipments_updated_at
  BEFORE UPDATE ON public.tunisia_roro_shipments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
-- Create warehouse storage tracking table
CREATE TABLE public.warehouse_storage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.regional_invoices(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  country TEXT NOT NULL,
  cargo_type TEXT NOT NULL DEFAULT 'vehicle',
  customer_name TEXT,
  warehouse_received_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_cbm NUMERIC DEFAULT 0,
  daily_rate NUMERIC NOT NULL DEFAULT 100,
  grace_period_days INTEGER NOT NULL DEFAULT 14,
  storage_fee_paid BOOLEAN NOT NULL DEFAULT false,
  storage_invoice_number TEXT,
  paid_amount NUMERIC DEFAULT 0,
  paid_date TEXT,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.warehouse_storage ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admins can manage warehouse_storage"
ON public.warehouse_storage
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Staff can view
CREATE POLICY "Authenticated can view warehouse_storage"
ON public.warehouse_storage
FOR SELECT
TO authenticated
USING (true);

-- Staff can insert
CREATE POLICY "Staff can insert warehouse_storage"
ON public.warehouse_storage
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Staff can update own
CREATE POLICY "Staff can update own warehouse_storage"
ON public.warehouse_storage
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

-- Trigger for updated_at
CREATE TRIGGER update_warehouse_storage_updated_at
BEFORE UPDATE ON public.warehouse_storage
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create regional_invoices table
CREATE TABLE public.regional_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  invoice_number TEXT NOT NULL,
  invoice_date TEXT,
  job_number TEXT,
  book_number TEXT,
  page_number TEXT,
  cargo_type TEXT,
  service_type TEXT,
  freight_by TEXT,
  
  -- Shipper
  shipper_prefix TEXT,
  shipper_name TEXT,
  shipper_country TEXT,
  shipper_city TEXT,
  shipper_address TEXT,
  shipper_mobile TEXT,
  shipper_email TEXT,
  shipper_id_number TEXT,
  
  -- Consignee
  consignee_prefix TEXT,
  consignee_name TEXT,
  consignee_country TEXT,
  consignee_city TEXT,
  consignee_district TEXT,
  consignee_province TEXT,
  consignee_address TEXT,
  consignee_delivery_address TEXT,
  consignee_mobile TEXT,
  consignee_landline TEXT,
  consignee_email TEXT,
  consignee_id_number TEXT,
  
  -- Logistics
  sales_representative TEXT,
  driver_name TEXT,
  whatsapp_number TEXT,
  destination TEXT,
  terminal TEXT,
  warehouse TEXT,
  sector TEXT,
  port TEXT,
  district TEXT,
  door_to_door TEXT DEFAULT 'NO',
  
  -- Package totals
  total_packages INTEGER DEFAULT 0,
  total_weight NUMERIC DEFAULT 0,
  total_volume NUMERIC DEFAULT 0,
  description TEXT,
  
  -- Pricing
  rate NUMERIC DEFAULT 0,
  freight NUMERIC DEFAULT 0,
  documents_fee NUMERIC DEFAULT 0,
  local_transport NUMERIC DEFAULT 0,
  destination_transport NUMERIC DEFAULT 0,
  packing_charges NUMERIC DEFAULT 0,
  storage NUMERIC DEFAULT 0,
  destination_clearing NUMERIC DEFAULT 0,
  destination_door_delivery NUMERIC DEFAULT 0,
  transportation_fee NUMERIC DEFAULT 0,
  other NUMERIC DEFAULT 0,
  gross NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  net NUMERIC DEFAULT 0,
  
  -- Payment
  payment_method TEXT,
  payment_status TEXT DEFAULT 'UNPAID',
  payment_date TEXT,
  banking_date TEXT,
  receipt_number TEXT,
  
  -- Status & meta
  status TEXT DEFAULT 'DRAFT',
  remarks TEXT,
  gift_cargo TEXT DEFAULT 'NO',
  pre_paid TEXT DEFAULT 'NO',
  extra_data JSONB DEFAULT '{}'::jsonb,
  
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create regional_invoice_packages table
CREATE TABLE public.regional_invoice_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.regional_invoices(id) ON DELETE CASCADE,
  package_name TEXT,
  length NUMERIC DEFAULT 0,
  width NUMERIC DEFAULT 0,
  height NUMERIC DEFAULT 0,
  weight NUMERIC DEFAULT 0,
  quantity INTEGER DEFAULT 1,
  cubic_metre NUMERIC DEFAULT 0,
  cubic_feet NUMERIC DEFAULT 0,
  volume_weight NUMERIC DEFAULT 0,
  box_number INTEGER DEFAULT 0,
  price NUMERIC DEFAULT 0,
  volume TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.regional_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_invoice_packages ENABLE ROW LEVEL SECURITY;

-- RLS policies for regional_invoices
CREATE POLICY "Authenticated can view regional_invoices"
ON public.regional_invoices FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage regional_invoices"
ON public.regional_invoices FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Staff can insert regional_invoices"
ON public.regional_invoices FOR INSERT TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Staff can update own regional_invoices"
ON public.regional_invoices FOR UPDATE TO authenticated
USING (auth.uid() = created_by);

-- RLS policies for regional_invoice_packages
CREATE POLICY "Authenticated can view regional_invoice_packages"
ON public.regional_invoice_packages FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage regional_invoice_packages"
ON public.regional_invoice_packages FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Staff can insert regional_invoice_packages"
ON public.regional_invoice_packages FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.regional_invoices ri
  WHERE ri.id = invoice_id AND ri.created_by = auth.uid()
));

CREATE POLICY "Staff can update own regional_invoice_packages"
ON public.regional_invoice_packages FOR UPDATE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.regional_invoices ri
  WHERE ri.id = invoice_id AND ri.created_by = auth.uid()
));

CREATE POLICY "Staff can delete own regional_invoice_packages"
ON public.regional_invoice_packages FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.regional_invoices ri
  WHERE ri.id = invoice_id AND ri.created_by = auth.uid()
));

-- Indexes
CREATE INDEX idx_regional_invoices_country ON public.regional_invoices(country);
CREATE INDEX idx_regional_invoices_invoice_number ON public.regional_invoices(invoice_number);
CREATE INDEX idx_regional_invoice_packages_invoice_id ON public.regional_invoice_packages(invoice_id);

-- Timestamp trigger
CREATE TRIGGER update_regional_invoices_updated_at
BEFORE UPDATE ON public.regional_invoices
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

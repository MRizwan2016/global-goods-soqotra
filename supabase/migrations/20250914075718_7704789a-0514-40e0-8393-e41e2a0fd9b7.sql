-- Create effects_items table
CREATE TABLE public.effects_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL,
  item_category VARCHAR(80),
  description VARCHAR(200) NOT NULL,
  owner_name VARCHAR(120),
  loading_location TEXT CHECK (loading_location IN ('Inside Car', 'Outside Car')) DEFAULT 'Outside Car',
  qty INTEGER NOT NULL DEFAULT 1,
  cbm DECIMAL(10,4) DEFAULT 0.0000,
  gross_weight_kg DECIMAL(10,3) DEFAULT 0.000,
  hs_code VARCHAR(20) DEFAULT '980100',
  charge_qr DECIMAL(10,2) DEFAULT 0.00,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create files table
CREATE TABLE public.files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  related_type TEXT CHECK (related_type IN ('invoice', 'shipment')) NOT NULL,
  related_id UUID NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100),
  size_bytes INTEGER,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table (extended version of existing)
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  invoice_date DATE NOT NULL,
  invoice_code VARCHAR(50),
  invoice_no INTEGER NOT NULL,
  book_no INTEGER,
  page_no INTEGER,
  hbl_no VARCHAR(50),
  invoice_type TEXT CHECK (invoice_type IN ('vehicle_effects', 'effects_only', 'vehicle_only')) NOT NULL DEFAULT 'vehicle_effects',
  shipper_name VARCHAR(120) NOT NULL,
  shipper_phone VARCHAR(40),
  shipper_metrash_phone VARCHAR(40),
  shipper_email VARCHAR(191),
  shipper_idno VARCHAR(50),
  shipper_address TEXT,
  shipper_city VARCHAR(80),
  shipper_country VARCHAR(80),
  consignee_name VARCHAR(120) NOT NULL,
  consignee_phone VARCHAR(40),
  consignee_idno VARCHAR(50),
  consignee_address TEXT,
  consignee_city VARCHAR(80),
  consignee_country VARCHAR(80),
  service_type VARCHAR(30) DEFAULT 'Sea',
  num_packages INTEGER DEFAULT 0,
  total_cbm DECIMAL(10,4) DEFAULT 0.0000,
  total_gross_weight_kg DECIMAL(10,3) DEFAULT 0.000,
  vehicle_freight_qr DECIMAL(10,2) DEFAULT 0.00,
  effects_rate_qr_per_cbm DECIMAL(10,2) DEFAULT 0.00,
  effects_total_qr DECIMAL(10,2) DEFAULT 0.00,
  cargo_charges DECIMAL(10,2) DEFAULT 0.00,
  packing_fees DECIMAL(10,2) DEFAULT 0.00,
  doc_fee DECIMAL(10,2) DEFAULT 0.00,
  discounts DECIMAL(10,2) DEFAULT 0.00,
  total_amount DECIMAL(10,2) DEFAULT 0.00,
  status INTEGER NOT NULL DEFAULT 1,
  user_id TEXT NOT NULL
);

-- Create invoice_items table
CREATE TABLE public.invoice_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL,
  description VARCHAR(200),
  qty INTEGER NOT NULL DEFAULT 1,
  length_in DECIMAL(10,2),
  width_in DECIMAL(10,2),
  height_in DECIMAL(10,2),
  cbm DECIMAL(10,4) DEFAULT 0.0000,
  gross_weight_kg DECIMAL(10,3) DEFAULT 0.000,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoice_vehicle table
CREATE TABLE public.invoice_vehicle (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL,
  vehicle_type VARCHAR(40),
  make VARCHAR(60),
  model VARCHAR(60),
  year SMALLINT,
  color VARCHAR(40),
  made_in_country VARCHAR(80),
  chassis_no VARCHAR(60),
  plate_no VARCHAR(40),
  engine_no VARCHAR(60),
  hs_code VARCHAR(20),
  export_plate VARCHAR(40),
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID NOT NULL,
  invoice_id UUID,
  package_no VARCHAR(50),
  description VARCHAR(200),
  qty INTEGER DEFAULT 1,
  length_in DECIMAL(10,2),
  width_in DECIMAL(10,2),
  height_in DECIMAL(10,2),
  weight_kg DECIMAL(10,3),
  cbm DECIMAL(10,4) DEFAULT 0.0000,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shipments table
CREATE TABLE public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  invoice_id UUID,
  shipment_no VARCHAR(50),
  origin_country VARCHAR(80),
  destination_country VARCHAR(80),
  mode VARCHAR(20) DEFAULT 'Sea',
  container_no VARCHAR(30),
  tracking_no VARCHAR(50),
  loaded_date DATE,
  eta_date DATE,
  status VARCHAR(30) DEFAULT 'Pending',
  user_id TEXT NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.effects_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_vehicle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for effects_items
CREATE POLICY "Users can view their own effects items"
  ON public.effects_items FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own effects items"
  ON public.effects_items FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own effects items"
  ON public.effects_items FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own effects items"
  ON public.effects_items FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create RLS policies for files
CREATE POLICY "Users can view their own files"
  ON public.files FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own files"
  ON public.files FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own files"
  ON public.files FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own files"
  ON public.files FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create RLS policies for invoices
CREATE POLICY "Users can view their own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own invoices"
  ON public.invoices FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own invoices"
  ON public.invoices FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own invoices"
  ON public.invoices FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create RLS policies for invoice_items
CREATE POLICY "Users can view their own invoice items"
  ON public.invoice_items FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own invoice items"
  ON public.invoice_items FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own invoice items"
  ON public.invoice_items FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own invoice items"
  ON public.invoice_items FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create RLS policies for invoice_vehicle
CREATE POLICY "Users can view their own invoice vehicles"
  ON public.invoice_vehicle FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own invoice vehicles"
  ON public.invoice_vehicle FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own invoice vehicles"
  ON public.invoice_vehicle FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own invoice vehicles"
  ON public.invoice_vehicle FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create RLS policies for packages
CREATE POLICY "Users can view their own packages"
  ON public.packages FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own packages"
  ON public.packages FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own packages"
  ON public.packages FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own packages"
  ON public.packages FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create RLS policies for shipments
CREATE POLICY "Users can view their own shipments"
  ON public.shipments FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own shipments"
  ON public.shipments FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own shipments"
  ON public.shipments FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own shipments"
  ON public.shipments FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_effects_items_updated_at
  BEFORE UPDATE ON public.effects_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoice_items_updated_at
  BEFORE UPDATE ON public.invoice_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoice_vehicle_updated_at
  BEFORE UPDATE ON public.invoice_vehicle
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create foreign key constraints (using UUIDs)
ALTER TABLE public.effects_items
  ADD CONSTRAINT effects_items_invoice_id_fkey
  FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE;

ALTER TABLE public.invoice_items
  ADD CONSTRAINT invoice_items_invoice_id_fkey
  FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE;

ALTER TABLE public.invoice_vehicle
  ADD CONSTRAINT invoice_vehicle_invoice_id_fkey
  FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE;

ALTER TABLE public.packages
  ADD CONSTRAINT packages_shipment_id_fkey
  FOREIGN KEY (shipment_id) REFERENCES public.shipments(id) ON DELETE CASCADE;

ALTER TABLE public.packages
  ADD CONSTRAINT packages_invoice_id_fkey
  FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE SET NULL;

ALTER TABLE public.shipments
  ADD CONSTRAINT shipments_invoice_id_fkey
  FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE SET NULL;
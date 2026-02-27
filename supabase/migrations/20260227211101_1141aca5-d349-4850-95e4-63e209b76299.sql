
-- =====================================================
-- INVOICES TABLE (referenced by collection_performance)
-- =====================================================
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_no TEXT,
  book_no TEXT,
  page_no TEXT,
  invoice_code TEXT,
  total_amount NUMERIC DEFAULT 0,
  total_cbm NUMERIC DEFAULT 0,
  total_gross_weight_kg NUMERIC DEFAULT 0,
  num_packages INTEGER DEFAULT 0,
  shipper_name TEXT,
  consignee_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view invoices" ON public.invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage invoices" ON public.invoices FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- COLLECTION PERFORMANCE TABLE
-- =====================================================
CREATE TABLE public.collection_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id TEXT,
  staff_name TEXT NOT NULL,
  staff_type TEXT NOT NULL DEFAULT 'driver',
  job_id TEXT,
  job_type TEXT DEFAULT 'collection',
  job_status TEXT DEFAULT 'completed',
  location TEXT,
  city TEXT,
  collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
  invoice_id UUID REFERENCES public.invoices(id),
  total_packages INTEGER DEFAULT 0,
  total_cbm NUMERIC DEFAULT 0,
  total_weight_kg NUMERIC DEFAULT 0,
  total_revenue_qr NUMERIC DEFAULT 0,
  on_time BOOLEAN DEFAULT true,
  satisfaction_rating NUMERIC DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.collection_performance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view collection_performance" ON public.collection_performance FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage collection_performance" ON public.collection_performance FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- STAFF DAILY PERFORMANCE VIEW
-- =====================================================
CREATE VIEW public.staff_daily_performance AS
SELECT
  collection_date,
  staff_name,
  staff_type,
  staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY collection_date, staff_name, staff_type, staff_id
ORDER BY collection_date DESC;

-- =====================================================
-- STAFF WEEKLY PERFORMANCE VIEW
-- =====================================================
CREATE VIEW public.staff_weekly_performance AS
SELECT
  date_trunc('week', collection_date)::DATE AS week_start,
  staff_name,
  staff_type,
  staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY week_start, staff_name, staff_type, staff_id
ORDER BY week_start DESC;

-- =====================================================
-- STAFF MONTHLY PERFORMANCE VIEW
-- =====================================================
CREATE VIEW public.staff_monthly_performance AS
SELECT
  date_trunc('month', collection_date)::DATE AS month_start,
  EXTRACT(YEAR FROM collection_date) AS year,
  EXTRACT(MONTH FROM collection_date) AS month,
  staff_name,
  staff_type,
  staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY month_start, year, month, staff_name, staff_type, staff_id
ORDER BY year DESC, month DESC;

-- =====================================================
-- STAFF ANNUAL PERFORMANCE VIEW
-- =====================================================
CREATE VIEW public.staff_annual_performance AS
SELECT
  EXTRACT(YEAR FROM collection_date) AS year,
  staff_name,
  staff_type,
  staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY year, staff_name, staff_type, staff_id
ORDER BY year DESC;

-- =====================================================
-- TUNISIA TABLES
-- =====================================================

-- Tunisia Invoices
CREATE TABLE public.tunisia_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invoice_number TEXT NOT NULL,
  customer_id TEXT,
  vehicle JSONB,
  personal_effects JSONB,
  total_amount NUMERIC DEFAULT 0,
  date TEXT,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'CONFIRMED', 'LOADED')),
  payment_details JSONB,
  supporting_documents JSONB,
  hbl_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tunisia_invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tunisia invoices" ON public.tunisia_invoices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tunisia invoices" ON public.tunisia_invoices FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tunisia invoices" ON public.tunisia_invoices FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tunisia invoices" ON public.tunisia_invoices FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_tunisia_invoices_updated_at
  BEFORE UPDATE ON public.tunisia_invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Tunisia Containers
CREATE TABLE public.tunisia_containers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  container_number TEXT NOT NULL,
  seal_number TEXT,
  status TEXT DEFAULT 'EMPTY',
  loaded_vehicles JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tunisia_containers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tunisia containers" ON public.tunisia_containers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tunisia containers" ON public.tunisia_containers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tunisia containers" ON public.tunisia_containers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tunisia containers" ON public.tunisia_containers FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_tunisia_containers_updated_at
  BEFORE UPDATE ON public.tunisia_containers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Tunisia Payment Receipts
CREATE TABLE public.tunisia_payment_receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receipt_number TEXT NOT NULL,
  invoice_id TEXT NOT NULL,
  invoice_number TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'cash',
  payment_date TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tunisia_payment_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tunisia receipts" ON public.tunisia_payment_receipts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tunisia receipts" ON public.tunisia_payment_receipts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tunisia receipts" ON public.tunisia_payment_receipts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tunisia receipts" ON public.tunisia_payment_receipts FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_tunisia_receipts_updated_at
  BEFORE UPDATE ON public.tunisia_payment_receipts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

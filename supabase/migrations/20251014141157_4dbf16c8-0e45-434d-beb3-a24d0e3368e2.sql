-- Create staff performance tracking system for cargo collection

-- 1. Create a table to store staff information (if not using profiles directly)
CREATE TABLE IF NOT EXISTS public.staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  staff_name TEXT NOT NULL,
  staff_type TEXT NOT NULL CHECK (staff_type IN ('driver', 'helper', 'sales_rep')),
  employee_id TEXT UNIQUE,
  hire_date DATE,
  department TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(profile_id, staff_type)
);

-- 2. Create collection performance table to track individual collection activities
CREATE TABLE IF NOT EXISTS public.collection_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES public.staff_members(id) ON DELETE CASCADE,
  staff_name TEXT NOT NULL,
  staff_type TEXT NOT NULL,
  collection_date DATE NOT NULL,
  schedule_id UUID REFERENCES public.schedules(id) ON DELETE SET NULL,
  job_id UUID,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  
  -- Collection metrics
  job_count INTEGER DEFAULT 1,
  total_cbm NUMERIC(10,4) DEFAULT 0,
  total_weight_kg NUMERIC(10,3) DEFAULT 0,
  total_packages INTEGER DEFAULT 0,
  total_revenue_qr NUMERIC(12,2) DEFAULT 0,
  
  -- Performance indicators
  job_type TEXT CHECK (job_type IN ('COLLECTION', 'DELIVERY')),
  job_status TEXT CHECK (job_status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  completed_on_time BOOLEAN DEFAULT true,
  customer_satisfaction_rating INTEGER CHECK (customer_satisfaction_rating BETWEEN 1 AND 5),
  
  -- Additional context
  location TEXT,
  city TEXT,
  notes TEXT,
  
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_collection_perf_staff ON public.collection_performance(staff_id);
CREATE INDEX IF NOT EXISTS idx_collection_perf_date ON public.collection_performance(collection_date);
CREATE INDEX IF NOT EXISTS idx_collection_perf_staff_date ON public.collection_performance(staff_id, collection_date);
CREATE INDEX IF NOT EXISTS idx_staff_members_name ON public.staff_members(staff_name);
CREATE INDEX IF NOT EXISTS idx_staff_members_type ON public.staff_members(staff_type);

-- 4. Create view for daily performance summary
CREATE OR REPLACE VIEW public.staff_daily_performance AS
SELECT 
  staff_id,
  staff_name,
  staff_type,
  collection_date,
  COUNT(*) as total_jobs,
  COUNT(CASE WHEN job_type = 'COLLECTION' THEN 1 END) as collection_jobs,
  COUNT(CASE WHEN job_type = 'DELIVERY' THEN 1 END) as delivery_jobs,
  COUNT(CASE WHEN job_status = 'COMPLETED' THEN 1 END) as completed_jobs,
  SUM(total_cbm) as total_volume_cbm,
  SUM(total_weight_kg) as total_weight_kg,
  SUM(total_packages) as total_packages,
  SUM(total_revenue_qr) as total_revenue_qr,
  AVG(CASE WHEN customer_satisfaction_rating IS NOT NULL THEN customer_satisfaction_rating END) as avg_satisfaction,
  COUNT(CASE WHEN completed_on_time = true THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100 as on_time_completion_rate
FROM public.collection_performance
GROUP BY staff_id, staff_name, staff_type, collection_date;

-- 5. Create view for weekly performance summary
CREATE OR REPLACE VIEW public.staff_weekly_performance AS
SELECT 
  staff_id,
  staff_name,
  staff_type,
  DATE_TRUNC('week', collection_date)::DATE as week_start,
  COUNT(*) as total_jobs,
  COUNT(CASE WHEN job_type = 'COLLECTION' THEN 1 END) as collection_jobs,
  COUNT(CASE WHEN job_type = 'DELIVERY' THEN 1 END) as delivery_jobs,
  COUNT(CASE WHEN job_status = 'COMPLETED' THEN 1 END) as completed_jobs,
  SUM(total_cbm) as total_volume_cbm,
  SUM(total_weight_kg) as total_weight_kg,
  SUM(total_packages) as total_packages,
  SUM(total_revenue_qr) as total_revenue_qr,
  AVG(CASE WHEN customer_satisfaction_rating IS NOT NULL THEN customer_satisfaction_rating END) as avg_satisfaction,
  COUNT(CASE WHEN completed_on_time = true THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100 as on_time_completion_rate
FROM public.collection_performance
GROUP BY staff_id, staff_name, staff_type, DATE_TRUNC('week', collection_date);

-- 6. Create view for monthly performance summary
CREATE OR REPLACE VIEW public.staff_monthly_performance AS
SELECT 
  staff_id,
  staff_name,
  staff_type,
  DATE_TRUNC('month', collection_date)::DATE as month_start,
  EXTRACT(YEAR FROM collection_date) as year,
  EXTRACT(MONTH FROM collection_date) as month,
  COUNT(*) as total_jobs,
  COUNT(CASE WHEN job_type = 'COLLECTION' THEN 1 END) as collection_jobs,
  COUNT(CASE WHEN job_type = 'DELIVERY' THEN 1 END) as delivery_jobs,
  COUNT(CASE WHEN job_status = 'COMPLETED' THEN 1 END) as completed_jobs,
  SUM(total_cbm) as total_volume_cbm,
  SUM(total_weight_kg) as total_weight_kg,
  SUM(total_packages) as total_packages,
  SUM(total_revenue_qr) as total_revenue_qr,
  AVG(CASE WHEN customer_satisfaction_rating IS NOT NULL THEN customer_satisfaction_rating END) as avg_satisfaction,
  COUNT(CASE WHEN completed_on_time = true THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100 as on_time_completion_rate
FROM public.collection_performance
GROUP BY staff_id, staff_name, staff_type, DATE_TRUNC('month', collection_date), EXTRACT(YEAR FROM collection_date), EXTRACT(MONTH FROM collection_date);

-- 7. Create view for annual performance summary
CREATE OR REPLACE VIEW public.staff_annual_performance AS
SELECT 
  staff_id,
  staff_name,
  staff_type,
  EXTRACT(YEAR FROM collection_date) as year,
  COUNT(*) as total_jobs,
  COUNT(CASE WHEN job_type = 'COLLECTION' THEN 1 END) as collection_jobs,
  COUNT(CASE WHEN job_type = 'DELIVERY' THEN 1 END) as delivery_jobs,
  COUNT(CASE WHEN job_status = 'COMPLETED' THEN 1 END) as completed_jobs,
  SUM(total_cbm) as total_volume_cbm,
  SUM(total_weight_kg) as total_weight_kg,
  SUM(total_packages) as total_packages,
  SUM(total_revenue_qr) as total_revenue_qr,
  AVG(CASE WHEN customer_satisfaction_rating IS NOT NULL THEN customer_satisfaction_rating END) as avg_satisfaction,
  COUNT(CASE WHEN completed_on_time = true THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100 as on_time_completion_rate
FROM public.collection_performance
GROUP BY staff_id, staff_name, staff_type, EXTRACT(YEAR FROM collection_date);

-- 8. Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_staff_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_staff_members_updated_at
  BEFORE UPDATE ON public.staff_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_staff_updated_at();

CREATE TRIGGER update_collection_performance_updated_at
  BEFORE UPDATE ON public.collection_performance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_staff_updated_at();

-- 9. Enable RLS
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_performance ENABLE ROW LEVEL SECURITY;

-- 10. Create RLS policies for staff_members
CREATE POLICY "Users can view their own staff members"
  ON public.staff_members FOR SELECT
  USING (
    profile_id = auth.uid() OR 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can insert staff members"
  ON public.staff_members FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update staff members"
  ON public.staff_members FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete staff members"
  ON public.staff_members FOR DELETE
  USING (public.is_admin(auth.uid()));

-- 11. Create RLS policies for collection_performance
CREATE POLICY "Users can view their own performance"
  ON public.collection_performance FOR SELECT
  USING (
    (auth.uid())::text = user_id OR 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Users can create their own performance records"
  ON public.collection_performance FOR INSERT
  WITH CHECK ((auth.uid())::text = user_id);

CREATE POLICY "Users can update their own performance records"
  ON public.collection_performance FOR UPDATE
  USING ((auth.uid())::text = user_id)
  WITH CHECK ((auth.uid())::text = user_id);

CREATE POLICY "Admins can delete performance records"
  ON public.collection_performance FOR DELETE
  USING (public.is_admin(auth.uid()));
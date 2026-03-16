
-- Schedules table
CREATE TABLE public.schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_number TEXT NOT NULL,
  schedule_date TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  sales_rep TEXT,
  driver TEXT,
  helper TEXT,
  country TEXT NOT NULL DEFAULT 'Qatar',
  total_jobs INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view schedules" ON public.schedules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert schedules" ON public.schedules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update schedules" ON public.schedules FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete schedules" ON public.schedules FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_schedules_updated_at
  BEFORE UPDATE ON public.schedules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Schedule Jobs table
CREATE TABLE public.schedule_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id UUID REFERENCES public.schedules(id) ON DELETE CASCADE NOT NULL,
  job_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.schedule_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view schedule_jobs" ON public.schedule_jobs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert schedule_jobs" ON public.schedule_jobs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update schedule_jobs" ON public.schedule_jobs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete schedule_jobs" ON public.schedule_jobs FOR DELETE TO authenticated USING (true);

NOTIFY pgrst, 'reload schema';

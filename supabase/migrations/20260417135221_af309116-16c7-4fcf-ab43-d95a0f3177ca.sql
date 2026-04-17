CREATE TABLE IF NOT EXISTS public.custom_cities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Sri Lanka',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, country)
);

ALTER TABLE public.custom_cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view custom_cities"
  ON public.custom_cities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert custom_cities"
  ON public.custom_cities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage custom_cities"
  ON public.custom_cities FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
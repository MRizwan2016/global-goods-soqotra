-- Create schedules table to store job schedules
CREATE TABLE public.schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_number VARCHAR(50) NOT NULL UNIQUE,
  schedule_date DATE NOT NULL,
  vehicle VARCHAR(100) NOT NULL,
  sales_rep VARCHAR(255),
  driver VARCHAR(255),
  helper VARCHAR(255),
  country VARCHAR(50) NOT NULL,
  total_jobs INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create schedule_jobs junction table to link schedules with jobs
CREATE TABLE public.schedule_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id UUID NOT NULL REFERENCES public.schedules(id) ON DELETE CASCADE,
  job_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for schedules
CREATE POLICY "Users can view all schedules" 
ON public.schedules 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create schedules" 
ON public.schedules 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own schedules" 
ON public.schedules 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Create policies for schedule_jobs
CREATE POLICY "Users can view all schedule jobs" 
ON public.schedule_jobs 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create schedule jobs" 
ON public.schedule_jobs 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_schedules_updated_at
BEFORE UPDATE ON public.schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_schedules_country ON public.schedules(country);
CREATE INDEX idx_schedules_date ON public.schedules(schedule_date);
CREATE INDEX idx_schedules_number ON public.schedules(schedule_number);
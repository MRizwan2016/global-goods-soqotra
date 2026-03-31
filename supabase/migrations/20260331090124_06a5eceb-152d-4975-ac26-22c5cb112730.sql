ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mobile_number text DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country text DEFAULT '';
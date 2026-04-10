
-- Add new columns to sales_representatives
ALTER TABLE public.sales_representatives
ADD COLUMN IF NOT EXISTS title text DEFAULT 'Mr.',
ADD COLUMN IF NOT EXISTS employee_number text UNIQUE,
ADD COLUMN IF NOT EXISTS operation text DEFAULT 'UPB - SYSTEM';

-- Create function to auto-generate employee number
CREATE OR REPLACE FUNCTION public.generate_employee_number()
RETURNS TRIGGER AS $$
DECLARE
  max_num integer;
  new_emp_number text;
BEGIN
  -- Get the highest existing employee number
  SELECT COALESCE(MAX(
    CASE WHEN employee_number ~ '^EMP-\d+$'
    THEN CAST(SUBSTRING(employee_number FROM 5) AS integer)
    ELSE 0 END
  ), 0) INTO max_num
  FROM public.sales_representatives;

  new_emp_number := 'EMP-' || LPAD((max_num + 1)::text, 3, '0');
  NEW.employee_number := new_emp_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate employee number on insert
CREATE TRIGGER trg_generate_employee_number
BEFORE INSERT ON public.sales_representatives
FOR EACH ROW
WHEN (NEW.employee_number IS NULL)
EXECUTE FUNCTION public.generate_employee_number();

-- Add staff insert policy so staff can add sales reps
CREATE POLICY "Staff can insert sales_representatives"
ON public.sales_representatives
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Add staff update policy
CREATE POLICY "Staff can update sales_representatives"
ON public.sales_representatives
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

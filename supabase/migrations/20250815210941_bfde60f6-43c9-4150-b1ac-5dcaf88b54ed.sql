-- Fix the search_path security issue by explicitly setting the search path for our function
CREATE OR REPLACE FUNCTION public.user_owns_schedule(schedule_uuid uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.schedules 
    WHERE id = schedule_uuid AND created_by = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;
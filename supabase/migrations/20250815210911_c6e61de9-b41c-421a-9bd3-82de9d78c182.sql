-- Create security definer function to check if user owns the schedule
CREATE OR REPLACE FUNCTION public.user_owns_schedule(schedule_uuid uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.schedules 
    WHERE id = schedule_uuid AND created_by = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all schedule jobs" ON public.schedule_jobs;
DROP POLICY IF EXISTS "Users can create schedule jobs" ON public.schedule_jobs;

-- Create secure SELECT policy - users can only view jobs for schedules they own
CREATE POLICY "Users can view their own schedule jobs" 
ON public.schedule_jobs 
FOR SELECT 
USING (public.user_owns_schedule(schedule_id));

-- Create secure INSERT policy - users can only create jobs for schedules they own
CREATE POLICY "Users can create jobs for their own schedules" 
ON public.schedule_jobs 
FOR INSERT 
WITH CHECK (public.user_owns_schedule(schedule_id));

-- Create UPDATE policy - users can only update jobs for schedules they own
CREATE POLICY "Users can update jobs for their own schedules" 
ON public.schedule_jobs 
FOR UPDATE 
USING (public.user_owns_schedule(schedule_id))
WITH CHECK (public.user_owns_schedule(schedule_id));

-- Create DELETE policy - users can only delete jobs for schedules they own
CREATE POLICY "Users can delete jobs for their own schedules" 
ON public.schedule_jobs 
FOR DELETE 
USING (public.user_owns_schedule(schedule_id));
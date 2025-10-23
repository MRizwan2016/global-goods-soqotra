-- Fix security vulnerability: Restrict schedule viewing to only user's own schedules
DROP POLICY IF EXISTS "Users can view all schedules" ON public.schedules;

-- Create new policy that only allows users to view their own schedules
CREATE POLICY "Users can view their own schedules" 
ON public.schedules 
FOR SELECT 
USING (auth.uid() = created_by);
-- Fix critical security vulnerability in tunisia_containers table
-- Remove the dangerous "Allow all operations" policy that exposes shipping data publicly
DROP POLICY IF EXISTS "Allow all operations on tunisia_containers" ON public.tunisia_containers;

-- Create secure RLS policies that restrict access to authenticated users' own data
CREATE POLICY "Users can view their own containers" 
ON public.tunisia_containers 
FOR SELECT 
TO authenticated
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own containers" 
ON public.tunisia_containers 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own containers" 
ON public.tunisia_containers 
FOR UPDATE 
TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own containers" 
ON public.tunisia_containers 
FOR DELETE 
TO authenticated
USING (auth.uid()::text = user_id);
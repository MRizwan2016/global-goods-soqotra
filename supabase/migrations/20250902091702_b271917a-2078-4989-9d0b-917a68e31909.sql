-- Fix critical security vulnerability in tunisia_customers table
-- Remove the dangerous "Allow all operations" policy that exposes customer data publicly
DROP POLICY IF EXISTS "Allow all operations on tunisia_customers" ON public.tunisia_customers;

-- Create secure RLS policies that restrict access to authenticated users' own data
CREATE POLICY "Users can view their own customers" 
ON public.tunisia_customers 
FOR SELECT 
TO authenticated
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own customers" 
ON public.tunisia_customers 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own customers" 
ON public.tunisia_customers 
FOR UPDATE 
TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own customers" 
ON public.tunisia_customers 
FOR DELETE 
TO authenticated
USING (auth.uid()::text = user_id);
-- Fix critical security vulnerability in tunisia_invoices table
-- Remove the dangerous "Allow all operations" policy that exposes financial data publicly
DROP POLICY IF EXISTS "Allow all operations on tunisia_invoices" ON public.tunisia_invoices;

-- Create secure RLS policies that restrict access to authenticated users' own data
CREATE POLICY "Users can view their own invoices" 
ON public.tunisia_invoices 
FOR SELECT 
TO authenticated
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own invoices" 
ON public.tunisia_invoices 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own invoices" 
ON public.tunisia_invoices 
FOR UPDATE 
TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own invoices" 
ON public.tunisia_invoices 
FOR DELETE 
TO authenticated
USING (auth.uid()::text = user_id);
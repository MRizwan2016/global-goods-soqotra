-- Fix Tunisia authentication security issue
-- Update RLS policies to use proper authentication instead of hardcoded user_id

-- Update tunisia_containers RLS policies
DROP POLICY IF EXISTS "Allow access to tunisia containers" ON public.tunisia_containers;

CREATE POLICY "Users can view their own tunisia containers" 
ON public.tunisia_containers 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own tunisia containers" 
ON public.tunisia_containers 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tunisia containers" 
ON public.tunisia_containers 
FOR UPDATE 
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tunisia containers" 
ON public.tunisia_containers 
FOR DELETE 
USING (auth.uid()::text = user_id);

-- Update tunisia_invoices RLS policies  
DROP POLICY IF EXISTS "Allow access to tunisia invoices" ON public.tunisia_invoices;

CREATE POLICY "Users can view their own tunisia invoices" 
ON public.tunisia_invoices 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own tunisia invoices" 
ON public.tunisia_invoices 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tunisia invoices" 
ON public.tunisia_invoices 
FOR UPDATE 
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tunisia invoices" 
ON public.tunisia_invoices 
FOR DELETE 
USING (auth.uid()::text = user_id);

-- Update tunisia_payment_receipts RLS policies
DROP POLICY IF EXISTS "Allow access to tunisia payment receipts" ON public.tunisia_payment_receipts;

CREATE POLICY "Users can view their own tunisia payment receipts" 
ON public.tunisia_payment_receipts 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own tunisia payment receipts" 
ON public.tunisia_payment_receipts 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tunisia payment receipts" 
ON public.tunisia_payment_receipts 
FOR UPDATE 
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tunisia payment receipts" 
ON public.tunisia_payment_receipts 
FOR DELETE 
USING (auth.uid()::text = user_id);

-- Update tunisia_customers RLS policies
DROP POLICY IF EXISTS "Allow access to tunisia customers" ON public.tunisia_customers;

CREATE POLICY "Users can view their own tunisia customers" 
ON public.tunisia_customers 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own tunisia customers" 
ON public.tunisia_customers 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tunisia customers" 
ON public.tunisia_customers 
FOR UPDATE 
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tunisia customers" 
ON public.tunisia_customers 
FOR DELETE 
USING (auth.uid()::text = user_id);
-- Fix cargo_tracking RLS policies: change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Customers can view own cargo" ON public.cargo_tracking;
DROP POLICY IF EXISTS "Admins can view all cargo" ON public.cargo_tracking;
DROP POLICY IF EXISTS "Admins can insert cargo" ON public.cargo_tracking;
DROP POLICY IF EXISTS "Admins can update cargo" ON public.cargo_tracking;
DROP POLICY IF EXISTS "Admins can delete cargo" ON public.cargo_tracking;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Customers can view own cargo"
ON public.cargo_tracking
FOR SELECT
TO authenticated
USING (customer_account_id IN (
  SELECT id FROM customer_accounts WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can view all cargo"
ON public.cargo_tracking
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert cargo"
ON public.cargo_tracking
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update cargo"
ON public.cargo_tracking
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete cargo"
ON public.cargo_tracking
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also fix customer_accounts RLS policies
DROP POLICY IF EXISTS "Customers can view own account" ON public.customer_accounts;
DROP POLICY IF EXISTS "Customers can update own account" ON public.customer_accounts;
DROP POLICY IF EXISTS "Authenticated users can register" ON public.customer_accounts;
DROP POLICY IF EXISTS "Admins can view all customer accounts" ON public.customer_accounts;
DROP POLICY IF EXISTS "Admins can update all customer accounts" ON public.customer_accounts;

CREATE POLICY "Customers can view own account"
ON public.customer_accounts FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own account"
ON public.customer_accounts FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can register"
ON public.customer_accounts FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all customer accounts"
ON public.customer_accounts FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all customer accounts"
ON public.customer_accounts FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
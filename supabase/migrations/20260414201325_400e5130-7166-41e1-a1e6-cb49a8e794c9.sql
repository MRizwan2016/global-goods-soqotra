-- Allow any authenticated user to update container_running_number and loaded_at on regional_invoices
-- This is needed for the container loading workflow where staff load packages from various invoices
CREATE POLICY "Staff can update container assignment"
ON public.regional_invoices
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Similarly for regional_invoice_packages - allow any authenticated user to update loading fields
CREATE POLICY "Staff can update loading status"
ON public.regional_invoice_packages
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);
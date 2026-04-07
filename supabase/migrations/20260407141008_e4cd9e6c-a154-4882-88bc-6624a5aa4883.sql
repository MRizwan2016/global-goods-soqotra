
-- Drop the overly permissive policy
DROP POLICY "Staff can insert package_types" ON public.package_types;

-- Recreate with proper check - any authenticated user can add custom package types
CREATE POLICY "Authenticated can insert package_types"
ON public.package_types FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

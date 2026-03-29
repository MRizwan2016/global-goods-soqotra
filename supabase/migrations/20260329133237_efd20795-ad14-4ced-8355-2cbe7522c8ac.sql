
-- 1. Fix privilege escalation: Replace "Users can update own profile" to prevent updating is_admin and permissions
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND is_admin IS NOT DISTINCT FROM (SELECT p.is_admin FROM public.profiles p WHERE p.user_id = auth.uid())
    AND permissions IS NOT DISTINCT FROM (SELECT p.permissions FROM public.profiles p WHERE p.user_id = auth.uid())
  );

-- 2. Fix schedules INSERT policy: restrict to admins + schedule creators
DROP POLICY IF EXISTS "Admins can insert schedules" ON public.schedules;

CREATE POLICY "Admins can insert schedules" ON public.schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Add RLS policies to staff performance views
-- These are views with security_invoker=true, but let's add explicit policies for the underlying collection_performance table if needed
-- The views inherit from collection_performance which already has RLS
-- However the scanner flags the views themselves. Views don't support RLS directly, 
-- but we can ensure the underlying table is properly protected.
-- The collection_performance table already has RLS enabled with authenticated SELECT + admin ALL policies.
-- This is actually correct - the views use security_invoker=true so they inherit the caller's RLS.

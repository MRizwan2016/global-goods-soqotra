
-- Tighten schedule RLS: only allow users with admin role or who created the record
DROP POLICY "Authenticated users can insert schedules" ON public.schedules;
DROP POLICY "Authenticated users can update schedules" ON public.schedules;
DROP POLICY "Authenticated users can delete schedules" ON public.schedules;
DROP POLICY "Authenticated users can insert schedule_jobs" ON public.schedule_jobs;
DROP POLICY "Authenticated users can update schedule_jobs" ON public.schedule_jobs;
DROP POLICY "Authenticated users can delete schedule_jobs" ON public.schedule_jobs;

CREATE POLICY "Admins can insert schedules" ON public.schedules FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update schedules" ON public.schedules FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid());
CREATE POLICY "Admins can delete schedules" ON public.schedules FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid());

CREATE POLICY "Admins can insert schedule_jobs" ON public.schedule_jobs FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.schedules WHERE id = schedule_id AND (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid()))
);
CREATE POLICY "Admins can update schedule_jobs" ON public.schedule_jobs FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.schedules WHERE id = schedule_id AND (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid()))
);
CREATE POLICY "Admins can delete schedule_jobs" ON public.schedule_jobs FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.schedules WHERE id = schedule_id AND (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid()))
);

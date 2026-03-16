
-- Fix security definer views by recreating with security_invoker
DROP VIEW IF EXISTS public.staff_daily_performance;
DROP VIEW IF EXISTS public.staff_weekly_performance;
DROP VIEW IF EXISTS public.staff_monthly_performance;
DROP VIEW IF EXISTS public.staff_annual_performance;

CREATE VIEW public.staff_daily_performance WITH (security_invoker = true) AS
SELECT collection_date, staff_name, staff_type, staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY collection_date, staff_name, staff_type, staff_id;

CREATE VIEW public.staff_weekly_performance WITH (security_invoker = true) AS
SELECT date_trunc('week', collection_date)::DATE AS week_start, staff_name, staff_type, staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY week_start, staff_name, staff_type, staff_id;

CREATE VIEW public.staff_monthly_performance WITH (security_invoker = true) AS
SELECT date_trunc('month', collection_date)::DATE AS month_start,
  EXTRACT(YEAR FROM collection_date) AS year,
  EXTRACT(MONTH FROM collection_date) AS month,
  staff_name, staff_type, staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY month_start, year, month, staff_name, staff_type, staff_id;

CREATE VIEW public.staff_annual_performance WITH (security_invoker = true) AS
SELECT EXTRACT(YEAR FROM collection_date) AS year, staff_name, staff_type, staff_id,
  COUNT(*) AS total_jobs,
  COUNT(*) FILTER (WHERE job_status = 'completed') AS completed_jobs,
  COUNT(*) FILTER (WHERE job_type = 'delivery') AS delivery_jobs,
  COUNT(*) FILTER (WHERE job_type = 'collection') AS collection_jobs,
  COALESCE(SUM(total_packages), 0) AS total_packages,
  COALESCE(SUM(total_cbm), 0) AS total_volume_cbm,
  COALESCE(SUM(total_weight_kg), 0) AS total_weight_kg,
  COALESCE(SUM(total_revenue_qr), 0) AS total_revenue_qr,
  CASE WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE on_time = true)::NUMERIC / COUNT(*) ELSE 0 END AS on_time_completion_rate,
  COALESCE(AVG(satisfaction_rating), 0) AS avg_satisfaction
FROM public.collection_performance
GROUP BY year, staff_name, staff_type, staff_id;

NOTIFY pgrst, 'reload schema';

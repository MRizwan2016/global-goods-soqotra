
-- Create a flexible performance leaderboard view
CREATE OR REPLACE VIEW public.weekly_performance_leaderboard AS
SELECT
  sr.id AS rep_id,
  sr.name AS rep_name,
  sr.employee_number,
  sr.country AS operation,
  sr.is_active,
  COUNT(ri.id) AS jobs_closed,
  COALESCE(SUM(ri.gross), 0) AS total_revenue,
  COALESCE(SUM(ri.net), 0) AS net_revenue,
  ri.country AS region,
  DATE_TRUNC('week', ri.created_at) AS week_start,
  DATE_TRUNC('month', ri.created_at) AS month_start,
  EXTRACT(YEAR FROM ri.created_at) AS year
FROM public.sales_representatives sr
LEFT JOIN public.regional_invoices ri
  ON LOWER(ri.sales_representative) = LOWER(sr.name)
WHERE sr.is_active = true
GROUP BY sr.id, sr.name, sr.employee_number, sr.country, sr.is_active, ri.country, DATE_TRUNC('week', ri.created_at), DATE_TRUNC('month', ri.created_at), EXTRACT(YEAR FROM ri.created_at);

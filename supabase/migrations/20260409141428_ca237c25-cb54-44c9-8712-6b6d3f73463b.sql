
CREATE OR REPLACE VIEW public.sudan_customs_manifest WITH (security_invoker = true) AS
SELECT
  ri.id,
  ri.book_number,
  ri.page_number,
  ri.shipper_name,
  ri.job_number,
  ri.total_volume,
  ri.total_weight,
  ri.total_packages,
  ri.consignee_name,
  ri.invoice_number,
  ri.invoice_date,
  ri.description,
  ri.sector
FROM public.regional_invoices ri
WHERE ri.country = 'Sudan'
ORDER BY ri.page_number ASC;


-- Create a security definer function for public cargo lookup by invoice number
-- This allows anonymous users to search without exposing the full table
CREATE OR REPLACE FUNCTION public.track_cargo_by_invoice(_invoice_number text)
RETURNS TABLE (
  id uuid,
  invoice_number text,
  customer_name text,
  cargo_description text,
  origin text,
  destination text,
  collection_date timestamptz,
  loaded_date timestamptz,
  in_transit_date timestamptz,
  arrival_date timestamptz,
  clearance_date timestamptz,
  processing_date timestamptz,
  delivery_date timestamptz,
  current_status text,
  notes text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    ct.id, ct.invoice_number, ct.customer_name, ct.cargo_description,
    ct.origin, ct.destination,
    ct.collection_date, ct.loaded_date, ct.in_transit_date,
    ct.arrival_date, ct.clearance_date, ct.processing_date,
    ct.delivery_date, ct.current_status, ct.notes, ct.created_at
  FROM public.cargo_tracking ct
  WHERE ct.invoice_number = _invoice_number
  ORDER BY ct.created_at DESC;
$$;

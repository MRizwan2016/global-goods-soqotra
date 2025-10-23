-- Add missing columns to tunisia_invoices table
ALTER TABLE public.tunisia_invoices 
ADD COLUMN IF NOT EXISTS hbl_number text,
ADD COLUMN IF NOT EXISTS supporting_documents jsonb;
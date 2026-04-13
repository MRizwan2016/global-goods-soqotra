-- Add container and vessel tracking to regional_invoices
ALTER TABLE public.regional_invoices
ADD COLUMN IF NOT EXISTS container_running_number TEXT,
ADD COLUMN IF NOT EXISTS vessel_running_number TEXT,
ADD COLUMN IF NOT EXISTS loaded_at TIMESTAMPTZ;

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_regional_invoices_container ON public.regional_invoices(container_running_number) WHERE container_running_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_regional_invoices_vessel ON public.regional_invoices(vessel_running_number) WHERE vessel_running_number IS NOT NULL;

-- Add loading tracking columns to regional_invoice_packages
ALTER TABLE public.regional_invoice_packages
  ADD COLUMN IF NOT EXISTS loading_status text NOT NULL DEFAULT 'PENDING',
  ADD COLUMN IF NOT EXISTS container_running_number text,
  ADD COLUMN IF NOT EXISTS loaded_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS loaded_by uuid;

-- Add index for quick lookups by container
CREATE INDEX IF NOT EXISTS idx_rip_container_running_number 
  ON public.regional_invoice_packages(container_running_number);

-- Add index for loading status filtering
CREATE INDEX IF NOT EXISTS idx_rip_loading_status 
  ON public.regional_invoice_packages(loading_status);

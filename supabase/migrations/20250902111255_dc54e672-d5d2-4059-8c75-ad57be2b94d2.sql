-- Create payment receipts table for Tunisia invoices
CREATE TABLE IF NOT EXISTS public.tunisia_payment_receipts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  receipt_number text NOT NULL UNIQUE,
  invoice_id uuid REFERENCES public.tunisia_invoices(id) ON DELETE CASCADE,
  invoice_number text NOT NULL,
  amount numeric NOT NULL,
  payment_method text DEFAULT 'CASH',
  payment_date date DEFAULT CURRENT_DATE,
  notes text,
  user_id text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tunisia_payment_receipts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own payment receipts" 
ON public.tunisia_payment_receipts 
FOR SELECT 
USING ((auth.uid())::text = user_id);

CREATE POLICY "Users can create their own payment receipts" 
ON public.tunisia_payment_receipts 
FOR INSERT 
WITH CHECK ((auth.uid())::text = user_id);

CREATE POLICY "Users can update their own payment receipts" 
ON public.tunisia_payment_receipts 
FOR UPDATE 
USING ((auth.uid())::text = user_id)
WITH CHECK ((auth.uid())::text = user_id);

CREATE POLICY "Users can delete their own payment receipts" 
ON public.tunisia_payment_receipts 
FOR DELETE 
USING ((auth.uid())::text = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_tunisia_payment_receipts_updated_at
BEFORE UPDATE ON public.tunisia_payment_receipts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
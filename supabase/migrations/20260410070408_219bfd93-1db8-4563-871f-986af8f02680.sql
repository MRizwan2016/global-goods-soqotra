
-- Create payment_transactions table
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.regional_invoices(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  gross_amount NUMERIC DEFAULT 0,
  discount_applied NUMERIC DEFAULT 0,
  net_amount NUMERIC DEFAULT 0,
  amount_paid NUMERIC NOT NULL DEFAULT 0,
  balance_after NUMERIC DEFAULT 0,
  payment_method TEXT DEFAULT 'Cash',
  warehouse TEXT,
  currency TEXT DEFAULT 'QAR',
  country TEXT,
  receipt_number TEXT,
  remarks TEXT,
  payment_date TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage payment_transactions"
  ON public.payment_transactions FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated can view payment_transactions"
  ON public.payment_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can insert payment_transactions"
  ON public.payment_transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create the summary view
CREATE OR REPLACE VIEW public.payment_receivable_summary
WITH (security_invoker = true)
AS
SELECT
  ri.id,
  ri.invoice_number,
  ri.consignee_name,
  ri.shipper_name,
  ri.country,
  ri.invoice_date,
  ri.gross,
  ri.discount,
  ri.net,
  ri.warehouse,
  ri.payment_method,
  ri.payment_status,
  ri.shipper_mobile,
  ri.consignee_mobile,
  ri.book_number,
  ri.job_number,
  ri.created_at,
  CASE
    WHEN ri.country = 'Sudan' THEN 'SDG'
    WHEN ri.country = 'Kenya' THEN 'KES'
    WHEN ri.country = 'Saudi Arabia' THEN 'SAR'
    WHEN ri.country = 'Sri Lanka' THEN 'LKR'
    ELSE 'QAR'
  END AS currency,
  COALESCE(pt.total_paid, 0) AS total_paid,
  COALESCE(pt.total_discount, 0) AS total_discount_applied,
  GREATEST(0, COALESCE(ri.net, ri.gross, 0) - COALESCE(pt.total_paid, 0)) AS balance_due
FROM public.regional_invoices ri
LEFT JOIN (
  SELECT
    invoice_number,
    SUM(amount_paid) AS total_paid,
    SUM(discount_applied) AS total_discount
  FROM public.payment_transactions
  GROUP BY invoice_number
) pt ON pt.invoice_number = ri.invoice_number;

-- Trigger for updated_at
CREATE TRIGGER update_payment_transactions_updated_at
  BEFORE UPDATE ON public.payment_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

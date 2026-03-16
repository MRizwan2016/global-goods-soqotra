
-- Create notification log table
CREATE TABLE public.cargo_status_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cargo_tracking_id UUID NOT NULL REFERENCES public.cargo_tracking(id) ON DELETE CASCADE,
  customer_account_id UUID NOT NULL REFERENCES public.customer_accounts(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  email_sent_to TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resend_message_id TEXT,
  error TEXT
);

-- Enable RLS
ALTER TABLE public.cargo_status_notifications ENABLE ROW LEVEL SECURITY;

-- Admins can view all notifications
CREATE POLICY "Admins can view notifications"
ON public.cargo_status_notifications FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Customers can view their own notifications
CREATE POLICY "Customers can view own notifications"
ON public.cargo_status_notifications FOR SELECT TO authenticated
USING (customer_account_id IN (
  SELECT id FROM customer_accounts WHERE user_id = auth.uid()
));

-- Service role inserts (edge function uses service role)
-- No INSERT policy needed for authenticated users since edge function uses service_role key

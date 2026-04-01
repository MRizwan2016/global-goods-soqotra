
-- Allow staff to update pages_used and status on books assigned to them
-- Match by comparing assigned_to_sales_rep with the user's full_name from profiles
CREATE POLICY "Staff can update assigned books"
ON public.manage_invoice_book_stock
FOR UPDATE
TO authenticated
USING (
  assigned_to_sales_rep = (SELECT full_name FROM public.profiles WHERE user_id = auth.uid())
)
WITH CHECK (
  assigned_to_sales_rep = (SELECT full_name FROM public.profiles WHERE user_id = auth.uid())
);

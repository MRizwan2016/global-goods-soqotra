ALTER TABLE public.invoice_books RENAME TO manage_invoice_book_stock;

-- Update RLS policies to reference the new table name
-- Drop and recreate policies since they reference the old table implicitly

-- The policies auto-reference the table they're on, so renaming the table
-- should carry them over. But let's verify by re-stating them:

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage invoice_books" ON public.manage_invoice_book_stock;
DROP POLICY IF EXISTS "Authenticated can view invoice_books" ON public.manage_invoice_book_stock;

-- Recreate with updated names
CREATE POLICY "Admins can manage manage_invoice_book_stock"
ON public.manage_invoice_book_stock
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated can view manage_invoice_book_stock"
ON public.manage_invoice_book_stock
FOR SELECT
TO authenticated
USING (true);
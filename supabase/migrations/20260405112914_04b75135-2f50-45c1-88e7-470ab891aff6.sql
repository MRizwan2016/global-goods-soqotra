
CREATE TABLE public.sl_book_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_number TEXT NOT NULL,
  start_page_no TEXT NOT NULL,
  end_page_no TEXT NOT NULL,
  staff_name TEXT NOT NULL,
  assigned_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'assigned',
  country TEXT NOT NULL DEFAULT 'Sri Lanka',
  pages_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(book_number, country)
);

ALTER TABLE public.sl_book_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view sl_book_assignments"
  ON public.sl_book_assignments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage sl_book_assignments"
  ON public.sl_book_assignments FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Staff can update own assignments"
  ON public.sl_book_assignments FOR UPDATE
  TO authenticated
  USING (staff_name = (SELECT full_name FROM profiles WHERE user_id = auth.uid()))
  WITH CHECK (staff_name = (SELECT full_name FROM profiles WHERE user_id = auth.uid()));

CREATE TRIGGER update_sl_book_assignments_updated_at
  BEFORE UPDATE ON public.sl_book_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

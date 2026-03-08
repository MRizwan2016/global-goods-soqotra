
-- Table to store sales representatives per country
CREATE TABLE public.sales_representatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table to store drivers per country
CREATE TABLE public.drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table to store invoice books with country, assignment, job details
CREATE TABLE public.invoice_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  book_number text NOT NULL,
  country_id_number text,
  start_page text NOT NULL,
  end_page text NOT NULL,
  total_pages integer NOT NULL DEFAULT 50,
  pages_used integer NOT NULL DEFAULT 0,
  available_pages jsonb NOT NULL DEFAULT '[]'::jsonb,
  assigned_to_sales_rep text,
  assigned_to_driver text,
  status text NOT NULL DEFAULT 'available',
  job_number text,
  job_data jsonb,
  whatsapp_number text,
  assigned_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(book_number, country)
);

-- Enable RLS
ALTER TABLE public.sales_representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_books ENABLE ROW LEVEL SECURITY;

-- RLS policies - Admins can manage, authenticated can view
CREATE POLICY "Admins can manage sales_representatives" ON public.sales_representatives FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated can view sales_representatives" ON public.sales_representatives FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage drivers" ON public.drivers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated can view drivers" ON public.drivers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage invoice_books" ON public.invoice_books FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated can view invoice_books" ON public.invoice_books FOR SELECT TO authenticated USING (true);

-- Insert Sri Lanka sales representatives
INSERT INTO public.sales_representatives (name, country) VALUES
  ('Mr. Lahiru Chathuranga', 'Sri Lanka'),
  ('Mr. Sajjad', 'Sri Lanka'),
  ('Mr. Imam Ubaidulla', 'Sri Lanka'),
  ('Mr. Ranatunghe', 'Sri Lanka'),
  ('Mr. Mohamed Rizwan', 'Sri Lanka');

-- Insert Sri Lanka drivers
INSERT INTO public.drivers (name, country) VALUES
  ('Ashoka Udesh', 'Sri Lanka'),
  ('Johnny Venakady', 'Sri Lanka'),
  ('Kanaya', 'Sri Lanka'),
  ('Bakeeth Idris', 'Sri Lanka'),
  ('Idries Karar', 'Sri Lanka');

-- Insert the default Sri Lanka invoice book #800
INSERT INTO public.invoice_books (country, book_number, country_id_number, start_page, end_page, total_pages, available_pages)
VALUES (
  'Sri Lanka',
  '800',
  '13',
  '13140800',
  '13140850',
  50,
  (SELECT jsonb_agg(page_num) FROM generate_series(13140800, 13140850) AS page_num)
);

-- Trigger for updated_at
CREATE TRIGGER update_invoice_books_updated_at
  BEFORE UPDATE ON public.invoice_books
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

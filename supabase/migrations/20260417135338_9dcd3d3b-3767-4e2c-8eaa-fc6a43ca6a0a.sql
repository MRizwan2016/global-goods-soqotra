INSERT INTO storage.buckets (id, name, public)
VALUES ('invoice-pdfs', 'invoice-pdfs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read invoice-pdfs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'invoice-pdfs');

CREATE POLICY "Authenticated upload invoice-pdfs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'invoice-pdfs');

CREATE POLICY "Authenticated update invoice-pdfs"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'invoice-pdfs');
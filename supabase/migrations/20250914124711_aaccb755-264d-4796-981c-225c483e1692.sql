-- Import data from MySQL dump
-- Note: This assumes user_id will be set by the authenticated user

-- Import effects_items data
INSERT INTO public.effects_items (
  invoice_id, item_category, description, owner_name, loading_location, 
  qty, cbm, gross_weight_kg, hs_code, charge_qr, user_id
) VALUES
  ((SELECT id FROM public.invoices WHERE invoice_no = 207606 LIMIT 1), 'Household', 'Boxes', 'RIZWAN', 'Outside Car', 3, 1.3500, 120.000, '980100', 0.00, auth.uid()::text),
  ((SELECT id FROM public.invoices WHERE invoice_no = 358634 LIMIT 1), 'Household', 'Boxes', 'RIZWAN', 'Outside Car', 3, 1.3500, 120.000, '980100', 0.00, auth.uid()::text);

-- Import inquiries data
INSERT INTO public.inquiries (
  name, phone, email, city, country, details, user_id
) VALUES
  ('Test Name', '555', 'test@example.com', 'Doha', 'Qatar', 'Hello from GoDaddy', auth.uid()),
  ('MOHAMED RIZWAN', '31016616', 'ops@almaraamcc.com', 'MANSOORA', 'QATAR', 'TEST MESSAGE', auth.uid());

-- Import invoices data (with sequential invoice numbers)
INSERT INTO public.invoices (
  invoice_date, invoice_code, invoice_no, book_no, page_no, hbl_no, invoice_type,
  shipper_name, shipper_phone, shipper_metrash_phone, shipper_email,
  shipper_address, consignee_name, service_type, num_packages, total_cbm,
  total_gross_weight_kg, vehicle_freight_qr, effects_rate_qr_per_cbm,
  effects_total_qr, total_amount, status, user_id
) VALUES
  ('2025-09-08', '2025/207606', 207606, 2025, 12, 'HBL123', 'vehicle_effects',
   'MOHAMED RIZWAN', '31016616', '31016616', 'ops@almaraamcc.com',
   'MANSOORA, QATAR', 'Tunis Consignee', 'Sea', 3, 1.3500,
   120.000, 5500.00, 600.00, 810.00, 6310.00, 1, auth.uid()::text),
  ('2025-09-08', '2025/358634', 358634, 2025, 12, 'HBL123', 'vehicle_effects',
   'MOHAMED RIZWAN', '31016616', '31016616', 'ops@almaraamcc.com',
   'MANSOORA, QATAR', 'Tunis Consignee', 'Sea', 3, 1.3500,
   120.000, 5500.00, 600.00, 810.00, 6310.00, 1, auth.uid()::text);

-- Import shipments data
INSERT INTO public.shipments (
  invoice_id, shipment_no, origin_country, destination_country, mode,
  container_no, tracking_no, loaded_date, eta_date, status, user_id
) VALUES
  ((SELECT id FROM public.invoices WHERE invoice_no = 358634 LIMIT 1), 'SOQ-202509-001', 'Qatar', 'Tunisia', 'Sea', 'MSCU1234567', 'MAEU9876543', '2025-09-08', '2025-10-05', 'Booked', auth.uid()::text),
  ((SELECT id FROM public.invoices WHERE invoice_no = 207606 LIMIT 1), 'SOQ-TEST-001', 'Qatar', 'Tunisia', 'Sea', NULL, NULL, NULL, NULL, 'Booked', auth.uid()::text);

-- Import Tunisia invoices data (simplified - just the basic data without the base64 images)
INSERT INTO public.tunisia_invoices (
  id, invoice_number, date, customer_id, status, vehicle, total_amount, user_id
) VALUES 
  ('0ad6130a-091a-4c2a-a20a-3c13bb998170'::uuid, '2025/013115', '2025-09-14'::timestamp with time zone, 'YOUSRI ABASSI', 'draft', 
   '{"make": "MG 5", "type": "SEDAN", "year": "2022", "color": "WHITE", "model": "SALOON", "hsCode": "87032112"}'::jsonb, 
   5500.00, auth.uid()::text);

-- Note: The tunisia_invoices table had very large base64 image data that was truncated
-- You may need to re-add vehicle photos through the application interface
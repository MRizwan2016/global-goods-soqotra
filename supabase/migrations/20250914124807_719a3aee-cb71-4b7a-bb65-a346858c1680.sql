-- Import data from MySQL dump (corrected approach)
-- First insert invoices, then link related data

-- Import invoices data first
DO $$
DECLARE
    invoice_1_id UUID;
    invoice_2_id UUID;
BEGIN
    -- Insert first invoice and capture its ID
    INSERT INTO public.invoices (
        invoice_date, invoice_code, invoice_no, book_no, page_no, hbl_no, invoice_type,
        shipper_name, shipper_phone, shipper_metrash_phone, shipper_email,
        shipper_address, consignee_name, service_type, num_packages, total_cbm,
        total_gross_weight_kg, vehicle_freight_qr, effects_rate_qr_per_cbm,
        effects_total_qr, total_amount, status, user_id
    ) VALUES (
        '2025-09-08', '2025/207606', 207606, 2025, 12, 'HBL123', 'vehicle_effects',
        'MOHAMED RIZWAN', '31016616', '31016616', 'ops@almaraamcc.com',
        'MANSOORA, QATAR', 'Tunis Consignee', 'Sea', 3, 1.3500,
        120.000, 5500.00, 600.00, 810.00, 6310.00, 1, auth.uid()::text
    ) RETURNING id INTO invoice_1_id;

    -- Insert second invoice and capture its ID
    INSERT INTO public.invoices (
        invoice_date, invoice_code, invoice_no, book_no, page_no, hbl_no, invoice_type,
        shipper_name, shipper_phone, shipper_metrash_phone, shipper_email,
        shipper_address, consignee_name, service_type, num_packages, total_cbm,
        total_gross_weight_kg, vehicle_freight_qr, effects_rate_qr_per_cbm,
        effects_total_qr, total_amount, status, user_id
    ) VALUES (
        '2025-09-08', '2025/358634', 358634, 2025, 12, 'HBL123', 'vehicle_effects',
        'MOHAMED RIZWAN', '31016616', '31016616', 'ops@almaraamcc.com',
        'MANSOORA, QATAR', 'Tunis Consignee', 'Sea', 3, 1.3500,
        120.000, 5500.00, 600.00, 810.00, 6310.00, 1, auth.uid()::text
    ) RETURNING id INTO invoice_2_id;

    -- Insert effects_items data using captured invoice IDs
    INSERT INTO public.effects_items (
        invoice_id, item_category, description, owner_name, loading_location, 
        qty, cbm, gross_weight_kg, hs_code, charge_qr, user_id
    ) VALUES
        (invoice_1_id, 'Household', 'Boxes', 'RIZWAN', 'Outside Car', 3, 1.3500, 120.000, '980100', 0.00, auth.uid()::text),
        (invoice_2_id, 'Household', 'Boxes', 'RIZWAN', 'Outside Car', 3, 1.3500, 120.000, '980100', 0.00, auth.uid()::text);

    -- Insert shipments data using captured invoice IDs
    INSERT INTO public.shipments (
        invoice_id, shipment_no, origin_country, destination_country, mode,
        container_no, tracking_no, loaded_date, eta_date, status, user_id
    ) VALUES
        (invoice_2_id, 'SOQ-202509-001', 'Qatar', 'Tunisia', 'Sea', 'MSCU1234567', 'MAEU9876543', '2025-09-08', '2025-10-05', 'Booked', auth.uid()::text),
        (invoice_1_id, 'SOQ-TEST-001', 'Qatar', 'Tunisia', 'Sea', NULL, NULL, NULL, NULL, 'Booked', auth.uid()::text);
END $$;

-- Import inquiries data
INSERT INTO public.inquiries (
    name, phone, email, city, country, details, user_id
) VALUES
    ('Test Name', '555', 'test@example.com', 'Doha', 'Qatar', 'Hello from GoDaddy', auth.uid()),
    ('MOHAMED RIZWAN', '31016616', 'ops@almaraamcc.com', 'MANSOORA', 'QATAR', 'TEST MESSAGE', auth.uid());

-- Import Tunisia invoices data (simplified without base64 images)
INSERT INTO public.tunisia_invoices (
    id, invoice_number, date, customer_id, status, vehicle, total_amount, user_id
) VALUES 
    ('0ad6130a-091a-4c2a-a20a-3c13bb998170'::uuid, '2025/013115', '2025-09-14'::timestamp with time zone, 'YOUSRI ABASSI', 'draft', 
     '{"make": "MG 5", "type": "SEDAN", "year": "2022", "color": "WHITE", "model": "SALOON", "hsCode": "87032112"}'::jsonb, 
     5500.00, auth.uid()::text);
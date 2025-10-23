-- Import sample data from MySQL dump (without authentication requirement)
-- Note: This creates sample data using a placeholder user_id that will need to be updated
-- when an authenticated user accesses the data

-- First, let's create a sample user_id for demonstration
-- In production, this would be replaced with the actual authenticated user's ID

-- Import inquiries data (public data that doesn't require specific user ownership)
INSERT INTO public.inquiries (
    name, phone, email, city, country, details, user_id
) VALUES
    ('Test Name', '555', 'test@example.com', 'Doha', 'Qatar', 'Hello from GoDaddy', 'sample-user-id-1'::uuid),
    ('MOHAMED RIZWAN', '31016616', 'ops@almaraamcc.com', 'MANSOORA', 'QATAR', 'TEST MESSAGE', 'sample-user-id-1'::uuid)
ON CONFLICT DO NOTHING;

-- Note: The invoice and related data migration will need to be done when a user is authenticated
-- This is because the RLS policies require a valid authenticated user_id

-- Create a function to help import data for authenticated users
CREATE OR REPLACE FUNCTION import_mysql_data(target_user_id TEXT)
RETURNS TABLE(invoices_created INTEGER, effects_items_created INTEGER, shipments_created INTEGER) AS $$
DECLARE
    invoice_1_id UUID;
    invoice_2_id UUID;
    invoices_count INTEGER := 0;
    effects_count INTEGER := 0;
    shipments_count INTEGER := 0;
BEGIN
    -- Insert first invoice
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
        120.000, 5500.00, 600.00, 810.00, 6310.00, 1, target_user_id
    ) RETURNING id INTO invoice_1_id;
    invoices_count := invoices_count + 1;

    -- Insert second invoice
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
        120.000, 5500.00, 600.00, 810.00, 6310.00, 1, target_user_id
    ) RETURNING id INTO invoice_2_id;
    invoices_count := invoices_count + 1;

    -- Insert effects_items
    INSERT INTO public.effects_items (
        invoice_id, item_category, description, owner_name, loading_location, 
        qty, cbm, gross_weight_kg, hs_code, charge_qr, user_id
    ) VALUES
        (invoice_1_id, 'Household', 'Boxes', 'RIZWAN', 'Outside Car', 3, 1.3500, 120.000, '980100', 0.00, target_user_id),
        (invoice_2_id, 'Household', 'Boxes', 'RIZWAN', 'Outside Car', 3, 1.3500, 120.000, '980100', 0.00, target_user_id);
    effects_count := 2;

    -- Insert shipments
    INSERT INTO public.shipments (
        invoice_id, shipment_no, origin_country, destination_country, mode,
        container_no, tracking_no, loaded_date, eta_date, status, user_id
    ) VALUES
        (invoice_2_id, 'SOQ-202509-001', 'Qatar', 'Tunisia', 'Sea', 'MSCU1234567', 'MAEU9876543', '2025-09-08', '2025-10-05', 'Booked', target_user_id),
        (invoice_1_id, 'SOQ-TEST-001', 'Qatar', 'Tunisia', 'Sea', NULL, NULL, NULL, NULL, 'Booked', target_user_id);
    shipments_count := 2;

    -- Insert Tunisia invoice
    INSERT INTO public.tunisia_invoices (
        id, invoice_number, date, customer_id, status, vehicle, total_amount, user_id
    ) VALUES 
        ('0ad6130a-091a-4c2a-a20a-3c13bb998170'::uuid, '2025/013115', '2025-09-14'::timestamp with time zone, 'YOUSRI ABASSI', 'draft', 
         '{"make": "MG 5", "type": "SEDAN", "year": "2022", "color": "WHITE", "model": "SALOON", "hsCode": "87032112"}'::jsonb, 
         5500.00, target_user_id);

    RETURN QUERY SELECT invoices_count, effects_count, shipments_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
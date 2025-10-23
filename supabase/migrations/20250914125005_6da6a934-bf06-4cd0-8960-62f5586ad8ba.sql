-- Import sample data from MySQL dump (fixed UUID format)
-- Create a helper function for data import that can be called when users are authenticated

CREATE OR REPLACE FUNCTION import_mysql_sample_data(target_user_id TEXT)
RETURNS TABLE(
    invoices_created INTEGER, 
    effects_items_created INTEGER, 
    shipments_created INTEGER,
    tunisia_invoices_created INTEGER,
    inquiries_created INTEGER
) AS $$
DECLARE
    invoice_1_id UUID;
    invoice_2_id UUID;
    invoices_count INTEGER := 0;
    effects_count INTEGER := 0;
    shipments_count INTEGER := 0;
    tunisia_count INTEGER := 0;
    inquiries_count INTEGER := 0;
BEGIN
    -- Insert inquiries data
    INSERT INTO public.inquiries (
        name, phone, email, city, country, details, user_id
    ) VALUES
        ('Test Name', '555', 'test@example.com', 'Doha', 'Qatar', 'Hello from GoDaddy', target_user_id::uuid),
        ('MOHAMED RIZWAN', '31016616', 'ops@almaraamcc.com', 'MANSOORA', 'QATAR', 'TEST MESSAGE', target_user_id::uuid);
    inquiries_count := 2;

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
    tunisia_count := 1;

    RETURN QUERY SELECT invoices_count, effects_count, shipments_count, tunisia_count, inquiries_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a public function that users can call to import their data
-- This will be available through the application interface
CREATE OR REPLACE FUNCTION import_user_data()
RETURNS TABLE(
    invoices_created INTEGER, 
    effects_items_created INTEGER, 
    shipments_created INTEGER,
    tunisia_invoices_created INTEGER,
    inquiries_created INTEGER
) AS $$
BEGIN
    -- Ensure user is authenticated
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'User must be authenticated to import data';
    END IF;
    
    -- Call the main import function with the authenticated user's ID
    RETURN QUERY SELECT * FROM import_mysql_sample_data(auth.uid()::text);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Drop foreign key constraints and change UUID columns to text for Tunisia project
-- This allows the project to use simple string IDs instead of strict UUIDs

-- Drop any existing foreign key constraints first
DO $$ 
BEGIN
    -- Drop foreign key constraints if they exist
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'tunisia_invoices_user_id_fkey' 
               AND table_name = 'tunisia_invoices') THEN
        ALTER TABLE tunisia_invoices DROP CONSTRAINT tunisia_invoices_user_id_fkey;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'tunisia_invoices_customer_id_fkey' 
               AND table_name = 'tunisia_invoices') THEN
        ALTER TABLE tunisia_invoices DROP CONSTRAINT tunisia_invoices_customer_id_fkey;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'tunisia_containers_user_id_fkey' 
               AND table_name = 'tunisia_containers') THEN
        ALTER TABLE tunisia_containers DROP CONSTRAINT tunisia_containers_user_id_fkey;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'tunisia_customers_user_id_fkey' 
               AND table_name = 'tunisia_customers') THEN
        ALTER TABLE tunisia_customers DROP CONSTRAINT tunisia_customers_user_id_fkey;
    END IF;
END $$;

-- Now change the column types to text
ALTER TABLE tunisia_invoices 
ALTER COLUMN user_id TYPE text,
ALTER COLUMN customer_id TYPE text;

ALTER TABLE tunisia_containers
ALTER COLUMN user_id TYPE text;

ALTER TABLE tunisia_customers
ALTER COLUMN user_id TYPE text;
-- Fix UUID columns to accept text instead for Tunisia project compatibility
-- This allows the project to use simple string IDs instead of strict UUIDs

-- Update tunisia_invoices to use text for user_id and customer_id
ALTER TABLE tunisia_invoices 
ALTER COLUMN user_id TYPE text,
ALTER COLUMN customer_id TYPE text;

-- Update tunisia_containers to use text for user_id
ALTER TABLE tunisia_containers
ALTER COLUMN user_id TYPE text;

-- Update tunisia_customers to use text for user_id
ALTER TABLE tunisia_customers
ALTER COLUMN user_id TYPE text;
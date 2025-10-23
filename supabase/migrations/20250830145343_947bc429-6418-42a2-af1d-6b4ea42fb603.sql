-- Update RLS policies for Tunisia tables to work without authentication
-- This allows the Tunisia project to work as a standalone application

-- Drop existing restrictive policies for tunisia_invoices
DROP POLICY IF EXISTS "Users can create their own invoices" ON tunisia_invoices;
DROP POLICY IF EXISTS "Users can view their own invoices" ON tunisia_invoices;
DROP POLICY IF EXISTS "Users can update their own invoices" ON tunisia_invoices;
DROP POLICY IF EXISTS "Users can delete their own invoices" ON tunisia_invoices;

-- Create new permissive policies for tunisia_invoices
CREATE POLICY "Allow all operations on tunisia_invoices" 
ON tunisia_invoices 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Drop existing restrictive policies for tunisia_containers
DROP POLICY IF EXISTS "Users can create their own containers" ON tunisia_containers;
DROP POLICY IF EXISTS "Users can view their own containers" ON tunisia_containers;
DROP POLICY IF EXISTS "Users can update their own containers" ON tunisia_containers;
DROP POLICY IF EXISTS "Users can delete their own containers" ON tunisia_containers;

-- Create new permissive policies for tunisia_containers
CREATE POLICY "Allow all operations on tunisia_containers" 
ON tunisia_containers 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Drop existing restrictive policies for tunisia_customers
DROP POLICY IF EXISTS "Users can create their own customers" ON tunisia_customers;
DROP POLICY IF EXISTS "Users can view their own customers" ON tunisia_customers;
DROP POLICY IF EXISTS "Users can update their own customers" ON tunisia_customers;
DROP POLICY IF EXISTS "Users can delete their own customers" ON tunisia_customers;

-- Create new permissive policies for tunisia_customers
CREATE POLICY "Allow all operations on tunisia_customers" 
ON tunisia_customers 
FOR ALL 
USING (true) 
WITH CHECK (true);
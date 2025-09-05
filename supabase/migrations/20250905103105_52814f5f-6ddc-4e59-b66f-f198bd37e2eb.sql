-- Fix RLS policies for Tunisia project to work without authentication
-- Since Tunisia project doesn't use authentication, we need to modify the policies

-- Drop existing policies for tunisia_invoices
DROP POLICY IF EXISTS "Users can view their own invoices" ON tunisia_invoices;
DROP POLICY IF EXISTS "Users can create their own invoices" ON tunisia_invoices;
DROP POLICY IF EXISTS "Users can update their own invoices" ON tunisia_invoices;
DROP POLICY IF EXISTS "Users can delete their own invoices" ON tunisia_invoices;

-- Create new policies that allow access based on user_id field
CREATE POLICY "Allow access to tunisia invoices" 
ON tunisia_invoices 
FOR ALL 
USING (user_id = 'tunisia-user-default')
WITH CHECK (user_id = 'tunisia-user-default');

-- Drop existing policies for tunisia_containers
DROP POLICY IF EXISTS "Users can view their own containers" ON tunisia_containers;
DROP POLICY IF EXISTS "Users can create their own containers" ON tunisia_containers;
DROP POLICY IF EXISTS "Users can update their own containers" ON tunisia_containers;
DROP POLICY IF EXISTS "Users can delete their own containers" ON tunisia_containers;

-- Create new policies for containers
CREATE POLICY "Allow access to tunisia containers" 
ON tunisia_containers 
FOR ALL 
USING (user_id = 'tunisia-user-default')
WITH CHECK (user_id = 'tunisia-user-default');

-- Drop existing policies for tunisia_customers
DROP POLICY IF EXISTS "Users can view their own customers" ON tunisia_customers;
DROP POLICY IF EXISTS "Users can create their own customers" ON tunisia_customers;
DROP POLICY IF EXISTS "Users can update their own customers" ON tunisia_customers;
DROP POLICY IF EXISTS "Users can delete their own customers" ON tunisia_customers;

-- Create new policies for customers
CREATE POLICY "Allow access to tunisia customers" 
ON tunisia_customers 
FOR ALL 
USING (user_id = 'tunisia-user-default')
WITH CHECK (user_id = 'tunisia-user-default');

-- Drop existing policies for tunisia_payment_receipts
DROP POLICY IF EXISTS "Users can view their own payment receipts" ON tunisia_payment_receipts;
DROP POLICY IF EXISTS "Users can create their own payment receipts" ON tunisia_payment_receipts;
DROP POLICY IF EXISTS "Users can update their own payment receipts" ON tunisia_payment_receipts;
DROP POLICY IF EXISTS "Users can delete their own payment receipts" ON tunisia_payment_receipts;

-- Create new policies for payment receipts
CREATE POLICY "Allow access to tunisia payment receipts" 
ON tunisia_payment_receipts 
FOR ALL 
USING (user_id = 'tunisia-user-default')
WITH CHECK (user_id = 'tunisia-user-default');
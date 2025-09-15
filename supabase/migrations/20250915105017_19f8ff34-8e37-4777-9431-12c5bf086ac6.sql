-- Create profiles table for additional user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  mobile_number TEXT,
  country TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  permissions JSONB NOT NULL DEFAULT '{
    "masterData": false,
    "dataEntry": true,
    "reports": true,
    "downloads": true,
    "accounting": true,
    "controlPanel": false,
    "cargoDelivery": true,
    "accountFunctions": true,
    "accountRegistrations": true,
    "accountFinancialEntities": true,
    "accountCountryReconciliations": true,
    "files": {}
  }'::jsonb
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- Admins can insert profiles for others
CREATE POLICY "Admins can insert any profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing user from auth.users if exists
INSERT INTO public.profiles (user_id, full_name, is_admin, permissions)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)) as full_name,
  false as is_admin,
  '{
    "masterData": false,
    "dataEntry": true,
    "reports": true,
    "downloads": true,
    "accounting": true,
    "controlPanel": false,
    "cargoDelivery": true,
    "accountFunctions": true,
    "accountRegistrations": true,
    "accountFinancialEntities": true,
    "accountCountryReconciliations": true,
    "files": {}
  }'::jsonb as permissions
FROM auth.users 
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE user_id = auth.users.id
);

-- Create an admin user profile if none exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE is_admin = true) THEN
    -- Create a system admin profile
    INSERT INTO public.profiles (
      user_id, 
      full_name, 
      is_admin, 
      permissions,
      mobile_number,
      country
    ) VALUES (
      gen_random_uuid(),  -- This will need to be linked to actual auth user
      'System Administrator',
      true,
      '{
        "masterData": true,
        "dataEntry": true,
        "reports": true,
        "downloads": true,
        "accounting": true,
        "controlPanel": true,
        "cargoDelivery": true,
        "accountFunctions": true,
        "accountRegistrations": true,
        "accountFinancialEntities": true,
        "accountCountryReconciliations": true,
        "files": {
          "salesRep": true,
          "town": true,
          "item": true,
          "packageOptions": true,
          "sellingRates": true,
          "container": true,
          "vessel": true,
          "invoiceBook": true,
          "driverHelper": true,
          "invoicing": true,
          "paymentReceivable": true,
          "loadContainer": true,
          "loadVessel": true,
          "loadAirCargo": true,
          "packingList": true,
          "cargoReports": true,
          "financialReports": true,
          "shippingReports": true,
          "paymentMethods": true,
          "reconciliation": true,
          "profitLoss": true
        }
      }'::jsonb,
      '+974 5555 5555',
      'Qatar'
    );
  END IF;
END $$;

-- Customer accounts table for portal registration
CREATE TABLE public.customer_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Kenya',
  is_active BOOLEAN NOT NULL DEFAULT false,
  activated_by UUID,
  activated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_accounts ENABLE ROW LEVEL SECURITY;

-- Customers can view their own account
CREATE POLICY "Customers can view own account"
  ON public.customer_accounts FOR SELECT
  USING (auth.uid() = user_id);

-- Customers can update their own account
CREATE POLICY "Customers can update own account"
  ON public.customer_accounts FOR UPDATE
  USING (auth.uid() = user_id);

-- Anyone authenticated can insert (for registration)
CREATE POLICY "Authenticated users can register"
  ON public.customer_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Cargo tracking table
CREATE TABLE public.cargo_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_account_id UUID REFERENCES public.customer_accounts(id) ON DELETE CASCADE NOT NULL,
  invoice_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  cargo_description TEXT,
  origin TEXT DEFAULT 'Qatar',
  destination TEXT DEFAULT 'Kenya',
  collection_date TIMESTAMP WITH TIME ZONE,
  loaded_date TIMESTAMP WITH TIME ZONE,
  in_transit_date TIMESTAMP WITH TIME ZONE,
  arrival_date TIMESTAMP WITH TIME ZONE,
  clearance_date TIMESTAMP WITH TIME ZONE,
  processing_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  current_status TEXT NOT NULL DEFAULT 'collected' CHECK (current_status IN ('collected', 'loaded', 'in_transit', 'arrived', 'clearance', 'processing', 'delivered')),
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cargo_tracking ENABLE ROW LEVEL SECURITY;

-- Customers can view their own cargo
CREATE POLICY "Customers can view own cargo"
  ON public.cargo_tracking FOR SELECT
  USING (
    customer_account_id IN (
      SELECT id FROM public.customer_accounts WHERE user_id = auth.uid()
    )
  );

-- Admin role for managing customers and cargo
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'customer');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins can view all customer accounts
CREATE POLICY "Admins can view all customer accounts"
  ON public.customer_accounts FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update all customer accounts (activate/deactivate)
CREATE POLICY "Admins can update all customer accounts"
  ON public.customer_accounts FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage all cargo tracking
CREATE POLICY "Admins can view all cargo"
  ON public.cargo_tracking FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert cargo"
  ON public.cargo_tracking FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cargo"
  ON public.cargo_tracking FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cargo"
  ON public.cargo_tracking FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view roles
CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can view own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_customer_accounts_updated_at
  BEFORE UPDATE ON public.customer_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cargo_tracking_updated_at
  BEFORE UPDATE ON public.cargo_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if customer account is active
CREATE OR REPLACE FUNCTION public.is_customer_active(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.customer_accounts
    WHERE user_id = _user_id AND is_active = true
  )
$$;

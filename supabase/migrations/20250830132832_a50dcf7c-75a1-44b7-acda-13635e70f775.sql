-- Create tables for Tunisia invoices and containers
CREATE TABLE public.tunisia_customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  prefix TEXT,
  id_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Tunisia invoices table
CREATE TABLE public.tunisia_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  invoice_number TEXT NOT NULL,
  customer_id UUID REFERENCES public.tunisia_customers NOT NULL,
  vehicle JSONB NOT NULL,
  personal_effects JSONB,
  total_amount DECIMAL(10,2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Tunisia containers table
CREATE TABLE public.tunisia_containers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  container_number TEXT NOT NULL,
  vessel_name TEXT,
  departure_date TIMESTAMP WITH TIME ZONE,
  arrival_date TIMESTAMP WITH TIME ZONE,
  port_of_loading TEXT,
  port_of_discharge TEXT,
  status TEXT NOT NULL DEFAULT 'loading',
  seal_number TEXT,
  loaded_vehicles JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tunisia_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tunisia_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tunisia_containers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tunisia_customers
CREATE POLICY "Users can view their own customers" 
ON public.tunisia_customers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own customers" 
ON public.tunisia_customers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers" 
ON public.tunisia_customers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers" 
ON public.tunisia_customers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for tunisia_invoices
CREATE POLICY "Users can view their own invoices" 
ON public.tunisia_invoices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own invoices" 
ON public.tunisia_invoices 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices" 
ON public.tunisia_invoices 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices" 
ON public.tunisia_invoices 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for tunisia_containers
CREATE POLICY "Users can view their own containers" 
ON public.tunisia_containers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own containers" 
ON public.tunisia_containers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own containers" 
ON public.tunisia_containers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own containers" 
ON public.tunisia_containers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_tunisia_customers_updated_at
BEFORE UPDATE ON public.tunisia_customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tunisia_invoices_updated_at
BEFORE UPDATE ON public.tunisia_invoices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tunisia_containers_updated_at
BEFORE UPDATE ON public.tunisia_containers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_tunisia_invoices_user_id ON public.tunisia_invoices(user_id);
CREATE INDEX idx_tunisia_invoices_invoice_number ON public.tunisia_invoices(invoice_number);
CREATE INDEX idx_tunisia_customers_user_id ON public.tunisia_customers(user_id);
CREATE INDEX idx_tunisia_containers_user_id ON public.tunisia_containers(user_id);
CREATE INDEX idx_tunisia_containers_container_number ON public.tunisia_containers(container_number);

-- Create package_types table for permanent custom package storage
CREATE TABLE public.package_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  length_inches NUMERIC DEFAULT 0,
  width_inches NUMERIC DEFAULT 0,
  height_inches NUMERIC DEFAULT 0,
  volume_cbm NUMERIC DEFAULT 0,
  weight_kg NUMERIC DEFAULT 0,
  country TEXT DEFAULT 'Sri Lanka',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.package_types ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can view
CREATE POLICY "Authenticated can view package_types"
ON public.package_types FOR SELECT
TO authenticated
USING (true);

-- Admins can manage
CREATE POLICY "Admins can manage package_types"
ON public.package_types FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Staff can insert new package types
CREATE POLICY "Staff can insert package_types"
ON public.package_types FOR INSERT
TO authenticated
WITH CHECK (true);

-- Seed default SL package types from the user's reference sheet
INSERT INTO public.package_types (name, length_inches, width_inches, height_inches, volume_cbm, is_default, country) VALUES
  ('CARTON BOX - SMALL', 20, 20, 20, 0.134, true, 'Sri Lanka'),
  ('CARTON BOX - MEDIUM', 19, 19, 29, 0.176, true, 'Sri Lanka'),
  ('CARTON BOX - LARGE', 23, 23, 23, 0.204, true, 'Sri Lanka'),
  ('CARTON BOX - EXTRA LARGE', 24, 24, 30, 0.290, true, 'Sri Lanka'),
  ('CARTON BOX - JUMBO', 24, 24, 26, 0.251, true, 'Sri Lanka'),
  ('CARTON BOX - SUPER JUMBO', 30, 30, 30, 0.453, true, 'Sri Lanka'),
  ('CARTON BOX - BULILIT', 14, 14, 14, 0.046, true, 'Sri Lanka'),
  ('WOODEN BOX - HALF METER', 24, 24, 48, 0.464, true, 'Sri Lanka'),
  ('WOODEN BOX - 1 METER', 48, 35, 32, 0.902, true, 'Sri Lanka'),
  ('WOODEN BOX - 1.5 METER', 48, 36, 48, 1.391, true, 'Sri Lanka'),
  ('WOODEN BOX - 1.5 METER / LONG', 59, 39, 39, 1.505, true, 'Sri Lanka'),
  ('WOODEN BOX - 2 METER', 48, 48, 48, 1.855, true, 'Sri Lanka'),
  ('WOODEN BOX - 2 METER / LONG', 78, 39, 39, 1.990, true, 'Sri Lanka'),
  ('WOODEN BOX - 3 METER', 78, 48, 48, 3.014, true, 'Sri Lanka'),
  ('WOODEN BOX - 4 METER', 48, 48, 96, 3.710, true, 'Sri Lanka'),
  ('PLASTIC DRUM', 22, 22, 34, 0.276, true, 'Sri Lanka'),
  ('PLASTIC TANK', 48, 39, 38, 1.193, true, 'Sri Lanka'),
  ('PLASTIC DRUM - BIG', 23, 23, 36, 0.319, true, 'Sri Lanka'),
  ('TELEVISION - 55 INCH', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('TELEVISION - 65 INCH', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('REFRIDGERATOR - 450 LITER', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('REFRIDGERATOR - 500 LITER', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('REFRIDGERATOR - 550 LITER', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('REFRIDGERATOR - 600 LITER', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('MATTRESS', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('MATTRESS BUNDLE', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('SOFA SET', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('STEEL BED', 0, 0, 0, 0, true, 'Sri Lanka'),
  ('BED BUNDLE', 0, 0, 0, 0, true, 'Sri Lanka');

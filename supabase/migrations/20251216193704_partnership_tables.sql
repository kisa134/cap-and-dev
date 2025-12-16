/*
  # Partnership Programs Tables

  1. New Tables
    - `careers` - Job application submissions
    - `agents` - Agent partnership applications
    - `referrals` - Referral program registrations
    - `proptraders` - Prop trading applications
    - `trader_products` - Product catalog for trader products (Theory, Tools, Consulting)
    - `contact_submissions` - General contact form submissions

  2. Security
    - Enable RLS on all tables
    - Public can INSERT (submit applications)
    - Only authenticated admins can SELECT/UPDATE/DELETE
*/

-- Create enum types
DO $$ BEGIN
  CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'accepted', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE proptrader_status AS ENUM ('pending', 'evaluating', 'approved', 'rejected', 'funded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE trader_product_type AS ENUM ('course', 'tool', 'service');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Careers table
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  telegram text NOT NULL,
  specialization text NOT NULL,
  experience_years integer,
  portfolio_link text,
  cv_link text,
  motivation text,
  status application_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit career applications" ON careers;
CREATE POLICY "Anyone can submit career applications"
  ON careers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated users can view career applications" ON careers;
CREATE POLICY "Only authenticated users can view career applications"
  ON careers FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text,
  email text NOT NULL,
  telegram text NOT NULL,
  aum text,
  region text NOT NULL,
  client_profile text,
  sales_experience text,
  status application_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit agent applications" ON agents;
CREATE POLICY "Anyone can submit agent applications"
  ON agents FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated users can view agent applications" ON agents;
CREATE POLICY "Only authenticated users can view agent applications"
  ON agents FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  telegram text NOT NULL,
  professional_background text,
  linkedin_url text,
  referral_code text UNIQUE NOT NULL DEFAULT '',
  total_referrals integer DEFAULT 0,
  total_earnings numeric(10, 2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit referral registrations" ON referrals;
CREATE POLICY "Anyone can submit referral registrations"
  ON referrals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own referral data" ON referrals;
CREATE POLICY "Users can view their own referral data"
  ON referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- Proptraders table
CREATE TABLE IF NOT EXISTS proptraders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  telegram text NOT NULL,
  experience_years text NOT NULL,
  market_specialization text NOT NULL,
  avg_monthly_return numeric(5, 2),
  max_drawdown numeric(5, 2),
  broker_api_key text,
  strategy_description text,
  status proptrader_status DEFAULT 'pending',
  evaluation_score numeric(3, 2),
  allocated_capital numeric(10, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE proptraders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit proptrader applications" ON proptraders;
CREATE POLICY "Anyone can submit proptrader applications"
  ON proptraders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated users can view proptrader applications" ON proptraders;
CREATE POLICY "Only authenticated users can view proptrader applications"
  ON proptraders FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Trader products table (different from existing products table)
CREATE TABLE IF NOT EXISTS trader_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type trader_product_type NOT NULL,
  short_description text,
  detailed_description text,
  price numeric(10, 2),
  currency text DEFAULT 'USD',
  features jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trader_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active trader products" ON trader_products;
CREATE POLICY "Anyone can view active trader products"
  ON trader_products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Only authenticated users can manage trader products" ON trader_products;
CREATE POLICY "Only authenticated users can manage trader products"
  ON trader_products FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  page_source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON contact_submissions;
CREATE POLICY "Only authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_careers_status ON careers(status);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON careers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_user_id ON referrals(user_id);
CREATE INDEX IF NOT EXISTS idx_proptraders_status ON proptraders(status);
CREATE INDEX IF NOT EXISTS idx_proptraders_created_at ON proptraders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trader_products_slug ON trader_products(slug);
CREATE INDEX IF NOT EXISTS idx_trader_products_type ON trader_products(type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS text AS $$
DECLARE
  code text;
  exists boolean;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) from 1 for 8));
    SELECT EXISTS(SELECT 1 FROM referrals WHERE referral_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL OR NEW.referral_code = '' THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS before_insert_referral ON referrals;
CREATE TRIGGER before_insert_referral
  BEFORE INSERT ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION set_referral_code();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_careers_updated_at ON careers;
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agents_updated_at ON agents;
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_referrals_updated_at ON referrals;
CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_proptraders_updated_at ON proptraders;
CREATE TRIGGER update_proptraders_updated_at BEFORE UPDATE ON proptraders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_trader_products_updated_at ON trader_products;
CREATE TRIGGER update_trader_products_updated_at BEFORE UPDATE ON trader_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
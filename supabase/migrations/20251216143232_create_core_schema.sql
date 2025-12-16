/*
  # Создание схемы базы данных COGITO.ART
  
  ## Новые таблицы
  
  ### 1. users_profiles (расширение auth.users)
    - `id` (uuid, primary key, ссылка на auth.users)
    - `role` (enum: 'investor', 'trader', 'admin')
    - `kyc_status` (enum: 'pending', 'verified', 'rejected')
    - `tier` (enum: 'S', 'A', 'B')
    - `full_name` (text)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
  
  ### 2. products (инвестиционные продукты)
    - `id` (uuid, primary key)
    - `name` (text) - Vector 30, Vector 60, Vector Alpha
    - `type` (text) - 'investment', 'education', 'tool'
    - `tier` (enum: 'S', 'A', 'B')
    - `yield_target` (text) - "30-36%"
    - `lock_period_days` (integer)
    - `min_investment` (numeric)
    - `description` (text)
    - `risk_level` (text)
    - `withdrawal_frequency` (text) - monthly, quarterly, etc
    - `active` (boolean)
  
  ### 3. portfolios (портфели инвесторов)
    - `id` (uuid, primary key)
    - `user_id` (uuid, ссылка на users_profiles)
    - `balance_usdt` (numeric)
    - `active_deposits` (numeric)
    - `total_earnings` (numeric)
    - `updated_at` (timestamp)
  
  ### 4. transactions (история операций)
    - `id` (uuid, primary key)
    - `user_id` (uuid)
    - `product_id` (uuid, nullable)
    - `type` (enum: 'deposit', 'withdrawal', 'yield_payout', 'fee')
    - `amount` (numeric)
    - `status` (enum: 'pending', 'completed', 'rejected', 'cancelled')
    - `hash` (text, nullable)
    - `created_at` (timestamp)
    - `processed_at` (timestamp, nullable)
  
  ### 5. access_rights (права доступа трейдеров)
    - `id` (uuid, primary key)
    - `user_id` (uuid)
    - `has_theory_access` (boolean)
    - `has_indicators_access` (boolean)
    - `prop_challenge_status` (enum: 'none', 'active', 'passed', 'failed')
    - `api_key` (text, nullable)
    - `updated_at` (timestamp)
  
  ### 6. courses (учебные курсы)
    - `id` (uuid, primary key)
    - `title` (text)
    - `description` (text)
    - `tier_required` (enum: 'S', 'A', 'B')
    - `order_index` (integer)
    - `duration_minutes` (integer)
    - `active` (boolean)
  
  ### 7. lessons (уроки курсов)
    - `id` (uuid, primary key)
    - `course_id` (uuid)
    - `title` (text)
    - `content` (text)
    - `video_url` (text, nullable)
    - `order_index` (integer)
    - `duration_minutes` (integer)
  
  ### 8. user_progress (прогресс пользователей по урокам)
    - `id` (uuid, primary key)
    - `user_id` (uuid)
    - `lesson_id` (uuid)
    - `completed` (boolean)
    - `completed_at` (timestamp, nullable)
  
  ### 9. prop_challenges (торговые челленджи)
    - `id` (uuid, primary key)
    - `user_id` (uuid)
    - `status` (enum: 'active', 'passed', 'failed', 'funded')
    - `start_date` (timestamp)
    - `end_date` (timestamp, nullable)
    - `win_rate` (numeric)
    - `max_drawdown` (numeric)
    - `profit_factor` (numeric)
    - `total_pnl` (numeric)
    - `trades_count` (integer)
  
  ## Безопасность
  - Включен RLS для всех таблиц
  - Политики доступа настроены для каждой роли
*/

-- Создание ENUM типов
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('investor', 'trader', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE tier_level AS ENUM ('S', 'A', 'B');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'yield_payout', 'fee');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'rejected', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE challenge_status AS ENUM ('none', 'active', 'passed', 'failed', 'funded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 1. Таблица users_profiles
CREATE TABLE IF NOT EXISTS users_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'investor',
  kyc_status kyc_status NOT NULL DEFAULT 'pending',
  tier tier_level NOT NULL DEFAULT 'B',
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 2. Таблица products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  tier tier_level NOT NULL DEFAULT 'B',
  yield_target text NOT NULL,
  lock_period_days integer NOT NULL DEFAULT 0,
  min_investment numeric NOT NULL DEFAULT 0,
  description text,
  risk_level text,
  withdrawal_frequency text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by authenticated users"
  ON products FOR SELECT
  TO authenticated
  USING (active = true);

-- 3. Таблица portfolios
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  balance_usdt numeric DEFAULT 0,
  active_deposits numeric DEFAULT 0,
  total_earnings numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own portfolio"
  ON portfolios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Таблица transactions
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  type transaction_type NOT NULL,
  amount numeric NOT NULL,
  status transaction_status NOT NULL DEFAULT 'pending',
  hash text,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 5. Таблица access_rights
CREATE TABLE IF NOT EXISTS access_rights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  has_theory_access boolean DEFAULT false,
  has_indicators_access boolean DEFAULT false,
  prop_challenge_status challenge_status DEFAULT 'none',
  api_key text,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE access_rights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own access rights"
  ON access_rights FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 6. Таблица courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  tier_required tier_level NOT NULL DEFAULT 'B',
  order_index integer DEFAULT 0,
  duration_minutes integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by authenticated users"
  ON courses FOR SELECT
  TO authenticated
  USING (active = true);

-- 7. Таблица lessons
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  video_url text,
  order_index integer DEFAULT 0,
  duration_minutes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by authenticated users"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

-- 8. Таблица user_progress
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 9. Таблица prop_challenges
CREATE TABLE IF NOT EXISTS prop_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  status challenge_status DEFAULT 'active',
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  win_rate numeric DEFAULT 0,
  max_drawdown numeric DEFAULT 0,
  profit_factor numeric DEFAULT 0,
  total_pnl numeric DEFAULT 0,
  trades_count integer DEFAULT 0
);

ALTER TABLE prop_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own challenges"
  ON prop_challenges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges"
  ON prop_challenges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges"
  ON prop_challenges FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_access_rights_user_id ON access_rights(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_prop_challenges_user_id ON prop_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);

// Database types generated from Supabase schema

export type UserRole = 'investor' | 'trader' | 'admin';
export type KycStatus = 'pending' | 'verified' | 'rejected';
export type TierLevel = 'S' | 'A' | 'B';
export type TransactionType = 'deposit' | 'withdrawal' | 'yield_payout' | 'fee';
export type TransactionStatus = 'pending' | 'completed' | 'rejected' | 'cancelled';
export type ChallengeStatus = 'none' | 'active' | 'passed' | 'failed' | 'funded';

export interface UserProfile {
  id: string;
  role: UserRole;
  kyc_status: KycStatus;
  tier: TierLevel;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  tier: TierLevel;
  yield_target: string;
  lock_period_days: number;
  min_investment: number;
  description?: string;
  risk_level?: string;
  withdrawal_frequency?: string;
  active: boolean;
  created_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  balance_usdt: number;
  active_deposits: number;
  total_earnings: number;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  product_id?: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  hash?: string;
  created_at: string;
  processed_at?: string;
}

export interface AccessRights {
  id: string;
  user_id: string;
  has_theory_access: boolean;
  has_indicators_access: boolean;
  prop_challenge_status: ChallengeStatus;
  api_key?: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  tier_required: TierLevel;
  order_index: number;
  duration_minutes: number;
  active: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content?: string;
  video_url?: string;
  order_index: number;
  duration_minutes: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
}

export interface PropChallenge {
  id: string;
  user_id: string;
  status: ChallengeStatus;
  start_date: string;
  end_date?: string;
  win_rate: number;
  max_drawdown: number;
  profit_factor: number;
  total_pnl: number;
  trades_count: number;
}

// Extended types with relations
export interface CourseWithLessons extends Course {
  lessons: Lesson[];
}

export interface LessonWithProgress extends Lesson {
  progress?: UserProgress;
}

export interface TransactionWithProduct extends Transaction {
  product?: Product;
}

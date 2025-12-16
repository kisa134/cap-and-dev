import {
  UserProfile,
  Product,
  Portfolio,
  Transaction,
  Course,
  Lesson,
  PropChallenge,
  AccessRights
} from '../types/database.types';

// Mock Users
export const mockUsers: UserProfile[] = [
  {
    id: 'investor-1',
    role: 'investor',
    kyc_status: 'verified',
    tier: 'A',
    full_name: 'Alexander Petrov',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'trader-1',
    role: 'trader',
    kyc_status: 'verified',
    tier: 'B',
    full_name: 'Maria Sokolova',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Vector 30 (Stable)',
    type: 'investment',
    tier: 'B',
    yield_target: '30-36%',
    lock_period_days: 30,
    min_investment: 1000,
    description: 'Stable allocation product with fixed 30-36% APY yield. Conservative variance profile.',
    risk_level: 'Low',
    withdrawal_frequency: 'Monthly',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Vector 60 (Balanced)',
    type: 'investment',
    tier: 'A',
    yield_target: '60%',
    lock_period_days: 90,
    min_investment: 5000,
    description: 'Balanced allocation product with 60% APY target. Moderate variance.',
    risk_level: 'Moderate',
    withdrawal_frequency: 'Quarterly',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'Vector Alpha (High Risk)',
    type: 'investment',
    tier: 'S',
    yield_target: '>100%',
    lock_period_days: 180,
    min_investment: 10000,
    description: 'Aggressive product with >100% APY potential. HIGH VARIANCE: Total capital loss possible.',
    risk_level: 'High',
    withdrawal_frequency: 'Semi-Annual',
    active: true,
    created_at: new Date().toISOString()
  }
];

// Mock Portfolio
export const mockPortfolio: Portfolio = {
  id: 'portfolio-1',
  user_id: 'investor-1',
  balance_usdt: 125000,
  active_deposits: 100000,
  total_earnings: 25000,
  updated_at: new Date().toISOString()
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    user_id: 'investor-1',
    product_id: 'prod-2',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    hash: '0x1234567890abcdef',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    processed_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx-2',
    user_id: 'investor-1',
    product_id: 'prod-1',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    hash: '0xabcdef1234567890',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    processed_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx-3',
    user_id: 'investor-1',
    type: 'yield_payout',
    amount: 12500,
    status: 'completed',
    hash: '0x9876543210fedcba',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    processed_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx-4',
    user_id: 'investor-1',
    type: 'yield_payout',
    amount: 12500,
    status: 'completed',
    hash: '0xfedcba0987654321',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    processed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock Course with Lessons
export const mockCourse: Course = {
  id: 'course-1',
  title: 'The Elementary Structure of Price',
  description: 'Fundamental course on understanding price structure in financial markets.',
  tier_required: 'B',
  order_index: 1,
  duration_minutes: 480,
  active: true,
  created_at: new Date().toISOString()
};

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    course_id: 'course-1',
    title: 'Introduction to Price Structure',
    content: 'Fundamentals of market structure understanding. What is price and how it is formed.',
    order_index: 1,
    duration_minutes: 30,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-2',
    course_id: 'course-1',
    title: 'Support and Resistance Levels',
    content: 'Study of key levels on the chart. How to identify zones of interest.',
    order_index: 2,
    duration_minutes: 45,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-3',
    course_id: 'course-1',
    title: 'Trends and Identification',
    content: 'Uptrends, downtrends, and sideways trends. Methods for determining market direction.',
    order_index: 3,
    duration_minutes: 40,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-4',
    course_id: 'course-1',
    title: 'Candlestick Analysis',
    content: 'Japanese candlesticks and their patterns. Reversal and continuation signals.',
    order_index: 4,
    duration_minutes: 50,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-5',
    course_id: 'course-1',
    title: 'Volume and Liquidity',
    content: 'The role of volume in price formation. Market liquidity analysis.',
    order_index: 5,
    duration_minutes: 45,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-6',
    course_id: 'course-1',
    title: 'Trading Strategies',
    content: 'Practical application of knowledge. Developing your own trading system.',
    order_index: 6,
    duration_minutes: 60,
    created_at: new Date().toISOString()
  }
];

// Mock Prop Challenge
export const mockPropChallenge: PropChallenge = {
  id: 'challenge-1',
  user_id: 'trader-1',
  status: 'active',
  start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  win_rate: 65.5,
  max_drawdown: 8.2,
  profit_factor: 2.3,
  total_pnl: 4250,
  trades_count: 42
};

// Mock Access Rights
export const mockAccessRights: AccessRights = {
  id: 'access-1',
  user_id: 'trader-1',
  has_theory_access: true,
  has_indicators_access: true,
  prop_challenge_status: 'active',
  api_key: 'cogito_demo_key_123456789',
  updated_at: new Date().toISOString()
};

// Helper function to generate equity curve data for charts
export function generateEquityCurve(days: number, startBalance: number, endBalance: number) {
  const data = [];
  const dailyChange = (endBalance - startBalance) / days;

  for (let i = 0; i <= days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
    const value = startBalance + dailyChange * i + (Math.random() - 0.5) * 1000;
    data.push({
      date: date.toLocaleDateString('en-US'),
      value: Math.round(value)
    });
  }

  return data;
}

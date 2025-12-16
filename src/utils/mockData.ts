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
    full_name: 'Александр Петров',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'trader-1',
    role: 'trader',
    kyc_status: 'verified',
    tier: 'B',
    full_name: 'Мария Соколова',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Vector 30 (Стабильный)',
    type: 'investment',
    tier: 'B',
    yield_target: '30-36%',
    lock_period_days: 30,
    min_investment: 1000,
    description: 'Стабильный продукт с фиксированной доходностью 30-36% годовых. Минимальный риск.',
    risk_level: 'Низкий',
    withdrawal_frequency: 'monthly',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Vector 60 (Сбалансированный)',
    type: 'investment',
    tier: 'A',
    yield_target: '60%',
    lock_period_days: 90,
    min_investment: 5000,
    description: 'Сбалансированный продукт с доходностью 60% годовых. Умеренный риск.',
    risk_level: 'Средний',
    withdrawal_frequency: 'quarterly',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'Vector Alpha (Высокий риск)',
    type: 'investment',
    tier: 'S',
    yield_target: '>100%',
    lock_period_days: 180,
    min_investment: 10000,
    description: 'Агрессивный продукт с потенциалом доходности более 100% годовых. Высокий риск.',
    risk_level: 'Высокий',
    withdrawal_frequency: 'semi-annual',
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
  title: 'Элементарная Структура Цены',
  description: 'Фундаментальный курс по пониманию структуры цены на финансовых рынках.',
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
    title: 'Введение в структуру цены',
    content: 'Основы понимания рыночной структуры. Что такое цена и как она формируется.',
    order_index: 1,
    duration_minutes: 30,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-2',
    course_id: 'course-1',
    title: 'Уровни поддержки и сопротивления',
    content: 'Изучение ключевых уровней на графике. Как определять зоны интереса.',
    order_index: 2,
    duration_minutes: 45,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-3',
    course_id: 'course-1',
    title: 'Тренды и их идентификация',
    content: 'Восходящие, нисходящие и боковые тренды. Методы определения направления рынка.',
    order_index: 3,
    duration_minutes: 40,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-4',
    course_id: 'course-1',
    title: 'Свечной анализ',
    content: 'Японские свечи и их паттерны. Сигналы разворота и продолжения тренда.',
    order_index: 4,
    duration_minutes: 50,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-5',
    course_id: 'course-1',
    title: 'Объемы и ликвидность',
    content: 'Роль объемов в ценообразовании. Анализ ликвидности рынка.',
    order_index: 5,
    duration_minutes: 45,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-6',
    course_id: 'course-1',
    title: 'Торговые стратегии',
    content: 'Практическое применение знаний. Разработка собственной торговой системы.',
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
      date: date.toLocaleDateString('ru-RU'),
      value: Math.round(value)
    });
  }

  return data;
}

// Scope: U.ClaimScope (The Episteme)

export type Tier = 'S' | 'A' | 'B';
export type Sector = 'AI_INFRA' | 'DESALINATION' | 'RWA_TOKEN' | 'FINTECH' | 'HOSPITALITY' | 'LOGISTICS' | 'AGTECH';
export type MvpStatus = 'IDEA' | 'PROTOTYPE' | 'LIVE' | 'SCALING';

export interface Entity {
  id: string;
  name: string;
  tier: Tier;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  timestamp: string; // ISO Time or Display Time
}

export interface Project extends Entity {
  sector: Sector;
  askAmount: number;
  revenueMonthly: number;
  budgetMarketing: number;
  // New Fields
  burnRate: number;
  debtHistory: boolean;
  mvpStatus: MvpStatus;
  teamSize: number;
  
  description: string;
  trustScore: number;
  founderId: string;
}

export interface Investor extends Entity {
  liquidity: number;
  type: 'SOVEREIGN' | 'SYNDICATE' | 'ANGEL';
  // New Fields
  sourceOfFunds: string;
  jurisdiction: string;
  kycVerified: boolean;
  poaVerified: boolean;
  
  lastAudit: number;
}

// Logic Inputs for Forms
export interface FounderGateInput {
  revenue: number;
  burnRate: number;
  debtHistory: boolean;
  mvpStatus: MvpStatus;
  teamSize: number;
  askAmount: number;
  marketingBudget: number;
  name: string;
}

export interface InvestorGateInput {
  liquidity: number;
  sourceOfFunds: string;
  jurisdiction: string;
  kycVerified: boolean;
  poaVerified: boolean;
}

export interface ValidationResult {
  tier: Tier;
  score: number;
  passed: boolean;
  reason?: string;
}

export interface LedgerEntry {
  id: string;
  timestamp: number;
  details: string;
  hash: string;
  entityId: string;
  action: string;
  status: string;
}

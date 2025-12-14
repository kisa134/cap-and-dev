import { Project, Investor, Tier, ValidationResult, Sector, FounderGateInput, InvestorGateInput } from '../types';

// --- SEED DATA GENERATION ---

const SECTORS: Sector[] = ['AI_INFRA', 'DESALINATION', 'RWA_TOKEN', 'FINTECH', 'HOSPITALITY', 'LOGISTICS', 'AGTECH'];

const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const MOCK_PROJECTS: Project[] = [
  // TIER S (High Value, Strategic)
  {
    id: 'PRJ_NEOM_01', name: 'NEOM_DESAL_GRID', tier: 'S', sector: 'DESALINATION', status: 'VERIFIED', timestamp: getTime(),
    askAmount: 25000000, revenueMonthly: 1200000, burnRate: 400000, debtHistory: false, mvpStatus: 'SCALING', teamSize: 45,
    budgetMarketing: 500000, trustScore: 99, founderId: 'FND_01',
    description: 'Autonomous solar desalination grid for coastal cities. Sovereign backed.'
  },
  {
    id: 'PRJ_AI_CORE', name: 'ZAYED_NEURAL_NET', tier: 'S', sector: 'AI_INFRA', status: 'VERIFIED', timestamp: getTime(),
    askAmount: 15000000, revenueMonthly: 800000, burnRate: 600000, debtHistory: false, mvpStatus: 'LIVE', teamSize: 22,
    budgetMarketing: 200000, trustScore: 98, founderId: 'FND_02',
    description: 'Localized LLM infrastructure optimized for Arabic dialect processing.'
  },
  // TIER A (Solid)
  {
    id: 'PRJ_FIN_01', name: 'OASIS_PAY_V2', tier: 'A', sector: 'FINTECH', status: 'VERIFIED', timestamp: getTime(),
    askAmount: 2000000, revenueMonthly: 85000, burnRate: 40000, debtHistory: false, mvpStatus: 'LIVE', teamSize: 12,
    budgetMarketing: 20000, trustScore: 88, founderId: 'FND_04',
    description: 'Cross-border crypto settlement layer for GCC SMEs.'
  },
  // TIER B (Risky/Early)
  {
    id: 'PRJ_HOS_01', name: 'NOMAD_STAY_APP', tier: 'B', sector: 'HOSPITALITY', status: 'VERIFIED', timestamp: getTime(),
    askAmount: 500000, revenueMonthly: 5000, burnRate: 8000, debtHistory: true, mvpStatus: 'PROTOTYPE', teamSize: 4,
    budgetMarketing: 1000, trustScore: 72, founderId: 'FND_07',
    description: 'P2P luxury camping experiences platform. Note: Previous founder debt flagged.'
  }
];

// Fill remaining
for (let i = 0; i < 8; i++) {
  const isA = Math.random() > 0.5;
  MOCK_PROJECTS.push({
    id: generateId('PRJ_GEN'),
    name: `PROJECT_ALPHA_${i}`,
    tier: isA ? 'A' : 'B',
    sector: SECTORS[Math.floor(Math.random() * SECTORS.length)],
    status: 'VERIFIED',
    timestamp: getTime(),
    askAmount: isA ? 1000000 + (i * 100000) : 100000 + (i * 50000),
    revenueMonthly: isA ? 50000 : 0,
    burnRate: 10000,
    debtHistory: !isA && Math.random() > 0.8, // Small chance of debt for B tiers
    mvpStatus: isA ? 'LIVE' : 'PROTOTYPE',
    teamSize: Math.floor(Math.random() * 20) + 2,
    budgetMarketing: 5000,
    trustScore: isA ? 82 : 70,
    founderId: generateId('FND'),
    description: 'Algorithmic verification pending. Early signals positive.'
  });
}

export const MOCK_INVESTORS: Investor[] = [
  { 
    id: 'INV_SWF_01', name: 'ROYAL_VISION_FUND', tier: 'S', liquidity: 5000000000, type: 'SOVEREIGN', status: 'VERIFIED', timestamp: getTime(),
    sourceOfFunds: 'Oil & Gas Divestiture', jurisdiction: 'UAE', kycVerified: true, poaVerified: true, lastAudit: Date.now() 
  },
  { 
    id: 'INV_SYN_01', name: 'SANDSTORM_VC', tier: 'S', liquidity: 150000000, type: 'SYNDICATE', status: 'VERIFIED', timestamp: getTime(),
    sourceOfFunds: 'LP Capital', jurisdiction: 'Global', kycVerified: true, poaVerified: true, lastAudit: Date.now() 
  },
  { 
    id: 'INV_ANG_01', name: 'PRIVATE_OFFICE_X', tier: 'A', liquidity: 25000000, type: 'ANGEL', status: 'VERIFIED', timestamp: getTime(),
    sourceOfFunds: 'Real Estate', jurisdiction: 'UAE', kycVerified: true, poaVerified: true, lastAudit: Date.now() 
  },
];


// --- FPF LOGIC ENGINE (THE GUARDS) ---

export const verifyFounderGate = (input: FounderGateInput): ValidationResult => {
  // GUARD 1: DEBT HISTORY (Strict Filter)
  if (input.debtHistory) {
     // Immediate downgrade or rejection depending on severity. For MVP, we cap at Tier B.
     return { passed: true, score: 65, tier: 'B', reason: 'FLAG: PREVIOUS_DEBT_HISTORY' };
  }

  // GUARD 2: BURN RATE SUSTAINABILITY
  // If Burn > 2x Revenue (and Revenue > 0), it's high risk.
  if (input.revenue > 0 && input.burnRate > (input.revenue * 2.5)) {
    return { passed: true, score: 70, tier: 'B', reason: 'FLAG: HIGH_BURN_RATE' };
  }

  // TIER S: Unicorn Potential
  if ((input.revenue > 500000 || input.askAmount > 10000000) && input.mvpStatus === 'SCALING') {
    return { passed: true, score: 98, tier: 'S' };
  }

  // TIER A: Verified Growth
  if (input.revenue > 50000 && (input.mvpStatus === 'LIVE' || input.mvpStatus === 'SCALING')) {
    return { passed: true, score: 85, tier: 'A' };
  }

  // TIER B: Standard / MVP
  return { passed: true, score: 72, tier: 'B' };
};

export const verifyInvestorGate = (input: InvestorGateInput): ValidationResult => {
    // GUARD 1: MINIMUM LIQUIDITY
    if (input.liquidity < 50000) {
        return { passed: false, score: 0, tier: 'B', reason: 'REJECT: INSUFFICIENT_LIQUIDITY' };
    }

    // GUARD 2: COMPLIANCE
    if (!input.kycVerified || !input.poaVerified) {
        return { passed: false, score: 0, tier: 'B', reason: 'REJECT: COMPLIANCE_MISSING' };
    }

    // TIER S: Whale
    if (input.liquidity > 10000000) return { passed: true, score: 99, tier: 'S' };
    
    // TIER A: HNW
    if (input.liquidity > 1000000) return { passed: true, score: 88, tier: 'A' };
    
    // TIER B: Retail/Angel
    return { passed: true, score: 75, tier: 'B' };
}

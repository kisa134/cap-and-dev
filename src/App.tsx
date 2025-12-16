import React, { useState } from 'react';
import { 
  Shield, Activity, Zap, CheckCircle, Lock, Unlock,
  ArrowLeft, Terminal, BarChart3, Globe, 
  ChevronRight, ArrowUpRight, Search, X, FileText, Hash, AlertTriangle, Loader2
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_INVESTORS, verifyFounderGate, verifyInvestorGate } from './services/engine';
import { Project, Investor, Tier, FounderGateInput, InvestorGateInput } from './types';

// --- VISUAL CONSTANTS ---
const COLORS = {
  S: 'text-emerald-400 border-emerald-500/30',
  A: 'text-amber-400 border-amber-500/30',
  B: 'text-slate-400 border-slate-500/30'
};

// --- HELPERS ---
const TierBadge = ({ tier }: { tier: Tier }) => {
  if (tier === 'S') {
    return (
      <div className="flex items-center gap-2 px-3 py-1 border border-emerald-500/50 bg-emerald-950/20 rounded-none relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 animate-pulse"></div>
        <span className="relative z-10 font-bold font-mono text-xs tracking-widest tier-s-text">TIER S</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"></div>
      </div>
    );
  }
  if (tier === 'A') {
    return (
      <div className="flex items-center gap-2 px-3 py-1 border border-amber-500/40 bg-amber-950/10 rounded-none">
        <span className="font-bold font-mono text-xs tracking-widest text-amber-400">TIER A</span>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 px-3 py-1 border border-slate-700 bg-slate-900/50 rounded-none">
      <span className="font-bold font-mono text-xs tracking-widest text-slate-500">TIER B</span>
    </div>
  );
};

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-400 animate-spin-slow">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
  </svg>
);

// --- COMPONENT: DATA ROOM MODAL ---
const DataRoomModal = ({ entity, onClose }: { entity: Project | Investor, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-black border border-emerald-500/50 relative p-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20} /></button>
        
        <div className="flex items-center gap-2 mb-6 text-emerald-400">
          <Unlock size={20} />
          <h2 className="font-mono text-sm tracking-widest uppercase">Confidential Data Pack</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-white/60 group-hover:text-emerald-400" />
              <span className="font-mono text-sm">Full_Audited_PL_2024.pdf</span>
            </div>
            <span className="text-xs text-white/30">[2.4 MB]</span>
          </div>

          <div className="p-4 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hash size={18} className="text-white/60 group-hover:text-emerald-400" />
              <span className="font-mono text-sm">Smart_Contract_Audit_v3</span>
            </div>
            <span className="text-xs text-white/30">[VERIFIED]</span>
          </div>

          <div className="p-4 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-white/60 group-hover:text-emerald-400" />
              <span className="font-mono text-sm">Founder_KYC_Passport_Hash</span>
            </div>
            <span className="text-xs text-white/30">[SHA-256]</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="font-mono text-[10px] text-emerald-500/60 uppercase">
            Access Logged on Ledger ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [view, setView] = useState<'LANDING' | 'MANIFESTO' | 'GATE_CAPITAL' | 'GATE_VISION' | 'DASHBOARD' | 'DETAIL'>('LANDING');
  const [userRole, setUserRole] = useState<'INVESTOR' | 'FOUNDER' | null>(null);
  const [userTier, setUserTier] = useState<Tier>('B'); // Default to B until verified
  
  // Handshake State: Map of EntityID -> Status
  const [handshakes, setHandshakes] = useState<Record<string, 'IDLE' | 'PENDING' | 'ACCEPTED' | 'REJECTED'>>({});
  const [showDataRoom, setShowDataRoom] = useState(false);

  // Filter States
  const [activeTier, setActiveTier] = useState<Tier | 'ALL'>('ALL');
  const [selectedEntity, setSelectedEntity] = useState<Project | Investor | null>(null);
  const [hoverSide, setHoverSide] = useState<'LEFT' | 'RIGHT' | null>(null);

  // Forms
  const [founderForm, setFounderForm] = useState<FounderGateInput>({
    revenue: 0, burnRate: 0, debtHistory: false, mvpStatus: 'IDEA', teamSize: 1, askAmount: 0, marketingBudget: 0, name: ''
  });
  const [investorForm, setInvestorForm] = useState<InvestorGateInput>({
    liquidity: 0, sourceOfFunds: 'Salary', jurisdiction: 'UAE', kycVerified: false, poaVerified: false
  });

  const [verifying, setVerifying] = useState(false);
  const [verificationLog, setVerificationLog] = useState<string[]>([]);
  const [gateError, setGateError] = useState<string | null>(null);

  // --- ACTIONS ---

  const initiateHandshake = () => {
    if (!selectedEntity) return;
    
    // Set Pending
    setHandshakes(prev => ({ ...prev, [selectedEntity.id]: 'PENDING' }));
    
    // Simulate Network Request
    setTimeout(() => {
      // Logic: 70% Success Rate for Simulation
      // In a real app, this checks user tier vs entity requirements
      const isAccepted = Math.random() > 0.3; 
      
      setHandshakes(prev => ({ 
        ...prev, 
        [selectedEntity.id]: isAccepted ? 'ACCEPTED' : 'REJECTED' 
      }));
    }, 2500);
  };

  const handleGateSubmit = (type: 'INVESTOR' | 'FOUNDER') => {
    setVerifying(true);
    setVerificationLog([]);
    setGateError(null);

    const steps = [
      'ESTABLISHING SECURE HANDSHAKE...',
      'VALIDATING CRYPTOGRAPHIC SIGNATURES...',
      type === 'INVESTOR' ? 'AUDITING WALLET HISTORY...' : 'ANALYZING BURN RATE & P&L...',
      type === 'INVESTOR' ? 'CHECKING AML/CFT DATABASES...' : 'SCORING MVP TRACTION...',
      'CALCULATING HOLONIC TRUST SCORE...',
      'FINALIZING TIER ASSIGNMENT...'
    ];

    let delay = 0;
    steps.forEach((step, i) => {
      delay += 800; // Slower for effect
      setTimeout(() => {
        setVerificationLog(prev => [...prev, step]);
        
        if (i === steps.length - 1) {
          setTimeout(() => {
             let result;
             if (type === 'INVESTOR') {
                result = verifyInvestorGate(investorForm);
                setUserRole('INVESTOR');
             } else {
                result = verifyFounderGate(founderForm);
                setUserRole('FOUNDER');
             }

             if (result.passed) {
               setUserTier(result.tier);
               setView('DASHBOARD');
             } else {
               setGateError(result.reason || 'VERIFICATION FAILED');
               setVerifying(false); // Stop loading to show error
             }
          }, 1000);
        }
      }, delay);
    });
  };

  // --- VIEWS ---

  if (view === 'LANDING') {
    return (
      <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col md:flex-row font-sans">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
           <button 
             onClick={() => setView('MANIFESTO')}
             className="pointer-events-auto bg-black text-white border border-white/30 px-8 py-3 font-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 uppercase backdrop-blur-md"
           >
             [ Read The Manifesto ]
           </button>
        </div>
        <div 
          className={`relative flex-1 border-r border-white/10 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${hoverSide === 'LEFT' ? 'bg-emerald-950/20' : 'bg-black'}`}
          onMouseEnter={() => setHoverSide('LEFT')} onMouseLeave={() => setHoverSide(null)}
          onClick={() => setView('GATE_CAPITAL')}
        >
          {hoverSide === 'LEFT' && <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />}
          <div className="z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">CAPITAL</h1>
            <p className="font-mono text-xs md:text-sm text-emerald-400/80 tracking-widest uppercase opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
               style={{ opacity: hoverSide === 'LEFT' ? 1 : 0, transform: hoverSide === 'LEFT' ? 'translateY(0)' : 'translateY(10px)' }}>
              &gt; I seek Verified Opportunities
            </p>
          </div>
        </div>
        <div 
          className={`relative flex-1 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${hoverSide === 'RIGHT' ? 'bg-purple-950/20' : 'bg-black'}`}
          onMouseEnter={() => setHoverSide('RIGHT')} onMouseLeave={() => setHoverSide(null)}
          onClick={() => setView('GATE_VISION')}
        >
          {hoverSide === 'RIGHT' && <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />}
          <div className="z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">VISION</h1>
            <p className="font-mono text-xs md:text-sm text-purple-400/80 tracking-widest uppercase transition-all duration-500"
               style={{ opacity: hoverSide === 'RIGHT' ? 1 : 0, transform: hoverSide === 'RIGHT' ? 'translateY(0)' : 'translateY(10px)' }}>
              &gt; I seek Liquidity
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'MANIFESTO') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative">
        <button onClick={() => setView('LANDING')} className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest"><ArrowLeft size={14} /> Back</button>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="text-right space-y-6 opacity-60 hover:opacity-100 transition-opacity">
            <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-500">The Capital Dilemma</h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed">"The noise is deafening. 90% of deals are hype. Verification is slow. I want to deploy capital, not waste time on due diligence."</p>
          </div>
          <div className="h-full flex flex-col items-center justify-center text-center border-x border-white/10 px-8 py-20 relative">
             <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white to-transparent mb-8"></div>
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">TRUST IS<br/>AN ALGORITHM.</h2>
             <p className="font-mono text-xs text-white/60 max-w-xs leading-relaxed mb-12">CORE.PROTOCOL removes human bias. We use cryptographic proofs and financial heuristics to verify entities instantly.</p>
             <button onClick={() => setView('LANDING')} className="bg-white text-black px-8 py-4 font-bold tracking-widest text-sm hover:scale-105 transition-transform">ENTER THE PROTOCOL</button>
             <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white to-transparent mt-8"></div>
          </div>
          <div className="text-left space-y-6 opacity-60 hover:opacity-100 transition-opacity">
            <h3 className="font-mono text-xs uppercase tracking-widest text-purple-500">The Founder Dilemma</h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed">"Gatekeepers are everywhere. I have the metrics, but I can't get the meeting. I need a fast-track to serious liquidity."</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'GATE_CAPITAL' || view === 'GATE_VISION') {
    const isCapital = view === 'GATE_CAPITAL';

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
        <div className="w-full max-w-2xl border border-white/20 bg-black p-8 relative">
           <button onClick={() => setView('LANDING')} className="absolute top-8 right-8 text-white/30 hover:text-white uppercase text-xs">Close</button>
           
           <div className="mb-8">
             <div className="flex items-center gap-3 mb-4 text-white/50">
               <Terminal size={20} />
               <span className="text-xs tracking-widest">SECURE TERMINAL // {isCapital ? 'INV_GATE' : 'FND_GATE'}</span>
             </div>
             <h2 className="text-4xl font-bold tracking-tighter text-white font-sans uppercase">
               {isCapital ? 'Proof of Funds' : 'Project Audit'}
             </h2>
           </div>

           {!verifying ? (
             <div className="space-y-6 animate-in fade-in duration-500">
               {gateError && (
                 <div className="p-4 border border-red-500/50 bg-red-950/20 text-red-400 text-xs mb-4">
                   ERROR: {gateError}
                 </div>
               )}

               {isCapital ? (
                 // INVESTOR FORM
                 <div className="grid grid-cols-1 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-emerald-500">Liquid Assets ($)</label>
                     <input type="number" value={investorForm.liquidity} onChange={e => setInvestorForm({...investorForm, liquidity: Number(e.target.value)})} className="w-full bg-black border border-white/20 p-3 focus:border-emerald-500 focus:outline-none transition-colors" placeholder="0" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-white/50">Source of Funds</label>
                       <select value={investorForm.sourceOfFunds} onChange={e => setInvestorForm({...investorForm, sourceOfFunds: e.target.value})} className="w-full bg-black border border-white/20 p-3 focus:border-emerald-500 focus:outline-none appearance-none">
                         <option>Salary</option><option>Business Divestiture</option><option>Inheritance</option><option>Crypto Alpha</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-white/50">Jurisdiction</label>
                       <select value={investorForm.jurisdiction} onChange={e => setInvestorForm({...investorForm, jurisdiction: e.target.value})} className="w-full bg-black border border-white/20 p-3 focus:border-emerald-500 focus:outline-none appearance-none">
                         <option>UAE</option><option>GCC</option><option>Global</option><option>Restricted</option>
                       </select>
                     </div>
                   </div>
                   <div className="flex gap-6 mt-4">
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 border border-white/40 ${investorForm.kycVerified ? 'bg-emerald-500 border-emerald-500' : ''}`}></div>
                       <input type="checkbox" checked={investorForm.kycVerified} onChange={e => setInvestorForm({...investorForm, kycVerified: e.target.checked})} className="hidden" />
                       <span className="text-xs text-white/60 group-hover:text-white">ID Uploaded (KYC)</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 border border-white/40 ${investorForm.poaVerified ? 'bg-emerald-500 border-emerald-500' : ''}`}></div>
                       <input type="checkbox" checked={investorForm.poaVerified} onChange={e => setInvestorForm({...investorForm, poaVerified: e.target.checked})} className="hidden" />
                       <span className="text-xs text-white/60 group-hover:text-white">Proof of Address</span>
                     </label>
                   </div>
                 </div>
               ) : (
                 // FOUNDER FORM
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                     <label className="text-xs uppercase tracking-widest text-purple-500">Project Name</label>
                     <input type="text" value={founderForm.name} onChange={e => setFounderForm({...founderForm, name: e.target.value})} className="w-full bg-black border border-white/20 p-3 focus:border-purple-500 focus:outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-purple-500">Monthly Revenue ($)</label>
                     <input type="number" value={founderForm.revenue} onChange={e => setFounderForm({...founderForm, revenue: Number(e.target.value)})} className="w-full bg-black border border-white/20 p-3 focus:border-purple-500 focus:outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-purple-500">Monthly Burn ($)</label>
                     <input type="number" value={founderForm.burnRate} onChange={e => setFounderForm({...founderForm, burnRate: Number(e.target.value)})} className="w-full bg-black border border-white/20 p-3 focus:border-purple-500 focus:outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-white/50">Ask Amount ($)</label>
                     <input type="number" value={founderForm.askAmount} onChange={e => setFounderForm({...founderForm, askAmount: Number(e.target.value)})} className="w-full bg-black border border-white/20 p-3 focus:border-purple-500 focus:outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-white/50">MVP Status</label>
                     <select value={founderForm.mvpStatus} onChange={e => setFounderForm({...founderForm, mvpStatus: e.target.value as any})} className="w-full bg-black border border-white/20 p-3 focus:border-purple-500 focus:outline-none appearance-none">
                       <option value="IDEA">Idea</option><option value="PROTOTYPE">Prototype</option><option value="LIVE">Live</option><option value="SCALING">Scaling</option>
                     </select>
                   </div>
                   <div className="md:col-span-2 pt-4 border-t border-white/10 flex justify-between items-center">
                      <label className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 border border-white/40 ${founderForm.debtHistory ? 'bg-red-500 border-red-500' : ''}`}></div>
                       <input type="checkbox" checked={founderForm.debtHistory} onChange={e => setFounderForm({...founderForm, debtHistory: e.target.checked})} className="hidden" />
                       <span className="text-xs text-white/60 group-hover:text-red-400">Previous Debt Default?</span>
                      </label>
                   </div>
                 </div>
               )}
               
               <button 
                 onClick={() => handleGateSubmit(isCapital ? 'INVESTOR' : 'FOUNDER')}
                 className="w-full bg-white text-black py-4 font-bold tracking-widest uppercase hover:bg-white/90 transition-colors mt-6"
               >
                 {isCapital ? 'Execute Financial Audit' : 'Run Risk Analysis'}
               </button>
             </div>
           ) : (
             <div className="h-[400px] border border-white/10 bg-black p-4 overflow-hidden flex flex-col justify-end">
               {verificationLog.map((log, i) => (
                 <div key={i} className="text-xs text-emerald-500 mb-1 font-mono">
                   <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()}</span>
                   {log}
                 </div>
               ))}
               <div className="terminal-cursor text-emerald-500 mt-1"></div>
             </div>
           )}
        </div>
      </div>
    );
  }

  if (view === 'DASHBOARD') {
    const isInvestorView = userRole === 'INVESTOR';
    const activeData = isInvestorView ? MOCK_PROJECTS : MOCK_INVESTORS;
    const filteredData = activeData.filter(item => activeTier === 'ALL' || item.tier === activeTier);

    return (
      <div className="min-h-screen bg-black text-white font-sans flex flex-col">
        <header className="border-b border-white/10 bg-black/90 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-white"></div>
              <h1 className="font-bold tracking-tighter text-xl">CORE.MARKET</h1>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
              <span className="hidden md:inline text-white/50">USER: {userRole} // TIER {userTier}</span>
              <button onClick={() => setView('LANDING')} className="text-white hover:text-red-500 transition-colors">Disconnect</button>
            </div>
          </div>
        </header>

        <div className="border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-end">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">
                  {isInvestorView ? 'VETTED OPPORTUNITIES' : 'LIQUIDITY POOL'}
                </h2>
                <p className="font-mono text-xs text-white/50">
                  {filteredData.length} ENTITIES VERIFIED • NETWORK STATUS: STABLE
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['ALL', 'S', 'A'].map(tier => (
                  <button 
                    key={tier}
                    onClick={() => setActiveTier(tier as Tier)}
                    className={`px-4 py-2 border font-mono text-xs tracking-widest transition-all ${activeTier === tier ? 'bg-white text-black border-white' : 'border-white/20 text-white/50 hover:border-white hover:text-white'}`}
                  >
                    {tier === 'ALL' ? 'ALL' : `TIER ${tier}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 bg-[#050505]">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredData.map((item) => (
               <div 
                  key={item.id} 
                  onClick={() => { setSelectedEntity(item); setView('DETAIL'); }}
                  className={`
                    relative group cursor-pointer transition-all duration-300
                    border bg-black hover:bg-white/5 p-6 flex flex-col justify-between h-[280px]
                    ${item.tier === 'S' ? 'border-emerald-500/30 tier-s-glow' : 'border-white/10 hover:border-white/30'}
                  `}
               >
                 <div>
                   <div className="flex justify-between items-start mb-4">
                     <TierBadge tier={item.tier} />
                     {item.tier === 'S' && <StarIcon />}
                   </div>
                   <h3 className="text-2xl font-bold tracking-tighter leading-none mb-2 text-white group-hover:text-white/90">{item.name}</h3>
                   <div className="font-mono text-xs text-white/50 mb-4 tracking-wider">{(item as any).sector || (item as any).type}</div>
                   <p className="text-sm text-white/60 line-clamp-2 font-light">{isInvestorView ? (item as Project).description : `Verified Capital Source from ${(item as Investor).jurisdiction}`}</p>
                 </div>
                 <div className="pt-4 border-t border-white/10 flex justify-between items-end font-mono">
                   <div>
                     <div className="text-[10px] uppercase text-white/40 mb-1">{isInvestorView ? 'ASKING' : 'LIQUIDITY'}</div>
                     <div className={`text-lg font-bold tracking-tight ${item.tier === 'S' ? 'tier-s-text' : 'text-white'}`}>
                        ${isInvestorView ? (item as Project).askAmount.toLocaleString() : (item as Investor).liquidity.toLocaleString()}
                     </div>
                   </div>
                   <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  }

  if (view === 'DETAIL' && selectedEntity) {
    const isProject = 'askAmount' in selectedEntity;
    const isS = selectedEntity.tier === 'S';
    const status = handshakes[selectedEntity.id] || 'IDLE';

    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative">
         {showDataRoom && <DataRoomModal entity={selectedEntity} onClose={() => setShowDataRoom(false)} />}
         
         {isS && <div className="fixed inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/10 blur-[100px]"></div></div>}

         <div className="max-w-5xl mx-auto relative z-10">
           <button onClick={() => setView('DASHBOARD')} className="mb-12 flex items-center gap-2 text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest"><ArrowLeft size={16} /> Return to Market</button>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2">
               <div className="flex items-center gap-4 mb-6">
                 <TierBadge tier={selectedEntity.tier} />
                 <div className="px-3 py-1 border border-white/20 font-mono text-xs uppercase tracking-widest text-white/60">VERIFIED: {selectedEntity.timestamp}</div>
               </div>
               
               <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8 ${isS ? 'tier-s-text' : 'text-white'}`}>{selectedEntity.name}</h1>
               <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-12">{isProject ? (selectedEntity as Project).description : `Institutional Capital Partner verified via ${ (selectedEntity as Investor).sourceOfFunds }`}</p>

               <div className="border-t border-white/20 pt-8 grid grid-cols-2 gap-8">
                 <div>
                   <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-1">{isProject ? 'Ask Amount' : 'Available Liquidity'}</label>
                   <div className="text-4xl font-bold tracking-tight">${isProject ? (selectedEntity as Project).askAmount.toLocaleString() : (selectedEntity as Investor).liquidity.toLocaleString()}</div>
                 </div>
                 <div>
                    <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-1">{isProject ? 'Monthly Burn' : 'Jurisdiction'}</label>
                    <div className="text-4xl font-bold tracking-tight text-white/70">{isProject ? `$${(selectedEntity as Project).burnRate.toLocaleString()}` : (selectedEntity as Investor).jurisdiction}</div>
                 </div>
               </div>
             </div>

             <div className="border-l border-white/10 pl-12 space-y-8">
               <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest">Hard Evidence</h3>
               <div className="space-y-4">
                 <div className="flex items-start gap-4"><CheckCircle className="text-emerald-500 w-5 h-5 mt-1" /><div><div className="font-bold">Proof of Funds</div><div className="font-mono text-xs text-white/50">Confirmed on-chain</div></div></div>
                 <div className="flex items-start gap-4"><CheckCircle className="text-emerald-500 w-5 h-5 mt-1" /><div><div className="font-bold">Identity (KYC)</div><div className="font-mono text-xs text-white/50">SumSub Verified (Level 3)</div></div></div>
               </div>

               <div className="pt-8 mt-8 border-t border-white/10">
                 {/* HANDSHAKE LOGIC */}
                 {userTier !== 'S' && selectedEntity.tier === 'S' && (
                   <div className="mb-4 flex items-center gap-2 text-amber-500 bg-amber-950/20 p-2 border border-amber-500/20">
                     <AlertTriangle size={16} />
                     <span className="font-mono text-[10px] uppercase">Probability Low (Tier Mismatch)</span>
                   </div>
                 )}

                 {status === 'IDLE' && (
                   <button onClick={initiateHandshake} className="w-full bg-white text-black py-4 font-bold tracking-widest uppercase hover:bg-emerald-400 transition-colors">Initiate Handshake</button>
                 )}

                 {status === 'PENDING' && (
                   <button disabled className="w-full bg-black border border-white/20 text-white py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                     <Loader2 className="animate-spin" /> MINTING ACCESS REQUEST...
                   </button>
                 )}

                 {status === 'ACCEPTED' && (
                   <button onClick={() => setShowDataRoom(true)} className="w-full bg-emerald-500 text-black py-4 font-bold tracking-widest uppercase hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all animate-pulse">
                     [ OPEN DATA ROOM ]
                   </button>
                 )}

                 {status === 'REJECTED' && (
                   <button disabled className="w-full bg-red-950/50 border border-red-500 text-red-500 py-4 font-bold tracking-widest uppercase cursor-not-allowed">
                     ACCESS DENIED
                   </button>
                 )}

                 <p className="font-mono text-[10px] text-white/30 text-center mt-4">Encrypted via CORE.PROTOCOL</p>
               </div>
             </div>
           </div>
         </div>
      </div>
    );
  }

  return <div>Error: Unknown State</div>;
}

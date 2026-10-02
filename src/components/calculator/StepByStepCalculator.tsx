import React, { useState, useMemo } from 'react';
import {
  Building2,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Send,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronRight,
  HelpCircle,
  X,
  FileCheck2,
  Check,
  Zap,
} from 'lucide-react';
import { PRICING_CONFIG } from '../../data/pricingConfig';
import {
  calculateSmallBusinessRange,
  calculatePropertyManagementRange,
  SmallBusinessInputs,
  PropertyManagementInputs,
  CalculationResult,
} from '../../utils/pricingEngine';
import { useCurrency } from '../../context/CurrencyContext';
import { CountryCurrencySelector } from '../common/CountryCurrencySelector';

interface Props {
  onRequestQuoteWithDetails?: (details: any) => void;
  initialService?: 'smallBusiness' | 'propertyManagement';
}

export const StepByStepCalculator: React.FC<Props> = ({
  onRequestQuoteWithDetails,
  initialService = 'smallBusiness',
}) => {
  const { currentCurrency, formatRangeUSD, formatUSD } = useCurrency();

  // Active Service Tab
  const [serviceType, setServiceType] = useState<'smallBusiness' | 'propertyManagement'>(initialService);

  // Small Business Form State
  const [sbState, setSbState] = useState<SmallBusinessInputs>({
    serviceType: 'monthly',
    transactionTier: 'up-to-100',
    bankAccounts: 1,
    creditCards: 0,
    cleanupDuration: '2-3-months',
    selectedScopeIds: [
      'monthlyReconciliation',
      'transactionCategorization',
      'financialStatements',
      'quickbooksSupport',
    ],
  });

  // Property Management Form State
  const [pmState, setPmState] = useState<PropertyManagementInputs>({
    unitTier: '1-10',
    propertyType: 'residential',
    bankAccounts: 1,
    creditCards: 0,
    selectedScopeIds: [
      'accountsPayable',
      'accountsReceivable',
      'bankReconciliation',
      'ownerDistributions',
    ],
  });

  // Modal / Quote Request State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    notes: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Real-time calculation
  const calculation: CalculationResult = useMemo(() => {
    if (serviceType === 'smallBusiness') {
      return calculateSmallBusinessRange(sbState, currentCurrency.code);
    } else {
      return calculatePropertyManagementRange(pmState, currentCurrency.code);
    }
  }, [serviceType, sbState, pmState, currentCurrency]);

  const handleReset = () => {
    setSbState({
      serviceType: 'monthly',
      transactionTier: 'up-to-100',
      bankAccounts: 1,
      creditCards: 0,
      cleanupDuration: '2-3-months',
      selectedScopeIds: [
        'monthlyReconciliation',
        'transactionCategorization',
        'financialStatements',
        'quickbooksSupport',
      ],
    });
    setPmState({
      unitTier: '1-10',
      propertyType: 'residential',
      bankAccounts: 1,
      creditCards: 0,
      selectedScopeIds: [
        'accountsPayable',
        'accountsReceivable',
        'bankReconciliation',
        'ownerDistributions',
      ],
    });
    setQuoteSubmitted(false);
  };

  const toggleScopeItem = (scopeId: string) => {
    if (serviceType === 'smallBusiness') {
      setSbState((prev) => {
        const currentIds = prev.selectedScopeIds || [];
        const exists = currentIds.includes(scopeId);
        return {
          ...prev,
          selectedScopeIds: exists
            ? currentIds.filter((id) => id !== scopeId)
            : [...currentIds, scopeId],
        };
      });
    } else {
      setPmState((prev) => {
        const exists = prev.selectedScopeIds.includes(scopeId);
        return {
          ...prev,
          selectedScopeIds: exists
            ? prev.selectedScopeIds.filter((id) => id !== scopeId)
            : [...prev.selectedScopeIds, scopeId],
        };
      });
    }
  };

  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    setQuoteError(null);

    const breakdownText = calculation.breakdown
      .map((b) => `${b.label}: ${b.minFormatted} – ${b.maxFormatted}`)
      .join(' | ');

    const newSubmission = {
      fullName: quoteFormData.fullName,
      email: quoteFormData.email,
      phone: quoteFormData.phone || 'N/A',
      company: quoteFormData.companyName || 'N/A',
      selectedService: serviceType === 'smallBusiness' ? 'Small Business Bookkeeping' : 'Property Management Bookkeeping',
      selectedPlan: `Calculator Estimate: ${calculation.formattedRange}`,
      currency: `${currentCurrency.code} (${currentCurrency.symbol})`,
      estimatedRange: calculation.formattedRange,
      breakdownSummary: breakdownText,
      message: quoteFormData.notes || 'N/A',
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bookkeep_quotes') || '[]');
      existing.unshift({
        id: 'quote_' + Date.now(),
        ...newSubmission,
        calculation,
        inputs: serviceType === 'smallBusiness' ? sbState : pmState,
      });
      localStorage.setItem('bookkeep_quotes', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save error', err);
    }

    try {
      const response = await fetch('https://formspree.io/f/mbglvrkg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubmission),
      });

      if (response.ok) {
        setQuoteSubmitted(true);
        setQuoteFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          notes: '',
        });
        if (onRequestQuoteWithDetails) {
          onRequestQuoteWithDetails(newSubmission);
        }
      } else {
        const errorJson = await response.json().catch(() => ({}));
        setQuoteError(errorJson?.error || 'Something went wrong. Please try again or contact us directly.');
      }
    } catch (err) {
      setQuoteError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-slate-900 transition-all">
      {/* ── Top Header & Tab Navigation ── */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[11px] font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Pricing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Customize Your Bookkeeping Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Select your business model, transaction volume, and service scope below for an instant, transparent estimate.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto bg-slate-800/90 backdrop-blur p-2 rounded-2xl border border-slate-700/80 shadow-inner">
            <span className="text-xs font-semibold text-slate-300 pl-2">Currency:</span>
            <CountryCurrencySelector variant="dark" />
          </div>
        </div>

        {/* ── Main Category Segment Tabs ── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-2xl">
          <button
            type="button"
            onClick={() => setServiceType('smallBusiness')}
            className={`flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              serviceType === 'smallBusiness'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>Small Business & Startups</span>
          </button>

          <button
            type="button"
            onClick={() => setServiceType('propertyManagement')}
            className={`flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              serviceType === 'propertyManagement'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Property Management & Real Estate</span>
          </button>
        </div>
      </div>

      {/* ── 2-Column Main Workspace ── */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-slate-50/50">
        
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* LEFT COLUMN: INTERACTIVE CONTROLS & SCOPE BUILDER                  */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* ── SMALL BUSINESS CONFIGURATOR ── */}
          {serviceType === 'smallBusiness' && (
            <div className="space-y-6">
              
              {/* 1. Engagement Model (Monthly vs Catch-up) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>Engagement Model</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">Step 1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSbState({ ...sbState, serviceType: 'monthly' })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                      sbState.serviceType === 'monthly'
                        ? 'border-blue-600 bg-blue-50/50 text-slate-900 shadow-md shadow-blue-600/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm">Monthly Bookkeeping</span>
                      {sbState.serviceType === 'monthly' && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Continuous ledger maintenance, reconciliations, and tax-ready monthly close.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSbState({ ...sbState, serviceType: 'cleanup' })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                      sbState.serviceType === 'cleanup'
                        ? 'border-blue-600 bg-blue-50/50 text-slate-900 shadow-md shadow-blue-600/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm">Historical Cleanup</span>
                      {sbState.serviceType === 'cleanup' && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      One-time catch-up project to untangle past-due books and get tax-ready.
                    </p>
                  </button>
                </div>

                {/* Conditional Cleanup Duration */}
                {sbState.serviceType === 'cleanup' && (
                  <div className="mt-4 p-4 bg-amber-50/90 rounded-2xl border border-amber-200 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                      Months of Backlog to Catch Up
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {Object.entries(PRICING_CONFIG.smallBusiness.cleanupDurations).map(([key, val]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSbState({ ...sbState, cleanupDuration: key })}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                            sbState.cleanupDuration === key
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'bg-white text-slate-800 border border-amber-300 hover:bg-amber-100/50'
                          }`}
                        >
                          {val.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Monthly Transaction Tier Chips */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Monthly Transaction Volume</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">Step 2 of 3</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(PRICING_CONFIG.smallBusiness.transactionTiers).map(([key, val]) => {
                    const isSelected = sbState.transactionTier === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSbState({ ...sbState, transactionTier: key })}
                        className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 shadow-md text-blue-900'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="text-xs font-extrabold block">
                          {val.label}
                        </span>
                        <span className={`text-[10px] font-semibold ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                          {key === 'up-to-100' ? 'Starter' : key === '101-300' ? 'Standard' : key === '301-600' ? 'Growth' : 'Enterprise'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Account Counters (Bank Accounts & Credit Cards) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Active Financial Accounts to Reconcile
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bank Accounts Counter */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Bank Accounts</h4>
                      <p className="text-[11px] text-slate-500">Checking, savings, & payroll</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-slate-300 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, bankAccounts: Math.max(1, sbState.bankAccounts - 1) })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-extrabold text-sm text-slate-900">
                        {sbState.bankAccounts}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, bankAccounts: sbState.bankAccounts + 1 })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Credit Cards Counter */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Credit Cards</h4>
                      <p className="text-[11px] text-slate-500">Corporate & founder cards</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-slate-300 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, creditCards: Math.max(0, sbState.creditCards - 1) })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-extrabold text-sm text-slate-900">
                        {sbState.creditCards}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, creditCards: sbState.creditCards + 1 })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── PROPERTY MANAGEMENT CONFIGURATOR ── */}
          {serviceType === 'propertyManagement' && (
            <div className="space-y-6">
              
              {/* 1. Units / Doors Volume Chips */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Portfolio Doors / Unit Count</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">Step 1 of 3</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {Object.entries(PRICING_CONFIG.propertyManagement.unitTiers).map(([key, val]) => {
                    const isSelected = pmState.unitTier === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPmState({ ...pmState, unitTier: key })}
                        className={`p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 shadow-md text-blue-900 font-black'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-bold'
                        }`}
                      >
                        <span className="text-xs block">{val.label}</span>
                        <span className="text-[9px] uppercase font-extrabold text-slate-400">Units</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Property Asset Type */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Primary Property Asset Type</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">Step 2 of 3</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(PRICING_CONFIG.propertyManagement.propertyTypes).map(([key, val]) => {
                    const isSelected = pmState.propertyType === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPmState({ ...pmState, propertyType: key })}
                        className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 shadow-md text-blue-900 font-black'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-bold'
                        }`}
                      >
                        <span className="text-xs block">{val.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Account Counters for PM */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Operating & Trust Accounts
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bank & Trust Accounts Counter */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Operating & Trust Accounts</h4>
                      <p className="text-[11px] text-slate-500">Security deposit & owner funds</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-slate-300 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, bankAccounts: Math.max(1, pmState.bankAccounts - 1) })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-extrabold text-sm text-slate-900">
                        {pmState.bankAccounts}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, bankAccounts: pmState.bankAccounts + 1 })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Credit Cards Counter */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Credit Cards</h4>
                      <p className="text-[11px] text-slate-500">Vendor & maintenance cards</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-slate-300 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, creditCards: Math.max(0, pmState.creditCards - 1) })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-extrabold text-sm text-slate-900">
                        {pmState.creditCards}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, creditCards: pmState.creditCards + 1 })}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── STEP 3: SCOPE & DELIVERABLES ACCORDION GRID ── */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Selected Deliverables & Software Scope</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Step 3 of 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(serviceType === 'smallBusiness'
                ? PRICING_CONFIG.smallBusiness.scopeOfWork
                : PRICING_CONFIG.propertyManagement.scopeOfWork
              ).map((scope) => {
                const isSelected =
                  serviceType === 'smallBusiness'
                    ? (sbState.selectedScopeIds || []).includes(scope.id)
                    : pmState.selectedScopeIds.includes(scope.id);

                return (
                  <div
                    key={scope.id}
                    onClick={() => toggleScopeItem(scope.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50/50 border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-extrabold text-xs text-slate-900">{scope.label}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 tabular-nums ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          +{formatRangeUSD(scope.priceRange.min, scope.priceRange.max)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {scope.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* RIGHT COLUMN: STICKY LIVE ESTIMATE & VALUE CARD                    */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
          
          {/* Main Price Card */}
          <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                  Estimated Investment
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                  {currentCurrency.code}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {calculation.formattedRange}
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  {serviceType === 'smallBusiness' && sbState.serviceType === 'cleanup' ? '/ one-time' : '/ month'}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {serviceType === 'smallBusiness'
                  ? sbState.serviceType === 'monthly'
                    ? 'Includes dedicated certified bookkeeper & monthly reconciliation'
                    : 'One-time catch-up project to bring all books tax-ready'
                  : 'Includes 3-way trust reconciliation & monthly owner distribution reports'}
              </p>
            </div>

            {/* Itemized Live Breakdown */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800/80 space-y-2.5 text-xs">
              <span className="font-bold text-[11px] text-slate-300 uppercase tracking-wider block border-b border-slate-800 pb-2">
                Itemized Workload Breakdown
              </span>
              
              <div className="space-y-2">
                {calculation.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-bold text-slate-200 tabular-nums">
                      {item.isBase ? '' : '+'}
                      {item.minFormatted} – {item.maxFormatted}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Lock In This Price / Get Formal Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset values</span>
                </button>
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No Long-Term Lock-in</span>
                </span>
              </div>
            </div>

            {/* Guarantees Strip */}
            <div className="border-t border-slate-800/80 pt-4 grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>CPA-Audited Work</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>256-bit Encrypted NDA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Assigned Senior Tech</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Response in &lt; 2 Hours</span>
              </div>
            </div>
          </div>

          {/* Hourly Alternative Callout Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-slate-900">
                Need Flexible Hourly Work?
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Hire certified bookkeepers on-demand starting at <strong>{formatRangeUSD(10, 20)}/hour</strong> in blocks of 5, 10, 20, or 40 hours.
              </p>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="text-[11px] font-bold text-blue-600 hover:underline pt-1 inline-block"
              >
                Inquire about hourly blocks →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* POPUP MODAL: REQUEST FORMAL PROPOSAL                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-slate-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {quoteSubmitted ? (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Thank you!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your booking request has been submitted successfully. We will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsQuoteModalOpen(false);
                    setQuoteSubmitted(false);
                  }}
                  className="px-8 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                    Fast & Confidential
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Get Your Official Proposal
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configured for: <strong>{serviceType === 'smallBusiness' ? 'Small Business' : 'Property Management'}</strong> ({calculation.formattedRange})
                  </p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs font-semibold">
                  {quoteError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold animate-fadeIn">
                      {quoteError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={quoteFormData.fullName}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, fullName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">Business Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. sarah@company.com"
                        value={quoteFormData.email}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">Company / Entity Name</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Apex Property LLC"
                        value={quoteFormData.companyName}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, companyName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +1 (555) 019-2834"
                        value={quoteFormData.phone}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1">Specific Software / Notes (Optional)</label>
                    <textarea
                      rows={3}
                      name="message"
                      placeholder="e.g. AppFolio, QuickBooks Online, 2 years behind on taxes, etc."
                      value={quoteFormData.notes}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingQuote}
                    className={`w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 ${
                      isSubmittingQuote ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmittingQuote ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Proposal...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send My Formal Proposal</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    🔒 Strict 2-way NDA protected. We never sell or share your contact data.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

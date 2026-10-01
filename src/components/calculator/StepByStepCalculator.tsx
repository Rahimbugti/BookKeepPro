import React, { useState, useMemo } from 'react';
import {
  Building2,
  Briefcase,
  Layers,
  CheckSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Send,
  Clock,
  ShieldCheck,
  FileText,
  CreditCard,
  Building,
  HelpCircle,
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

  // Wizard state: 1: Service, 2: Workload, 3: Scope, 4: Results, 5: Quote Form
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<'smallBusiness' | 'propertyManagement'>(initialService);

  // Small Business Form State
  const [sbState, setSbState] = useState<SmallBusinessInputs>({
    serviceType: 'monthly',
    transactionTier: 'up-to-100',
    bankAccounts: 1,
    creditCards: 0,
    cleanupDuration: '2-3-months',
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

  // Quote form state
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
    setCurrentStep(1);
    setSbState({
      serviceType: 'monthly',
      transactionTier: 'up-to-100',
      bankAccounts: 1,
      creditCards: 0,
      cleanupDuration: '2-3-months',
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
    setPmState((prev) => {
      const exists = prev.selectedScopeIds.includes(scopeId);
      if (exists) {
        return {
          ...prev,
          selectedScopeIds: prev.selectedScopeIds.filter((id) => id !== scopeId),
        };
      } else {
        return {
          ...prev,
          selectedScopeIds: [...prev.selectedScopeIds, scopeId],
        };
      }
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    if (onRequestQuoteWithDetails) {
      onRequestQuoteWithDetails({
        serviceType: serviceType === 'smallBusiness' ? 'Small Business Bookkeeping' : 'Property Management Bookkeeping',
        calculation,
        inputs: serviceType === 'smallBusiness' ? sbState : pmState,
        contact: quoteFormData,
      });
    }
  };

  const stepTitles = [
    'Choose Service',
    'Enter Workload',
    'Scope & Deliverables',
    'Estimated Price Range',
    'Request Detailed Quote',
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-slate-900 transition-all">
      {/* ── Top Bar with Currency Selector & Step Tracker ── */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
            Interactive Cost Estimation Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Bookkeeping & Accounting Pricing Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Get an instant, transparent price range customized for small businesses and property management portfolios.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto bg-slate-800 p-2 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-300 pl-1">Currency:</span>
          <CountryCurrencySelector variant="dark" />
        </div>
      </div>

      {/* ── Step Progress Indicator ── */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[540px]">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if (stepNum <= Math.max(currentStep, 4)) {
                    setCurrentStep(stepNum);
                  }
                }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : isCompleted
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span
                  className={`text-xs font-bold ${
                    isCurrent
                      ? 'text-blue-700'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {title}
                </span>
                {idx < stepTitles.length - 1 && (
                  <div className="w-8 h-[2px] bg-slate-200 mx-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Wizard Body ── */}
      <div className="p-6 sm:p-10">
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* STEP 1: CHOOSE SERVICE                                              */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                Step 1: Which Service Best Matches Your Business?
              </h3>
              <p className="text-sm text-slate-500">
                Select your primary industry category to customize workload parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Option A: Small Business Bookkeeping */}
              <div
                onClick={() => setServiceType('smallBusiness')}
                className={`p-7 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  serviceType === 'smallBusiness'
                    ? 'border-blue-600 bg-blue-50/40 shadow-lg shadow-blue-600/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-100/60 px-2.5 py-1 rounded-full">
                      Startups & SMBs
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mb-2">
                    Small Business Bookkeeping
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for startups, agencies, e-commerce stores, consultancies, and SMBs requiring monthly reconciliations, P&L statements, or historical backlog cleanups.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Monthly transactions & bank feeds
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> QuickBooks Online / Xero management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Multi-month catch-up cleanups
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Tax-ready financial statements
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Starts at {formatUSD(150)}/mo base</span>
                  <span className="text-blue-600 font-extrabold flex items-center gap-1">
                    Select <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </span>
                </div>
              </div>

              {/* Option B: Property Management Bookkeeping */}
              <div
                onClick={() => setServiceType('propertyManagement')}
                className={`p-7 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  serviceType === 'propertyManagement'
                    ? 'border-blue-600 bg-blue-50/40 shadow-lg shadow-blue-600/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100/60 px-2.5 py-1 rounded-full">
                      Real Estate & HOAs
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mb-2">
                    Property Management Bookkeeping
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Built for property managers, landlords, HOAs, and real estate portfolios operating on AppFolio, Buildium, Rent Manager, or Yardi.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Door / unit-based transaction accounting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> 3-Way trust & escrow reconciliation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Owner statements & monthly distributions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Tenant ledgers & security deposit handling
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Starts at {formatUSD(250)}/mo base</span>
                  <span className="text-blue-600 font-extrabold flex items-center gap-1">
                    Select <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 max-w-4xl mx-auto">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                <span>Continue to Workload Details</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* STEP 2: WORKLOAD PARAMETERS                                         */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {serviceType === 'smallBusiness' ? 'Small Business Workload' : 'Property Portfolio Scale'}
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Step 2: Define Your Volume & Account Workload
              </h3>
              <p className="text-xs text-slate-500">
                Enter your transaction counts, accounts, and cleanup duration if applicable.
              </p>
            </div>

            {/* ── Form Fields for Small Business ── */}
            {serviceType === 'smallBusiness' && (
              <div className="space-y-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs">
                {/* 1. Service Type: Monthly vs Cleanup */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Engagement Model
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSbState({ ...sbState, serviceType: 'monthly' })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        sbState.serviceType === 'monthly'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md'
                          : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-sm">Recurring Monthly Bookkeeping</div>
                      <div className={`text-[11px] mt-1 ${sbState.serviceType === 'monthly' ? 'text-blue-100' : 'text-slate-500'}`}>
                        Ongoing monthly reconciliation & ledger maintenance.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSbState({ ...sbState, serviceType: 'cleanup' })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        sbState.serviceType === 'cleanup'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md'
                          : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-sm">One-Time Cleanup / Catch-up</div>
                      <div className={`text-[11px] mt-1 ${sbState.serviceType === 'cleanup' ? 'text-blue-100' : 'text-slate-500'}`}>
                        Historical backlog reconciliation for taxes or financing.
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Monthly Transactions Tier */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Estimated Monthly Transactions
                  </label>
                  <select
                    value={sbState.transactionTier}
                    onChange={(e) => setSbState({ ...sbState, transactionTier: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(PRICING_CONFIG.smallBusiness.transactionTiers).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Number of Bank & Credit Card Accounts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Bank Accounts to Reconcile
                    </label>
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-300">
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, bankAccounts: Math.max(1, sbState.bankAccounts - 1) })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-extrabold text-sm text-slate-900">
                        {sbState.bankAccounts} {sbState.bankAccounts === 1 ? 'Account' : 'Accounts'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, bankAccounts: sbState.bankAccounts + 1 })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Credit Card Accounts
                    </label>
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-300">
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, creditCards: Math.max(0, sbState.creditCards - 1) })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-extrabold text-sm text-slate-900">
                        {sbState.creditCards} {sbState.creditCards === 1 ? 'Card' : 'Cards'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSbState({ ...sbState, creditCards: sbState.creditCards + 1 })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Cleanup Duration (Conditional) */}
                {sbState.serviceType === 'cleanup' && (
                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                      Backlog Catch-up Time Period (Months behind)
                    </label>
                    <select
                      value={sbState.cleanupDuration}
                      onChange={(e) => setSbState({ ...sbState, cleanupDuration: e.target.value })}
                      className="w-full p-3 rounded-xl border border-amber-300 bg-white font-semibold text-slate-900"
                    >
                      {Object.entries(PRICING_CONFIG.smallBusiness.cleanupDurations).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-amber-800">
                      * Cleanup projects are one-time fixed-scope engagements to bring all records up to date.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── Form Fields for Property Management ── */}
            {serviceType === 'propertyManagement' && (
              <div className="space-y-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs">
                {/* 1. Unit Count Range */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Number of Units / Doors in Portfolio
                  </label>
                  <select
                    value={pmState.unitTier}
                    onChange={(e) => setPmState({ ...pmState, unitTier: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(PRICING_CONFIG.propertyManagement.unitTiers).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Property Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Primary Property Asset Type
                  </label>
                  <select
                    value={pmState.propertyType}
                    onChange={(e) => setPmState({ ...pmState, propertyType: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(PRICING_CONFIG.propertyManagement.propertyTypes).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Bank & Credit Card accounts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Operating / Trust Accounts
                    </label>
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-300">
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, bankAccounts: Math.max(1, pmState.bankAccounts - 1) })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-extrabold text-sm text-slate-900">
                        {pmState.bankAccounts} {pmState.bankAccounts === 1 ? 'Account' : 'Accounts'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, bankAccounts: pmState.bankAccounts + 1 })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Credit Card Accounts
                    </label>
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-300">
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, creditCards: Math.max(0, pmState.creditCards - 1) })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-extrabold text-sm text-slate-900">
                        {pmState.creditCards} {pmState.creditCards === 1 ? 'Card' : 'Cards'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPmState({ ...pmState, creditCards: pmState.creditCards + 1 })}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                <span>Select Scope & Deliverables</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* STEP 3: SCOPE & DELIVERABLES                                        */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                Modular Scope Selection
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Step 3: Choose Required Bookkeeping Services
              </h3>
              <p className="text-xs text-slate-500">
                Select the tasks and deliverables your company wants included in this quote.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRICING_CONFIG.propertyManagement.scopeOfWork.map((scope) => {
                const isSelected =
                  serviceType === 'propertyManagement'
                    ? pmState.selectedScopeIds.includes(scope.id)
                    : true; // Small business bundles core deliverables

                return (
                  <div
                    key={scope.id}
                    onClick={() => {
                      if (serviceType === 'propertyManagement') {
                        toggleScopeItem(scope.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50/60 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{scope.label}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {scope.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                <span>Calculate Estimated Range</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* STEP 4: ESTIMATED PRICE RANGE RESULTS                               */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            {/* Range Highlight Banner */}
            <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-white" /> Live Configured Estimate
              </span>

              <div>
                <p className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-1">
                  Estimated Project Range ({calculation.currency.code})
                </p>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-blue-400 tracking-tight">
                  {calculation.formattedRange}
                </h3>
                <p className="text-xs text-slate-300 mt-2 font-medium">
                  {serviceType === 'smallBusiness' && sbState.serviceType === 'monthly'
                    ? 'Estimated monthly investment for ongoing full-cycle books'
                    : 'Estimated fixed-price project scope investment'}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 max-w-2xl mx-auto text-slate-300 text-xs leading-relaxed">
                <p>
                  <strong>Disclaimer:</strong> {calculation.disclaimer}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Request Detailed Quote</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-all"
                >
                  Adjust Parameters
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3.5 text-slate-400 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                  <span>Start Over</span>
                </button>
              </div>
            </div>

            {/* Itemized Calculation Breakdown Table */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h4 className="font-bold text-sm text-slate-900">
                  Itemized Workload & Scope Breakdown
                </h4>
                <span className="text-xs text-slate-500 font-semibold">
                  Currency: {calculation.currency.code} ({calculation.currency.symbol})
                </span>
              </div>

              <div className="divide-y divide-slate-200/80">
                {calculation.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between text-xs font-semibold"
                  >
                    <span className="text-slate-700">{item.label}</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {item.isBase ? '' : '+'}
                      {item.minFormatted} – {item.maxFormatted}
                    </span>
                  </div>
                ))}

                <div className="pt-4 flex items-center justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Estimated Range:</span>
                  <span className="text-blue-700 text-base tabular-nums">
                    {calculation.formattedRange}
                  </span>
                </div>
              </div>
            </div>

            {/* Flexible Hourly Bookkeeping Alternative Card */}
            <div className="p-6 bg-blue-50/60 rounded-3xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">
                  Flexible Alternative
                </span>
                <h4 className="font-bold text-sm text-slate-900">
                  Prefer Flexible Hourly Bookkeeping?
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  Hire our certified bookkeepers for <strong>{formatRangeUSD(10, 20)}/hour</strong> for ad-hoc support, catch-up tasks, or variable monthly hours (5, 10, 20, 40+ hrs).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-5 py-2.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0"
              >
                Inquire About Hourly Rates →
              </button>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* STEP 5: LEAD / DETAILED QUOTE REQUEST                                */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                Direct Consultation
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Request a Detailed Quote & Consultation
              </h3>
              <p className="text-xs text-slate-500">
                Submit your customized workload to receive an exact formal proposal within 2 hours.
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-lg shadow-emerald-600/20">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-emerald-900">
                  Quote Request Received!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{quoteFormData.fullName}</strong>. We have logged your customized parameters for <strong>{serviceType === 'smallBusiness' ? 'Small Business Bookkeeping' : 'Property Management Bookkeeping'}</strong> ({calculation.formattedRange}). A senior accounting specialist will reach out shortly.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                  >
                    Start New Calculation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs font-semibold">
                {/* Snapshot Preview */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Selected Service:</span>
                    <strong className="text-slate-900">
                      {serviceType === 'smallBusiness' ? 'Small Business Bookkeeping' : 'Property Management Bookkeeping'}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Configured Range:</span>
                    <strong className="text-blue-700">{calculation.formattedRange}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
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
                      required
                      placeholder="e.g. sarah@acmeproperties.com"
                      value={quoteFormData.email}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1">Company / Entity Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Property Management LLC"
                      value={quoteFormData.companyName}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, companyName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2834"
                      value={quoteFormData.phone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Additional Project Details / Software (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Mention current accounting software (AppFolio, QuickBooks, Buildium, Xero), backlog timeline, or specific requirements..."
                    value={quoteFormData.notes}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4 text-black" />
                    <span>Back to Estimate</span>
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Submit Detailed Quote Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

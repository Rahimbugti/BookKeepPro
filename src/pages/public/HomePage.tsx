import React from 'react';
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  Clock,
  Star,
  FileText,
  CreditCard,
  Zap,
  Lock,
  Globe,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCurrency } from '../../context/CurrencyContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';
import { StepByStepCalculator } from '../../components/calculator/StepByStepCalculator';

export const HomePage: React.FC = () => {
  const { navigate } = useApp();
  const { currentCurrency, formatRangeUSD } = useCurrency();

  const scrollToCalculator = () => {
    const el = document.getElementById('home-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('calculator');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Main Headline */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Specialized B2B Financial Accounting
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Reliable Bookkeeping for{' '}
                <span className="text-blue-600 underline decoration-blue-300 decoration-4 underline-offset-4">
                  Small Businesses
                </span>{' '}
                & Property Management Companies
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Accurate, organized, and reliable bookkeeping services designed to help you understand your finances, streamline month-end closes, and focus on growing your business.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToCalculator}
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-white" />
                  <span>Calculate Your Estimate</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="px-8 py-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-sm uppercase tracking-wider transition-all"
                >
                  Get a Free Consultation
                </button>
              </div>

              {/* Trust Metrics Bar */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <h4 className="text-2xl font-black text-slate-900">4 Countries</h4>
                  <p className="text-xs text-slate-500 font-medium">USA, Canada, Australia, UK</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-blue-600">99.8%</h4>
                  <p className="text-xs text-slate-500 font-medium">Reconciliation Accuracy</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900">&lt; 24 Hrs</h4>
                  <p className="text-xs text-slate-500 font-medium">Turnaround Time</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card Feature Graphics */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                      LS
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Live Client Dashboard</h4>
                      <p className="text-[11px] text-slate-400">AppFolio • QBO • Buildium Sync</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full">
                    ● Audit Ready
                  </span>
                </div>

                {/* Service Highlights Cards */}
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-900">Small Business Monthly Books</p>
                        <p className="text-[11px] text-slate-500">P&L, Balance Sheet, Bank Recs</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600">Active</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-900">Property Trust Accounting</p>
                        <p className="text-[11px] text-slate-500">3-Way Escrow & Security Deposits</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600">Compliant</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-900">Multi-Month Backlog Cleanup</p>
                        <p className="text-[11px] text-slate-500">Historical cleanup for taxes/financing</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600">One-Time</span>
                  </div>
                </div>

                {/* Hourly rate banner */}
                <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase block">Flexible Option</span>
                    <p className="font-extrabold text-xs text-slate-900">Hourly Bookkeeping Support</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-blue-700">{formatRangeUSD(10, 20)}/hr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CORE CAPABILITIES OVERVIEW SECTION ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Comprehensive Financial Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Four Core Pillars of Our Practice
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you manage 10 rental units or run a multi-channel e-commerce firm, our certified team handles your daily bookkeeping with zero stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Monthly Bookkeeping */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Monthly Bookkeeping</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monthly transaction categorization, bank reconciliations, accounts payable, accounts receivable, and ongoing general ledger accuracy.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('small-business')}
                className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Learn More</span> <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

            {/* Pillar 2: Property Management */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Property Management</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Full-cycle accounting for AppFolio, Buildium, and Rent Manager. Security deposit trust reconciliations, owner statements, and tenant ledgers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('property-management')}
                className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Learn More</span> <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

            {/* Pillar 3: Catch-up & Cleanup */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Cleanup & Catch-up</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Behind on your books? We untangle multi-month or multi-year backlogs, reconcile missing bank feeds, and deliver clean, audit-ready financials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('services')}
                className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Learn More</span> <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

            {/* Pillar 4: Financial Reporting */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Financial Reporting</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Executive-level Profit & Loss, Balance Sheets, Cash Flow statements, and Year-End 1099 contractor prep tailored for your CPA or tax advisor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('services')}
                className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Learn More</span> <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. EMBEDDED PRICING CALCULATOR ── */}
      <section id="home-calculator" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Instant Estimation Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Calculate Your Project or Monthly Range
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Use our step-by-step interactive calculator below to select your workload, property count, and required services.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <StepByStepCalculator onRequestQuoteWithDetails={() => navigate('contact')} />
          </div>
        </div>
      </section>

      {/* ── 4. HOURLY VS FIXED-PRICE PRICING MODELS ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Two Flexible Engagement Models
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Transparent, Predictable Pricing
            </h2>
            <p className="text-sm text-slate-600">
              Choose between flexible hourly support and customized fixed-price project estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Model A: Hourly */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
                  Flexible Hourly
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-3">Hourly Bookkeeping</h3>
                <div className="my-4">
                  <span className="text-4xl font-extrabold text-blue-600">
                    {formatRangeUSD(10, 20)}
                  </span>
                  <span className="text-slate-500 font-semibold text-xs ml-1">/ hour</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal for business owners who need flexible on-demand support, weekly check-ins, or variable monthly hours (5, 10, 20, 30, 40+ hours).
                </p>
                <ul className="mt-6 space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Time-tracked via verified timesheets</li>
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Dedicated certified bookkeeper assigned</li>
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Weekly progress & transaction reports</li>
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> No long-term lock-in contract</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="mt-8 w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider"
              >
                Inquire for Hourly Support
              </button>
            </div>

            {/* Model B: Fixed-Price Project Estimates */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                  Custom Fixed-Price
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-3">Fixed-Price Projects</h3>
                <div className="my-4">
                  <span className="text-2xl font-black text-slate-900">Custom Workload Range</span>
                  <span className="text-slate-500 font-semibold text-xs block mt-1">Based on exact transaction & account volume</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal for monthly recurring engagements and one-time cleanup backlogs. Receive a clear, agreed-upon price range with zero surprise fees.
                </p>
                <ul className="mt-6 space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Pre-agreed scope and deliverables</li>
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Fixed monthly or milestone billing</li>
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Complete month-end close guarantee</li>
                  <li className="flex items-center gap-2"><span className="text-black">✓</span> Full financial statements included</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('calculator')}
                className="mt-8 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/20"
              >
                Launch Price Range Calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SOFTWARE INTEGRATIONS ── */}
      <section className="py-16 bg-white border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Specialized in Leading Industry Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
            <span className="font-extrabold text-lg text-slate-800 tracking-tight">AppFolio Property Manager</span>
            <span className="font-extrabold text-lg text-slate-800 tracking-tight">QuickBooks Online (QBO)</span>
            <span className="font-extrabold text-lg text-slate-800 tracking-tight">Buildium</span>
            <span className="font-extrabold text-lg text-slate-800 tracking-tight">Xero Accounting</span>
            <span className="font-extrabold text-lg text-slate-800 tracking-tight">Rent Manager</span>
            <span className="font-extrabold text-lg text-slate-800 tracking-tight">Wave Accounting</span>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS & CASE REVIEWS ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Client Satisfaction
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Trusted by 250+ Companies Globally
            </h2>
            <p className="text-sm text-slate-600">
              Read how property managers and small business owners maintain flawless books.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-1 text-slate-900">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black fill-black" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "LedgerSync Pro completely untangled our 8-month AppFolio backlog. Their 3-way trust account reconciliation passed our annual state audit with flying colors."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-xs text-slate-900">David Reynolds</p>
                <p className="text-[11px] text-slate-400">Owner, Apex Real Estate Management • USA</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-1 text-slate-900">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black fill-black" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Having flexible hourly bookkeeping at $15/hr allows our digital agency to keep QuickBooks Online perfectly updated without hiring an in-house bookkeeper."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-xs text-slate-900">Elena Rostova</p>
                <p className="text-[11px] text-slate-400">Founder, CloudScale Digital • Canada</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-1 text-slate-900">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black fill-black" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "We manage 120 residential doors in Sydney. Their monthly owner statement preparation and contractor AP disbursements save our team 35 hours every single month."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-xs text-slate-900">Marcus Sterling</p>
                <p className="text-[11px] text-slate-400">Managing Director, Harbor Living Properties • Australia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
};

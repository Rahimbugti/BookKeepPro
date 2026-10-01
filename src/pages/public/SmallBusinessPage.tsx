import React from 'react';
import {
  Briefcase,
  CheckCircle2,
  FileText,
  CreditCard,
  Zap,
  Calculator,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCurrency } from '../../context/CurrencyContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';
import { StepByStepCalculator } from '../../components/calculator/StepByStepCalculator';

export const SmallBusinessPage: React.FC = () => {
  const { navigate } = useApp();
  const { formatRangeUSD, formatUSD } = useCurrency();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
              Dedicated SMB Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Small Business Bookkeeping & Financial Reporting
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Designed specifically for founders, e-commerce sellers, agencies, and professional service firms across the US, Canada, Australia, and UK. Accurate monthly closes, tax-ready financials, and expert QuickBooks management.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('sb-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-white" />
                <span>Calculate SMB Price Range</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="px-6 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Request Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Features ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Monthly General Ledger</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank & credit card reconciliation, merchant processor fee categorization (Stripe/PayPal), and payroll journal entries with zero missing transactions.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Historical Catch-up Cleanup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Months or years behind? We untangle messy accounting records, clean up duplicate items, and produce audit-ready financial statements for tax filing.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Executive Financial Statements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive standardized monthly Balance Sheets, Profit & Loss reports by department/product, and cash flow forecasts delivered by the 10th of each month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator Section ── */}
      <section id="sb-calculator" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Live Estimation
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Small Business Bookkeeping Cost Calculator
            </h2>
            <p className="text-xs text-slate-500">
              Choose your transaction tier and account count to see an estimated monthly or project price range.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <StepByStepCalculator initialService="smallBusiness" onRequestQuoteWithDetails={() => navigate('contact')} />
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
};

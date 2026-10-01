import React from 'react';
import { Calculator, ShieldCheck, ArrowRight, Clock, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCurrency } from '../../context/CurrencyContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';
import { StepByStepCalculator } from '../../components/calculator/StepByStepCalculator';
import { CountryCurrencySelector } from '../../components/common/CountryCurrencySelector';

export const CalculatorPage: React.FC = () => {
  const { navigate } = useApp();
  const { currentCurrency, formatRangeUSD } = useCurrency();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Top Header Title ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Interactive Cost Estimation Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Bookkeeping & Accounting Pricing Calculator
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Configure your exact business requirements, transaction volume, or property unit counts below to receive a real-time price range.
          </p>
        </div>
      </section>

      {/* ── Calculator Component Container ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full space-y-8">
        <StepByStepCalculator onRequestQuoteWithDetails={() => navigate('contact')} />

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-black" />
              <span>Looking for Flexible Hourly Billing?</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your workload varies or you need on-demand monthly check-ins, our certified bookkeepers are available at <strong>{formatRangeUSD(10, 20)}/hour</strong>. Purchase hours in 5, 10, 20, 30, or 40-hour blocks.
            </p>
            <button
              type="button"
              onClick={() => navigate('pricing')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View Hourly Pricing Models →
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>How We Guarantee Accuracy</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All client engagements are assigned a dedicated senior bookkeeper and audited by a certified supervisor prior to month-end delivery. We sign bilateral Non-Disclosure Agreements (NDAs).
            </p>
            <button
              type="button"
              onClick={() => navigate('about')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Learn About Our Quality Process →
            </button>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
};

import React from 'react';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  FileText,
  CreditCard,
  Calculator,
  ArrowRight,
  Layers,
  Lock,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCurrency } from '../../context/CurrencyContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';
import { StepByStepCalculator } from '../../components/calculator/StepByStepCalculator';
import { AppFolioServices } from '../../components/AppFolioServices';

export const PropertyManagementPage: React.FC = () => {
  const { navigate } = useApp();
  const { formatRangeUSD, formatUSD } = useCurrency();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
              Property Management Specialists
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              AppFolio, Buildium & Real Estate Trust Bookkeeping
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Full-cycle property management accounting designed for residential landlords, commercial property managers, HOAs, and short-term rental hosts. Zero escrow co-mingling, strict 3-way reconciliations, and timely owner packets.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('pm-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-white" />
                <span>Estimate Door / Unit Price Range</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="px-6 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Consult a PMS Specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Property Pillars ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">3-Way Trust & Escrow Reconciliations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We perform mandatory 3-way reconciliations matching bank statements, general ledger balances, and tenant security deposit sub-ledgers to guarantee strict state board compliance.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Owner Statements & Net Distributions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated rent roll allocation, management fee deduction calculations, maintenance invoice matching, and monthly distribution report packages delivered to your property owners.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Tenant Ledgers & Move-out Accounting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accurate recording of lease agreements, security deposit refunds within statutory deadlines, itemized repair chargebacks, and delinquent account monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AppFolio Integration Component ── */}
      <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <AppFolioServices />
        </div>
      </section>

      {/* ── Calculator Section ── */}
      <section id="pm-calculator" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Live Estimation
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Property Management Accounting Cost Calculator
            </h2>
            <p className="text-xs text-slate-500">
              Configure your unit count, property category, and selected scope of work to see an estimated price range.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <StepByStepCalculator initialService="propertyManagement" onRequestQuoteWithDetails={() => navigate('contact')} />
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
};

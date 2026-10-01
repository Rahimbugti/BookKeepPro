import React from 'react';
import {
  Clock,
  Briefcase,
  Building2,
  CheckCircle2,
  Calculator,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCurrency } from '../../context/CurrencyContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';
import { CountryCurrencySelector } from '../../components/common/CountryCurrencySelector';

export const PricingPage: React.FC = () => {
  const { navigate } = useApp();
  const { currentCurrency, formatRangeUSD, formatUSD } = useCurrency();

  const hourPackages = [
    { hours: 5, label: '5 Hours / Month', desc: 'Light weekly check-ins & reconciliation oversight' },
    { hours: 10, label: '10 Hours / Month', desc: 'Standard support for micro-businesses & single landlords' },
    { hours: 20, label: '20 Hours / Month', desc: 'Active small businesses with regular AP/AR & bank recs' },
    { hours: 30, label: '30 Hours / Month', desc: 'Growing property managers with 30–60 rental doors' },
    { hours: 40, label: '40 Hours / Month', desc: 'Dedicated half-time bookkeeper handling full operations' },
    { hours: '40+', label: '40+ Hours / Custom', desc: 'Full-time dedicated bookkeeper or enterprise team' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Clear & Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Predictable Bookkeeping Rates
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Choose between flexible hourly bookkeeping support and customized fixed-price project estimates. Zero hidden charges, cancel anytime.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 pl-2">Displaying Currency:</span>
            <CountryCurrencySelector variant="inline" />
          </div>
        </div>
      </section>

      {/* ── Model 1: Hourly vs Fixed-Price Cards ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Model A: Hourly Support */}
            <div className="bg-slate-50/70 p-8 sm:p-10 rounded-3xl border-2 border-slate-200 flex flex-col justify-between space-y-6 hover:border-blue-300 transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 uppercase bg-blue-100/70 px-3 py-1 rounded-full">
                    Model 1: Flexible Support
                  </span>
                  <Clock className="w-5 h-5 text-black" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mt-4">
                  Hourly Bookkeeping
                </h3>

                <div className="my-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">
                      {formatRangeUSD(10, 20)}
                    </span>
                    <span className="text-slate-500 font-bold text-sm">/ hour</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Base rate $10–$20 USD/hr converted to {currentCurrency.code}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Our hourly bookkeeping services allow you to purchase hours on an as-needed or recurring monthly basis. Perfect for clients with fluctuating workloads, special catch-up sprints, or light weekly reconciliation oversight.
                </p>

                {/* Common hour block requests */}
                <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Available Monthly Hour Packages
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {hourPackages.map((pkg, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <span className="font-extrabold text-xs text-slate-900 block">{pkg.hours} Hrs</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Flexible</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Inquire for Hourly Bookkeeper
                </button>
              </div>
            </div>

            {/* Model B: Fixed-Price Projects & Estimates */}
            <div className="bg-blue-50/50 p-8 sm:p-10 rounded-3xl border-2 border-blue-500 flex flex-col justify-between space-y-6 shadow-xl shadow-blue-600/10">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 uppercase bg-blue-100 px-3 py-1 rounded-full">
                    Model 2: Fixed-Price Scope
                  </span>
                  <Calculator className="w-5 h-5 text-black" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mt-4">
                  Fixed-Price Projects
                </h3>

                <div className="my-5">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    Custom Workload Range
                  </div>
                  <span className="text-slate-500 font-semibold text-xs block mt-1">
                    Pegged to transactions, accounts & property units
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Prefer a guaranteed, fixed monthly or one-time project cost? Use our interactive calculator to see an estimated price range based on your exact transaction counts, bank accounts, and scope of work.
                </p>

                <div className="mt-6 p-4 bg-white rounded-2xl border border-blue-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">
                    Why Choose Fixed-Price?
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
                    <li className="flex items-center gap-2"><span className="text-black">✓</span> 100% predictable monthly accounting budget</li>
                    <li className="flex items-center gap-2"><span className="text-black">✓</span> No tracking or monitoring of hourly logs</li>
                    <li className="flex items-center gap-2"><span className="text-black">✓</span> Includes all monthly statements & CPA exports</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200">
                <button
                  type="button"
                  onClick={() => navigate('calculator')}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-white" />
                  <span>Use Pricing Calculator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Important Pricing Rules & Disclaimers ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Pricing Transparency & Guidelines
            </h3>
            <p className="text-xs text-slate-500">
              How our billing and cost estimation workflows operate.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong>1. Estimated Pricing Ranges:</strong> Our online calculator provides estimated project price ranges to help you budget approximately what services will cost before initiating onboarding.
            </p>
            <p>
              <strong>2. Scope Verification:</strong> Final pricing may vary depending on the actual scope, transaction complexity, records condition, and specialized software setup required.
            </p>
            <p>
              <strong>3. Cleanup is One-Time:</strong> Catch-up bookkeeping projects are always priced as one-time milestones, never locked into forced long-term subscriptions.
            </p>
            <p>
              <strong>4. Multi-Currency Support:</strong> All prices are natively pegged to USD and converted in real-time for clients in Canada (CAD), Australia (AUD), and the United Kingdom (GBP).
            </p>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
};

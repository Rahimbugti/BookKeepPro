import React from 'react';
import { BarChart2, Zap, Lock } from 'lucide-react';

/**
 * Hero section matching VPM Solutions screenshot:
 * - Left column with pink subtext badge, bold title with blue accent, and dual CTAs
 * - Right column with floating interactive dashboard cards & colored circular status badges
 */
export function HeroSection({ onGetStarted, onExploreCalculator }) {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Left Column: Headline & Action ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pink Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-[#E60050] text-xs font-heading font-black tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E60050] animate-ping" />
              All-In-One Bookkeeping Platform
            </div>

            {/* Main Headline with Blue Highlight */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#0E0E0E] tracking-tight leading-[1.08]">
              One Platform for{' '}
              <span className="text-[#3B49DF] underline decoration-[#FFC700] decoration-4 underline-offset-4">
                Accurate Books
              </span>{' '}
              and More!
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              From daily bank reconciliations and cleanups to full-cycle property management trust accounting. Predictable monthly pricing tailored to your exact portfolio.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onGetStarted}
                className="px-8 py-3.5 rounded-full bg-[#E60050] hover:bg-[#D00045] active:scale-95 text-white font-heading font-black text-sm uppercase tracking-wider shadow-xl shadow-pink-500/25 transition-all"
              >
                GET STARTED
              </button>
              <button
                type="button"
                onClick={onExploreCalculator}
                className="px-8 py-3.5 rounded-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-heading font-black text-sm uppercase tracking-wider transition-all"
              >
                CALCULATE PRICE
              </button>
            </div>
          </div>

          {/* ── Right Column: Floating Dashboard Mockup Graphics ── */}
          <div className="lg:col-span-6 relative">
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative space-y-4">
              {/* Top Dashboard Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/90 p-5 sm:p-6 overflow-hidden">
                {/* Green Status Badge Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  ✓
                </div>

                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-black uppercase text-gray-900 tracking-wider">
                      Live Financial Dashboard
                    </h4>
                    <span className="text-[11px] text-gray-400">Real-time sync • AppFolio & QBO</span>
                  </div>
                </div>

                {/* Micro Metric Bars */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Bank Feeds</span>
                    <span className="font-heading font-black text-base text-gray-900">100% Synced</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 block">Audit Score</span>
                    <span className="font-heading font-black text-base text-emerald-700">99.8%</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">Close Time</span>
                    <span className="font-heading font-black text-base text-blue-700">24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: 2 Split Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Yellow Badge Card */}
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/90 p-4">
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#FFC700] text-black flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-black fill-black" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    Catch-Up Cleanup
                  </span>
                  <div className="font-heading font-black text-lg text-gray-900">
                    Historical Backlog
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Multi-month bank reconciliations categorized and CPA ready.
                  </p>
                </div>

                {/* Purple Badge Card */}
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/90 p-4">
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    Trust Accounting
                  </span>
                  <div className="font-heading font-black text-lg text-gray-900">
                    Security Deposit Trust
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Full three-way trust account reconciliation & compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

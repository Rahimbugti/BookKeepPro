import React from 'react';

/**
 * Platform Video / Interactive Showcase matching VPM screenshot
 */
export function PlatformPreview({ onGetStarted }) {
  return (
    <section id="platform" className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
        {/* Title */}
        <h2 className="font-heading text-2xl sm:text-4xl font-black text-[#0E0E0E] tracking-tight max-w-3xl mx-auto leading-tight">
          See How the BookKeepPro Platform Helps You Reconcile, Manage, and Scale Your Financials
        </h2>

        {/* Dashboard Browser Frame Mockup */}
        <div className="mt-10 relative bg-white rounded-3xl border-4 border-gray-900 shadow-2xl p-4 sm:p-8 overflow-hidden max-w-4xl mx-auto">
          {/* Browser Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="bg-gray-100 rounded-lg px-4 py-1 text-xs font-mono text-gray-500">
              app.bookkeeppro.com/dashboard
            </div>
            <div className="w-12" />
          </div>

          {/* Central Showcase Card */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 sm:p-10 relative">
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E60050] to-[#FF457E] text-white flex items-center justify-center font-heading font-black text-2xl mx-auto shadow-xl shadow-pink-500/20">
                BKP
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-gray-900">
                BOOKKEEPPRO SOLUTIONS
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Automated Bank Ingestion • 3-Way Trust Reconciliations • AppFolio & Buildium Sync • Month-End Financial Reporting
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="px-6 py-3 rounded-full bg-[#E60050] hover:bg-[#D00045] text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all"
                >
                  START FREE ASSESSMENT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Sub-Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onGetStarted}
            className="px-7 py-3 rounded-full bg-[#E60050] hover:bg-[#D00045] text-white font-heading font-black text-xs uppercase tracking-wider shadow-md transition-all"
          >
            GET STARTED
          </button>
          <a
            href="#calculator-section"
            className="px-7 py-3 rounded-full border border-gray-400 hover:border-gray-900 text-gray-800 font-heading font-black text-xs uppercase tracking-wider transition-all"
          >
            SEE PRICING
          </a>
        </div>
      </div>
    </section>
  );
}

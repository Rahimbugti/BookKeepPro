import React from 'react';

/**
 * Price Summary Card component
 * Designed with bold VPM dark theme, glowing yellow price, and hot pink CTA
 */
export function PriceSummary({
  calculationResult,
  serviceName,
  onRequestQuote,
}) {
  const { total = 0, breakdown = [] } = calculationResult || {};

  return (
    <div className="bg-[#0E0E0E] text-white rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-7 flex flex-col justify-between sticky top-24 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#E60050]/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 pb-5 border-b border-white/10 mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC700] block mb-1">
              Live Calculation
            </span>
            <h3 className="font-heading text-lg font-black text-white">
              Estimated Price
            </h3>
            <p className="text-xs text-white/50 font-medium">
              {serviceName}
            </p>
          </div>
          <span className="text-[11px] font-heading font-black text-white bg-[#E60050] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Instant
          </span>
        </div>

        {/* Big Price Display */}
        <div className="bg-[#181818] rounded-2xl p-6 border border-white/5 text-center mb-6 relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#FFC700] to-transparent" />
          <p className="text-[11px] font-black uppercase tracking-widest text-white/50 mb-1">
            Total Estimated Investment
          </p>
          <div className="flex items-baseline justify-center gap-1 my-2">
            <span className="font-heading text-4xl sm:text-5xl font-black text-[#FFC700] tracking-tight">
              ${total.toLocaleString()}
            </span>
          </div>
          <p className="text-xs font-semibold text-white/70">
            Fixed transparent pricing • No hidden fees
          </p>
        </div>

        {/* Dynamic Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-white/40 px-1">
            <span>Itemized Scope</span>
            <span>Fee</span>
          </div>

          <div className="divide-y divide-white/5 bg-[#181818] rounded-2xl p-4 border border-white/5 space-y-2">
            {breakdown.map((item, idx) => (
              <div
                key={idx}
                className="pt-2 first:pt-0 flex items-center justify-between text-xs"
              >
                <span className="text-white/80 font-medium">
                  {item.label}
                </span>
                <span className="font-heading font-black text-white tabular-nums">
                  {item.isBase ? '' : '+'}${item.amount}
                </span>
              </div>
            ))}

            {/* Subtotal line */}
            <div className="pt-3 mt-2 flex items-center justify-between text-sm font-black border-t border-white/10">
              <span className="text-white">Estimated Total</span>
              <span className="font-heading text-[#FFC700] text-lg tabular-nums">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl text-white/40 text-[11px] leading-relaxed mb-6">
          <p>
            <strong className="text-white/70">Note:</strong> This is a real-time estimate. Final pricing may vary based on transaction complexity and specialized cleanup scope.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          id="btn-request-quote"
          onClick={onRequestQuote}
          className="w-full py-4 px-6 rounded-full bg-[#E60050] hover:bg-[#D00045] active:scale-[0.98] text-white font-heading font-black text-xs uppercase tracking-wider shadow-xl shadow-pink-500/25 transition-all flex items-center justify-center gap-2 focus:outline-none"
        >
          <span>REQUEST A FORMAL QUOTE</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

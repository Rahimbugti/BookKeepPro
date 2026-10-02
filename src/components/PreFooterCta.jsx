import React from 'react';

/**
 * PreFooter CTA Banner with rounded top matching VPM screenshot
 */
export function PreFooterCta({ onGetStarted }) {
  return (
    <section className="bg-white pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#141414] text-white rounded-t-[40px] px-6 sm:px-12 py-16 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E60050]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Get Started with BookKeepPro Solutions
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
              Let us show you how you can eliminate backlog, automate reconciliations, and scale your financial operations starting today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={onGetStarted}
                className="px-8 py-4 rounded-full bg-[#E60050] hover:bg-[#D00045] active:scale-95 text-white font-heading font-black text-xs uppercase tracking-wider shadow-xl shadow-pink-500/25 transition-all"
              >
                GET STARTED
              </button>
              <button
                type="button"
                onClick={onGetStarted}
                className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#141414] font-heading font-black text-xs uppercase tracking-wider transition-all"
              >
                SCHEDULE A CALL
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

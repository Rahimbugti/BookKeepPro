import React from 'react';

/**
 * Royal Blue Challenge Section matching VPM screenshot
 */
export function BlueChallengeSection({ onGetStarted }) {
  return (
    <section className="bg-[#3B49DF] text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Details */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              We Solve the Challenge of Accurate Books & Great Financial Talent
            </h2>
            
            <ul className="space-y-3 text-sm sm:text-base text-blue-100/95 font-medium leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-white text-[#3B49DF] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Elite QuickBooks ProAdvisor & AppFolio certified bookkeeping specialists.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-white text-[#3B49DF] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Daily transaction categorizations and 3-way security deposit reconciliations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-white text-[#3B49DF] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Zero overhead, no payroll burden, and predictable monthly fixed rates.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onGetStarted}
                className="px-8 py-3.5 rounded-full bg-[#FFC700] hover:bg-[#F0BB00] text-[#0E0E0E] font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-black/20 transition-all"
              >
                GET STARTED
              </button>
              <a
                href="#calculator-section"
                className="px-8 py-3.5 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#3B49DF] font-heading font-black text-xs uppercase tracking-wider transition-all"
              >
                VIEW PRICING
              </a>
            </div>
          </div>

          {/* Right Column: Visual Card with Pink Accent */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Pink Accent Box */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-2xl bg-[#E60050] z-20 shadow-lg hidden sm:block" />

            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl w-full max-w-md">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#3B49DF] flex items-center justify-center font-heading font-black text-xl shadow-md">
                    💼
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-black text-white">
                      Dedicated Bookkeeper
                    </h4>
                    <span className="text-xs text-blue-200">Assigned specifically to your business</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-blue-200 font-semibold">
                    <span>Average Onboarding:</span>
                    <span className="text-white font-bold">&lt; 48 Hours</span>
                  </div>
                  <div className="flex justify-between text-blue-200 font-semibold">
                    <span>Audit Accuracy:</span>
                    <span className="text-[#FFC700] font-bold">100% Guaranteed</span>
                  </div>
                  <div className="flex justify-between text-blue-200 font-semibold">
                    <span>Reporting Frequency:</span>
                    <span className="text-white font-bold">Weekly & Monthly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

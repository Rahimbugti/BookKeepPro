import React from 'react';

/**
 * Purple Global Reach Section matching VPM screenshot
 */
export function PurpleGlobalSection({ onGetStarted }) {
  return (
    <section className="bg-[#7C3AED] text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#FFC700]">
              Global Financial Talent
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Work Without Limits. Build Your Financial Back-Office Anywhere.
            </h2>

            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-xl">
              Gain access to top-tier, US-trained bookkeepers, CPA associates, and property management accountants ready to integrate into your software ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onGetStarted}
                className="px-8 py-3.5 rounded-full bg-[#FFC700] hover:bg-[#F0BB00] text-[#0E0E0E] font-heading font-black text-xs uppercase tracking-wider shadow-xl shadow-black/20 transition-all"
              >
                GET STARTED
              </button>
              <button
                type="button"
                onClick={onGetStarted}
                className="px-8 py-3.5 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#7C3AED] font-heading font-black text-xs uppercase tracking-wider transition-all"
              >
                SCHEDULE DEMO
              </button>
            </div>
          </div>

          {/* Right Column: World Map with Team Avatars Graphic */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl relative">
              {/* World Graphic Simulation */}
              <div className="text-center py-6">
                <div className="text-6xl mb-4">🌍</div>
                <h4 className="font-heading text-xl font-black text-white">
                  Nationwide & Global Support
                </h4>
                <p className="text-xs text-purple-200 mt-2 max-w-xs mx-auto">
                  50 States US GAAP Compliance • Multi-Currency • 24/7 Coverage
                </p>

                {/* Team Pin Badges */}
                <div className="flex justify-center gap-3 mt-6">
                  <span className="w-10 h-10 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                    US
                  </span>
                  <span className="w-10 h-10 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                    CA
                  </span>
                  <span className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                    UK
                  </span>
                  <span className="w-10 h-10 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                    AU
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

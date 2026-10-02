import React from 'react';

/**
 * Yellow "Why Companies Choose Us" Section matching VPM screenshot
 */
export function YellowWhyUsSection() {
  const testimonials = [
    {
      name: 'Charles Armstrong',
      role: 'Armstrong Realty Group',
      tag: '500+ Doors',
      avatar: 'CA',
    },
    {
      name: 'David Patel',
      role: 'Patel Commercial Ventures',
      tag: 'Small Business',
      avatar: 'DP',
    },
    {
      name: 'Sarah Miller',
      role: 'Apex Property Management',
      tag: '1,200+ Doors',
      avatar: 'SM',
    },
  ];

  return (
    <section id="why-us" className="bg-[#FFC700] text-[#0E0E0E] py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Why Companies Choose BookKeepPro
          </h2>
          <p className="text-sm sm:text-base text-gray-900 font-semibold mt-3 leading-relaxed">
            Real feedback from property managers and small business founders who eliminated bookkeeping stress and saved 15+ hours each week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 3 Testimonial Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 shadow-xl border-2 border-black/10 flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                {/* Simulated Video Preview Thumbnail */}
                <div className="w-full h-36 rounded-2xl bg-[#0E0E0E] flex items-center justify-center relative overflow-hidden mb-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-[#E60050] group-hover:text-white text-white flex items-center justify-center font-black transition-all shadow-lg backdrop-blur-xs">
                    ▶
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {t.tag}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-black text-sm text-gray-900 leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: 2 Big Key Value Stats */}
          <div className="lg:col-span-4 space-y-5">
            {/* Stat 1 */}
            <div className="bg-[#0E0E0E] text-white p-6 rounded-3xl shadow-xl border border-black/20">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC700] text-[#0E0E0E] flex items-center justify-center font-black text-xl mb-4">
                ⭐
              </div>
              <h4 className="font-heading font-black text-xl text-white">
                500+ Active Portfolios
              </h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                Trusted by high-growth landlords, HOA managers, and enterprise property management teams.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#0E0E0E] text-white p-6 rounded-3xl shadow-xl border border-black/20">
              <div className="w-12 h-12 rounded-2xl bg-[#E60050] text-white flex items-center justify-center font-black text-xl mb-4">
                0%
              </div>
              <h4 className="font-heading font-black text-xl text-white">
                0% Hidden Lock-In Fees
              </h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                Transparent monthly rates. Cancel or modify your tier anytime as your business scales.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

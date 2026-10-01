import React from 'react';

/**
 * ServiceSelector matching VPM screenshot "Everything You Need in One Platform"
 * Features category pill tabs and clean interactive service cards
 */
export function ServiceSelector({ selectedService, onSelectService }) {
  const serviceCategories = [
    'All-In-One',
    'AP / AR Management',
    'Bank Reconciliations',
    'Trust Accounting',
    'Catch-Up Cleanup',
    'Financial Reporting',
  ];

  const services = [
    {
      id: 'smallBusiness',
      title: 'Small Business Bookkeeping',
      badge: 'Most Popular',
      subtitle: 'For small & medium businesses, startups, e-commerce, and agencies.',
      features: [
        'Monthly reconciliation & transaction categorizations',
        'Historical catch-up cleanup & backlog reconciliation',
        'Balance sheet & Profit and Loss statements',
        'Tax-ready financials ready for your CPA',
      ],
      icon: (
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'propertyManagement',
      title: 'Property Management Bookkeeping',
      badge: 'Specialized',
      subtitle: 'For property managers, landlords, HOAs, and rental portfolios.',
      features: [
        'Per-door / unit transaction accounting',
        'Security deposit & trust accounting compliance',
        'Owner statements & vendor distributions',
        'Accounts Payable & 1099 contractor prep',
      ],
      icon: (
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* ── Section Title ─────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0E0E0E] tracking-tight">
          Everything You Need in One Platform
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium">
          Select your primary bookkeeping category to launch the interactive fixed-rate pricing calculator.
        </p>

        {/* ── Pill Tabs Strip matching screenshot ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {serviceCategories.map((cat, idx) => (
            <span
              key={idx}
              className={`px-4 py-2 rounded-full text-xs font-heading font-black tracking-wide cursor-default transition-all ${
                idx === 0
                  ? 'bg-[#E60050] text-white shadow-md shadow-pink-500/20'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── 2 Primary Service Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((service) => {
          const isSelected = selectedService === service.id;
          return (
            <div
              key={service.id}
              className={`relative rounded-3xl border-2 overflow-hidden group transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#E60050] bg-white shadow-2xl ring-4 ring-[#E60050]/10 scale-[1.01]'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
              }`}
              onClick={() => onSelectService(service.id)}
            >
              {/* Top Accent Strip when selected */}
              {isSelected && (
                <div className="h-1.5 bg-[#E60050] w-full" />
              )}

              {/* Badge */}
              {service.badge && (
                <div className="absolute top-5 right-5">
                  <span className={`text-[11px] font-heading font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                    isSelected
                      ? 'bg-[#E60050] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {service.badge}
                  </span>
                </div>
              )}

              <div className="p-7 sm:p-8">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                  isSelected
                    ? 'bg-pink-50 text-[#E60050]'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-pink-50 group-hover:text-[#E60050]'
                }`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-black mb-2 text-[#0E0E0E]">
                  {service.title}
                </h3>
                <p className="text-sm mb-6 leading-relaxed text-gray-600 font-medium">
                  {service.subtitle}
                </p>

                {/* Features */}
                <div className="pt-5 border-t border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-gray-400">
                    What's Included:
                  </p>
                  <ul className="space-y-2.5">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="text-xs font-semibold flex items-start gap-2.5 text-gray-700">
                        <span className={`w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-black ${
                          isSelected ? 'bg-[#E60050] text-white' : 'bg-gray-900 text-white'
                        }`}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  id={`btn-select-${service.id}`}
                  onClick={(e) => { e.stopPropagation(); onSelectService(service.id); }}
                  className={`mt-8 w-full py-3.5 px-4 rounded-full font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-[#E60050] text-white shadow-lg shadow-pink-500/25 hover:bg-[#D00045]'
                      : 'bg-[#0E0E0E] text-white hover:bg-[#E60050]'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Currently Estimating
                    </>
                  ) : (
                    <>
                      Configure & Estimate
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

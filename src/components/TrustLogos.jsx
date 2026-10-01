import React from 'react';

/**
 * Trust Logos Strip matching VPM screenshot
 */
export function TrustLogos() {
  const logos = [
    { name: 'LMR Properties', label: 'LMR' },
    { name: 'Real Property Management', label: 'RPM' },
    { name: 'Sojourn Suites', label: 'SOJOURN' },
    { name: 'Harbor Homes', label: 'HARBOR' },
    { name: 'Apex Capital', label: 'APEX' },
    { name: 'ERA Real Estate', label: 'ERA' },
  ];

  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
          Trusted by 1,000+ Property Managers & Real Estate Companies Nationwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-2 font-heading font-black text-lg text-gray-800 tracking-tight">
              <span className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs font-black">
                {logo.label.substring(0, 2)}
              </span>
              <span>{logo.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

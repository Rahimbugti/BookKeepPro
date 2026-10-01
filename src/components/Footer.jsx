import React, { useState } from 'react';

/**
 * TrustBadges displaying corporate certifications, guarantees, and security
 */
export function TrustBadges() {
  const badges = [
    {
      title: 'QuickBooks ProAdvisor',
      subtitle: 'Elite Certified Bookkeepers',
      icon: '🛡️',
    },
    {
      title: 'Tax-Ready Financials',
      subtitle: 'Seamless handoff to your CPA',
      icon: '📑',
    },
    {
      title: 'Bank-Grade Security',
      subtitle: '256-bit SSL encrypted data',
      icon: '🔒',
    },
    {
      title: 'No Long-Term Lock-in',
      subtitle: 'Transparent month-to-month terms',
      icon: '⚡',
    },
  ];

  return (
    <div className="mt-14 max-w-6xl mx-auto border-t border-gray-200 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3.5 hover:border-[#E60050] transition-colors"
          >
            <div className="text-2xl shrink-0">{b.icon}</div>
            <div>
              <h4 className="font-heading text-xs font-black text-gray-900">{b.title}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Rich Mega Footer matching VPM Solutions screenshot with newsletter signup
 */
export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0E0E0E] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E60050] to-[#FF457E] flex items-center justify-center">
                <span className="font-heading font-black text-white text-sm">LS</span>
              </div>
              <div className="font-heading font-black text-xl text-white tracking-tight">
                LEDGER<span className="text-[#E60050]">SYNC</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              The premier bookkeeping and financial accounting platform for small businesses, property managers, and growing enterprises nationwide.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>📍 Global Support: USA • Canada • Australia • UK</p>
              <p>📞 <a href="tel:03345786667" className="hover:text-white">03345786667</a> • ✉️ <a href="mailto:nexa@gmail.com" className="hover:text-white">nexa@gmail.com</a></p>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-heading text-xs font-black uppercase tracking-widest text-[#FFC700] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><a href="#calculator-section" className="hover:text-white transition-colors">Small Business Bookkeeping</a></li>
              <li><a href="#calculator-section" className="hover:text-white transition-colors">Property Management Books</a></li>
              <li><a href="#calculator-section" className="hover:text-white transition-colors">Catch-Up & Cleanup</a></li>
              <li><a href="#calculator-section" className="hover:text-white transition-colors">Trust Account Audits</a></li>
              <li><a href="#calculator-section" className="hover:text-white transition-colors">Tax-Ready CPA Close</a></li>
            </ul>
          </div>

          {/* Col 4: PMS Software */}
          <div>
            <h4 className="font-heading text-xs font-black uppercase tracking-widest text-[#FFC700] mb-4">
              Software
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><a href="#appfolio" className="hover:text-white transition-colors">AppFolio Accounting</a></li>
              <li><a href="#appfolio" className="hover:text-white transition-colors">Buildium Integration</a></li>
              <li><a href="#appfolio" className="hover:text-white transition-colors">QuickBooks Pro</a></li>
              <li><a href="#appfolio" className="hover:text-white transition-colors">Rent Manager</a></li>
              <li><a href="#appfolio" className="hover:text-white transition-colors">Xero & Rentvine</a></li>
            </ul>
          </div>

          {/* Col 5 & 6: Newsletter Box matching screenshot */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-widest text-[#FFC700] mb-2">
              Stay in the Loop
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get monthly bookkeeping tips, real estate tax advice, and market insights.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs font-bold">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E60050]"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#00A3FF] hover:bg-[#0092E6] text-white font-heading font-black text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} LedgerSync Financial Solutions LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

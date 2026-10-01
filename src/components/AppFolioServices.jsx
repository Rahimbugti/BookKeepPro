import React from 'react';

/**
 * AppFolio Accounting and Bookkeeping Capabilities Showcase Card
 * Redesigned with VPM dark background, yellow accents, and bold typography
 */
export function AppFolioServices() {
  const capabilities = [
    {
      title: 'Property Management Accounting',
      description:
        'Handling full-cycle property management accounting using AppFolio, including rent collection, bill payments, and financial reporting.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Bank Reconciliation',
      description:
        'Performing accurate and timely bank reconciliations within AppFolio to ensure financial accuracy and eliminate discrepancies.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Expense Tracking',
      description:
        'Managing and categorizing property-related expenses in AppFolio to maintain up-to-date and audit-ready financial records.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Financial Reporting',
      description:
        'Generating and analyzing monthly, quarterly, and annual financial reports tailored to property owners and CPA filing needs.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Tenant Ledger Management',
      description:
        'Updating and maintaining tenant ledgers, ensuring accurate tracking of rent payments, security deposits, and outstanding balances.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Accounts Payable & Receivable',
      description:
        'Managing vendor payments, invoices, work orders, and tenant rent collections efficiently within AppFolio & Buildium.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-12 bg-[#0E0E0E] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 relative z-10">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Specialized PMS Stack
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-black tracking-tight mt-3 text-white">
            AppFolio Accounting & Bookkeeping
          </h3>
          <p className="text-sm text-white/60 mt-1.5 max-w-2xl leading-relaxed">
            Full-cycle property management accounting within AppFolio, Buildium, and Rent Manager.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-4 py-2.5 rounded-2xl text-xs font-heading font-black text-[#0E0E0E] shadow-md">
          <span>AppFolio Certified Specialists</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 relative z-10">
        {capabilities.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#181818] hover:bg-[#202020] hover:border-white/20 transition-all duration-200 p-6 rounded-2xl border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-heading text-sm font-black text-white mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center text-[10px] font-black uppercase tracking-wider text-white/80">
              <span>✓ Supported Feature</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

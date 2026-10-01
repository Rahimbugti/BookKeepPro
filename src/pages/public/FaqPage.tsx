import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Calculator, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';

export const FaqPage: React.FC = () => {
  const { navigate } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General & Pricing',
      question: 'How does your pricing calculator work?',
      answer:
        'Our online pricing calculator uses configurable parameters (transaction volume, bank/credit card accounts, property units, and selected scope of work) to provide an estimated price range. This gives you a clear, transparent idea of what your project or monthly fee will look like before signing any agreement.',
    },
    {
      category: 'General & Pricing',
      question: 'What is the difference between Hourly and Fixed-Price billing?',
      answer:
        'Hourly billing ($10–$20 USD/hour) is ideal for clients who prefer flexible, ad-hoc hours or varying monthly tasks (available in 5, 10, 20, 30, 40+ hour blocks). Fixed-Price projects provide a guaranteed monthly or milestone fee based on your verified workload with zero tracking of hours.',
    },
    {
      category: 'Property Management',
      question: 'What property management accounting platforms do you support?',
      answer:
        'We specialize extensively in AppFolio Property Manager, Buildium, Rent Manager, and Yardi. Our team handles full-cycle accounting including rent processing, maintenance invoice payments, owner distributions, and tenant ledger adjustments.',
    },
    {
      category: 'Property Management',
      question: 'How do you ensure 3-way trust account compliance?',
      answer:
        'We perform strict monthly 3-way reconciliations matching your bank statement ending balance, general ledger escrow cash balance, and individual tenant security deposit sub-ledgers. This ensures zero co-mingling and keeps your firm 100% audit-ready for state real estate commissions.',
    },
    {
      category: 'Small Business',
      question: 'How do you handle multi-month or multi-year catch-up cleanups?',
      answer:
        'Cleanup projects are always performed as one-time milestone projects. We review all historical bank/credit card statements, reconcile missing transactions, fix miscategorized expenses, correct opening balances, and deliver clean, CPA-ready financial statements.',
    },
    {
      category: 'Security & Onboarding',
      question: 'How is our financial data kept secure?',
      answer:
        'We adhere to bank-grade 256-bit encryption standards, require multi-factor authentication (MFA) on all tools, and sign comprehensive bilateral Non-Disclosure Agreements (NDAs) prior to accessing any client accounting systems.',
    },
    {
      category: 'International',
      question: 'Do you work with clients in Canada, Australia, and the United Kingdom?',
      answer:
        'Yes! We actively serve businesses and property managers across the United States, Canada, Australia, and the UK. Our currency switcher allows you to view all pricing in USD, CAD, AUD, or GBP.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Got Questions?
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Everything you need to know about our bookkeeping processes, pricing calculator, trust accounting compliance, and software integrations.
          </p>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full space-y-6">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 font-bold text-base text-slate-900 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-black transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 bg-blue-50/70 rounded-3xl border border-blue-200 text-center space-y-4 mt-12">
          <h4 className="font-bold text-base text-slate-900">
            Have a specific scenario not listed here?
          </h4>
          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Our senior bookkeeping team is ready to review your chart of accounts and workload requirements.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('calculator')}
              className="px-6 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Use Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="px-6 py-3 bg-white border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50"
            >
              Contact Us Directly
            </button>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
};

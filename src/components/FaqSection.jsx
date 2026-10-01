import React, { useState } from 'react';

/**
 * FAQ Accordion Section matching VPM screenshot with pink toggle icons
 */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is LedgerSync Bookkeeping & Advisory?',
      a: 'LedgerSync is an all-in-one financial bookkeeping platform that pairs small businesses and property managers with dedicated, certified bookkeeping specialists. We handle daily reconciliations, AP/AR, owner distributions, 3-way trust compliance, and CPA-ready monthly closes.',
    },
    {
      q: 'How does the instant pricing calculator work?',
      a: 'Our calculator uses your monthly transaction tiers, active bank/credit card account counts, and property door volumes to provide an instant, transparent fixed estimate with no hidden placement fees.',
    },
    {
      q: 'Do you support AppFolio, Buildium, and Rent Manager?',
      a: 'Yes! Our specialists are AppFolio, Buildium, Rent Manager, and QuickBooks Online certified, ensuring direct accounting within your preferred property management software.',
    },
    {
      q: 'What is included in the Catch-Up & Cleanup service?',
      a: 'If your books are months or years behind, our cleanup specialists categorize all historical transactions, reconcile bank and credit card statements, audit equity balances, and provide clean financial statements ready for tax filing.',
    },
    {
      q: 'Is there any long-term contract or lock-in fee?',
      a: 'No. All our standard monthly bookkeeping plans operate on flexible month-to-month agreements. You can adjust your scope or pause services with 30 days notice.',
    },
    {
      q: 'How secure is my financial and banking data?',
      a: 'We use bank-grade 256-bit SSL encryption, read-only accountant access credentials, and multi-factor authentication to ensure your business data is completely safe.',
    },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-center text-[#0E0E0E] tracking-tight mb-12">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group"
                >
                  <span className={`font-heading font-black text-base sm:text-lg transition-colors ${
                    isOpen ? 'text-[#E60050]' : 'text-gray-900 group-hover:text-[#E60050]'
                  }`}>
                    {faq.q}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shrink-0 transition-transform ${
                    isOpen ? 'bg-pink-50 text-[#E60050] rotate-45' : 'text-[#E60050] group-hover:scale-110'
                  }`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed pr-10 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

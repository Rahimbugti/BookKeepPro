import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Calculator, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WebsiteFooter: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 font-sans">
      {/* ── Pre-Footer Newsletter & Quick Action Bar ── */}
      <div className="border-b border-slate-800 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Ready to Streamline Your Financial Records?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Accurate Books. Transparent Pricing. Zero Discrepancies.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Serving small businesses and property management companies across the United States, Canada, Australia, and the UK.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('calculator')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Calculate Project Estimate</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-all"
            >
              Book Free 30-Min Consultation
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Link Columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info & Countries */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('landing')}>
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-md shadow-blue-600/20">
                BKP
              </div>
              <div className="font-black text-xl text-white tracking-tight">
                BookKeep<span className="text-blue-400">Pro</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Specialized bookkeeping and accounting services for small businesses and property management companies. Certified in AppFolio, Buildium, QuickBooks Online, and Xero.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Global Hubs: USA • Canada • Australia • United Kingdom</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="mailto:steadyledgerco98@gmail.com" className="hover:text-white">steadyledgerco98@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="tel:+17322771592" className="hover:text-white">+1 732-277-1592</a>
              </p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200">
              Bookkeeping Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button type="button" onClick={() => navigate('small-business')} className="hover:text-white">Monthly Bookkeeping</button></li>
              <li><button type="button" onClick={() => navigate('small-business')} className="hover:text-white">Catch-up & Cleanup</button></li>
              <li><button type="button" onClick={() => navigate('services')} className="hover:text-white">Bank Reconciliation</button></li>
              <li><button type="button" onClick={() => navigate('services')} className="hover:text-white">Accounts Payable & AR</button></li>
              <li><button type="button" onClick={() => navigate('services')} className="hover:text-white">Financial Statements & P&L</button></li>
              <li><button type="button" onClick={() => navigate('services')} className="hover:text-white">QuickBooks Setup & Support</button></li>
            </ul>
          </div>

          {/* Col 3: Property Management */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200">
              Property Management
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button type="button" onClick={() => navigate('property-management')} className="hover:text-white">AppFolio Full-Cycle Accounting</button></li>
              <li><button type="button" onClick={() => navigate('property-management')} className="hover:text-white">3-Way Trust & Escrow Recs</button></li>
              <li><button type="button" onClick={() => navigate('property-management')} className="hover:text-white">Owner Statements & Packets</button></li>
              <li><button type="button" onClick={() => navigate('property-management')} className="hover:text-white">Tenant Ledger Management</button></li>
              <li><button type="button" onClick={() => navigate('property-management')} className="hover:text-white">Vendor 1099 Contractor Prep</button></li>
              <li><button type="button" onClick={() => navigate('property-management')} className="hover:text-white">Short-Term Rental Accounting</button></li>
            </ul>
          </div>

          {/* Col 4: Platform & Pricing */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200">
              Pricing & Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button type="button" onClick={() => navigate('pricing')} className="hover:text-white">Hourly Rates ($10–$20/hr)</button></li>
              <li><button type="button" onClick={() => navigate('calculator')} className="hover:text-white">Interactive Price Calculator</button></li>
              <li><button type="button" onClick={() => navigate('about')} className="hover:text-white">About Our Certified Team</button></li>
              <li><button type="button" onClick={() => navigate('faq')} className="hover:text-white">Frequently Asked Questions</button></li>
              <li><button type="button" onClick={() => navigate('contact')} className="hover:text-white">Contact & Support</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Copyright & Disclaimer ── */}
      <div className="border-t border-slate-800 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} BookKeepPro Bookkeeping Services. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => navigate('about')} className="hover:text-slate-300">Privacy Policy</button>
            <button type="button" onClick={() => navigate('about')} className="hover:text-slate-300">Terms of Service</button>
            <button type="button" onClick={() => navigate('about')} className="hover:text-slate-300">Security & NDA</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  CreditCard,
  Zap,
  ArrowRight,
  ShieldCheck,
  Calculator,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';

export const ServicesPage: React.FC = () => {
  const { navigate } = useApp();

  const smallBusinessServices = [
    {
      title: 'Monthly Bookkeeping & Reconciliation',
      description: 'Systematic transaction categorization, bank/credit card reconciliations, and journal entries to keep ledgers current every 30 days.',
      deliverables: ['Bank & Card Reconciliations', 'Transaction Categorization', 'Monthly Close Summary', 'Discrepancy Resolution'],
    },
    {
      title: 'Cleanup & Historical Catch-up',
      description: 'One-time backlog restoration for un-reconciled months or years. We fix incorrect chart of accounts, un-categorized expenses, and balance sheet anomalies.',
      deliverables: ['Multi-Month Backlog Recovery', 'Chart of Accounts Restructuring', 'Duplicate Transaction Removal', 'Tax-Ready Audit File'],
    },
    {
      title: 'Accounts Payable & Bill Management',
      description: 'Vendor invoice receipt, matching, approval tracking, and scheduled bill payments to prevent late fees and maintain vendor goodwill.',
      deliverables: ['Vendor Invoice Processing', '1099 Contractor Tracking', 'Scheduled AP Batch Runs', 'Aging Payable Reports'],
    },
    {
      title: 'Accounts Receivable & Invoicing',
      description: 'Customer invoice generation, payment allocation, aging receivables monitoring, and gentle payment reminders for healthy cash flow.',
      deliverables: ['Client Invoicing', 'Payment Matching', 'A/R Aging Reports', 'Overdue Follow-Up Tracking'],
    },
    {
      title: 'Financial Reporting & Statements',
      description: 'Clean, accurate financial packages prepared monthly for stakeholders, lenders, and year-end CPA filing.',
      deliverables: ['Profit & Loss (P&L)', 'Balance Sheet', 'Cash Flow Statement', 'Executive Financial Summary'],
    },
    {
      title: 'QuickBooks Online & Xero Setup',
      description: 'New company setup, software migration, custom chart of accounts configuration, and third-party app integration.',
      deliverables: ['Custom Chart of Accounts', 'Bank Feed Integration', 'Inventory/Stripe Sync', 'Staff Onboarding Session'],
    },
  ];

  const propertyManagementServices = [
    {
      title: 'AppFolio & Buildium Property Accounting',
      description: 'Full-cycle trust and operational bookkeeping directly inside your Property Management Software (PMS).',
      deliverables: ['Rent Collection Tracking', 'Maintenance Bill Pay', 'Move-In/Move-Out Accounting', 'Bank Feed Processing'],
    },
    {
      title: '3-Way Trust & Escrow Reconciliation',
      description: 'Strict state compliance reconciliations matching bank statements, general ledger balances, and individual tenant ledger liabilities.',
      deliverables: ['3-Way Reconciliation Packet', 'Security Deposit Liability Audit', 'Zero Escrow Co-mingling Verification', 'Audit-Ready Compliance Log'],
    },
    {
      title: 'Owner Statements & Monthly Distributions',
      description: 'Accurate net income calculation, reserve balance maintenance, and customized owner distribution packets.',
      deliverables: ['Monthly Owner Statements', 'Distribution Calculation Sheet', 'Management Fee Deduction Log', 'Owner Packet Dispatch'],
    },
    {
      title: 'Tenant Ledger Management',
      description: 'Daily tenant ledger updating, security deposit disposition letters, and fee adjustments.',
      deliverables: ['Tenant Balance Audits', 'Security Deposit Refunds', 'Late Fee Assessments', 'Lease Ledger Auditing'],
    },
    {
      title: 'Vendor 1099 Preparation & Compliance',
      description: 'Tracking contractor W-9 forms, year-end expense aggregation, and 1099-NEC/MISC filing preparation.',
      deliverables: ['W-9 Collection Log', 'Annual Vendor Spend Audit', '1099-NEC Preparation', 'CPA Filing Export'],
    },
    {
      title: 'Short-Term Rental (Airbnb/VRBO) Accounting',
      description: 'Dynamic rate reconciliation, cleaning fee allocations, platform payout matching, and local occupancy tax prep.',
      deliverables: ['Airbnb/VRBO Payout Reconciliations', 'Cleaner & Maintenance Cost Allocation', 'Occupancy Tax Summaries', 'Per-Property Yield Reports'],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Specialized B2B Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Complete Bookkeeping & Accounting Services
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            From daily transaction recording to complex 3-way trust account audits, explore our full spectrum of specialized financial management services.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('calculator')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Estimate Project Pricing</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="px-6 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── Section 1: Small Business Services ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Startups & SMB Solutions
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Small Business Bookkeeping Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Reliable bookkeeping for business owners who want clear financial vision without spending late nights in spreadsheets.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('small-business')}
              className="px-5 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl self-start md:self-auto"
            >
              Explore Small Business Portal →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smallBusinessServices.map((svc, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 p-7 rounded-3xl border border-slate-200 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{svc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                  
                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Deliverables</span>
                    {svc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                        <span className="text-black">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => navigate('calculator')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Get Estimate Range</span> →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Property Management Services ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Real Estate & HOA Solutions
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Property Management Accounting Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Expert PMS bookkeepers handling AppFolio, Buildium, and Rent Manager trust accounting with strict compliance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('property-management')}
              className="px-5 py-2.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs rounded-xl self-start md:self-auto"
            >
              Explore Property Management Portal →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyManagementServices.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{svc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                  
                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Deliverables</span>
                    {svc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                        <span className="text-black">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => navigate('calculator')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Calculate Door / Unit Pricing</span> →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
};

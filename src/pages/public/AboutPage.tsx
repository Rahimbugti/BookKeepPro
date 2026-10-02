import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Globe,
  Award,
  Users,
  Building2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 max-w-3xl text-center space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            About BookKeepPro
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Specialized Bookkeeping & Accounting Services
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            We help small businesses and property management companies across the United States, Canada, Australia, and the UK gain absolute clarity over their numbers.
          </p>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Our Purpose
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Eliminating Accounting Headaches for Real Estate & SMB Leaders
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bookkeeping shouldn't be a source of anxiety or a midnight chore. We founded BookKeepPro to provide small business founders and property management operators with a dedicated, certified bookkeeping team at a fraction of the cost of in-house staffing.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether managing 200 doors on AppFolio or processing 1,000 monthly e-commerce transactions in QuickBooks Online, our rigorous 2-tier audit system ensures every penny is categorized, balanced, and tax-ready.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-2xl font-black text-blue-600">250+</h4>
                  <p className="text-xs text-slate-500 font-semibold">Active Client Entities</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900">10+ Years</h4>
                  <p className="text-xs text-slate-500 font-semibold">Accounting Experience</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Zero Co-Mingling Trust</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Strict adherence to escrow regulations and statutory security deposit compliance.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  <Award className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Certified Software Pros</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  AppFolio, Buildium, QuickBooks ProAdvisor, and Xero certified bookkeepers.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Strict Data Security</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  256-bit encryption, strict permission management, and comprehensive NDA agreements.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">4 Global Jurisdictions</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tailored knowledge of US GAAP, Canadian ASPE, Australian IFRS, and UK FRS 102.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
};

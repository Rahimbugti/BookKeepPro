import React from 'react';
import { Building2, User, Shield, Target, GraduationCap, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { navigate, loginAs } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* ── Public Navbar ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-600/20">
              VPM
            </div>
            <div>
              <div className="font-bold text-xl text-slate-900 tracking-tight leading-none">
                Workforce<span className="text-blue-600">Pro</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                Virtual Assistant OS
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button type="button" onClick={() => navigate('landing')} className="text-blue-600 hover:text-blue-700">Home</button>
            <button type="button" onClick={() => navigate('about')} className="hover:text-blue-600">About Platform</button>
            <button type="button" onClick={() => navigate('services')} className="hover:text-blue-600">Talent & Services</button>
            <button type="button" onClick={() => navigate('contact')} className="hover:text-blue-600">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('login')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('register')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-white to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Centralized Remote Workforce Management Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Recruit, Train, Manage & Pay{' '}
              <span className="text-blue-600">Virtual Assistants</span> in One Hub
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Empower your property management and real estate operations with pre-vetted remote talent. Automate recruiting pipelines, task dispatch, attendance tracking, and global payroll.
            </p>

            {/* Role Demo Quick Start Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => loginAs('company')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-white" />
                <span>Launch Company Portal</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={() => loginAs('employee')}
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4 text-black" />
                <span>Launch VA Employee Portal</span>
              </button>
              <button
                type="button"
                onClick={() => loginAs('admin')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-white" />
                <span>Admin Console</span>
              </button>
            </div>
          </div>

          {/* Feature Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Automated Hiring Funnel</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Post jobs, screen pre-vetted property management applicants, schedule interviews, and issue offer letters seamlessly.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Built-in LMS & Training</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Assign AppFolio, Buildium, and customer support certifications. Track lesson completion and quiz performance.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Live Timesheets & Payroll</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                One-click attendance check-ins, automated time-tracking, task dispatch boards, and transparent global disbursements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Public Footer ── */}
      <footer className="mt-auto bg-slate-900 text-white py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              VPM
            </div>
            <span className="font-bold text-slate-200">VPM Workforce Pro</span>
            <span>• All Rights Reserved © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <button type="button" onClick={() => navigate('about')} className="hover:text-white">About</button>
            <button type="button" onClick={() => navigate('services')} className="hover:text-white">Services</button>
            <button type="button" onClick={() => navigate('contact')} className="hover:text-white">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

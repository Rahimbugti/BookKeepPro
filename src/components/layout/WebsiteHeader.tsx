import React, { useState } from 'react';
import { Menu, X, Calculator, ArrowRight, Shield, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CountryCurrencySelector } from '../common/CountryCurrencySelector';

export const WebsiteHeader: React.FC = () => {
  const { currentRoute, navigate } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: 'landing' },
    { label: 'Services', route: 'services' },
    { label: 'Small Business', route: 'small-business' },
    { label: 'Property Management', route: 'property-management' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Calculator', route: 'calculator' },
    { label: 'About Us', route: 'about' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* ── Top Info / Utility Bar ── */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-white" /> Serving USA, Canada, Australia & UK
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-slate-400">
              AppFolio, Buildium & QuickBooks Online Certified
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:steadyledgerco98@gmail.com"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-white" /> steadyledgerco98@gmail.com
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+17322771592"
              className="font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-white" /> +1 732-277-1592
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('landing')}
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-600/20">
            BKP
          </div>
          <div>
            <div className="font-black text-xl text-slate-900 tracking-tight leading-none">
              BookKeep<span className="text-blue-600">Pro</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
              Bookkeeping & Accounting
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                type="button"
                onClick={() => navigate(link.route)}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold'
                    : 'hover:text-blue-600'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Country Selector + Calculator CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Visible Country / Currency Selector */}
          <CountryCurrencySelector variant="header" />

          <button
            type="button"
            onClick={() => navigate('calculator')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-white" />
            <span>Estimate Price</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <CountryCurrencySelector variant="header" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown Drawer ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-2.5 text-sm font-bold text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.route}
                type="button"
                onClick={() => {
                  navigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-xl transition-colors ${
                  currentRoute === link.route
                    ? 'bg-blue-50 text-blue-700 font-extrabold'
                    : 'hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                navigate('calculator');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Launch Pricing Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
            >
              <span>Get Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';

/**
 * Header matching the VPM Solutions screenshot:
 * 1. Black top utility bar (socials, phone, login)
 * 2. Clean white sticky navbar with logo, nav links, demo button & hot pink "GET STARTED" CTA
 */
export function Header({ onGetStarted, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-white">
      {/* ── 1. Top Utility Black Bar ── */}
      <div className="bg-[#0E0E0E] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Social Icons */}
          <div className="flex items-center gap-3 text-white/70">
            <a href="#social" className="hover:text-[#FFC700] transition-colors" aria-label="Facebook">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#FFC700] transition-colors" aria-label="Instagram">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#FFC700] transition-colors" aria-label="LinkedIn">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#FFC700] transition-colors" aria-label="YouTube">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          {/* Right Utility Contact & Login */}
          <div className="flex items-center gap-6">
            <span className="text-white/80">Call: <a href="tel:03345786667" className="text-white font-bold hover:underline">03345786667</a></span>
            <span className="text-white/40">•</span>
            <a href="mailto:nexa@gmail.com" className="text-white/80 hover:text-[#FFC700] transition-colors">nexa@gmail.com</a>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1.5 text-white font-bold cursor-pointer hover:text-[#FFC700]">
              <span className="w-4 h-4 rounded-full bg-[#FFC700] text-[#0E0E0E] flex items-center justify-center text-[10px] font-black">👤</span>
              <span>Client Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Main White Navbar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-gray-100">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E60050] to-[#FF457E] flex items-center justify-center shadow-md shadow-pink-500/20">
            <span className="font-heading font-black text-white text-sm tracking-tight">LS</span>
          </div>
          <div>
            <div className="font-heading font-black text-xl text-[#0E0E0E] tracking-tight leading-none">
              LEDGER<span className="text-[#E60050]">SYNC</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block -mt-0.5">
              Financial Solutions
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <a href="#platform" className="hover:text-[#E60050] transition-colors">Platform</a>
          <a href="#why-us" className="hover:text-[#E60050] transition-colors">Why Us</a>
          <a href="#calculator-section" className="hover:text-[#E60050] text-[#0E0E0E] font-bold transition-colors flex items-center gap-1">
            <span>Pricing Calculator</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E60050]" />
          </a>
          <a href="#appfolio" className="hover:text-[#E60050] transition-colors">Software Stack</a>
          <a href="#faq" className="hover:text-[#E60050] transition-colors">FAQ</a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onGetStarted}
            className="px-5 py-2.5 rounded-full border border-gray-300 hover:border-gray-900 text-gray-800 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Schedule Call
          </button>
          <button
            type="button"
            onClick={onGetStarted}
            className="px-6 py-2.5 rounded-full bg-[#E60050] hover:bg-[#D00045] active:scale-95 text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-all"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3">
          <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-gray-800">Platform</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-gray-800">Why Us</a>
          <a href="#calculator-section" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-[#E60050]">Pricing Calculator</a>
          <a href="#appfolio" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-gray-800">Software Stack</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-gray-800">FAQ</a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onGetStarted(); }}
              className="w-full py-3 rounded-full bg-[#E60050] text-white font-bold text-xs uppercase tracking-wider"
            >
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

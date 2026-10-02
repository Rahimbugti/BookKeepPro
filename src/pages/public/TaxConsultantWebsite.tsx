import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Calculator,
  X,
  Send,
  Building2,
  Briefcase,
  Layers,
  Lock,
  Calendar,
  BarChart3,
  PieChart,
  HelpCircle,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useApp } from '../../context/AppContext';
import { CountryCurrencySelector } from '../../components/common/CountryCurrencySelector';
import { StepByStepCalculator } from '../../components/calculator/StepByStepCalculator';

export const TaxConsultantWebsite: React.FC = () => {
  const { navigate } = useApp();
  const { currentCurrency, formatRangeUSD, formatUSD } = useCurrency();

  // Booking Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'Small Business Bookkeeping',
    selectedPlan: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Accordion States
  const [openPlateItem, setOpenPlateItem] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scroll Reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-blur');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleOpenCalculator = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setShowCalculator(true);
    setTimeout(() => {
      const el = document.getElementById('calculator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleChoosePlan = (planName: string, priceFormatted: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPlan: `${planName} (${priceFormatted} - Provisional)`,
      service: planName.toLowerCase().includes('property')
        ? 'Property Management Accounting (AppFolio/Buildium)'
        : planName.toLowerCase().includes('hourly')
        ? 'Hourly Bookkeeping Support ($10–$20/hr)'
        : 'Small Business Bookkeeping',
    }));
    setIsBookModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = {
      id: 'booking_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...formData,
    };
    try {
      const existing = JSON.parse(localStorage.getItem('bookkeep_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('bookkeep_bookings', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save error', err);
    }
    setIsSubmitted(true);
  };

  const plateServices = [
    {
      title: 'Small-Business Bookkeeping',
      description:
        'Bank and credit card feeds reconciled weekly, transactions categorized according to GAAP, and monthly P&L and Balance Sheet reports delivered on time, every single month.',
      details: [
        'Weekly bank & credit card reconciliations',
        'GAAP compliant categorization',
        'Monthly P&L & Balance Sheet delivery',
        'QuickBooks Online & Xero management',
      ],
    },
    {
      title: 'Property-Management & Trust Accounting',
      description:
        'Specialized door/unit-level bookkeeping, monthly owner disbursement packets, tenant ledger tracking, and strict 3-way trust & escrow reconciliations in AppFolio and Buildium.',
      details: [
        '3-Way trust & escrow reconciliation',
        'Owner monthly statement packets',
        'Tenant ledgers & security deposits',
        'AppFolio, Buildium & Rent Manager',
      ],
    },
    {
      title: 'Historical Catch-up & Backlog Cleanup',
      description:
        'Months or years behind on your books? We untangle the backlog, reconstruct messy ledgers, correct historical chart of accounts, and deliver audit-proof books with zero stress.',
      details: [
        'Multi-year backlog recovery',
        'Chart of accounts reclassification',
        'Audit-proof digital workpapers',
        'No long-term contracts required',
      ],
    },
    {
      title: 'Financial Reporting & CPA Tax-Prep Support',
      description:
        'Clean, synchronized books packaged for your CPA or tax filer, including year-end 1099 contractor preparation, fixed asset schedules, and ongoing cash-flow advisory.',
      details: [
        'Year-end 1099-NEC contractor prep',
        'CPA tax-ready workpaper packets',
        'Accounts Payable & Receivable tracking',
        'Cash flow forecasting & advisory',
      ],
    },
  ];

  const pricingRows = [
    {
      name: 'Solo & Freelance',
      description: 'Up to 100 transactions/mo, 1 bank feed & 1 card, quarterly check-in.',
      priceUSD: 150,
      period: '/ month',
      badge: 'Starter',
    },
    {
      name: 'Small Business',
      description: 'Up to 350 transactions/mo, 3 bank feeds, monthly P&L, Balance Sheet & QBO management.',
      priceUSD: 350,
      period: '/ month',
      badge: 'Popular',
      isPopular: true,
    },
    {
      name: 'Corporate & Property',
      description: 'Up to 1,000 transactions/mo, AppFolio/Buildium trust accounting, owner distributions & 1099 prep.',
      priceUSD: 750,
      period: '/ month',
      badge: 'Full Suite',
    },
  ];

  const faqs = [
    {
      q: 'What if I am several months (or years) behind on my bookkeeping?',
      a: 'That is one of our core specialties. We conduct a fast diagnostic sprint, untangle backlogged transactions, rebuild your chart of accounts, and get you 100% compliant with historical books ready for tax filing.',
    },
    {
      q: 'How do we get our financial documents and bank feeds to you securely?',
      a: 'We use encrypted 256-bit portals with read-only accountant access to your QuickBooks Online, Xero, or bank accounts. You never have to email unencrypted sensitive statements.',
    },
    {
      q: 'Which accounting software do you work with?',
      a: 'We are certified experts in QuickBooks Online, Xero, AppFolio, Buildium, Rent Manager, Wave, and Gusto Payroll.',
    },
    {
      q: 'Do you offer flexible hourly bookkeeping?',
      a: 'Yes! In addition to our fixed monthly plans, we provide on-demand hourly bookkeeping at $10–$20/hour for fluctuating workloads or specialized cleanup tasks.',
    },
    {
      q: 'How do I switch from my current accountant or bookkeeper?',
      a: 'We manage the entire transition. We coordinate with your previous accountant to securely transfer previous tax returns, general ledgers, and trial balances with zero interruption to your business.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans antialiased selection:bg-black selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP UTILITY BAR & MAIN NAVBAR                                         */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 animate-fadeInDown">
        {/* Top utility bar */}
        <div className="bg-black text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-900">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <Shield className="w-3 h-3 text-white" /> BookKeepPro • Certified Bookkeeping & Accounting Practice
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline">Specialized in Small Business & Property Management Bookkeeping</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="mailto:nexa@gmail.com" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3 text-white" /> nexa@gmail.com
              </a>
              <span className="text-slate-700">|</span>
              <a href="tel:03345786667" className="font-bold text-white hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3 text-white" /> 03345786667
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <div
            className="cursor-pointer transition-transform hover:scale-105 duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="font-serif font-bold text-2xl text-black tracking-tight leading-none">
              BookKeepPro
            </div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest block mt-0.5">
              Bookkeeping & Accounting
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#process" className="hover:text-black transition-colors">Process</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            <button
              type="button"
              onClick={handleOpenCalculator}
              className="hover:text-black transition-colors font-semibold"
            >
              Calculator
            </button>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <CountryCurrencySelector variant="inline" />
            <button
              type="button"
              onClick={() => setIsBookModalOpen(true)}
              className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95 duration-150"
            >
              Book intro call
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 2. HERO SECTION                                                          */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-20 pb-12 bg-[#FDFDFD] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          {/* Top Title & CTA Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[11px] font-semibold text-slate-700 animate-blurBadge">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span>Small Business & Property Management Bookkeeping</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-black tracking-tight leading-[1.08]">
                <span className="inline-block animate-blurText delay-100">
                  Accurate books.
                </span>
                <br />
                <span className="inline-block animate-blurText delay-250">
                  Zero stress for your business.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed animate-blurText delay-400">
                Specialized bookkeeping for small businesses, agencies, landlords, and property management companies. We handle monthly reconciliations, trust accounting, and historical cleanups so you can focus on growth.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3 pb-2 animate-blurText delay-500">
              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                className="px-6 py-3 bg-black hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95 duration-150"
              >
                Book intro call
              </button>
              <a
                href="#services"
                className="px-6 py-3 border border-slate-300 hover:border-black text-slate-900 rounded-full text-xs font-bold transition-all bg-white hover:scale-105 duration-150"
              >
                Explore services
              </a>
            </div>
          </div>

          {/* Big Editorial Hero Image with smooth reveal */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/8] max-h-[520px] animate-heroReveal delay-300">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=80"
              alt="Bookkeeping and Financial Review at BookKeepPro"
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.05] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 text-white text-[11px] font-medium tracking-wide drop-shadow-md">
              BookKeepPro • Dedicated Client Operations Office
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 3. LOGO / TRUST STRIP                                                    */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('small-business')}
              title="Click to view QuickBooks Solutions for Small Business"
              className="group flex items-center gap-2 font-semibold text-xs text-slate-800 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer text-left reveal-blur reveal-delay-100 shadow-sm hover:shadow"
            >
              <Shield className="w-4 h-4 text-black transition-transform duration-300 group-hover:rotate-6" />
              <span>QuickBooks ProAdvisor</span>
              <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>

            <button
              type="button"
              onClick={() => navigate('small-business')}
              title="Click to view Xero Cloud Solutions for Small Business"
              className="group flex items-center gap-2 font-semibold text-xs text-slate-800 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer text-left reveal-blur reveal-delay-200 shadow-sm hover:shadow"
            >
              <Layers className="w-4 h-4 text-black transition-transform duration-300 group-hover:rotate-6" />
              <span>Xero Platinum Partner</span>
              <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>

            <button
              type="button"
              onClick={() => navigate('property-management')}
              title="Click to view AppFolio Property Management Services"
              className="group flex items-center gap-2 font-semibold text-xs text-slate-800 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer text-left reveal-blur reveal-delay-300 shadow-sm hover:shadow"
            >
              <Building2 className="w-4 h-4 text-black transition-transform duration-300 group-hover:rotate-6" />
              <span>AppFolio Certified</span>
              <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>

            <button
              type="button"
              onClick={() => navigate('property-management')}
              title="Click to view Buildium Accounting Services"
              className="group flex items-center gap-2 font-semibold text-xs text-slate-800 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer text-left reveal-blur reveal-delay-400 shadow-sm hover:shadow"
            >
              <Briefcase className="w-4 h-4 text-black transition-transform duration-300 group-hover:rotate-6" />
              <span>Buildium Accounting</span>
              <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>

            <button
              type="button"
              onClick={() => navigate('services')}
              title="Click to explore CPA Quality Standards & Services"
              className="group flex items-center gap-2 font-semibold text-xs text-slate-800 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer text-left reveal-blur reveal-delay-500 shadow-sm hover:shadow"
            >
              <UserCheck className="w-4 h-4 text-black transition-transform duration-300 group-hover:rotate-6" />
              <span>CPA Quality Standards</span>
              <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 4. "SOUND FAMILIAR?" SECTION (3 Dark Dashboard Cards)                    */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FBFBFB] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 reveal-blur">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-black">
              Sound familiar?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              The problems we solve every day for business owners who want their time and peace of mind back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dark Card 1: Disorganized Books */}
            <div className="bg-[#121212] text-white p-7 rounded-3xl border border-neutral-800 shadow-xl space-y-6 flex flex-col justify-between hover-lift transition-all reveal-blur reveal-delay-100">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Disorganized Ledgers
                </span>
                <h3 className="font-serif text-xl font-medium text-neutral-100">
                  Behind on reconciliations
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Receipts scattered across folders, unpaid bills untracked, and bank feeds un-reconciled for multiple months.
                </p>
              </div>

              {/* Mockup Bar UI */}
              <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-neutral-300">
                  <span>Reconciliation Backlog</span>
                  <span className="text-neutral-400">4 Months</span>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-4/5 rounded-full transition-all duration-1000" />
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-neutral-400 h-full w-3/5 rounded-full transition-all duration-1000" />
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-neutral-600 h-full w-2/5 rounded-full transition-all duration-1000" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Card 2: Financial Blindspots */}
            <div className="bg-[#121212] text-white p-7 rounded-3xl border border-neutral-800 shadow-xl space-y-6 flex flex-col justify-between hover-lift transition-all reveal-blur reveal-delay-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Profit Blindspots
                </span>
                <h3 className="font-serif text-xl font-medium text-neutral-100">
                  Unsure about real profit & cash flow
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Operating without monthly Balance Sheet and P&L reports, leaving you in the dark about business margins.
                </p>
              </div>

              {/* Mockup Grid / Calendar UI */}
              <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-300">
                  <span>Monthly Financial Packets</span>
                  <span className="text-emerald-400">Delivered</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <div className="bg-neutral-800 p-2 rounded-lg text-center text-[10px] text-neutral-300 hover:bg-neutral-700 transition-colors">P&L: Ready</div>
                  <div className="bg-neutral-800 p-2 rounded-lg text-center text-[10px] text-neutral-300 hover:bg-neutral-700 transition-colors">Balance Sheet</div>
                  <div className="bg-neutral-800 p-2 rounded-lg text-center text-[10px] text-neutral-300 hover:bg-neutral-700 transition-colors">AP/AR Aging</div>
                  <div className="bg-white text-black font-bold p-2 rounded-lg text-center text-[10px] shadow-sm">Audit-Proof</div>
                </div>
              </div>
            </div>

            {/* Dark Card 3: Property Accounting Gaps */}
            <div className="bg-[#121212] text-white p-7 rounded-3xl border border-neutral-800 shadow-xl space-y-6 flex flex-col justify-between hover-lift transition-all reveal-blur reveal-delay-300">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Property Management Gaps
                </span>
                <h3 className="font-serif text-xl font-medium text-neutral-100">
                  Trust & owner ledger headaches
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  AppFolio or Buildium ledger discrepancies, unallocated security deposits, and delayed owner distributions.
                </p>
              </div>

              {/* Mockup Gauge UI */}
              <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Trust Reconciled</div>
                  <div className="text-lg font-bold text-white mt-0.5">3-Way Matched</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-serif text-sm font-bold text-white shadow-inner">
                  100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 5. "WHAT WE TAKE OFF YOUR PLATE" SECTION                                  */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column Description */}
            <div className="lg:col-span-5 space-y-4 reveal-blur">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Comprehensive Care
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-black leading-tight">
                What we take off your plate
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                From daily receipts to annual returns, here is what we handle seamlessly so you don't have to spend your weekends dealing with accounting.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(true)}
                  className="px-6 py-3 bg-black hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shadow-sm inline-flex items-center gap-2 hover:scale-105 active:scale-95 duration-150"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            {/* Right Column Dark Accordion / Widget */}
            <div className="lg:col-span-7 reveal-blur reveal-delay-200">
              <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl space-y-4">
                {plateServices.map((svc, idx) => {
                  const isOpen = openPlateItem === idx;
                  return (
                    <div
                      key={idx}
                      className="border-b border-neutral-800 last:border-b-0 pb-4 last:pb-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenPlateItem(isOpen ? null : idx)}
                        className="w-full text-left py-3 flex items-center justify-between text-neutral-100 hover:text-white transition-colors group"
                      >
                        <span className="font-serif text-lg font-medium tracking-tight">
                          {svc.title}
                        </span>
                        <span className="text-neutral-400 group-hover:text-white transition-colors">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pt-2 pb-3 space-y-4 text-xs text-neutral-300 leading-relaxed animate-fadeIn">
                          <p>{svc.description}</p>
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
                            {svc.details.map((detail, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2 text-neutral-200 font-medium">
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 6. "THREE STEPS, AND IT'S OFF YOUR MIND." SECTION                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 bg-[#FAFAFA] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="max-w-xl space-y-2 reveal-blur">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-black tracking-tight leading-tight">
              Three steps, and it's off your mind.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 01 */}
            <div className="space-y-4 border-t border-slate-200 pt-6 reveal-blur reveal-delay-100">
              <span className="font-serif text-4xl sm:text-5xl text-slate-300 font-light block">01</span>
              <h3 className="font-serif text-xl font-bold text-black">Book an intro call</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 20-minute chat to understand your setup, current pain points, and what you need off your plate.
              </p>
            </div>

            {/* Step 02 */}
            <div className="space-y-4 border-t border-slate-200 pt-6 reveal-blur reveal-delay-200">
              <span className="font-serif text-4xl sm:text-5xl text-slate-300 font-light block">02</span>
              <h3 className="font-serif text-xl font-bold text-black">We take over documents</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Secure upload of bank feeds, past returns, and software access. We handle all onboarding within 48 hours.
              </p>
            </div>

            {/* Step 03 */}
            <div className="space-y-4 border-t border-slate-200 pt-6 reveal-blur reveal-delay-300">
              <span className="font-serif text-4xl sm:text-5xl text-slate-300 font-light block">03</span>
              <h3 className="font-serif text-xl font-bold text-black">Audit-ready books every month</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monthly P&L, balance sheets, and bank reconciliations delivered on time like clockwork with zero stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 7. "A PARTNER, NOT A PAPER MILL." (Scenic Landscape Banner)               */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-neutral-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="Scenic coastline backdrop"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-125"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Text */}
            <div className="lg:col-span-7 space-y-6 reveal-blur">
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
                A dedicated bookkeeping partner, not an automated bot.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg">
                We are a committed B2B accounting practice. You work with an assigned senior bookkeeper who understands your chart of accounts by name, reconciles your feeds weekly, and replies within 24 hours.
              </p>
              <div className="pt-2">
                <a
                  href="tel:03345786667"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>Direct phone line: 03345786667</span>
                </a>
              </div>
            </div>

            {/* Right Dark Floating Card */}
            <div className="lg:col-span-5 bg-black/80 backdrop-blur-md p-8 rounded-3xl border border-neutral-700 shadow-2xl space-y-6 reveal-blur reveal-delay-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Our Service Promise
                </span>
                <h3 className="font-serif text-xl font-medium text-white">
                  BookKeepPro Quality Guarantee
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>100% CPA-supervised review on all reconciled ledgers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Strict 3-way escrow & security deposit trust compliance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Direct WhatsApp & dedicated email accountant support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Month-to-month flexibility — cancel anytime with zero lock-in</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-bold text-xs rounded-full transition-all"
                >
                  Schedule an Intro Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 8. "CLEAR FEES, AGREED BEFORE WE START." (Pricing Rows)                  */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 reveal-blur">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Transparent Engagement Pricing
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-black">
                Clear fees, agreed before we start.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              No hidden retainer meters or surprise invoices. Transparent baseline packages and hourly rates customized to your exact transaction volume.
            </p>
          </div>

          {/* Pricing Disclaimer Alert */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-4 reveal-blur">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>
                <strong>Pricing Note:</strong> Tiers shown are baseline price ranges in USD. Final custom pricing is confirmed after assessing transaction frequency, software feeds, and clean-up requirements.
              </span>
            </div>
            <button
              type="button"
              onClick={handleOpenCalculator}
              className="text-blue-600 font-bold hover:underline shrink-0 text-xs"
            >
              Open Instant Calculator →
            </button>
          </div>

          {/* Pricing Rows List */}
          <div className="border-t border-slate-200 divide-y divide-slate-100">
            {pricingRows.map((tier, idx) => {
              const formattedPrice = formatUSD(tier.priceUSD);
              const delayClass = idx === 0 ? 'reveal-delay-100' : idx === 1 ? 'reveal-delay-200' : 'reveal-delay-300';
              return (
                <div
                  key={idx}
                  className={`py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors px-4 rounded-2xl reveal-blur ${delayClass}`}
                >
                  <div className="space-y-1.5 max-w-lg">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-xl font-bold text-black">{tier.name}</h3>
                      {tier.isPopular && (
                        <span className="px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                          {tier.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/80 text-[9px] font-bold uppercase tracking-wider rounded-md">
                        Provisional Pricing
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{tier.description}</p>
                    <p className="text-[10px] text-amber-700 font-medium">
                      * Starting estimate subject to final confirmation based on transaction complexity.
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="font-serif text-3xl font-bold text-black">{formattedPrice}</span>
                        <span className="text-xs text-slate-400">{tier.period}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                        Provisional Base
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleChoosePlan(tier.name, formattedPrice)}
                      className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 duration-150 shadow-sm"
                    >
                      Choose plan
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Flexible Hourly Row */}
            <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 rounded-2xl bg-[#FAFAFA] reveal-blur reveal-delay-400">
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-black">Hourly Bookkeeping Support</h3>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[9px] font-bold uppercase tracking-wider rounded-full">
                    Flexible
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  On-demand bookkeeping support in packages of 5, 10, 20, 30, or 40+ hours per month. Ideal for special cleanup sprints, backlog reconciliation, or overflow tasks.
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-black">{formatRangeUSD(10, 20)}</span>
                  <span className="text-xs text-slate-400 ml-1">/ hour</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleChoosePlan('Hourly Bookkeeping Support', `${formatRangeUSD(10, 20)}/hr`)}
                  className="px-5 py-2.5 border border-slate-300 hover:border-black text-slate-900 bg-white rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 duration-150"
                >
                  Hire hourly
                </button>
              </div>
            </div>
          </div>

          {/* Calculator Section Container */}
          <div id="calculator" className="pt-6 scroll-mt-24 reveal-blur">
            <div className="text-center pt-2 pb-4">
              <button
                type="button"
                onClick={() => setShowCalculator(!showCalculator)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:border-black rounded-full text-xs font-bold text-slate-900 bg-white shadow-xs transition-all hover:scale-105 duration-150"
              >
                <Calculator className="w-4 h-4 text-black" />
                <span>{showCalculator ? 'Hide Cost Calculator' : 'Open Cost Calculator'}</span>
              </button>
            </div>

            {/* Interactive Calculator Dropdown Embed */}
            {showCalculator && (
              <div className="pt-2 animate-fadeIn">
                <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                  <StepByStepCalculator onRequestQuoteWithDetails={() => setIsBookModalOpen(true)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 9. EDITORIAL TESTIMONIAL QUOTE SECTION                                   */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FBFBFB] border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 reveal-blur">
          <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight tracking-tight">
            “For years our property ledgers and small business accounts were a complete fog. One quarter with BookKeepPro and the fog was gone — our books are 100% reconciled and tax-ready every month.”
          </blockquote>
          <div className="pt-2">
            <div className="font-bold text-xs text-black uppercase tracking-wider">Sarah Jenkins</div>
            <div className="text-xs text-slate-400 mt-0.5">Managing Director, Horizon Properties & Media Group</div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 10. METRICS / STATS BAR (Black Section)                                  */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-neutral-800 reveal-blur">
            <div className="space-y-1 md:pr-8">
              <div className="font-serif text-4xl sm:text-5xl font-normal text-white">100%</div>
              <p className="text-xs text-neutral-400 font-medium">Reconciled monthly balance sheets & audit-ready books</p>
            </div>

            <div className="space-y-1 pt-6 md:pt-0 md:px-8">
              <div className="font-serif text-4xl sm:text-5xl font-normal text-white">0</div>
              <p className="text-xs text-neutral-400 font-medium">Discrepancies across tenant ledgers & trust accounts</p>
            </div>

            <div className="space-y-1 pt-6 md:pt-0 md:pl-8">
              <div className="font-serif text-4xl sm:text-5xl font-normal text-white">98%</div>
              <p className="text-xs text-neutral-400 font-medium">Client retention rate year-over-year</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 11. "QUESTIONS OWNERS ACTUALLY ASK." (FAQ Section)                       */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-2 reveal-blur">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-black">
              Questions owners actually ask.
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6 reveal-blur">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between font-serif text-lg font-medium text-black hover:text-slate-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-black font-light text-xl ml-4">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-4 text-xs text-slate-600 leading-relaxed max-w-2xl animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 12. "READY WHEN YOU ARE." (Contact Section)                              */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Contact Details */}
            <div className="lg:col-span-6 space-y-6 reveal-blur">
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-black">
                Ready when you are.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                Reach out directly to begin your onboarding or schedule a complimentary 20-minute diagnostic session.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-black" />
                  <a href="mailto:nexa@gmail.com" className="font-bold text-black hover:underline">
                    nexa@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-black" />
                  <a href="tel:03345786667" className="font-bold text-black hover:underline">
                    03345786667 (Direct / WhatsApp)
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Clock className="w-4 h-4 text-black" />
                  <span>Mon – Fri: 9:00 AM – 6:00 PM EST</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(true)}
                  className="px-7 py-3.5 bg-black hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95 duration-150"
                >
                  Book intro call
                </button>
              </div>
            </div>

            {/* Right Column Location / Availability Card */}
            <div className="lg:col-span-6 reveal-blur reveal-delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                  alt="Coastal office view"
                  className="w-full h-full object-cover filter brightness-[0.35]"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                      Practice Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open for New Clients
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-serif text-2xl font-normal text-white">
                      BookKeepPro
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Avg. onboarding turnaround: <strong>48 hours</strong>
                      <br />
                      Avg. client response time: <strong>&lt; 2 hours</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 13. MINIMALIST FOOTER                                                    */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <footer className="bg-black text-white py-16 px-4 sm:px-8 text-xs border-t border-neutral-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-2 max-w-sm">
              <div className="font-serif text-2xl font-bold text-white">BookKeepPro</div>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Certified Bookkeeping & Property Accounting Practice serving clients across USA, Canada, Australia, and the United Kingdom.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-neutral-400 font-medium">
              <div className="space-y-2">
                <span className="text-white font-bold block text-[11px] uppercase tracking-wider">Navigation</span>
                <div><a href="#services" className="hover:text-white transition-colors">Services</a></div>
                <div><a href="#process" className="hover:text-white transition-colors">Process</a></div>
                <div><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></div>
              </div>

              <div className="space-y-2">
                <span className="text-white font-bold block text-[11px] uppercase tracking-wider">Resources</span>
                <div>
                  <button
                    type="button"
                    onClick={handleOpenCalculator}
                    className="hover:text-white transition-colors text-left"
                  >
                    Calculator
                  </button>
                </div>
                <div><a href="#faq" className="hover:text-white transition-colors">FAQ</a></div>
                <div><a href="mailto:nexa@gmail.com" className="hover:text-white transition-colors">Support</a></div>
              </div>

              <div className="space-y-2">
                <span className="text-white font-bold block text-[11px] uppercase tracking-wider">Contact</span>
                <div><a href="mailto:nexa@gmail.com" className="hover:text-white transition-colors">nexa@gmail.com</a></div>
                <div><a href="tel:03345786667" className="hover:text-white transition-colors">03345786667</a></div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
            <div>© {new Date().getFullYear()} BookKeepPro. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPolicyModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setPolicyModal('terms')}
                className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Terms of Engagement
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 14. INTERACTIVE ACCESSIBLE POLICY MODAL (Privacy & Terms)                */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {policyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    BookKeepPro Legal & Compliance
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-950">
                    {policyModal === 'privacy' ? 'Client Privacy Policy' : 'Terms of Engagement'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPolicyModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto py-6 space-y-4 text-xs text-slate-600 leading-relaxed pr-2">
              {policyModal === 'privacy' ? (
                <>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">1. Commitment to Data Confidentiality</h4>
                    <p>
                      At BookKeepPro, we treat all client financial records, bank statements, ledger data, and tenant records with strict confidentiality. We implement 256-bit encryption for all file transfers and client communications.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">2. Read-Only Accounting Access</h4>
                    <p>
                      We strictly request standard read-only accountant user access to financial software (such as QuickBooks Online, Xero, AppFolio, Buildium, and banking portals). We never request or store your primary administrative passwords.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">3. Non-Disclosure & Zero Third-Party Selling</h4>
                    <p>
                      Your financial records, client names, transaction histories, and tax documents are never shared, rented, or sold to third parties or marketing platforms under any circumstances.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">4. Contact & Data Officer</h4>
                    <p>
                      For data inquiries or deletion requests, contact our compliance team directly at <strong>nexa@gmail.com</strong> or phone <strong>03345786667</strong>.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">1. Scope of Bookkeeping Services</h4>
                    <p>
                      BookKeepPro provides professional full-cycle bookkeeping, monthly account reconciliations, historical catch-up/cleanup, property management trust accounting, and financial statement compilation as agreed in your client onboarding agreement.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">2. Client Responsibilities</h4>
                    <p>
                      Clients agree to provide timely access to banking feeds, invoices, receipts, and property management portals required for reconciling transactions each month.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">3. Billing & Flexible Engagement</h4>
                    <p>
                      Monthly bookkeeping plans are billed on a recurring monthly cycle. Hourly engagements ($10–$20/hr USD) are billed based on approved hour packages. Engagements can be modified or paused with standard written notice without penalties.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">4. Direct Support & Communication</h4>
                    <p>
                      Clients receive dedicated senior bookkeeper support via email (<strong>nexa@gmail.com</strong>) and direct line/WhatsApp (<strong>03345786667</strong>) with a guaranteed response turnaround within 24 business hours.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setPolicyModal(null)}
                className="px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 15. INTERACTIVE BOOK INTRO CALL MODAL                                    */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  BookKeepPro
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-950">Book an Intro Call</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md">
                  ✓
                </div>
                <h4 className="font-bold text-base text-emerald-900">Consultation Scheduled!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. We will reach out to <strong>{formData.email}</strong> and call you at <strong>{formData.phone || '03345786667'}</strong> within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsBookModalOpen(false);
                  }}
                  className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {formData.selectedPlan && (
                  <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">Selected Package</span>
                      <strong className="text-slate-900 text-sm">{formData.selectedPlan}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, selectedPlan: '' })}
                      className="text-[10px] text-slate-400 hover:text-slate-700 underline font-semibold"
                    >
                      Change
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="03345786667"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Company / Entity Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Properties LLC"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Primary Area of Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-normal outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Small Business Bookkeeping">Small Business Bookkeeping</option>
                    <option value="Property Management Accounting (AppFolio/Buildium)">Property Management Accounting (AppFolio/Buildium)</option>
                    <option value="3-Way Trust & Escrow Reconciliation">3-Way Trust & Escrow Reconciliation</option>
                    <option value="Historical Catch-up / Cleanup Project">Historical Catch-up / Cleanup Project</option>
                    <option value="Hourly Bookkeeping Support ($10–$20/hr)">Hourly Bookkeeping Support ($10–$20/hr)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Notes / Scope Overview</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current workload, software, or deadlines..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all"
                >
                  Confirm Intro Call Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  MoreHorizontal,
  ExternalLink,
  Eye,
  Sparkles,
  Check,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  Star,
  X,
  Laptop,
  Smartphone,
  Tablet,
} from 'lucide-react';

export const TaxConsultantMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Templates' | 'Components' | 'Plugins' | 'Vectors'>('Templates');
  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [cookieConsent, setCookieConsent] = useState(true);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [callFormData, setCallFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Tax Planning & Advisory',
    notes: '',
  });
  const [callSubmitted, setCallSubmitted] = useState(false);

  const authorTemplates = [
    {
      id: 'fernweh',
      title: 'Fernweh - Pitch Deck',
      author: 'Michael Slotta',
      price: 'Free',
      tag: 'Pitch Deck',
      bg: 'bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950',
      previewContent: 'Fernweh Pitch Deck • Minimalist Studio Presentation',
    },
    {
      id: 'voltix',
      title: 'Voltix Electrician',
      author: 'Michael Slotta',
      price: 'Free',
      tag: 'Trades & Services',
      bg: 'bg-gradient-to-br from-yellow-950/30 via-stone-900 to-stone-950',
      previewContent: 'Voltix Electrician • High Converting Trade Website',
    },
    {
      id: 'outbound',
      title: 'Outbound Automation',
      author: 'Michael Slotta',
      price: 'Free',
      tag: '$0→$35K MRR',
      bg: 'bg-gradient-to-br from-rose-950/30 via-stone-900 to-stone-950',
      previewContent: '$0 → $35K MRR • B2B Lead Gen Funnel Template',
    },
    {
      id: 'bold-clean',
      title: 'Bold & Clean Brand',
      author: 'Michael Slotta',
      price: 'Free',
      tag: 'Agency & Studio',
      bg: 'bg-gradient-to-br from-emerald-950/30 via-stone-900 to-stone-950',
      previewContent: 'Bold & Clean Brand • Editorial Typography Portfolio',
    },
  ];

  const relatedTemplates = [
    {
      id: 'wealthora',
      title: 'Wealthora',
      subtitle: 'Financial Advisor',
      author: 'SoloFoundry',
      price: 'Free',
      color: '#A3E635',
      tag: 'Fintech & Wealth',
    },
    {
      id: 'consilio',
      title: 'Consilio',
      subtitle: 'Unlocking growth',
      author: 'Bob from Flux',
      price: 'Free',
      color: '#06B6D4',
      tag: 'Consultancy',
    },
    {
      id: 'accura',
      title: 'Accura',
      subtitle: 'Financial Clarity for Modern Teams',
      author: 'Igor Chernyshov',
      price: 'Free',
      color: '#3B82F6',
      tag: 'Accounting SaaS',
    },
    {
      id: 'regulated',
      title: 'Regulated Firm',
      subtitle: 'Professional services',
      author: 'Capmarth',
      price: 'Free',
      color: '#6366F1',
      tag: 'Legal & Audit',
    },
  ];

  const handleBookCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#EDEDED] font-sans antialiased selection:bg-[#0099FF] selection:text-white pb-24">
      {/* ── 1. TOP MARKETPLACE NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#1A1A1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Marketplace Dropdown & Back Chevron */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1A1A20] text-xs font-semibold text-white border border-[#222228] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Marketplace</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-[#141418] hover:bg-[#1A1A20] flex items-center justify-center border border-[#222228] text-slate-400 hover:text-white transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold">
            {(['Templates', 'Components', 'Plugins', 'Vectors'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`transition-colors py-1 ${
                  activeTab === tab
                    ? 'text-white font-bold'
                    : 'text-[#888892] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Right: Search Bar */}
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search Templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141418] border border-[#222228] focus:border-[#0099FF] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </header>

      {/* ── 2. TEMPLATE HERO TITLE & QUICK ACTIONS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tax Consultant
          </h1>
          <p className="text-xs sm:text-sm text-[#888892] mt-1">
            Tax & Accounting Firm Template by Michael Slotta
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFullPreview(true)}
            className="px-5 py-2 rounded-xl bg-[#17171C] hover:bg-[#202026] text-white text-xs font-bold border border-[#2A2A32] transition-colors flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>Show Preview</span>
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Template remixed to your workspace! Opening editor...');
              setShowFullPreview(true);
            }}
            className="px-5 py-2 rounded-xl bg-[#0099FF] hover:bg-[#0088EE] text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Remix for Free</span>
          </button>
        </div>
      </div>

      {/* ── 3. MAIN HERO SHOWCASE MOCKUP CANVAS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 my-6">
        <div className="bg-[#111115] border border-[#1F1F26] rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Big Editorial Headline */}
          <div className="max-w-3xl mx-auto mb-10 space-y-2">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Twenty years of trust.
              <br />
              <span className="text-white">Built in an afternoon.</span>
            </h2>
          </div>

          {/* Central Monitor Frame Mockup */}
          <div className="relative max-w-5xl mx-auto">
            {/* Monitor Outer Bevel */}
            <div className="bg-[#1A1A22] p-2.5 sm:p-4 rounded-3xl border-2 border-[#2C2C38] shadow-2xl">
              {/* Inner Screen Display */}
              <div className="bg-white rounded-2xl overflow-hidden text-slate-900 text-left border border-slate-200">
                {/* ── Inside Website Display: Top Navbar ── */}
                <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <div className="font-serif font-bold text-lg text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Lindqvist & Co.</span>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
                    <span className="hover:text-slate-900 cursor-pointer">Services</span>
                    <span className="hover:text-slate-900 cursor-pointer">Pricing</span>
                    <span className="hover:text-slate-900 cursor-pointer">FAQ</span>
                    <button
                      type="button"
                      onClick={() => setIsBookCallOpen(true)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Book intro call
                    </button>
                  </div>
                </div>

                {/* ── Inside Website Display: Hero & Split Sections ── */}
                <div className="p-6 sm:p-10 space-y-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Taxes Handled */}
                    <div className="lg:col-span-6 space-y-4">
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                        Taxes, handled.
                        <br />
                        You get back to business.
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                        For freelancers, small firms, and growing companies — we file, we plan, and we deal with the tax office. You stop worrying about it.
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsBookCallOpen(true)}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Book intro call
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowFullPreview(true)}
                          className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                        >
                          Explore services
                        </button>
                      </div>

                      {/* Editorial Photo Showcase */}
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] relative">
                          <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                            alt="Lead Tax Consultant"
                            className="w-full h-full object-cover grayscale contrast-125"
                          />
                        </div>
                        <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] relative">
                          <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                            alt="Client Consultation"
                            className="w-full h-full object-cover grayscale contrast-125"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Three Steps & Partner Box */}
                    <div className="lg:col-span-6 space-y-6">
                      {/* Three Steps Card */}
                      <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/80 space-y-5">
                        <h4 className="font-serif text-xl font-bold text-slate-900">
                          Three steps, and it's off your mind.
                        </h4>

                        <div className="space-y-4 text-xs">
                          <div className="flex items-start gap-3">
                            <span className="font-serif font-bold text-slate-400 text-base">01</span>
                            <div>
                              <strong className="text-slate-900 block font-bold">Book an intro call</strong>
                              <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                                Twenty minutes. We see where you stand and what needs doing.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="font-serif font-bold text-slate-400 text-base">02</span>
                            <div>
                              <strong className="text-slate-900 block font-bold">We take over your documents</strong>
                              <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                                One secure upload. We ensure nothing is missing or late.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="font-serif font-bold text-slate-400 text-base">03</span>
                            <div>
                              <strong className="text-slate-900 block font-bold">You stop thinking about taxes</strong>
                              <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                                No fines, no missed deadlines. You get a quarterly summary in plain language.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Partner Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-7 bg-slate-900 text-white rounded-2xl p-5 space-y-2">
                          <h5 className="font-serif font-bold text-sm">A partner, not a paper mill.</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            You work with the same senior advisor all year — someone who knows your business and picks up the phone.
                          </p>
                        </div>
                        <div className="sm:col-span-5 bg-slate-100 rounded-2xl p-4 border border-slate-200 text-xs space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-slate-500 block">100% UNBIASED, CPA</span>
                          <p className="font-bold text-slate-900 text-xs">8 years experience</p>
                          <p className="text-[11px] text-slate-500">Fixed fees • No meter</p>
                          <p className="text-[11px] text-slate-500">Boutique level care</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor Stand */}
            <div className="w-36 h-8 bg-gradient-to-b from-[#2A2A36] to-[#16161E] mx-auto rounded-b-xl border-x-2 border-b-2 border-[#2C2C38]" />
            <div className="w-56 h-3 bg-[#1D1D26] mx-auto rounded-full shadow-xl border border-[#2E2E3C]" />
          </div>

          {/* ── 4 Thumbnail Selector Cards Below Monitor ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {/* Thumb 1 */}
            <div
              onClick={() => setActiveThumb(0)}
              className={`p-4 rounded-2xl bg-[#17171E] border cursor-pointer text-left transition-all ${
                activeThumb === 0
                  ? 'border-[#0099FF] ring-2 ring-[#0099FF]/30 shadow-lg'
                  : 'border-[#242430] hover:border-slate-600'
              }`}
            >
              <span className="text-[10px] font-bold text-[#888894] uppercase tracking-wider block">
                Twenty years of trust.
              </span>
              <p className="text-xs font-bold text-white mt-1 line-clamp-1">
                Built in an afternoon.
              </p>
              <div className="mt-3 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                Editorial Hero Preview
              </div>
            </div>

            {/* Thumb 2 */}
            <div
              onClick={() => setActiveThumb(1)}
              className={`p-4 rounded-2xl bg-[#17171E] border cursor-pointer text-left transition-all ${
                activeThumb === 1
                  ? 'border-[#0099FF] ring-2 ring-[#0099FF]/30 shadow-lg'
                  : 'border-[#242430] hover:border-slate-600'
              }`}
            >
              <span className="text-[10px] font-bold text-[#888894] uppercase tracking-wider block">
                Turns "I'll think about it"
              </span>
              <p className="text-xs font-bold text-white mt-1 line-clamp-1">
                into "book the intro call."
              </p>
              <div className="mt-3 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                Pain-point Visuals
              </div>
            </div>

            {/* Thumb 3 */}
            <div
              onClick={() => setActiveThumb(2)}
              className={`p-4 rounded-2xl bg-[#17171E] border cursor-pointer text-left transition-all ${
                activeThumb === 2
                  ? 'border-[#0099FF] ring-2 ring-[#0099FF]/30 shadow-lg'
                  : 'border-[#242430] hover:border-slate-600'
              }`}
            >
              <span className="text-[10px] font-bold text-[#888894] uppercase tracking-wider block">
                Never built a website?
              </span>
              <p className="text-xs font-bold text-white mt-1 line-clamp-1">
                Just chat.
              </p>
              <div className="mt-3 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                Mobile & Chat Flow
              </div>
            </div>

            {/* Thumb 4 */}
            <div
              onClick={() => {
                setActiveThumb(3);
                setShowFullPreview(true);
              }}
              className={`p-4 rounded-2xl bg-[#17171E] border cursor-pointer text-left transition-all ${
                activeThumb === 3
                  ? 'border-[#0099FF] ring-2 ring-[#0099FF]/30 shadow-lg'
                  : 'border-[#242430] hover:border-slate-600'
              }`}
            >
              <span className="text-[10px] font-bold text-[#0099FF] uppercase tracking-wider block">
                Remix for free
              </span>
              <p className="text-xs font-bold text-white mt-1 line-clamp-1">
                One-Click Clone
              </p>
              <div className="mt-3 h-12 bg-[#0099FF]/10 rounded-xl border border-[#0099FF]/30 flex items-center justify-center text-[10px] text-[#0099FF] font-bold">
                Launch Live Demo →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MIDDLE TWO-COLUMN CONTENT SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: About Tax Consultant (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-black text-white tracking-tight">
              About Tax Consultant
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#A0A0AC] leading-relaxed">
              <p>
                <strong>Tax Consultant</strong> is an accountant and tax firm template for practices that earn trust before the first phone call. Show what you take off a client's plate — services, process, and pricing in plain language — and turn "I should sort my taxes" into a booked intro call.
              </p>

              <p>
                Editorial serif headlines, warm black-and-white photography, and calm, generous spacing give the page the feel of a firm that has everything under control. Dashboard-style cards turn tax pain points into visuals clients recognize instantly, and a full-width partner section puts a face on the numbers.
              </p>

              <p>
                <strong>Perfect for:</strong> accountants, tax advisors, CPA firms, bookkeepers, financial consultants, or any boutique practice that sells trust.
              </p>

              <p>
                <strong>Features:</strong> One-page layout — hero, services, process, pricing, stats, FAQ, contact. Pain-point cards with dashboard-style graphics. Three-tier pricing section. FAQ accordion. Contact form, ready to wire to your inbox (<code className="text-white bg-white/10 px-1.5 py-0.5 rounded">nexa@gmail.com</code>). Privacy Policy, Terms, and 404 pages included. Fully responsive — desktop, tablet, and phone. Easy to customize: swap the name, photos, and copy in minutes.
              </p>

              <p className="font-bold text-white pt-2">
                Win the client before the first call.
              </p>
            </div>
          </div>

          {/* Right Column: Author Profile & Metadata Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#141418] border border-[#22222A] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            {/* Author Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Michael Slotta"
                  className="w-10 h-10 rounded-full object-cover border border-[#2E2E38]"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Michael Slotta</h4>
                  <span className="text-[11px] text-[#7A7A85]">@michaelslotta</span>
                </div>
              </div>

              <button type="button" className="text-slate-500 hover:text-white" aria-label="Options">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Metadata Table */}
            <div className="divide-y divide-[#22222A] text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-[#7A7A85]">Published</span>
                <span className="font-semibold text-white">Aug 31, 2026</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#7A7A85]">Updated</span>
                <span className="font-semibold text-white">Sep 20, 2026</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#7A7A85]">License</span>
                <span className="font-semibold text-white">Limited</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFullPreview(true)}
                className="w-full py-3.5 bg-[#1C1C24] hover:bg-[#252530] text-white font-bold text-xs rounded-xl border border-[#2E2E3C] transition-colors"
              >
                Show Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Remixing template into workspace...');
                  setShowFullPreview(true);
                }}
                className="w-full py-3.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Remix for Free</span>
              </button>
            </div>

            {/* Tags */}
            <div className="pt-2 border-t border-[#22222A]">
              <span className="text-[10px] font-bold text-[#7A7A85] uppercase tracking-wider block mb-2">
                Tags
              </span>
              <span className="inline-block px-3 py-1 bg-[#1A1A22] text-[#A0A0B0] hover:text-white rounded-lg text-xs font-semibold border border-[#262632] cursor-pointer">
                Consulting
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FROM MICHAEL SLOTTA SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 border-t border-[#1A1A22]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">From Michael Slotta</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {authorTemplates.map((item) => (
            <div
              key={item.id}
              onClick={() => setShowFullPreview(true)}
              className="bg-[#141418] border border-[#22222A] hover:border-[#333340] rounded-2xl overflow-hidden cursor-pointer group transition-all"
            >
              <div className={`h-40 ${item.bg} p-4 flex flex-col justify-between relative overflow-hidden`}>
                <span className="self-end px-2 py-0.5 rounded text-[10px] font-bold bg-black/40 text-white/80 border border-white/10">
                  {item.tag}
                </span>
                <p className="text-xs font-bold text-white/90 leading-tight">
                  {item.previewContent}
                </p>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#0099FF] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#7A7A85] mt-0.5">{item.author} • {item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. RELATED TEMPLATES SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 border-t border-[#1A1A22]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Related Templates</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedTemplates.map((item) => (
            <div
              key={item.id}
              onClick={() => setShowFullPreview(true)}
              className="bg-[#141418] border border-[#22222A] hover:border-[#333340] rounded-2xl overflow-hidden cursor-pointer group transition-all"
            >
              <div className="h-40 bg-[#171720] p-4 flex flex-col justify-between border-b border-[#22222A]">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs" style={{ color: item.color }}>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-500">{item.tag}</span>
                </div>
                <p className="text-xs font-semibold text-slate-300">
                  {item.subtitle}
                </p>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-[#0099FF] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#7A7A85] mt-0.5">{item.author} • {item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. BOTTOM FLOATING ACTION / OKAY BAR ── */}
      {cookieConsent && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <button
            type="button"
            onClick={() => setCookieConsent(false)}
            className="px-6 py-2.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-bold text-xs rounded-xl shadow-xl shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <span>Okay</span>
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* FULL LIVE INTERACTIVE TEMPLATE PREVIEW MODAL                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col animate-fadeIn">
          {/* Preview Toolbar */}
          <div className="bg-[#121216] border-b border-[#22222C] px-6 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview: Tax Consultant (Lindqvist & Co.)
              </span>
              <span className="text-slate-500">|</span>
              <div className="flex items-center gap-1 bg-[#1A1A22] p-1 rounded-lg border border-[#282834]">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-md ${previewDevice === 'desktop' ? 'bg-[#0099FF] text-white' : 'text-slate-400 hover:text-white'}`}
                  aria-label="Desktop view"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1.5 rounded-md ${previewDevice === 'tablet' ? 'bg-[#0099FF] text-white' : 'text-slate-400 hover:text-white'}`}
                  aria-label="Tablet view"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-md ${previewDevice === 'mobile' ? 'bg-[#0099FF] text-white' : 'text-slate-400 hover:text-white'}`}
                  aria-label="Mobile view"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:03345786667"
                className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" /> 03345786667
              </a>
              <button
                type="button"
                onClick={() => setIsBookCallOpen(true)}
                className="px-4 py-2 bg-[#0099FF] text-white rounded-lg font-bold text-xs hover:bg-[#0088EE]"
              >
                Book Intro Call
              </button>
              <button
                type="button"
                onClick={() => setShowFullPreview(false)}
                className="p-2 bg-[#1E1E26] hover:bg-[#282834] rounded-lg text-slate-400 hover:text-white"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Device Frame Viewport */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start bg-[#0D0D11]">
            <div
              className={`bg-white text-slate-900 rounded-3xl shadow-2xl transition-all overflow-hidden ${
                previewDevice === 'desktop'
                  ? 'w-full max-w-6xl'
                  : previewDevice === 'tablet'
                  ? 'w-full max-w-2xl'
                  : 'w-full max-w-sm'
              }`}
            >
              {/* Inside Website Live Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-30">
                <div className="font-serif font-bold text-xl text-slate-900 tracking-tight">
                  Lindqvist & Co.
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <a href="mailto:nexa@gmail.com" className="text-slate-600 hover:text-slate-900 hidden sm:inline">
                    nexa@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsBookCallOpen(true)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                  >
                    Book Call
                  </button>
                </div>
              </div>

              {/* Inside Website Hero Content */}
              <div className="p-6 sm:p-14 space-y-16">
                <div className="max-w-3xl space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                    Boutique Tax & Accounting Advisory
                  </span>
                  <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                    Taxes, handled.
                    <br />
                    You get back to business.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                    For freelancers, small firms, and growing companies — we file, we plan, and we deal with the tax office. You stop worrying about it.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsBookCallOpen(true)}
                      className="px-6 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-slate-800"
                    >
                      Book 20-Min Intro Call
                    </button>
                    <a
                      href="tel:03345786667"
                      className="px-6 py-3.5 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" /> 03345786667
                    </a>
                  </div>
                </div>

                {/* 3 Step Process */}
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-8">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Three steps, and it's off your mind.
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <span className="font-serif font-bold text-2xl text-slate-400 block">01</span>
                      <h3 className="font-bold text-sm text-slate-900">Book an intro call</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Twenty minutes. We see where you stand and what needs doing.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-serif font-bold text-2xl text-slate-400 block">02</span>
                      <h3 className="font-bold text-sm text-slate-900">We take over documents</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        One secure upload. We ensure nothing is missing, late, or unorganized.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-serif font-bold text-2xl text-slate-400 block">03</span>
                      <h3 className="font-bold text-sm text-slate-900">Stop worrying about taxes</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        No penalties or missed deadlines. You get clean quarterly summaries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Tiers in Preview */}
                <div className="space-y-8">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Pricing</span>
                    <h2 className="font-serif text-3xl font-bold text-slate-900">Simple, transparent tiers</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="font-bold text-base text-slate-900">Solo / Freelance</h3>
                      <div className="text-2xl font-black text-slate-900">$150<span className="text-xs text-slate-400 font-normal"> / mo</span></div>
                      <p className="text-xs text-slate-500 leading-relaxed">Annual return + quarterly check-in for solo operators.</p>
                      <button type="button" onClick={() => setIsBookCallOpen(true)} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-xs">Choose Solo</button>
                    </div>

                    <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-base">Small Business</h3>
                        <span className="text-[10px] font-bold uppercase bg-blue-500 text-white px-2 py-0.5 rounded">Popular</span>
                      </div>
                      <div className="text-2xl font-black">$350<span className="text-xs text-slate-400 font-normal"> / mo</span></div>
                      <p className="text-xs text-slate-400 leading-relaxed">Full monthly bookkeeping, tax planning, and payroll filing.</p>
                      <button type="button" onClick={() => setIsBookCallOpen(true)} className="w-full py-2.5 bg-[#0099FF] hover:bg-[#0088EE] text-white rounded-xl font-bold text-xs">Choose Business</button>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="font-bold text-base text-slate-900">Corporate & Property</h3>
                      <div className="text-2xl font-black text-slate-900">$750<span className="text-xs text-slate-400 font-normal"> / mo</span></div>
                      <p className="text-xs text-slate-500 leading-relaxed">Multi-entity accounting, 3-way trust compliance, and dedicated CPA.</p>
                      <button type="button" onClick={() => setIsBookCallOpen(true)} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-xs">Choose Corporate</button>
                    </div>
                  </div>
                </div>

                {/* Footer in Preview */}
                <div className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <span className="font-serif font-bold text-slate-900">Lindqvist & Co.</span>
                  <div className="flex items-center gap-4">
                    <a href="mailto:nexa@gmail.com" className="hover:text-slate-900">nexa@gmail.com</a>
                    <span>•</span>
                    <a href="tel:03345786667" className="hover:text-slate-900">03345786667</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* BOOK INTRO CALL MODAL                                                 */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {isBookCallOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#0099FF] uppercase tracking-widest block">
                  Lindqvist & Co. Consultation
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">Book an Intro Call</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookCallOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {callSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md">
                  ✓
                </div>
                <h4 className="font-bold text-base text-emerald-900">Call Scheduled!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{callFormData.name}</strong>. We've sent confirmation to <strong>{callFormData.email}</strong>. Our senior consultant will call you at <strong>{callFormData.phone || '03345786667'}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCallSubmitted(false);
                    setIsBookCallOpen(false);
                  }}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookCallSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Lindqvist"
                    value={callFormData.name}
                    onChange={(e) => setCallFormData({ ...callFormData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-[#0099FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={callFormData.email}
                      onChange={(e) => setCallFormData({ ...callFormData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-[#0099FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="03345786667"
                      value={callFormData.phone}
                      onChange={(e) => setCallFormData({ ...callFormData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-[#0099FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Service Area</label>
                  <select
                    value={callFormData.service}
                    onChange={(e) => setCallFormData({ ...callFormData, service: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-normal"
                  >
                    <option value="Tax Planning & Advisory">Tax Planning & Advisory</option>
                    <option value="Small Business Bookkeeping">Small Business Bookkeeping</option>
                    <option value="Property Management Trust Accounting">Property Management Trust Accounting</option>
                    <option value="Historical Backlog Cleanup">Historical Backlog Cleanup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your tax scenario or bookkeeping questions..."
                    value={callFormData.notes}
                    onChange={(e) => setCallFormData({ ...callFormData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-[#0099FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
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

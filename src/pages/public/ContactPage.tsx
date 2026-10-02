import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Send, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WebsiteHeader } from '../../components/layout/WebsiteHeader';
import { WebsiteFooter } from '../../components/layout/WebsiteFooter';
import { CountryCurrencySelector } from '../../components/common/CountryCurrencySelector';

export const ContactPage: React.FC = () => {
  const { navigate } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    country: 'United States',
    serviceType: 'Small Business Monthly Bookkeeping',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.fullName,
      fullName: formData.fullName,
      email: formData.email,
      _replyto: formData.email,
      _subject: `New Contact Inquiry from ${formData.fullName} - ${formData.serviceType}`,
      phone: formData.phone,
      company: formData.companyName || 'N/A',
      country: formData.country,
      selectedService: formData.serviceType,
      message: formData.message || 'N/A',
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('https://formspree.io/f/mbglvrkg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          country: 'United States',
          serviceType: 'Small Business Monthly Bookkeeping',
          message: '',
        });
      } else {
        const errorJson = await response.json().catch(() => ({}));
        setSubmitError(errorJson?.error || 'Something went wrong. Please try again or contact us directly.');
      }
    } catch (err) {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <WebsiteHeader />

      {/* ── Hero ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            We are here to help
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Schedule a Free Consultation
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Speak directly with a senior bookkeeping expert about your chart of accounts, backlog cleanup, or AppFolio trust accounting requirements.
          </p>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-14 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Send a Message or Request a Proposal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Guaranteed response within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-emerald-900">
                  Thank you!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Your booking request has been submitted successfully. We will contact you shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {submitError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold animate-fadeIn">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Michael Chang"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. michael@horizonpm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1">Company / Portfolio Name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Horizon Property Partners"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white font-normal focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Pakistan">🇵🇰 Pakistan</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Service Type Needed</label>
                  <select
                    name="service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-normal focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Small Business Monthly Bookkeeping">Small Business Monthly Bookkeeping</option>
                    <option value="Property Management Bookkeeping (AppFolio/Buildium)">Property Management Bookkeeping (AppFolio/Buildium)</option>
                    <option value="Historical Catch-up / Cleanup Project">Historical Catch-up / Cleanup Project</option>
                    <option value="3-Way Trust Account Audit & Recs">3-Way Trust Account Audit & Recs</option>
                    <option value="Hourly Bookkeeping Support ($10–$20/hr)">Hourly Bookkeeping Support ($10–$20/hr)</option>
                    <option value="Other Financial Accounting Support">Other Financial Accounting Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Project Details & Software</label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Tell us about your current accounting setup, number of transactions/units, or specific pain points..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-normal focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Guarantee (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Get in Touch Directly</h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Email:</strong>
                    <a href="mailto:nexa@gmail.com" className="hover:text-blue-400">
                      nexa@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Phone / WhatsApp:</strong>
                    <a href="tel:03345786667" className="hover:text-blue-400">
                      03345786667
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Response SLA:</strong>
                    <span>Within 2 Business Hours (Monday–Friday)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Jurisdictions Served:</strong>
                    <span>United States • Canada • Australia • United Kingdom</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>NDA & Confidentiality Guarantee</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We sign formal bilateral Non-Disclosure Agreements with all clients before receiving login credentials or viewing sensitive ledger records.
              </p>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
};

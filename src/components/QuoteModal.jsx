import React, { useState, useEffect } from 'react';
import { Mail, Info, Send } from 'lucide-react';

// ─── Configuration ────────────────────────────────────────────────────────────
// Change this to your actual business email address.
// This will be the "To:" address in every quote email that users send.
const RECIPIENT_EMAIL = 'nexa@gmail.com';

/**
 * Builds a mailto: URI with all quote details pre-filled in the email body.
 */
function buildMailtoLink({ formData, serviceName, estimatedPrice, breakdown }) {
  const clientName = formData.businessName
    ? `${formData.fullName} (${formData.businessName})`
    : formData.fullName;

  const subject = encodeURIComponent(
    `Quote Request – ${serviceName} | ${formData.fullName}`
  );

  const breakdownLines = Array.isArray(breakdown) && breakdown.length > 0
    ? breakdown.map((item) => `  • ${item.label}: $${item.amount}`).join('\n')
    : '  (No breakdown available)';

  const body = encodeURIComponent(
    [
      `Hello LedgerSync Team,`,
      ``,
      `I would like to request a formal quote based on the estimate generated on your website.`,
      ``,
      `──────────────────────────────`,
      `CLIENT DETAILS`,
      `──────────────────────────────`,
      `Name:   ${clientName}`,
      `Email:  ${formData.email}`,
      `Phone:  ${formData.phone || 'Not provided'}`,
      ``,
      `──────────────────────────────`,
      `SERVICE ESTIMATE`,
      `──────────────────────────────`,
      `Service:  ${serviceName}`,
      ``,
      `Price Breakdown:`,
      breakdownLines,
      ``,
      `Estimated Total:  $${estimatedPrice.toLocaleString()}`,
      `──────────────────────────────`,
      ``,
      `Please reach out at your earliest convenience to discuss next steps.`,
      ``,
      `Best regards,`,
      formData.fullName,
    ].join('\n')
  );

  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Quote Request Modal — mailto-based email quote sending.
 * Styled in bold VPM dark & yellow aesthetic.
 */
export function QuoteModal({
  isOpen,
  onClose,
  serviceName,
  estimatedPrice,
  breakdown = [],
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');

  // Reset every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrors({});
      setMailtoLink('');
      setFormData({ fullName: '', businessName: '', email: '', phone: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const link = buildMailtoLink({
      formData,
      serviceName,
      estimatedPrice,
      breakdown,
    });

    setMailtoLink(link);
    setIsSubmitted(true);

    // Open the user's default email client immediately
    window.location.href = link;
  };

  // ── Re-open email client ─────────────────────────────────────────────────────
  const handleOpenEmailClient = () => {
    if (mailtoLink) {
      window.location.href = mailtoLink;
    }
  };

  // ── Shared input className helper ────────────────────────────────────────────
  const inputCls = (errKey) =>
    `w-full text-sm font-semibold px-4 py-3 rounded-xl border bg-white text-[#0E0E0E] focus:outline-none focus:ring-2 transition-all ${
      errKey && errors[errKey]
        ? 'border-rose-500 focus:ring-rose-500'
        : 'border-gray-300 focus:ring-[#FFD600] focus:border-[#FFD600]'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-gray-900 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-scaleUp">
        {/* Top Accent Strip */}
        <div className="h-2 bg-[#FFD600] w-full" />

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between bg-[#0E0E0E] text-white">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD600] block mb-0.5">
              Direct Contact
            </span>
            <h3 className="font-heading text-xl font-black">
              {isSubmitted ? 'Quote Ready to Send! 🎉' : 'Request Official Quote'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FFD600] hover:text-[#0E0E0E] text-white/70 flex items-center justify-center font-black transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────────── */}
        <div className="p-6 overflow-y-auto">

          {/* ═══════════════════ SUCCESS STATE ═══════════════════ */}
          {isSubmitted ? (
            <div className="text-center py-2 space-y-5">
              {/* Email icon */}
              <div className="w-16 h-16 bg-[#FFD600] border-2 border-[#0E0E0E] text-black rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 text-black" />
              </div>

              {/* Heading */}
              <div>
                <h4 className="font-heading text-xl font-black text-[#0E0E0E]">
                  Your Email Client Is Opening
                </h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  We've prepared your complete quote for{' '}
                  <strong className="text-black">
                    {formData.businessName || formData.fullName}
                  </strong>
                  . Just click <strong className="text-black">Send</strong> in your email application.
                </p>
              </div>

              {/* Quote Snapshot */}
              <div className="bg-[#0E0E0E] text-white rounded-2xl p-5 text-xs space-y-2.5 text-left border border-white/10">
                <p className="text-[#FFD600] font-black uppercase tracking-widest text-[10px] mb-1">
                  Quote Snapshot
                </p>
                <div className="flex justify-between">
                  <span className="text-white/60">Service:</span>
                  <span className="font-bold text-white">{serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Client:</span>
                  <span className="font-bold text-white">
                    {formData.businessName
                      ? `${formData.fullName} (${formData.businessName})`
                      : formData.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Email:</span>
                  <span className="font-bold text-[#FFD600]">{formData.email}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-1">
                  <span className="text-white/80 font-bold">Estimated Total:</span>
                  <span className="font-heading font-black text-[#FFD600] text-lg">
                    ${estimatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Fallback help text */}
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Email app didn't open?{' '}
                <button
                  type="button"
                  onClick={handleOpenEmailClient}
                  className="text-black font-bold underline underline-offset-2 hover:text-yellow-600 transition-colors"
                >
                  Click here to re-open
                </button>
                {' '}or reach us directly at{' '}
                <a
                  href={`mailto:${RECIPIENT_EMAIL}`}
                  className="text-black font-bold underline underline-offset-2 hover:text-yellow-600 transition-colors"
                >
                  {RECIPIENT_EMAIL}
                </a>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleOpenEmailClient}
                  id="btn-open-email-client"
                  className="w-full py-4 px-5 bg-[#FFD600] hover:bg-[#F5C800] active:scale-[0.98] text-[#0E0E0E] font-heading font-black text-sm uppercase tracking-wide rounded-xl shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 focus:outline-none"
                >
                  <Mail className="w-4 h-4 text-black" />
                  Re-Open Email Client
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 text-gray-600 hover:text-black text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                >
                  Done – Close
                </button>
              </div>
            </div>

          ) : (
            /* ═══════════════════ FORM STATE ═══════════════════ */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service & Price banner */}
              <div className="grid grid-cols-2 gap-3 bg-[#0E0E0E] text-white rounded-2xl p-4 text-xs border border-white/10">
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-black tracking-wider">Service</span>
                  <span className="font-heading font-bold text-white text-xs mt-0.5 block">{serviceName}</span>
                </div>
                <div className="text-right">
                  <span className="text-white/50 block text-[10px] uppercase font-black tracking-wider">Estimate</span>
                  <span className="font-heading font-black text-[#FFD600] text-base mt-0.5 block">
                    ${estimatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-heading font-black tracking-wider uppercase text-[#0E0E0E] mb-1.5">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="quote-fullname"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={inputCls('fullName')}
                />
                {errors.fullName && (
                  <p className="text-xs font-semibold text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs font-heading font-black tracking-wider uppercase text-[#0E0E0E] mb-1.5">
                  Business Name <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  id="quote-business"
                  placeholder="e.g. Acme Properties LLC"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className={inputCls('')}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-heading font-black tracking-wider uppercase text-[#0E0E0E] mb-1.5">
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="quote-email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputCls('email')}
                />
                {errors.email && (
                  <p className="text-xs font-semibold text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-heading font-black tracking-wider uppercase text-[#0E0E0E] mb-1.5">
                  Phone Number <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="quote-phone"
                  placeholder="e.g. (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputCls('')}
                />
              </div>

              {/* Info notice */}
              <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-200 rounded-2xl p-3.5 text-xs text-[#0E0E0E] leading-relaxed">
                <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>
                  Clicking <strong>Send Quote Request</strong> will launch your email client with your customized parameters pre-filled.
                </span>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-submit-quote"
                  className="w-full py-4 px-5 bg-[#FFD600] hover:bg-[#F5C800] active:scale-[0.98] text-[#0E0E0E] font-heading font-black text-sm uppercase tracking-wide rounded-xl shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 focus:outline-none"
                >
                  <Send className="w-4 h-4 text-black" />
                  Send Quote Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

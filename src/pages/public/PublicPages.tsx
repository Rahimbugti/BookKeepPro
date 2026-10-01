import React from 'react';
import { Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('landing')}
            className="font-bold text-lg text-slate-900"
          >
            ← Back to Home
          </button>
          <div className="font-bold text-blue-600">VPM Workforce Pro</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            About Our Mission
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Pioneering Remote Property Management Workforce Operations
          </h1>
          <p className="text-slate-600 leading-relaxed">
            VPM Workforce Management was built specifically to solve the bottleneck of staffing property managers, real estate investment trusts, and HOA boards with reliable, specialized virtual assistant talent.
          </p>
          <p className="text-slate-600 leading-relaxed">
            By unifying candidate screening, software certifications (AppFolio, Buildium, Yardi), daily task delegation, live attendance tracking, and compliance-ready global disbursements into a single SaaS interface, companies scale their operational portfolios while cutting overhead by up to 70%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-3xl font-bold text-blue-600">2,500+</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Virtual Assistants Placed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-3xl font-bold text-blue-600">99.4%</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Client Retention Rate</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-3xl font-bold text-blue-600">&lt; 48 hrs</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Average Match Time</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export const ServicesPage: React.FC = () => {
  const { navigate } = useApp();

  const services = [
    { title: 'Full-Cycle Property Management Bookkeepers', desc: 'AppFolio & Buildium trust accounting, 3-way reconciliations, AP/AR, and owner statements.' },
    { title: 'Maintenance Dispatch & Vendor Coordinators', desc: '24/7 tenant work order intake, contractor dispatch, work verification, and invoice matching.' },
    { title: 'Leasing & Tenant Support Specialists', desc: 'Listing syndication, prospect inquiry answering, application processing, and lease renewal notices.' },
    { title: 'Short-Term Rental & Guest Experience Hosts', desc: 'Airbnb & VRBO messaging, dynamic rate adjustment, review management, and cleaner scheduling.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('landing')}
            className="font-bold text-lg text-slate-900"
          >
            ← Back to Home
          </button>
          <div className="font-bold text-blue-600">Talent & Specialized Roles</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900">Virtual Assistant Services We Provide</h1>
          <p className="text-slate-500 mt-2">Certified remote professionals ready to deploy into your workflow immediately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-black fill-black" />
                <span>{s.title}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { navigate } = useApp();
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('landing')}
            className="font-bold text-lg text-slate-900"
          >
            ← Back to Home
          </button>
          <div className="font-bold text-blue-600">Contact VPM Workforce</div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Get in Touch with our Talent Team</h1>
          
          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold">
              ✓ Thank you! One of our staffing directors will reach out within 2 hours.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs font-semibold"
            >
              <div>
                <label className="block text-slate-700 mb-1">Company Name</label>
                <input type="text" required placeholder="e.g. Acme Properties" className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Your Email</label>
                <input type="email" required placeholder="name@company.com" className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Positions Needed</label>
                <textarea rows={3} placeholder="Describe the roles and software required..." className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                Submit Consultation Request
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

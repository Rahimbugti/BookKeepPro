import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface AuthPageProps {
  isRegister?: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ isRegister = false }) => {
  const { navigate, loginAs } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('company');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
        {/* Brand */}
        <div
          className="text-center cursor-pointer"
          onClick={() => navigate('landing')}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md shadow-blue-600/20 mb-3">
            VPM
          </div>
          <h2 className="font-extrabold text-2xl text-slate-900">
            {isRegister ? 'Create VPM Account' : 'Welcome to Workforce Pro'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister
              ? 'Join companies and virtual assistants worldwide'
              : 'Sign in to access your dashboard'}
          </p>
        </div>

        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Select User Role:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'company' as UserRole, label: 'Company' },
              { role: 'employee' as UserRole, label: 'VA Staff' },
              { role: 'admin' as UserRole, label: 'Admin' },
            ].map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => setSelectedRole(item.role)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  selectedRole === item.role
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          {isRegister && (
            <div>
              <label className="block text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. John Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all"
          >
            {isRegister ? 'Register & Continue' : `Sign In as ${selectedRole.toUpperCase()}`}
          </button>
        </form>

        {/* Quick Demo Credentials Help */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed text-center">
          💡 <strong>Demo Mode Active:</strong> Click Sign In to instantly access the {selectedRole.toUpperCase()} dashboard with live sample data!
        </div>

        {/* Toggle */}
        <div className="text-center text-xs text-slate-500">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('login')}
                className="text-blue-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('register')}
                className="text-blue-600 font-bold hover:underline"
              >
                Register Free
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

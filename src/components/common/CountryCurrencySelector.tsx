import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface Props {
  variant?: 'header' | 'inline' | 'dark';
}

export const CountryCurrencySelector: React.FC<Props> = ({ variant = 'header' }) => {
  const { currentCurrency, setCurrencyCode, supportedCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getContainerStyle = () => {
    if (variant === 'dark') {
      return 'bg-slate-800 text-white border-slate-700 hover:bg-slate-750';
    }
    if (variant === 'inline') {
      return 'bg-white text-slate-800 border-slate-300 hover:border-slate-400 shadow-xs';
    }
    // header variant
    return 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${getContainerStyle()}`}
        aria-expanded={isOpen}
        aria-label="Select Country and Currency"
      >
        <span className="text-sm leading-none">{currentCurrency.flag}</span>
        <span className="font-bold text-slate-900 tracking-tight">
          {currentCurrency.code} ({currentCurrency.symbol})
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-black" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn">
          <div className="px-3.5 py-2 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-black" /> Select Country & Currency
            </p>
          </div>

          <div className="py-1">
            {supportedCurrencies.map((curr) => {
              const isSelected = curr.code === currentCurrency.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => {
                    setCurrencyCode(curr.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-blue-50/70 text-blue-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{curr.flag}</span>
                    <div>
                      <p className="font-bold text-slate-900 text-xs leading-none">
                        {curr.country}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {curr.name} • {curr.symbol} {curr.code}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-black" />}
                </button>
              );
            })}
          </div>

          <div className="px-3.5 py-1.5 bg-slate-50/70 border-t border-slate-100 text-[10px] text-slate-400">
            Base rates pegged to USD ($).
          </div>
        </div>
      )}
    </div>
  );
};

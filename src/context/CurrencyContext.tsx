import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SUPPORTED_CURRENCIES,
  CurrencyConfig,
} from '../data/pricingConfig';

interface CurrencyContextType {
  currentCurrency: CurrencyConfig;
  setCurrencyCode: (code: string) => void;
  formatUSD: (amountUSD: number) => string;
  formatRangeUSD: (minUSD: number, maxUSD: number) => string;
  supportedCurrencies: CurrencyConfig[];
  isDetectingIP: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// ISO 2-letter country code to supported currency mapping
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  PK: 'PKR', // Pakistan 🇵🇰
  US: 'USD', // United States 🇺🇸
  CA: 'CAD', // Canada 🇨🇦
  GB: 'GBP', // United Kingdom 🇬🇧
  UK: 'GBP', // United Kingdom 🇬🇧
  AU: 'AUD', // Australia 🇦🇺
  NZ: 'AUD', // New Zealand 🇳🇿
};

// Fast zero-latency timezone fallback
function detectFromTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/Karachi|Pakistan/i.test(tz)) return 'PKR';
    if (/London|Europe\/Belfast|Europe\/London/i.test(tz)) return 'GBP';
    if (/Toronto|Vancouver|Montreal|Edmonton|Halifax|Winnipeg|Canada/i.test(tz)) return 'CAD';
    if (/Sydney|Melbourne|Brisbane|Perth|Adelaide|Darwin|Hobart|Australia/i.test(tz)) return 'AUD';
    if (/New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Honolulu|America/i.test(tz)) return 'USD';
  } catch (e) {
    // Ignore error
  }
  return null;
}

// IP-based Geolocation Lookup
async function detectCountryByIP(): Promise<string | null> {
  const endpoints = [
    async () => {
      const res = await fetch('https://api.country.is/', {
        signal: AbortSignal.timeout(3000),
      });
      const data = await res.json();
      return data?.country || null;
    },
    async () => {
      const res = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(3000),
      });
      const data = await res.json();
      return data?.country_code || data?.country || null;
    },
    async () => {
      const res = await fetch('https://ipwho.is/', {
        signal: AbortSignal.timeout(3000),
      });
      const data = await res.json();
      return data?.country_code || null;
    },
  ];

  for (const fetcher of endpoints) {
    try {
      const countryCode = await fetcher();
      if (countryCode && typeof countryCode === 'string') {
        const upper = countryCode.trim().toUpperCase();
        if (COUNTRY_TO_CURRENCY[upper]) {
          return COUNTRY_TO_CURRENCY[upper];
        }
      }
    } catch {
      // Try next endpoint
    }
  }
  return null;
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencyCode, setCurrencyCodeState] = useState<string>('USD');
  const [isDetectingIP, setIsDetectingIP] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('bookkeep_selected_currency');
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      setCurrencyCodeState(saved);
      setIsDetectingIP(false);
      return;
    }

    // Step 1: Instant zero-latency timezone estimation
    const tzGuess = detectFromTimezone();
    if (tzGuess && SUPPORTED_CURRENCIES[tzGuess]) {
      setCurrencyCodeState(tzGuess);
    }

    // Step 2: Accurate IP lookup in background
    detectCountryByIP()
      .then((detected) => {
        if (detected && SUPPORTED_CURRENCIES[detected]) {
          const userModified = localStorage.getItem('bookkeep_selected_currency');
          if (!userModified) {
            setCurrencyCodeState(detected);
          }
        }
      })
      .catch((err) => {
        console.warn('IP country detection fallback retained:', err);
      })
      .finally(() => {
        setIsDetectingIP(false);
      });
  }, []);

  const setCurrencyCode = (code: string) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyCodeState(code);
      localStorage.setItem('bookkeep_selected_currency', code);
    }
  };

  const currentCurrency =
    SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;

  const formatUSD = (amountUSD: number): string => {
    const converted = Math.round(amountUSD * currentCurrency.exchangeRate);
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const formatRangeUSD = (minUSD: number, maxUSD: number): string => {
    const minConverted = Math.round(minUSD * currentCurrency.exchangeRate);
    const maxConverted = Math.round(maxUSD * currentCurrency.exchangeRate);
    return `${currentCurrency.symbol}${minConverted.toLocaleString()} – ${currentCurrency.symbol}${maxConverted.toLocaleString()} ${currentCurrency.code}`;
  };

  const supportedCurrencies = Object.values(SUPPORTED_CURRENCIES);

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrencyCode,
        formatUSD,
        formatRangeUSD,
        supportedCurrencies,
        isDetectingIP,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

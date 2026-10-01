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
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencyCode, setCurrencyCodeState] = useState<string>('USD');

  // Load saved preference or fallback
  useEffect(() => {
    const saved = localStorage.getItem('vpm_selected_currency');
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      setCurrencyCodeState(saved);
    }
  }, []);

  const setCurrencyCode = (code: string) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyCodeState(code);
      localStorage.setItem('vpm_selected_currency', code);
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

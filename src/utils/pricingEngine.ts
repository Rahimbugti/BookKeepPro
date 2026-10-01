import {
  PRICING_CONFIG,
  SUPPORTED_CURRENCIES,
  CurrencyConfig,
  PriceRangeUSD,
} from '../data/pricingConfig';

export interface BreakdownItem {
  label: string;
  minUSD: number;
  maxUSD: number;
  minFormatted: string;
  maxFormatted: string;
  isBase?: boolean;
}

export interface CalculationResult {
  minUSD: number;
  maxUSD: number;
  minFormatted: string;
  maxFormatted: string;
  formattedRange: string;
  breakdown: BreakdownItem[];
  currency: CurrencyConfig;
  disclaimer: string;
}

/**
 * Formats a USD amount into the target currency using the configurable exchange rate
 */
export function formatCurrencyAmount(
  amountUSD: number,
  currencyCode: string = 'USD'
): string {
  const curr = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const converted = Math.round(amountUSD * curr.exchangeRate);
  return `${curr.symbol}${converted.toLocaleString()}`;
}

export function formatPriceRange(
  minUSD: number,
  maxUSD: number,
  currencyCode: string = 'USD'
): string {
  const curr = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const minConverted = Math.round(minUSD * curr.exchangeRate);
  const maxConverted = Math.round(maxUSD * curr.exchangeRate);
  return `${curr.symbol}${minConverted.toLocaleString()} – ${curr.symbol}${maxConverted.toLocaleString()} ${curr.code}`;
}

// ── 1. SMALL BUSINESS PRICING ENGINE ──
export interface SmallBusinessInputs {
  serviceType: 'monthly' | 'cleanup'; // Monthly Bookkeeping vs Cleanup/Catch-up
  transactionTier: string; // 'up-to-100' | '101-250' | '251-500' | '501-1000' | '1001-plus'
  bankAccounts: number;
  creditCards: number;
  cleanupDuration?: string; // '1-month' | '2-3-months' | '4-6-months' | '7-12-months' | '12-plus-months'
  selectedScopeIds?: string[]; // ids matching PRICING_CONFIG.smallBusiness.scopeOfWork
}

export function calculateSmallBusinessRange(
  inputs: SmallBusinessInputs,
  currencyCode: string = 'USD'
): CalculationResult {
  const curr = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const cfg = PRICING_CONFIG.smallBusiness;
  const breakdown: BreakdownItem[] = [];

  let minUSD = 0;
  let maxUSD = 0;

  // Base scope fee
  const isMonthly = inputs.serviceType === 'monthly';
  const baseRange = isMonthly ? cfg.monthlyBaseRange : cfg.cleanupBaseRange;
  minUSD += baseRange.min;
  maxUSD += baseRange.max;

  breakdown.push({
    label: isMonthly ? 'Monthly Core Bookkeeping Base' : 'Historical Cleanup Base Evaluation',
    minUSD: baseRange.min,
    maxUSD: baseRange.max,
    minFormatted: formatCurrencyAmount(baseRange.min, currencyCode),
    maxFormatted: formatCurrencyAmount(baseRange.max, currencyCode),
    isBase: true,
  });

  // Monthly transaction volume fee
  const transTier = cfg.transactionTiers[inputs.transactionTier] || cfg.transactionTiers['up-to-100'];
  if (transTier.range.max > 0) {
    minUSD += transTier.range.min;
    maxUSD += transTier.range.max;
    breakdown.push({
      label: `Transaction Volume: ${transTier.label}`,
      minUSD: transTier.range.min,
      maxUSD: transTier.range.max,
      minFormatted: formatCurrencyAmount(transTier.range.min, currencyCode),
      maxFormatted: formatCurrencyAmount(transTier.range.max, currencyCode),
    });
  }

  // Additional Bank Accounts (1st included, extra billed)
  const extraBankAccounts = Math.max(0, inputs.bankAccounts - 1);
  if (extraBankAccounts > 0) {
    const bankMin = extraBankAccounts * cfg.bankAccountRate.min;
    const bankMax = extraBankAccounts * cfg.bankAccountRate.max;
    minUSD += bankMin;
    maxUSD += bankMax;
    breakdown.push({
      label: `Additional Bank Accounts (${extraBankAccounts} @ ${formatCurrencyAmount(cfg.bankAccountRate.min, currencyCode)}–${formatCurrencyAmount(cfg.bankAccountRate.max, currencyCode)})`,
      minUSD: bankMin,
      maxUSD: bankMax,
      minFormatted: formatCurrencyAmount(bankMin, currencyCode),
      maxFormatted: formatCurrencyAmount(bankMax, currencyCode),
    });
  }

  // Credit Card Accounts
  if (inputs.creditCards > 0) {
    const cardMin = inputs.creditCards * cfg.creditCardRate.min;
    const cardMax = inputs.creditCards * cfg.creditCardRate.max;
    minUSD += cardMin;
    maxUSD += cardMax;
    breakdown.push({
      label: `Credit Card Accounts (${inputs.creditCards} @ ${formatCurrencyAmount(cfg.creditCardRate.min, currencyCode)}–${formatCurrencyAmount(cfg.creditCardRate.max, currencyCode)})`,
      minUSD: cardMin,
      maxUSD: cardMax,
      minFormatted: formatCurrencyAmount(cardMin, currencyCode),
      maxFormatted: formatCurrencyAmount(cardMax, currencyCode),
    });
  }

  // Cleanup duration (only if cleanup is selected)
  if (!isMonthly && inputs.cleanupDuration) {
    const cleanupTier = cfg.cleanupDurations[inputs.cleanupDuration];
    if (cleanupTier) {
      minUSD += cleanupTier.range.min;
      maxUSD += cleanupTier.range.max;
      breakdown.push({
        label: `Backlog Recovery Period: ${cleanupTier.label}`,
        minUSD: cleanupTier.range.min,
        maxUSD: cleanupTier.range.max,
        minFormatted: formatCurrencyAmount(cleanupTier.range.min, currencyCode),
        maxFormatted: formatCurrencyAmount(cleanupTier.range.max, currencyCode),
      });
    }
  }

  // Optional scope selections for Small Business
  if (inputs.selectedScopeIds && inputs.selectedScopeIds.length > 0) {
    const scopeMap = new Map(cfg.scopeOfWork.map((s) => [s.id, s]));
    inputs.selectedScopeIds.forEach((scopeId) => {
      const scopeItem = scopeMap.get(scopeId);
      if (scopeItem) {
        // We include specific modular additions beyond base
        if (['payrollJournal', 'yearEnd1099', 'accountsPayable', 'accountsReceivable'].includes(scopeId)) {
          minUSD += scopeItem.priceRange.min;
          maxUSD += scopeItem.priceRange.max;
        }
        breakdown.push({
          label: `Scope: ${scopeItem.label}`,
          minUSD: scopeItem.priceRange.min,
          maxUSD: scopeItem.priceRange.max,
          minFormatted: formatCurrencyAmount(scopeItem.priceRange.min, currencyCode),
          maxFormatted: formatCurrencyAmount(scopeItem.priceRange.max, currencyCode),
        });
      }
    });
  }

  return {
    minUSD,
    maxUSD,
    minFormatted: formatCurrencyAmount(minUSD, currencyCode),
    maxFormatted: formatCurrencyAmount(maxUSD, currencyCode),
    formattedRange: formatPriceRange(minUSD, maxUSD, currencyCode),
    breakdown,
    currency: curr,
    disclaimer: PRICING_CONFIG.disclaimer,
  };
}

// ── 2. PROPERTY MANAGEMENT PRICING ENGINE ──
export interface PropertyManagementInputs {
  unitTier: string; // '1-10' | '11-25' | '26-50' | '51-100' | '101-250' | '251-plus'
  propertyType: string; // 'residential' | 'commercial' | 'short-term' | 'hoa' | 'mixed' | 'other'
  bankAccounts: number;
  creditCards: number;
  selectedScopeIds: string[]; // ids matching PRICING_CONFIG.propertyManagement.scopeOfWork
}

export function calculatePropertyManagementRange(
  inputs: PropertyManagementInputs,
  currencyCode: string = 'USD'
): CalculationResult {
  const curr = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const cfg = PRICING_CONFIG.propertyManagement;
  const breakdown: BreakdownItem[] = [];

  let minUSD = cfg.baseRange.min;
  let maxUSD = cfg.baseRange.max;

  breakdown.push({
    label: 'Property Management Accounting Base',
    minUSD: cfg.baseRange.min,
    maxUSD: cfg.baseRange.max,
    minFormatted: formatCurrencyAmount(cfg.baseRange.min, currencyCode),
    maxFormatted: formatCurrencyAmount(cfg.baseRange.max, currencyCode),
    isBase: true,
  });

  // Unit / Property Tier
  const unitTier = cfg.unitTiers[inputs.unitTier] || cfg.unitTiers['1-10'];
  if (unitTier.range.max > 0) {
    minUSD += unitTier.range.min;
    maxUSD += unitTier.range.max;
    breakdown.push({
      label: `Portfolio Scale: ${unitTier.label}`,
      minUSD: unitTier.range.min,
      maxUSD: unitTier.range.max,
      minFormatted: formatCurrencyAmount(unitTier.range.min, currencyCode),
      maxFormatted: formatCurrencyAmount(unitTier.range.max, currencyCode),
    });
  }

  // Property Type
  const propType = cfg.propertyTypes[inputs.propertyType] || cfg.propertyTypes.residential;
  if (propType.range.max > 0) {
    minUSD += propType.range.min;
    maxUSD += propType.range.max;
    breakdown.push({
      label: `Property Category: ${propType.label}`,
      minUSD: propType.range.min,
      maxUSD: propType.range.max,
      minFormatted: formatCurrencyAmount(propType.range.min, currencyCode),
      maxFormatted: formatCurrencyAmount(propType.range.max, currencyCode),
    });
  }

  // Bank accounts (1st included)
  const extraBankAccounts = Math.max(0, inputs.bankAccounts - 1);
  if (extraBankAccounts > 0) {
    const bankMin = extraBankAccounts * cfg.bankAccountRate.min;
    const bankMax = extraBankAccounts * cfg.bankAccountRate.max;
    minUSD += bankMin;
    maxUSD += bankMax;
    breakdown.push({
      label: `Operating Bank Accounts (${extraBankAccounts} additional)`,
      minUSD: bankMin,
      maxUSD: bankMax,
      minFormatted: formatCurrencyAmount(bankMin, currencyCode),
      maxFormatted: formatCurrencyAmount(bankMax, currencyCode),
    });
  }

  // Credit card accounts
  if (inputs.creditCards > 0) {
    const cardMin = inputs.creditCards * cfg.creditCardRate.min;
    const cardMax = inputs.creditCards * cfg.creditCardRate.max;
    minUSD += cardMin;
    maxUSD += cardMax;
    breakdown.push({
      label: `Credit Card Accounts (${inputs.creditCards} cards)`,
      minUSD: cardMin,
      maxUSD: cardMax,
      minFormatted: formatCurrencyAmount(cardMin, currencyCode),
      maxFormatted: formatCurrencyAmount(cardMax, currencyCode),
    });
  }

  // Scope of work selected items
  const scopeMap = new Map(cfg.scopeOfWork.map((s) => [s.id, s]));
  inputs.selectedScopeIds.forEach((scopeId) => {
    const scopeItem = scopeMap.get(scopeId);
    if (scopeItem) {
      minUSD += scopeItem.priceRange.min;
      maxUSD += scopeItem.priceRange.max;
      breakdown.push({
        label: `Scope: ${scopeItem.label}`,
        minUSD: scopeItem.priceRange.min,
        maxUSD: scopeItem.priceRange.max,
        minFormatted: formatCurrencyAmount(scopeItem.priceRange.min, currencyCode),
        maxFormatted: formatCurrencyAmount(scopeItem.priceRange.max, currencyCode),
      });
    }
  });

  return {
    minUSD,
    maxUSD,
    minFormatted: formatCurrencyAmount(minUSD, currencyCode),
    maxFormatted: formatCurrencyAmount(maxUSD, currencyCode),
    formattedRange: formatPriceRange(minUSD, maxUSD, currencyCode),
    breakdown,
    currency: curr,
    disclaimer: PRICING_CONFIG.disclaimer,
  };
}

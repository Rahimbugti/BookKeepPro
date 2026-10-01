/**
 * Configurable pricing rules, currency rates, country definitions, and calculation parameters.
 * Kept completely decoupled from UI so the business owner can easily update pricing tiers.
 */

export interface CurrencyConfig {
  code: string;
  name: string;
  country: string;
  symbol: string;
  flag: string;
  exchangeRate: number; // Multiplier relative to USD (1.0 = USD base)
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    name: 'United States Dollar',
    country: 'United States',
    symbol: '$',
    flag: '🇺🇸',
    exchangeRate: 1.0,
  },
  PKR: {
    code: 'PKR',
    name: 'Pakistani Rupee',
    country: 'Pakistan',
    symbol: 'Rs ',
    flag: '🇵🇰',
    exchangeRate: 278.0,
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    country: 'Canada',
    symbol: 'CA$',
    flag: '🇨🇦',
    exchangeRate: 1.36,
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    country: 'Australia',
    symbol: 'A$',
    flag: '🇦🇺',
    exchangeRate: 1.52,
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    country: 'United Kingdom',
    symbol: '£',
    flag: '🇬🇧',
    exchangeRate: 0.78,
  },
};

export interface PriceRangeUSD {
  min: number;
  max: number;
}

export interface ScopeOption {
  id: string;
  label: string;
  description: string;
  priceRange: PriceRangeUSD;
}

export const PRICING_CONFIG = {
  // ── 1. HOURLY SERVICES CONFIG ──
  hourly: {
    minRateUSD: 10,
    maxRateUSD: 20,
    description: 'Flexible hourly bookkeeping support for ongoing or ad-hoc tasks.',
    standardHourPackages: [5, 10, 20, 30, 40, 50],
  },

  // ── 2. SMALL BUSINESS BOOKKEEPING CONFIG ──
  smallBusiness: {
    monthlyBaseRange: { min: 150, max: 250 },
    cleanupBaseRange: { min: 200, max: 350 },

    transactionTiers: {
      'up-to-100': {
        label: 'Up to 100 transactions/mo',
        range: { min: 0, max: 0 },
      },
      '101-250': {
        label: '101–250 transactions/mo',
        range: { min: 50, max: 100 },
      },
      '251-500': {
        label: '251–500 transactions/mo',
        range: { min: 100, max: 180 },
      },
      '501-1000': {
        label: '501–1,000 transactions/mo',
        range: { min: 200, max: 320 },
      },
      '1001-plus': {
        label: '1,001+ transactions/mo',
        range: { min: 350, max: 550 },
      },
    } as Record<string, { label: string; range: PriceRangeUSD }>,

    bankAccountRate: { min: 25, max: 40 }, // per account beyond 1st
    creditCardRate: { min: 20, max: 35 },  // per card

    cleanupDurations: {
      '1-month': {
        label: '1 Month Catch-up',
        range: { min: 150, max: 250 },
      },
      '2-3-months': {
        label: '2–3 Months Catch-up',
        range: { min: 350, max: 550 },
      },
      '4-6-months': {
        label: '4–6 Months Catch-up',
        range: { min: 650, max: 950 },
      },
      '7-12-months': {
        label: '7–12 Months Catch-up',
        range: { min: 1100, max: 1600 },
      },
      '12-plus-months': {
        label: '12+ Months Historical Cleanup',
        range: { min: 1800, max: 2800 },
      },
    } as Record<string, { label: string; range: PriceRangeUSD }>,

    scopeOfWork: [
      {
        id: 'monthlyReconciliation',
        label: 'Bank & Credit Card Reconciliation',
        description: 'Monthly matching of all bank and credit card accounts with general ledger',
        priceRange: { min: 50, max: 100 },
      },
      {
        id: 'transactionCategorization',
        label: 'Transaction Categorization & Coding',
        description: 'Accurate GAAP revenue and expense classification across all feeds',
        priceRange: { min: 40, max: 80 },
      },
      {
        id: 'accountsPayable',
        label: 'Accounts Payable & Bill Tracking',
        description: 'Vendor bill entry, payment scheduling, and accounts payable aging',
        priceRange: { min: 60, max: 120 },
      },
      {
        id: 'accountsReceivable',
        label: 'Accounts Receivable & Invoicing',
        description: 'Customer invoicing, payment receipt recording, and receivables tracking',
        priceRange: { min: 60, max: 120 },
      },
      {
        id: 'financialStatements',
        label: 'Monthly Financial Statements',
        description: 'Balance Sheet, Profit & Loss, and Cash Flow delivered every month',
        priceRange: { min: 70, max: 140 },
      },
      {
        id: 'quickbooksSupport',
        label: 'QuickBooks Online / Xero Support',
        description: 'Chart of accounts maintenance, automated rule creation, and software optimization',
        priceRange: { min: 50, max: 90 },
      },
      {
        id: 'payrollJournal',
        label: 'Payroll Journal & Reconciliation',
        description: 'Recording payroll entries from Gusto, ADP, or QuickBooks Payroll',
        priceRange: { min: 50, max: 100 },
      },
      {
        id: 'yearEnd1099',
        label: 'Year-End 1099 Contractor Prep',
        description: 'Vendor W-9 collection tracking and 1099-NEC filing preparation',
        priceRange: { min: 60, max: 110 },
      },
    ] as ScopeOption[],
  },

  // ── 3. PROPERTY MANAGEMENT BOOKKEEPING CONFIG ──
  propertyManagement: {
    baseRange: { min: 250, max: 400 },

    unitTiers: {
      '1-10': {
        label: '1–10 Units / Properties',
        range: { min: 0, max: 50 },
      },
      '11-25': {
        label: '11–25 Units / Properties',
        range: { min: 60, max: 120 },
      },
      '26-50': {
        label: '26–50 Units / Properties',
        range: { min: 130, max: 220 },
      },
      '51-100': {
        label: '51–100 Units / Properties',
        range: { min: 250, max: 400 },
      },
      '101-250': {
        label: '101–250 Units / Properties',
        range: { min: 450, max: 700 },
      },
      '251-plus': {
        label: '251+ Units / Properties',
        range: { min: 750, max: 1200 },
      },
    } as Record<string, { label: string; range: PriceRangeUSD }>,

    propertyTypes: {
      residential: {
        label: 'Residential (Single / Multi-Family)',
        range: { min: 0, max: 0 },
      },
      commercial: {
        label: 'Commercial Properties',
        range: { min: 100, max: 200 },
      },
      'short-term': {
        label: 'Short-Term Rental (Airbnb / VRBO)',
        range: { min: 120, max: 220 },
      },
      hoa: {
        label: 'HOA & Community Associations',
        range: { min: 90, max: 160 },
      },
      mixed: {
        label: 'Mixed Portfolio',
        range: { min: 150, max: 250 },
      },
      other: {
        label: 'Other Real Estate Assets',
        range: { min: 80, max: 150 },
      },
    } as Record<string, { label: string; range: PriceRangeUSD }>,

    bankAccountRate: { min: 25, max: 40 },
    creditCardRate: { min: 20, max: 35 },

    scopeOfWork: [
      {
        id: 'accountsPayable',
        label: 'Accounts Payable',
        description: 'Vendor invoice processing, utility management, and contractor payouts in AppFolio/QBO',
        priceRange: { min: 80, max: 140 },
      },
      {
        id: 'accountsReceivable',
        label: 'Accounts Receivable & Rent Tracking',
        description: 'Tenant rent recording, late fee assessments, and deposit reconciliations',
        priceRange: { min: 70, max: 130 },
      },
      {
        id: 'bankReconciliation',
        label: 'Bank & Credit Card Reconciliation',
        description: 'Monthly matching of bank accounts and operating feeds with zero discrepancies',
        priceRange: { min: 75, max: 125 },
      },
      {
        id: 'ownerDistributions',
        label: 'Owner Distributions & Monthly Packets',
        description: 'Monthly statement preparation, reserve calculations, and net owner disbursements',
        priceRange: { min: 80, max: 150 },
      },
      {
        id: 'trustAccounting',
        label: 'Trust Accounting & Escrow Compliance',
        description: 'Strict 3-way security deposit & tenant trust reconciliation compliance',
        priceRange: { min: 150, max: 280 },
      },
      {
        id: 'expenseTracking',
        label: 'Property Expense Tracking',
        description: 'Categorizing maintenance, capEx, and operational costs per property unit',
        priceRange: { min: 60, max: 110 },
      },
      {
        id: 'tenantLedger',
        label: 'Tenant Ledger Management',
        description: 'Maintaining lease balances, move-in/move-out credits, and deposit refund statements',
        priceRange: { min: 70, max: 130 },
      },
      {
        id: 'financialReporting',
        label: 'Financial Statements & CPA Prep',
        description: 'Balance Sheet, Profit & Loss by property, Cash Flow, and Year-End 1099 preparation',
        priceRange: { min: 85, max: 160 },
      },
      {
        id: 'monthlyBookkeeping',
        label: 'Monthly General Ledger Maintenance',
        description: 'Continuous audit-ready journal entries and general ledger monitoring',
        priceRange: { min: 100, max: 200 },
      },
      {
        id: 'catchUpCleanup',
        label: 'Historical Catch-up / Cleanup',
        description: 'Backlog recovery and discrepancy resolution for prior quarters/years',
        priceRange: { min: 250, max: 500 },
      },
    ] as ScopeOption[],
  },

  disclaimer:
    'Estimated pricing only. Final pricing may vary depending on the actual scope, complexity, records, and requirements of the project.',
};

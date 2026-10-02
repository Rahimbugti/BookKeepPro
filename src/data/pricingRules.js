/**
 * Exact pricing rules and rate cards for BookKeepPro Bookkeeping.
 * Centralized and modular for easy adjustment.
 */

export const pricingRules = {
  smallBusiness: {
    basePrice: 150,

    transactions: {
      '0-100': 0,
      '101-300': 50,
      '301-500': 100,
      '501-1000': 200,
      '1000+': 300,
    },

    bankAccountRate: 30,
    creditCardRate: 25,

    cleanup: {
      '1-month': 100,
      '3-months': 250,
      '6-months': 450,
      '6-plus-months': 600,
    },
  },

  propertyManagement: {
    basePrice: 300,

    unitTiers: [
      { max: 20, fee: 0, label: '1–20' },
      { max: 50, fee: 100, label: '21–50' },
      { max: 100, fee: 250, label: '51–100' },
      { max: Infinity, fee: 500, label: '101+' },
    ],

    propertyTypes: {
      'residential': { label: 'Residential', fee: 0 },
      'commercial': { label: 'Commercial', fee: 150 },
      'short-term': { label: 'Short-Term Rental', fee: 200 },
      'hoa': { label: 'HOA', fee: 150 },
      'mixed': { label: 'Mixed Property', fee: 200 },
    },

    bankAccountRate: 30,
    creditCardRate: 25,

    // AppFolio & Property Management specialized Scope of Work services
    scopeOfWork: {
      accountsPayable: {
        id: 'accountsPayable',
        label: 'Accounts Payable & Receivable',
        description: 'Managing vendor payments, invoices, and tenant rent collections efficiently within AppFolio',
        price: 100,
      },
      bankReconciliation: {
        id: 'bankReconciliation',
        label: 'Bank Reconciliation',
        description: 'Accurate and timely bank reconciliations within AppFolio to ensure financial accuracy',
        price: 100,
      },
      expenseTracking: {
        id: 'expenseTracking',
        label: 'Expense Tracking',
        description: 'Managing and categorizing property-related expenses in AppFolio to maintain up-to-date records',
        price: 75,
      },
      financialReporting: {
        id: 'financialReporting',
        label: 'Financial Reporting',
        description: 'Generating & analyzing monthly, quarterly, and annual financial reports tailored to property needs',
        price: 90,
      },
      tenantLedger: {
        id: 'tenantLedger',
        label: 'Tenant Ledger Management',
        description: 'Updating and maintaining tenant ledgers, ensuring accurate tracking of rent payments & balances',
        price: 85,
      },
      ownerDistributions: {
        id: 'ownerDistributions',
        label: 'Owner Distributions',
        description: 'Monthly statement preparation & owner distribution payout calculations',
        price: 75,
      },
      trustAccounting: {
        id: 'trustAccounting',
        label: 'Trust Accounting',
        description: 'Strict 3-way security deposit & escrow trust compliance within AppFolio',
        price: 200,
      },
    },
  },
};

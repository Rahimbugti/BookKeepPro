import { pricingRules } from '../data/pricingRules.js';

/**
 * Calculates price and detailed breakdown for Small Business Bookkeeping
 * @param {Object} data 
 * @returns {{ total: number, breakdown: Array<{ label: string, amount: number, isBase?: boolean }> }}
 */
export function calculateSmallBusinessPrice(data) {
  const {
    serviceType = 'monthly',
    transactionTier = '0-100',
    bankAccounts = 1,
    creditCards = 0,
    cleanupPeriod = '1-month',
  } = data;

  const rules = pricingRules.smallBusiness;
  const breakdown = [];

  // 1. Base Price
  const basePrice = rules.basePrice;
  breakdown.push({
    label: 'Base Price',
    amount: basePrice,
    isBase: true,
  });

  // 2. Transaction Volume (only if > 0)
  const transactionFee = rules.transactions[transactionTier] || 0;
  if (transactionFee > 0) {
    breakdown.push({
      label: 'Transaction Volume',
      amount: transactionFee,
    });
  }

  // 3. Bank Accounts (Each Bank Account = $30)
  const numBank = parseInt(bankAccounts, 10) || 0;
  const bankFee = numBank * rules.bankAccountRate;
  if (bankFee > 0) {
    breakdown.push({
      label: 'Bank Accounts',
      amount: bankFee,
    });
  }

  // 4. Credit Cards (Each Credit Card = $25)
  const numCards = parseInt(creditCards, 10) || 0;
  const cardFee = numCards * rules.creditCardRate;
  if (cardFee > 0) {
    breakdown.push({
      label: 'Credit Cards',
      amount: cardFee,
    });
  }

  // 5. Cleanup (Only if Cleanup is selected)
  let cleanupFee = 0;
  if (serviceType === 'cleanup') {
    cleanupFee = rules.cleanup[cleanupPeriod] || 0;
    if (cleanupFee > 0) {
      breakdown.push({
        label: 'Cleanup',
        amount: cleanupFee,
      });
    }
  }

  const total = basePrice + transactionFee + bankFee + cardFee + cleanupFee;

  return {
    total,
    breakdown,
  };
}

/**
 * Calculates price and breakdown for Property Management Bookkeeping
 * @param {Object} data 
 * @returns {{ total: number, breakdown: Array<{ label: string, amount: number, isBase?: boolean }> }}
 */
export function calculatePropertyManagementPrice(data) {
  const {
    units = 1,
    propertyType = 'residential',
    bankAccounts = 1,
    creditCards = 0,
    selectedScopes = [],
  } = data;

  const rules = pricingRules.propertyManagement;
  const breakdown = [];

  // 1. Base Price
  const basePrice = rules.basePrice;
  breakdown.push({
    label: 'Base Price',
    amount: basePrice,
    isBase: true,
  });

  // 2. Units (1-20: $0, 21-50: $100, 51-100: $250, 101+: $500)
  const unitCount = Math.max(1, parseInt(units, 10) || 1);
  let unitsFee = 0;
  for (const tier of rules.unitTiers) {
    if (unitCount <= tier.max) {
      unitsFee = tier.fee;
      break;
    }
  }
  if (unitsFee > 0) {
    breakdown.push({
      label: 'Units',
      amount: unitsFee,
    });
  }

  // 3. Property Type (Residential: $0, Commercial: $150, Short-Term: $200, HOA: $150, Mixed: $200)
  const propConfig = rules.propertyTypes[propertyType] || rules.propertyTypes.residential;
  if (propConfig.fee > 0) {
    breakdown.push({
      label: propConfig.label,
      amount: propConfig.fee,
    });
  }

  // 4. Bank Accounts ($30 each)
  const numBank = parseInt(bankAccounts, 10) || 0;
  const bankFee = numBank * rules.bankAccountRate;
  if (bankFee > 0) {
    breakdown.push({
      label: 'Bank Accounts',
      amount: bankFee,
    });
  }

  // 5. Credit Cards ($25 each)
  const numCards = parseInt(creditCards, 10) || 0;
  const cardFee = numCards * rules.creditCardRate;
  if (cardFee > 0) {
    breakdown.push({
      label: 'Credit Cards',
      amount: cardFee,
    });
  }

  // 6. Scope of Work (Accounts Payable: $100, AR: $100, Bank Rec: $100, Owner Dist: $75, Trust: $200)
  let scopeTotal = 0;
  const scopeKeys = [
    'accountsPayable',
    'accountsReceivable',
    'bankReconciliation',
    'ownerDistributions',
    'trustAccounting',
  ];

  scopeKeys.forEach((key) => {
    if (Array.isArray(selectedScopes) && selectedScopes.includes(key)) {
      const scopeItem = rules.scopeOfWork[key];
      if (scopeItem) {
        scopeTotal += scopeItem.price;
        breakdown.push({
          label: scopeItem.label,
          amount: scopeItem.price,
        });
      }
    }
  });

  const total = basePrice + unitsFee + propConfig.fee + bankFee + cardFee + scopeTotal;

  return {
    total,
    breakdown,
  };
}

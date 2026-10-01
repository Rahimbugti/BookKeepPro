import React from 'react';
import { FormField, SegmentedNumberSelector, SelectDropdown } from './FormField.jsx';

/**
 * Small Business Bookkeeping Calculator Form
 * Styled with bold VPM aesthetic (dark accents, bold typography, yellow highlights)
 */
export function SmallBusinessCalculator({
  values,
  onChange,
  onReset,
  onChangeService,
}) {
  const transactionOptions = [
    { value: '0-100', label: '0–100 transactions/mo' },
    { value: '101-300', label: '101–300 transactions/mo' },
    { value: '301-500', label: '301–500 transactions/mo' },
    { value: '501-1000', label: '501–1,000 transactions/mo' },
    { value: '1000+', label: '1,000+ transactions/mo' },
  ];

  const bankAccountOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' },
  ];

  const creditCardOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4+' },
  ];

  const cleanupPeriodOptions = [
    { value: '1-month', label: '1 Month Catch-Up' },
    { value: '3-months', label: '3 Months Catch-Up' },
    { value: '6-months', label: '6 Months Catch-Up' },
    { value: '6-plus-months', label: '6+ Months Catch-Up' },
  ];

  const handleFieldChange = (field, val) => {
    onChange({
      ...values,
      [field]: val,
    });
  };

  const isCleanupSelected = values.serviceType === 'cleanup';

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden">
      {/* Top Accent Strip */}
      <div className="h-2 bg-[#FFD600] w-full" />

      <div className="p-6 sm:p-8">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FFD600] border-2 border-[#0E0E0E]" />
              <h2 className="font-heading text-2xl font-black text-[#0E0E0E]">
                Small Business Bookkeeping
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Configure your transaction volume and account parameters
            </p>
          </div>
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={onChangeService}
              className="text-xs font-heading font-black text-[#0E0E0E] bg-gray-100 hover:bg-[#FFD600] px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5"
            >
              <span>⇄</span> Change Service
            </button>
            <button
              type="button"
              onClick={onReset}
              title="Reset to defaults"
              className="text-xs font-heading font-bold text-gray-400 hover:text-rose-600 bg-gray-100 hover:bg-rose-50 px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* 1. Service Type */}
          <FormField label="Service Scope" required tooltip="Select Frequency">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  onChange({
                    ...values,
                    serviceType: 'monthly',
                  });
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between ${
                  values.serviceType === 'monthly'
                    ? 'border-[#0E0E0E] bg-[#FFD600]/10 text-[#0E0E0E] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                }`}
              >
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-0.5">Recurring</div>
                  <span className="font-heading font-black text-sm text-[#0E0E0E]">Monthly Bookkeeping</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    values.serviceType === 'monthly'
                      ? 'border-[#0E0E0E] bg-[#FFD600]'
                      : 'border-gray-300 bg-transparent'
                  }`}
                >
                  {values.serviceType === 'monthly' && (
                    <span className="w-2 h-2 bg-[#0E0E0E] rounded-full" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onChange({
                    ...values,
                    serviceType: 'cleanup',
                    cleanupPeriod: values.cleanupPeriod || '1-month',
                  });
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between ${
                  values.serviceType === 'cleanup'
                    ? 'border-[#0E0E0E] bg-[#FFD600]/10 text-[#0E0E0E] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                }`}
              >
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-0.5">One-Time</div>
                  <span className="font-heading font-black text-sm text-[#0E0E0E]">Catch-Up / Cleanup</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    values.serviceType === 'cleanup'
                      ? 'border-[#0E0E0E] bg-[#FFD600]'
                      : 'border-gray-300 bg-transparent'
                  }`}
                >
                  {values.serviceType === 'cleanup' && (
                    <span className="w-2 h-2 bg-[#0E0E0E] rounded-full" />
                  )}
                </div>
              </button>
            </div>
          </FormField>

          {/* 2. Monthly Transactions */}
          <FormField label="Monthly Transaction Volume" required tooltip="Per Month">
            <SelectDropdown
              id="transaction-tier-select"
              name="transactionTier"
              value={values.transactionTier}
              onChange={(val) => handleFieldChange('transactionTier', val)}
              options={transactionOptions}
            />
          </FormField>

          {/* 3. Bank Accounts */}
          <FormField label="Bank Accounts" required tooltip="Active Checking/Savings">
            <SegmentedNumberSelector
              name="bankAccounts"
              value={values.bankAccounts}
              onChange={(val) => handleFieldChange('bankAccounts', val)}
              options={bankAccountOptions}
            />
          </FormField>

          {/* 4. Credit Card Accounts */}
          <FormField label="Credit Card Accounts" required tooltip="Active Business Cards">
            <SegmentedNumberSelector
              name="creditCards"
              value={values.creditCards}
              onChange={(val) => handleFieldChange('creditCards', val)}
              options={creditCardOptions}
            />
          </FormField>

          {/* 5. Cleanup Period (Only shown when Cleanup is selected) */}
          {isCleanupSelected && (
            <div className="pt-4 border-t-2 border-dashed border-gray-200">
              <FormField label="Cleanup Catch-Up Duration" required tooltip="Historical">
                <SelectDropdown
                  id="cleanup-period-select"
                  name="cleanupPeriod"
                  value={values.cleanupPeriod || '1-month'}
                  onChange={(val) => handleFieldChange('cleanupPeriod', val)}
                  options={cleanupPeriodOptions}
                />
              </FormField>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

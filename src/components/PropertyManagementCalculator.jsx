import React from 'react';
import { FormField, SegmentedNumberSelector, SelectDropdown } from './FormField.jsx';
import { pricingRules } from '../data/pricingRules.js';

/**
 * Property Management Bookkeeping Calculator Form
 * Styled with bold VPM aesthetic (dark accents, bold typography, yellow highlights)
 */
export function PropertyManagementCalculator({
  values,
  onChange,
  onReset,
  onChangeService,
}) {
  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential Properties' },
    { value: 'commercial', label: 'Commercial Units' },
    { value: 'short-term', label: 'Short-Term Rental / Airbnb' },
    { value: 'hoa', label: 'HOA & Community Associations' },
    { value: 'mixed', label: 'Mixed-Use Portfolio' },
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

  const scopeList = [
    pricingRules.propertyManagement.scopeOfWork.accountsPayable,
    pricingRules.propertyManagement.scopeOfWork.accountsReceivable,
    pricingRules.propertyManagement.scopeOfWork.bankReconciliation,
    pricingRules.propertyManagement.scopeOfWork.ownerDistributions,
    pricingRules.propertyManagement.scopeOfWork.trustAccounting,
  ].filter(Boolean);

  const handleFieldChange = (field, val) => {
    onChange({
      ...values,
      [field]: val,
    });
  };

  const handleScopeToggle = (scopeId) => {
    const currentScopes = values.selectedScopes || [];
    let updatedScopes;
    if (currentScopes.includes(scopeId)) {
      updatedScopes = currentScopes.filter((id) => id !== scopeId);
    } else {
      updatedScopes = [...currentScopes, scopeId];
    }
    onChange({
      ...values,
      selectedScopes: updatedScopes,
    });
  };

  const handleUnitsChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      handleFieldChange('units', '');
    } else {
      handleFieldChange('units', Math.max(1, Math.min(1000, val)));
    }
  };

  const adjustUnits = (delta) => {
    const current = parseInt(values.units, 10) || 1;
    const nextVal = Math.max(1, Math.min(1000, current + delta));
    handleFieldChange('units', nextVal);
  };

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
                Property Management Bookkeeping
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Scale your pricing by door count, property portfolio, and operational scope
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
          {/* 1. Number of Units / Properties */}
          <FormField
            label="Total Doors / Units Managed"
            required
            tooltip="1 – 1,000 Doors"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustUnits(-1)}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#0E0E0E] hover:bg-[#FFD600] hover:border-[#0E0E0E] active:scale-95 flex items-center justify-center font-black text-xl transition-all duration-150 focus:outline-none"
                aria-label="Decrease units"
              >
                −
              </button>
              <div className="relative flex-1">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={values.units}
                  onChange={handleUnitsChange}
                  className="w-full text-center font-heading font-black text-xl py-3 px-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-[#FFD600] text-[#0E0E0E]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-wider text-gray-400 pointer-events-none">
                  Units
                </span>
              </div>
              <button
                type="button"
                onClick={() => adjustUnits(1)}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#0E0E0E] hover:bg-[#FFD600] hover:border-[#0E0E0E] active:scale-95 flex items-center justify-center font-black text-xl transition-all duration-150 focus:outline-none"
                aria-label="Increase units"
              >
                +
              </button>
            </div>
          </FormField>

          {/* 2. Property Type */}
          <FormField
            label="Portfolio Asset Type"
            required
            tooltip="Select Type"
          >
            <SelectDropdown
              id="property-type-select"
              name="propertyType"
              value={values.propertyType}
              onChange={(val) => handleFieldChange('propertyType', val)}
              options={propertyTypeOptions}
            />
          </FormField>

          {/* 3. Bank Accounts */}
          <FormField
            label="Operating Bank Accounts"
            required
            tooltip="Checking & Savings"
          >
            <SegmentedNumberSelector
              name="bankAccounts"
              value={values.bankAccounts}
              onChange={(val) => handleFieldChange('bankAccounts', val)}
              options={bankAccountOptions}
            />
          </FormField>

          {/* 4. Credit Card Accounts */}
          <FormField
            label="Business Credit Cards"
            required
            tooltip="Active Card Lines"
          >
            <SegmentedNumberSelector
              name="creditCards"
              value={values.creditCards}
              onChange={(val) => handleFieldChange('creditCards', val)}
              options={creditCardOptions}
            />
          </FormField>

          {/* 5. Scope of Work */}
          <div className="pt-4 border-t-2 border-dashed border-gray-200">
            <FormField
              label="Operational Scope of Work"
              tooltip="Select All Needed"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {scopeList.map((scope) => {
                  const isChecked = (values.selectedScopes || []).includes(scope.id);
                  return (
                    <label
                      key={scope.id}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3 select-none ${
                        isChecked
                          ? 'border-[#0E0E0E] bg-[#FFD600]/10 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                          isChecked
                            ? 'border-[#0E0E0E] bg-[#FFD600] text-[#0E0E0E]'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-heading font-black text-xs sm:text-sm text-[#0E0E0E] block">
                          {scope.label}
                        </span>
                        <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">
                          {scope.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}

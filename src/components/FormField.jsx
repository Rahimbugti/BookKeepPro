import React from 'react';

/**
 * Reusable FormField wrapper with clean label, description, and error state
 * Styled with bold VPM typography and accents
 */
export function FormField({
  label,
  sublabel,
  required = false,
  tooltip,
  children,
  error,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-heading font-black tracking-wider uppercase text-[#0E0E0E]">
          {label}
          {required && <span className="text-amber-500 ml-1 font-bold">*</span>}
        </label>
        {tooltip && (
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
            {tooltip}
          </span>
        )}
      </div>
      {sublabel && <p className="text-xs text-gray-500 leading-relaxed">{sublabel}</p>}
      <div className="mt-1">{children}</div>
      {error && <p className="text-xs font-semibold text-rose-600 mt-1">{error}</p>}
    </div>
  );
}

/**
 * Reusable Segmented Pill Selector (e.g. for 0, 1, 2, 3, 4, 5+)
 * Features VPM bold yellow active state and sleek dark hover
 */
export function SegmentedNumberSelector({
  value,
  onChange,
  options = [],
  name,
}) {
  return (
    <div className="grid grid-flow-col auto-cols-fr gap-1.5 p-1.5 bg-gray-100 border border-gray-200 rounded-xl">
      {options.map((opt) => {
        const isSelected = String(value) === String(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            name={name}
            onClick={() => onChange(opt.value)}
            className={`py-2 px-3 text-xs font-heading font-black rounded-lg transition-all duration-200 flex flex-col items-center justify-center focus:outline-none ${
              isSelected
                ? 'bg-[#FFD600] text-[#0E0E0E] shadow-md shadow-yellow-500/20 scale-[1.02]'
                : 'text-gray-600 hover:text-black hover:bg-white'
            }`}
          >
            <span>{opt.label || opt.value}</span>
            {opt.subtext && (
              <span
                className={`text-[9px] font-bold ${
                  isSelected ? 'text-[#0E0E0E]/70' : 'text-gray-400'
                }`}
              >
                {opt.subtext}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Reusable Select Dropdown with VPM styling & yellow focus ring
 */
export function SelectDropdown({
  value,
  onChange,
  options = [],
  id,
  name,
  className = '',
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm font-semibold rounded-xl py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-[#FFD600] shadow-sm transition-all cursor-pointer hover:border-gray-400 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

import React from 'react';

interface BadgeProps {
  status: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const normalized = status.toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');

  const getStyle = () => {
    switch (normalized) {
      // Candidate / Task / Payroll Statuses
      case 'active':
      case 'hired':
      case 'completed':
      case 'paid':
      case 'present':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';

      case 'in-progress':
      case 'processing':
      case 'interview':
      case 'selected':
      case 'screening':
        return 'bg-blue-50 text-blue-700 border-blue-200';

      case 'open':
      case 'scheduled':
        return 'bg-sky-50 text-sky-700 border-sky-200';

      case 'pending':
      case 'applied':
      case 'half-day':
      case 'late':
        return 'bg-amber-50 text-amber-700 border-amber-200';

      case 'urgent':
      case 'overdue':
      case 'rejected':
      case 'absent':
      case 'terminated':
      case 'suspended':
        return 'bg-rose-50 text-rose-700 border-rose-200';

      case 'paused':
      case 'closed':
      case 'on-leave':
      case 'contract':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${getStyle()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status.replace(/_/g, ' ')}
    </span>
  );
};

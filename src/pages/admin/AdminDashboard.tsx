import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { Building2, Briefcase, FileText, CreditCard, Calendar } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    companies,
    employees,
    jobs,
    candidates,
    interviews,
    tasks,
    payroll,
    trainingCourses,
    navigate,
  } = useApp();

  const totalPayrollSpend = payroll.reduce((acc, curr) => acc + curr.netSalary, 0);
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const pendingCandidates = candidates.filter((c) => c.status !== 'hired' && c.status !== 'rejected').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Administration Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global metrics across companies, remote staff, recruitment pipelines, and payroll.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('admin/reports')}
            className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            View Full Reports
          </button>
          <button
            type="button"
            onClick={() => navigate('admin/jobs')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all"
          >
            + Post Global Job
          </button>
        </div>
      </div>

      {/* ── Metric Cards Grid with Solid Black Icons ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Companies"
          value={companies.length}
          subtitle="All active portfolios"
          icon={<Building2 className="w-5 h-5 text-black" />}
          onClick={() => navigate('admin/companies')}
        />
        <StatsCard
          title="Active Staff (VAs)"
          value={`${activeEmployees} / ${employees.length}`}
          subtitle="99.2% attendance rate"
          icon={<Briefcase className="w-5 h-5 text-black" />}
          trend={{ value: '12% this mo', isPositive: true }}
          onClick={() => navigate('admin/employees')}
        />
        <StatsCard
          title="Open Job Postings"
          value={jobs.filter((j) => j.status === 'open').length}
          subtitle={`${candidates.length} total applicants`}
          icon={<FileText className="w-5 h-5 text-black" />}
          onClick={() => navigate('admin/jobs')}
        />
        <StatsCard
          title="Monthly Payroll Total"
          value={`$${totalPayrollSpend.toLocaleString()}`}
          subtitle="All client disbursements"
          icon={<CreditCard className="w-5 h-5 text-black" />}
          onClick={() => navigate('admin/payroll')}
        />
      </div>

      {/* ── Middle Split: Candidate Funnel & Upcoming Interviews ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pending Candidates Pipeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Candidate Pipeline</h3>
              <p className="text-xs text-slate-400">{pendingCandidates} candidates actively undergoing screening</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('admin/candidates')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View All Candidates →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {candidates.slice(0, 4).map((cand) => (
              <div key={cand.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-black flex items-center justify-center font-bold text-sm shrink-0">
                    {cand.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-900 truncate">{cand.fullName}</p>
                    <p className="text-xs text-slate-400 truncate">{cand.jobTitle || 'General VA'} • {cand.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    ${cand.hourlyRate}/hr
                  </span>
                  <Badge status={cand.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Scheduled Interviews (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Scheduled Interviews</h3>
              <p className="text-xs text-slate-400">{interviews.length} sessions queued</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('admin/interviews')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View Calendar →
            </button>
          </div>

          <div className="space-y-3">
            {interviews.map((int) => (
              <div
                key={int.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{int.candidateName}</span>
                  <Badge status={int.status} />
                </div>
                <p className="text-xs text-slate-500 font-medium">{int.jobTitle} • {int.companyName}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-black inline-block" />
                    <span>{new Date(int.scheduledTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </span>
                  <a
                    href={int.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Join Room →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom Section: Active Tasks & Training Overview ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task Board Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">Active Task Board</h4>
            <button type="button" onClick={() => navigate('admin/tasks')} className="text-xs font-bold text-blue-600 hover:underline">Manage</button>
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex justify-between text-xs py-1.5 border-b border-slate-100">
              <span className="text-slate-500">In Progress</span>
              <span className="font-bold text-blue-600">{tasks.filter((t) => t.status === 'in_progress').length}</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Completed (This Month)</span>
              <span className="font-bold text-emerald-600">{tasks.filter((t) => t.status === 'completed').length}</span>
            </div>
            <div className="flex justify-between text-xs py-1.5">
              <span className="text-slate-500">Pending Review</span>
              <span className="font-bold text-amber-600">{tasks.filter((t) => t.status === 'pending').length}</span>
            </div>
          </div>
        </div>

        {/* Training LMS Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">Training & Certifications</h4>
            <button type="button" onClick={() => navigate('admin/training')} className="text-xs font-bold text-blue-600 hover:underline">Courses</button>
          </div>
          <div className="space-y-2 pt-1">
            {trainingCourses.map((c) => (
              <div key={c.id} className="text-xs py-1.5 flex justify-between items-center border-b border-slate-100 last:border-0">
                <span className="text-slate-700 truncate max-w-[180px]">{c.title}</span>
                <span className="font-bold text-slate-900">{c.completedCount} Certified</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">Database & Services</h4>
            <span className="text-xs font-bold text-emerald-600">● Operational</span>
          </div>
          <div className="space-y-2 pt-1 text-xs text-slate-500">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Supabase Auth & RLS</span>
              <span className="text-emerald-700 font-semibold">Active</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Storage Buckets</span>
              <span className="text-emerald-700 font-semibold">Ready (256-bit)</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Daily Automated Backups</span>
              <span className="text-emerald-700 font-semibold">Synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

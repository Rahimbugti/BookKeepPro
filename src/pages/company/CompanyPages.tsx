import React, { useState } from 'react';
import { Users, Briefcase, Calendar, CheckSquare, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { TaskPriority, TaskStatus } from '../../types';

// ── 1. COMPANY DASHBOARD ──
export const CompanyDashboard: React.FC = () => {
  const { employees, jobs, candidates, interviews, tasks, attendance, navigate } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company Portal Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your dedicated virtual assistants, task delegation, candidate interviews, and attendance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('company/jobs')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
          >
            + Post Job Opening
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="My Virtual Assistants"
          value={employees.length}
          subtitle="Dedicated to your firm"
          icon={<Users className="w-5 h-5 text-black" />}
          onClick={() => navigate('company/employees')}
        />
        <StatsCard
          title="Open Positions"
          value={jobs.filter((j) => j.status === 'open').length}
          subtitle={`${candidates.length} candidates reviewing`}
          icon={<Briefcase className="w-5 h-5 text-black" />}
          onClick={() => navigate('company/jobs')}
        />
        <StatsCard
          title="Upcoming Interviews"
          value={interviews.length}
          subtitle="Scheduled this week"
          icon={<Calendar className="w-5 h-5 text-black" />}
          onClick={() => navigate('company/interviews')}
        />
        <StatsCard
          title="Pending Tasks"
          value={tasks.filter((t) => t.status !== 'completed').length}
          subtitle="Assigned to your staff"
          icon={<CheckSquare className="w-5 h-5 text-black" />}
          onClick={() => navigate('company/tasks')}
        />
      </div>

      {/* Middle Grid: Staff Directory & Assigned Task Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active VA Staff Roster (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Your Dedicated Remote Staff</h3>
            <button type="button" onClick={() => navigate('company/employees')} className="text-xs font-bold text-blue-600 hover:underline">
              View All Staff →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <div key={emp.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={emp.avatarUrl} alt={emp.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <p className="font-bold text-sm text-slate-900">{emp.fullName}</p>
                    <p className="text-xs text-slate-500">{emp.jobTitle} • {emp.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-black fill-black inline" /> {emp.performanceScore}% Quality
                  </span>
                  <Badge status={emp.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Urgent & Pending Tasks (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Priority Task Queue</h3>
            <button type="button" onClick={() => navigate('company/tasks')} className="text-xs font-bold text-blue-600 hover:underline">
              Task Board →
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{task.title}</span>
                  <Badge status={task.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Assigned: <strong>{task.employeeName}</strong></span>
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 2. COMPANY CANDIDATES PAGE ──
export const CompanyCandidatesPage: React.FC = () => {
  const { candidates, updateCandidateStatus, hireCandidate } = useApp();
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pre-Vetted Candidate Talent Pool</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review top matching candidates for your open property management positions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {candidates.map((cand) => (
          <div key={cand.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900">{cand.fullName}</h3>
                  <p className="text-xs text-slate-500">{cand.location} • {cand.experienceYears} Years Exp</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                  {cand.matchScore}% Match
                </span>
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <p><strong>Applying for:</strong> {cand.jobTitle || 'Virtual Assistant'}</p>
                <p><strong>Hourly Rate:</strong> ${cand.hourlyRate}/hr</p>
                <p><strong>Availability:</strong> {cand.availability}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {cand.skills.map((sk, idx) => (
                  <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedCandidate(cand)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
              >
                View Profile
              </button>

              {cand.status !== 'hired' ? (
                <button
                  type="button"
                  onClick={() => hireCandidate(cand.id, 'comp-1', cand.jobTitle || 'VA Specialist', cand.hourlyRate)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  ✓ Hire Candidate
                </button>
              ) : (
                <Badge status="hired" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Profile Modal */}
      <Modal isOpen={Boolean(selectedCandidate)} onClose={() => setSelectedCandidate(null)} title={selectedCandidate?.fullName || 'Candidate Profile'}>
        {selectedCandidate && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <p><strong>Email:</strong> {selectedCandidate.email}</p>
              <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
              <p><strong>Location:</strong> {selectedCandidate.location}</p>
              <p><strong>Experience:</strong> {selectedCandidate.experienceYears} Years</p>
              <p><strong>Assessment Notes:</strong> {selectedCandidate.notes || 'Fully certified on AppFolio & customer communication.'}</p>
            </div>
            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setSelectedCandidate(null)} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ── 3. COMPANY PERFORMANCE PAGE ──
export const CompanyPerformancePage: React.FC = () => {
  const { employees } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Virtual Assistant Performance Reviews</h1>
        <p className="text-xs text-slate-500 mt-0.5">Audit quality scores, task throughput, and reliability rankings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={emp.avatarUrl} alt={emp.fullName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">{emp.fullName}</h3>
                  <p className="text-xs text-slate-500">{emp.jobTitle}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-600">{emp.performanceScore}%</span>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Overall Rating</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between"><span>Completed Tasks:</span><span className="font-bold text-slate-900">{emp.tasksCompleted} Tasks</span></div>
              <div className="flex justify-between"><span>On-Time Attendance:</span><span className="font-bold text-blue-600">{emp.attendanceRate}%</span></div>
              <div className="flex justify-between"><span>Audit Discrepancies:</span><span className="font-bold text-emerald-600">0 (Zero errors)</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

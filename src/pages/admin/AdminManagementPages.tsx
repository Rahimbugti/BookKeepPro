import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { CandidateStatus, TaskPriority, TaskStatus } from '../../types';
import {
  Calendar,
  User,
  FileText,
  Clock,
  TrendingUp,
  Star,
  Check,
  Building2,
  Briefcase,
  CreditCard,
  Send,
} from 'lucide-react';

// ── 1. COMPANIES PAGE ──
export const CompaniesPage: React.FC = () => {
  const { companies } = useApp();
  const [selectedComp, setSelectedComp] = useState<any>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registered Companies</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage enterprise clients and their active VA allocations.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Company Name</th>
                <th className="py-3.5 px-5">Industry</th>
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Active VAs</th>
                <th className="py-3.5 px-5">Open Jobs</th>
                <th className="py-3.5 px-5">Monthly Billing</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {companies.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">{comp.name}</td>
                  <td className="py-4 px-5 text-slate-500">{comp.industry}</td>
                  <td className="py-4 px-5">
                    <p className="font-semibold text-slate-800">{comp.contactEmail}</p>
                    <p className="text-[11px] text-slate-400">{comp.contactPhone}</p>
                  </td>
                  <td className="py-4 px-5 font-bold text-blue-600">{comp.activeEmployeesCount} Staff</td>
                  <td className="py-4 px-5 font-bold text-slate-700">{comp.openJobsCount} Roles</td>
                  <td className="py-4 px-5 font-bold text-emerald-700">${comp.monthlySpend.toLocaleString()}/mo</td>
                  <td className="py-4 px-5"><Badge status={comp.status} /></td>
                  <td className="py-4 px-5">
                    <button
                      type="button"
                      onClick={() => setSelectedComp(comp)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-bold text-xs transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={Boolean(selectedComp)}
        onClose={() => setSelectedComp(null)}
        title={selectedComp?.name || 'Company Profile'}
        subtitle={selectedComp?.industry}
      >
        {selectedComp && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">{selectedComp.description}</p>
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 font-semibold">
              <div><span className="text-slate-400 block">Website:</span> <a href={selectedComp.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">{selectedComp.website}</a></div>
              <div><span className="text-slate-400 block">Headquarters:</span> {selectedComp.address}</div>
              <div><span className="text-slate-400 block">Contact Email:</span> {selectedComp.contactEmail}</div>
              <div><span className="text-slate-400 block">Phone:</span> {selectedComp.contactPhone}</div>
            </div>
            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setSelectedComp(null)} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ── 2. CANDIDATES PAGE ──
export const CandidatesPage: React.FC = () => {
  const { candidates, updateCandidateStatus, hireCandidate, companies } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = filterStatus === 'all' ? candidates : candidates.filter((c) => c.status === filterStatus);
  const statuses: CandidateStatus[] = ['applied', 'screening', 'interview', 'selected', 'rejected', 'hired'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Candidate Recruitment Pipeline</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track pre-screened talent across interview stages and hiring decisions.</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Filter Stage:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Stages ({candidates.length})</option>
            {statuses.map((st) => (
              <option key={st} value={st}>{st.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cand) => (
          <div
            key={cand.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">{cand.fullName}</h3>
                  <p className="text-xs text-slate-500">{cand.location} • {cand.experienceYears} yrs exp</p>
                </div>
                <Badge status={cand.status} />
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Position</span>
                <span className="font-bold text-slate-800">{cand.jobTitle || 'General Virtual Assistant'}</span>
                <span className="text-emerald-700 font-bold block mt-1">${cand.hourlyRate}/hr rate</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {cand.skills.map((sk, idx) => (
                  <span key={idx} className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions & Status Advance */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <select
                value={cand.status}
                onChange={(e) => updateCandidateStatus(cand.id, e.target.value as CandidateStatus)}
                className="text-xs font-bold py-1.5 px-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>{st.toUpperCase()}</option>
                ))}
              </select>

              {cand.status !== 'hired' && (
                <button
                  type="button"
                  onClick={() => hireCandidate(cand.id, cand.companyId || companies[0].id, cand.jobTitle || 'VA Specialist', cand.hourlyRate)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Hire</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── 3. EMPLOYEES PAGE ──
export const EmployeesPage: React.FC = () => {
  const { employees } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Virtual Assistant Staff Directory</h1>
        <p className="text-xs text-slate-500 mt-0.5">Active remote employees placed across client companies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img src={emp.avatarUrl} alt={emp.fullName} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
              <div>
                <h3 className="font-bold text-base text-slate-900">{emp.fullName}</h3>
                <p className="text-xs text-blue-600 font-semibold">{emp.jobTitle}</p>
                <p className="text-[11px] text-slate-400">{emp.companyName}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Score</span>
                <span className="font-bold text-slate-900">{emp.performanceScore}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Rate</span>
                <span className="font-bold text-emerald-600">${emp.hourlyRate}/h</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance</span>
                <span className="font-bold text-blue-600">{emp.attendanceRate}%</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {emp.skills.map((sk, idx) => (
                <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── 4. JOBS PAGE ──
export const JobsPage: React.FC = () => {
  const { jobs, createJob, companies, updateJobStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('AppFolio, QuickBooks, Customer Service');
  const [minSalary, setMinSalary] = useState(1000);
  const [maxSalary, setMaxSalary] = useState(1600);
  const [companyId, setCompanyId] = useState(companies[0]?.id || 'comp-1');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const comp = companies.find((c) => c.id === companyId) || companies[0];
    createJob({
      companyId: comp.id,
      companyName: comp.name,
      title,
      description,
      requiredSkills: skills.split(',').map((s) => s.trim()),
      experienceLevel: 'Intermediate',
      salaryRangeMin: Number(minSalary),
      salaryRangeMax: Number(maxSalary),
      workingHours: '8:00 AM - 5:00 PM CST',
      jobType: 'full-time',
      status: 'open',
    });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job Postings Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Active and archived recruitment requirements across companies.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
        >
          + Create New Job Requirement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{job.companyName}</span>
                <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
              </div>
              <Badge status={job.status} />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl text-xs font-semibold">
              <div><span className="text-slate-400 block text-[10px]">Salary Range:</span> ${job.salaryRangeMin} - ${job.salaryRangeMax} /mo</div>
              <div><span className="text-slate-400 block text-[10px]">Applicants:</span> {job.applicantsCount} applied</div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-black inline-block" />
                <span>Posted: {job.createdAt}</span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateJobStatus(job.id, job.status === 'open' ? 'paused' : 'open')}
                  className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg"
                >
                  {job.status === 'open' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Job Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Job Requirement">
        <form onSubmit={handleCreate} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Target Company</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Job Title</label>
            <input type="text" required placeholder="e.g. Senior AppFolio Trust Accountant" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Job Description & Responsibilities</label>
            <textarea rows={3} required placeholder="Detail the day-to-day requirements..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Required Skills (comma separated)</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 mb-1">Min Salary ($/mo)</label>
              <input type="number" value={minSalary} onChange={(e) => setMinSalary(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-300" />
            </div>
            <div>
              <label className="block text-slate-700 mb-1">Max Salary ($/mo)</label>
              <input type="number" value={maxSalary} onChange={(e) => setMaxSalary(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-300" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl uppercase tracking-wider text-xs">
            Publish Job Posting
          </button>
        </form>
      </Modal>
    </div>
  );
};

// ── 5. INTERVIEWS PAGE ──
export const InterviewsPage: React.FC = () => {
  const { interviews, scheduleInterview, candidates, companies } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateId, setCandidateId] = useState(candidates[0]?.id || 'cand-1');
  const [scheduledTime, setScheduledTime] = useState('2026-10-05T15:00');
  const [notes, setNotes] = useState('');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const cand = candidates.find((c) => c.id === candidateId) || candidates[0];
    const comp = companies[0];
    scheduleInterview({
      candidateId: cand.id,
      candidateName: cand.fullName,
      candidateEmail: cand.email,
      jobTitle: cand.jobTitle || 'VA Specialist',
      companyId: comp.id,
      companyName: comp.name,
      scheduledTime: new Date(scheduledTime).toISOString(),
      interviewerName: 'Staffing Director',
      status: 'scheduled',
      meetingLink: `https://meet.vpmworkforce.com/room-${cand.id}`,
      notes,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Interviews Schedule</h1>
          <p className="text-xs text-slate-500 mt-0.5">Candidate video screenings and technical evaluation sessions.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
        >
          + Schedule New Interview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {interviews.map((int) => (
          <div key={int.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">{int.candidateName}</h3>
              <Badge status={int.status} />
            </div>
            <p className="text-xs text-slate-500">{int.jobTitle} • {int.companyName}</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-black inline-block" /> <strong>Date:</strong> {new Date(int.scheduledTime).toLocaleString()}</p>
              <p className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-black inline-block" /> <strong>Interviewer:</strong> {int.interviewerName}</p>
              {int.notes && <p className="text-slate-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-black inline-block" /> {int.notes}</p>}
            </div>
            <div className="pt-2 flex justify-end">
              <a href={int.meetingLink} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
                Join Video Meeting →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Candidate Interview">
        <form onSubmit={handleSchedule} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Select Candidate</label>
            <select value={candidateId} onChange={(e) => setCandidateId(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300">
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>{c.fullName} ({c.jobTitle || 'General VA'})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Date & Time</label>
            <input type="datetime-local" required value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Interview Assessment Notes</label>
            <textarea rows={2} placeholder="Focus on technical questions..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl uppercase text-xs">
            Confirm Schedule & Send Invites
          </button>
        </form>
      </Modal>
    </div>
  );
};

// ── 6. TRAINING PAGE ──
export const TrainingPage: React.FC = () => {
  const { trainingCourses } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Training & Certification Courses</h1>
        <p className="text-xs text-slate-500 mt-0.5">Software mastery programs (AppFolio, Trust Accounting, US English).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainingCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <img src={course.coverImageUrl} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md uppercase">
                  {course.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-2">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-black inline-block" />
                  <span>{course.durationHours}h • {course.totalLessons} Lessons</span>
                </span>
                <span className="text-emerald-700 font-bold">{course.completedCount} Certified</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                View Syllabus & Quizzes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus Modal */}
      <Modal isOpen={Boolean(selectedCourse)} onClose={() => setSelectedCourse(null)} title={selectedCourse?.title || 'Course Details'}>
        {selectedCourse && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">{selectedCourse.description}</p>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Curriculum Lessons:</h4>
              {selectedCourse.lessons.map((les: any, idx: number) => (
                <div key={les.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">{idx + 1}. {les.title}</p>
                    <p className="text-[11px] text-slate-400">{les.content}</p>
                  </div>
                  <span className="text-slate-500 font-semibold">{les.durationMinutes}m</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ── 7. TASKS PAGE ──
export const TasksPage: React.FC = () => {
  const { tasks, createTask, employees, updateTaskStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [empId, setEmpId] = useState(employees[0]?.id || 'emp-1');
  const [dueDate, setDueDate] = useState('2026-10-06');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === empId) || employees[0];
    createTask({
      companyId: emp.companyId,
      companyName: emp.companyName,
      employeeId: emp.id,
      employeeName: emp.fullName,
      employeeAvatar: emp.avatarUrl,
      title,
      description: desc,
      priority,
      dueDate,
      status: 'pending',
    });
    setIsModalOpen(false);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Management Board</h1>
          <p className="text-xs text-slate-500 mt-0.5">Assign, monitor, and audit operational tasks assigned to virtual assistants.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
        >
          + Assign New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  t.priority === 'urgent' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {t.priority} priority
                </span>
                <Badge status={t.status} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mt-2">{t.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{t.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={t.employeeAvatar} alt={t.employeeName} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-bold text-slate-700">{t.employeeName}</span>
              </div>
              <select
                value={t.status}
                onChange={(e) => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                className="text-xs font-bold p-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign Task to Employee">
        <form onSubmit={handleCreate} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Assigned Employee</label>
            <select value={empId} onChange={(e) => setEmpId(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300">
              {employees.map((e) => (
                <option key={e.id} value={e.id}>{e.fullName} ({e.companyName})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Task Title</label>
            <input type="text" required placeholder="e.g. Daily Bank Feeds Reconciliation" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Instructions / Description</label>
            <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 mb-1">Priority Level</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="w-full p-2.5 rounded-xl border border-slate-300">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 mb-1">Due Date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl uppercase text-xs">
            Assign Task
          </button>
        </form>
      </Modal>
    </div>
  );
};

// ── 8. ATTENDANCE PAGE ──
export const AttendancePage: React.FC = () => {
  const { attendance } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance & Timesheet Logs</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time daily clock-in / clock-out records and total hours logged.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
            <tr>
              <th className="py-3.5 px-5">Employee Name</th>
              <th className="py-3.5 px-5">Date</th>
              <th className="py-3.5 px-5">Check In</th>
              <th className="py-3.5 px-5">Check Out</th>
              <th className="py-3.5 px-5">Logged Hours</th>
              <th className="py-3.5 px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {attendance.map((att) => (
              <tr key={att.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-5 font-bold text-slate-900">{att.employeeName}</td>
                <td className="py-3.5 px-5">{att.date}</td>
                <td className="py-3.5 px-5 font-mono text-blue-700">{att.checkInTime}</td>
                <td className="py-3.5 px-5 font-mono text-slate-600">{att.checkOutTime || 'Active Session'}</td>
                <td className="py-3.5 px-5 font-bold text-slate-900">{att.workingHours} hrs</td>
                <td className="py-3.5 px-5"><Badge status={att.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── 9. PAYROLL PAGE ──
export const PayrollPage: React.FC = () => {
  const { payroll, processPayrollRecord } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payroll & Global Disbursements</h1>
        <p className="text-xs text-slate-500 mt-0.5">Calculate pay periods, bonuses, deductions, and issue batch payouts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
            <tr>
              <th className="py-3.5 px-5">Employee</th>
              <th className="py-3.5 px-5">Client Company</th>
              <th className="py-3.5 px-5">Pay Period</th>
              <th className="py-3.5 px-5">Hours</th>
              <th className="py-3.5 px-5">Rate</th>
              <th className="py-3.5 px-5">Gross</th>
              <th className="py-3.5 px-5">Net Payout</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {payroll.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-5 font-bold text-slate-900">{p.employeeName}</td>
                <td className="py-3.5 px-5 text-slate-500">{p.companyName}</td>
                <td className="py-3.5 px-5">{p.payPeriodStart} to {p.payPeriodEnd}</td>
                <td className="py-3.5 px-5 font-bold">{p.totalHours} hrs</td>
                <td className="py-3.5 px-5">${p.hourlyRate}/hr</td>
                <td className="py-3.5 px-5">${p.grossSalary.toFixed(2)}</td>
                <td className="py-3.5 px-5 font-bold text-emerald-700">${p.netSalary.toFixed(2)}</td>
                <td className="py-3.5 px-5"><Badge status={p.paymentStatus} /></td>
                <td className="py-3.5 px-5">
                  {p.paymentStatus !== 'paid' ? (
                    <button
                      type="button"
                      onClick={() => processPayrollRecord(p.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Process Payout
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-black inline-block" />
                      <span>Paid {p.paidAt}</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── 10. REPORTS PAGE ──
export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Workforce Analytics & Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">Performance indices, payroll velocity, and placement retention metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-black" />
            <span>Monthly Payroll Spend By Department</span>
          </h3>
          <div className="space-y-3 text-xs font-semibold">
            <div>
              <div className="flex justify-between mb-1"><span>Accounting & Bookkeeping</span><span>$24,500 (52%)</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '52%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span>Maintenance & Operations</span><span>$14,200 (30%)</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '30%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span>Guest & Tenant Communications</span><span>$8,600 (18%)</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '18%' }} /></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Star className="w-4 h-4 text-black" />
            <span>Virtual Assistant Quality Score</span>
          </h3>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
            <span className="text-4xl font-extrabold text-emerald-700">96.8 / 100</span>
            <p className="text-xs text-emerald-800 font-semibold">Average Client Satisfaction Rating Across 500+ Hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 11. MESSAGES PAGE ──
export const MessagesPage: React.FC = () => {
  const { messages, sendMessage, currentUser } = useApp();
  const [content, setContent] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    sendMessage('user-emp-1', 'Maria Santos', content);
    setContent('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team Communication & Chats</h1>
        <p className="text-xs text-slate-500 mt-0.5">Secure internal messaging between clients and virtual assistants.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="font-bold text-xs text-slate-800">Direct Chat: Sarah Jenkins (Company) ↔ Maria Santos (VA)</span>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isMe = m.senderId === currentUser.id;
            return (
              <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-slate-400 mb-1">{m.senderName} • {m.timestamp}</span>
                <div className={`p-3.5 rounded-2xl text-xs max-w-md ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                  {m.content}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// ── 12. SETTINGS PAGE ──
export const SettingsPage: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System & Account Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage authentication, Supabase database bindings, and notification preferences.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900">Profile Information</h3>
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
          <div><label className="text-slate-400 block mb-1">Full Name</label><input type="text" defaultValue={currentUser.fullName} className="w-full p-2.5 rounded-xl border border-slate-300" /></div>
          <div><label className="text-slate-400 block mb-1">Email Address</label><input type="email" defaultValue={currentUser.email} className="w-full p-2.5 rounded-xl border border-slate-300" /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <h3 className="font-bold text-base text-slate-900">Supabase Connection Status</h3>
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl space-y-1">
          <p><strong>PostgreSQL Schema:</strong> `supabase/schema.sql` ready with 16 tables and RLS security policies.</p>
          <p><strong>Storage Buckets:</strong> Enabled for resumes, employee contracts, and training video assets.</p>
        </div>
      </div>
    </div>
  );
};

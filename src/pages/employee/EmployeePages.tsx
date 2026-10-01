import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  GraduationCap,
  CreditCard,
  Calendar,
  FileText,
  Printer,
  Download,
  Square,
  Play,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { TaskStatus } from '../../types';

// ── 1. EMPLOYEE DASHBOARD ──
export const EmployeeDashboard: React.FC = () => {
  const {
    currentUser,
    tasks,
    updateTaskStatus,
    trainingCourses,
    attendance,
    payroll,
    isClockedIn,
    toggleClockIn,
    activeSeconds,
    navigate,
  } = useApp();

  const myTasks = tasks.filter((t) => t.employeeName.includes(currentUser.fullName.split(' ')[0]));
  const myEarnings = payroll.reduce((acc, p) => acc + p.netSalary, 0);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {currentUser.fullName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Assigned to Apex Property Management • Lead AppFolio Bookkeeper
          </p>
        </div>

        {/* Live Clock Button */}
        <button
          type="button"
          onClick={toggleClockIn}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 ${
            isClockedIn
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
          }`}
        >
          {isClockedIn ? (
            <span className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 fill-white text-white" /> Clock Out
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-white text-white" /> Clock In Now
            </span>
          )}
          <span className="font-mono bg-black/20 px-2 py-0.5 rounded text-white">
            {isClockedIn ? formatTimer(activeSeconds) : '00:00:00'}
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Tasks"
          value={myTasks.filter((t) => t.status !== 'completed').length}
          subtitle="Pending completion"
          icon={<CheckSquare className="w-5 h-5 text-black" />}
          onClick={() => navigate('employee/tasks')}
        />
        <StatsCard
          title="Today's Hours"
          value={isClockedIn ? `${(activeSeconds / 3600).toFixed(1)} hrs` : '0.0 hrs'}
          subtitle="Current shift"
          icon={<Clock className="w-5 h-5 text-black" />}
          onClick={() => navigate('employee/attendance')}
        />
        <StatsCard
          title="Certifications"
          value={`${trainingCourses.length} Courses`}
          subtitle="100% Up to date"
          icon={<GraduationCap className="w-5 h-5 text-black" />}
          onClick={() => navigate('employee/training')}
        />
        <StatsCard
          title="Total Earnings"
          value={`$${myEarnings.toLocaleString()}`}
          subtitle="Net payouts"
          icon={<CreditCard className="w-5 h-5 text-black" />}
          onClick={() => navigate('employee/payroll')}
        />
      </div>

      {/* Middle Split: Today's Tasks & Training Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Task List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Assigned Operational Tasks</h3>
            <button type="button" onClick={() => navigate('employee/tasks')} className="text-xs font-bold text-blue-600 hover:underline">
              All Tasks →
            </button>
          </div>

          <div className="space-y-3">
            {myTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{task.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                  </div>
                  <Badge status={task.status} />
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-black inline" /> Due: {task.dueDate}
                  </span>
                  <div className="flex gap-2">
                    {task.status !== 'completed' ? (
                      <button
                        type="button"
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        ✓ Mark Completed
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold">✓ Completed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: LMS Training Courses (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Training Modules</h3>
            <button type="button" onClick={() => navigate('employee/training')} className="text-xs font-bold text-blue-600 hover:underline">
              Start Lessons →
            </button>
          </div>

          <div className="space-y-3">
            {trainingCourses.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{c.title}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Certified
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 2. EMPLOYEE TRAINING WITH INTERACTIVE QUIZ ──
export const EmployeeTrainingPage: React.FC = () => {
  const { trainingCourses, completeCourseLesson } = useApp();
  const [activeCourse, setActiveCourse] = useState<any>(trainingCourses[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleOptionSelect = (qIdx: number, optIdx: number) => {
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSubmitted(true);
    completeCourseLesson(activeCourse.id, 'les-1');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Interactive Training & Certification</h1>
        <p className="text-xs text-slate-500 mt-0.5">Learn AppFolio best practices, trust accounting standards, and earn completion certificates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course List on Left (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {trainingCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                setActiveCourse(course);
                setQuizSubmitted(false);
                setQuizAnswers({});
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeCourse.id === course.id
                  ? 'bg-blue-50/60 border-blue-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-bold text-blue-600 uppercase">{course.category}</span>
              <h3 className="font-bold text-sm text-slate-900 mt-1">{course.title}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black inline" /> {course.durationHours} hrs • {course.totalLessons} Lessons
              </p>
            </div>
          ))}
        </div>

        {/* Lesson & Quiz Player on Right (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{activeCourse.category}</span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{activeCourse.title}</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeCourse.description}</p>
          </div>

          {/* Interactive Lesson Content */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm text-slate-900">Lesson 1: Property Management Operating Standards</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When managing AppFolio or Buildium accounts, all tenant security deposits must be deposited into the designated Trust Account within 48 banking hours. Never co-mingle operating revenue with tenant liability balances.
            </p>
          </div>

          {/* Interactive Quiz Module */}
          <div className="space-y-4 pt-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-black inline" /> Knowledge Check Quiz
            </h4>

            {activeCourse.lessons[0]?.quiz ? (
              <form onSubmit={handleQuizSubmit} className="space-y-4">
                {activeCourse.lessons[0].quiz.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2.5">
                    <p className="font-bold text-xs text-slate-900">{qIdx + 1}. {q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt: string, optIdx: number) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                            quizAnswers[qIdx] === optIdx
                              ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                              : 'border-slate-100 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`quiz-${qIdx}`}
                            checked={quizAnswers[qIdx] === optIdx}
                            onChange={() => handleOptionSelect(qIdx, optIdx)}
                            className="text-blue-600"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {quizSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold text-center">
                    🎉 Quiz Passed (100% Score)! Certificate has been awarded to your profile.
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-600/20 transition-all"
                  >
                    Submit Quiz Answers
                  </button>
                )}
              </form>
            ) : (
              <p className="text-xs text-slate-400">Review lesson reading material to complete certification.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 3. EMPLOYEE PAYROLL & PAYSLIPS ──
export const EmployeePayrollPage: React.FC = () => {
  const { payroll } = useApp();
  const [selectedSlip, setSelectedSlip] = useState<any>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Earnings & Pay Slips</h1>
        <p className="text-xs text-slate-500 mt-0.5">Bi-weekly disbursement history and printable earnings statements.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
            <tr>
              <th className="py-3.5 px-5">Pay Period</th>
              <th className="py-3.5 px-5">Client Company</th>
              <th className="py-3.5 px-5">Hours Logged</th>
              <th className="py-3.5 px-5">Hourly Rate</th>
              <th className="py-3.5 px-5">Net Payout</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5">Payslip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {payroll.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-5 font-bold text-slate-900">{p.payPeriodStart} to {p.payPeriodEnd}</td>
                <td className="py-3.5 px-5 text-slate-500">{p.companyName}</td>
                <td className="py-3.5 px-5 font-bold">{p.totalHours} hrs</td>
                <td className="py-3.5 px-5">${p.hourlyRate}/hr</td>
                <td className="py-3.5 px-5 font-bold text-emerald-700">${p.netSalary.toFixed(2)}</td>
                <td className="py-3.5 px-5"><Badge status={p.paymentStatus} /></td>
                <td className="py-3.5 px-5">
                  <button
                    type="button"
                    onClick={() => setSelectedSlip(p)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-black" /> View Pay Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Slip Modal */}
      <Modal isOpen={Boolean(selectedSlip)} onClose={() => setSelectedSlip(null)} title="Official Earnings Statement / Pay Slip">
        {selectedSlip && (
          <div className="space-y-4 text-xs font-semibold">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span>Employee: {selectedSlip.employeeName}</span>
                <span>Job: {selectedSlip.jobTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pay Period:</span>
                <span>{selectedSlip.payPeriodStart} to {selectedSlip.payPeriodEnd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Logged Hours:</span>
                <span>{selectedSlip.totalHours} hrs @ ${selectedSlip.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Performance Bonus:</span>
                <span className="text-emerald-700">+${selectedSlip.bonus.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold">
                <span>Net Disbursed Amount:</span>
                <span className="text-emerald-700">${selectedSlip.netSalary.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-white" /> Print Slip
              </button>
              <button type="button" onClick={() => setSelectedSlip(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ── 4. EMPLOYEE DOCUMENTS & SOPS ──
export const EmployeeDocumentsPage: React.FC = () => {
  const { documents, addDocument } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Contract' | 'NDA' | 'Tax W-8BEN' | 'Policy' | 'Report'>('Tax W-8BEN');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument({
      title,
      category,
      fileSize: '350 KB',
      fileUrl: '#',
      uploadedBy: 'Maria Santos',
    });
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documents, Contracts & SOPs</h1>
          <p className="text-xs text-slate-500 mt-0.5">Access independent contractor agreements, tax forms, and operating manuals.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
        >
          + Upload Tax / ID Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-black" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">{doc.category}</span>
                <h4 className="font-bold text-xs text-slate-900 truncate">{doc.title}</h4>
                <p className="text-[11px] text-slate-400">{doc.fileSize} • Uploaded {doc.uploadedAt}</p>
              </div>
            </div>

            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); alert(`Downloading ${doc.title}...`); }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-black" /> Download
            </a>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Verified Document">
        <form onSubmit={handleUpload} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Document Title</label>
            <input type="text" required placeholder="e.g. Government ID or W-8BEN" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300" />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full p-2.5 rounded-xl border border-slate-300">
              <option value="Tax W-8BEN">Tax W-8BEN Form</option>
              <option value="Contract">Contract</option>
              <option value="NDA">NDA</option>
              <option value="Policy">Policy / SOP</option>
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl uppercase text-xs">
            Save & Upload
          </button>
        </form>
      </Modal>
    </div>
  );
};

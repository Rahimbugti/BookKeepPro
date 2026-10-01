import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Company,
  JobRequirement,
  Candidate,
  CandidateStatus,
  Interview,
  Employee,
  TrainingCourse,
  Task,
  TaskStatus,
  AttendanceRecord,
  PayrollRecord,
  ChatMessage,
  CompanyDocument,
} from '../types';
import {
  initialUsers,
  initialCompanies,
  initialJobs,
  initialCandidates,
  initialInterviews,
  initialEmployees,
  initialTrainingCourses,
  initialTasks,
  initialAttendance,
  initialPayroll,
  initialMessages,
  initialDocuments,
} from '../data/mockData';

interface AppContextType {
  // Navigation & Role
  currentRole: UserRole;
  currentUser: UserProfile;
  currentRoute: string;
  routeParams: Record<string, any>;
  navigate: (route: string, params?: Record<string, any>) => void;
  switchRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;

  // Data Stores
  companies: Company[];
  jobs: JobRequirement[];
  candidates: Candidate[];
  interviews: Interview[];
  employees: Employee[];
  trainingCourses: TrainingCourse[];
  tasks: Task[];
  attendance: AttendanceRecord[];
  payroll: PayrollRecord[];
  messages: ChatMessage[];
  documents: CompanyDocument[];

  // Attendance Clock State
  isClockedIn: boolean;
  clockInTime: string | null;
  activeSeconds: number;

  // CRUD Actions
  createJob: (job: Omit<JobRequirement, 'id' | 'createdAt' | 'applicantsCount'>) => void;
  updateJobStatus: (id: string, status: JobRequirement['status']) => void;
  updateCandidateStatus: (candidateId: string, status: CandidateStatus) => void;
  hireCandidate: (candidateId: string, companyId: string, jobTitle: string, hourlyRate: number) => void;
  scheduleInterview: (interview: Omit<Interview, 'id'>) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  toggleClockIn: () => void;
  processPayrollRecord: (payrollId: string) => void;
  sendMessage: (receiverId: string, receiverName: string, content: string) => void;
  addDocument: (doc: Omit<CompanyDocument, 'id' | 'uploadedAt'>) => void;
  completeCourseLesson: (courseId: string, lessonId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUsers.admin);
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  // Core Data
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [jobs, setJobs] = useState<JobRequirement[]>(initialJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>(initialTrainingCourses);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(initialPayroll);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [documents, setDocuments] = useState<CompanyDocument[]>(initialDocuments);

  // Clock in/out tracking
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string | null>('08:00 AM');
  const [activeSeconds, setActiveSeconds] = useState<number>(14820); // ~4 hours active

  // Timer for active clock-in session
  useEffect(() => {
    let interval: any = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        setActiveSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  // Navigate helper
  const navigate = (route: string, params: Record<string, any> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch role and sync user profile
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(initialUsers[role]);
    if (currentRoute !== 'landing' && currentRoute !== 'about' && currentRoute !== 'services' && currentRoute !== 'contact') {
      navigate(`${role}/dashboard`);
    }
  };

  // Auth actions
  const loginAs = (role: UserRole) => {
    switchRole(role);
    navigate(`${role}/dashboard`);
  };

  const logout = () => {
    navigate('landing');
  };

  // ── Actions ──
  const createJob = (jobData: Omit<JobRequirement, 'id' | 'createdAt' | 'applicantsCount'>) => {
    const newJob: JobRequirement = {
      ...jobData,
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJobStatus = (id: string, status: JobRequirement['status']) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  const updateCandidateStatus = (candidateId: string, status: CandidateStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status } : c))
    );
  };

  const hireCandidate = (
    candidateId: string,
    companyId: string,
    jobTitle: string,
    hourlyRate: number
  ) => {
    const cand = candidates.find((c) => c.id === candidateId);
    if (!cand) return;

    // Update status to hired
    updateCandidateStatus(candidateId, 'hired');

    // Find company
    const comp = companies.find((c) => c.id === companyId) || companies[0];

    // Add to employees list
    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      fullName: cand.fullName,
      email: cand.email,
      phone: cand.phone,
      location: cand.location,
      companyId: comp.id,
      companyName: comp.name,
      jobTitle: jobTitle || cand.jobTitle || 'Virtual Assistant Specialist',
      department: 'Operations',
      hourlyRate: hourlyRate || cand.hourlyRate || 10,
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatarUrl: cand.profilePictureUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      performanceScore: 95,
      tasksCompleted: 0,
      attendanceRate: 100,
      skills: cand.skills,
    };

    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const scheduleInterview = (interviewData: Omit<Interview, 'id'>) => {
    const newInterview: Interview = {
      ...interviewData,
      id: `int-${Date.now()}`,
    };
    setInterviews((prev) => [newInterview, ...prev]);
    // Also advance candidate status to interview
    updateCandidateStatus(interviewData.candidateId, 'interview');
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const toggleClockIn = () => {
    if (isClockedIn) {
      // Clock out
      setIsClockedIn(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const record: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId: currentUser.employeeId || 'emp-1',
        employeeName: currentUser.fullName,
        date: new Date().toISOString().split('T')[0],
        checkInTime: clockInTime || '08:00 AM',
        checkOutTime: timeStr,
        workingHours: Number((activeSeconds / 3600).toFixed(2)),
        status: 'present',
      };
      setAttendance((prev) => [record, ...prev]);
    } else {
      // Clock in
      setIsClockedIn(true);
      const now = new Date();
      setClockInTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setActiveSeconds(0);
    }
  };

  const processPayrollRecord = (payrollId: string) => {
    setPayroll((prev) =>
      prev.map((p) =>
        p.id === payrollId
          ? {
              ...p,
              paymentStatus: 'paid',
              paidAt: new Date().toISOString().split('T')[0],
            }
          : p
      )
    );
  };

  const sendMessage = (receiverId: string, receiverName: string, content: string) => {
    if (!content.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderRole: currentRole,
      senderAvatar: currentUser.avatarUrl,
      receiverId,
      receiverName,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const addDocument = (doc: Omit<CompanyDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: CompanyDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const completeCourseLesson = (courseId: string, lessonId: string) => {
    setTrainingCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, completedCount: c.completedCount + 1 } : c
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        currentRoute,
        routeParams,
        navigate,
        switchRole,
        loginAs,
        logout,
        companies,
        jobs,
        candidates,
        interviews,
        employees,
        trainingCourses,
        tasks,
        attendance,
        payroll,
        messages,
        documents,
        isClockedIn,
        clockInTime,
        activeSeconds,
        createJob,
        updateJobStatus,
        updateCandidateStatus,
        hireCandidate,
        scheduleInterview,
        createTask,
        updateTaskStatus,
        toggleClockIn,
        processPayrollRecord,
        sendMessage,
        addDocument,
        completeCourseLesson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

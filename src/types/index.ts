export type UserRole = 'admin' | 'company' | 'employee';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  location?: string;
  companyId?: string;
  employeeId?: string;
}

export interface Company {
  id: string;
  userId?: string;
  name: string;
  industry: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl?: string;
  description: string;
  activeEmployeesCount: number;
  openJobsCount: number;
  monthlySpend: number;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

export interface JobRequirement {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: 'Entry' | 'Intermediate' | 'Senior' | 'Expert';
  salaryRangeMin: number;
  salaryRangeMax: number;
  workingHours: string;
  jobType: 'full-time' | 'part-time' | 'contract';
  status: 'open' | 'paused' | 'closed';
  applicantsCount: number;
  createdAt: string;
}

export type CandidateStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'selected'
  | 'rejected'
  | 'hired';

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experienceYears: number;
  resumeUrl?: string;
  profilePictureUrl?: string;
  availability: 'Immediate' | '2 Weeks' | '1 Month';
  hourlyRate: number;
  jobId?: string;
  jobTitle?: string;
  companyId?: string;
  status: CandidateStatus;
  matchScore: number;
  notes?: string;
  createdAt: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  scheduledTime: string;
  interviewerName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink: string;
  notes?: string;
  rating?: number;
}

export interface Employee {
  id: string;
  profileId?: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  department: string;
  hourlyRate: number;
  startDate: string;
  status: 'active' | 'on_leave' | 'terminated';
  avatarUrl?: string;
  performanceScore: number; // 0 - 100
  tasksCompleted: number;
  attendanceRate: number; // percentage
  skills: string[];
}

export interface TrainingLesson {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;
  videoUrl?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category: 'Property Management' | 'Customer Support' | 'Accounting & Bookkeeping' | 'Software Tools' | 'General';
  durationHours: number;
  totalLessons: number;
  coverImageUrl?: string;
  lessons: TrainingLesson[];
  completedCount: number;
}

export interface EmployeeTrainingProgress {
  courseId: string;
  courseTitle: string;
  completedLessons: number;
  totalLessons: number;
  quizScore?: number;
  isCompleted: boolean;
  completedAt?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface Task {
  id: string;
  companyId: string;
  companyName?: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  workingHours: number;
  status: 'present' | 'late' | 'half_day' | 'absent';
}

export interface PayrollRecord {
  id: string;
  companyId: string;
  companyName: string;
  employeeId: string;
  employeeName: string;
  jobTitle: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  workingDays: number;
  totalHours: number;
  hourlyRate: number;
  grossSalary: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  paymentStatus: 'pending' | 'processing' | 'paid';
  paidAt?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar?: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface CompanyDocument {
  id: string;
  title: string;
  category: 'Contract' | 'NDA' | 'Tax W-8BEN' | 'Policy' | 'Report';
  fileSize: string;
  uploadedAt: string;
  fileUrl: string;
  uploadedBy: string;
}

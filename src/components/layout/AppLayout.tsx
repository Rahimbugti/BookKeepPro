import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  FileText,
  Calendar,
  GraduationCap,
  CheckSquare,
  Clock,
  CreditCard,
  TrendingUp,
  MessageSquare,
  Settings,
  User,
  Folder,
  LogOut,
  Search,
  Menu,
  X,
  Play,
  Square,
  ChevronDown,
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    currentRole,
    currentUser,
    currentRoute,
    navigate,
    switchRole,
    logout,
    isClockedIn,
    toggleClockIn,
    activeSeconds,
    tasks,
    messages,
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Format seconds to HH:MM:SS
  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Nav menus by role with solid black/white style icons
  const getNavItems = () => {
    switch (currentRole) {
      case 'admin':
        return [
          { id: 'admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
          { id: 'admin/companies', label: 'Companies', icon: Building2 },
          { id: 'admin/candidates', label: 'Candidates', icon: Users },
          { id: 'admin/employees', label: 'Virtual Assistants', icon: Briefcase },
          { id: 'admin/jobs', label: 'Job Postings', icon: FileText },
          { id: 'admin/interviews', label: 'Interviews', icon: Calendar },
          { id: 'admin/training', label: 'Training Courses', icon: GraduationCap },
          { id: 'admin/tasks', label: 'Task Management', icon: CheckSquare },
          { id: 'admin/attendance', label: 'Attendance', icon: Clock },
          { id: 'admin/payroll', label: 'Payroll & Invoices', icon: CreditCard },
          { id: 'admin/reports', label: 'Reports & Analytics', icon: TrendingUp },
          { id: 'admin/messages', label: 'Messages', icon: MessageSquare, badge: messages.filter((m) => !m.isRead).length },
          { id: 'admin/settings', label: 'System Settings', icon: Settings },
        ];

      case 'company':
        return [
          { id: 'company/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'company/jobs', label: 'Job Postings', icon: FileText },
          { id: 'company/candidates', label: 'Candidate Pipeline', icon: Users },
          { id: 'company/interviews', label: 'Interviews', icon: Calendar },
          { id: 'company/employees', label: 'My Virtual Assistants', icon: Briefcase },
          { id: 'company/tasks', label: 'Assign & Track Tasks', icon: CheckSquare },
          { id: 'company/attendance', label: 'Staff Attendance', icon: Clock },
          { id: 'company/performance', label: 'VA Performance', icon: TrendingUp },
          { id: 'company/payroll', label: 'Payroll & Invoices', icon: CreditCard },
          { id: 'company/messages', label: 'Messages', icon: MessageSquare, badge: messages.filter((m) => !m.isRead).length },
          { id: 'company/settings', label: 'Company Settings', icon: Settings },
        ];

      case 'employee':
        return [
          { id: 'employee/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
          { id: 'employee/profile', label: 'My Profile', icon: User },
          { id: 'employee/tasks', label: 'My Assigned Tasks', icon: CheckSquare, badge: tasks.filter((t) => t.status !== 'completed').length },
          { id: 'employee/training', label: 'Training & Quizzes', icon: GraduationCap },
          { id: 'employee/attendance', label: 'Timesheet & Clock', icon: Clock },
          { id: 'employee/payroll', label: 'My Earnings & Payslips', icon: CreditCard },
          { id: 'employee/documents', label: 'Documents & SOPs', icon: Folder },
          { id: 'employee/messages', label: 'Messages', icon: MessageSquare, badge: messages.filter((m) => !m.isRead).length },
          { id: 'employee/settings', label: 'Account Settings', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
      
      {/* ── Top Role Switcher Demo Bar ── */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-semibold text-slate-300">
              VPM Workforce Management • Switch Role Preview:
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg">
            {(['admin', 'company', 'employee'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => switchRole(role)}
                className={`px-3 py-1 rounded-md font-bold text-xs capitalize transition-all ${
                  currentRole === role
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {role === 'employee' ? 'VA Employee' : role}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <button
              type="button"
              onClick={() => navigate('landing')}
              className="hover:text-white text-xs underline font-medium"
            >
              Public Landing Page
            </button>
            <span>•</span>
            <span className="text-slate-300">
              Signed in as: <strong className="text-white">{currentUser.fullName}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* ── Sidebar Desktop / Mobile ── */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate(`${currentRole}/dashboard`)}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/20">
                VPM
              </div>
              <div>
                <div className="font-bold text-base text-slate-900 tracking-tight leading-tight">
                  Workforce<span className="text-blue-600">Pro</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {currentRole} portal
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-black hover:text-slate-700"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Quick Clock-in Widget for Employee */}
          {currentRole === 'employee' && (
            <div className="p-4 mx-3 my-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Today's Timesheet</span>
                <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
              </div>
              <div className="font-mono text-lg font-bold text-blue-900 text-center">
                {isClockedIn ? formatTimer(activeSeconds) : 'Clocked Out'}
              </div>
              <button
                type="button"
                onClick={toggleClockIn}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                  isClockedIn
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isClockedIn ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Clock Out</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Clock In</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Nav List with solid black / white icons */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-black'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-blue-700'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer User Info */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.fullName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main Content Area ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-9 z-20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5 text-black" />
              </button>

              <div className="relative hidden sm:block w-72">
                <input
                  type="text"
                  placeholder="Search candidates, tasks, staff..."
                  className="w-full text-xs font-medium pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <span className="absolute left-3 top-2.5">
                  <Search className="w-3.5 h-3.5 text-black" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Messages Shortcut */}
              <button
                type="button"
                onClick={() => navigate(`${currentRole}/messages`)}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl relative transition-colors"
                title="Messages"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                {messages.filter((m) => !m.isRead).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
                )}
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-bold text-slate-800 hidden md:block">
                    {currentUser.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-black" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-scaleUp">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900">{currentUser.fullName}</p>
                      <p className="text-slate-400 capitalize">{currentRole}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate(`${currentRole}/settings`);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-black" />
                      <span>Account Settings</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 font-semibold text-rose-600 border-t border-slate-100 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

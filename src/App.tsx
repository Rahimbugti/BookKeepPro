import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { TaxConsultantWebsite } from './pages/public/TaxConsultantWebsite';
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { SmallBusinessPage } from './pages/public/SmallBusinessPage';
import { PropertyManagementPage } from './pages/public/PropertyManagementPage';
import { PricingPage } from './pages/public/PricingPage';
import { CalculatorPage } from './pages/public/CalculatorPage';
import { AboutPage } from './pages/public/AboutPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';
import { AuthPage } from './pages/public/AuthPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import {
  CompaniesPage,
  CandidatesPage,
  EmployeesPage,
  JobsPage,
  InterviewsPage,
  TrainingPage,
  TasksPage,
  AttendancePage,
  PayrollPage,
  ReportsPage,
  MessagesPage,
  SettingsPage,
} from './pages/admin/AdminManagementPages';

// Company Pages
import {
  CompanyDashboard,
  CompanyCandidatesPage,
  CompanyPerformancePage,
} from './pages/company/CompanyPages';

// Employee Pages
import {
  EmployeeDashboard,
  EmployeeTrainingPage,
  EmployeePayrollPage,
  EmployeeDocumentsPage,
} from './pages/employee/EmployeePages';

const AppRouter: React.FC = () => {
  const { currentRoute } = useApp();

  // 1. Public Pages (Clean modern website layouts)
  if (currentRoute === 'landing' || currentRoute === 'home') return <TaxConsultantWebsite />;
  if (currentRoute === 'tax-consultant') return <TaxConsultantWebsite />;
  if (currentRoute === 'portal-home') return <HomePage />;
  if (currentRoute === 'services') return <ServicesPage />;
  if (currentRoute === 'small-business') return <SmallBusinessPage />;
  if (currentRoute === 'property-management') return <PropertyManagementPage />;
  if (currentRoute === 'pricing') return <PricingPage />;
  if (currentRoute === 'calculator') return <CalculatorPage />;
  if (currentRoute === 'about') return <AboutPage />;
  if (currentRoute === 'faq') return <FaqPage />;
  if (currentRoute === 'contact') return <ContactPage />;
  if (currentRoute === 'login') return <AuthPage isRegister={false} />;
  if (currentRoute === 'register') return <AuthPage isRegister={true} />;

  // 2. Authenticated SaaS Dashboard Layout (Admin / Company / Employee)
  const renderDashboardContent = () => {
    switch (currentRoute) {
      // ── Admin Routes ──
      case 'admin/dashboard':
        return <AdminDashboard />;
      case 'admin/companies':
        return <CompaniesPage />;
      case 'admin/candidates':
        return <CandidatesPage />;
      case 'admin/employees':
        return <EmployeesPage />;
      case 'admin/jobs':
        return <JobsPage />;
      case 'admin/interviews':
        return <InterviewsPage />;
      case 'admin/training':
        return <TrainingPage />;
      case 'admin/tasks':
        return <TasksPage />;
      case 'admin/attendance':
        return <AttendancePage />;
      case 'admin/payroll':
        return <PayrollPage />;
      case 'admin/reports':
        return <ReportsPage />;
      case 'admin/messages':
        return <MessagesPage />;
      case 'admin/settings':
        return <SettingsPage />;

      // ── Company Routes ──
      case 'company/dashboard':
        return <CompanyDashboard />;
      case 'company/jobs':
        return <JobsPage />;
      case 'company/candidates':
        return <CompanyCandidatesPage />;
      case 'company/interviews':
        return <InterviewsPage />;
      case 'company/employees':
        return <EmployeesPage />;
      case 'company/tasks':
        return <TasksPage />;
      case 'company/attendance':
        return <AttendancePage />;
      case 'company/performance':
        return <CompanyPerformancePage />;
      case 'company/payroll':
        return <PayrollPage />;
      case 'company/messages':
        return <MessagesPage />;
      case 'company/settings':
        return <SettingsPage />;

      // ── Employee Routes ──
      case 'employee/dashboard':
        return <EmployeeDashboard />;
      case 'employee/profile':
        return <SettingsPage />;
      case 'employee/tasks':
        return <TasksPage />;
      case 'employee/training':
        return <EmployeeTrainingPage />;
      case 'employee/attendance':
        return <AttendancePage />;
      case 'employee/payroll':
        return <EmployeePayrollPage />;
      case 'employee/documents':
        return <EmployeeDocumentsPage />;
      case 'employee/messages':
        return <MessagesPage />;
      case 'employee/settings':
        return <SettingsPage />;

      default:
        return <HomePage />;
    }
  };

  return <AppLayout>{renderDashboardContent()}</AppLayout>;
};

export function App() {
  return (
    <AppProvider>
      <CurrencyProvider>
        <AppRouter />
      </CurrencyProvider>
    </AppProvider>
  );
}

export default App;

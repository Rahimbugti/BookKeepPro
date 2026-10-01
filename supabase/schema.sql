-- =====================================================================
-- VPM WORKFORCE MANAGEMENT - SUPABASE POSTGRESQL DATABASE SCHEMA
-- =====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'company', 'employee');
CREATE TYPE candidate_status AS ENUM ('applied', 'screening', 'interview', 'selected', 'rejected', 'hired');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract');
CREATE TYPE job_status AS ENUM ('open', 'paused', 'closed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'overdue');
CREATE TYPE attendance_status AS ENUM ('present', 'late', 'half_day', 'absent');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'paid');
CREATE TYPE interview_status AS ENUM ('scheduled', 'completed', 'cancelled');

-- 2. PROFILES TABLE (Supabase Auth Users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'employee',
    phone TEXT,
    avatar_url TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. COMPANIES TABLE
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    industry TEXT,
    website TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    address TEXT,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. JOBS TABLE
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT[] DEFAULT '{}',
    experience_level TEXT NOT NULL,
    salary_range_min NUMERIC(10, 2),
    salary_range_max NUMERIC(10, 2),
    working_hours TEXT NOT NULL,
    job_type job_type DEFAULT 'full-time',
    status job_status DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CANDIDATES TABLE
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    skills TEXT[] DEFAULT '{}',
    experience_years NUMERIC(4, 1),
    resume_url TEXT,
    profile_picture_url TEXT,
    availability TEXT,
    hourly_rate NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. APPLICATIONS TABLE
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE NOT NULL,
    status candidate_status DEFAULT 'applied',
    cover_letter TEXT,
    match_score NUMERIC(5, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(job_id, candidate_id)
);

-- 7. INTERVIEWS TABLE
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    interviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status interview_status DEFAULT 'scheduled',
    meeting_link TEXT,
    notes TEXT,
    rating NUMERIC(3, 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. EMPLOYEES TABLE (Hired Virtual Assistants)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    candidate_id UUID REFERENCES candidates(id) ON DELETE SET NULL,
    job_title TEXT NOT NULL,
    department TEXT,
    hourly_rate NUMERIC(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    status TEXT DEFAULT 'active',
    performance_rating NUMERIC(3, 2) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TRAINING COURSES TABLE
CREATE TABLE training_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    duration_hours NUMERIC(4, 1),
    cover_image_url TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. TRAINING LESSONS TABLE
CREATE TABLE training_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES training_courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    order_index INT NOT NULL,
    content TEXT,
    video_url TEXT,
    quiz JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. TRAINING PROGRESS TABLE
CREATE TABLE training_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES training_courses(id) ON DELETE CASCADE NOT NULL,
    completed_lessons INT DEFAULT 0,
    total_lessons INT NOT NULL,
    quiz_score NUMERIC(5, 2),
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(employee_id, course_id)
);

-- 12. TASKS TABLE
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority task_priority DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status task_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. ATTENDANCE TABLE
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out_time TIMESTAMP WITH TIME ZONE,
    working_hours NUMERIC(4, 2) DEFAULT 0.0,
    status attendance_status DEFAULT 'present',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(employee_id, date)
);

-- 14. PAYROLL TABLE
CREATE TABLE payroll (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    working_days INT NOT NULL,
    hourly_rate NUMERIC(10, 2) NOT NULL,
    total_hours NUMERIC(6, 2) NOT NULL,
    gross_salary NUMERIC(10, 2) NOT NULL,
    deductions NUMERIC(10, 2) DEFAULT 0.00,
    bonus NUMERIC(10, 2) DEFAULT 0.00,
    net_salary NUMERIC(10, 2) NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. MESSAGES TABLE
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. DOCUMENTS TABLE
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size_kb INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- ADMIN FULL ACCESS
CREATE POLICY "Admins have full access to all tables"
ON profiles FOR ALL
TO authenticated
USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- COMPANY ACCESS
CREATE POLICY "Companies can view and edit their own profile"
ON companies FOR ALL
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Companies can manage their jobs"
ON jobs FOR ALL
TO authenticated
USING (
    company_id IN (SELECT id FROM companies WHERE user_id = auth.uid())
);

CREATE POLICY "Companies can manage their tasks"
ON tasks FOR ALL
TO authenticated
USING (
    company_id IN (SELECT id FROM companies WHERE user_id = auth.uid())
);

-- EMPLOYEE ACCESS
CREATE POLICY "Employees can view their own tasks"
ON tasks FOR SELECT
TO authenticated
USING (
    employee_id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
);

CREATE POLICY "Employees can update task status"
ON tasks FOR UPDATE
TO authenticated
USING (
    employee_id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
);

CREATE POLICY "Employees can manage their own attendance"
ON attendance FOR ALL
TO authenticated
USING (
    employee_id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
);

CREATE POLICY "Users can view and send their own messages"
ON messages FOR ALL
TO authenticated
USING (sender_id = auth.uid() OR receiver_id = auth.uid());

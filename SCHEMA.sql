-- CHEF Platform Database Schema (PostgreSQL for Supabase)

-- 1. Users & Roles
create table profiles (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'donor', 'volunteer', 'doctor', 'sponsor')),
  phone text,
  country text default 'Liberia',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Children (Beneficiaries)
create table children (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  dob date,
  gender text,
  bio text,
  photo_url text,
  school_grade text,
  location text,
  needs_sponsorship boolean default true,
  sponsor_id uuid references profiles(id), -- If 1:1 sponsorship
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Programs: Food (Bakery & Distribution)
create table bakery_logs (
  id uuid default uuid_generate_v4() primary key,
  log_date date default current_date,
  loaves_baked integer default 0,
  loaves_sold integer default 0,
  loaves_donated integer default 0,
  revenue decimal(10,2) default 0.00,
  notes text,
  created_by uuid references profiles(id)
);

create table meals_distributed (
  id uuid default uuid_generate_v4() primary key,
  distribution_date date default current_date,
  location text, -- School name or community center
  children_fed integer default 0,
  program_type text check (program_type in ('school_feeding', 'community_outreach')),
  recorded_by uuid references profiles(id)
);

-- 4. Programs: Health (Doctors & Records)
create table health_checkups (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references children(id) not null,
  doctor_id uuid references profiles(id), -- The volunteer doctor
  checkup_date date default current_date,
  height_cm decimal(5,2),
  weight_kg decimal(5,2),
  diagnosis text,
  treatment_prescribed text,
  medication_given boolean default false,
  next_visit_date date
);

create table doctor_applications (
  id uuid default uuid_generate_v4() primary key,
  applicant_id uuid references profiles(id),
  specialization text,
  license_number text,
  availability_start date,
  availability_end date,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending'
);

-- 5. Programs: Education (Books & Computers)
create table education_inventory (
  id uuid default uuid_generate_v4() primary key,
  item_type text check (item_type in ('book', 'computer', 'school_supply')),
  item_name text not null,
  quantity_in_stock integer default 0,
  total_distributed integer default 0,
  donor_origin text -- e.g., 'UK', 'USA'
);

create table education_distribution (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references children(id),
  item_id uuid references education_inventory(id),
  date_distributed date default current_date,
  notes text
);

-- 6. Income Generating Projects (Sustainability)
create table transport_fleet (
  id uuid default uuid_generate_v4() primary key,
  vehicle_type text check (vehicle_type in ('taxi', 'bus')),
  plate_number text unique,
  driver_name text,
  status text check (status in ('active', 'maintenance', 'inactive'))
);

create table transport_revenue (
  id uuid default uuid_generate_v4() primary key,
  vehicle_id uuid references transport_fleet(id),
  log_date date default current_date,
  daily_income decimal(10,2) default 0.00,
  fuel_cost decimal(10,2) default 0.00,
  maintenance_cost decimal(10,2) default 0.00,
  net_profit decimal(10,2) generated always as (daily_income - fuel_cost - maintenance_cost) stored
);

-- 7. Donations & Financials
create table donations (
  id uuid default uuid_generate_v4() primary key,
  donor_id uuid references profiles(id),
  amount decimal(10,2) not null,
  currency text default 'USD',
  payment_method text, -- 'stripe', 'paypal', 'cash'
  status text check (status in ('pending', 'completed', 'failed')),
  campaign text, -- 'general', 'bakery', 'health_camp', 'sponsor_child'
  transaction_ref text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Digital Lab Monitoring
create table digital_lab_status (
  id uuid default uuid_generate_v4() primary key,
  lab_name text not null,
  is_online boolean default true,
  solar_battery_percentage integer default 0,
  network_speed_mbps decimal(5,2) default 0.00,
  active_computers integer default 0,
  total_computers integer default 0,
  last_ping timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Initial data for prototype
insert into digital_lab_status (lab_name, is_online, solar_battery_percentage, network_speed_mbps, active_computers, total_computers)
values ('Digital Lab Alpha', true, 88, 12.5, 38, 42);

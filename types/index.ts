export type UserRole = 'admin' | 'donor' | 'volunteer' | 'doctor' | 'sponsor';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  phone: string | null;
  country: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Child {
  id: string;
  first_name: string;
  last_name: string;
  dob: string | null;
  gender: string | null;
  bio: string | null;
  photo_url: string | null;
  school_grade: string | null;
  location: string | null;
  needs_sponsorship: boolean;
  sponsor_id: string | null;
  progress_food: number;
  progress_health: number;
  progress_education: number;
  created_at: string;
}

export interface BakeryLog {
  id: string;
  log_date: string;
  loaves_baked: number;
  loaves_sold: number;
  loaves_donated: number;
  revenue: number;
  notes: string | null;
}

export interface ImpactStats {
  total_children: number;
  total_donations: number;
  meals_served: number;
  health_checks: number;
  books_distributed: number;
}

export interface Donation {
  id: string;
  donor_id: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
  campaign: string;
  created_at: string;
}

export interface DigitalLabStatus {
  id: string;
  lab_name: string;
  is_online: boolean;
  solar_battery_percentage: number;
  network_speed_mbps: number;
  active_computers: number;
  total_computers: number;
  last_ping: string;
  created_at: string;
}

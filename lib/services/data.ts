import { supabase } from '../supabase';
import { ImpactStats, Child, Donation, DigitalLabStatus } from '../../types';

// Fallback Mock Data for Prototype Stability
const MOCK_LAB_STATUS: DigitalLabStatus = {
  id: 'lab1',
  lab_name: 'Digital Lab Alpha',
  is_online: true,
  solar_battery_percentage: 88,
  network_speed_mbps: 12.5,
  active_computers: 38,
  total_computers: 42,
  last_ping: new Date().toISOString(),
  created_at: new Date().toISOString()
};

// Fallback Mock Data for Prototype Stability
const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    first_name: 'Blessing',
    last_name: 'Kollie',
    dob: '2018-05-12',
    gender: 'Female',
    bio: 'Blessing loves to read and wants to be a nurse.',
    photo_url: 'https://images.unsplash.com/photo-1547491202-69a01b71a054?q=80&w=200',
    school_grade: 'Grade 2',
    needs_sponsorship: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    first_name: 'Prince',
    last_name: 'Freeman',
    dob: '2016-08-20',
    gender: 'Male',
    bio: 'Prince is an aspiring artist and a bakery hub volunteer.',
    photo_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=200',
    school_grade: 'Grade 4',
    needs_sponsorship: false,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    first_name: 'Martha',
    last_name: 'Tweh',
    dob: '2019-11-05',
    gender: 'Female',
    bio: 'Martha enjoys mathematics and playing football.',
    photo_url: 'https://images.unsplash.com/photo-1531123897727-8f129e16fdf9?q=80&w=200',
    school_grade: 'Preschool',
    needs_sponsorship: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    first_name: 'Samuel',
    last_name: 'Doe',
    dob: '2015-02-14',
    gender: 'Male',
    bio: 'Samuel is training in our digital hub to become a coder.',
    photo_url: 'https://images.unsplash.com/photo-1540560085022-73089a75b4c8?q=80&w=200',
    school_grade: 'Grade 6',
    needs_sponsorship: false,
    created_at: new Date().toISOString()
  }
];

const MOCK_DONATIONS: Donation[] = [
  { id: 'tx1', donor_id: 'd1', amount: 250, currency: 'USD', payment_method: 'Stripe', status: 'completed', campaign: 'Bakery Hub', created_at: new Date().toISOString() },
  { id: 'tx2', donor_id: 'd2', amount: 50, currency: 'USD', payment_method: 'PayPal', status: 'completed', campaign: 'Education Fund', created_at: new Date().toISOString() },
  { id: 'tx3', donor_id: 'd3', amount: 1000, currency: 'USD', payment_method: 'Bank Transfer', status: 'completed', campaign: 'General Support', created_at: new Date().toISOString() },
];

export const ImpactService = {
  async getGlobalStats(): Promise<ImpactStats> {
    return {
      total_children: 1240,
      total_donations: 45200,
      meals_served: 15402,
      health_checks: 3210,
      books_distributed: 5420
    };
  }
};

// Helper for local persistence during prototype development
const getLocalChildren = (): Child[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('chef_local_children');
  return saved ? JSON.parse(saved) : [];
};

const saveLocalChild = (child: Child) => {
  if (typeof window === 'undefined') return;
  const current = getLocalChildren();
  localStorage.setItem('chef_local_children', JSON.stringify([child, ...current]));
};

export const ChildrenService = {
  async getAllChildren(): Promise<Child[]> {
    try {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const localChildren = getLocalChildren();
      const dbChildren = data || [];
      return [...localChildren, ...dbChildren, ...MOCK_CHILDREN];
    } catch (err) {
      console.warn('Supabase fetch failed, using fallback mock and local data for Children.');
      return [...getLocalChildren(), ...MOCK_CHILDREN];
    }
  },

  async getChildById(id: string): Promise<Child | null> {
    try {
      // Check local first
      const local = getLocalChildren().find(c => c.id === id);
      if (local) return local;

      const { data, error } = await supabase
        .from('children')
        .select('*, profiles(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      return getLocalChildren().find(c => c.id === id) || MOCK_CHILDREN.find(c => c.id === id) || null;
    }
  },

  async createChild(child: Partial<Child>): Promise<{ data: Child | null; error: any }> {
    try {
      // Attempt DB insert
      const { data, error } = await supabase
        .from('children')
        .insert([child])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.warn('DB Insert failed, persisting to localStorage for prototype experience.');
      const localChild = {
        ...child,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      } as Child;
      
      saveLocalChild(localChild);
      return { data: localChild, error: null }; // Return as success so UI updates correctly
    }
  }
};

export const DonationService = {
  async getRecentDonations(limit = 5): Promise<Donation[]> {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (data && data.length > 0) return data;
      return MOCK_DONATIONS.slice(0, limit);
    } catch (err) {
      console.warn('Supabase fetch failed, using fallback mock data for Donations.');
      return MOCK_DONATIONS.slice(0, limit);
    }
  }
};

export const DigitalLabService = {
  async getLabStatus(labName = 'Digital Lab Alpha'): Promise<DigitalLabStatus> {
    try {
      const { data, error } = await supabase
        .from('digital_lab_status')
        .select('*')
        .eq('lab_name', labName)
        .single();

      if (error) throw error;
      return data || MOCK_LAB_STATUS;
    } catch (err) {
      console.warn(`Supabase fetch failed for ${labName}, using fallback mock data.`);
      return MOCK_LAB_STATUS;
    }
  },

  async updateLabStatus(labName: string, updates: Partial<DigitalLabStatus>): Promise<void> {
    try {
      const { error } = await supabase
        .from('digital_lab_status')
        .update({ ...updates, last_ping: new Date().toISOString() })
        .eq('lab_name', labName);

      if (error) throw error;
    } catch (err) {
      console.error(`Error updating lab status for ${labName}:`, err);
    }
  }
};

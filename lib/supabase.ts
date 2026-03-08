import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a single Supabase client instance to be used throughout the application.
 * Using a singleton pattern ensures we don't create multiple auth listeners or 
 * storage connections, which can lead to performance issues and "duplicate GoTrueClient" warnings.
 */
function createSupabaseSingleton() {
  // If we are on the client and already have an instance, return it.
  if (typeof window !== 'undefined' && (window as any).supabase) {
    return (window as any).supabase;
  }

  // Validation
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.warn('Supabase credentials missing. Check your environment variables.');
    }
  }

  // Create client with improved defaults
  // We use a fallback URL if the env var is missing to prevent internal Supabase crashes,
  // though the actual requests will still fail until the env vars are provided.
  const client = createClient(
    supabaseUrl || 'https://MISSING_URL.supabase.co', 
    supabaseAnonKey || 'MISSING_ANON_KEY',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'chef-auth-token', // Unique key to avoid collisions with other projects
      },
    }
  );

  // Store in window object for dev-mode HMR persistence
  if (typeof window !== 'undefined') {
    (window as any).supabase = client;
  }

  return client;
}

export const supabase = createSupabaseSingleton();

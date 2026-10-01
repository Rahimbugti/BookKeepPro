import { createClient } from '@supabase/supabase-js';

// Read from environment variables if set (e.g. Vite VITE_SUPABASE_URL)
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://vpm-workforce.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'public-anon-key-placeholder-for-vpm-workforce';

export const isSupabaseConfigured = Boolean(
  import.meta.env?.VITE_SUPABASE_URL && import.meta.env?.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

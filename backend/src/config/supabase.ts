import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error('Missing Supabase environment variables (SUPABASE_URL, SUPABASE_SECRET_KEY). Please check your .env file.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseSecretKey);
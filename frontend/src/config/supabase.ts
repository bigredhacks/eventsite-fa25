import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nrktqgaipibbdhqltbwr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_oXlqgxB0XtryV-XAwld7Kg_2Ui7tjVO'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
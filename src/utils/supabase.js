
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olaunnkxppadtleycfjw.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseKey) {
  console.error('Missing Supabase key in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
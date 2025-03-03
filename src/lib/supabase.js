'use client';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_SUPABASE_URL
const supabaseKey = process.env.REACT_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export function useSupabase() {
    return { supabase };
  }
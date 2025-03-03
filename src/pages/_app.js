import React from 'react';
import '../styles/globals.css'; // Make sure this path is correct
import { useEffect } from 'react';
import { supabase } from '../utils/supabase';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        console.log('Session:', session);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
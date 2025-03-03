// src/pages/auth/verify-email.js - Update to use Supabase's confirmMethod
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';

const VerifyEmailPage = () => {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Get hash parameters from URL
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const errorCode = hashParams.get('error_code');
      const errorDescription = hashParams.get('error_description');
      
      if (errorCode) {
        setError(errorDescription || 'Verification failed');
        setVerificationStatus('error');
        return;
      }
    }
    
    // For successful verification without errors in hash
    const { type, token } = router.query;
    
    const handleEmailConfirmation = async () => {
      try {
        if (type === 'signup' && token) {
          // Use Supabase's built-in email confirmation
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          });
          
          if (error) throw error;
          setVerificationStatus('success');
        } else if (router.isReady && !type && !token) {
          // If no parameters but page is loaded, assume success
          // (This helps when redirected from Supabase automatically)
          setVerificationStatus('success');
        }
      } catch (err) {
        console.error('Email verification error:', err);
        setError(err.message || 'Verification failed');
        setVerificationStatus('error');
      }
    };
    
    if (router.isReady) {
      handleEmailConfirmation();
    }
  }, [router.isReady, router.query]);
  
  // Rest of your component remains the same
  // ...
};
  
  return (
    <>
      <Head>
        <title>Email Verification - Gem Trade Management System</title>
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          {verificationStatus === 'loading' && (
            <div className="text-center">
              <svg 
                className="animate-spin h-12 w-12 text-blue-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="text-center">
              <svg 
                className="mx-auto h-16 w-16 text-green-500"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Email Verified Successfully!
              </h2>
              
              <p className="mt-2 text-gray-600">
                Your email has been verified. You can now log in to your account.
              </p>
              
              <div className="mt-6">
                <Link 
                  href="/auth/login"
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Log In
                </Link>
              </div>
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="text-center">
              <svg 
                className="mx-auto h-16 w-16 text-red-500"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
              
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Verification Failed
              </h2>
              
              <p className="mt-2 text-red-600">
                {error || 'There was a problem verifying your email.'}
              </p>
              
              <div className="mt-6">
                <Link 
                  href="/auth/login"
                  className="text-blue-600 hover:underline"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
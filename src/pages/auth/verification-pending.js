import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const VerificationPendingPage = () => {
  return (
    <>
      <Head>
        <title>Verification Pending - Gem Trade Management System</title>
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <svg 
              className="mx-auto h-16 w-16 text-yellow-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Verification Pending
            </h2>
            
            <p className="mt-2 text-gray-600">
              Thank you for registering with GTMS! We're reviewing your verification document.
            </p>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-700">
                Please check your email to verify your account. Once your identity verification is complete, you'll have full access to the platform.
              </p>
            </div>
            
            <div className="mt-6">
              <Link href="/" className="text-blue-600 hover:underline">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationPendingPage;
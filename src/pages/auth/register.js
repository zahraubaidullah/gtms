import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register - Gem Trade Management System</title>
        <meta name="description" content="Create an account on GTMS" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Join the Gem Trade Management System
            </h1>
            <p className="mt-2 text-gray-600">
              Register to buy, sell, and discover premium gemstones and jewelry services
            </p>
          </div>
          
          <RegisterForm />
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
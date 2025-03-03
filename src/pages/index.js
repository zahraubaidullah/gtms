import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Gem Trade Management System</title>
        <meta name="description" content="A specialized B2B/B2C e-commerce platform for the Sri Lankan gem and jewelry industry" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div className="bg-blue-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Gem Trade Management System
              </h1>
              <p className="mt-6 text-xl max-w-2xl mx-auto">
                A specialized platform for the Sri Lankan gem and jewelry industry
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link href="/auth/register" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm hover:bg-gray-100">
                  Register
                </Link>
                <Link href="/auth/login" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Secure Marketplace</h3>
              <p className="text-gray-600">
                Browse, buy, and sell authentic gemstones with verified industry participants.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Industry Services</h3>
              <p className="text-gray-600">
                Connect with lapidary, laboratory, and custom jewelry making services.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Events & Networking</h3>
              <p className="text-gray-600">
                Discover and participate in industry events, exhibitions, and workshops.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <p>&copy; {new Date().getFullYear()} Gem Trade Management System</p>
              <p className="mt-2 text-gray-400">A specialized B2B/B2C e-commerce platform for the Sri Lankan gem and jewelry industry</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
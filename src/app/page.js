'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GemstoneCard from '@/components/gemstones/GemstoneCard';

// Mock data for featured gemstones
const FEATURED_GEMSTONES = [
  {
    id: '1',
    name: 'Blue Sapphire',
    type: 'Sapphire',
    color: 'Blue',
    weight_carats: 2.5,
    price: 2500,
    is_sold: false,
    image_url: '/api/placeholder/400/400'
  },
  {
    id: '2',
    name: 'Pink Tourmaline',
    type: 'Tourmaline',
    color: 'Pink',
    weight_carats: 3.2,
    price: 1800,
    is_sold: false,
    image_url: '/api/placeholder/400/400'
  },
  {
    id: '3',
    name: 'Emerald Cut',
    type: 'Emerald',
    color: 'Green',
    weight_carats: 1.8,
    price: 4200,
    is_sold: true,
    image_url: '/api/placeholder/400/400'
  },
  {
    id: '4',
    name: 'Ruby Heart',
    type: 'Ruby',
    color: 'Red',
    weight_carats: 1.5,
    price: 3500,
    is_sold: false,
    image_url: '/api/placeholder/400/400'
  }
];

export default function HomePage() {
  const [featuredGemstones, setFeaturedGemstones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setFeaturedGemstones(FEATURED_GEMSTONES);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Discover Exceptional Gemstones</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            GTMS is a specialized B2B/B2C e-commerce platform tailored for the Sri Lankan gem and jewelry industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/gemstones" 
              className="px-8 py-3 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Explore Gemstones
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Gemstones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Gemstones</h2>
            <Link href="/gemstones" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredGemstones.map(gemstone => (
                <GemstoneCard 
                  key={gemstone.id} 
                  gemstone={gemstone} 
                  showPrice={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Gemstone Certification</h3>
              <p className="text-gray-600 mb-4">
                Get your gemstones professionally certified by our experts.
              </p>
              <Link href="/services/certification" className="text-blue-600 hover:underline">
                Learn More &rarr;
              </Link>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lapidary Services</h3>
              <p className="text-gray-600 mb-4">
                Professional cutting, polishing, and shaping of gemstones.
              </p>
              <Link href="/services/lapidary" className="text-blue-600 hover:underline">
                Learn More &rarr;
              </Link>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Jewelry Design</h3>
              <p className="text-gray-600 mb-4">
                Create unique, custom jewelry pieces with our expert designers.
              </p>
              <Link href="/services/jewelry" className="text-blue-600 hover:underline">
                Learn More &rarr;
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/services" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About GTMS</h2>
              <p className="text-gray-700 mb-4">
                The Gem Trade Management System (GTMS) is a specialized B2B/B2C e-commerce platform tailored for the Sri Lankan gem and jewelry industry.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike general e-commerce platforms, GTMS incorporates unique features designed to address the industry's security, authentication, and operational needs. Our platform ensures that only verified individuals participate in buying, selling, and service provisions.
              </p>
              <p className="text-gray-700 mb-6">
                With GTMS, users can buy and sell gemstones, book specialized services, participate in industry events, and much more - all in a secure and trusted environment.
              </p>
              <Link 
                href="/about" 
                className="text-blue-600 font-medium hover:underline"
              >
                Learn more about us &rarr;
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/api/placeholder/600/480"
                  alt="About GTMS"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JM</span>
                </div>
                <div>
                  <h3 className="font-bold">John Miller</h3>
                  <p className="text-gray-600 text-sm">Gem Buyer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "GTMS has transformed how I source gemstones. The verification process gives me confidence in every purchase, and the appointment booking system is incredibly convenient."
              </p>
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">SP</span>
                </div>
                <div>
                  <h3 className="font-bold">Sara Perera</h3>
                  <p className="text-gray-600 text-sm">Gemstone Seller</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a seller, GTMS provides me with all the tools I need to showcase my gemstones professionally. The certification requirement helps maintain industry standards and trust."
              </p>
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">RJ</span>
                </div>
                <div>
                  <h3 className="font-bold">Raj Jayawardena</h3>
                  <p className="text-gray-600 text-sm">Lapidary Service Provider</p>
                </div>
              </div>
              <p className="text-gray-700">
                "GTMS has connected me with clients I wouldn't have reached otherwise. The platform's focus on the Sri Lankan gem industry has helped my business grow substantially."
              </p>
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the premier platform for the Sri Lankan gem and jewelry industry today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
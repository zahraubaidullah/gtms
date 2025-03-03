'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Mock data for development
const MOCK_GEMSTONES = {
  '1': {
    id: '1',
    name: 'Blue Sapphire',
    type: 'Sapphire',
    color: 'Blue',
    weight_carats: 2.5,
    price: 2500,
    is_sold: false,
    description: 'Beautiful blue sapphire with excellent clarity. Natural, untreated gemstone from Sri Lanka. Perfect for a ring or pendant.',
    origin: 'Sri Lanka',
    treatment: 'None',
    certification_number: 'GIA123456789',
    certification_url: '/api/placeholder/600/800',
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    seller: {
      company_name: 'Ceylon Gems Ltd',
      rating: 4.8,
      id: 'seller1'
    }
  },
  '2': {
    id: '2',
    name: 'Pink Tourmaline',
    type: 'Tourmaline',
    color: 'Pink',
    weight_carats: 3.2,
    price: 1800,
    is_sold: false,
    description: 'Vibrant pink tourmaline with excellent color saturation. This gemstone has a brilliant cut that maximizes its natural beauty.',
    origin: 'Brazil',
    treatment: 'Heat',
    certification_number: 'GIA987654321',
    certification_url: '/api/placeholder/600/800',
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    seller: {
      company_name: 'Gems Paradise',
      rating: 4.5,
      id: 'seller2'
    }
  },
  '3': {
    id: '3',
    name: 'Emerald Cut',
    type: 'Emerald',
    color: 'Green',
    weight_carats: 1.8,
    price: 4200,
    is_sold: true,
    description: 'Exquisite emerald with deep green color. Features the classic emerald cut that highlights the gemstone\'s rich color and clarity.',
    origin: 'Colombia',
    treatment: 'Minor oiling',
    certification_number: 'GIA567891234',
    certification_url: '/api/placeholder/600/800',
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    seller: {
      company_name: 'Emerald Experts',
      rating: 4.9,
      id: 'seller3'
    }
  }
};

export default function GemstoneDetailPage({ params }) {
  const { id } = params;
  const [gemstone, setGemstone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Will be replaced with actual auth check

  // Fetch gemstone details
  useEffect(() => {
    const fetchGemstone = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get mock data
        const gemstoneData = MOCK_GEMSTONES[id];
        
        if (!gemstoneData) {
          setError('Gemstone not found');
        } else {
          setGemstone(gemstoneData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gemstone:', error);
        setError('Failed to load gemstone details. Please try again.');
        setIsLoading(false);
      }
    };

    fetchGemstone();
    
    // For demo purposes, we'll simulate being unauthenticated
    setIsAuthenticated(false);
  }, [id]);

  const handleAddToCart = () => {
    // Will be implemented later with actual cart functionality
    alert('Add to cart functionality will be implemented with authentication');
  };

  const handleBookAppointment = () => {
    // Will be implemented later
    alert('Appointment booking will be implemented with authentication');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !gemstone) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Gemstone not found'}
        </div>
        <div className="mt-6">
          <Link href="/gemstones" className="text-blue-600 hover:underline">
            &larr; Back to gemstones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/gemstones" className="text-blue-600 hover:underline">
          &larr; Back to gemstones
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Gallery */}
          <div className="md:w-1/2 p-6">
            <div className="relative h-80 w-full mb-4">
              <Image 
                src={gemstone.images[selectedImage]} 
                alt={gemstone.name}
                fill
                style={{ objectFit: 'contain' }}
                className="bg-white"
              />
              
              {/* Sold badge */}
              {gemstone.is_sold && (
                <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded-full text-sm font-bold">
                  SOLD
                </div>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            <div className="flex gap-2 mt-4">
              {gemstone.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative h-20 w-20 cursor-pointer border-2 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image 
                    src={image} 
                    alt={`${gemstone.name} thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gemstone Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{gemstone.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-4">{gemstone.type}</span>
              <span className="text-gray-600">{gemstone.color}</span>
            </div>
            
            {isAuthenticated ? (
              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">${gemstone.price.toLocaleString()}</span>
              </div>
            ) : (
              <div className="mb-6">
                <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center">
                  <p className="text-gray-700">Sign in to view price and purchase details</p>
                  <Link href="/auth/login" className="inline-block mt-2 text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-gray-600">Weight:</div>
                <div>{gemstone.weight_carats} carats</div>
                
                <div className="text-gray-600">Origin:</div>
                <div>{gemstone.origin}</div>
                
                <div className="text-gray-600">Treatment:</div>
                <div>{gemstone.treatment}</div>
                
                <div className="text-gray-600">Certification:</div>
                <div>{gemstone.certification_number}</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{gemstone.description}</p>
            </div>
            
            {!gemstone.is_sold && isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBookAppointment}
                  className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded font-medium"
                >
                  Book Appointment
                </button>
              </div>
            )}
            
            {gemstone.is_sold && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded mb-6">
                This gemstone has been sold.
              </div>
            )}
            
            {/* Seller Information */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Seller</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{gemstone.seller.company_name}</p>
                  <div className="flex items-center mt-1">
                    <span className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(gemstone.seller.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-gray-600">{gemstone.seller.rating}</span>
                    </span>
                  </div>
                </div>
                {isAuthenticated && (
                  <Link 
                    href={`/companies/${gemstone.seller.id}`} 
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate Section */}
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Certification</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
              <p className="mb-2">Certificate Number: {gemstone.certification_number}</p>
              <p className="text-gray-700 mb-4">
                Each gemstone in our collection comes with a certificate of authenticity from a 
                reputable gemological laboratory, verifying its quality, characteristics, and authenticity.
              </p>
              {!isAuthenticated && (
                <div className="bg-yellow-100 p-3 rounded">
                  <p className="text-yellow-800 text-sm">
                    Sign in to view full certificate details
                  </p>
                </div>
              )}
            </div>
            <div className="md:w-1/2 relative h-60">
              <Image 
                src={gemstone.certification_url}
                alt="Gemstone Certificate"
                fill
                style={{ objectFit: 'contain' }}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
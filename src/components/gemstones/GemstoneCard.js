'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GemstoneCard({ gemstone, showPrice = false }) {
  // For now we'll assume gemstone has these properties:
  // id, name, type, color, weight_carats, price, is_sold, image_url
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-56 w-full">
        {/* For now, we'll use a placeholder image */}
        {gemstone.image_url ? (
          <Image 
            src={gemstone.image_url}
            alt={gemstone.name}
            fill
            style={{ objectFit: 'contain' }}
            className="bg-white p-2"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Sold badge */}
        {gemstone.is_sold && (
          <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded-full text-xs font-bold">
            SOLD
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{gemstone.name}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-2">{gemstone.type}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 mx-1"></span>
          <span className="mr-2">{gemstone.color}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 mx-1"></span>
          <span>{gemstone.weight_carats} carats</span>
        </div>
        
        {showPrice ? (
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${gemstone.price.toLocaleString()}
            </span>
            <Link 
              href={`/gemstones/${gemstone.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        ) : (
          <div className="mt-3">
            <Link 
              href={`/gemstones/${gemstone.id}`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
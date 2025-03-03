'use client';

import { useState, useEffect } from 'react';
import GemstoneCard from '@/components/gemstones/GemstoneCard';
import { supabase } from '@/lib/supabase';

// Mock data for development (will be replaced with actual API calls)
const MOCK_GEMSTONES = [
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
  },
  {
    id: '5',
    name: 'Yellow Citrine',
    type: 'Citrine',
    color: 'Yellow',
    weight_carats: 4.5,
    price: 1200,
    is_sold: false,
    image_url: '/api/placeholder/400/400'
  },
  {
    id: '6',
    name: 'Alexandrite',
    type: 'Alexandrite',
    color: 'Color-changing',
    weight_carats: 0.95,
    price: 8500,
    is_sold: false,
    image_url: '/api/placeholder/400/400'
  }
];

export default function GemstonesPage() {
  const [gemstones, setGemstones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    minWeight: '',
    maxWeight: '',
    showSold: false
  });

  // Fetch gemstones (will be replaced with Supabase query)
  useEffect(() => {
    // In a real implementation, we'd fetch from Supabase
    // For now, just simulate a delay with mock data
    const fetchGemstones = async () => {
      try {
        setIsLoading(true);
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setGemstones(MOCK_GEMSTONES);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gemstones:', error);
        setError('Failed to load gemstones. Please try again.');
        setIsLoading(false);
      }
    };

    fetchGemstones();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Apply filters to gemstones
  const filteredGemstones = gemstones.filter(gemstone => {
    // Filter by type
    if (filters.type && gemstone.type.toLowerCase() !== filters.type.toLowerCase()) {
      return false;
    }
    
    // Filter by color
    if (filters.color && !gemstone.color.toLowerCase().includes(filters.color.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && gemstone.price < parseFloat(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && gemstone.price > parseFloat(filters.maxPrice)) {
      return false;
    }
    
    // Filter by weight range
    if (filters.minWeight && gemstone.weight_carats < parseFloat(filters.minWeight)) {
      return false;
    }
    if (filters.maxWeight && gemstone.weight_carats > parseFloat(filters.maxWeight)) {
      return false;
    }
    
    // Filter by sold status
    if (!filters.showSold && gemstone.is_sold) {
      return false;
    }
    
    return true;
  });

  // Get unique types and colors for filter dropdown
  const gemTypes = [...new Set(gemstones.map(g => g.type))];
  const gemColors = [...new Set(gemstones.map(g => g.color))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Gemstones</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Types</option>
              {gemTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Color filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Colors</option>
              {gemColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          {/* Price range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
              />
            </div>
          </div>
          
          {/* Weight range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Weight (ct)</label>
              <input
                type="number"
                name="minWeight"
                value={filters.minWeight}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Weight (ct)</label>
              <input
                type="number"
                name="maxWeight"
                value={filters.maxWeight}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          
          {/* Show sold items */}
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="showSold"
              name="showSold"
              checked={filters.showSold}
              onChange={handleFilterChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="showSold" className="ml-2 text-sm text-gray-700">
              Show sold items
            </label>
          </div>
        </div>
      </div>
      
      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">Showing {filteredGemstones.length} gemstones</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGemstones.map(gemstone => (
              <GemstoneCard 
                key={gemstone.id} 
                gemstone={gemstone} 
                showPrice={false} // We'll show prices only when authenticated
              />
            ))}
          </div>
          
          {filteredGemstones.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No gemstones found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
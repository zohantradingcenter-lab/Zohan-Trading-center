import React, { useState } from 'react';
import { Search, MapPin, Home, Bed, Coins, RefreshCw } from 'lucide-react';
import { SearchFilterState } from '../types';

interface SearchBoxProps {
  onSearch: (filters: SearchFilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onReset, resultCount }) => {
  const [purpose, setPurpose] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [city, setCity] = useState<string>('All');
  const [type, setType] = useState<string>('All');
  const [bedrooms, setBedrooms] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<string>('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      purpose,
      city,
      type,
      bedrooms,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setPurpose('All');
    setCity('All');
    setType('All');
    setBedrooms('All');
    setMinPrice('All');
    setMaxPrice('All');
    onReset();
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200/80 p-5 sm:p-7 backdrop-blur-xl">
        {/* Purpose Tabs & Active Feedback */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="inline-flex p-1 bg-slate-100/90 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setPurpose('All')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all ${
                purpose === 'All'
                  ? 'bg-navy-950 text-gold-400 shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              All Properties
            </button>
            <button
              type="button"
              onClick={() => setPurpose('Buy')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all ${
                purpose === 'Buy'
                  ? 'bg-navy-950 text-gold-400 shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              For Sale
            </button>
            <button
              type="button"
              onClick={() => setPurpose('Rent')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all ${
                purpose === 'Rent'
                  ? 'bg-navy-950 text-gold-400 shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              For Rent
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-medium text-navy-900">
              {resultCount} {resultCount === 1 ? 'Property Available' : 'Properties Available'}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-navy-950 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Search Fields Grid */}
        <form onSubmit={handleSearchSubmit} className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Location Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>Location</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-all font-medium"
              >
                <option value="All">All Locations</option>
                <option value="Islamabad">Islamabad (DHA / F-10 / G-13)</option>
                <option value="Lahore">Lahore (DHA Phase 6 / Gulberg)</option>
                <option value="Rawalpindi">Rawalpindi (Bahria Town)</option>
                <option value="Karachi">Karachi (Clifton / DHA)</option>
              </select>
            </div>

            {/* Property Type Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-gold-600" />
                <span>Property Type</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-all font-medium"
              >
                <option value="All">All Property Types</option>
                <option value="Villa">Luxury Villa / House</option>
                <option value="Apartment">Apartment / Penthouse</option>
                <option value="Commercial">Commercial Plaza / Office</option>
                <option value="Plot">Residential & Commercial Plot</option>
              </select>
            </div>

            {/* Bedrooms Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-gold-600" />
                <span>Bedrooms</span>
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-all font-medium"
              >
                <option value="All">Any Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            {/* Min Price Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-gold-600" />
                <span>Min Price</span>
              </label>
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-all font-medium"
              >
                <option value="All">No Min</option>
                <option value="20000000">Rs 2 Crore</option>
                <option value="40000000">Rs 4 Crore</option>
                <option value="80000000">Rs 8 Crore</option>
                <option value="120000000">Rs 12 Crore+</option>
              </select>
            </div>

            {/* Max Price Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-gold-600" />
                <span>Max Price</span>
              </label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-all font-medium"
              >
                <option value="All">No Max</option>
                <option value="35000000">Rs 3.5 Crore</option>
                <option value="60000000">Rs 6 Crore</option>
                <option value="100000000">Rs 10 Crore</option>
                <option value="200000000">Rs 20 Crore+</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-navy-950 hover:bg-navy-900 text-gold-400 hover:text-gold-300 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer h-[42px] border border-gold-500/30"
              >
                <Search className="w-4 h-4 text-gold-400" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

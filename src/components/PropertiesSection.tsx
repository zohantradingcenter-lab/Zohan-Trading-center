import React, { useState } from 'react';
import { Property } from '../types';
import { Bed, Bath, Maximize2, MapPin, CheckCircle, MessageCircle, Eye, Calendar, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface PropertiesSectionProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onScheduleViewing: (property: Property) => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  properties,
  onSelectProperty,
  onScheduleViewing,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProperties = properties.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Buy') return item.purpose === 'Buy';
    if (activeCategory === 'Rent') return item.purpose === 'Rent';
    if (activeCategory === 'Houses') return item.type === 'House' || item.type === 'Villa';
    if (activeCategory === 'Apartments') return item.type === 'Apartment';
    if (activeCategory === 'Commercial') return item.type === 'Commercial';
    if (activeCategory === 'Plots') return item.type === 'Plot';
    return true;
  });

  const categories = [
    { label: 'All Properties', key: 'All' },
    { label: 'For Sale', key: 'Buy' },
    { label: 'For Rent', key: 'Rent' },
    { label: 'Houses & Villas', key: 'Houses' },
    { label: 'Apartments', key: 'Apartments' },
    { label: 'Commercial', key: 'Commercial' },
    { label: 'Plots', key: 'Plots' },
  ];

  return (
    <section id="properties" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Exclusive Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
              Curated prime residential and commercial real estate with 100% verified legal documentation across Islamabad, Lahore, and Karachi.
            </p>
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-navy-950 text-gold-400 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={property.image}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

                  {/* Purpose & Status Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-navy-950/90 text-gold-400 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-gold-500/30">
                      {property.purpose === 'Buy' ? 'For Sale' : 'For Rent'}
                    </span>
                    {property.badges[0] && (
                      <span className="px-2.5 py-1 rounded bg-gold-500 text-navy-950 text-xs font-bold backdrop-blur-xs">
                        {property.badges[0]}
                      </span>
                    )}
                  </div>

                  {/* Verification Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/90 text-emerald-300 text-[11px] font-medium border border-emerald-500/30 backdrop-blur-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>{property.developerApproved}</span>
                    </span>
                  </div>

                  {/* Price Banner Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                    <div>
                      <span className="text-[11px] text-slate-300 uppercase tracking-wider block font-medium">Price</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-gold-300 tabular-nums">
                        {property.priceFormatted}
                      </span>
                    </div>

                    {property.installmentAvailable && (
                      <span className="text-[11px] bg-slate-900/80 text-gold-400 px-2 py-0.5 rounded border border-gold-500/20">
                        Installments Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="font-medium text-slate-700 truncate">
                        {property.location.sector}, {property.location.city}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-navy-950 group-hover:text-gold-600 transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Description preview */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>

                    {/* Specs / Dimensional Features */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                      {property.features.bedrooms !== undefined && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4 text-slate-400" />
                          <span>{property.features.bedrooms} Beds</span>
                        </div>
                      )}

                      {property.features.bathrooms !== undefined && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4 text-slate-400" />
                          <span>{property.features.bathrooms} Baths</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">{property.features.areaSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-navy-950 hover:bg-navy-900 text-white hover:text-gold-300 text-xs font-semibold rounded transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onScheduleViewing(property)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors cursor-pointer"
                      title="Schedule Site Visit"
                    >
                      <Calendar className="w-3.5 h-3.5 text-navy-900" />
                      <span className="hidden sm:inline">Visit</span>
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20am%20interested%20in%20"${encodeURIComponent(property.title)}"%20listed%20at%20${encodeURIComponent(property.priceFormatted)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors"
                      title="Direct WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 p-8">
            <p className="text-base font-semibold text-navy-950">No properties matched your criteria.</p>
            <p className="text-sm text-slate-500 mt-1">Try resetting the filters or selecting another category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-5 py-2 bg-navy-950 text-gold-400 text-xs font-bold uppercase rounded"
            >
              Show All Properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

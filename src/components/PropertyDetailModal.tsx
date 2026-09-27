import React, { useState } from 'react';
import { Property } from '../types';
import { X, Bed, Bath, Maximize2, MapPin, CheckCircle2, MessageCircle, Calendar, ShieldCheck, Car } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleViewing: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onScheduleViewing,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy-950/80 hover:bg-navy-900 text-white hover:text-gold-400 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          {/* Main Gallery Viewport */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-navy-950 overflow-hidden">
            <img
              src={images[activeImageIndex] || property.image}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  {property.type} · {property.purpose === 'Buy' ? 'For Sale' : 'For Rent'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
                  {property.title}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-300 block">Price</span>
                <span className="font-serif text-2xl font-bold text-gold-300 tabular-nums">
                  {property.priceFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-navy-900 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-gold-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Location & Authority Approval */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="font-semibold">{property.location.sector}, {property.location.city}</span>
                <span className="text-slate-400">({property.location.area})</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{property.developerApproved}</span>
              </div>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div>
                <span className="text-xs text-slate-500 block">Covered / Plot Size</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 font-bold text-navy-950 text-sm">
                  <Maximize2 className="w-4 h-4 text-gold-600" />
                  <span>{property.features.areaSize}</span>
                </div>
              </div>

              {property.features.bedrooms !== undefined && (
                <div>
                  <span className="text-xs text-slate-500 block">Bedrooms</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 font-bold text-navy-950 text-sm">
                    <Bed className="w-4 h-4 text-gold-600" />
                    <span>{property.features.bedrooms} Bed</span>
                  </div>
                </div>
              )}

              {property.features.bathrooms !== undefined && (
                <div>
                  <span className="text-xs text-slate-500 block">Baths</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 font-bold text-navy-950 text-sm">
                    <Bath className="w-4 h-4 text-gold-600" />
                    <span>{property.features.bathrooms} Bath</span>
                  </div>
                </div>
              )}

              {property.features.parkingSpaces !== undefined && (
                <div>
                  <span className="text-xs text-slate-500 block">Car Parking</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 font-bold text-navy-950 text-sm">
                    <Car className="w-4 h-4 text-gold-600" />
                    <span>{property.features.parkingSpaces} Cars</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-serif text-lg font-bold text-navy-950 mb-2">Property Overview</h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h4 className="font-serif text-lg font-bold text-navy-950 mb-3">Key Features & Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Direct Inquiry Desk</span>
                <span className="text-xs font-bold text-navy-950">Khan Brothers Authorized Agents</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onScheduleViewing(property);
                  }}
                  className="inline-flex items-center gap-2 py-2.5 px-4 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>Book Site Visit</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20I%20am%20interested%20in%20"${encodeURIComponent(property.title)}"%20(Price:%20${encodeURIComponent(property.priceFormatted)}).%20Please%20share%20documents%20and%20floor%20plan.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-lg transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

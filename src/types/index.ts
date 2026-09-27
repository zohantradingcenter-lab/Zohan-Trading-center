export interface Property {
  id: string;
  title: string;
  type: 'House' | 'Villa' | 'Apartment' | 'Commercial' | 'Plot';
  purpose: 'Buy' | 'Rent';
  price: number; // in PKR
  priceFormatted: string;
  installmentAvailable?: boolean;
  location: {
    sector: string;
    city: string;
    area: string;
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    areaSize: string; // e.g., '1 Kanal', '10 Marla', '2,400 Sq Ft'
    parkingSpaces?: number;
    floors?: number;
  };
  image: string;
  gallery: string[];
  badges: string[];
  status: 'Ready for Possession' | 'Under Construction' | 'Hot Deal' | 'Newly Launched';
  description: string;
  amenities: string[];
  developerApproved: string; // e.g. "CDA Approved", "DHA Verified"
}

export interface Project {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Luxury Villas';
  location: string;
  city: string;
  progressPercent: number;
  completionDate: string;
  status: 'Under Construction' | 'Delivered' | 'Booking Open' | 'Finishing Stage';
  startingPrice: string;
  image: string;
  description: string;
  highlights: string[];
  unitsAvailable: string;
}

export interface SearchFilterState {
  city: string;
  type: string;
  purpose: 'Buy' | 'Rent' | 'All';
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  propertyType: string;
}

export interface OfficeLocation {
  city: string;
  name: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  hours: string;
}

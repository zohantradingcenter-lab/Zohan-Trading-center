export interface Property {
  id: string;
  title: string;
  type: 'House' | 'Villa' | 'Apartment' | 'Commercial' | 'Plot';
  purpose: 'Buy' | 'Rent';
  price: number; // in PKR
  priceFormatted: string;
  installmentAvailable?: boolean;
  urgentDeal?: boolean;
  directOwner?: boolean;
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

export interface SellPropertySubmission {
  id: string;
  propertyType: string;
  purpose: 'Sell' | 'Rent' | 'Direct Cash Buyout';
  city: string;
  society: string;
  size: string;
  demandPrice: string;
  ownerName: string;
  phone: string;
  isUrgent: boolean;
  notes?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Deal Closed';
}

export interface InquiryLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  service: string;
  message?: string;
  preferredDate?: string;
  timeSlot?: string;
  targetPropertyTitle?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Visit Scheduled' | 'Closed';
}

export interface MarketRateItem {
  society: string;
  city: string;
  size: string;
  priceRange: string;
  trend: 'Rising' | 'Stable' | 'High Demand';
  avgReturn: string;
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

export interface CompanyInfo {
  name: string;
  tagline: string;
  urduTagline: string;
  subheading: string;
  trustStatement: string;
  experienceYears: string;
  completedProjects: string;
  happyClients: string;
  totalVolume: string;
  phone: string;
  whatsapp: string;
  whatsappDirect: string;
  email: string;
  address: string;
  urduAddress: string;
  workingHours: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  highlightedTitle: string;
  urduSubtitle: string;
  description: string;
  urgentNotice: string;
  bgImageUrl?: string;
}

export interface AboutContent {
  kicker: string;
  heading: string;
  mainParagraph: string;
  secondaryParagraph: string;
  experienceBadgeYears: string;
  experienceBadgeText: string;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface ConstructionRateItem {
  id: string;
  category: 'with_material' | 'labor_only';
  title: string;
  urduTitle: string;
  ratePerUnit: string;
  unit: string;
  rateNumeric?: number;
  description: string;
  specs: string[];
}

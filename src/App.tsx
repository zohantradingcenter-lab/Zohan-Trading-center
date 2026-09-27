import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBox } from './components/SearchBox';
import { AboutUs } from './components/AboutUs';
import { PropertiesSection } from './components/PropertiesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ConstructionCalculator } from './components/ConstructionCalculator';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ConsultationModal } from './components/ConsultationModal';

import { PROPERTIES, PROJECTS, COMPANY_INFO } from './data/mockData';
import { Property, Project, SearchFilterState } from './types';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [consultationTarget, setConsultationTarget] = useState<Property | Project | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultConsultationService, setDefaultConsultationService] = useState<string | undefined>();

  // Filter properties based on search box
  const handleSearch = (filters: SearchFilterState) => {
    let filtered = [...PROPERTIES];

    if (filters.purpose !== 'All') {
      filtered = filtered.filter((p) => p.purpose === filters.purpose);
    }

    if (filters.city !== 'All') {
      filtered = filtered.filter((p) => p.location.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    if (filters.bedrooms !== 'All') {
      const minBeds = parseInt(filters.bedrooms, 10);
      filtered = filtered.filter((p) => (p.features.bedrooms ?? 0) >= minBeds);
    }

    if (filters.minPrice !== 'All') {
      const minVal = parseInt(filters.minPrice, 10);
      filtered = filtered.filter((p) => p.price >= minVal);
    }

    if (filters.maxPrice !== 'All') {
      const maxVal = parseInt(filters.maxPrice, 10);
      filtered = filtered.filter((p) => p.price <= maxVal);
    }

    setProperties(filtered);

    // Smooth scroll down to properties section
    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) {
      propertiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetSearch = () => {
    setProperties(PROPERTIES);
  };

  const handleOpenConsultation = (service?: string) => {
    setConsultationTarget(null);
    setDefaultConsultationService(service);
    setIsConsultationOpen(true);
  };

  const handleScheduleViewing = (item: Property) => {
    setSelectedProperty(null);
    setConsultationTarget(item);
    setIsConsultationOpen(true);
  };

  const handleRequestBooking = (project: Project) => {
    setConsultationTarget(project);
    setIsConsultationOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-gold-500 selection:text-navy-950">
      {/* Sticky Responsive Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* Hero Section */}
      <Hero
        onExploreProperties={() => scrollToSection('properties')}
        onContactClick={() => scrollToSection('contact')}
      />

      {/* Property Search Section */}
      <SearchBox
        onSearch={handleSearch}
        onReset={handleResetSearch}
        resultCount={properties.length}
      />

      {/* About Us Section */}
      <AboutUs onLearnMoreServices={() => scrollToSection('services')} />

      {/* Featured Properties */}
      <PropertiesSection
        properties={properties}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onScheduleViewing={handleScheduleViewing}
      />

      {/* Signature Projects */}
      <ProjectsSection
        projects={PROJECTS}
        onRequestBooking={handleRequestBooking}
      />

      {/* Core Services */}
      <ServicesSection
        onSelectService={(serviceName) => handleOpenConsultation(serviceName)}
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Interactive Construction Cost Calculator */}
      <ConstructionCalculator />

      {/* Testimonials & FAQs */}
      <Testimonials />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleViewing={handleScheduleViewing}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        targetItem={consultationTarget}
        defaultService={defaultConsultationService}
      />

      {/* Floating WhatsApp Quick Action Button for Pakistani clients */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers%20Builders,%20I%20would%20like%20to%20discuss%20property%20or%20construction%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Inquiry"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center border-2 border-white/30 cursor-pointer group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}

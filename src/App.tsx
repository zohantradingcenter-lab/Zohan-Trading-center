import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBox } from './components/SearchBox';
import { SellBuyHub } from './components/SellBuyHub';
import { PropertiesSection } from './components/PropertiesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutUs } from './components/AboutUs';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ConstructionCalculator } from './components/ConstructionCalculator';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { SellPropertyModal } from './components/SellPropertyModal';
import { AdminPanel } from './components/AdminPanel';

import {
  PROPERTIES,
  PROJECTS,
  COMPANY_INFO,
  INITIAL_HERO_CONTENT,
  INITIAL_ABOUT_CONTENT,
  MARKET_RATES,
  FAQ_LIST,
  OFFICE_LOCATIONS,
  INITIAL_SELL_SUBMISSIONS,
  INITIAL_INQUIRIES,
  INITIAL_CONSTRUCTION_RATES,
} from './data/mockData';
import {
  Property,
  Project,
  SearchFilterState,
  SellPropertySubmission,
  InquiryLead,
  CompanyInfo,
  HeroContent,
  AboutContent,
  FAQItem,
  OfficeLocation,
  MarketRateItem,
  ConstructionRateItem,
} from './types';
import { MessageCircle, LayoutDashboard } from 'lucide-react';

export default function App() {
  // Navigation View: 'website' or 'admin'
  const [currentView, setCurrentView] = useState<'website' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      return 'admin';
    }
    return 'website';
  });

  // 1. Company Info State (with localStorage)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('kb_company_info');
      return saved ? JSON.parse(saved) : COMPANY_INFO;
    } catch {
      return COMPANY_INFO;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_company_info', JSON.stringify(companyInfo));
    } catch {
      // ignore
    }
  }, [companyInfo]);

  // 2. Hero Content State (with localStorage)
  const [heroContent, setHeroContent] = useState<HeroContent>(() => {
    try {
      const saved = localStorage.getItem('kb_hero_content');
      return saved ? JSON.parse(saved) : INITIAL_HERO_CONTENT;
    } catch {
      return INITIAL_HERO_CONTENT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_hero_content', JSON.stringify(heroContent));
    } catch {
      // ignore
    }
  }, [heroContent]);

  // 3. About Us Content State (with localStorage)
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => {
    try {
      const saved = localStorage.getItem('kb_about_content');
      return saved ? JSON.parse(saved) : INITIAL_ABOUT_CONTENT;
    } catch {
      return INITIAL_ABOUT_CONTENT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_about_content', JSON.stringify(aboutContent));
    } catch {
      // ignore
    }
  }, [aboutContent]);

  // 4. Properties State (with localStorage)
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('kb_properties_v2');
      return saved ? JSON.parse(saved) : PROPERTIES;
    } catch {
      return PROPERTIES;
    }
  });

  const [displayProperties, setDisplayProperties] = useState<Property[]>(properties);

  useEffect(() => {
    setDisplayProperties(properties);
    try {
      localStorage.setItem('kb_properties_v2', JSON.stringify(properties));
    } catch {
      // ignore
    }
  }, [properties]);

  // 5. Signature Projects State (with localStorage)
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('kb_projects');
      return saved ? JSON.parse(saved) : PROJECTS;
    } catch {
      return PROJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_projects', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  // 6. Market Rates State (with localStorage)
  const [marketRates, setMarketRates] = useState<MarketRateItem[]>(() => {
    try {
      const saved = localStorage.getItem('kb_market_rates');
      return saved ? JSON.parse(saved) : MARKET_RATES;
    } catch {
      return MARKET_RATES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_market_rates', JSON.stringify(marketRates));
    } catch {
      // ignore
    }
  }, [marketRates]);

  // 7. FAQs State (with localStorage)
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('kb_faqs');
      return saved ? JSON.parse(saved) : FAQ_LIST;
    } catch {
      return FAQ_LIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_faqs', JSON.stringify(faqs));
    } catch {
      // ignore
    }
  }, [faqs]);

  // 8. Office Locations State (with localStorage)
  const [officeLocations, setOfficeLocations] = useState<OfficeLocation[]>(() => {
    try {
      const saved = localStorage.getItem('kb_offices');
      return saved ? JSON.parse(saved) : OFFICE_LOCATIONS;
    } catch {
      return OFFICE_LOCATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_offices', JSON.stringify(officeLocations));
    } catch {
      // ignore
    }
  }, [officeLocations]);

  // 9. Sell Submissions State (with localStorage)
  const [sellSubmissions, setSellSubmissions] = useState<SellPropertySubmission[]>(() => {
    try {
      const saved = localStorage.getItem('kb_sell_submissions');
      return saved ? JSON.parse(saved) : INITIAL_SELL_SUBMISSIONS;
    } catch {
      return INITIAL_SELL_SUBMISSIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_sell_submissions', JSON.stringify(sellSubmissions));
    } catch {
      // ignore
    }
  }, [sellSubmissions]);

  // 10. Inquiries State (with localStorage)
  const [inquiries, setInquiries] = useState<InquiryLead[]>(() => {
    try {
      const saved = localStorage.getItem('kb_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_inquiries', JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  // 11. Construction & Labor Rates State (with localStorage)
  const [constructionRates, setConstructionRates] = useState<ConstructionRateItem[]>(() => {
    try {
      const saved = localStorage.getItem('kb_construction_rates');
      return saved ? JSON.parse(saved) : INITIAL_CONSTRUCTION_RATES;
    } catch {
      return INITIAL_CONSTRUCTION_RATES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kb_construction_rates', JSON.stringify(constructionRates));
    } catch {
      // ignore
    }
  }, [constructionRates]);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [consultationTarget, setConsultationTarget] = useState<Property | Project | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultConsultationService, setDefaultConsultationService] = useState<string | undefined>();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellModalAction, setSellModalAction] = useState<'Sell' | 'Direct Cash Buyout'>('Sell');

  // Search Filter Handler
  const handleSearch = (filters: SearchFilterState) => {
    let filtered = [...properties];

    if (filters.purpose !== 'All') {
      filtered = filtered.filter((p) => p.purpose === filters.purpose);
    }

    if (filters.city !== 'All') {
      filtered = filtered.filter((p) =>
        p.location.city.toLowerCase().includes(filters.city.toLowerCase()),
      );
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

    setDisplayProperties(filtered);

    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) {
      propertiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetSearch = () => {
    setDisplayProperties(properties);
  };

  const handleOpenConsultation = (service?: string) => {
    setConsultationTarget(null);
    setDefaultConsultationService(service);
    setIsConsultationOpen(true);
  };

  const handleOpenSellModal = (action: 'Sell' | 'Direct Cash Buyout' = 'Sell') => {
    setSellModalAction(action);
    setIsSellModalOpen(true);
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

  // Property CRUD
  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p)),
    );
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  // Project CRUD
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Market Rate CRUD
  const handleAddMarketRate = (item: MarketRateItem) => {
    setMarketRates((prev) => [item, ...prev]);
  };

  const handleUpdateMarketRate = (index: number, item: MarketRateItem) => {
    setMarketRates((prev) => {
      const copy = [...prev];
      copy[index] = item;
      return copy;
    });
  };

  const handleDeleteMarketRate = (index: number) => {
    setMarketRates((prev) => prev.filter((_, idx) => idx !== index));
  };

  // FAQ CRUD
  const handleAddFaq = (faq: FAQItem) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const handleUpdateFaq = (index: number, faq: FAQItem) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = faq;
      return copy;
    });
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Office Location Update
  const handleUpdateOfficeLocation = (index: number, location: OfficeLocation) => {
    setOfficeLocations((prev) => {
      const copy = [...prev];
      copy[index] = location;
      return copy;
    });
  };

  // Submission CRUD
  const handleSellSubmission = (submission: SellPropertySubmission) => {
    setSellSubmissions((prev) => [submission, ...prev]);
  };

  const handleUpdateSubmissionStatus = (
    id: string,
    status: SellPropertySubmission['status'],
  ) => {
    setSellSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );
  };

  const handleDeleteSubmission = (id: string) => {
    setSellSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  // Inquiry CRUD
  const handleInquirySubmission = (inquiry: InquiryLead) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleUpdateInquiryStatus = (
    id: string,
    status: InquiryLead['status'],
  ) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i)),
    );
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // Construction & Labor Rates CRUD
  const handleAddConstructionRate = (newRate: ConstructionRateItem) => {
    setConstructionRates((prev) => [newRate, ...prev]);
  };

  const handleUpdateConstructionRate = (id: string, updatedRate: ConstructionRateItem) => {
    setConstructionRates((prev) =>
      prev.map((r) => (r.id === id ? updatedRate : r)),
    );
  };

  const handleDeleteConstructionRate = (id: string) => {
    setConstructionRates((prev) => prev.filter((r) => r.id !== id));
  };

  // Reset to original demo data
  const handleResetDefaults = () => {
    if (window.confirm('Reset all website data to initial defaults?')) {
      localStorage.clear();
      setCompanyInfo(COMPANY_INFO);
      setHeroContent(INITIAL_HERO_CONTENT);
      setAboutContent(INITIAL_ABOUT_CONTENT);
      setProperties(PROPERTIES);
      setProjects(PROJECTS);
      setMarketRates(MARKET_RATES);
      setConstructionRates(INITIAL_CONSTRUCTION_RATES);
      setFaqs(FAQ_LIST);
      setOfficeLocations(OFFICE_LOCATIONS);
      setSellSubmissions(INITIAL_SELL_SUBMISSIONS);
      setInquiries(INITIAL_INQUIRIES);
      alert('All website data has been reset to defaults.');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Standalone Admin Panel View
  if (currentView === 'admin') {
    return (
      <AdminPanel
        properties={properties}
        onAddProperty={handleAddProperty}
        onUpdateProperty={handleUpdateProperty}
        onDeleteProperty={handleDeleteProperty}
        constructionRates={constructionRates}
        onAddConstructionRate={handleAddConstructionRate}
        onUpdateConstructionRate={handleUpdateConstructionRate}
        onDeleteConstructionRate={handleDeleteConstructionRate}
        projects={projects}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        marketRates={marketRates}
        onAddMarketRate={handleAddMarketRate}
        onUpdateMarketRate={handleUpdateMarketRate}
        onDeleteMarketRate={handleDeleteMarketRate}
        sellSubmissions={sellSubmissions}
        onUpdateSubmissionStatus={handleUpdateSubmissionStatus}
        onDeleteSubmission={handleDeleteSubmission}
        inquiries={inquiries}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        companyInfo={companyInfo}
        onUpdateCompanyInfo={setCompanyInfo}
        heroContent={heroContent}
        onUpdateHeroContent={setHeroContent}
        aboutContent={aboutContent}
        onUpdateAboutContent={setAboutContent}
        faqs={faqs}
        onAddFaq={handleAddFaq}
        onUpdateFaq={handleUpdateFaq}
        onDeleteFaq={handleDeleteFaq}
        officeLocations={officeLocations}
        onUpdateOfficeLocation={handleUpdateOfficeLocation}
        onResetDefaults={handleResetDefaults}
        onClose={() => {
          setCurrentView('website');
          if (window.location.hash === '#admin') {
            window.location.hash = '';
          }
        }}
      />
    );
  }

  // Public Client Website View
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-gold-500 selection:text-navy-950 relative">
      {/* Sticky Responsive Header with Sell Property Button & Admin Link */}
      <Header
        companyInfo={companyInfo}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenSellModal={() => handleOpenSellModal('Sell')}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Hero Section */}
      <Hero
        heroContent={heroContent}
        companyInfo={companyInfo}
        onExploreProperties={() => scrollToSection('properties')}
        onContactClick={() => scrollToSection('contact')}
        onOpenSellModal={() => handleOpenSellModal('Sell')}
      />

      {/* Property Search Section */}
      <SearchBox
        onSearch={handleSearch}
        onReset={handleResetSearch}
        resultCount={displayProperties.length}
        onOpenSellModal={() => handleOpenSellModal('Sell')}
      />

      {/* Flagship Real Estate Buy & Sell Hub + Live Market Rates */}
      <SellBuyHub
        marketRates={marketRates}
        companyInfo={companyInfo}
        onOpenSellModal={(action) => handleOpenSellModal(action || 'Sell')}
        onExploreProperties={() => scrollToSection('properties')}
      />

      {/* Featured Properties for Sale / Rent */}
      <PropertiesSection
        properties={displayProperties}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onScheduleViewing={handleScheduleViewing}
        onOpenSellModal={() => handleOpenSellModal('Sell')}
      />

      {/* Signature Projects */}
      <ProjectsSection
        projects={projects}
        onRequestBooking={handleRequestBooking}
      />

      {/* About Us Section */}
      <AboutUs
        aboutContent={aboutContent}
        companyInfo={companyInfo}
        onLearnMoreServices={() => scrollToSection('services')}
      />

      {/* Core Services */}
      <ServicesSection
        onSelectService={(serviceName) => handleOpenConsultation(serviceName)}
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Interactive Construction Cost Calculator */}
      <ConstructionCalculator
        constructionRates={constructionRates}
        companyInfo={companyInfo}
      />

      {/* Testimonials & FAQs */}
      <Testimonials faqs={faqs} />

      {/* Contact Section */}
      <ContactSection
        officeLocations={officeLocations}
        companyInfo={companyInfo}
        onSubmitInquiry={handleInquirySubmission}
      />

      {/* Footer with Admin Portal Link */}
      <Footer
        companyInfo={companyInfo}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleViewing={handleScheduleViewing}
      />

      {/* Schedule Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        targetItem={consultationTarget}
        defaultService={defaultConsultationService}
        onSubmit={handleInquirySubmission}
      />

      {/* Sell Your Property Submission Modal */}
      <SellPropertyModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        defaultAction={sellModalAction}
        onSubmit={handleSellSubmission}
      />

      {/* Floating Admin Portal Launcher Button (Bottom Left) */}
      <button
        onClick={() => setCurrentView('admin')}
        aria-label="Open Full Admin CMS"
        className="fixed bottom-6 left-6 z-40 bg-navy-950/95 hover:bg-navy-900 text-gold-400 border border-gold-500/50 p-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer group backdrop-blur-md"
      >
        <LayoutDashboard className="w-5 h-5 text-gold-400 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2 text-white">
          Admin CMS (مکمل ایڈمن پینل)
        </span>
      </button>

      {/* Floating WhatsApp Quick Action Button for Pakistani clients (Bottom Right) */}
      <a
        href={`https://wa.me/${companyInfo.whatsappDirect}?text=Hello%20Khan%20Brothers%20Builders,%20I%20would%20like%20to%20discuss%20property%20buying%20or%20selling.`}
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

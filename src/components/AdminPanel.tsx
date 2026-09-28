import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Tag,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Phone,
  MessageCircle,
  ExternalLink,
  Shield,
  CheckCircle,
  Clock,
  Zap,
  MapPin,
  Search,
  Filter,
  DollarSign,
  Maximize2,
  Calendar,
  X,
  Save,
  AlertCircle,
  HelpCircle,
  Building2,
  TrendingUp,
  RefreshCw,
  Download,
  FileText,
  ArrowLeft,
  Eye,
  Sliders,
  Sparkles,
  Hammer,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Property,
  Project,
  MarketRateItem,
  SellPropertySubmission,
  InquiryLead,
  CompanyInfo,
  HeroContent,
  AboutContent,
  FAQItem,
  OfficeLocation,
  ConstructionRateItem,
} from '../types';
import { logoImg } from '../data/mockData';

interface AdminPanelProps {
  // Properties CRUD
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onUpdateProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;

  // Construction Rates CRUD
  constructionRates: ConstructionRateItem[];
  onAddConstructionRate: (rate: ConstructionRateItem) => void;
  onUpdateConstructionRate: (id: string, rate: ConstructionRateItem) => void;
  onDeleteConstructionRate: (id: string) => void;

  // Projects CRUD
  projects: Project[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;

  // Market Rates CRUD
  marketRates: MarketRateItem[];
  onAddMarketRate: (item: MarketRateItem) => void;
  onUpdateMarketRate: (index: number, item: MarketRateItem) => void;
  onDeleteMarketRate: (index: number) => void;

  // Submissions & Leads
  sellSubmissions: SellPropertySubmission[];
  onUpdateSubmissionStatus: (id: string, status: SellPropertySubmission['status']) => void;
  onDeleteSubmission: (id: string) => void;

  inquiries: InquiryLead[];
  onUpdateInquiryStatus: (id: string, status: InquiryLead['status']) => void;
  onDeleteInquiry: (id: string) => void;

  // Content Customization
  companyInfo: CompanyInfo;
  onUpdateCompanyInfo: (info: CompanyInfo) => void;

  heroContent: HeroContent;
  onUpdateHeroContent: (content: HeroContent) => void;

  aboutContent: AboutContent;
  onUpdateAboutContent: (content: AboutContent) => void;

  faqs: FAQItem[];
  onAddFaq: (faq: FAQItem) => void;
  onUpdateFaq: (index: number, faq: FAQItem) => void;
  onDeleteFaq: (index: number) => void;

  officeLocations: OfficeLocation[];
  onUpdateOfficeLocation: (index: number, location: OfficeLocation) => void;

  onResetDefaults: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  constructionRates,
  onAddConstructionRate,
  onUpdateConstructionRate,
  onDeleteConstructionRate,
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  marketRates,
  onAddMarketRate,
  onUpdateMarketRate,
  onDeleteMarketRate,
  sellSubmissions,
  onUpdateSubmissionStatus,
  onDeleteSubmission,
  inquiries,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  companyInfo,
  onUpdateCompanyInfo,
  heroContent,
  onUpdateHeroContent,
  aboutContent,
  onUpdateAboutContent,
  faqs,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  officeLocations,
  onUpdateOfficeLocation,
  onResetDefaults,
  onClose,
}) => {
  type AdminTab =
    | 'overview'
    | 'company'
    | 'hero'
    | 'properties'
    | 'construction-rates'
    | 'projects'
    | 'market-rates'
    | 'submissions'
    | 'inquiries'
    | 'about'
    | 'faqs'
    | 'offices';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Local editable state for Company Info
  const [localCompany, setLocalCompany] = useState<CompanyInfo>(companyInfo);
  // Local editable state for Hero Content
  const [localHero, setLocalHero] = useState<HeroContent>(heroContent);
  // Local editable state for About Content
  const [localAbout, setLocalAbout] = useState<AboutContent>(aboutContent);

  // Property Filters & Search
  const [propSearch, setPropSearch] = useState('');
  const [propTypeFilter, setPropTypeFilter] = useState<string>('All');

  // Property Modal State
  const [isPropModalOpen, setIsPropModalOpen] = useState(false);
  const [editingPropId, setEditingPropId] = useState<string | null>(null);
  const [propForm, setPropForm] = useState<Partial<Property>>({
    title: '',
    type: 'Plot',
    purpose: 'Buy',
    price: 35000000,
    priceFormatted: 'Rs 3.5 Crore',
    installmentAvailable: false,
    urgentDeal: false,
    directOwner: true,
    location: {
      sector: 'Nishtar Colony / Ferozepur Road',
      city: 'Lahore',
      area: 'Lahore South',
    },
    features: {
      areaSize: '10 Marla',
      bedrooms: 4,
      bathrooms: 4,
      parkingSpaces: 2,
    },
    image: properties[0]?.image || '',
    badges: ['Direct Owner', 'Ready for Possession'],
    status: 'Ready for Possession',
    description: 'Prime located property with direct transfer. All utilities available.',
    amenities: ['Sui Gas Available', 'Underground Electricity', 'Main Road Access'],
    developerApproved: 'LDA Approved',
  });

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    name: '',
    category: 'Commercial',
    location: 'Ferozepur Road, Lahore',
    city: 'Lahore',
    progressPercent: 65,
    completionDate: 'December 2027',
    status: 'Under Construction',
    startingPrice: 'Rs 95 Lakhs',
    image: projects[0]?.image || '',
    description: 'Luxury high-rise development offering commercial shops and corporate executive suites.',
    highlights: ['100% LDA Approved', 'Prime Road Frontage', 'Express Lifts'],
    unitsAvailable: 'Shops & Offices',
  });

  // Market Rate Modal State
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [editingRateIndex, setEditingRateIndex] = useState<number | null>(null);
  const [rateForm, setRateForm] = useState<MarketRateItem>({
    society: 'Ferozepur Road / Nishtar Colony',
    city: 'Lahore',
    size: '10 Marla Residential Plot',
    priceRange: 'Rs 1.10 Cr - 1.65 Cr',
    trend: 'Rising',
    avgReturn: '15% p.a.',
  });

  // FAQ Modal State
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<FAQItem>({
    question: '',
    answer: '',
  });

  // Construction Rates Filter & Modal State
  const [constRateFilter, setConstRateFilter] = useState<'all' | 'with_material' | 'labor_only'>('all');
  const [isConstRateModalOpen, setIsConstRateModalOpen] = useState(false);
  const [editingConstRateId, setEditingConstRateId] = useState<string | null>(null);
  const [constRateForm, setConstRateForm] = useState<Partial<ConstructionRateItem>>({
    category: 'with_material',
    title: '',
    urduTitle: '',
    ratePerUnit: 'Rs 3,100 / sq ft',
    unit: 'Per Sq Ft',
    description: '',
    specs: [],
  });
  const [specsInputString, setSpecsInputString] = useState('');

  // Image Upload handler for Property modal (compresses to max 1200px)
  const handlePropertyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setPropForm((prev) => ({ ...prev, image: dataUrl }));
        showToast('Property photo uploaded successfully!');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Image Upload handler for Project modal
  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setProjectForm((prev) => ({ ...prev, image: dataUrl }));
        showToast('Project photo uploaded successfully!');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleOpenAddConstRate = () => {
    setEditingConstRateId(null);
    setConstRateForm({
      category: 'with_material',
      title: '',
      urduTitle: '',
      ratePerUnit: 'Rs 3,200 / sq ft',
      unit: 'Per Sq Ft',
      description: '',
      specs: ['Mughal 60-Grade Steel', 'Bestway Cement'],
    });
    setSpecsInputString('Mughal 60-Grade Steel, Bestway Cement');
    setIsConstRateModalOpen(true);
  };

  const handleOpenEditConstRate = (rate: ConstructionRateItem) => {
    setEditingConstRateId(rate.id);
    setConstRateForm({ ...rate });
    setSpecsInputString(rate.specs ? rate.specs.join(', ') : '');
    setIsConstRateModalOpen(true);
  };

  const handleSaveConstRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!constRateForm.title || !constRateForm.ratePerUnit) return;

    const specsArray = specsInputString
      ? specsInputString.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    if (editingConstRateId) {
      onUpdateConstructionRate(editingConstRateId, {
        ...(constRateForm as ConstructionRateItem),
        id: editingConstRateId,
        specs: specsArray,
      });
      showToast('Construction rate updated successfully!');
    } else {
      const newRate: ConstructionRateItem = {
        ...(constRateForm as ConstructionRateItem),
        id: 'rate-' + Date.now(),
        specs: specsArray,
      };
      onAddConstructionRate(newRate);
      showToast('New construction rate added!');
    }
    setIsConstRateModalOpen(false);
  };

  // Financial calculations
  const totalInventoryPKR = properties.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalInventoryCrore = (totalInventoryPKR / 10000000).toFixed(1);
  const urgentCount = properties.filter((p) => p.urgentDeal).length;
  const newSubmissionsCount = sellSubmissions.filter((s) => s.status === 'New').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  // Filter properties
  const filteredProps = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(propSearch.toLowerCase()) ||
      p.location.sector.toLowerCase().includes(propSearch.toLowerCase()) ||
      p.location.city.toLowerCase().includes(propSearch.toLowerCase());
    const matchesType = propTypeFilter === 'All' || p.type === propTypeFilter;
    return matchesSearch && matchesType;
  });

  // Handlers for Company Info
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompanyInfo(localCompany);
    showToast('Company information successfully saved and updated on website!');
  };

  // Handlers for Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHeroContent(localHero);
    showToast('Hero section text & banners successfully updated on website!');
  };

  // Handlers for About
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAboutContent(localAbout);
    showToast('About Us text & trust statistics updated on website!');
  };

  // Handlers for Properties
  const handleOpenAddProp = () => {
    setEditingPropId(null);
    setPropForm({
      title: '',
      type: 'Plot',
      purpose: 'Buy',
      price: 25000000,
      priceFormatted: 'Rs 2.5 Crore',
      installmentAvailable: false,
      urgentDeal: false,
      directOwner: true,
      location: {
        sector: 'Ferozepur Road / Nishtar Colony',
        city: 'Lahore',
        area: 'Lahore',
      },
      features: {
        areaSize: '10 Marla',
        bedrooms: 0,
        bathrooms: 0,
        parkingSpaces: 0,
      },
      image: properties[0]?.image || '',
      badges: ['Newly Added', 'Direct Owner'],
      status: 'Ready for Possession',
      description: 'Excellent property situated in prime location with clean title and verified registry.',
      amenities: ['Electricity', 'Sui Gas', 'Paved Road', '24/7 Security'],
      developerApproved: 'LDA Approved',
    });
    setIsPropModalOpen(true);
  };

  const handleOpenEditProp = (prop: Property) => {
    setEditingPropId(prop.id);
    setPropForm({ ...prop });
    setIsPropModalOpen(true);
  };

  const handleSaveProp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propForm.title || !propForm.priceFormatted) return;

    if (editingPropId) {
      onUpdateProperty({
        ...(propForm as Property),
        id: editingPropId,
        image: propForm.image || properties[0]?.image,
        gallery: propForm.image ? [propForm.image, ...(propForm.gallery?.slice(1) || [])] : propForm.gallery,
      });
      showToast('Property updated successfully!');
    } else {
      const newP: Property = {
        ...(propForm as Property),
        id: 'prop-custom-' + Date.now(),
        image: propForm.image || properties[0]?.image,
        gallery: [propForm.image || properties[0]?.image],
      };
      onAddProperty(newP);
      showToast('New property successfully added to inventory!');
    }
    setIsPropModalOpen(false);
  };

  // Handlers for Projects
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      name: '',
      category: 'Residential',
      location: 'Ferozepur Road, Lahore',
      city: 'Lahore',
      progressPercent: 50,
      completionDate: '2027',
      status: 'Under Construction',
      startingPrice: 'Rs 1.2 Crore',
      image: projects[0]?.image || '',
      description: 'Ultra-modern landmark development by Khan Brothers & Builders.',
      highlights: ['LDA Approved', 'Prime Location', 'Flexible Installments'],
      unitsAvailable: 'Apartments & Penthouses',
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({ ...proj });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.startingPrice) return;

    if (editingProjectId) {
      onUpdateProject({
        ...(projectForm as Project),
        id: editingProjectId,
      });
      showToast('Project updated successfully!');
    } else {
      const newProj: Project = {
        ...(projectForm as Project),
        id: 'proj-custom-' + Date.now(),
        image: projectForm.image || projects[0]?.image,
        highlights: projectForm.highlights || ['100% Approved'],
      };
      onAddProject(newProj);
      showToast('New project successfully launched!');
    }
    setIsProjectModalOpen(false);
  };

  // Handlers for Market Rates
  const handleOpenAddRate = () => {
    setEditingRateIndex(null);
    setRateForm({
      society: 'Nishtar Colony / Ferozepur Road',
      city: 'Lahore',
      size: '10 Marla Residential Plot',
      priceRange: 'Rs 1.20 Cr - 1.80 Cr',
      trend: 'Rising',
      avgReturn: '14% p.a.',
    });
    setIsRateModalOpen(true);
  };

  const handleOpenEditRate = (index: number) => {
    setEditingRateIndex(index);
    setRateForm({ ...marketRates[index] });
    setIsRateModalOpen(true);
  };

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rateForm.society || !rateForm.priceRange) return;

    if (editingRateIndex !== null) {
      onUpdateMarketRate(editingRateIndex, rateForm);
      showToast('Market rate updated!');
    } else {
      onAddMarketRate(rateForm);
      showToast('New society market rate added!');
    }
    setIsRateModalOpen(false);
  };

  // Handlers for FAQs
  const handleOpenAddFaq = () => {
    setEditingFaqIndex(null);
    setFaqForm({ question: '', answer: '' });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (index: number) => {
    setEditingFaqIndex(index);
    setFaqForm({ ...faqs[index] });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    if (editingFaqIndex !== null) {
      onUpdateFaq(editingFaqIndex, faqForm);
      showToast('FAQ updated!');
    } else {
      onAddFaq(faqForm);
      showToast('New FAQ added!');
    }
    setIsFaqModalOpen(false);
  };

  const exportAllData = () => {
    const data = {
      companyInfo,
      heroContent,
      aboutContent,
      properties,
      projects,
      marketRates,
      sellSubmissions,
      inquiries,
      faqs,
      officeLocations,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khan_brothers_cms_backup_${Date.now()}.json`;
    a.click();
    showToast('Complete data exported to JSON backup file!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 border border-emerald-400">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-navy-950 border-b border-gold-500/30 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold-400/50 shadow-md bg-navy-900 shrink-0">
            <img src={logoImg} alt="Khan Brothers Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white">
                Khan Brothers & Builders
              </span>
              <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 border border-gold-500/40 text-[10px] font-bold uppercase tracking-wider">
                Full CMS Admin Panel
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Head Office: {companyInfo.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportAllData}
            className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-navy-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer transition-all"
            title="Download full JSON backup of website data"
          >
            <Download className="w-3.5 h-3.5 text-gold-400" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Live Website (ویب سائٹ دیکھیں)</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Navigation Sidebar */}
        <nav className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1.5 p-2 bg-navy-900/90 rounded-2xl border border-slate-800 self-start overflow-x-auto md:overflow-visible">
          <div className="hidden md:block px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
            Navigation Menu
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'company'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4" />
              <span>Company & Contact Info</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hero'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4" />
              <span>Hero & Banners</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'properties'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4" />
              <span>Properties (خرید و فروخت)</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'properties' ? 'bg-navy-950 text-gold-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {properties.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('construction-rates')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'construction-rates'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Hammer className="w-4 h-4" />
              <span>Construction & Labor Rates (ریٹس)</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'construction-rates' ? 'bg-navy-950 text-gold-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {constructionRates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4" />
              <span>Signature Projects</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'projects' ? 'bg-navy-950 text-gold-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('market-rates')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'market-rates'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4" />
              <span>Live Market Rates</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'market-rates' ? 'bg-navy-950 text-gold-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {marketRates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4" />
              <span>Property Sell Requests</span>
            </div>
            {newSubmissionsCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-navy-950 font-bold animate-pulse">
                {newSubmissionsCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Buyer Inquiries & Leads</span>
            </div>
            {newInquiriesCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-navy-950 font-bold">
                {newInquiriesCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4" />
              <span>About Us & Trust Stats</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'faqs'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>FAQs Manager</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'faqs' ? 'bg-navy-950 text-gold-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {faqs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('offices')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'offices'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4" />
              <span>Branch Offices</span>
            </div>
          </button>
        </nav>

        {/* Content Panel Area */}
        <main className="flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/60 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Administrator Command Center
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Complete management of properties, sell requests, customer leads, pricing, and company contact details.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleOpenAddProp}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Property</span>
                  </button>
                </div>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Total Listed Properties</span>
                    <Home className="w-4 h-4 text-gold-400" />
                  </div>
                  <div className="font-serif text-3xl font-extrabold text-white">
                    {properties.length}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Houses, Plots & Commercial
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Total Inventory Value</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-serif text-3xl font-extrabold text-emerald-400">
                    Rs {totalInventoryCrore} Cr
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Accumulated market pricing
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Property Sell Requests</span>
                    <Tag className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-serif text-3xl font-extrabold text-amber-400">
                    {sellSubmissions.length}
                  </div>
                  <span className="text-[11px] text-amber-300 mt-1 block">
                    {newSubmissionsCount} pending follow-up
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Customer Inquiries</span>
                    <Users className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="font-serif text-3xl font-extrabold text-sky-400">
                    {inquiries.length}
                  </div>
                  <span className="text-[11px] text-sky-300 mt-1 block">
                    {newInquiriesCount} new leads
                  </span>
                </div>
              </div>

              {/* Quick Shortcuts Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span>Latest Property Sell Requests</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className="text-xs text-gold-400 hover:underline cursor-pointer"
                    >
                      View All ({sellSubmissions.length})
                    </button>
                  </div>
                  {sellSubmissions.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No submissions received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {sellSubmissions.slice(0, 3).map((sub) => (
                        <div key={sub.id} className="p-3 bg-navy-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{sub.ownerName}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                                {sub.propertyType} ({sub.size})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {sub.society}, {sub.city} · Demand: <strong className="text-gold-400">{sub.demandPrice}</strong>
                            </div>
                          </div>
                          <a
                            href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(sub.ownerName)},%20I%20am%20contacting%20you%20from%20Khan%20Brothers%20Builders%20regarding%20your%20property%20listing.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold transition-all"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-sky-400" />
                      <span>Recent Client Inquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-gold-400 hover:underline cursor-pointer"
                    >
                      View All ({inquiries.length})
                    </button>
                  </div>
                  {inquiries.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No inquiries received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div key={inq.id} className="p-3 bg-navy-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{inq.name}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                                {inq.city}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              {inq.service}
                            </div>
                          </div>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Khan%20Brothers%20Builders.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold transition-all"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY & CONTACT INFO */}
          {activeTab === 'company' && (
            <div className="bg-navy-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gold-400" />
                  <span>Company Profile & Contact Settings</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Edit company name, phone, WhatsApp number, and Lahore head office address. All changes immediately reflect across header, footer, contact sections, and floating buttons.
                </p>
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={localCompany.name}
                      onChange={(e) => setLocalCompany({ ...localCompany, name: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      value={localCompany.email}
                      onChange={(e) => setLocalCompany({ ...localCompany, email: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (فون نمبر)
                    </label>
                    <input
                      type="text"
                      value={localCompany.phone}
                      onChange={(e) => setLocalCompany({ ...localCompany, phone: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp Number (واٹس ایپ نمبر)
                    </label>
                    <input
                      type="text"
                      value={localCompany.whatsapp}
                      onChange={(e) => {
                        const val = e.target.value;
                        const digits = val.replace(/[^0-9]/g, '');
                        setLocalCompany({ ...localCompany, whatsapp: val, whatsappDirect: digits });
                      }}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Direct WhatsApp digits: {localCompany.whatsappDirect}
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Head Office Address (لاہور ہیڈ آفس کا مکمل پتہ)
                    </label>
                    <input
                      type="text"
                      value={localCompany.address}
                      onChange={(e) => setLocalCompany({ ...localCompany, address: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Urdu Address (اردو میں پتہ)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={localCompany.urduAddress}
                      onChange={(e) => setLocalCompany({ ...localCompany, urduAddress: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Working Hours (دفتری اوقات)</label>
                    <input
                      type="text"
                      value={localCompany.workingHours}
                      onChange={(e) => setLocalCompany({ ...localCompany, workingHours: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={localCompany.tagline}
                      onChange={(e) => setLocalCompany({ ...localCompany, tagline: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Company Information (محفوظ کریں)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: HERO & BANNERS */}
          {activeTab === 'hero' && (
            <div className="bg-navy-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span>Hero Section & Homepage Banners</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Customize the main headline, highlighted slogans, Urdu subtitles, and urgent deal notices shown at the very top of the website.
                </p>
              </div>

              <form onSubmit={handleSaveHero} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Top Badge Text</label>
                  <input
                    type="text"
                    value={localHero.badge}
                    onChange={(e) => setLocalHero({ ...localHero, badge: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Headline</label>
                    <input
                      type="text"
                      value={localHero.title}
                      onChange={(e) => setLocalHero({ ...localHero, title: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Highlighted Title (Gold Gradient)</label>
                    <input
                      type="text"
                      value={localHero.highlightedTitle}
                      onChange={(e) => setLocalHero({ ...localHero, highlightedTitle: e.target.value })}
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-gold-400 focus:border-gold-400 focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urdu Subtitle (اردو سطر)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={localHero.urduSubtitle}
                    onChange={(e) => setLocalHero({ ...localHero, urduSubtitle: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-gold-300 focus:border-gold-400 focus:outline-none font-serif text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={localHero.description}
                    onChange={(e) => setLocalHero({ ...localHero, description: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urgent Cash Notice Pill</label>
                  <input
                    type="text"
                    value={localHero.urgentNotice}
                    onChange={(e) => setLocalHero({ ...localHero, urgentNotice: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Banners (محفوظ کریں)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <Home className="w-5 h-5 text-gold-400" />
                    <span>Property Inventory Manager</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Add new properties, edit existing listings, toggle Urgent Deals or Direct Owner status, and update prices.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProp}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Property (نئی پراپرٹی)</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, sector, or city (e.g. DHA, Nishtar Colony, 10 Marla)..."
                    value={propSearch}
                    onChange={(e) => setPropSearch(e.target.value)}
                    className="w-full bg-navy-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {['All', 'Plot', 'House', 'Villa', 'Commercial', 'Apartment'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        propTypeFilter === type
                          ? 'bg-gold-500 text-navy-950'
                          : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProps.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-navy-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg hover:border-gold-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden bg-slate-800">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 rounded bg-navy-950/90 text-gold-400 text-[10px] font-bold uppercase">
                            {prop.type} · {prop.features.areaSize}
                          </span>
                          {prop.urgentDeal && (
                            <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold uppercase">
                              Urgent Deal
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-navy-950/90 backdrop-blur-md text-emerald-400 font-serif font-extrabold text-xs">
                          {prop.priceFormatted}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-serif font-bold text-white text-sm line-clamp-1">
                          {prop.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span className="line-clamp-1">{prop.location.sector}, {prop.location.city}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {prop.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-navy-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500">ID: {prop.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditProp(prop)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 transition-colors cursor-pointer"
                          title="Edit Property"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                              onDeleteProperty(prop.id);
                              showToast('Property deleted.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer"
                          title="Delete Property"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONSTRUCTION & LABOR RATES */}
          {activeTab === 'construction-rates' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <Hammer className="w-5 h-5 text-gold-400" />
                    <span>Construction & Labor Rate List Manager (تعمیراتی اور لیبر ریٹس)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage With-Material turnkey packages (Grey structure, Finishing) and Labor-Only rates (چنائی, پلستر, سریا, وائرنگ, پلمبنگ) displayed on the live website.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddConstRate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Rate (نیا ریٹ شامل کریں)</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConstRateFilter('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    constRateFilter === 'all'
                      ? 'bg-gold-500 text-navy-950'
                      : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Rates ({constructionRates.length})
                </button>
                <button
                  type="button"
                  onClick={() => setConstRateFilter('with_material')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    constRateFilter === 'with_material'
                      ? 'bg-gold-500 text-navy-950'
                      : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  With Material Rates (ود میٹریل)
                </button>
                <button
                  type="button"
                  onClick={() => setConstRateFilter('labor_only')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    constRateFilter === 'labor_only'
                      ? 'bg-gold-500 text-navy-950'
                      : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Labor Only Rates (صرف لیبر ریٹس)
                </button>
              </div>

              {/* Rates Table */}
              <div className="bg-navy-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Category</th>
                        <th className="py-3.5 px-4 font-bold">Title (English & Urdu)</th>
                        <th className="py-3.5 px-4 font-bold">Rate (PKR)</th>
                        <th className="py-3.5 px-4 font-bold">Unit</th>
                        <th className="py-3.5 px-4 font-bold">Specifications / Description</th>
                        <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {constructionRates
                        .filter((r) => constRateFilter === 'all' || r.category === constRateFilter)
                        .map((rate) => (
                          <tr key={rate.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                rate.category === 'with_material'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}>
                                {rate.category === 'with_material' ? 'With Material' : 'Labor Only'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-white text-sm block">{rate.title}</span>
                              {rate.urduTitle && (
                                <span className="text-gold-300 font-serif text-xs block mt-0.5">{rate.urduTitle}</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-extrabold text-gold-400 text-sm font-mono whitespace-nowrap">
                              {rate.ratePerUnit}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 font-medium whitespace-nowrap">
                              {rate.unit}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                              <p className="line-clamp-2 text-[11px] text-slate-400">{rate.description}</p>
                              {rate.specs && rate.specs.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {rate.specs.slice(0, 3).map((s, i) => (
                                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-navy-950 text-slate-400 border border-slate-800">
                                      {s}
                                    </span>
                                  ))}
                                  {rate.specs.length > 3 && (
                                    <span className="text-[10px] text-slate-500">+{rate.specs.length - 3} more</span>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEditConstRate(rate)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 transition-colors mr-1.5 cursor-pointer"
                                title="Edit Rate"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete rate "${rate.title}"?`)) {
                                    onDeleteConstructionRate(rate.id);
                                    showToast('Rate deleted.');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer"
                                title="Delete Rate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gold-400" />
                    <span>Signature Projects Manager</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage development projects, construction progress percentages, starting prices, and completion dates.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProject}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Project (نیا پروجیکٹ)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-navy-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                            {proj.category} · {proj.city}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-white mt-1">
                            {proj.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{proj.location}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-bold">
                          {proj.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Construction Progress</span>
                          <span className="font-bold text-gold-400">{proj.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-gold-400 h-full rounded-full" style={{ width: `${proj.progressPercent}%` }} />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Starting From</span>
                          <span className="font-bold text-emerald-400">{proj.startingPrice}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Target Handover</span>
                          <span className="font-medium text-slate-300">{proj.completionDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditProject(proj)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.name}"?`)) {
                            onDeleteProject(proj.id);
                            showToast('Project removed.');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MARKET RATES */}
          {activeTab === 'market-rates' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gold-400" />
                    <span>Live Market Rates Manager</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Display accurate PKR price ranges and annual capital appreciation trends for top societies like DHA Lahore, Bahria Town, and Ferozepur Road.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddRate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Society Rate (نیا ریٹ)</span>
                </button>
              </div>

              <div className="bg-navy-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-navy-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Society / Sector</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Property Size</th>
                      <th className="py-3 px-4">Price Range (PKR)</th>
                      <th className="py-3 px-4">Trend</th>
                      <th className="py-3 px-4">Avg Return</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {marketRates.map((rate, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-bold text-white">{rate.society}</td>
                        <td className="py-3 px-4 text-slate-300">{rate.city}</td>
                        <td className="py-3 px-4 text-slate-300">{rate.size}</td>
                        <td className="py-3 px-4 font-extrabold text-gold-400">{rate.priceRange}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rate.trend === 'Rising' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {rate.trend}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-emerald-300 font-mono">{rate.avgReturn}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleOpenEditRate(idx)}
                            className="p-1 text-slate-400 hover:text-gold-400 mr-2"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete rate for "${rate.society}"?`)) {
                                onDeleteMarketRate(idx);
                                showToast('Market rate deleted.');
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-rose-500"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: PROPERTY SELL REQUESTS */}
          {activeTab === 'submissions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-400" />
                  <span>Property Sell & Cash Buyout Requests (فروخت کی موصولہ درخواستیں)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  These properties were submitted directly by clients wishing to sell or get instant cash buyouts. Click WhatsApp to instantly chat with the owner.
                </p>
              </div>

              {sellSubmissions.length === 0 ? (
                <div className="bg-navy-900 rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
                  <Tag className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm">No property sell requests submitted yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sellSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-navy-900 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-base">{sub.ownerName}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            sub.purpose === 'Direct Cash Buyout' ? 'bg-amber-500 text-navy-950' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}>
                            {sub.purpose}
                          </span>
                          {sub.isUrgent && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-600 text-white font-bold animate-pulse">
                              ⚡ URGENT
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 pt-1">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Property Type</span>
                            <strong>{sub.propertyType} ({sub.size})</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Location</span>
                            <strong>{sub.society}, {sub.city}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Demand Price</span>
                            <strong className="text-gold-400">{sub.demandPrice}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Contact Phone</span>
                            <strong>{sub.phone}</strong>
                          </div>
                        </div>

                        {sub.notes && (
                          <p className="text-xs text-slate-400 bg-navy-950 p-2.5 rounded-lg border border-slate-800">
                            <strong>Note:</strong> {sub.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex md:flex-col items-end justify-between gap-3 shrink-0">
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-slate-400">Status:</label>
                          <select
                            value={sub.status}
                            onChange={(e) => onUpdateSubmissionStatus(sub.id, e.target.value as any)}
                            className="bg-navy-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-gold-300 font-bold focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Deal Closed">Deal Closed</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(sub.ownerName)},%20I%20am%20calling%20from%20Khan%20Brothers%20Builders%20regarding%20your%20property%20listing%20in%20${encodeURIComponent(sub.society)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${sub.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <button
                            onClick={() => {
                              if (window.confirm('Delete this submission?')) {
                                onDeleteSubmission(sub.id);
                                showToast('Submission removed.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: BUYER INQUIRIES & LEADS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-400" />
                  <span>Buyer Inquiries & Consultation Leads</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Customer requests received from property viewings, consultation dialogs, and general contact inquiries.
                </p>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-navy-900 rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
                  <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm">No client inquiries received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-navy-900 rounded-2xl border border-slate-800 p-5 shadow-lg flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">{inq.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                            {inq.city}
                          </span>
                          {inq.targetPropertyTitle && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-medium">
                              {inq.targetPropertyTitle}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Service Requested</span>
                            <strong>{inq.service}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Phone Number</span>
                            <strong>{inq.phone}</strong>
                          </div>
                          {inq.preferredDate && (
                            <div>
                              <span className="text-slate-500 block text-[10px]">Preferred Date / Slot</span>
                              <strong>{inq.preferredDate} ({inq.timeSlot})</strong>
                            </div>
                          )}
                        </div>

                        {inq.message && (
                          <p className="text-xs text-slate-400 bg-navy-950 p-2.5 rounded-lg border border-slate-800">
                            {inq.message}
                          </p>
                        )}
                      </div>

                      <div className="flex md:flex-col items-end justify-between gap-3 shrink-0">
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-slate-400">Status:</label>
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-navy-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-gold-300 font-bold focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Visit Scheduled">Visit Scheduled</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(inq.name)},%20I%20am%20contacting%20you%20from%20Khan%20Brothers%20Builders.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${inq.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <button
                            onClick={() => {
                              if (window.confirm('Delete this inquiry?')) {
                                onDeleteInquiry(inq.id);
                                showToast('Inquiry removed.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: ABOUT US & TRUST METRICS */}
          {activeTab === 'about' && (
            <div className="bg-navy-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-400" />
                  <span>About Us Content & Trust Statistics</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Edit company narrative paragraphs and the 4 primary track-record counters shown to clients.
                </p>
              </div>

              <form onSubmit={handleSaveAbout} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kicker Badge</label>
                  <input
                    type="text"
                    value={localAbout.kicker}
                    onChange={(e) => setLocalAbout({ ...localAbout, kicker: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Heading</label>
                  <input
                    type="text"
                    value={localAbout.heading}
                    onChange={(e) => setLocalAbout({ ...localAbout, heading: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Paragraph</label>
                  <textarea
                    rows={3}
                    value={localAbout.mainParagraph}
                    onChange={(e) => setLocalAbout({ ...localAbout, mainParagraph: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary Paragraph</label>
                  <textarea
                    rows={3}
                    value={localAbout.secondaryParagraph}
                    onChange={(e) => setLocalAbout({ ...localAbout, secondaryParagraph: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                {/* 4 Stats Counters */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="font-bold text-white text-sm mb-3">Live Trust Counters</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Years in Industry</label>
                      <input
                        type="text"
                        value={localCompany.experienceYears}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalCompany({ ...localCompany, experienceYears: val });
                          onUpdateCompanyInfo({ ...localCompany, experienceYears: val });
                        }}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Delivered Projects</label>
                      <input
                        type="text"
                        value={localCompany.completedProjects}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalCompany({ ...localCompany, completedProjects: val });
                          onUpdateCompanyInfo({ ...localCompany, completedProjects: val });
                        }}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Satisfied Families</label>
                      <input
                        type="text"
                        value={localCompany.happyClients}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalCompany({ ...localCompany, happyClients: val });
                          onUpdateCompanyInfo({ ...localCompany, happyClients: val });
                        }}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Transacted Volume</label>
                      <input
                        type="text"
                        value={localCompany.totalVolume}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalCompany({ ...localCompany, totalVolume: val });
                          onUpdateCompanyInfo({ ...localCompany, totalVolume: val });
                        }}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Us & Stats (محفوظ کریں)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 10: FAQS MANAGER */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-gold-400" />
                    <span>Frequently Asked Questions (اکثر پوچھے گئے سوالات)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, edit, or remove questions and answers displayed in the public FAQ accordion.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddFaq}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New FAQ (نیا سوال)</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-navy-900 rounded-xl border border-slate-800 p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h4 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                        <span className="text-gold-400">Q{idx + 1}:</span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEditFaq(idx)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 transition-colors"
                        title="Edit FAQ"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this FAQ?')) {
                            onDeleteFaq(idx);
                            showToast('FAQ deleted.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: BRANCH OFFICES */}
          {activeTab === 'offices' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-navy-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-400" />
                  <span>Corporate Office Network</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage contact details for Lahore Head Office (Nishtar Colony / Ferozepur Road), Islamabad, and Karachi offices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {officeLocations.map((office, idx) => (
                  <div key={idx} className="bg-navy-900 rounded-2xl border border-slate-800 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">{office.city} Office</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Active</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">{office.name}</h4>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-gold-400 inline mr-1" />
                        {office.address}
                      </p>
                      <p>
                        <Phone className="w-3.5 h-3.5 text-gold-400 inline mr-1" />
                        {office.phone}
                      </p>
                      <p>
                        <Clock className="w-3.5 h-3.5 text-gold-400 inline mr-1" />
                        {office.hours}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => {
                          const newAddr = window.prompt(`Edit address for ${office.city} office:`, office.address);
                          if (newAddr) {
                            onUpdateOfficeLocation(idx, { ...office, address: newAddr });
                            showToast(`${office.city} office address updated!`);
                          }
                        }}
                        className="text-xs text-gold-400 hover:underline font-bold"
                      >
                        Edit Office Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT PROPERTY */}
      {isPropModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 text-white rounded-2xl border border-gold-500/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingPropId ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button onClick={() => setIsPropModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProp} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Property Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Marla Brand New Spanish Villa"
                  value={propForm.title || ''}
                  onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Property Type</label>
                  <select
                    value={propForm.type}
                    onChange={(e) => setPropForm({ ...propForm, type: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Plot">Plot (پلاٹ)</option>
                    <option value="House">House (گھر)</option>
                    <option value="Villa">Villa (ولا)</option>
                    <option value="Commercial">Commercial (کمرشل)</option>
                    <option value="Apartment">Apartment (فلیٹ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Purpose</label>
                  <select
                    value={propForm.purpose}
                    onChange={(e) => setPropForm({ ...propForm, purpose: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Buy">For Sale / Buy (فروخت)</option>
                    <option value="Rent">For Rent (کرایہ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Formatted Price</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rs 3.5 Crore"
                    value={propForm.priceFormatted || ''}
                    onChange={(e) => setPropForm({ ...propForm, priceFormatted: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-gold-400 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">City</label>
                  <select
                    value={propForm.location?.city}
                    onChange={(e) =>
                      setPropForm({
                        ...propForm,
                        location: { ...propForm.location!, city: e.target.value },
                      })
                    }
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Karachi">Karachi</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Society / Sector / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Ferozepur Road / Nishtar Colony"
                    value={propForm.location?.sector || ''}
                    onChange={(e) =>
                      setPropForm({
                        ...propForm,
                        location: { ...propForm.location!, sector: e.target.value },
                      })
                    }
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Area Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Marla / 1 Kanal"
                    value={propForm.features?.areaSize || ''}
                    onChange={(e) =>
                      setPropForm({
                        ...propForm,
                        features: { ...propForm.features!, areaSize: e.target.value },
                      })
                    }
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={propForm.features?.bedrooms ?? 0}
                    onChange={(e) =>
                      setPropForm({
                        ...propForm,
                        features: { ...propForm.features!, bedrooms: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={propForm.features?.bathrooms ?? 0}
                    onChange={(e) =>
                      setPropForm({
                        ...propForm,
                        features: { ...propForm.features!, bathrooms: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Urgent Deal?</label>
                  <select
                    value={propForm.urgentDeal ? 'yes' : 'no'}
                    onChange={(e) => setPropForm({ ...propForm, urgentDeal: e.target.value === 'yes' })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">⚡ Yes (Urgent Deal)</option>
                  </select>
                </div>
              </div>

              {/* Property Image Upload & Preview */}
              <div className="space-y-2 p-3.5 bg-navy-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-gold-400" />
                    <span>Property Picture (تصویر اپلوڈ کریں یا منتخب کریں)</span>
                  </label>
                  {propForm.image && (
                    <button
                      type="button"
                      onClick={() => setPropForm({ ...propForm, image: '' })}
                      className="text-[11px] text-rose-400 hover:text-rose-300 underline"
                    >
                      Remove Picture
                    </button>
                  )}
                </div>

                {/* Live Image Preview */}
                {propForm.image ? (
                  <div className="relative h-40 rounded-xl overflow-hidden border border-gold-500/40 shadow-md">
                    <img
                      src={propForm.image}
                      alt="Property Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-emerald-400 text-[10px] font-bold">
                      ✓ Active Property Photo
                    </div>
                  </div>
                ) : (
                  <div className="h-28 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 p-4 text-center">
                    <Upload className="w-6 h-6 text-gold-400 mb-1" />
                    <span className="text-[11px]">Upload a photo from your phone/computer, or pick a preset below</span>
                  </div>
                )}

                {/* Direct File Upload Input */}
                <div className="pt-1">
                  <label className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-gold-400 border border-gold-500/40 text-xs font-bold cursor-pointer transition-all shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Picture from Device (موبائل یا کمپیوٹر سے فوٹو لگائیں)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePropertyImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preset Real Estate Architectural Photos */}
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">
                    Or Pick from Pakistani Luxury Photo Presets:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Modern Villa', url: properties[0]?.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Spanish House', url: properties[1]?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Commercial Plaza', url: projects[0]?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'DHA Plot / Land', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80' },
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPropForm({ ...propForm, image: preset.url });
                          showToast(`Selected "${preset.label}" preset!`);
                        }}
                        className="p-1 rounded-lg border border-slate-800 hover:border-gold-400 bg-navy-900 text-left transition-all cursor-pointer group"
                      >
                        <div className="h-10 rounded overflow-hidden mb-1 bg-slate-800">
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <span className="text-[9px] text-slate-300 font-medium block truncate text-center">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct URL input fallback */}
                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Or paste external image URL (https://...)"
                    value={propForm.image || ''}
                    onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={propForm.description || ''}
                  onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPropModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold"
                >
                  {editingPropId ? 'Save Changes' : 'Create Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PROJECT */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 text-white rounded-2xl border border-gold-500/40 w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingProjectId ? 'Edit Project' : 'Launch New Project'}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={projectForm.name || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                    <option value="Luxury Villas">Luxury Villas</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    value={projectForm.city || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, city: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Location Details</label>
                <input
                  type="text"
                  value={projectForm.location || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={projectForm.startingPrice || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, startingPrice: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Progress % ({projectForm.progressPercent}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={projectForm.progressPercent || 0}
                    onChange={(e) => setProjectForm({ ...projectForm, progressPercent: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT MARKET RATE */}
      {isRateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 text-white rounded-2xl border border-gold-500/40 w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingRateIndex !== null ? 'Edit Market Rate' : 'Add Society Rate'}
              </h3>
              <button onClick={() => setIsRateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Society Name</label>
                <input
                  type="text"
                  required
                  value={rateForm.society}
                  onChange={(e) => setRateForm({ ...rateForm, society: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={rateForm.city}
                    onChange={(e) => setRateForm({ ...rateForm, city: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Plot / Property Size</label>
                  <input
                    type="text"
                    required
                    value={rateForm.size}
                    onChange={(e) => setRateForm({ ...rateForm, size: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Price Range</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rs 1.5 Cr - 2.2 Cr"
                    value={rateForm.priceRange}
                    onChange={(e) => setRateForm({ ...rateForm, priceRange: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-gold-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Trend</label>
                  <select
                    value={rateForm.trend}
                    onChange={(e) => setRateForm({ ...rateForm, trend: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Rising">Rising</option>
                    <option value="High Demand">High Demand</option>
                    <option value="Stable">Stable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Annual Return (% p.a.)</label>
                <input
                  type="text"
                  value={rateForm.avgReturn}
                  onChange={(e) => setRateForm({ ...rateForm, avgReturn: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold"
                >
                  Save Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FAQ */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 text-white rounded-2xl border border-gold-500/40 w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingFaqIndex !== null ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Question (سوال)</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Answer (جواب)</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CONSTRUCTION & LABOR RATE */}
      {isConstRateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 text-white rounded-2xl border border-gold-500/40 w-full max-w-lg p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Hammer className="w-5 h-5 text-gold-400" />
                <span>{editingConstRateId ? 'Edit Construction / Labor Rate' : 'Add New Construction / Labor Rate'}</span>
              </h3>
              <button onClick={() => setIsConstRateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConstRate} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Rate Category</label>
                  <select
                    value={constRateForm.category}
                    onChange={(e) => setConstRateForm({ ...constRateForm, category: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="with_material">With Material (ود میٹریل)</option>
                    <option value="labor_only">Labor Only (صرف لیبر ریٹ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Unit Basis</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Per Sq Ft / Per Covered Sq Ft"
                    value={constRateForm.unit || ''}
                    onChange={(e) => setConstRateForm({ ...constRateForm, unit: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grey Structure (A+ Grade) or Masonry Brickwork"
                  value={constRateForm.title || ''}
                  onChange={(e) => setConstRateForm({ ...constRateForm, title: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Urdu Title (اردو عنوان)</label>
                <input
                  type="text"
                  dir="rtl"
                  placeholder="مثلاً: گری اسٹرکچر ود میٹریل یا اینٹ چنائی لیبر ریٹ"
                  value={constRateForm.urduTitle || ''}
                  onChange={(e) => setConstRateForm({ ...constRateForm, urduTitle: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-gold-300 font-serif focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Rate Display String</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rs 3,100 / sq ft or Rs 45 - 55 / sq ft"
                    value={constRateForm.ratePerUnit || ''}
                    onChange={(e) => setConstRateForm({ ...constRateForm, ratePerUnit: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-gold-400 font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Calculator Numeric Rate (PKR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3100"
                    value={constRateForm.rateNumeric || ''}
                    onChange={(e) => setConstRateForm({ ...constRateForm, rateNumeric: parseInt(e.target.value) || undefined })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description / Scope of Work</label>
                <textarea
                  rows={2}
                  placeholder="Detail what is included in this rate..."
                  value={constRateForm.description || ''}
                  onChange={(e) => setConstRateForm({ ...constRateForm, description: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Specifications / Brand Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mughal 60-Grade Steel, Bestway Cement, Red Bricks"
                  value={specsInputString}
                  onChange={(e) => setSpecsInputString(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsConstRateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-md cursor-pointer"
                >
                  {editingConstRateId ? 'Save Rate Changes' : 'Create Construction Rate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

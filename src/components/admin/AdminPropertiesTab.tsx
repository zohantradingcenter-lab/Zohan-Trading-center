import React, { useState } from 'react';
import { Property } from '../../types';
import { Plus, Search, Edit2, Trash2, CheckCircle2, Bed, Bath, Maximize2, MapPin, X, Sparkles } from 'lucide-react';

interface AdminPropertiesTabProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onUpdateProperty: (property: Property) => void;
  onDeleteProperty: (propertyId: string) => void;
}

export const AdminPropertiesTab: React.FC<AdminPropertiesTabProps> = ({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterPurpose, setFilterPurpose] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form State
  const initialFormState: Partial<Property> = {
    title: '',
    type: 'Villa',
    purpose: 'Buy',
    price: 35000000,
    priceFormatted: 'Rs 3.5 Crore',
    installmentAvailable: true,
    location: {
      sector: 'DHA Phase 6',
      city: 'Lahore',
      area: 'Ferozepur Road Belt',
    },
    features: {
      bedrooms: 5,
      bathrooms: 6,
      areaSize: '10 Marla',
      parkingSpaces: 2,
      floors: 2,
    },
    image: properties[0]?.image || '',
    badges: ['Featured', 'Prime Location'],
    status: 'Ready for Possession',
    description: 'Modern luxury construction with premium finishing, Grade-60 steel, and modern woodwork.',
    amenities: ['24/7 Security', 'Solar Power Ready', 'Imported Kitchen', 'Double Height Lobby'],
    developerApproved: 'DHA Approved',
  };

  const [formData, setFormData] = useState<Partial<Property>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormData(prop);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    if (editingProperty) {
      onUpdateProperty({
        ...editingProperty,
        ...formData,
        location: {
          sector: formData.location?.sector || 'Main Location',
          city: formData.location?.city || 'Lahore',
          area: formData.location?.area || 'Punjab',
        },
        features: {
          bedrooms: Number(formData.features?.bedrooms) || 0,
          bathrooms: Number(formData.features?.bathrooms) || 0,
          areaSize: formData.features?.areaSize || '1 Kanal',
          parkingSpaces: Number(formData.features?.parkingSpaces) || 2,
        },
      } as Property);
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title: formData.title,
        type: formData.type || 'Villa',
        purpose: formData.purpose || 'Buy',
        price: Number(formData.price) || 10000000,
        priceFormatted: formData.priceFormatted || `Rs ${(Number(formData.price) / 10000000).toFixed(2)} Crore`,
        installmentAvailable: !!formData.installmentAvailable,
        location: {
          sector: formData.location?.sector || 'Main Location',
          city: formData.location?.city || 'Lahore',
          area: formData.location?.area || 'Punjab',
        },
        features: {
          bedrooms: Number(formData.features?.bedrooms) || 4,
          bathrooms: Number(formData.features?.bathrooms) || 4,
          areaSize: formData.features?.areaSize || '10 Marla',
          parkingSpaces: Number(formData.features?.parkingSpaces) || 2,
        },
        image: formData.image || properties[0]?.image || '',
        gallery: [formData.image || properties[0]?.image || ''],
        badges: formData.badges || ['Verified'],
        status: formData.status || 'Ready for Possession',
        description: formData.description || 'Exclusive listing by Khan Brothers & Builders.',
        amenities: formData.amenities || ['Modern Finishing', 'Approved Layout'],
        developerApproved: formData.developerApproved || 'CDA/LDA Verified',
      };
      onAddProperty(newProp);
    }

    setIsModalOpen(false);
  };

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesPurpose = filterPurpose === 'All' || p.purpose === filterPurpose;
    return matchesSearch && matchesType && matchesPurpose;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-4 sm:p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">Properties Directory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your real estate listings, pricing, and availability ({properties.length} Active Listings)
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row gap-3 bg-navy-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title, DHA, Ferozepur Rd, Lahore, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-navy-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-gold-400"
          >
            <option value="All">All Types</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plot</option>
          </select>

          <select
            value={filterPurpose}
            onChange={(e) => setFilterPurpose(e.target.value)}
            className="bg-navy-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-gold-400"
          >
            <option value="All">All Purposes</option>
            <option value="Buy">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((prop) => (
          <div
            key={prop.id}
            className="bg-navy-900 rounded-xl border border-slate-800 hover:border-gold-500/40 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] bg-navy-950">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-navy-950/90 text-gold-400 text-[10px] font-bold px-2 py-0.5 rounded border border-gold-500/30 uppercase">
                    {prop.purpose}
                  </span>
                  <span className="bg-gold-500 text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded">
                    {prop.type}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <span className="font-serif font-bold text-base text-gold-300">
                    {prop.priceFormatted}
                  </span>
                  <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-slate-300">
                    {prop.features.areaSize}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                  <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                  <span className="truncate">{prop.location.sector}, {prop.location.city}</span>
                </div>

                <h4 className="font-serif font-bold text-sm text-white line-clamp-1 mb-2">
                  {prop.title}
                </h4>

                <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80 pt-2 mb-2">
                  {prop.features.bedrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-slate-500" />
                      <span>{prop.features.bedrooms} Bed</span>
                    </span>
                  )}
                  {prop.features.bathrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-slate-500" />
                      <span>{prop.features.bathrooms} Bath</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate max-w-[120px]">{prop.developerApproved}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-800 flex items-center justify-between gap-2 mt-2">
              <span className="text-[10px] text-slate-400 font-mono">ID: {prop.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(prop)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Edit Property"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                      onDeleteProperty(prop.id);
                    }
                  }}
                  className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer border border-rose-800/40"
                  title="Delete Property"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-gold-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-white my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 Kanal Modern Designer Villa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Buy">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Ready for Possession">Ready for Possession</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Hot Deal">Hot Deal</option>
                    <option value="Newly Launched">Newly Launched</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Price (PKR number)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const formatted = val >= 10000000 ? `Rs ${(val / 10000000).toFixed(2)} Crore` : `Rs ${(val / 100000).toFixed(2)} Lakh`;
                      setFormData({ ...formData, price: val, priceFormatted: formatted });
                    }}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Formatted Price Display</label>
                  <input
                    type="text"
                    value={formData.priceFormatted}
                    onChange={(e) => setFormData({ ...formData, priceFormatted: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.location?.city}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location!, city: e.target.value } })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Sector / Road Address</label>
                  <input
                    type="text"
                    value={formData.location?.sector}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location!, sector: e.target.value } })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Area Size (e.g. 1 Kanal, 10 Marla)</label>
                  <input
                    type="text"
                    value={formData.features?.areaSize}
                    onChange={(e) => setFormData({ ...formData, features: { ...formData.features!, areaSize: e.target.value } })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.features?.bedrooms}
                    onChange={(e) => setFormData({ ...formData, features: { ...formData.features!, bedrooms: Number(e.target.value) } })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.features?.bathrooms}
                    onChange={(e) => setFormData({ ...formData, features: { ...formData.features!, bathrooms: Number(e.target.value) } })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Authority Approval</label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Verified, LDA Approved"
                    value={formData.developerApproved}
                    onChange={(e) => setFormData({ ...formData, developerApproved: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-navy-950 text-slate-300 text-xs font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  {editingProperty ? 'Save Changes' : 'Create Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Project } from '../../types';
import { Plus, Edit2, Trash2, Calendar, MapPin, Building, X } from 'lucide-react';

interface AdminProjectsTabProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const initialFormState: Partial<Project> = {
    name: '',
    category: 'Mixed-Use',
    location: 'Ferozepur Road / Nishtar Colony Corridor, Lahore',
    city: 'Lahore',
    progressPercent: 75,
    completionDate: 'Q4 2026',
    status: 'Under Construction',
    startingPrice: 'Rs 1.8 Crore',
    image: projects[0]?.image || '',
    description: 'Premier architectural commercial & residential project by Khan Brothers & Builders.',
    highlights: [
      'Earthquake Resistant Structure',
      'Flexible 3-Year Payment Plan',
      'LDA / Civil Authority Approved',
    ],
    unitsAvailable: '12 Units Available',
  };

  const [formData, setFormData] = useState<Partial<Project>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormData(proj);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingProject) {
      onUpdateProject({
        ...editingProject,
        ...formData,
        progressPercent: Number(formData.progressPercent) || 50,
      } as Project);
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: formData.name,
        category: formData.category || 'Mixed-Use',
        location: formData.location || 'Lahore',
        city: formData.city || 'Lahore',
        progressPercent: Number(formData.progressPercent) || 60,
        completionDate: formData.completionDate || '2026-2027',
        status: formData.status || 'Under Construction',
        startingPrice: formData.startingPrice || 'Rs 1.5 Crore',
        image: formData.image || projects[0]?.image || '',
        description: formData.description || 'Landmark development.',
        highlights: formData.highlights || ['Approved Layout', 'Turnkey Construction'],
        unitsAvailable: formData.unitsAvailable || 'Booking Open',
      };
      onAddProject(newProj);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900 p-4 sm:p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">Signature Projects Management</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track real-time construction progress milestones, booking status, and project details ({projects.length} Landmark Projects)
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-navy-900 rounded-xl border border-slate-800 hover:border-gold-500/40 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] bg-navy-950">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-navy-950/90 text-gold-400 text-[10px] font-bold px-2 py-0.5 rounded border border-gold-500/30 uppercase">
                    {proj.status}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="bg-gold-500 text-navy-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow">
                    {proj.progressPercent}% Built
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-gold-400 font-semibold uppercase">
                  <span>{proj.category}</span>
                  <span className="text-slate-400 normal-case font-normal">From {proj.startingPrice}</span>
                </div>

                <h4 className="font-serif font-bold text-base text-white">
                  {proj.name}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span className="truncate">{proj.location}</span>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Progress:</span>
                    <span className="text-gold-400 font-semibold">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold-500 to-amber-400 h-full rounded-full transition-all"
                      style={{ width: `${proj.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold-400" />
                    <span>Target: {proj.completionDate}</span>
                  </span>
                  <span className="text-slate-300 font-medium">{proj.unitsAvailable}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">ID: {proj.id}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(proj)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${proj.name}"?`)) {
                      onDeleteProject(proj.id);
                    }
                  }}
                  className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer border border-rose-800/40"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-gold-500/30 rounded-2xl w-full max-w-xl p-6 text-white my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingProject ? 'Edit Signature Project' : 'Add New Signature Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khan Heights & Residencia"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                    <option value="Luxury Villas">Luxury Villas</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Under Construction">Under Construction</option>
                    <option value="Finishing Stage">Finishing Stage</option>
                    <option value="Booking Open">Booking Open</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Construction Progress: {formData.progressPercent}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progressPercent}
                    onChange={(e) => setFormData({ ...formData, progressPercent: Number(e.target.value) })}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Completion Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g. Q4 2026 or Immediate Handover"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Starting Price</label>
                  <input
                    type="text"
                    placeholder="e.g. Rs 1.8 Crore"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Available Units Text</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 Units Remaining"
                    value={formData.unitsAvailable}
                    onChange={(e) => setFormData({ ...formData, unitsAvailable: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Location Details</label>
                <input
                  type="text"
                  placeholder="e.g. Sector B-17, Islamabad or Ferozepur Road, Lahore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-gold-400"
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
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

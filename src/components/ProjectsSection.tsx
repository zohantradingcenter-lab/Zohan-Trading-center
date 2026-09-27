import React, { useState } from 'react';
import { Project } from '../types';
import { Building, MapPin, CheckCircle2, FileText, ArrowRight, Download, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ProjectsSectionProps {
  projects: Project[];
  onRequestBooking: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onRequestBooking }) => {
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleBrochureDownload = (proj: Project) => {
    setDownloadSuccessId(proj.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <section id="projects" className="py-20 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Landmark Developments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Signature Projects
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            From high-rise residential marvels to master-planned luxury villa communities, explore our ongoing and delivered mega-developments.
          </p>
        </div>

        {/* Projects Showcase Cards */}
        <div className="mt-14 space-y-12">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-navy-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-gold-500/40 transition-all duration-300 shadow-2xl grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 relative overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[320px] sm:min-h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded bg-navy-950/95 text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                    {project.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-navy-950/80 p-2.5 rounded backdrop-blur-xs border border-slate-700/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>Target: {project.completionDate}</span>
                  </span>
                  <span className="text-gold-300 font-semibold">{project.unitsAvailable}</span>
                </div>
              </div>

              {/* Content Column */}
              <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Starting from {project.startingPrice}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 mb-4">
                    <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6 p-4 rounded-xl bg-navy-950/60 border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-slate-300 font-medium">Construction Progress</span>
                      <span className="font-bold text-gold-400 tabular-nums">{project.progressPercent}% Completed</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-gold-500 to-amber-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${project.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    {project.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onRequestBooking(project)}
                    className="flex-1 min-w-[170px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold py-3 px-5 rounded text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
                  >
                    <span>Request Booking Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleBrochureDownload(project)}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-gold-400" />
                    <span>
                      {downloadSuccessId === project.id ? 'Brochure Sent!' : 'Download Plan'}
                    </span>
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=Hello%20Khan%20Brothers,%20please%20send%20payment%20plan%20and%20details%20for%20${encodeURIComponent(project.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    title="Ask on WhatsApp"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

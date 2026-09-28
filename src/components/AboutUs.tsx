import React from 'react';
import { Award, CheckCircle, ShieldCheck, HardHat, FileCheck2, ArrowUpRight } from 'lucide-react';
import aboutTowerImg from '../assets/images/about_commercial_tower_1790537336615.jpg';
import { COMPANY_INFO, INITIAL_ABOUT_CONTENT } from '../data/mockData';
import { AboutContent, CompanyInfo } from '../types';

interface AboutUsProps {
  onLearnMoreServices: () => void;
  aboutContent?: AboutContent;
  companyInfo?: CompanyInfo;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  onLearnMoreServices,
  aboutContent = INITIAL_ABOUT_CONTENT,
  companyInfo = COMPANY_INFO,
}) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Asset & Floating Credential Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src={aboutTowerImg}
                alt="Khan Brothers & Builders Landmark Construction Project"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] sm:h-[540px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

              {/* In-Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block mb-1">
                  Engineering Precision & Modern Design
                </span>
                <p className="text-sm font-medium text-slate-200">
                  Delivering iconic corporate towers and turnkey luxury residences across Pakistan.
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-navy-950 text-white p-5 rounded-xl border border-gold-500/40 shadow-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-gold-400">{aboutContent.experienceBadgeYears || companyInfo.experienceYears}</div>
                  <div className="text-xs text-slate-300">{aboutContent.experienceBadgeText}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Domain Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 mb-3">
              <HardHat className="w-4 h-4" />
              <span>{aboutContent.kicker}</span>
            </div>

            {/* Primary Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight leading-tight">
              {aboutContent.heading}
            </h2>

            {/* Narrative Prose */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {aboutContent.mainParagraph}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {aboutContent.secondaryParagraph}
            </p>

            {/* Key Value Checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950">100% Legal Transparency</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Strict CDA, LDA, and DHA title verifications without ambiguity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Fixed-Cost Contracts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Zero hidden escalation charges or unapproved material swaps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Grade-A Materials Only</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Certified Grade-60 steel, high-tensile cement, and lab-tested concrete.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950">10-Year Warranty</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Guaranteed structural integrity and 1-year free maintenance support.</p>
                </div>
              </div>
            </div>

            {/* Statistics Bar */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tabular-nums">
                  {companyInfo.experienceYears}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Years in Industry</div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tabular-nums">
                  {companyInfo.completedProjects}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Delivered Projects</div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 tabular-nums">
                  {companyInfo.happyClients}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Satisfied Families</div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-600 tabular-nums">
                  {companyInfo.totalVolume}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Transacted Value</div>
              </div>
            </div>

            {/* CTA action */}
            <div className="mt-8">
              <button
                onClick={onLearnMoreServices}
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-950 hover:text-gold-600 transition-colors group cursor-pointer"
              >
                <span>Discover Our Complete Range of Construction & Advisory Services</span>
                <ArrowUpRight className="w-4 h-4 text-gold-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

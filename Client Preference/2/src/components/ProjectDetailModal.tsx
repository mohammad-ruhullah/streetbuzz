import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenCampaignModal: (serviceName?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenCampaignModal,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#F5F4EF] text-[#0A0A0A] border border-[#0A0A0A] shadow-2xl my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#0A0A0A] text-[#F5F4EF] hover:bg-[#CCFF00] hover:text-[#0A0A0A] transition-colors"
          aria-label="Close project view"
        >
          <X size={20} />
        </button>

        {/* Large Image Header */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#0A0A0A] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* CONCEPT BADGE */}
          <div className="absolute bottom-4 left-4 bg-[#0A0A0A] text-[#CCFF00] text-xs font-mono font-bold tracking-widest px-3 py-1 uppercase">
            CONCEPT
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#0A0A0A]/10 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#71717A] tracking-wider uppercase">
                CATEGORY: {project.category}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#0A0A0A] tracking-tight mt-1">
                {project.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#71717A] block">SERIES</span>
              <span className="text-sm font-mono font-bold text-[#0A0A0A]">{project.year} ARCHIVE</span>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-[#0A0A0A]">
            <p className="text-lg font-semibold leading-snug">
              {project.tagline}
            </p>
            <p className="text-sm text-[#71717A] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Formats Used */}
          <div className="mb-8">
            <span className="text-xs font-mono font-bold uppercase text-[#71717A] block mb-2">
              APPLIED CAPABILITIES:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#EAE8DF] border border-[#0A0A0A]/10 text-xs font-mono font-bold uppercase text-[#0A0A0A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-[#0A0A0A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono text-[#71717A]">
              STREETBUZZ PORTFOLIO SPECIFICATION // EDITORIAL ARCHIVE
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenCampaignModal(project.category);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#0A0A0A] text-[#CCFF00] hover:bg-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>INQUIRE ABOUT THIS FORMAT</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

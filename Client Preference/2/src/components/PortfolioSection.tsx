import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO } from '../data';
import { PortfolioProject } from '../types';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Mobile OOH', 'Experiential', 'Creative OOH', 'Street Activation'];

  const filteredProjects = filter === 'ALL'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section
      id="work"
      className="py-24 sm:py-32 md:py-36 bg-[#F5F4EF] border-b border-[#E6E5DE]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-[#0A0A0A] pb-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase">
              // SECTION 06 — SELECTED WORK
            </span>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#0A0A0A] text-[#CCFF00] text-[11px] font-mono font-bold uppercase">
              <span>ALL LABELED AS: CONCEPT</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                id="portfolio-headline"
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-[#0A0A0A] uppercase"
              >
                IDEAS LOOK BETTER
                <br />
                OUTSIDE.
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors ${
                    filter === cat
                      ? 'bg-[#0A0A0A] text-[#CCFF00]'
                      : 'bg-[#E5E4DE] text-[#0A0A0A] hover:bg-[#D8D6CE]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {filteredProjects.map((project: PortfolioProject) => (
            <article
              key={project.id}
              id={`portfolio-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col justify-between bg-[#EAE8DF] border border-[#0A0A0A]/10 hover:border-[#0A0A0A] transition-all p-4 sm:p-6"
            >
              <div>
                {/* Large Editorial Image */}
                <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/10] bg-[#0A0A0A] mb-6">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  />

                  {/* CONCEPT BADGE (STRICTLY REQUIRED) */}
                  <div className="absolute top-3 left-3 bg-[#0A0A0A] text-[#CCFF00] text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase">
                    CONCEPT
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#0A0A0A]/90 text-[#F5F4EF] text-[10px] font-mono tracking-wider px-2 py-0.5 uppercase backdrop-blur-xs">
                    {project.category}
                  </div>
                </div>

                {/* Campaign Header & Category */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A] uppercase group-hover:text-black transition-colors">
                    {project.title}
                  </h3>
                  <div className="p-2 bg-[#0A0A0A] text-[#F5F4EF] group-hover:bg-[#CCFF00] group-hover:text-[#0A0A0A] transition-colors shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-3">
                  {project.category}
                </p>

                {/* Description */}
                <p className="text-sm text-[#0A0A0A]/85 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-4 border-t border-[#0A0A0A]/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider px-2 py-0.5 bg-[#DEDCD4] text-[#0A0A0A] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-[#0A0A0A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  VIEW CONCEPT <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

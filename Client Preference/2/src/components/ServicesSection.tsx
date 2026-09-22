import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  return (
    <section
      id="what-we-do"
      className="py-24 sm:py-32 md:py-36 bg-[#F5F4EF] border-b border-[#E6E5DE]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-[#0A0A0A] pb-8 mb-14 md:mb-20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase">
              // SECTION 03 — CAPABILITIES
            </span>
            <span className="text-xs font-mono font-semibold text-[#0A0A0A] uppercase">
              06 FORMATS & APPROACHES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold tracking-widest text-[#0A0A0A] uppercase block mb-3">
                WHAT WE DO
              </span>
              <h2
                id="services-headline"
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-[#0A0A0A] uppercase"
              >
                WE MAKE BRANDS
                <br />
                SHOW UP DIFFERENTLY.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-[#71717A] leading-relaxed">
                We reject standard formulas. Every campaign combines movement, physical architecture, cultural timing, and audience participation to create indelible memories.
              </p>
            </div>
          </div>
        </div>

        {/* Six Services: Editorial List with Modern Hover & Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A0A0A]/10 border border-[#0A0A0A]/10">
          {SERVICES.map((service: ServiceItem) => {
            const isSelected = service.id === activeServiceId;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => setActiveServiceId(service.id)}
                className={`group p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[360px] ${
                  isSelected
                    ? 'bg-[#0A0A0A] text-[#F5F4EF]'
                    : 'bg-[#F5F4EF] hover:bg-[#EAE8DF] text-[#0A0A0A]'
                }`}
              >
                <div>
                  {/* Service Number & Arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold tracking-wider px-2 py-0.5 ${
                        isSelected
                          ? 'bg-[#CCFF00] text-[#0A0A0A]'
                          : 'bg-[#0A0A0A] text-[#F5F4EF] group-hover:bg-[#CCFF00] group-hover:text-[#0A0A0A]'
                      } transition-colors`}
                    >
                      {service.number}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className={`transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        isSelected ? 'text-[#CCFF00]' : 'text-[#71717A]'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase mb-3">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p
                    className={`text-sm sm:text-base font-semibold leading-snug mb-4 ${
                      isSelected ? 'text-[#CCFF00]' : 'text-[#0A0A0A]'
                    }`}
                  >
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isSelected ? 'text-[#A1A1AA]' : 'text-[#71717A]'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-6 mt-6 border-t border-current/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono tracking-wider px-2 py-0.5 uppercase ${
                          isSelected
                            ? 'bg-[#222] text-[#F5F4EF]'
                            : 'bg-[#E3E1D7] text-[#0A0A0A]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service.title);
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase transition-colors ${
                      isSelected
                        ? 'text-[#CCFF00] hover:text-white'
                        : 'text-[#0A0A0A] hover:text-black'
                    }`}
                  >
                    <span>BRIEF THIS FORMAT</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Quick Info Strip */}
        <div className="mt-8 p-5 bg-[#0A0A0A] text-[#F5F4EF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
              ACTIVE SELECTION: {activeService.number} / {activeService.title}
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] font-mono">
            {activeService.tagline}
          </p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroSectionProps {
  onOpenCampaignModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCampaignModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-between overflow-hidden bg-[#F5F4EF]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        {/* Top Eyebrow Tag */}
        <div className="mb-6 md:mb-8 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase bg-[#0A0A0A] text-[#F5F4EF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            CREATIVE OUTDOOR MARKETING
          </span>
          <span className="text-xs font-semibold tracking-wider text-[#71717A] uppercase hidden sm:inline-block">
            STREETBUZZ / NYC • LONDON • TOKYO
          </span>
        </div>

        {/* Editorial Split Grid: Oversized Typography + Striking Visual Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Huge Bold Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h1
              id="hero-headline"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-black tracking-tight leading-[0.92] text-[#0A0A0A] uppercase"
            >
              YOUR BRAND.
              <br />
              <span className="text-[#0A0A0A] relative inline-block">
                BELONGS
                <span className="text-[#0A0A0A] inline-block ml-3">OUTSIDE.</span>
              </span>
            </h1>

            <div className="mt-8 sm:mt-10 max-w-xl">
              <p className="text-lg sm:text-xl font-medium text-[#0A0A0A] leading-snug">
                Creative outdoor marketing built for the real world.
              </p>
              <p className="mt-2 text-base text-[#71717A] leading-relaxed">
                We turn streets, spaces and everyday moments into brand experiences people notice.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  id="hero-start-campaign-cta"
                  onClick={onOpenCampaignModal}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0A0A0A] text-[#F5F4EF] text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-[#1e1e1e] transition-all focus:ring-2 focus:ring-[#CCFF00]"
                >
                  <span>START A CAMPAIGN</span>
                  <span className="text-[#CCFF00] group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <a
                  id="hero-see-what-we-do-cta"
                  href="#what-we-do"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 border border-[#0A0A0A] text-[#0A0A0A] text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-[#0A0A0A] hover:text-[#F5F4EF] transition-all"
                >
                  <span>SEE WHAT WE DO</span>
                  <ArrowUpRight size={16} className="text-[#71717A] group-hover:text-[#CCFF00] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Striking Outdoor Marketing Scene */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative group overflow-hidden border border-[#0A0A0A]/10 shadow-lg bg-[#EAE8DF]">
              {/* Photo */}
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden">
                <img
                  src={IMAGES.hero}
                  alt="Striking outdoor marketing scene showing urban street brand experiences"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Editorial Frame Overlay Badges */}
              <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 text-[#F5F4EF] text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase backdrop-blur-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                SCENE 01 / AMBIENT URBAN CANVAS
              </div>

              <div className="absolute bottom-3 right-3 bg-[#0A0A0A]/85 text-[#F5F4EF] text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase backdrop-blur-xs">
                REAL-WORLD IMPACT
              </div>
            </div>

            {/* Subtle supporting caption */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#71717A] px-1">
              <span>REAL-WORLD ATTENTION</span>
              <span>INDEX: 01 / HERO-EXT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-10 sm:pt-14 flex items-center justify-between border-t border-[#E6E5DE] mt-12">
        <div className="flex items-center gap-3 text-xs font-mono text-[#0A0A0A] font-semibold tracking-wider uppercase">
          <span className="text-[#CCFF00] bg-[#0A0A0A] px-2 py-0.5 text-[10px]">TAGLINE</span>
          <span>MAKE NOISE OUTSIDE.</span>
        </div>

        <a
          href="#statement"
          id="scroll-to-explore"
          className="group inline-flex items-center gap-2 text-xs font-mono text-[#0A0A0A] font-bold tracking-widest uppercase hover:text-black transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="text-[#0A0A0A] group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

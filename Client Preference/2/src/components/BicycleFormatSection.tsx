import React from 'react';
import { ArrowUpRight, Zap, Navigation, ShieldCheck, Cpu } from 'lucide-react';
import { IMAGES } from '../data';

interface BicycleFormatSectionProps {
  onOpenCampaignModal: () => void;
}

export const BicycleFormatSection: React.FC<BicycleFormatSectionProps> = ({ onOpenCampaignModal }) => {
  return (
    <section
      id="bicycle-format"
      className="py-24 sm:py-32 md:py-36 bg-[#0A0A0A] text-[#F5F4EF] border-y border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Tag & Ecosystem Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#262626] mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
              MEDIA FORMAT SPECIFICATION // 01 OF 06
            </span>
          </div>
          <span className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
            ECOSYSTEM: MOBILE OUTDOOR ASSET
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2
            id="bicycle-headline"
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-[#F5F4EF] uppercase"
          >
            ONE OF OUR
            <br />
            FAVORITE WAYS
            <br />
            <span className="text-[#CCFF00]">TO MOVE A BRAND.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl">
            Mobile outdoor advertising that takes your campaign directly into the streets.
            Engineered to penetrate dense urban pedestrian zones where cars and billboard eyes never reach.
          </p>
        </div>

        {/* The Exact Bicycle Format Presentation: NO CROPPING, FULL VISIBILITY */}
        <div className="relative bg-[#141414] border border-[#262626] p-4 sm:p-8 lg:p-12 mb-12">
          {/* Top Frame Tech Specs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A1A1AA] pb-4 mb-6 border-b border-[#222]">
            <div className="flex items-center gap-4">
              <span className="text-[#CCFF00] font-bold">FORMAT: MOBILE DISPLAY FRAME</span>
              <span className="hidden sm:inline-block">•</span>
              <span>PATENTED REAR CHASSIS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#222] text-[#F5F4EF] text-[10px]">100% UNCONSTRAINED MOBILITY</span>
              <span className="px-2 py-0.5 bg-[#222] text-[#CCFF00] text-[10px]">ZERO CARBON EMISSIONS</span>
            </div>
          </div>

          {/* The Full Bicycle Showcase: Clean, Uncropped */}
          <div className="w-full flex items-center justify-center bg-[#0d0d0d] py-4 sm:py-8 px-2 rounded-xs border border-[#1f1f1f]">
            <div className="w-full max-w-5xl">
              <img
                src={IMAGES.bike}
                alt="STREETBUZZ Mobile Outdoor Advertising Bicycle with rear advertising frame, full uncropped profile from front wheel to rear ad frame"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[600px] object-contain mx-auto block drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Technical Format Badges under Image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#222]">
            <div className="p-3 bg-[#181818] border border-[#222]">
              <div className="flex items-center gap-2 text-[#CCFF00] mb-1">
                <Navigation size={14} />
                <span className="text-[11px] font-mono font-bold uppercase">Urban Reach</span>
              </div>
              <p className="text-xs text-[#A1A1AA]">
                100% pedestrian-exclusive street & sidewalk access
              </p>
            </div>

            <div className="p-3 bg-[#181818] border border-[#222]">
              <div className="flex items-center gap-2 text-[#CCFF00] mb-1">
                <Zap size={14} />
                <span className="text-[11px] font-mono font-bold uppercase">Illumination</span>
              </div>
              <p className="text-xs text-[#A1A1AA]">
                High-lumen edge-lit poster frame for night clarity
              </p>
            </div>

            <div className="p-3 bg-[#181818] border border-[#222]">
              <div className="flex items-center gap-2 text-[#CCFF00] mb-1">
                <Cpu size={14} />
                <span className="text-[11px] font-mono font-bold uppercase">Live Telemetry</span>
              </div>
              <p className="text-xs text-[#A1A1AA]">
                Integrated GPS & route tracking via BUZZ LIVE
              </p>
            </div>

            <div className="p-3 bg-[#181818] border border-[#222]">
              <div className="flex items-center gap-2 text-[#CCFF00] mb-1">
                <ShieldCheck size={14} />
                <span className="text-[11px] font-mono font-bold uppercase">Brand Ambassadors</span>
              </div>
              <p className="text-xs text-[#A1A1AA]">
                Trained uniformed riders hand out collateral & converse
              </p>
            </div>
          </div>
        </div>

        {/* CTA & Framing within broader ecosystem */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
          <div>
            <p className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
              ONE COMPONENT OF STREETBUZZ'S EXPERIENTIAL SUITE
            </p>
            <p className="text-sm font-semibold text-[#F5F4EF] mt-1">
              Combine bicycle media with plaza takeovers, guerrilla projections, and interactive street sampling.
            </p>
          </div>

          <button
            id="explore-mobile-ooh-cta"
            onClick={onOpenCampaignModal}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#CCFF00] text-[#0A0A0A] text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-[#b8e600] transition-colors focus:ring-2 focus:ring-[#CCFF00]"
          >
            <span>EXPLORE MOBILE OOH</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

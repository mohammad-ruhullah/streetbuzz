import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenCampaignModal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenCampaignModal }) => {
  return (
    <section
      id="contact"
      className="py-28 sm:py-36 md:py-44 bg-[#F5F4EF] border-b border-[#E6E5DE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl">
          {/* Tag */}
          <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase block mb-6">
            // GET IN TOUCH WITH STREETBUZZ
          </span>

          {/* Huge Minimalist Headline */}
          <h2
            id="final-cta-headline"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-tight leading-[0.9] text-[#0A0A0A] uppercase"
          >
            READY TO
            <br />
            <span className="text-[#0A0A0A]">MAKE SOME</span>
            <br />
            <span className="text-[#0A0A0A] inline-block relative">
              NOISE?
              <span className="inline-block ml-3 w-4 h-4 sm:w-6 sm:h-6 bg-[#CCFF00]" />
            </span>
          </h2>

          {/* Supporting Line */}
          <p className="mt-8 text-xl sm:text-2xl text-[#0A0A0A] font-medium max-w-xl leading-relaxed">
            Tell us what you're trying to make people notice.
          </p>

          {/* Primary Action Button */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              id="final-start-campaign-btn"
              onClick={onOpenCampaignModal}
              className="group inline-flex items-center gap-3 px-8 py-4.5 bg-[#0A0A0A] text-[#F5F4EF] text-sm sm:text-base font-bold tracking-wider uppercase hover:bg-[#1a1a1a] transition-all focus:ring-4 focus:ring-[#CCFF00]"
            >
              <span>START A CAMPAIGN</span>
              <span className="text-[#CCFF00] group-hover:translate-x-1.5 transition-transform text-lg">
                →
              </span>
            </button>

            <a
              href="mailto:hello@wearestreetbuzz.com"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0A0A0A] hover:text-black group border-b-2 border-transparent hover:border-[#CCFF00] pb-1 transition-all"
            >
              <Mail size={18} className="text-[#71717A] group-hover:text-[#0A0A0A]" />
              <span>hello@wearestreetbuzz.com</span>
              <ArrowUpRight size={16} className="text-[#71717A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Secondary Executive Contact */}
          <div className="mt-12 pt-8 border-t border-[#0A0A0A]/10 flex flex-wrap items-center gap-6 text-xs font-mono text-[#71717A]">
            <span>FOR DIRECT INQUIRIES & FOUNDER BRIEFINGS:</span>
            <a
              href="mailto:ceo@wearestreetbuzz.com"
              className="text-[#0A0A0A] font-bold hover:text-black underline underline-offset-4"
            >
              ceo@wearestreetbuzz.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

interface CrowdedFeedSectionProps {
  onOpenCampaignModal: () => void;
}

export const CrowdedFeedSection: React.FC<CrowdedFeedSectionProps> = ({ onOpenCampaignModal }) => {
  return (
    <section
      id="crowded-feed"
      className="py-28 sm:py-36 md:py-48 bg-[#0A0A0A] text-[#F5F4EF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-5xl">
          {/* Tag */}
          <div className="mb-8">
            <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase">
              // SECTION 09 — THE ANTIDOTE TO ALGORITHM FATIGUE
            </span>
          </div>

          {/* Large White Headline */}
          <h2
            id="crowded-feed-headline"
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tight leading-[0.9] text-[#F5F4EF] uppercase"
          >
            THE FEED
            <br />
            IS CROWDED.
          </h2>

          {/* Huge Lime Text */}
          <div className="my-6 sm:my-8">
            <span
              id="get-outside-lime"
              className="text-5xl sm:text-7xl md:text-9xl lg:text-[9.5rem] font-black tracking-tight leading-[0.85] text-[#CCFF00] uppercase block"
            >
              GET OUTSIDE.
            </span>
          </div>

          {/* Supporting Text */}
          <p className="mt-8 max-w-2xl text-lg sm:text-2xl text-[#F5F4EF]/85 font-medium leading-relaxed">
            When everyone is fighting for another second of screen time, we create moments people encounter in the real world.
          </p>

          {/* CTA */}
          <div className="mt-10 sm:mt-12">
            <button
              id="crowded-feed-cta"
              onClick={onOpenCampaignModal}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-[#0A0A0A] text-sm sm:text-base font-black tracking-wider uppercase hover:bg-[#b8e600] transition-all focus:ring-4 focus:ring-[#CCFF00]/40"
            >
              <span>START A CAMPAIGN</span>
              <span className="text-[#0A0A0A] group-hover:translate-x-1.5 transition-transform text-lg">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Decorative Watermark in background */}
      <div className="absolute right-[-4%] bottom-[-5%] font-black text-[18vw] text-[#141414] select-none pointer-events-none tracking-tighter uppercase leading-none z-0">
        OUTSIDE
      </div>
    </section>
  );
};

import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 md:py-36 bg-[#F5F4EF] border-b border-[#E6E5DE]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Headline & Label */}
          <div className="lg:col-span-6">
            <span
              id="about-label"
              className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase block mb-4"
            >
              WHO WE ARE
            </span>

            <h2
              id="about-headline"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] text-[#0A0A0A] uppercase"
            >
              WE MAKE
              <br />
              OUTDOOR
              <br />
              <span className="text-[#0A0A0A] inline-block relative">
                INTERESTING
                <span className="text-[#CCFF00] bg-[#0A0A0A] px-2 py-0.5 ml-2 text-2xl sm:text-3xl align-middle">.</span>
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-3">
              <span className="w-3 h-3 rounded-xs bg-[#CCFF00]" />
              <span className="text-xs font-mono font-bold tracking-wider text-[#0A0A0A] uppercase">
                ESTABLISHED 2026 / INDEPENDENT CREATIVE AGENCY
              </span>
            </div>
          </div>

          {/* Right: Concise Text Manifesto */}
          <div className="lg:col-span-6 lg:pt-8">
            <div className="p-8 sm:p-10 bg-[#EAE8DF] border border-[#0A0A0A]/10 space-y-6">
              <p className="text-lg sm:text-2xl font-bold text-[#0A0A0A] leading-snug">
                STREETBUZZ is a creative outdoor marketing agency built around one simple idea:
              </p>

              <div className="py-4 px-5 bg-[#0A0A0A] text-[#F5F4EF] border-l-4 border-[#CCFF00]">
                <p className="text-base sm:text-lg font-extrabold uppercase tracking-tight">
                  Brands should not only be seen on screens.
                  <br />
                  <span className="text-[#CCFF00]">They should be experienced in the world around us.</span>
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#71717A] leading-relaxed">
                We combine creative thinking, outdoor media and real-world experiences to help brands become part of the places people live, move and gather.
              </p>

              <div className="pt-6 border-t border-[#0A0A0A]/10 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-[#F5F4EF]">
                  <div className="text-xl sm:text-2xl font-black text-[#0A0A0A]">01</div>
                  <div className="text-[10px] font-mono font-bold uppercase text-[#71717A]">CREATIVITY</div>
                </div>
                <div className="p-3 bg-[#F5F4EF]">
                  <div className="text-xl sm:text-2xl font-black text-[#0A0A0A]">02</div>
                  <div className="text-[10px] font-mono font-bold uppercase text-[#71717A]">CULTURE</div>
                </div>
                <div className="p-3 bg-[#F5F4EF]">
                  <div className="text-xl sm:text-2xl font-black text-[#0A0A0A]">03</div>
                  <div className="text-[10px] font-mono font-bold uppercase text-[#71717A]">MOVEMENT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

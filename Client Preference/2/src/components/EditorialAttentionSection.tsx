import React from 'react';
import { IMAGES } from '../data';

export const EditorialAttentionSection: React.FC = () => {
  return (
    <section
      id="editorial-attention"
      className="py-24 sm:py-32 md:py-44 bg-[#F5F4EF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Editorial Layout: Generous Whitespace + Asymmetric Placement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Text Manifesto */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase block mb-4">
              // SECTION 04 — ATTENTION PHILOSOPHY
            </span>

            <h2
              id="attention-headline"
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.92] text-[#0A0A0A] uppercase"
            >
              DON'T JUST
              <br />
              BUY ATTENTION.
            </h2>

            <div className="mt-4 mb-8">
              <span className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.92] text-[#0A0A0A] uppercase block relative">
                CREATE IT<span className="text-[#CCFF00] bg-[#0A0A0A] px-2 py-0.5 ml-2 text-2xl sm:text-3xl align-middle">.</span>
              </span>
            </div>

            <div className="mt-8 space-y-6 text-[#0A0A0A] max-w-lg">
              <p className="text-lg sm:text-xl font-medium leading-relaxed">
                The best outdoor campaigns don't simply occupy space.
              </p>
              <p className="text-lg sm:text-xl font-semibold text-[#0A0A0A] leading-relaxed">
                They become part of the environment.
              </p>

              {/* Behavior steps */}
              <div className="pt-4 border-t border-[#0A0A0A]/15">
                <p className="text-xs font-mono tracking-widest text-[#71717A] uppercase mb-4">
                  THE REAL-WORLD REACTION CHAIN:
                </p>
                <div className="flex flex-col gap-2.5 font-mono text-sm sm:text-base">
                  {[
                    'They make people stop.',
                    'Look.',
                    'Interact.',
                    'Take a photo.',
                    'Talk about it.'
                  ].map((step, idx) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 p-2 bg-[#EAE8DF] hover:bg-[#0A0A0A] hover:text-[#F5F4EF] group transition-colors"
                    >
                      <span className="text-xs font-bold text-[#71717A] group-hover:text-[#CCFF00]">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-[#0A0A0A] group-hover:text-[#F5F4EF]">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Large Campaign Image with Generous Whitespace */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative group p-3 sm:p-4 bg-[#E8E6DC] border border-[#0A0A0A]/10 shadow-xl">
              <div className="overflow-hidden aspect-[4/5] sm:aspect-[4/5]">
                <img
                  src={IMAGES.attention}
                  alt="Creative outdoor marketing installation commanding sidewalk attention"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Meta Caption */}
              <div className="mt-4 pt-3 border-t border-[#0A0A0A]/10 flex items-center justify-between text-xs font-mono text-[#0A0A0A]">
                <span className="font-bold uppercase tracking-wider">
                  CASE STUDY REF / SOHO PLAZA
                </span>
                <span className="text-[#71717A]">
                  PHOTO TAKES: +420% VS STATIC BILLBOARDS
                </span>
              </div>
            </div>

            <div className="mt-6 p-6 bg-[#0A0A0A] text-[#F5F4EF] flex items-center justify-between">
              <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                CULTURE CANNOT BE SKIPPED LIKE A 5-SECOND VIDEO PRE-ROLL.
              </p>
              <span className="text-xs font-mono font-bold text-[#CCFF00]">
                #NOISEOUTSIDE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

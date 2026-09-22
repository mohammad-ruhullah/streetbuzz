import React from 'react';

export const StatementSection: React.FC = () => {
  return (
    <section
      id="statement"
      className="py-24 sm:py-32 md:py-40 bg-[#0A0A0A] text-[#F5F4EF] relative overflow-hidden"
    >
      {/* Subtle grid line accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#CCFF00_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Small Label */}
        <div className="mb-10 sm:mb-14">
          <span
            id="statement-label"
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#262626] text-[#CCFF00] text-xs font-mono font-bold tracking-widest uppercase border border-[#333]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
            THE STREET IS MEDIA.
          </span>
        </div>

        {/* Massive Typographic Headline */}
        <div className="max-w-5xl">
          <h2
            id="statement-main-headline"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.95] uppercase text-[#F5F4EF]"
          >
            THE STREET
            <br />
            <span className="text-[#F5F4EF]/50">ISN'T EMPTY SPACE.</span>
          </h2>

          {/* Staccato Rhythm Verbs */}
          <div className="my-12 sm:my-16 md:my-20 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 font-mono text-base sm:text-xl md:text-2xl text-[#A1A1AA]">
            <span className="text-[#F5F4EF] font-bold">It's where people</span>
            {['walk.', 'Wait.', 'Meet.', 'Look.', 'Live.'].map((verb, idx) => (
              <span
                key={verb}
                className="inline-flex items-center gap-3 sm:gap-4 group cursor-default"
              >
                <span className="text-[#CCFF00] font-black">/</span>
                <span className="text-[#F5F4EF] hover:text-[#CCFF00] transition-colors font-medium">
                  {verb}
                </span>
                {idx === 4 && (
                  <span className="w-2.5 h-2.5 bg-[#CCFF00] inline-block ml-1" />
                )}
              </span>
            ))}
          </div>

          {/* Large Payoff Statement */}
          <div className="pt-8 sm:pt-12 border-t border-[#262626] flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h3
              id="statement-punchline"
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase text-[#CCFF00]"
            >
              WE TURN IT INTO MEDIA.
            </h3>

            <p className="max-w-md text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              Every crosswalk, plaza, and pedestrian lane holds undivided cultural attention waiting to be activated. We engineer that connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

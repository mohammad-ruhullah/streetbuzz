import React from 'react';
import { PROCESS_STEPS } from '../data';
import { ProcessStep } from '../types';

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="py-24 sm:py-32 md:py-36 bg-[#F5F4EF] border-b border-[#E6E5DE]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-[#0A0A0A] pb-8 mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase">
              // SECTION 08 — EXECUTION BLUEPRINT
            </span>
            <span className="text-xs font-mono font-semibold text-[#0A0A0A] uppercase">
              05 PHASES TO IMPACT
            </span>
          </div>

          <h2
            id="process-headline"
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-[#0A0A0A] uppercase"
          >
            FROM BRIEF
            <br />
            TO STREET.
          </h2>
        </div>

        {/* 5 Steps: Large Numbers & Minimal Bold Typography */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#0A0A0A]/10 border border-[#0A0A0A]/10">
          {PROCESS_STEPS.map((step: ProcessStep, index: number) => (
            <div
              key={step.number}
              id={`process-step-${step.number}`}
              className="p-6 sm:p-8 bg-[#F5F4EF] hover:bg-[#EAE8DF] transition-colors flex flex-col justify-between min-h-[300px] group"
            >
              <div>
                {/* Huge Oversized Number */}
                <span className="block font-black text-5xl sm:text-6xl lg:text-7xl text-[#0A0A0A]/20 group-hover:text-[#0A0A0A] transition-colors mb-6 tracking-tighter">
                  {step.number}
                </span>

                {/* Step Title */}
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0A0A0A] uppercase mb-3">
                  {step.title}
                </h3>

                {/* Direct Instruction */}
                <p className="text-sm font-semibold text-[#0A0A0A] leading-snug mb-3">
                  {step.description}
                </p>

                {/* Supporting Detail */}
                <p className="text-xs text-[#71717A] leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="pt-6 mt-6 border-t border-[#0A0A0A]/10 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                <span>PHASE 0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:bg-[#CCFF00] group-hover:scale-150 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

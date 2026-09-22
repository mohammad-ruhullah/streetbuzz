import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] text-[#F5F4EF] pt-20 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#262626]">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="font-black tracking-tighter text-3xl text-[#F5F4EF] uppercase">
                STREETBUZZ
              </span>
              <span className="w-2.5 h-2.5 bg-[#CCFF00]" />
            </div>
            <p className="text-sm font-semibold tracking-wider text-[#CCFF00] uppercase mb-4">
              Creative Outdoor Marketing
            </p>
            <p className="text-xs text-[#71717A] max-w-sm leading-relaxed mb-6">
              Outdoor advertising, experiential marketing, street activations, mobile OOH campaigns, creative installations, and unconventional real-world brand experiences.
            </p>
            <div className="text-xs font-mono text-[#A1A1AA]">
              TAGLINE: <span className="text-[#F5F4EF] font-bold">MAKE NOISE OUTSIDE.</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono text-[#71717A] uppercase tracking-widest mb-4">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 text-sm font-semibold tracking-wide">
              {['Work', 'What We Do', 'Buzz Live', 'About', 'Contact', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[#A1A1AA] hover:text-[#CCFF00] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#71717A] uppercase tracking-widest mb-4">
                CONTACT
              </div>
              <a
                href="mailto:hello@wearestreetbuzz.com"
                className="text-base sm:text-lg font-bold text-[#F5F4EF] hover:text-[#CCFF00] transition-colors block mb-6"
              >
                hello@wearestreetbuzz.com
              </a>

              <div className="text-xs font-mono text-[#71717A] uppercase tracking-widest mb-3">
                SOCIAL
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono font-bold tracking-wider">
                {['Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#A1A1AA] hover:text-[#CCFF00] transition-colors uppercase border-b border-[#333] pb-0.5"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#222]">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-[#CCFF00] transition-colors"
              >
                <span>BACK TO TOP</span>
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div>
            © 2026 STREETBUZZ. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>POSITIONING: CREATIVE OUTDOOR MARKETING</span>
            <span>•</span>
            <span className="text-[#CCFF00]">BUILT FOR THE REAL WORLD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

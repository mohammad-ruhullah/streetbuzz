import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCampaignModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCampaignModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'WHAT WE DO', href: '#what-we-do' },
    { label: 'BUZZ LIVE', href: '#buzz-live' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F4EF]/95 backdrop-blur-md border-b border-[#E6E5DE] py-3.5 shadow-xs'
          : 'bg-[#F5F4EF] py-5 md:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          id="nav-logo"
          className="group flex items-center gap-1.5 focus:outline-none"
        >
          <span className="font-extrabold tracking-tighter text-xl sm:text-2xl text-[#0A0A0A] uppercase transition-colors group-hover:text-black">
            STREETBUZZ
          </span>
          <span className="inline-block w-2 h-2 rounded-xs bg-[#CCFF00] group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs tracking-wider uppercase font-semibold text-[#0A0A0A]/75 hover:text-[#0A0A0A] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#0A0A0A] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            id="nav-start-campaign-btn"
            onClick={onOpenCampaignModal}
            className="group relative inline-flex items-center gap-2 px-4.5 py-2.5 bg-[#0A0A0A] text-[#F5F4EF] text-xs font-bold tracking-wider uppercase rounded-none hover:bg-[#1f1f1f] transition-all focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
          >
            <span>START A CAMPAIGN</span>
            <span className="text-[#CCFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              →
            </span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0A0A0A] hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden fixed inset-x-0 top-full bg-[#0A0A0A] text-[#F5F4EF] border-b border-[#262626] px-6 py-8 flex flex-col gap-6 shadow-2xl transition-all"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold tracking-tight text-[#F5F4EF] hover:text-[#CCFF00] transition-colors flex items-center justify-between py-2 border-b border-[#222]"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} className="text-[#71717A]" />
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCampaignModal();
            }}
            className="w-full py-3.5 bg-[#CCFF00] text-[#0A0A0A] font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#b8e600] transition-colors"
          >
            <span>START A CAMPAIGN</span>
            <span>→</span>
          </button>
        </div>
      )}
    </header>
  );
};

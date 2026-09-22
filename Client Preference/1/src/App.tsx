/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  X, 
  Check, 
  Menu, 
  Bike, 
  Sparkles, 
  MapPin, 
  Eye, 
  Compass, 
  Layers, 
  Send,
  Calendar
} from 'lucide-react';

// Custom generated photography assets
import heroAdcycleImg from './assets/images/adcycle_hero_1789635455161.jpg';
import matteBlackAdcycleImg from './assets/images/adcycle_matte_black_1789635469186.jpg';
import cpdlCampaignImg from './assets/images/cpdl_campaign_1789635488069.jpg';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  formatDetail: string;
  image: string;
}

interface ProjectItem {
  id: string;
  client: string;
  campaign: string;
  tag: string;
  location: string;
  image: string;
  aspect: string;
  summary: string;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(0);
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const [adCycleModalOpen, setAdCycleModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    format: 'AdCycle — Mobile Advertising Bicycle',
    city: 'Chattogram',
    message: ''
  });

  // Track scroll position to transition navigation to black with white text
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: ServiceItem[] = [
    {
      id: 'outdoor-advertising',
      number: '01',
      title: 'Outdoor Advertising',
      description: 'High-impact physical formats tailored to prominent urban corridors, pedestrian hubs, and commercial epicenters.',
      formatDetail: 'Large-format hoardings, high-street installations, custom transit placements',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop'
    },
    {
      id: 'mobile-advertising',
      number: '02',
      title: 'Mobile Advertising',
      description: 'Dynamic media in motion. Taking your visual message directly to campuses, shopping districts, and high-footfall intersections.',
      formatDetail: 'AdCycle bicycle fleets, moving typographic media, targeted urban routes',
      image: heroAdcycleImg
    },
    {
      id: 'guerrilla-marketing',
      number: '03',
      title: 'Guerrilla Marketing',
      description: 'Unconventional, provocative brand moments that interrupt the mundane and spark organic word-of-mouth conversation.',
      formatDetail: 'Stealth sidewalk art, projection mapping, unexpected ambient installations',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=900&auto=format&fit=crop'
    },
    {
      id: 'experiential-marketing',
      number: '04',
      title: 'Experiential Marketing',
      description: 'Sensory-rich environments where audiences do not just see your brand — they touch, hear, sample, and remember it.',
      formatDetail: 'Sensory scent tunnels, pop-up architectural pods, live customer engagements',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop'
    },
    {
      id: 'brand-activations',
      number: '05',
      title: 'Brand Activations',
      description: 'Energetic street-level rollouts designed to turn passive onlookers into active participants and loyal advocates.',
      formatDetail: 'Product sampling units, live brand ambassador teams, campus takeovers',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop'
    },
    {
      id: 'custom-outdoor-campaigns',
      number: '06',
      title: 'Custom Outdoor Campaigns',
      description: 'Bespoke, one-of-a-kind physical structures engineered from scratch for brands with bold, uncompromising ideas.',
      formatDetail: 'Architectural scale replicas, kinetic displays, sustainable solar media',
      image: cpdlCampaignImg
    }
  ];

  const projects: ProjectItem[] = [
    {
      id: 'cpdl',
      client: 'CPDL',
      campaign: 'BUILDING REPLICA CAMPAIGN',
      tag: 'Custom Outdoor & Architecture',
      location: 'Chattogram Prime Corridor',
      image: cpdlCampaignImg,
      aspect: 'md:col-span-7 aspect-[4/3]',
      summary: 'Engineered a striking sculptural architectural miniature installed at key urban junctions, bridging modern living with tactile real-world outdoor media.'
    },
    {
      id: 'naseem-perfume',
      client: 'NASEEM PERFUME',
      campaign: 'OUTDOOR BRAND CAMPAIGN',
      tag: 'Sensory & Mobile Showcase',
      location: 'High-Street Retail Districts',
      image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000&auto=format&fit=crop',
      aspect: 'md:col-span-5 aspect-[4/5]',
      summary: 'A multi-sensory street-level experience pairing sleek visual panels with controlled ambient fragrance diffusion along premium shopping avenues.'
    },
    {
      id: 'local-brand',
      client: 'LOCAL BRAND',
      campaign: 'STREET ACTIVATION',
      tag: 'Guerrilla & AdCycle Fleet',
      location: 'University Campus & Art Hub',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
      aspect: 'md:col-span-5 aspect-[4/5]',
      summary: 'Mobilized a fleet of synchronized matte-black AdCycles delivering direct sampling and interactive product discovery with zero carbon emissions.'
    },
    {
      id: 'metropolitan-ambient',
      client: 'STREETBUZZ LABS',
      campaign: 'THE NIGHT SHIFT ACTIVATION',
      tag: 'Luminescent Ambient OOH',
      location: 'GEC Circle & Agrabad',
      image: matteBlackAdcycleImg,
      aspect: 'md:col-span-7 aspect-[4/3]',
      summary: 'Illuminated edge-lit mobile bicycle displays that navigated evening cultural crowds, generating 3.4x higher recall than static billboards.'
    }
  ];

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleOpenTalk = (formatName?: string) => {
    if (formatName) {
      setFormData(prev => ({ ...prev, format: formatName }));
    }
    setFormSubmitted(false);
    setTalkModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans selection:bg-[#CCFF00] selection:text-[#0A0A0A]">

      {/* --------------------------------------------------
          NAVIGATION
          Minimal navigation.
          LEFT: StreetBuzz logo
          CENTER: WORK, SERVICES, ABOUT
          RIGHT: LET'S TALK →
          White background. Thin bottom border.
          On scroll, navigation can become black with white text.
      -------------------------------------------------- */}
      <nav 
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A0A0A] text-white border-b border-neutral-800 shadow-md py-4' 
            : 'bg-white text-[#0A0A0A] border-b border-black/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* LEFT: StreetBuzz logo */}
          <a 
            href="#" 
            id="nav-logo" 
            className="flex items-center gap-1.5 group font-extrabold text-xl sm:text-2xl tracking-tight"
          >
            <span className="transition-colors group-hover:opacity-80">STREETBUZZ</span>
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] inline-block mb-1 group-hover:scale-125 transition-transform" />
          </a>

          {/* CENTER: WORK, SERVICES, ABOUT (Desktop) */}
          <div className="hidden md:flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.18em]">
            <a 
              href="#work" 
              id="nav-link-work"
              className="hover:text-[#CCFF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all"
            >
              Work
            </a>
            <a 
              href="#services" 
              id="nav-link-services"
              className="hover:text-[#CCFF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all"
            >
              Services
            </a>
            <a 
              href="#adcycle" 
              id="nav-link-adcycle"
              className="hover:text-[#CCFF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all"
            >
              AdCycle
            </a>
            <a 
              href="#about" 
              id="nav-link-about"
              className="hover:text-[#CCFF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all"
            >
              About
            </a>
          </div>

          {/* RIGHT: LET'S TALK → */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenTalk()}
              id="nav-cta-btn"
              className={`hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] px-5 py-2.5 transition-all ${
                isScrolled
                  ? 'bg-[#CCFF00] text-[#0A0A0A] hover:bg-white hover:text-black'
                  : 'bg-[#0A0A0A] text-white hover:bg-black/85'
              }`}
            >
              <span>LET'S TALK</span>
              <span className="text-sm">→</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-6 pt-4 pb-6 border-t ${isScrolled ? 'bg-[#0A0A0A] text-white border-neutral-800' : 'bg-white text-[#0A0A0A] border-black/10'}`}>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-[0.18em]">
              <a 
                href="#work" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 dark:border-white/5 hover:text-[#CCFF00]"
              >
                Work
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 dark:border-white/5 hover:text-[#CCFF00]"
              >
                Services
              </a>
              <a 
                href="#adcycle" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 dark:border-white/5 hover:text-[#CCFF00]"
              >
                AdCycle
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 dark:border-white/5 hover:text-[#CCFF00]"
              >
                About
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenTalk();
                }}
                className="mt-2 w-full py-3 bg-[#CCFF00] text-[#0A0A0A] font-bold text-center uppercase tracking-wider"
              >
                LET'S TALK →
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* --------------------------------------------------
          HERO
          Keep the hero extremely simple.
          Small label above: CREATIVE OUTDOOR MARKETING
          Large headline:
          MAKE
          NOISE
          OUTSIDE.
          Make "NOISE" neon lime.
          Short description:
          We create outdoor advertising and real-world brand experiences that people notice.
          CTA: START A CAMPAIGN →
          One strong, realistic photograph beside or underneath.
          Handwritten-style note: CREATIVE ADVERTISING THAT MOVES.
      -------------------------------------------------- */}
      <section id="hero-section" className="pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          
          {/* Hero Typography Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Small label above */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#0A0A0A]/70">
                CREATIVE OUTDOOR MARKETING
              </p>
            </div>

            {/* Large headline */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] leading-[0.88] uppercase mb-8 sm:mb-10 select-none">
              MAKE<br />
              <span className="inline-block bg-[#0A0A0A] text-[#CCFF00] px-3 sm:px-4 py-1 mt-1 mb-1 font-black transform -rotate-1 origin-left">
                NOISE
              </span><br />
              OUTSIDE.
            </h1>

            {/* Short description */}
            <p className="text-lg sm:text-xl text-[#222222] font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              We create outdoor advertising and real-world brand experiences that people notice.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => handleOpenTalk()}
                id="hero-start-campaign-cta"
                className="group inline-flex items-center gap-3 bg-[#0A0A0A] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#CCFF00] hover:text-[#0A0A0A] transition-colors duration-200"
              >
                <span>START A CAMPAIGN</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              <a
                href="#services"
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/70 hover:text-[#0A0A0A] underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all"
              >
                EXPLORE CAPABILITIES
              </a>
            </div>
          </div>

          {/* Hero Realistic Photography Column */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="relative group">
              {/* Clean realistic photograph showing StreetBuzz advertising bicycle moving through urban street */}
              <div className="overflow-hidden bg-neutral-200 border border-black/15 shadow-sm">
                <img
                  src={heroAdcycleImg}
                  alt="StreetBuzz AdCycle mobile advertising bicycle moving through an urban city street"
                  className="w-full aspect-[4/3] object-cover object-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  loading="eager"
                />
              </div>

              {/* Minimal caption line */}
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-black/60 mt-3 px-1">
                <span>FORMAT // 01 ADC-URBAN</span>
                <span>REAL-WORLD ATTENTION</span>
              </div>

              {/* Small handwritten-style note */}
              <div className="mt-5 flex items-start gap-2 select-none">
                <svg 
                  className="w-6 h-6 text-[#0A0A0A] mt-1 shrink-0 -rotate-12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.8"
                >
                  <path d="M4 12c4-2 8-3 14 0m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-handwriting text-2xl sm:text-3xl text-[#0A0A0A] leading-tight font-bold tracking-wide">
                  CREATIVE ADVERTISING THAT MOVES.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------
          INTRODUCTION
          White background.
          Small label: STREETBUZZ
          Large text:
          WE PUT
          GOOD IDEAS
          OUTSIDE.
          Short paragraph:
          From mobile advertising to street activations, we create creative
          outdoor campaigns designed to get brands noticed in the real world.
      -------------------------------------------------- */}
      <section id="introduction-section" className="bg-white border-y border-black/10 py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Small label */}
            <div className="lg:col-span-3">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.24em] text-[#0A0A0A] border-l-2 border-[#CCFF00] pl-3">
                STREETBUZZ
              </span>
            </div>

            {/* Large text & paragraph */}
            <div className="lg:col-span-9">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] uppercase leading-[0.95] mb-8">
                WE PUT<br />
                GOOD IDEAS<br />
                OUTSIDE.
              </h2>
              
              <p className="text-xl sm:text-2xl text-[#222222] font-normal leading-relaxed max-w-3xl border-t border-black/10 pt-8">
                From mobile advertising to street activations, we create creative outdoor campaigns designed to get brands noticed in the real world.
              </p>

              {/* Minimal agency manifesto pills */}
              <div className="flex flex-wrap gap-3 mt-10 text-xs font-bold uppercase tracking-[0.16em] text-[#0A0A0A]">
                <span className="px-3.5 py-1.5 border border-black/15 bg-[#F7F7F5]">No Screens Required</span>
                <span className="px-3.5 py-1.5 border border-black/15 bg-[#F7F7F5]">High-Footfall Corridors</span>
                <span className="px-3.5 py-1.5 border border-black/15 bg-[#F7F7F5]">Tactile Engagement</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SERVICES
          Keep this very minimal.
          Heading: WHAT WE DO
          Then display a simple list rather than large cards.
          01 — Outdoor Advertising
          02 — Mobile Advertising
          03 — Guerrilla Marketing
          04 — Experiential Marketing
          05 — Brand Activations
          06 — Custom Outdoor Campaigns
          On hover, show a small image or short description.
          No complicated icons.
      -------------------------------------------------- */}
      <section id="services" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/15 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/60 mb-2">SERVICES & CAPABILITIES</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">WHAT WE DO</h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-black/60 uppercase tracking-widest">
            06 CORE REAL-WORLD DISCIPLINES
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Services Interactive List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-black/10">
            {services.map((item, index) => {
              const isSelected = hoveredService === index;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredService(index)}
                  onClick={() => setHoveredService(index)}
                  className={`group py-6 sm:py-8 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'bg-black/5 sm:bg-transparent pl-4 sm:pl-2' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-black/40 group-hover:text-black">
                        {item.number}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight transition-colors ${
                        isSelected ? 'text-[#0A0A0A]' : 'text-neutral-800 group-hover:text-black'
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider transition-opacity ${
                        isSelected ? 'opacity-100 text-[#0A0A0A]' : 'opacity-0 group-hover:opacity-100 text-black/50'
                      }`}>
                        EXPLORE
                      </span>
                      <span className={`text-lg transition-transform ${isSelected ? 'translate-x-1 text-[#0A0A0A]' : 'text-black/30'}`}>
                        →
                      </span>
                    </div>
                  </div>

                  {/* Inline description visible on mobile or when selected */}
                  <div className={`mt-3 sm:hidden text-sm text-[#222222] font-normal pl-8`}>
                    <p>{item.description}</p>
                    <p className="text-xs font-mono text-black/60 mt-1 uppercase">{item.formatDetail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Live Dynamic Preview Box (No complex cards, pure editorial preview) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 bg-white border border-black/15 p-6 shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-black/60 pb-4 mb-4 border-b border-black/10">
                <span>FORMAT PREVIEW</span>
                <span className="font-bold text-black">{hoveredService !== null ? services[hoveredService].number : '01'}</span>
              </div>

              {hoveredService !== null && (
                <div>
                  <div className="overflow-hidden aspect-[4/3] bg-neutral-100 mb-5 border border-black/10">
                    <img 
                      src={services[hoveredService].image} 
                      alt={services[hoveredService].title}
                      className="w-full h-full object-cover grayscale-[15%] transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h4 className="text-xl font-bold uppercase tracking-tight mb-2">
                    {services[hoveredService].title}
                  </h4>

                  <p className="text-sm text-[#222222] leading-relaxed mb-4">
                    {services[hoveredService].description}
                  </p>

                  <div className="pt-3 border-t border-black/10 text-xs font-mono text-black/70">
                    <p className="uppercase tracking-wide font-semibold text-[10px] text-black/40 mb-1">Execution Formats:</p>
                    <p>{services[hoveredService].formatDetail}</p>
                  </div>

                  <button
                    onClick={() => handleOpenTalk(services[hoveredService].title)}
                    className="mt-5 w-full py-2.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#CCFF00] hover:text-[#0A0A0A] transition-colors"
                  >
                    INQUIRE FORMAT →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          AD CYCLE (Signature Format)
          Create one dedicated section for the signature product.
          Black background.
          Small label: ONE OF OUR FORMATS
          Large headline:
          ADVERTISING
          THAT MOVES.
          Show a clean, realistic premium photograph of the matte-black StreetBuzz advertising bicycle.
          Short text:
          Our mobile advertising bicycle takes your brand message directly
          into streets, campuses, events and high-footfall locations.
          CTA: SEE AD CYCLE →
          Keep this section extremely clean.
      -------------------------------------------------- */}
      <section id="adcycle" className="bg-[#0A0A0A] text-white py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Small label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
                  ONE OF OUR FORMATS
                </span>
              </div>

              {/* Large headline */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[0.92] mb-8">
                ADVERTISING<br />
                <span className="text-[#CCFF00]">THAT MOVES.</span>
              </h2>

              {/* Short text */}
              <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
                Our mobile advertising bicycle takes your brand message directly into streets, campuses, events and high-footfall locations.
              </p>

              {/* Clean key specs list */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-neutral-800 mb-8 text-xs font-mono text-neutral-400">
                <div>
                  <span className="block text-white font-bold text-sm mb-0.5">DOUBLE SIDED</span>
                  <span>Dual poster impact panels</span>
                </div>
                <div>
                  <span className="block text-white font-bold text-sm mb-0.5">ZERO EMISSION</span>
                  <span>100% human-powered eco mobility</span>
                </div>
                <div>
                  <span className="block text-white font-bold text-sm mb-0.5">TARGETED ROUTES</span>
                  <span>Direct pedestrian saturation</span>
                </div>
                <div>
                  <span className="block text-white font-bold text-sm mb-0.5">BRAND AMBASSADORS</span>
                  <span>Trained uniformed cyclists</span>
                </div>
              </div>

              {/* CTA */}
              <div>
                <button
                  onClick={() => setAdCycleModalOpen(true)}
                  id="adcycle-explore-cta"
                  className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#CCFF00] hover:text-[#0A0A0A] transition-colors duration-200"
                >
                  <span>SEE AD CYCLE</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Photograph Column: Clean realistic photograph of matte-black StreetBuzz advertising bicycle */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                  <img
                    src={matteBlackAdcycleImg}
                    alt="Matte-black StreetBuzz AdCycle mobile advertising bicycle parked in an urban street setting"
                    className="w-full aspect-[4/3] object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                  />
                </div>

                {/* Minimal tech overlay label */}
                <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-neutral-500 uppercase tracking-widest px-1">
                  <span>STREETBUZZ PATENTED AD-FRAME</span>
                  <span className="text-[#CCFF00]">ACTIVE DEPLOYMENT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          WORK
          White/off-white background.
          Heading: SELECTED WORK
          Show 3–4 large campaign images in an asymmetric editorial layout.
          Do not use generic portfolio cards.
          Each project should simply show:
          CLIENT
          CAMPAIGN NAME
          Example:
          CPDL / BUILDING REPLICA CAMPAIGN
          NASEEM PERFUME / OUTDOOR BRAND CAMPAIGN
          LOCAL BRAND / STREET ACTIVATION
          Use large photography with lots of whitespace.
      -------------------------------------------------- */}
      <section id="work" className="py-28 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/15 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/60 mb-2">PORTFOLIO ARCHIVE</p>
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">SELECTED WORK</h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-black/60 uppercase tracking-widest">
            REAL IMPACT // REAL STREETS
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`${project.aspect} flex flex-col group cursor-pointer`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="overflow-hidden bg-neutral-200 border border-black/10 relative">
                <img
                  src={project.image}
                  alt={`${project.client} - ${project.campaign}`}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Subtle corner badge */}
                <div className="absolute top-4 right-4 bg-[#0A0A0A]/90 text-[#CCFF00] px-3 py-1 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW CASE →
                </div>
              </div>

              {/* Minimal Project Details */}
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/50 mb-1">
                    {project.client}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight group-hover:text-neutral-800 transition-colors">
                    {project.campaign}
                  </h3>
                </div>
                <span className="text-xs font-mono text-black/40 group-hover:text-black transition-colors pt-1">
                  0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Quote */}
        <div className="mt-24 pt-12 border-t border-black/10 flex flex-col sm:flex-row items-baseline justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/60">
            BANGLADESH & CHATTOGRAM URBAN DEPLOYMENTS
          </p>
          <button
            onClick={() => handleOpenTalk()}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A0A0A] hover:text-black/70 flex items-center gap-2 group"
          >
            <span>DISCUSS A SIMILAR ROLLOUT</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>

      {/* --------------------------------------------------
          ABOUT
          Minimal section.
          Heading: THE CITY IS OUR CANVAS.
          Copy:
          StreetBuzz is a creative outdoor marketing company helping brands turn
          everyday streets and public spaces into opportunities for attention,
          interaction and connection.
          We believe great advertising doesn't always need a screen.
          Sometimes it just needs to be outside.
      -------------------------------------------------- */}
      <section id="about" className="bg-white border-y border-black/10 py-28 sm:py-36 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-5">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.24em] text-black/60 mb-4">
                WHO WE ARE
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[0.94]">
                THE CITY<br />
                IS OUR<br />
                CANVAS.
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="space-y-6 text-xl sm:text-2xl text-[#222222] font-normal leading-relaxed">
                <p>
                  StreetBuzz is a creative outdoor marketing company helping brands turn everyday streets and public spaces into opportunities for attention, interaction and connection.
                </p>
                <p className="text-[#0A0A0A] font-bold text-2xl sm:text-3xl">
                  We believe great advertising doesn't always need a screen.
                </p>
                <p className="text-xl sm:text-2xl text-neutral-600">
                  Sometimes it just needs to be outside.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-black/10 flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-black/60">
                <span>EST. CHATTOGRAM</span>
                <span>•</span>
                <span>SMALL TEAM. BIG IDEAS.</span>
                <span>•</span>
                <span>OUT IN THE REAL WORLD.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          WHY STREETBUZZ
          Use four simple statements in a clean grid:
          CREATIVE FIRST - We start with the idea.
          REAL WORLD - We take brands beyond screens.
          FLEXIBLE - Campaigns designed around your audience.
          MEMORABLE - Built to make people notice.
      -------------------------------------------------- */}
      <section id="why-streetbuzz" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-black/60 block mb-2">PRINCIPLES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">WHY STREETBUZZ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          <div className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">01</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">CREATIVE FIRST</h3>
              <p className="text-base text-[#222222] leading-relaxed">We start with the idea.</p>
            </div>
            <div className="w-6 h-[2px] bg-[#CCFF00] mt-8" />
          </div>

          <div className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">02</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">REAL WORLD</h3>
              <p className="text-base text-[#222222] leading-relaxed">We take brands beyond screens.</p>
            </div>
            <div className="w-6 h-[2px] bg-[#CCFF00] mt-8" />
          </div>

          <div className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">03</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">FLEXIBLE</h3>
              <p className="text-base text-[#222222] leading-relaxed">Campaigns designed around your audience.</p>
            </div>
            <div className="w-6 h-[2px] bg-[#CCFF00] mt-8" />
          </div>

          <div className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">04</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">MEMORABLE</h3>
              <p className="text-base text-[#222222] leading-relaxed">Built to make people notice.</p>
            </div>
            <div className="w-6 h-[2px] bg-[#CCFF00] mt-8" />
          </div>

        </div>
      </section>

      {/* --------------------------------------------------
          FINAL CTA
          Black background.
          Large white typography:
          HAVE A
          BRAND TO
          MOVE?
          Make "MOVE?" neon lime.
          Small text:
          Tell us what you want people to notice.
          Button:
          LET'S TALK →
      -------------------------------------------------- */}
      <section id="contact" className="bg-[#0A0A0A] text-white py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-neutral-400 block mb-6">
                GET OUTSIDE // MAKE NOISE
              </span>

              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] mb-8">
                HAVE A<br />
                BRAND TO<br />
                <span className="text-[#CCFF00]">MOVE?</span>
              </h2>

              <p className="text-lg sm:text-2xl text-neutral-300 font-normal leading-relaxed max-w-xl mb-10">
                Tell us what you want people to notice.
              </p>

              <div>
                <button
                  onClick={() => handleOpenTalk()}
                  id="final-cta-talk-btn"
                  className="inline-flex items-center gap-4 bg-[#CCFF00] text-[#0A0A0A] text-sm sm:text-base font-extrabold uppercase tracking-[0.2em] px-10 py-5 hover:bg-white transition-colors"
                >
                  <span>LET'S TALK</span>
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>

            {/* Quick Contact Coordinates */}
            <div className="lg:col-span-4 lg:border-l lg:border-neutral-800 lg:pl-12 space-y-8 text-neutral-400 font-mono text-xs">
              <div>
                <p className="text-white uppercase font-bold tracking-widest text-[11px] mb-1">DIRECT INQUIRIES</p>
                <a href="mailto:hello@wearestreetbuzz.com" className="hover:text-[#CCFF00] transition-colors text-sm text-neutral-200">
                  hello@wearestreetbuzz.com
                </a>
              </div>

              <div>
                <p className="text-white uppercase font-bold tracking-widest text-[11px] mb-1">OPERATING REGION</p>
                <p className="text-neutral-300">Chattogram & Dhaka, Bangladesh</p>
                <p className="text-neutral-500 mt-0.5">High-footfall commercial & pedestrian networks</p>
              </div>

              <div>
                <p className="text-white uppercase font-bold tracking-widest text-[11px] mb-1">BRAND MANTRA</p>
                <p className="text-[#CCFF00] font-sans font-extrabold text-sm tracking-wide">
                  MAKE NOISE OUTSIDE.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          FOOTER
          Minimal.
          StreetBuzz logo
          MAKE NOISE OUTSIDE.
          WORK
          SERVICES
          ABOUT
          CONTACT
          hello@wearestreetbuzz.com
          www.wearestreetbuzz.com
          Instagram
          Facebook
          LinkedIn
      -------------------------------------------------- */}
      <footer className="bg-[#0A0A0A] text-white pt-16 pb-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-neutral-800 gap-8">
            {/* StreetBuzz logo & Motto */}
            <div>
              <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight">
                <span>STREETBUZZ</span>
                <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mt-2">
                MAKE NOISE OUTSIDE.
              </p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap gap-8 text-xs font-bold uppercase tracking-[0.18em]">
              <a href="#work" className="text-neutral-400 hover:text-[#CCFF00] transition-colors">WORK</a>
              <a href="#services" className="text-neutral-400 hover:text-[#CCFF00] transition-colors">SERVICES</a>
              <a href="#about" className="text-neutral-400 hover:text-[#CCFF00] transition-colors">ABOUT</a>
              <button onClick={() => handleOpenTalk()} className="text-neutral-400 hover:text-[#CCFF00] transition-colors uppercase">
                CONTACT
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-neutral-500 font-mono">
            {/* Contact links */}
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:hello@wearestreetbuzz.com" className="hover:text-white transition-colors">
                hello@wearestreetbuzz.com
              </a>
              <span>•</span>
              <a href="https://www.wearestreetbuzz.com" className="hover:text-white transition-colors">
                www.wearestreetbuzz.com
              </a>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-6 uppercase tracking-wider text-xs">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition-colors">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-600 font-mono">
            <p>© {new Date().getFullYear()} STREETBUZZ OUTDOOR MEDIA. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED FOR THE REAL WORLD.</p>
          </div>

        </div>
      </footer>

      {/* --------------------------------------------------
          MODAL: LET'S TALK / CAMPAIGN INQUIRY
      -------------------------------------------------- */}
      {talkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-[#0A0A0A] w-full max-w-xl p-8 sm:p-10 border border-black shadow-2xl relative">
            <button
              onClick={() => setTalkModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-black/50 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {formSubmitted ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 bg-[#CCFF00] text-black flex items-center justify-center mx-auto mb-5 rounded-full font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">WE HEAR YOU.</h3>
                <p className="text-[#222222] text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Thanks for reaching out about <span className="font-bold">{formData.brandName || 'your brand'}</span>. A StreetBuzz campaign strategist will connect within 24 hours.
                </p>
                <div className="p-4 bg-[#F7F7F5] border border-black/10 text-xs font-mono text-left mb-6">
                  <p><span className="text-black/50 uppercase">Format:</span> {formData.format}</p>
                  <p><span className="text-black/50 uppercase">Market:</span> {formData.city}</p>
                  <p><span className="text-black/50 uppercase">Contact:</span> {formData.email}</p>
                </div>
                <button
                  onClick={() => setTalkModalOpen(false)}
                  className="px-6 py-3 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80"
                >
                  CLOSE WINDOW
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-black/50 block mb-1">
                    START A CONVERSATION
                  </span>
                  <h3 className="text-3xl font-extrabold uppercase tracking-tight">
                    LET'S TALK OUTDOOR.
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Brief us on your campaign idea, timeline, or preferred format.
                  </p>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                      Brand / Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corp"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-[#F7F7F5]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="brand@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-[#F7F7F5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                        Format
                      </label>
                      <select
                        value={formData.format}
                        onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                        className="w-full px-3 py-3 border border-black/20 focus:border-black focus:outline-none bg-[#F7F7F5]"
                      >
                        <option value="AdCycle — Mobile Advertising Bicycle">AdCycle (Bicycle Media)</option>
                        <option value="Outdoor Advertising">Outdoor Advertising (OOH)</option>
                        <option value="Guerrilla Marketing">Guerrilla Marketing</option>
                        <option value="Experiential Marketing">Experiential Marketing</option>
                        <option value="Brand Activations">Brand Activations</option>
                        <option value="Custom Outdoor Campaigns">Custom Media Installation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                        Market / City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-3 border border-black/20 focus:border-black focus:outline-none bg-[#F7F7F5]"
                      >
                        <option value="Chattogram">Chattogram</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Multi-city Bangladesh">Multi-city Bangladesh</option>
                        <option value="International / Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                      Brief Goals / Audience Note
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What would you like people to notice? (Target launch, footfall corridor, or core message)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-[#F7F7F5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0A0A0A] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#CCFF00] hover:text-[#0A0A0A] transition-colors mt-2"
                  >
                    SEND INQUIRY →
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --------------------------------------------------
          MODAL: ADCYCLE DETAIL SHOWCASE
      -------------------------------------------------- */}
      {adCycleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0A0A] text-white w-full max-w-3xl p-8 sm:p-10 border border-neutral-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAdCycleModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#CCFF00] block mb-2">
                SIGNATURE MOBILE FORMAT
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                ADCYCLE SPECIFICATION
              </h3>
              <p className="text-neutral-400 text-sm mt-2">
                The high-dwell-time mobile media bicycle built specifically for congested city streets and pedestrian zones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="border border-neutral-800 p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-[#CCFF00] uppercase block mb-1">DISPLAY ARCHITECTURE</span>
                <p className="font-bold text-base mb-1">Dual-Facing Poster Frame</p>
                <p className="text-xs text-neutral-400">
                  120cm × 180cm high-resolution weather-resistant display panels with internal solar LED backlighting for dusk/night visibility.
                </p>
              </div>

              <div className="border border-neutral-800 p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-[#CCFF00] uppercase block mb-1">MOBILITY ADVANTAGE</span>
                <p className="font-bold text-base mb-1">100% Pedestrian Access</p>
                <p className="text-xs text-neutral-400">
                  Navigates pedestrian promenades, college campuses, shopping streets, and festival zones where standard vehicles are restricted.
                </p>
              </div>

              <div className="border border-neutral-800 p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-[#CCFF00] uppercase block mb-1">ENGAGEMENT READY</span>
                <p className="font-bold text-base mb-1">Interactive Dispensing</p>
                <p className="text-xs text-neutral-400">
                  Equipped with clean flyer dispensers and brand ambassadors trained to distribute samples and conduct live consumer conversations.
                </p>
              </div>

              <div className="border border-neutral-800 p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-[#CCFF00] uppercase block mb-1">TRACKING & DATA</span>
                <p className="font-bold text-base mb-1">Route GPS & Audit Logs</p>
                <p className="text-xs text-neutral-400">
                  Live GPS route tracking and geotagged timestamp photo proof of performance supplied for every campaign shift.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">
                CUSTOM MATTE-BLACK FLEETS READY FOR DEPLOYMENT
              </span>
              <button
                onClick={() => {
                  setAdCycleModalOpen(false);
                  handleOpenTalk('AdCycle — Mobile Advertising Bicycle');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#CCFF00] text-[#0A0A0A] text-xs font-extrabold uppercase tracking-widest hover:bg-white transition-colors"
              >
                BOOK ADCLE FLEET →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------
          MODAL: PROJECT DETAIL VIEW
      -------------------------------------------------- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-[#0A0A0A] w-full max-w-2xl p-6 sm:p-8 border border-black shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 text-black/50 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-black/50 block mb-1">
                {selectedProject.client}
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight">
                {selectedProject.campaign}
              </h3>
              <p className="text-xs font-mono text-black/60 mt-1 uppercase">
                {selectedProject.tag} // {selectedProject.location}
              </p>
            </div>

            <div className="overflow-hidden bg-neutral-100 border border-black/10 my-4 aspect-[16/10]">
              <img
                src={selectedProject.image}
                alt={selectedProject.campaign}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-base text-[#222222] leading-relaxed my-4">
              {selectedProject.summary}
            </p>

            <div className="pt-4 border-t border-black/10 flex justify-between items-center">
              <span className="text-xs font-mono text-black/50">STREETBUZZ FIELD ARCHIVE</span>
              <button
                onClick={() => {
                  const client = selectedProject.client;
                  setSelectedProject(null);
                  handleOpenTalk(`Campaign like ${client}`);
                }}
                className="px-5 py-2.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#CCFF00] hover:text-black transition-colors"
              >
                REQUEST CASE DECK →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

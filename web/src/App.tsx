/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Menu, ArrowUpRight, ArrowUp, Mail } from 'lucide-react';

import { content } from '@/content';
import type { ProjectItem } from '@/content';

// Hero and AdCycle photography is still bundled locally. Campaign shots for the
// portfolio and services are supplied by the client via Sanity — see
// src/content/ and scripts/sync-content.mjs.
import heroAdcycleImg from './assets/images/adcycle_hero_1789635455161.jpg';
import matteBlackAdcycleImg from './assets/images/adcycle_matte_black_1789635469186.jpg';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  /** Indicative elapsed time for this phase, shown in the card footer.
   *  Placeholder values — confirm against a real engagement before launch. */
  timeline: string;
}

export default function App() {
  const { services, projects, adCycleZones, siteSettings } = content;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(0);
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const [adCycleModalOpen, setAdCycleModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('ALL');

  // Form submission state
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    phone: '',
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

  // `services`, `projects`, `adCycleZones` and `siteSettings` now come from the
  // CMS content layer (`@/content`): Sanity when configured, committed fallback
  // otherwise. See src/content/index.ts.

  // Ported from design 2 (Client Preference/2/src/data.ts PROCESS_STEPS).
  const processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'THE BRIEF',
      description: 'Tell us what you want people to notice.',
      detail:
        'We unpack your brand objectives, cultural audience, target timing, and the exact physical spaces where your message will generate the strongest emotional resonance.',
      timeline: 'Day 1',
    },
    {
      number: '02',
      title: 'THE IDEA',
      description: 'We build the creative concept.',
      detail:
        'Our creative team crafts unconventional physical concepts, arresting copy, and unexpected visual treatments specifically engineered for high-distraction outdoor environments.',
      timeline: 'Day 2',
    },
    {
      number: '03',
      title: 'THE PLAN',
      description: 'We choose the right outdoor format and locations.',
      detail:
        'From mobile bicycle OOH to experiential pop-ups and guerrilla installations, we map out pedestrian density, transit heatmaps, and optimal route schedules.',
      timeline: 'Day 3',
    },
    {
      number: '04',
      title: 'THE STREET',
      description: 'We put the idea into the real world.',
      detail:
        'Production, fabrication, staffing, and live dispatch. Our brand ambassadors and mobile units hit the streets with precision execution and real-time GPS tracking.',
      timeline: 'Day 4 onwards',
    },
    {
      number: '05',
      title: 'THE BUZZ',
      description: 'People notice, interact and remember.',
      detail:
        'The campaign creates tangible friction in everyday routines. People look up, snap photos, share online, and talk about the brand long after they walk by.',
      timeline: 'Post-Flight',
    },
  ];

  // Portfolio projects come from the CMS content layer. Tags drive the derived
  // filter pills below: a tag earns a pill once 2+ projects carry it, so the
  // list grows on its own as the portfolio does and can never desync.

  // Filter pills, derived. A tag earns a pill once 2+ projects carry it, so the
  // list grows on its own as the portfolio does and can never desync.
  const projectFilters = [
    'ALL',
    ...Object.entries(
      projects.flatMap((p) => p.tags).reduce<Record<string, number>>((acc, t) => {
        acc[t] = (acc[t] ?? 0) + 1;
        return acc;
      }, {}),
    )
      .filter(([, count]) => count > 1)
      .map(([tag]) => tag)
      .sort(),
  ];

  const visibleProjects =
    projectFilter === 'ALL' ? projects : projects.filter((p) => p.tags.includes(projectFilter));

  // Form dropdowns come from Site Settings. If the CMS lists are empty, keep the
  // currently selected value as the only option so the controlled select never
  // renders blank.
  const formatOptions =
    siteSettings.formFormatOptions.length > 0
      ? siteSettings.formFormatOptions
      : [formData.format];
  const cityOptions =
    siteSettings.formCityOptions.length > 0 ? siteSettings.formCityOptions : [formData.city];

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setFormStatus('error');
      setFormError('The inquiry form is not configured yet (missing Web3Forms access key).');
      return;
    }

    setFormStatus('submitting');
    setFormError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New StreetBuzz Inquiry — ${formData.brandName || 'Untitled brand'}`,
          from_name: 'StreetBuzz Website',
          brand: formData.brandName,
          email: formData.email,
          phone: formData.phone,
          format: formData.format,
          city: formData.city,
          message: formData.message,
          botcheck: false,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
        setFormError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setFormError('Network error. Please check your connection and try again.');
    }
  };

  const handleOpenTalk = (formatName?: string) => {
    if (formatName) {
      setFormData(prev => ({ ...prev, format: formatName }));
    }
    setFormStatus('idle');
    setFormError('');
    setTalkModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-lime selection:text-ink">

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
        className={`fixed top-0 left-0 right-0 z-50 px-gutter transition-all duration-300 ${
          isScrolled 
            ? 'bg-ink text-chalk border-b border-edge shadow-md py-4' 
            : 'bg-canvas text-ink border-b border-black/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: StreetBuzz logo */}
          <a 
            href="#" 
            id="nav-logo" 
            className="flex items-center gap-1.5 group font-extrabold text-xl sm:text-2xl tracking-tight"
          >
            <span className="transition-colors group-hover:opacity-80">STREETBUZZ</span>
            <span className="w-2 h-2 rounded-full bg-lime inline-block mb-1 group-hover:scale-125 transition-transform" />
          </a>

          {/* CENTER: WORK, SERVICES, ABOUT (Desktop) */}
          <div className="hidden md:flex items-center gap-10 text-xs font-semibold uppercase tracking-nav">
            <a 
              href="#work" 
              id="nav-link-work"
              className="hover:text-lime transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-lime hover:after:w-full after:transition-all"
            >
              Work
            </a>
            <a 
              href="#services" 
              id="nav-link-services"
              className="hover:text-lime transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-lime hover:after:w-full after:transition-all"
            >
              Services
            </a>
            <a 
              href="#adcycle" 
              id="nav-link-adcycle"
              className="hover:text-lime transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-lime hover:after:w-full after:transition-all"
            >
              AdCycle
            </a>
            <a 
              href="#about" 
              id="nav-link-about"
              className="hover:text-lime transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-lime hover:after:w-full after:transition-all"
            >
              About
            </a>
          </div>

          {/* RIGHT: LET'S TALK → */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenTalk()}
              id="nav-cta-btn"
              className={`hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-meta px-5 py-2.5 transition-all ${
                isScrolled
                  ? 'bg-lime text-ink hover:bg-canvas hover:text-black'
                  : 'bg-ink text-chalk hover:bg-black/85'
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
          <div className={`md:hidden pt-4 pb-6 border-t ${isScrolled ? 'bg-ink text-chalk border-edge' : 'bg-canvas text-ink border-black/10'}`}>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-nav">
              <a 
                href="#work" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:text-lime"
              >
                Work
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:text-lime"
              >
                Services
              </a>
              <a 
                href="#adcycle" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:text-lime"
              >
                AdCycle
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/5 hover:text-lime"
              >
                About
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenTalk();
                }}
                className="mt-2 w-full py-3 bg-lime text-ink font-bold text-center uppercase tracking-wider"
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
      <section id="hero-section" className="pt-hero-top pb-hero-bottom px-gutter">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          
          {/* Hero Typography Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Small label above */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-ink" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-label text-ink/70">
                CREATIVE OUTDOOR MARKETING
              </p>
            </div>

            {/* Large headline */}
            <h1 className="text-hero font-extrabold tracking-mega leading-mega uppercase mb-8 sm:mb-10 select-none">
              MAKE<br />
              <span className="inline-block bg-ink text-lime px-3 sm:px-4 py-1 mt-1 mb-1 font-black transform -rotate-1 origin-left">
                NOISE
              </span><br />
              OUTSIDE.
            </h1>

            {/* Short description */}
            <p className="text-lg sm:text-xl text-body font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              We create outdoor advertising and real-world brand experiences that people notice.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => handleOpenTalk()}
                id="hero-start-campaign-cta"
                className="group inline-flex items-center gap-3 bg-ink text-chalk text-xs sm:text-sm font-bold uppercase tracking-btn px-8 py-4 hover:bg-lime hover:text-ink transition-colors duration-200"
              >
                <span>START A CAMPAIGN</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              <a
                href="#services"
                className="text-xs font-bold uppercase tracking-nav text-ink/70 hover:text-ink underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all"
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
                  className="w-6 h-6 text-ink mt-1 shrink-0 -rotate-12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.8"
                >
                  <path d="M4 12c4-2 8-3 14 0m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-hand text-2xl sm:text-3xl text-ink leading-tight font-bold tracking-wide">
                  CREATIVE ADVERTISING THAT MOVES.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------
          PROCESS
          Ported from design 2 (Client Preference/2/src/components/ProcessSection.tsx).
          Tone is CANVAS (white), not design 2's cream: this sits between the
          off-white hero and the white Introduction band, and cream here would
          merge straight into the hero. The border-y hairline is design 1's own
          idiom for separating stacked white bands.
          Two fixes over design 2:
          - it jumped 1 col -> 5 cols at md, squeezing five 300px-tall cells into
            768px. Now steps up 1 -> 2 -> 3 -> 5.
          Design 2's header meta row (// SECTION 08 / 05 PHASES TO IMPACT) is
          dropped, and its "PHASE 0N" card footer is replaced by a per-step
          TIMELINE value carried in the data.
      -------------------------------------------------- */}
      <section id="process" className="bg-canvas border-y border-black/10 py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="border-b border-ink pb-8 mb-16">
            <h2 className="text-display font-black uppercase tracking-display leading-display text-ink">
              FROM BRIEF<br />
              TO STREET.
            </h2>
          </div>

          {/* Hairline grid of phases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-ink/10 border border-ink/10">
            {processSteps.map((step) => (
              <div
                key={step.number}
                id={`process-step-${step.number}`}
                className="group flex flex-col justify-between min-h-[300px] p-6 sm:p-8 bg-canvas hover:bg-paper-2 transition-colors"
              >
                <div>
                  <span className="block w-fit font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter bg-lime text-ink px-3 py-1 mb-6 transition-colors group-hover:bg-ink group-hover:text-lime">
                    {step.number}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-ink mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm font-semibold text-ink leading-snug mb-3">
                    {step.description}
                  </p>

                  <p className="text-xs text-mute leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {/* 10px and no label tracking: max-w-7xl caps the grid, so the
                    5-across cells are ~166px of content at ANY screen width, and
                    "TIMELINE: DAY 4 ONWARDS" does not fit at 11px. */}
                <div className="pt-6 mt-6 border-t border-ink/10 flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="uppercase text-mute shrink-0">TIMELINE:</span>
                  <span className="font-bold uppercase whitespace-nowrap text-ink group-hover:text-lime group-hover:bg-ink px-1.5 py-0.5 -mr-1.5 transition-colors">
                    {step.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          STATEMENT
          Ported from design 2 (Client Preference/2/src/components/StatementSection.tsx).
          Sits 3rd, between Process (white) and Introduction (white) — the black
          band is what stops those two merging into one white slab.
          The lime dot-grid uses the bg-grain-lime @utility from the token layer
          rather than design 2's inline arbitrary radial-gradient.
          Headline uses the fluid text-statement token in place of design 2's
          lg:text-[5.5rem] cliff.
      -------------------------------------------------- */}
      <section
        id="statement"
        className="relative overflow-hidden bg-ink text-chalk py-24 sm:py-32 px-gutter"
      >
        {/* Lime dot-grid wash */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-grain-lime" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink-4 text-lime text-xs font-mono font-bold uppercase tracking-label border border-edge-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
              THE STREET IS MEDIA.
            </span>
          </div>

          <div className="max-w-5xl">
            <h2 className="text-statement font-black uppercase tracking-display leading-display text-chalk">
              THE STREET<br />
              <span className="text-chalk/50">ISN&rsquo;T EMPTY SPACE.</span>
            </h2>

            {/* Staccato rhythm */}
            <div className="my-12 sm:my-16 md:my-20 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 font-mono text-base sm:text-xl md:text-2xl text-chalk-2">
              <span className="text-chalk font-bold">It&rsquo;s where people</span>
              {['walk.', 'Wait.', 'Meet.', 'Look.', 'Live.'].map((verb, idx, arr) => (
                <span key={verb} className="inline-flex items-center gap-3 sm:gap-4 cursor-default">
                  <span className="text-lime font-black" aria-hidden="true">/</span>
                  <span className="text-chalk hover:text-lime transition-colors font-medium">
                    {verb}
                  </span>
                  {idx === arr.length - 1 && (
                    <span className="w-2.5 h-2.5 bg-lime inline-block ml-1" aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>

            {/* Payoff */}
            <div className="pt-8 sm:pt-12 border-t border-edge flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-lime">
                WE TURN IT INTO MEDIA.
              </h3>
              <p className="max-w-md text-sm sm:text-base text-chalk-2 leading-relaxed">
                Every crosswalk, plaza, and pedestrian lane holds undivided cultural attention waiting to be activated. We engineer that connection.
              </p>
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
      <section id="services" className="py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/15 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-label text-black/60 mb-2">SERVICES & CAPABILITIES</p>
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
                        isSelected ? 'text-ink' : 'text-neutral-800 group-hover:text-black'
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider transition-opacity ${
                        isSelected ? 'opacity-100 text-ink' : 'opacity-0 group-hover:opacity-100 text-black/50'
                      }`}>
                        EXPLORE
                      </span>
                      <span className={`text-lg transition-transform ${isSelected ? 'translate-x-1 text-ink' : 'text-black/30'}`}>
                        →
                      </span>
                    </div>
                  </div>

                  {/* Inline description visible on mobile or when selected */}
                  <div className={`mt-3 sm:hidden text-sm text-body font-normal pl-8`}>
                    <p>{item.description}</p>
                    <p className="text-xs font-mono text-black/60 mt-1 uppercase">{item.formatDetail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Live Dynamic Preview Box (No complex cards, pure editorial preview) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 bg-canvas border border-black/15 p-6 shadow-sm">
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

                  <p className="text-sm text-body leading-relaxed mb-4">
                    {services[hoveredService].description}
                  </p>

                  <div className="pt-3 border-t border-black/10 text-xs font-mono text-black/70">
                    <p className="uppercase tracking-wide font-semibold text-[10px] text-black/40 mb-1">Execution Formats:</p>
                    <p>{services[hoveredService].formatDetail}</p>
                  </div>

                  <button
                    onClick={() => handleOpenTalk(services[hoveredService].title)}
                    className="mt-5 w-full py-2.5 bg-ink text-chalk text-xs font-bold uppercase tracking-meta hover:bg-lime hover:text-ink transition-colors"
                  >
                    INQUIRE FORMAT →
                  </button>
                </div>
              )}
            </div>
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
      <section id="adcycle" className="bg-ink text-chalk py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Small label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-lime" />
                <span className="text-xs font-bold uppercase tracking-label text-chalk/70">
                  ONE OF OUR FORMATS
                </span>
              </div>

              {/* Large headline */}
              <h2 className="text-display font-extrabold uppercase tracking-display leading-display mb-8">
                ADVERTISING<br />
                <span className="text-lime">THAT MOVES.</span>
              </h2>

              {/* Short text */}
              <p className="text-lg sm:text-xl text-chalk-2 font-normal leading-relaxed mb-8 max-w-xl">
                Our mobile advertising bicycle takes your brand message directly into streets, campuses, events and high-footfall locations.
              </p>

              {/* Clean key specs list */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-edge mb-8 text-xs font-mono text-chalk-3">
                <div>
                  <span className="block text-chalk font-bold text-sm mb-0.5">DOUBLE SIDED</span>
                  <span>Dual poster impact panels</span>
                </div>
                <div>
                  <span className="block text-chalk font-bold text-sm mb-0.5">ZERO EMISSION</span>
                  <span>100% human-powered eco mobility</span>
                </div>
                <div>
                  <span className="block text-chalk font-bold text-sm mb-0.5">TARGETED ROUTES</span>
                  <span>Direct pedestrian saturation</span>
                </div>
                <div>
                  <span className="block text-chalk font-bold text-sm mb-0.5">BRAND AMBASSADORS</span>
                  <span>Trained uniformed cyclists</span>
                </div>
              </div>

              {/* CTA */}
              <div>
                <button
                  onClick={() => setAdCycleModalOpen(true)}
                  id="adcycle-explore-cta"
                  className="inline-flex items-center gap-3 bg-canvas text-ink text-xs sm:text-sm font-bold uppercase tracking-btn px-8 py-4 hover:bg-lime hover:text-ink transition-colors duration-200"
                >
                  <span>SEE AD CYCLE</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Photograph Column: Clean realistic photograph of matte-black StreetBuzz advertising bicycle */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="overflow-hidden border border-edge bg-neutral-900 shadow-2xl">
                  <img
                    src={matteBlackAdcycleImg}
                    alt="Matte-black StreetBuzz AdCycle mobile advertising bicycle parked in an urban street setting"
                    className="w-full aspect-[4/3] object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                  />
                </div>

                {/* Minimal tech overlay label */}
                <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-neutral-500 uppercase tracking-widest px-1">
                  <span>STREETBUZZ PATENTED AD-FRAME</span>
                  <span className="text-lime">ACTIVE DEPLOYMENT</span>
                </div>
              </div>
            </div>

          </div>

          {/* Deployment coverage */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-edge">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-lime" aria-hidden="true" />
                <h3 className="text-xs font-bold uppercase tracking-label text-chalk">
                  DEPLOYMENT COVERAGE
                </h3>
              </div>
              <span className="text-xs font-mono uppercase tracking-meta text-chalk-3">
                {adCycleZones.reduce((n, z) => n + z.areas.length, 0)} ACTIVE ZONES &middot;{' '}
                {adCycleZones.length} CITIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-edge border border-edge">
              {adCycleZones.map((zone) => (
                <div key={zone.city} className="bg-ink-2 p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-chalk">
                      {zone.city}
                    </h4>
                    <span className="text-[11px] font-mono text-lime shrink-0">
                      {String(zone.areas.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-meta text-chalk-3 mb-5">
                    {zone.note}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {zone.areas.map((area) => (
                      <li
                        key={area}
                        className="text-xs font-mono px-2.5 py-1 bg-ink-3 border border-edge text-chalk-2 hover:border-lime hover:text-lime transition-colors"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs font-mono text-chalk-3">
              Custom routes available on request &mdash; we map pedestrian density and
              dwell time to your campaign before dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          WORK
          Ported from design 2 (Client Preference/2/src/components/PortfolioSection.tsx),
          projects and copy verbatim, retokenised.
          Two fixes applied on the way in:
          - filter pills are DERIVED from tags, not design 2's hardcoded 5-entry
            list that silently desyncs from the data
          - the CONCEPT badge is per-project (isConcept), not unconditional.
            Design 2's header chip ("ALL LABELED AS: CONCEPT") is dropped; the
            per-card badges carry the labelling on their own.
      -------------------------------------------------- */}
      <section id="work" className="py-28 sm:py-36 px-gutter">
        <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="border-b border-ink pb-8 mb-12">
          <span className="block text-xs font-mono font-bold uppercase tracking-label text-mute mb-4">
            PORTFOLIO ARCHIVE
          </span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-display font-black uppercase tracking-display leading-display text-ink">
              IDEAS LOOK BETTER<br />
              OUTSIDE.
            </h2>

            {/* Filter pills — derived from the data, never hardcoded */}
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setProjectFilter(cat)}
                  aria-pressed={projectFilter === cat}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-meta transition-colors ${
                    projectFilter === cat
                      ? 'bg-ink text-lime'
                      : 'bg-paper-2 text-ink hover:bg-paper-3'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial campaign cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="group flex flex-col justify-between bg-paper-2 border border-ink/10 hover:border-ink transition-all p-4 sm:p-6"
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10] bg-ink mb-6">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {project.isConcept && (
                    <span className="absolute top-3 left-3 bg-ink text-lime text-[10px] font-mono font-bold uppercase tracking-label px-2.5 py-1">
                      CONCEPT
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 bg-ink/90 text-chalk text-[10px] font-mono uppercase tracking-meta px-2 py-0.5 backdrop-blur-xs">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink">
                    {project.title}
                  </h3>
                  <span className="p-2 bg-ink text-chalk group-hover:bg-lime group-hover:text-ink transition-colors shrink-0 leading-none">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>

                <p className="text-xs font-mono font-bold uppercase tracking-meta text-mute mb-3">
                  {project.category}
                </p>

                <p className="text-sm text-body leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono uppercase tracking-meta px-2 py-0.5 bg-paper-3 text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono font-bold uppercase text-ink inline-flex items-center gap-1 hover:text-lime hover:bg-ink px-2 py-1 transition-colors"
                >
                  VIEW CONCEPT
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom editorial row */}
        <div className="mt-20 pt-12 border-t border-ink/10 flex items-baseline">
          <button
            onClick={() => handleOpenTalk()}
            className="text-xs font-bold uppercase tracking-btn text-ink hover:text-mute flex items-center gap-2 group"
          >
            <span>DISCUSS A SIMILAR ROLLOUT</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </button>
        </div>
        </div>
      </section>

      {/* --------------------------------------------------
          ABOUT
          Ported from design 2 (Client Preference/2/src/components/AboutSection.tsx),
          copy verbatim, retokenised. Band kept WHITE (canvas) rather than design 2's
          cream so the paper -> canvas -> paper alternation survives; without it
          Work, About and Why become three identical light bands in a row.
          Headline uses the fluid text-display token, NOT design 2's lg:text-8xl —
          at 96px "INTERESTING" overflows its 6-col container and gets clipped by
          body{overflow-x:hidden}, the same latent bug the hero had.
      -------------------------------------------------- */}
      <section id="about" className="bg-canvas border-y border-black/10 py-28 sm:py-36 px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Headline & identity */}
            <div className="lg:col-span-6">
              <span
                id="about-label"
                className="inline-block text-xs font-mono font-bold uppercase tracking-label text-mute mb-4"
              >
                WHO WE ARE
              </span>

              <h2
                id="about-headline"
                className="text-display font-black uppercase tracking-display leading-display text-ink"
              >
                WE MAKE<br />
                OUTDOOR<br />
                <span className="inline-block relative">
                  INTERESTING
                  <span className="text-lime bg-ink px-2 py-0.5 ml-2 text-2xl sm:text-3xl align-middle">.</span>
                </span>
              </h2>

              <div className="mt-8 flex items-center gap-3">
                <span className="w-3 h-3 rounded-xs bg-lime shrink-0" />
                <span className="text-xs font-mono font-bold uppercase tracking-meta text-ink">
                  ESTABLISHED 2026 / INDEPENDENT CREATIVE AGENCY
                </span>
              </div>
            </div>

            {/* Manifesto card */}
            <div className="lg:col-span-6 lg:pt-8">
              <div className="p-8 sm:p-10 bg-paper-2 border border-ink/10 space-y-6">
                <p className="text-lg sm:text-2xl font-bold text-ink leading-snug">
                  STREETBUZZ is a creative outdoor marketing agency built around one simple idea:
                </p>

                <div className="py-4 px-5 bg-ink text-chalk border-l-4 border-lime">
                  <p className="text-base sm:text-lg font-extrabold uppercase tracking-tight">
                    Brands should not only be seen on screens.<br />
                    <span className="text-lime">They should be experienced in the world around us.</span>
                  </p>
                </div>

                <p className="text-sm sm:text-base text-mute leading-relaxed">
                  We combine creative thinking, outdoor media and real-world experiences to help brands become part of the places people live, move and gather.
                </p>

                <div className="pt-6 border-t border-ink/10 grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-canvas">
                    <div className="text-xl sm:text-2xl font-black text-ink">01</div>
                    <div className="text-[10px] font-mono font-bold uppercase text-mute">CREATIVITY</div>
                  </div>
                  <div className="p-3 bg-canvas">
                    <div className="text-xl sm:text-2xl font-black text-ink">02</div>
                    <div className="text-[10px] font-mono font-bold uppercase text-mute">CULTURE</div>
                  </div>
                  <div className="p-3 bg-canvas">
                    <div className="text-xl sm:text-2xl font-black text-ink">03</div>
                    <div className="text-[10px] font-mono font-bold uppercase text-mute">MOVEMENT</div>
                  </div>
                </div>
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
      <section id="why-streetbuzz" className="py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-label text-black/60 block mb-2">PRINCIPLES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">WHY STREETBUZZ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          <div className="border-t-2 border-ink pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">01</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">CREATIVE FIRST</h3>
              <p className="text-base text-body leading-relaxed">We start with the idea.</p>
            </div>
            <div className="w-6 h-[2px] bg-lime mt-8" />
          </div>

          <div className="border-t-2 border-ink pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">02</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">REAL WORLD</h3>
              <p className="text-base text-body leading-relaxed">We take brands beyond screens.</p>
            </div>
            <div className="w-6 h-[2px] bg-lime mt-8" />
          </div>

          <div className="border-t-2 border-ink pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">03</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">FLEXIBLE</h3>
              <p className="text-base text-body leading-relaxed">Campaigns designed around your audience.</p>
            </div>
            <div className="w-6 h-[2px] bg-lime mt-8" />
          </div>

          <div className="border-t-2 border-ink pt-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-black/40 block mb-3">04</span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">MEMORABLE</h3>
              <p className="text-base text-body leading-relaxed">Built to make people notice.</p>
            </div>
            <div className="w-6 h-[2px] bg-lime mt-8" />
          </div>

        </div>
        </div>
      </section>

      {/* --------------------------------------------------
          FINAL CTA
          Ported from design 2 (Client Preference/2/src/components/FinalCtaSection.tsx).
          Tone flipped from design 2's cream to CANVAS: the Why section above is
          off-white and the footer below is black, so cream here would merge
          upward. Canvas keeps paper -> canvas -> ink alternating.
          Headline reuses the existing fluid text-cta token in place of design
          2's lg:text-[6.5rem] cliff.
      -------------------------------------------------- */}
      <section
        id="contact"
        className="bg-canvas border-y border-black/10 py-28 sm:py-36 px-gutter"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <span className="block text-xs font-mono font-bold uppercase tracking-label text-mute mb-6">
              // GET IN TOUCH WITH STREETBUZZ
            </span>

            <h2 className="text-cta font-black uppercase tracking-mega leading-mega text-ink">
              READY TO<br />
              MAKE SOME<br />
              <span className="inline-block">
                NOISE?
                <span className="inline-block ml-3 w-4 h-4 sm:w-6 sm:h-6 bg-lime" aria-hidden="true" />
              </span>
            </h2>

            <p className="mt-8 text-xl sm:text-2xl text-ink font-medium max-w-xl leading-relaxed">
              Tell us what you&rsquo;re trying to make people notice.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                id="final-cta-talk-btn"
                onClick={() => handleOpenTalk()}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-chalk text-sm sm:text-base font-bold uppercase tracking-btn hover:bg-ink-3 transition-colors focus-visible:ring-4 focus-visible:ring-lime"
              >
                <span>START A CAMPAIGN</span>
                <span className="text-lime group-hover:translate-x-1.5 transition-transform text-lg" aria-hidden="true">
                  &rarr;
                </span>
              </button>

              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-ink border-b-2 border-transparent hover:border-lime pb-1 transition-colors"
              >
                <Mail size={18} className="text-mute group-hover:text-ink transition-colors" aria-hidden="true" />
                <span>{siteSettings.contactEmail}</span>
                <ArrowUpRight
                  size={16}
                  className="text-mute group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-ink/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-mute">
              <span>FOR DIRECT INQUIRIES &amp; FOUNDER BRIEFINGS:</span>
              <a
                href={`mailto:${siteSettings.founderEmail}`}
                className="text-ink font-bold underline underline-offset-4 hover:text-mute transition-colors"
              >
                {siteSettings.founderEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          FOOTER
          Ported from design 2 (Client Preference/2/src/components/Footer.tsx).
          Two fixes over design 2:
          - its nav pointed at #what-we-do, #buzz-live and #careers, none of which
            exist here - three of six links were dead. Rewritten to real anchors.
          - its socials linked to bare instagram.com / linkedin.com / facebook.com.
            The real handles were sitting unused in index.html's JSON-LD.
      -------------------------------------------------- */}
      <footer id="main-footer" className="bg-ink text-chalk pt-20 pb-12 px-gutter border-t border-edge">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-edge">

            {/* Brand */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="font-black tracking-tighter text-3xl uppercase text-chalk">
                  STREETBUZZ
                </span>
                <span className="w-2.5 h-2.5 bg-lime" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-meta text-lime mb-4">
                Creative Outdoor Marketing
              </p>
              <p className="text-xs text-chalk-3 max-w-sm leading-relaxed">
                Outdoor advertising, experiential marketing, street activations, mobile OOH campaigns, creative installations, and unconventional real-world brand experiences.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <p className="text-xs font-mono uppercase tracking-label text-chalk-3 mb-4">
                NAVIGATION
              </p>
              <ul className="space-y-2.5 text-sm font-semibold tracking-wide">
                {[
                  { label: 'Work', href: '#work' },
                  { label: 'Services', href: '#services' },
                  { label: 'Process', href: '#process' },
                  { label: 'AdCycle', href: '#adcycle' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-chalk-2 hover:text-lime transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & social */}
            <div className="md:col-span-4 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-label text-chalk-3 mb-4">
                  CONTACT
                </p>
                <a
                  href={`mailto:${siteSettings.contactEmail}`}
                  className="block text-base sm:text-lg font-bold text-chalk hover:text-lime transition-colors mb-6"
                >
                  {siteSettings.contactEmail}
                </a>

                <p className="text-xs font-mono uppercase tracking-label text-chalk-3 mb-3">
                  SOCIAL
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold tracking-wider">
                  {siteSettings.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="uppercase text-chalk-2 hover:text-lime border-b border-edge-2 pb-0.5 transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-edge">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group flex items-center gap-2 text-xs font-mono text-chalk-2 hover:text-lime transition-colors"
                >
                  <span>BACK TO TOP</span>
                  <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-chalk-3">
            <p>&copy; {new Date().getFullYear()} STREETBUZZ. ALL RIGHTS RESERVED.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span>CREATIVE OUTDOOR MARKETING</span>
              <span aria-hidden="true">&bull;</span>
              <span className="text-lime">BUILT FOR THE REAL WORLD</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --------------------------------------------------
          MODAL: LET'S TALK / CAMPAIGN INQUIRY
      -------------------------------------------------- */}
      {talkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-canvas text-ink w-full max-w-xl p-8 sm:p-10 border border-black shadow-2xl relative">
            <button
              onClick={() => setTalkModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-black/50 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {formStatus === 'success' ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 bg-lime text-black flex items-center justify-center mx-auto mb-5 rounded-full font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">WE HEAR YOU.</h3>
                <p className="text-body text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Thanks for reaching out about <span className="font-bold">{formData.brandName || 'your brand'}</span>. A StreetBuzz campaign strategist will connect within 24 hours.
                </p>
                <div className="p-4 bg-paper border border-black/10 text-xs font-mono text-left mb-6">
                  <p><span className="text-black/50 uppercase">Format:</span> {formData.format}</p>
                  <p><span className="text-black/50 uppercase">Market:</span> {formData.city}</p>
                  <p><span className="text-black/50 uppercase">Phone:</span> {formData.phone}</p>
                  <p><span className="text-black/50 uppercase">Contact:</span> {formData.email}</p>
                </div>
                <button
                  onClick={() => setTalkModalOpen(false)}
                  className="px-6 py-3 bg-ink text-chalk text-xs font-bold uppercase tracking-widest hover:bg-black/80"
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
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-paper"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-paper"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-phone" className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                        Mobile Number
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        inputMode="tel"
                        required
                        placeholder="+880 1XXX-XXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-paper"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                        Format
                      </label>
                      <select
                        value={formData.format}
                        onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                        className="w-full px-3 py-3 border border-black/20 focus:border-black focus:outline-none bg-paper"
                      >
                        {formatOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase font-bold tracking-wider text-black/70 mb-1">
                        Market / City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-3 border border-black/20 focus:border-black focus:outline-none bg-paper"
                      >
                        {cityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
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
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none bg-paper"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 bg-ink text-chalk font-bold uppercase tracking-btn hover:bg-lime hover:text-ink transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'SENDING…' : 'SEND INQUIRY →'}
                  </button>

                  {formStatus === 'error' && (
                    <p role="alert" className="text-red-700 font-semibold">
                      {formError}
                    </p>
                  )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-ink text-chalk w-full max-w-3xl p-8 sm:p-10 border border-edge shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAdCycleModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-chalk-3 hover:text-chalk transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-label text-lime block mb-2">
                SIGNATURE MOBILE FORMAT
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                ADCYCLE SPECIFICATION
              </h3>
              <p className="text-chalk-3 text-sm mt-2">
                The high-dwell-time mobile media bicycle built specifically for congested city streets and pedestrian zones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="border border-edge p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-lime uppercase block mb-1">DISPLAY ARCHITECTURE</span>
                <p className="font-bold text-base mb-1">Dual-Facing Poster Frame</p>
                <p className="text-xs text-chalk-3">
                  120cm × 180cm high-resolution weather-resistant display panels with internal solar LED backlighting for dusk/night visibility.
                </p>
              </div>

              <div className="border border-edge p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-lime uppercase block mb-1">MOBILITY ADVANTAGE</span>
                <p className="font-bold text-base mb-1">100% Pedestrian Access</p>
                <p className="text-xs text-chalk-3">
                  Navigates pedestrian promenades, college campuses, shopping streets, and festival zones where standard vehicles are restricted.
                </p>
              </div>

              <div className="border border-edge p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-lime uppercase block mb-1">ENGAGEMENT READY</span>
                <p className="font-bold text-base mb-1">Interactive Dispensing</p>
                <p className="text-xs text-chalk-3">
                  Equipped with clean flyer dispensers and brand ambassadors trained to distribute samples and conduct live consumer conversations.
                </p>
              </div>

              <div className="border border-edge p-5 bg-neutral-900/50">
                <span className="text-[11px] font-mono text-lime uppercase block mb-1">TRACKING & DATA</span>
                <p className="font-bold text-base mb-1">Route GPS & Audit Logs</p>
                <p className="text-xs text-chalk-3">
                  Live GPS route tracking and geotagged timestamp photo proof of performance supplied for every campaign shift.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-edge">
              <span className="text-xs font-mono text-chalk-3">
                CUSTOM MATTE-BLACK FLEETS READY FOR DEPLOYMENT
              </span>
              <button
                onClick={() => {
                  setAdCycleModalOpen(false);
                  handleOpenTalk('AdCycle — Mobile Advertising Bicycle');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-lime text-ink text-xs font-extrabold uppercase tracking-widest hover:bg-canvas transition-colors"
              >
                BOOK ADCYCLE FLEET →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------
          MODAL: PROJECT DETAIL VIEW
      -------------------------------------------------- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-canvas text-ink w-full max-w-2xl p-6 sm:p-8 border border-black shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 text-black/50 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-4 pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-label text-mute">
                  {selectedProject.category}
                </span>
                {selectedProject.isConcept && (
                  <span className="bg-ink text-lime text-[10px] font-mono font-bold uppercase tracking-label px-2 py-0.5">
                    CONCEPT
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-mute mt-1 uppercase">
                SERIES // {selectedProject.year} ARCHIVE
              </p>
            </div>

            <div className="overflow-hidden bg-paper-2 border border-ink/10 my-4 aspect-[16/10]">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} — ${selectedProject.category}`}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-base font-bold text-ink leading-snug mt-4">
              {selectedProject.tagline}
            </p>
            <p className="text-base text-body leading-relaxed my-4">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-meta px-2 py-0.5 bg-paper-2 text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-between items-center">
              <span className="text-xs font-mono text-black/50">STREETBUZZ FIELD ARCHIVE</span>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleOpenTalk();
                }}
                className="px-5 py-2.5 bg-ink text-chalk text-xs font-bold uppercase tracking-wider hover:bg-lime hover:text-black transition-colors"
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

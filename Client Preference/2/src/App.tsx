/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatementSection } from './components/StatementSection';
import { ServicesSection } from './components/ServicesSection';
import { EditorialAttentionSection } from './components/EditorialAttentionSection';
import { BicycleFormatSection } from './components/BicycleFormatSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BuzzLiveSection } from './components/BuzzLiveSection';
import { ProcessSection } from './components/ProcessSection';
import { CrowdedFeedSection } from './components/CrowdedFeedSection';
import { AboutSection } from './components/AboutSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { CampaignModal } from './components/CampaignModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PortfolioProject } from './types';

export default function App() {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const handleOpenCampaignModal = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    setIsCampaignModalOpen(true);
  };

  const handleCloseCampaignModal = () => {
    setIsCampaignModalOpen(false);
    setPreselectedService('');
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#0A0A0A] font-sans antialiased selection:bg-[#CCFF00] selection:text-[#0A0A0A]">
      {/* Sticky Minimal Navigation */}
      <Navbar onOpenCampaignModal={() => handleOpenCampaignModal()} />

      {/* Main Content Sections in Strict Editorial Sequence */}
      <main>
        {/* Hero Section */}
        <HeroSection onOpenCampaignModal={() => handleOpenCampaignModal()} />

        {/* Section 02: Typographic Statement */}
        <StatementSection />

        {/* Section 03: What We Do (6 Services) */}
        <ServicesSection onSelectService={(serviceTitle) => handleOpenCampaignModal(serviceTitle)} />

        {/* Section 04: Editorial Attention Section */}
        <EditorialAttentionSection />

        {/* Section 05: Bicycle Media Format (Uncropped & Integrated in Ecosystem) */}
        <BicycleFormatSection onOpenCampaignModal={() => handleOpenCampaignModal('Mobile OOH')} />

        {/* Section 06: Visual Portfolio (Concepts Only) */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 07: BUZZ LIVE (Dark Minimal Real-Time Map Interface) */}
        <BuzzLiveSection onOpenCampaignModal={() => handleOpenCampaignModal('Mobile OOH')} />

        {/* Section 08: Process (01-05 From Brief to Street) */}
        <ProcessSection />

        {/* Section 09: Strong Black Section (The Feed is Crowded. GET OUTSIDE.) */}
        <CrowdedFeedSection onOpenCampaignModal={() => handleOpenCampaignModal()} />

        {/* Section 10: About Section (Who We Are) */}
        <AboutSection />

        {/* Final Minimalist CTA Section */}
        <FinalCtaSection onOpenCampaignModal={() => handleOpenCampaignModal()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CampaignModal
        isOpen={isCampaignModalOpen}
        onClose={handleCloseCampaignModal}
        preselectedService={preselectedService}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenCampaignModal={(serviceName) => {
          setSelectedProject(null);
          handleOpenCampaignModal(serviceName);
        }}
      />
    </div>
  );
}


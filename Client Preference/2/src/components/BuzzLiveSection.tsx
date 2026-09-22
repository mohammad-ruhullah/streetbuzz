import React, { useState } from 'react';
import { Radio, RefreshCw, Compass, BatteryCharging, Gauge } from 'lucide-react';
import { BUZZ_LIVE_UNITS } from '../data';
import { BuzzLiveCycle } from '../types';

interface BuzzLiveSectionProps {
  onOpenCampaignModal: () => void;
}

export const BuzzLiveSection: React.FC<BuzzLiveSectionProps> = ({ onOpenCampaignModal }) => {
  const [selectedCycleId, setSelectedCycleId] = useState<string>(BUZZ_LIVE_UNITS[0].id);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedCycle = BUZZ_LIVE_UNITS.find(c => c.id === selectedCycleId) || BUZZ_LIVE_UNITS[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <section
      id="buzz-live"
      className="py-24 sm:py-32 md:py-36 bg-[#0A0A0A] text-[#F5F4EF] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-[#262626] pb-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
                ● LIVE TELEMETRY SYSTEM // BUZZ LIVE
              </span>
            </div>
            <span className="text-xs font-mono text-[#71717A] uppercase">
              REAL-WORLD CAMPAIGN VISIBILITY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2
                id="buzzlive-headline"
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-[#F5F4EF] uppercase"
              >
                KNOW WHERE
                <br />
                <span className="text-[#CCFF00]">YOUR CAMPAIGN IS.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                BUZZ LIVE gives STREETBUZZ clients real-time visibility into active outdoor campaigns.
                Transparent, verified route telemetry so you know exactly which city corridors are experiencing your brand.
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Dark Map Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#262626] border border-[#262626]">
          {/* Left Panel: Unit Selector & Live Feed Status */}
          <div className="lg:col-span-4 bg-[#111111] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Top Status Counter */}
              <div className="flex items-center justify-between pb-6 border-b border-[#222] mb-6">
                <div className="flex items-center gap-2">
                  <Radio size={16} className="text-[#CCFF00] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#F5F4EF] uppercase tracking-wider">
                    BUZZ FLEET MONITOR
                  </span>
                </div>
                <div className="px-2.5 py-1 bg-[#222] text-[#CCFF00] font-mono text-xs font-bold uppercase">
                  4 / 4 ACTIVE
                </div>
              </div>

              {/* Cycle List */}
              <p className="text-xs font-mono text-[#71717A] uppercase tracking-wider mb-3">
                SELECT ACTIVE VEHICLE:
              </p>
              <div className="space-y-2 mb-8">
                {BUZZ_LIVE_UNITS.map((cycle: BuzzLiveCycle) => {
                  const isSelected = cycle.id === selectedCycleId;
                  return (
                    <button
                      key={cycle.id}
                      onClick={() => setSelectedCycleId(cycle.id)}
                      className={`w-full text-left p-3.5 border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1c1c1c] border-[#CCFF00] text-[#F5F4EF]'
                          : 'bg-[#141414] border-[#222] text-[#A1A1AA] hover:border-[#444]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-[#CCFF00]' : 'bg-[#71717A]'
                          }`}
                        />
                        <div>
                          <div className="text-sm font-bold tracking-tight text-[#F5F4EF]">
                            {cycle.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#71717A]">
                            {cycle.code} • {cycle.currentLocation.split('(')[0]}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#262626] text-[#CCFF00]">
                        {cycle.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Cycle Telemetry Card */}
            <div className="p-4 bg-[#181818] border border-[#262626]">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#71717A]">
                <span>TELEMETRY METRICS</span>
                <button
                  onClick={handleRefresh}
                  className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"
                >
                  <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                  <span>SYNC</span>
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#222]">
                  <span className="text-[#71717A]">CURRENT LOCATION</span>
                  <span className="text-[#F5F4EF] font-bold text-right max-w-[180px] truncate">
                    {selectedCycle.currentLocation}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222]">
                  <span className="text-[#71717A]">LAST UPDATED</span>
                  <span className="text-[#CCFF00] font-bold">{selectedCycle.lastUpdated}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222]">
                  <span className="text-[#71717A]">CAMPAIGN STATUS</span>
                  <span className="text-[#F5F4EF]">{selectedCycle.activeCampaign}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#71717A]">SPEED / BATTERY</span>
                  <span className="text-[#A1A1AA]">{selectedCycle.speed} • {selectedCycle.battery}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Minimal Dark Urban Grid Map */}
          <div className="lg:col-span-8 bg-[#0D0D0D] relative min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
            {/* Map Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161616]/90 border border-[#262626] backdrop-blur-xs font-mono text-xs">
                <Compass size={14} className="text-[#CCFF00]" />
                <span className="text-[#F5F4EF]">NYC METRO SECTOR 01 — LOWER MANHATTAN & BROOKLYN</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[#71717A]">
                <span>SCALE: 1:12000</span>
                <span>LAT: {selectedCycle.lat}</span>
                <span>LNG: {selectedCycle.lng}</span>
              </div>
            </div>

            {/* Stylized Minimal Dark Map Canvas Visual */}
            <div className="absolute inset-0 z-0 opacity-40">
              {/* Street Grid Lines */}
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="street-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#222" strokeWidth="1" />
                    <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="#181818" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#street-grid)" />

                {/* Major Avenues & River Path */}
                <path
                  d="M 120,0 Q 240,240 380,600"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="6"
                />
                <path
                  d="M 0,220 Q 300,280 800,200"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="8"
                />
                <path
                  d="M 280,0 L 480,600"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="4"
                />
                <path
                  d="M 50,420 Q 400,440 900,380"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="5"
                />

                {/* Route Track between markers */}
                <path
                  d="M 240,160 L 320,240 L 420,280 L 520,380"
                  fill="none"
                  stroke="#CCFF00"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-50"
                />
              </svg>
            </div>

            {/* Interactive Location Markers on Map */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {BUZZ_LIVE_UNITS.map((unit, index) => {
                const isUnitSelected = unit.id === selectedCycleId;
                // Pre-calculated aesthetic map coordinates for 4 units across the grid
                const positions = [
                  { top: '30%', left: '32%' },
                  { top: '48%', left: '68%' },
                  { top: '65%', left: '42%' },
                  { top: '22%', left: '55%' },
                ];
                const pos = positions[index % positions.length];

                return (
                  <div
                    key={unit.id}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                    onClick={() => setSelectedCycleId(unit.id)}
                  >
                    {/* Pulsing ring */}
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-8 h-8 rounded-full ${
                          isUnitSelected
                            ? 'bg-[#CCFF00]/40 animate-ping'
                            : 'bg-white/10 group-hover:bg-[#CCFF00]/30'
                        }`}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          isUnitSelected
                            ? 'bg-[#CCFF00] border-[#0A0A0A] scale-125'
                            : 'bg-[#111] border-[#CCFF00] group-hover:scale-110'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                      </div>

                      {/* Tooltip on marker */}
                      <div
                        className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#0A0A0A] border text-[11px] font-mono whitespace-nowrap shadow-xl transition-all ${
                          isUnitSelected
                            ? 'border-[#CCFF00] text-[#CCFF00] opacity-100'
                            : 'border-[#333] text-[#F5F4EF] opacity-75 group-hover:opacity-100'
                        }`}
                      >
                        <span className="font-bold">{unit.name}</span> • {unit.currentLocation.split('&')[0]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Copy & CTA */}
            <div className="z-10 mt-auto pt-6 border-t border-[#222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D0D0D]/90 backdrop-blur-xs p-4 border">
              <div>
                <p className="text-sm font-bold text-[#F5F4EF]">
                  Your campaign is outside. Now you can see it.
                </p>
                <p className="text-xs text-[#71717A] font-mono mt-0.5">
                  Client portal includes heatmaps, dwell-time verification, and street photos.
                </p>
              </div>

              <button
                id="explore-buzz-live-cta"
                onClick={onOpenCampaignModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#CCFF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600] transition-colors shrink-0"
              >
                <span>EXPLORE BUZZ LIVE</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

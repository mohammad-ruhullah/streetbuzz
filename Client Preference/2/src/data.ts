import { ServiceItem, PortfolioProject, BuzzLiveCycle, ProcessStep } from './types';

// Generated asset paths
export const IMAGES = {
  hero: new URL('./assets/images/streetbuzz_hero_urban_1789638771494.jpg', import.meta.url).href,
  bike: new URL('./assets/images/streetbuzz_bike_ooh_1789638793141.jpg', import.meta.url).href,
  attention: new URL('./assets/images/streetbuzz_attention_1789638820764.jpg', import.meta.url).href,
  campus: new URL('./assets/images/streetbuzz_campus_1789638840531.jpg', import.meta.url).href,
  takeover: new URL('./assets/images/streetbuzz_takeover_1789638858118.jpg', import.meta.url).href,
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'mobile-ooh',
    number: '01',
    title: 'MOBILE OOH',
    tagline: 'Advertising that moves through the city.',
    description: 'Dynamic outdoor media that navigates pedestrian corridors, dense retail zones, transit hubs, and cultural hotspots where traditional billboards cannot reach.',
    tags: ['Mobile Media', 'Urban Density', 'Dynamic Routing', 'Zero Emissions']
  },
  {
    id: 'experiential-marketing',
    number: '02',
    title: 'EXPERIENTIAL MARKETING',
    tagline: 'Real-world experiences designed to make people participate.',
    description: 'Interactive touchpoints, sampling moments, and sensory brand spaces that transform passive observers into active participants and brand advocates.',
    tags: ['Interactive Pop-Ups', 'Sensory Design', 'Audience Participation', 'Brand Immersions']
  },
  {
    id: 'street-activations',
    number: '03',
    title: 'STREET ACTIVATIONS',
    tagline: 'Turn ordinary locations into brand moments.',
    description: 'Site-specific interventions that re-contextualize urban architecture, sidewalks, crosswalks, and plazas into memorable cultural happenings.',
    tags: ['Site-Specific', 'Plaza Takeovers', 'Cultural Moments', 'Ambient Stunts']
  },
  {
    id: 'creative-ooh',
    number: '04',
    title: 'CREATIVE OOH',
    tagline: 'Outdoor campaigns that don\'t look like ordinary advertising.',
    description: 'Bespoke formats, optical illusions, tactile materials, and oversized typographic installations that disrupt the visual routine of the urban skyline.',
    tags: ['Custom Fabrications', 'Disruptive Formats', 'Architectural Interventions', 'High Impact']
  },
  {
    id: 'guerrilla-campaigns',
    number: '05',
    title: 'GUERRILLA CAMPAIGNS',
    tagline: 'Unexpected ideas in unexpected places.',
    description: 'Fast, bold, and high-impact tactical interventions deployed right where culture congregates before anyone else spots the opportunity.',
    tags: ['Tactical Media', 'Night Projections', 'Wild Postings', 'Cultural Shockwaves']
  },
  {
    id: 'brand-experiences',
    number: '06',
    title: 'BRAND EXPERIENCES',
    tagline: 'Make the audience part of the campaign.',
    description: 'Bridging physical encounters with digital community, social sharing, and real-time cultural currency that people photograph and talk about.',
    tags: ['Community Building', 'Social Virality', 'Shared Memory', 'Real-World Impact']
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'campus-meets-city',
    title: 'CAMPUS MEETS CITY',
    category: 'Experiential / Mobile OOH',
    tagline: 'Synchronized mobile media fleets circulating student hubs during orientation week.',
    description: 'A coordinated campaign synchronizing mobile OOH units with pop-up coffee activations across major metropolitan university districts, sparking spontaneous student gatherings.',
    image: IMAGES.campus,
    isConcept: true,
    year: '2026',
    tags: ['Experiential', 'Mobile OOH', 'Sampling']
  },
  {
    id: 'the-moving-billboard',
    title: 'THE MOVING BILLBOARD',
    category: 'Mobile OOH',
    tagline: 'High-visibility illuminated poster units in pedestrian-exclusive avenues.',
    description: 'Bringing large-scale brand graphics directly into the narrowest, most vibrant walking districts where motorized vehicles and conventional billboards are restricted.',
    image: IMAGES.bike,
    isConcept: true,
    year: '2026',
    tags: ['Mobile OOH', 'Pedestrian Zones', 'Backlit Poster']
  },
  {
    id: 'the-unexpected-billboard',
    title: 'THE UNEXPECTED BILLBOARD',
    category: 'Creative OOH',
    tagline: 'Architectural context-responsive installations disrupting street corners.',
    description: 'Transforming industrial scaffolding and urban construction barricades into minimalist, monolithic brand canvases that command instant sidewalk gaze.',
    image: IMAGES.attention,
    isConcept: true,
    year: '2026',
    tags: ['Creative OOH', 'Architectural', 'Minimalist']
  },
  {
    id: 'city-takeover',
    title: 'CITY TAKEOVER',
    category: 'Street Activation',
    tagline: 'Full-spectrum multi-touchpoint street takeover across 12 high-density intersections.',
    description: 'A 48-hour coordinated outdoor blitz deploying synchronized guerrilla postings, mobile media squads, and live ambient lighting along key cultural corridors.',
    image: IMAGES.takeover,
    isConcept: true,
    year: '2026',
    tags: ['Street Activation', 'Guerrilla', 'Multi-Touchpoint']
  }
];

export const BUZZ_LIVE_UNITS: BuzzLiveCycle[] = [
  {
    id: 'cycle-01',
    code: 'BUZZ-01',
    name: 'Cycle 01',
    status: 'ACTIVE',
    currentLocation: 'Broadway & Spring St (SoHo)',
    lat: 40.7223,
    lng: -73.9987,
    lastUpdated: '12 seconds ago',
    speed: '8.4 km/h',
    activeCampaign: 'SPRING DROP 2026',
    battery: '94%',
    distanceToday: '18.6 km'
  },
  {
    id: 'cycle-02',
    code: 'BUZZ-02',
    name: 'Cycle 02',
    status: 'ACTIVE',
    currentLocation: 'Bedford Ave & N 6th (Williamsburg)',
    lat: 40.7181,
    lng: -73.9575,
    lastUpdated: 'Just now',
    speed: '6.2 km/h',
    activeCampaign: 'SOUNDWAVE NYC',
    battery: '88%',
    distanceToday: '22.1 km'
  },
  {
    id: 'cycle-03',
    code: 'BUZZ-03',
    name: 'Cycle 03',
    status: 'ACTIVE',
    currentLocation: '5th Ave & 23rd St (Flatiron District)',
    lat: 40.7411,
    lng: -73.9897,
    lastUpdated: '45 seconds ago',
    speed: '9.1 km/h',
    activeCampaign: 'COLLECTIVE ART 26',
    battery: '91%',
    distanceToday: '14.4 km'
  },
  {
    id: 'cycle-04',
    code: 'BUZZ-04',
    name: 'Cycle 04',
    status: 'ACTIVE',
    currentLocation: 'High Line / 10th Ave & 20th St (Chelsea)',
    lat: 40.7468,
    lng: -74.0048,
    lastUpdated: '1 minute ago',
    speed: '7.0 km/h',
    activeCampaign: 'ZERO EMISSION RUN',
    battery: '79%',
    distanceToday: '26.8 km'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'THE BRIEF',
    description: 'Tell us what you want people to notice.',
    detail: 'We unpack your brand objectives, cultural audience, target timing, and the exact physical spaces where your message will generate the strongest emotional resonance.'
  },
  {
    number: '02',
    title: 'THE IDEA',
    description: 'We build the creative concept.',
    detail: 'Our creative team crafts unconventional physical concepts, arresting copy, and unexpected visual treatments specifically engineered for high-distraction outdoor environments.'
  },
  {
    number: '03',
    title: 'THE PLAN',
    description: 'We choose the right outdoor format and locations.',
    detail: 'From mobile bicycle OOH to experiential pop-ups and guerrilla installations, we map out pedestrian density, transit heatmaps, and optimal route schedules.'
  },
  {
    number: '04',
    title: 'THE STREET',
    description: 'We put the idea into the real world.',
    detail: 'Production, fabrication, staffing, and live dispatch. Our brand ambassadors and mobile units hit the streets with precision execution and real-time GPS tracking.'
  },
  {
    number: '05',
    title: 'THE BUZZ',
    description: 'People notice, interact and remember.',
    detail: 'The campaign creates tangible friction in everyday routines. People look up, snap photos, share online, and talk about the brand long after they walk by.'
  }
];

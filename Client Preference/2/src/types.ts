export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  isConcept: boolean;
  year: string;
  tags: string[];
}

export interface BuzzLiveCycle {
  id: string;
  code: string;
  name: string;
  status: 'ACTIVE' | 'EN_ROUTE' | 'STANDBY';
  currentLocation: string;
  lat: number;
  lng: number;
  lastUpdated: string;
  speed: string;
  activeCampaign: string;
  battery: string;
  distanceToday: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface CampaignInquiry {
  brandName: string;
  contactEmail: string;
  targetCity: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  notes: string;
}

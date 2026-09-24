export interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  formatDetail: string
  image: string
}

export interface ProjectItem {
  id: string
  title: string
  category: string
  tagline: string
  description: string
  image: string
  isConcept: boolean
  year: string
  tags: string[]
}

export interface AdCycleZone {
  city: string
  note: string
  areas: string[]
}

export interface BrandItem {
  id: string
  name: string
  logo: string
  url?: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface SiteSettings {
  contactEmail: string
  founderEmail: string
  socials: SocialLink[]
  formFormatOptions: string[]
  formCityOptions: string[]
}

export interface Content {
  siteSettings: SiteSettings
  services: ServiceItem[]
  projects: ProjectItem[]
  adCycleZones: AdCycleZone[]
  brands: BrandItem[]
}

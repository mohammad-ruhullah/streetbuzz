/**
 * Committed fallback content.
 *
 * This mirrors the values that were previously hardcoded in App.tsx and is used
 * whenever `src/content/content.json` has not been generated (i.e. no Sanity
 * project is configured). It keeps `dev` and `build` working with zero setup.
 *
 * Once Sanity is configured, `npm run sync` writes content.json and this file is
 * no longer read.
 */
import cpdlCampaignImg from '@/assets/images/cpdl_campaign_1789635488069.jpg'
import attentionImg from '@/assets/images/streetbuzz_attention_1789638820764.jpg'
import bikeOohImg from '@/assets/images/streetbuzz_bike_ooh_1789638793141.jpg'
import campusImg from '@/assets/images/streetbuzz_campus_1789638840531.jpg'
import heroAdcycleImg from '@/assets/images/adcycle_hero_1789635455161.jpg'
import takeoverImg from '@/assets/images/streetbuzz_takeover_1789638858118.jpg'

import type { Content } from './types'

export const fallbackContent: Content = {
  siteSettings: {
    contactEmail: 'hello@wearestreetbuzz.com',
    founderEmail: 'ceo@wearestreetbuzz.com',
    socials: [
      { label: 'Instagram', url: 'https://instagram.com/wearestreetbuzz' },
      { label: 'Facebook', url: 'https://facebook.com/wearestreetbuzz' },
      { label: 'LinkedIn', url: 'https://linkedin.com/company/streetbuzz' },
    ],
    formFormatOptions: [
      'AdCycle — Mobile Advertising Bicycle',
      'Outdoor Advertising',
      'Mobile Advertising',
      'Guerrilla Marketing',
      'Experiential Marketing',
      'Brand Activations',
      'Custom Outdoor Campaigns',
    ],
    formCityOptions: ['Chattogram', 'Dhaka', 'Multi-city Bangladesh', 'International / Other'],
  },
  services: [
    {
      id: 'outdoor-advertising',
      number: '01',
      title: 'Outdoor Advertising',
      description:
        'High-impact physical formats tailored to prominent urban corridors, pedestrian hubs, and commercial epicenters.',
      formatDetail: 'Large-format hoardings, high-street installations, custom transit placements',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 'mobile-advertising',
      number: '02',
      title: 'Mobile Advertising',
      description:
        'Dynamic media in motion. Taking your visual message directly to campuses, shopping districts, and high-footfall intersections.',
      formatDetail: 'AdCycle bicycle fleets, moving typographic media, targeted urban routes',
      image: heroAdcycleImg,
    },
    {
      id: 'guerrilla-marketing',
      number: '03',
      title: 'Guerrilla Marketing',
      description:
        'Unconventional, provocative brand moments that interrupt the mundane and spark organic word-of-mouth conversation.',
      formatDetail: 'Stealth sidewalk art, projection mapping, unexpected ambient installations',
      image:
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 'experiential-marketing',
      number: '04',
      title: 'Experiential Marketing',
      description:
        'Sensory-rich environments where audiences do not just see your brand — they touch, hear, sample, and remember it.',
      formatDetail: 'Sensory scent tunnels, pop-up architectural pods, live customer engagements',
      image:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 'brand-activations',
      number: '05',
      title: 'Brand Activations',
      description:
        'Energetic street-level rollouts designed to turn passive onlookers into active participants and loyal advocates.',
      formatDetail: 'Product sampling units, live brand ambassador teams, campus takeovers',
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 'custom-outdoor-campaigns',
      number: '06',
      title: 'Custom Outdoor Campaigns',
      description:
        'Bespoke, one-of-a-kind physical structures engineered from scratch for brands with bold, uncompromising ideas.',
      formatDetail: 'Architectural scale replicas, kinetic displays, sustainable solar media',
      image: cpdlCampaignImg,
    },
  ],
  projects: [
    {
      id: 'campus-meets-city',
      title: 'CAMPUS MEETS CITY',
      category: 'Experiential / Mobile OOH',
      tagline: 'Synchronized mobile media fleets circulating student hubs during orientation week.',
      description:
        'A coordinated campaign synchronizing mobile OOH units with pop-up coffee activations across major metropolitan university districts, sparking spontaneous student gatherings.',
      image: campusImg,
      isConcept: true,
      year: '2026',
      tags: ['Experiential', 'Mobile OOH', 'Street Activation', 'Sampling'],
    },
    {
      id: 'the-moving-billboard',
      title: 'THE MOVING BILLBOARD',
      category: 'Mobile OOH',
      tagline: 'High-visibility illuminated poster units in pedestrian-exclusive avenues.',
      description:
        'Backlit dual-facing poster frames routed continuously through pedestrian-only retail corridors, turning dwell time in the busiest streets into repeated brand exposure.',
      image: bikeOohImg,
      isConcept: true,
      year: '2026',
      tags: ['Mobile OOH', 'Creative OOH', 'Pedestrian Zones', 'Backlit Poster'],
    },
    {
      id: 'the-unexpected-billboard',
      title: 'THE UNEXPECTED BILLBOARD',
      category: 'Creative OOH',
      tagline: 'Architectural context-responsive installations disrupting street corners.',
      description:
        'Sculptural typographic structures built to respond to the architecture around them, engineered so passers-by stop, photograph and share rather than walk past.',
      image: attentionImg,
      isConcept: true,
      year: '2026',
      tags: ['Creative OOH', 'Architectural', 'Minimalist'],
    },
    {
      id: 'city-takeover',
      title: 'CITY TAKEOVER',
      category: 'Street Activation',
      tagline: 'Full-spectrum multi-touchpoint street takeover across high-density intersections.',
      description:
        'A saturation campaign combining wall murals, neon installations and ambient placements across twelve high-density intersections, so the brand becomes unavoidable on a single walk.',
      image: takeoverImg,
      isConcept: true,
      year: '2026',
      tags: ['Street Activation', 'Experiential', 'Guerrilla', 'Multi-Touchpoint'],
    },
  ],
  adCycleZones: [
    {
      city: 'CHATTOGRAM',
      note: 'Primary operating base',
      areas: [
        'GEC Circle',
        'Agrabad Commercial Area',
        'Nasirabad',
        'Khulshi',
        'Muradpur',
        'New Market & Station Road',
        'Chawkbazar',
        'Jamal Khan',
        'Halishahar',
        'Oxygen More',
        'Pahartali',
        'CUET & University Corridor',
      ],
    },
    {
      city: 'DHAKA',
      note: 'Metro deployment network',
      areas: [
        'Gulshan',
        'Banani',
        'Dhanmondi',
        'Uttara',
        'Motijheel',
        'Mirpur',
        'Bashundhara',
        'Mohakhali',
        'Farmgate',
        'Tejgaon',
      ],
    },
  ],
}

/**
 * One-time seed: pushes the content that was previously hardcoded in the site
 * into Sanity, uploading the local campaign images as assets.
 *
 * Requires a write token:
 *   studio/.env -> SANITY_API_TOKEN=<Editor token>
 *
 * Idempotent: uses createOrReplace with stable ids, so re-running it updates
 * the same documents instead of duplicating them.
 *
 * Run with: npm run seed  (from the studio/ directory)
 */
import { createReadStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createClient } from '@sanity/client'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioRoot = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(studioRoot, '..')
const imagesDir = path.join(repoRoot, 'web', 'src', 'assets', 'images')

try {
  process.loadEnvFile(path.join(studioRoot, '.env'))
} catch {
  // .env may be missing; we validate below.
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2026-09-01'

if (!projectId) {
  console.error('[seed] Missing SANITY_STUDIO_PROJECT_ID in studio/.env')
  process.exit(1)
}

if (!token) {
  console.error(
    '[seed] Missing SANITY_API_TOKEN in studio/.env.\n' +
      'Create an Editor token at sanity.io/manage -> your project -> API -> Tokens.',
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const uploadedAssetCache = new Map()

async function uploadLocalImage(filename) {
  const cacheKey = `local:${filename}`
  if (uploadedAssetCache.has(cacheKey)) return uploadedAssetCache.get(cacheKey)

  const filePath = path.join(imagesDir, filename)
  const asset = await client.assets.upload('image', createReadStream(filePath), { filename })
  uploadedAssetCache.set(cacheKey, asset._id)
  console.log(`  ↑ uploaded ${filename}`)
  return asset._id
}

async function uploadRemoteImage(url, filename) {
  const cacheKey = `remote:${url}`
  if (uploadedAssetCache.has(cacheKey)) return uploadedAssetCache.get(cacheKey)

  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to download ${url} (${response.status})`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, { filename })
  uploadedAssetCache.set(cacheKey, asset._id)
  console.log(`  ↑ uploaded ${filename} (remote)`)
  return asset._id
}

function imageRef(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

const services = [
  {
    id: 'service-outdoor-advertising',
    order: 1,
    number: '01',
    title: 'Outdoor Advertising',
    description:
      'High-impact physical formats tailored to prominent urban corridors, pedestrian hubs, and commercial epicenters.',
    formatDetail: 'Large-format hoardings, high-street installations, custom transit placements',
    image: {
      remote:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
      filename: 'outdoor-advertising.jpg',
    },
  },
  {
    id: 'service-mobile-advertising',
    order: 2,
    number: '02',
    title: 'Mobile Advertising',
    description:
      'Dynamic media in motion. Taking your visual message directly to campuses, shopping districts, and high-footfall intersections.',
    formatDetail: 'AdCycle bicycle fleets, moving typographic media, targeted urban routes',
    image: { local: 'adcycle_hero_1789635455161.jpg' },
  },
  {
    id: 'service-guerrilla-marketing',
    order: 3,
    number: '03',
    title: 'Guerrilla Marketing',
    description:
      'Unconventional, provocative brand moments that interrupt the mundane and spark organic word-of-mouth conversation.',
    formatDetail: 'Stealth sidewalk art, projection mapping, unexpected ambient installations',
    image: {
      remote:
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop',
      filename: 'guerrilla-marketing.jpg',
    },
  },
  {
    id: 'service-experiential-marketing',
    order: 4,
    number: '04',
    title: 'Experiential Marketing',
    description:
      'Sensory-rich environments where audiences do not just see your brand — they touch, hear, sample, and remember it.',
    formatDetail: 'Sensory scent tunnels, pop-up architectural pods, live customer engagements',
    image: {
      remote:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
      filename: 'experiential-marketing.jpg',
    },
  },
  {
    id: 'service-brand-activations',
    order: 5,
    number: '05',
    title: 'Brand Activations',
    description:
      'Energetic street-level rollouts designed to turn passive onlookers into active participants and loyal advocates.',
    formatDetail: 'Product sampling units, live brand ambassador teams, campus takeovers',
    image: {
      remote:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
      filename: 'brand-activations.jpg',
    },
  },
  {
    id: 'service-custom-outdoor-campaigns',
    order: 6,
    number: '06',
    title: 'Custom Outdoor Campaigns',
    description:
      'Bespoke, one-of-a-kind physical structures engineered from scratch for brands with bold, uncompromising ideas.',
    formatDetail: 'Architectural scale replicas, kinetic displays, sustainable solar media',
    image: { local: 'cpdl_campaign_1789635488069.jpg' },
  },
]

const projects = [
  {
    id: 'project-campus-meets-city',
    order: 1,
    title: 'CAMPUS MEETS CITY',
    category: 'Experiential / Mobile OOH',
    tagline: 'Synchronized mobile media fleets circulating student hubs during orientation week.',
    description:
      'A coordinated campaign synchronizing mobile OOH units with pop-up coffee activations across major metropolitan university districts, sparking spontaneous student gatherings.',
    isConcept: true,
    year: '2026',
    tags: ['Experiential', 'Mobile OOH', 'Street Activation', 'Sampling'],
    image: { local: 'streetbuzz_campus_1789638840531.jpg' },
  },
  {
    id: 'project-the-moving-billboard',
    order: 2,
    title: 'THE MOVING BILLBOARD',
    category: 'Mobile OOH',
    tagline: 'High-visibility illuminated poster units in pedestrian-exclusive avenues.',
    description:
      'Backlit dual-facing poster frames routed continuously through pedestrian-only retail corridors, turning dwell time in the busiest streets into repeated brand exposure.',
    isConcept: true,
    year: '2026',
    tags: ['Mobile OOH', 'Creative OOH', 'Pedestrian Zones', 'Backlit Poster'],
    image: { local: 'streetbuzz_bike_ooh_1789638793141.jpg' },
  },
  {
    id: 'project-the-unexpected-billboard',
    order: 3,
    title: 'THE UNEXPECTED BILLBOARD',
    category: 'Creative OOH',
    tagline: 'Architectural context-responsive installations disrupting street corners.',
    description:
      'Sculptural typographic structures built to respond to the architecture around them, engineered so passers-by stop, photograph and share rather than walk past.',
    isConcept: true,
    year: '2026',
    tags: ['Creative OOH', 'Architectural', 'Minimalist'],
    image: { local: 'streetbuzz_attention_1789638820764.jpg' },
  },
  {
    id: 'project-city-takeover',
    order: 4,
    title: 'CITY TAKEOVER',
    category: 'Street Activation',
    tagline: 'Full-spectrum multi-touchpoint street takeover across high-density intersections.',
    description:
      'A saturation campaign combining wall murals, neon installations and ambient placements across twelve high-density intersections, so the brand becomes unavoidable on a single walk.',
    isConcept: true,
    year: '2026',
    tags: ['Street Activation', 'Experiential', 'Guerrilla', 'Multi-Touchpoint'],
    image: { local: 'streetbuzz_takeover_1789638858118.jpg' },
  },
]

const zones = [
  {
    id: 'zone-chattogram',
    order: 1,
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
    id: 'zone-dhaka',
    order: 2,
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
]

const siteSettings = {
  contactEmail: 'hello@wearestreetbuzz.com',
  founderEmail: 'ceo@wearestreetbuzz.com',
  socials: [
    { _key: 'instagram', label: 'Instagram', url: 'https://instagram.com/wearestreetbuzz' },
    { _key: 'facebook', label: 'Facebook', url: 'https://facebook.com/wearestreetbuzz' },
    { _key: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/streetbuzz' },
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
}

async function resolveImage(image) {
  if (image.local) return imageRef(await uploadLocalImage(image.local))
  if (image.remote) return imageRef(await uploadRemoteImage(image.remote, image.filename))
  return undefined
}

async function main() {
  console.log(`[seed] Seeding ${projectId}/${dataset} …`)

  console.log('[seed] Site settings')
  await client.createOrReplace({ _id: 'siteSettings', _type: 'siteSettings', ...siteSettings })

  console.log('[seed] Services')
  for (const service of services) {
    const { id, image, ...rest } = service
    await client.createOrReplace({
      _id: id,
      _type: 'service',
      ...rest,
      image: await resolveImage(image),
    })
  }

  console.log('[seed] Portfolio projects')
  for (const project of projects) {
    const { id, image, ...rest } = project
    await client.createOrReplace({
      _id: id,
      _type: 'project',
      ...rest,
      image: await resolveImage(image),
    })
  }

  console.log('[seed] AdCycle zones')
  for (const zone of zones) {
    const { id, ...rest } = zone
    await client.createOrReplace({ _id: id, _type: 'adCycleZone', ...rest })
  }

  console.log('[seed] Done.')
}

main().catch((error) => {
  console.error('[seed] Failed:', error)
  process.exit(1)
})

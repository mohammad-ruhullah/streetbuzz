/**
 * Build-time Sanity sync.
 *
 * Fetches the CMS-driven content (site settings, services, portfolio, AdCycle
 * zones), builds Sanity CDN image URLs and writes `src/content/content.json`,
 * which `src/content/index.ts` imports.
 *
 * Runs as `prebuild` so it only executes where the SANITY_* env vars exist.
 * When they are absent (local dev, fresh clone) it exits 0 without writing and
 * the committed fallback content is used. Empty CMS collections are tolerated:
 * `src/content/index.ts` merges per section, so those keep the fallback.
 * `@sanity/client` and `@sanity/image-url` are devDependencies, so nothing
 * Sanity-related ever reaches the browser bundle.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createImageUrlBuilder } from '@sanity/image-url'
import { createClient } from '@sanity/client'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(scriptDir, '..')
const outputPath = path.join(webRoot, 'src', 'content', 'content.json')

try {
  process.loadEnvFile(path.join(webRoot, '.env'))
} catch {
  // .env is optional — fallback content covers the unconfigured case.
}

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2026-09-01'

if (!projectId) {
  console.log(
    '[sync-content] SANITY_PROJECT_ID not set — skipping sync and using committed fallback content.',
  )
  process.exit(0)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

const imageBuilder = createImageUrlBuilder(client)

function imageUrl(image, width = 1600) {
  if (!image || !image.asset) return ''
  try {
    return imageBuilder.image(image).width(width).auto('format').quality(80).url()
  } catch (error) {
    console.warn(`[sync-content] Could not build image URL: ${error.message}`)
    return ''
  }
}

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  contactEmail,
  founderEmail,
  socials[]{ label, url },
  formFormatOptions,
  formCityOptions
}`

const SERVICES_QUERY = `*[_type == "service"] | order(coalesce(order, 9999) asc, number asc) {
  _id, number, title, description, formatDetail, image
}`

const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(order, 9999) asc, title asc) {
  _id, title, category, tagline, description, image, isConcept, year, tags
}`

const ZONES_QUERY = `*[_type == "adCycleZone"] | order(coalesce(order, 9999) asc, city asc) {
  city, note, areas
}`

const BRANDS_QUERY = `*[_type == "brand" && active != false] | order(coalesce(order, 9999) asc, name asc) {
  _id, name, logo, url
}`

const DEFAULT_SITE_SETTINGS = {
  contactEmail: 'hello@wearestreetbuzz.com',
  founderEmail: 'ceo@wearestreetbuzz.com',
  socials: [],
  formFormatOptions: [],
  formCityOptions: [],
}

async function main() {
  const [settings, services, projects, zones, brands] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(SERVICES_QUERY),
    client.fetch(PROJECTS_QUERY),
    client.fetch(ZONES_QUERY),
    client.fetch(BRANDS_QUERY),
  ])

  const emptyCollections = [
    ['services', services],
    ['projects', projects],
    ['adCycleZones', zones],
    ['brands', brands],
  ].filter(([, docs]) => !Array.isArray(docs) || docs.length === 0)

  if (emptyCollections.length > 0) {
    console.warn(
      `[sync-content] Sanity returned no documents for: ${emptyCollections
        .map(([name]) => name)
        .join(', ')}.\n` +
        'Those sections will keep the committed fallback content on the site.',
    )
  }

  const content = {
    siteSettings: {
      ...DEFAULT_SITE_SETTINGS,
      ...(settings ?? {}),
      socials: settings?.socials ?? [],
      formFormatOptions: settings?.formFormatOptions ?? [],
      formCityOptions: settings?.formCityOptions ?? [],
    },
    services: services.map((doc) => ({
      id: doc._id,
      number: doc.number ?? '',
      title: doc.title ?? '',
      description: doc.description ?? '',
      formatDetail: doc.formatDetail ?? '',
      image: imageUrl(doc.image),
    })),
    projects: projects.map((doc) => ({
      id: doc._id,
      title: doc.title ?? '',
      category: doc.category ?? '',
      tagline: doc.tagline ?? '',
      description: doc.description ?? '',
      image: imageUrl(doc.image),
      isConcept: doc.isConcept ?? true,
      year: doc.year ?? '',
      tags: doc.tags ?? [],
    })),
    adCycleZones: zones.map((doc) => ({
      city: doc.city ?? '',
      note: doc.note ?? '',
      areas: doc.areas ?? [],
    })),
    brands: brands.map((doc) => ({
      id: doc._id,
      name: doc.name ?? '',
      logo: imageUrl(doc.logo, 400),
      url: doc.url ?? '',
    })),
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8')

  console.log(
    `[sync-content] Wrote ${path.relative(webRoot, outputPath)} — ` +
      `${content.services.length} services, ${content.projects.length} projects, ` +
      `${content.adCycleZones.length} zones, ${content.brands.length} brands.`,
  )
}

main().catch((error) => {
  console.error('[sync-content] Failed:', error)
  process.exit(1)
})

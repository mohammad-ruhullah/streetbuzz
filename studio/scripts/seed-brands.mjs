/**
 * Seed the demo brand-collaboration logos into Sanity as editable `brand`
 * documents. Purely additive — it only creates/updates `brand` docs and never
 * touches services, projects, zones or settings.
 *
 * Requires a write token:
 *   studio/.env -> SANITY_API_TOKEN=<Editor token>
 *
 * Run with: npm run seed:brands  (from the studio/ directory)
 */
import { createReadStream } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createClient } from '@sanity/client'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const studioRoot = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(studioRoot, '..')
const brandsDir = path.join(repoRoot, 'web', 'public', 'brands')

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
  console.error('[seed-brands] Missing SANITY_STUDIO_PROJECT_ID in studio/.env')
  process.exit(1)
}

if (!token) {
  console.error(
    '[seed-brands] Missing SANITY_API_TOKEN in studio/.env.\n' +
      'Create an Editor token at sanity.io/manage -> your project -> API -> Tokens.',
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const brands = [
  { id: 'brand-grameenphone', order: 1, name: 'Grameenphone', file: 'grameenphone.png' },
  { id: 'brand-robi', order: 2, name: 'Robi', file: 'robi.png' },
  { id: 'brand-banglalink', order: 3, name: 'Banglalink', file: 'banglalink.png' },
  { id: 'brand-bkash', order: 4, name: 'bKash', file: 'bkash.png' },
  { id: 'brand-nagad', order: 5, name: 'Nagad', file: 'nagad.png' },
  { id: 'brand-walton', order: 6, name: 'Walton', file: 'walton.png' },
  { id: 'brand-pran', order: 7, name: 'PRAN', file: 'pran.png' },
  { id: 'brand-square', order: 8, name: 'Square', file: 'square.png' },
  { id: 'brand-akij', order: 9, name: 'Akij', file: 'akij.png' },
  { id: 'brand-fresh', order: 10, name: 'Fresh', file: 'fresh.png' },
  { id: 'brand-shyamoli', order: 11, name: 'Shyamoli', file: 'shyamoli.png' },
  { id: 'brand-east-delta-university', order: 12, name: 'East Delta University', file: 'eastdelta.png' },
]

async function main() {
  console.log(`[seed-brands] Seeding ${brands.length} brands into ${projectId}/${dataset} …`)

  for (const brand of brands) {
    const filePath = path.join(brandsDir, brand.file)
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: brand.file,
    })
    await client.createOrReplace({
      _id: brand.id,
      _type: 'brand',
      order: brand.order,
      name: brand.name,
      active: true,
      logo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    })
    console.log(`  ✓ ${brand.name}`)
  }

  console.log('[seed-brands] Done. Open the Studio -> Brand Collaborations to edit them.')
}

main().catch((error) => {
  console.error('[seed-brands] Failed:', error)
  process.exit(1)
})

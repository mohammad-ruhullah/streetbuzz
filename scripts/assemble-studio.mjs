/**
 * Post-build step for the combined Vercel deployment.
 *
 * The marketing site (web/) and the Sanity Studio (studio/) are separate apps.
 * This copies the built Studio (studio/dist) into the site output
 * (web/dist/studio) so a single deployment serves:
 *
 *   /          -> the Vite site
 *   /studio/*  -> the Sanity Studio (built with basePath '/studio')
 *
 * Routing for /studio/* is handled by the repo-root vercel.json rewrites.
 */
import { cp, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const from = path.join(root, 'studio', 'dist')
const to = path.join(root, 'web', 'dist', 'studio')

if (!existsSync(from)) {
  console.error(`[assemble-studio] Missing ${from} — did the studio build run?`)
  process.exit(1)
}

await rm(to, { recursive: true, force: true })
await cp(from, to, { recursive: true })

console.log('[assemble-studio] Copied studio build into web/dist/studio')

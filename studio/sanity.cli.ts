import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Serve the built Studio under /studio on the marketing domain
  // (routed by the repo-root vercel.json rewrites).
  project: {
    basePath: '/studio',
  },
})

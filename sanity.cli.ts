import {defineCliConfig} from 'sanity/cli'
export default defineCliConfig({
  api: {
    projectId: 'd3u0yk6x',
    dataset: 'production'
  },
  // Tip: You can use an environment variable for studioHost if you want to deploy separate Studios for production, staging, testing etc.
  studioHost: 'mark-1'
})
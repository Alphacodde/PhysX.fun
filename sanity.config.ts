import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PhysX.Fun',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'd3u0yk6x',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    theme: {
      sidebar: {
        backgroundColor: '#161616',
      },
    },
  },

  apiVersion: '2023-06-01',
  useCdn: true,
});

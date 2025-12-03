import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 4321,
    host: true
  },
  build: {
    inlineStylesheets: 'auto'
  },
 vite: {
  define: {
    __DATE__: `'${new Date().toISOString()}'`,
  },
  server: {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['*']
    },
    // 🔥 Agregá esto:
    allowedHosts: [
      'predictory-anahi-untombed.ngrok-free.dev'
    ]
  }
  }
});

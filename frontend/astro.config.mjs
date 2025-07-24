import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    tailwind(),
    react({
      include: ['**/react/*', '**/admin/*'],
      ssr: false
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  
  // Optimizaciones para performance
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto'
  },
  
  // Configuración de Vite optimizada
  vite: {
    ssr: {
      noExternal: ['@astrojs/react']
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    
    // Optimizaciones de build
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['framer-motion', 'recharts']
          }
        }
      },
      
      // Optimizaciones de CSS
      cssCodeSplit: true,
      
      // Optimizaciones de assets
      assetsInlineLimit: 4096,
      
      // Optimizaciones de minificación
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    
    // Optimizaciones de desarrollo
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion']
    }
  }
}); 
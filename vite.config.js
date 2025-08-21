/**
 * Vite Configuration - Mentoria Seja Livre
 * Build tool configuration with Tailwind CSS processing and optimization
 */

import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Root directory for Vite processing
  root: 'src',
  
  // Base URL for assets in production
  base: '/',
  
  // Build configuration
  build: {
    // Output directory (relative to project root)
    outDir: '../_site',
    
    // Empty output directory before build
    emptyOutDir: false, // Let Eleventy handle this
    
    // Asset output directory
    assetsDir: 'assets',
    
    // Rollup build options
    rollupOptions: {
      input: {
        // Main entry points
        main: resolve(__dirname, 'src/assets/js/main.js'),
        styles: resolve(__dirname, 'src/assets/css/main.css')
      },
      
      output: {
        // Asset file naming pattern
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name].[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        },
        
        // Entry file naming
        entryFileNames: 'assets/js/[name].[hash].js',
        
        // Chunk file naming 
        chunkFileNames: 'assets/js/[name].[hash].js'
      }
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Generate manifest for asset mapping
    manifest: true,
    
    // Minification
    minify: 'esbuild',
    
    // Source maps in development
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Target browsers
    target: ['es2018', 'edge88', 'firefox78', 'chrome87', 'safari12'],
    
    // Performance budgets
    chunkSizeWarningLimit: 500 // KB
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false, // Let Eleventy handle opening browser
    cors: true,
    
    // Proxy Eleventy development server
    proxy: {
      '/': 'http://localhost:8080'
    }
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: '0.0.0.0'
  },
  
  // CSS configuration
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    },
    
    // CSS preprocessing
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/assets/css/variables.scss";
        `
      }
    },
    
    // DevSourcemap for development
    devSourcemap: true
  },
  
  // Plugin configuration
  plugins: [
    // Legacy browser support for production builds
  ],
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      // Pre-bundle common dependencies
      '@tailwindcss/typography',
      '@tailwindcss/forms'
    ],
    exclude: [
      // Exclude server-side dependencies
      '@11ty/eleventy'
    ]
  },
  
  // Define environment variables
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  },
  
  // Asset handling
  assetsInclude: [
    // Include additional asset types
    '**/*.woff',
    '**/*.woff2', 
    '**/*.ttf',
    '**/*.otf'
  ],
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/_includes/components'),
      '@layouts': resolve(__dirname, 'src/_includes/layouts'),
      '@data': resolve(__dirname, 'src/_data')
    }
  },
  
  // ESBuild configuration
  esbuild: {
    // Target for JavaScript transformation
    target: 'es2018',
    
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  
  // Worker configuration
  worker: {
    format: 'es'
  }
}
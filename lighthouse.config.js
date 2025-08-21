/**
 * Lighthouse CI Configuration - Mentoria Seja Livre
 * Performance and accessibility testing configuration
 */

module.exports = {
  ci: {
    collect: {
      // URLs to audit
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/obrigada'
      ],
      
      // Number of times to run Lighthouse on each URL
      numberOfRuns: 3,
      
      // Chrome launch options
      chromePath: undefined, // Use system Chrome
      chromeFlags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ],
      
      // Additional settings
      settings: {
        // Mobile audit by default
        formFactor: 'mobile',
        throttling: {
          // Simulated slow 4G
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        },
        
        // Skip certain audits for development
        skipAudits: [
          'canonical', // May not be configured in development
          'robots-txt' // May not exist in development
        ]
      }
    },
    
    assert: {
      assertions: {
        // Performance assertions
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.85 }],
        
        // Core Web Vitals assertions
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Accessibility specific assertions
        'color-contrast': 'error',
        'heading-order': 'error',
        'html-has-lang': 'error',
        'html-lang-valid': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        
        // Performance specific assertions
        'unused-css-rules': ['warn', { maxLength: 2 }],
        'unused-javascript': ['warn', { maxLength: 2 }],
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        
        // Best practices
        'is-on-https': 'off', // Disabled for localhost
        'uses-http2': 'off', // Disabled for localhost
        'no-vulnerable-libraries': 'error'
      }
    },
    
    upload: {
      // Don't upload results in CI for now
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    },
    
    server: {
      // Serve the built site for testing
      command: 'npm run build && npx http-server _site -p 8080 -s',
      port: 8080,
      timeout: 30000
    }
  }
};
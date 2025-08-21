/**
 * PostCSS Configuration - Mentoria Seja Livre
 * CSS processing pipeline configuration
 */

export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {
      // Browser support configuration
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie <= 11',
        'Firefox ESR'
      ],
      
      // Grid support for older browsers
      grid: 'autoplace'
    },
    
    // CSS optimization for production
    ...(process.env.NODE_ENV === 'production' && {
      'cssnano': {
        preset: [
          'default',
          {
            // Preserve important comments
            discardComments: {
              removeAll: false
            },
            
            // Optimize font loading
            fontFamily: {
              quotes: 'prefer-single'
            },
            
            // Optimize color values
            colormin: true,
            
            // Optimize calc() functions
            calc: true,
            
            // Optimize SVGs
            svgo: {
              plugins: [
                'preset-default',
                'removeViewBox'
              ]
            }
          }
        ]
      }
    })
  }
}
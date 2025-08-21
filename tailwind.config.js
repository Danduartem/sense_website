/**
 * Tailwind CSS Configuration - Mentoria Seja Livre
 * Design system with navy/burgundy brand colors and accessibility compliance
 */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./src/**/*.{html,njk,md,js}",
    "./src/_includes/**/*.{html,njk}",
    "./src/_data/**/*.js"
  ],
  
  darkMode: 'class', // Enable dark mode with class strategy
  
  theme: {
    extend: {
      colors: {
        // Navy brand color scale - Primary brand color
        navy: {
          50: '#F3F4F5',   // Very light navy for backgrounds
          100: '#E8E9EB',  // Light navy for subtle backgrounds
          200: '#BABBC4',  // Light navy for borders
          300: '#8C8F9C',  // Medium light navy for disabled states
          400: '#757989',  // Medium navy for secondary text
          500: '#5E6275',  // Medium navy for labels
          600: '#474C61',  // Dark navy for hover states
          700: '#30354E',  // Darker navy for emphasized text
          800: '#191F3A',  // Primary navy - main text color
          900: '#121629'   // Darkest navy for emphasis
        },
        
        // Burgundy brand color scale - Accent and CTA color
        burgundy: {
          50: '#FCF9F9',   // Very light burgundy backgrounds
          100: '#F9F3F4',  // Light burgundy for subtle highlights
          200: '#F2E8E9',  // Light burgundy for borders
          300: '#D9B9BC',  // Medium light burgundy for hover
          400: '#C08B8F',  // Medium burgundy for secondary
          500: '#B37479',  // Medium burgundy for accents
          600: '#9A454C',  // Dark burgundy for hover states
          700: '#81171F',  // Primary burgundy - CTA color
          800: '#671219',  // Darker burgundy for active states
          900: '#5A1016'   // Darkest burgundy for emphasis
        },
        
        // Neutral color scale - Supporting grays
        neutral: {
          50: '#F9F9F9',   // Very light neutral
          100: '#F6F6F6',  // Light neutral for backgrounds
          200: '#ECECEC',  // Brand neutral - main neutral color
          300: '#D4D4D4',  // Medium light neutral for borders
          400: '#BDBDBD',  // Medium neutral for placeholders
          500: '#A5A5A5',  // Medium neutral for secondary text
          600: '#8E8E8E',  // Dark neutral for labels
          700: '#767676',  // Darker neutral for text
          800: '#474747',  // Dark neutral for emphasis
          900: '#181818'   // Darkest neutral
        },
        
        // Gold accent scale - Luxury and premium touches
        gold: {
          50: '#fdf8f0',   // Very light gold backgrounds
          100: '#fbeecb',  // Light gold for subtle highlights
          200: '#f8e2a0',  // Light gold for borders
          300: '#f3d375',  // Medium light gold
          400: '#eec454',  // Medium gold
          500: '#C89A3A',  // Primary gold - accent color
          600: '#b78431',  // Dark gold for hover
          700: '#986829',  // Darker gold
          800: '#7c5324',  // Dark gold emphasis
          900: '#654320'   // Darkest gold
        },
        
        // Peach accent scale - Feminine and warm touches
        peach: {
          50: '#fef9f7',   // Very light peach backgrounds
          100: '#fdeee7',  // Light peach for subtle backgrounds
          200: '#f9d8c9',  // Light peach for borders
          300: '#F1C6B4',  // Medium light peach - accent color
          400: '#ecae98',  // Medium peach
          500: '#e59074',  // Primary peach for highlights
          600: '#d76f4f',  // Dark peach for hover
          700: '#b3563b',  // Darker peach
          800: '#914633',  // Dark peach emphasis
          900: '#753b2d'   // Darkest peach
        },
        
        // Semantic colors with accessibility compliance
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',  // WCAG AA compliant green
          600: '#16a34a',
          700: '#15803d'
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',  // WCAG AA compliant red
          600: '#dc2626',
          700: '#b91c1c'
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',  // WCAG AA compliant yellow
          600: '#d97706',
          700: '#b45309'
        },
        
        // Base colors
        white: '#FFFFFF',
        black: '#000000'
      },
      
      fontFamily: {
        // Display font for headings - Elegant serif
        'display': ['Lora', 'Georgia', ...defaultTheme.fontFamily.serif],
        
        // Body font for text - Modern sans-serif
        'body': ['Inter', 'system-ui', ...defaultTheme.fontFamily.sans],
        
        // Fallback to system fonts if custom fonts fail
        'sans': ['Inter', 'system-ui', ...defaultTheme.fontFamily.sans],
        'serif': ['Lora', 'Georgia', ...defaultTheme.fontFamily.serif],
      },
      
      fontSize: {
        // Modular scale starting from 16px base
        'xs': ['0.75rem', { lineHeight: '1.5' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],    // 14px
        'base': ['1rem', { lineHeight: '1.6' }],      // 16px - base size
        'lg': ['1.125rem', { lineHeight: '1.6' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.5' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],       // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
      },
      
      spacing: {
        // 4px base scale with additional values for design system
        '13': '3.25rem',    // 52px
        '15': '3.75rem',    // 60px  
        '17': '4.25rem',    // 68px
        '18': '4.5rem',     // 72px
        '19': '4.75rem',    // 76px
        '21': '5.25rem',    // 84px
        '22': '5.5rem',     // 88px
        '26': '6.5rem',     // 104px
        '30': '7.5rem',     // 120px
        '34': '8.5rem',     // 136px
      },
      
      maxWidth: {
        '8xl': '88rem',     // 1408px
        '9xl': '96rem',     // 1536px
      },
      
      borderRadius: {
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        }
      },
      
      typography: {
        // Custom typography plugin configuration
        DEFAULT: {
          css: {
            '--tw-prose-body': '#191F3A',        // Navy 800
            '--tw-prose-headings': '#81171F',     // Burgundy 700
            '--tw-prose-lead': '#5E6275',         // Navy 500
            '--tw-prose-links': '#81171F',        // Burgundy 700
            '--tw-prose-bold': '#30354E',         // Navy 700
            '--tw-prose-counters': '#8C8F9C',     // Navy 300
            '--tw-prose-bullets': '#BABBC4',      // Navy 200
            '--tw-prose-hr': '#ECECEC',           // Neutral 200
            '--tw-prose-quotes': '#9A454C',       // Burgundy 600
            '--tw-prose-quote-borders': '#F2E8E9', // Burgundy 200
            '--tw-prose-captions': '#757989',     // Navy 400
            '--tw-prose-code': '#30354E',         // Navy 700
            '--tw-prose-pre-code': '#ECECEC',     // Neutral 200
            '--tw-prose-pre-bg': '#F3F4F5',       // Navy 50
            '--tw-prose-th-borders': '#BABBC4',   // Navy 200
            '--tw-prose-td-borders': '#E8E9EB',   // Navy 100
            
            color: 'var(--tw-prose-body)',
            maxWidth: 'none', // Remove max-width constraint
            
            h1: {
              fontFamily: 'Lora, Georgia, serif',
              fontWeight: '700',
              color: 'var(--tw-prose-headings)'
            },
            h2: {
              fontFamily: 'Lora, Georgia, serif',
              fontWeight: '600', 
              color: 'var(--tw-prose-headings)'
            },
            h3: {
              fontFamily: 'Lora, Georgia, serif',
              fontWeight: '600',
              color: 'var(--tw-prose-headings)'
            }
          }
        },
        
        // Amanda-specific content styling
        'amanda': {
          css: {
            '--tw-prose-body': '#191F3A',
            '--tw-prose-headings': '#81171F', 
            '--tw-prose-quotes': '#9A454C',
            
            fontSize: '1.125rem', // 18px base for better readability
            lineHeight: '1.7',
            
            h1: {
              fontSize: '2.5rem',
              lineHeight: '1.2',
              marginBottom: '1.5rem'
            },
            h2: {
              fontSize: '2rem', 
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            p: {
              marginBottom: '1.5rem'
            }
          }
        }
      }
    }
  },
  
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class' // Use class strategy for form styling
    }),
    
    // Custom utility plugin
    function({ addUtilities }) {
      const newUtilities = {
        // Focus-visible utilities for better keyboard navigation
        '.focus-visible-ring': {
          '@apply focus:outline-none focus-visible:ring-4 focus-visible:ring-burgundy-200': {}
        },
        
        // Screen reader only content
        '.sr-only-focusable': {
          '@apply sr-only focus:not-sr-only focus:absolute focus:z-50': {}
        },
        
        // High contrast mode support
        '@media (prefers-contrast: high)': {
          '.high-contrast-border': {
            'border-width': '2px !important'
          }
        },
        
        // Reduced motion support  
        '@media (prefers-reduced-motion: reduce)': {
          '.motion-reduce': {
            'animation': 'none !important',
            'transition': 'none !important'
          }
        }
      }
      
      addUtilities(newUtilities)
    }
  ]
}
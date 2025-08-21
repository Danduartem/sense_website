# Gate 1: ui_ok - Frontend UI & Accessibility Lead (FE-UI) Tasks
## Mentoria Seja Livre Landing Page - UI Implementation

**Gate Owner:** Frontend UI & Accessibility Lead (FE-UI)  
**Gate Status:** PENDING  
**Dependencies:** None (Foundation gate)  
**Blocking:** All subsequent gates until ui_ok validation passes  

---

## GATE 1 VALIDATION CRITERIA

### Technical Requirements
- [ ] Eleventy + Vite + Tailwind foundation functional
- [ ] Component library with all required UI elements
- [ ] Landing page 9-section structure implemented
- [ ] Lead capture modal Web Component operational
- [ ] Mobile-first responsive design (320px+ support)
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Performance optimization (lazy loading, code splitting)

### Evidence Required for Gate Passage
1. **Build Validation:** Successful `npm run build` and `npm run dev`
2. **Component Screenshots:** All components in various states
3. **Accessibility Audit:** axe-core test results with zero violations
4. **Responsive Testing:** Screenshots across mobile/tablet/desktop
5. **Performance Metrics:** Lighthouse scores ≥90 for Performance and Accessibility

---

## FOUNDATION SETUP TASKS

### Task 1.1: Project Architecture Setup
**Priority:** CRITICAL  
**Estimated Time:** 4 hours

Create the complete Eleventy + Vite + Tailwind foundation:

```bash
# Initialize project structure
mkdir mentoria-seja-livre-lp && cd mentoria-seja-livre-lp
npm init -y

# Install core dependencies
npm install @11ty/eleventy vite @vitejs/plugin-legacy
npm install tailwindcss @tailwindcss/typography @tailwindcss/forms
npm install autoprefixer postcss

# Install development dependencies  
npm install --save-dev @axe-core/cli lighthouse-ci
npm install --save-dev eslint prettier
```

**Directory Structure to Create:**
```
src/
├── _data/
│   ├── site.json
│   ├── tracking.json  
│   └── content.json
├── _includes/
│   ├── layouts/
│   │   └── base.njk
│   ├── components/
│   └── partials/
│       ├── head.njk
│       ├── gtm-head.njk
│       └── footer.njk
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── pages/
└── index.njk
```

**Configuration Files:**
- `.eleventy.js` with Vite integration
- `vite.config.js` with Tailwind processing
- `tailwind.config.js` with custom design tokens
- `package.json` with Brazilian Portuguese locale

### Task 1.2: Design Token System  
**Priority:** HIGH  
**Estimated Time:** 3 hours

Create comprehensive design tokens using Café com Vendas brand system:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Navy brand color scale
        navy: {
          50: '#F3F4F5',
          100: '#E8E9EB',
          200: '#BABBC4',
          300: '#8C8F9C',
          400: '#757989',
          500: '#5E6275',
          600: '#474C61',
          700: '#30354E',
          800: '#191F3A',  // Primary navy
          900: '#121629'
        },
        // Burgundy brand color scale
        burgundy: {
          50: '#FCF9F9',
          100: '#F9F3F4',
          200: '#F2E8E9',
          300: '#D9B9BC',
          400: '#C08B8F',
          500: '#B37479',
          600: '#9A454C',
          700: '#81171F',  // Primary burgundy
          800: '#671219',
          900: '#5A1016'
        },
        // Neutral color scale
        neutral: {
          50: '#F9F9F9',
          100: '#F6F6F6',
          200: '#ECECEC',  // Brand neutral
          300: '#D4D4D4',
          400: '#BDBDBD',
          500: '#A5A5A5',
          600: '#8E8E8E',
          700: '#767676',
          800: '#474747',
          900: '#181818'
        },
        // Gold accent scale
        gold: {
          50: '#fdf8f0',
          100: '#fbeecb',
          200: '#f8e2a0',
          300: '#f3d375',
          400: '#eec454',
          500: '#C89A3A',
          600: '#b78431',
          700: '#986829',
          800: '#7c5324',
          900: '#654320'
        },
        // Peach accent scale
        peach: {
          50: '#fef9f7',
          100: '#fdeee7',
          200: '#f9d8c9',
          300: '#F1C6B4',
          400: '#ecae98',
          500: '#e59074',
          600: '#d76f4f',
          700: '#b3563b',
          800: '#914633',
          900: '#753b2d'
        },
        // Base colors
        white: '#FFFFFF',
        black: '#000000'
      },
      fontFamily: {
        display: ['Lora', 'serif'],               // Display headings
        body: ['CenturyGothic', 'sans-serif']     // Body text
      },
      typography: {
        'amanda-content': {
          css: {
            '--tw-prose-body': '#191F3A',      // Navy 800
            '--tw-prose-headings': '#81171F',   // Burgundy 700
            '--tw-prose-quotes': '#9A454C'      // Burgundy 600
          }
        }
      }
    }
  }
}
```

### Task 1.3: Base Layout Implementation
**Priority:** HIGH  
**Estimated Time:** 2 hours

Create the foundational layout structure:

**File:** `src/_includes/layouts/base.njk`
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  {% include "partials/head.njk" %}
  {% include "partials/gtm-head.njk" %}
</head>
<body class="font-body bg-white text-navy-800">
  <!-- GTM noscript -->
  
  <main role="main" class="min-h-screen">
    {{ content | safe }}
  </main>
  
  {% include "partials/footer.njk" %}
  
  <!-- Scripts -->
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
```

**Accessibility Requirements:**
- Semantic HTML structure with proper heading hierarchy
- Skip navigation links for screen readers
- Language attributes for Portuguese content
- Color contrast ratios ≥4.5:1 for normal text
- Navy/burgundy color scheme maintains proper contrast ratios

---

## COMPONENT LIBRARY TASKS

### Task 2.1: Lead Capture Modal Component
**Priority:** CRITICAL  
**Estimated Time:** 6 hours

Build the primary conversion component as a Web Component:

**File:** `src/_includes/components/lead-capture-modal.njk`
```html
<lead-capture-modal id="questionario-modal" class="hidden">
  <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50">
    <div class="modal-content bg-white rounded-lg max-w-md mx-auto mt-20 p-6">
      <div class="modal-header flex justify-between items-center mb-6">
        <h2 class="text-2xl font-display text-navy-800">
          Descubra seu Perfil Amanda
        </h2>
        <button class="modal-close text-neutral-400 hover:text-neutral-600" 
                aria-label="Fechar modal">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <!-- Close icon SVG -->
          </svg>
        </button>
      </div>
      
      <form class="lead-form" data-form-type="amanda-qualification">
        <!-- Progressive form fields based on Amanda scoring -->
        <div class="form-step" data-step="1">
          <!-- Demographics (20 points) -->
        </div>
        
        <div class="form-step hidden" data-step="2">
          <!-- Pain Points (40 points) -->  
        </div>
        
        <div class="form-step hidden" data-step="3">
          <!-- Behavior (40 points) -->
        </div>
        
        <div class="form-actions mt-6">
          <button type="submit" 
                  class="w-full bg-burgundy-700 text-white py-3 rounded-lg 
                         hover:bg-burgundy-800 transition-colors">
            Quero minha transformação
          </button>
        </div>
      </form>
    </div>
  </div>
</lead-capture-modal>
```

**JavaScript Implementation:** `src/assets/js/modal-component.js`
- Custom element registration
- Progressive form disclosure logic
- Amanda scoring calculation
- Event tracking integration
- Mobile-optimized interactions

### Task 2.2: CTA Button Components
**Priority:** HIGH  
**Estimated Time:** 2 hours

Create consistent CTA components across all sections:

**File:** `src/_includes/components/cta-buttons.njk`
```html
<!-- Primary CTA Macro -->
{% macro primaryCTA(text, sectionId, ctaId) %}
<button class="cta-primary bg-burgundy-700 text-white px-8 py-4 rounded-lg 
               text-lg font-semibold hover:bg-burgundy-800 transition-all
               focus:ring-4 focus:ring-burgundy-200"
        data-modal-trigger="questionario-modal"
        data-source-section="{{ sectionId }}"
        data-cta-id="{{ ctaId }}"
        aria-describedby="cta-description-{{ ctaId }}">
  {{ text }}
</button>
{% endmacro %}

<!-- Secondary CTA Macro -->  
{% macro secondaryCTA(text, href, sectionId, ctaId) %}
<a href="{{ href }}"
   class="cta-secondary border-2 border-navy-800 text-navy-800 px-6 py-3 
          rounded-lg font-semibold hover:bg-navy-50 transition-all
          focus:ring-4 focus:ring-navy-200"
   data-source-section="{{ sectionId }}"
   data-cta-id="{{ ctaId }}">
  {{ text }}
</a>
{% endmacro %}
```

### Task 2.3: Testimonial Carousel Component
**Priority:** MEDIUM  
**Estimated Time:** 4 hours

Build social proof component optimized for mobile:

**Features Required:**
- Touch-friendly swipe gestures on mobile
- Automatic rotation with pause on interaction
- Schema.org structured data for SEO
- Accessibility with proper ARIA labels
- Amanda avatar alignment scoring display

### Task 2.4: Hero Section with Value Proposition
**Priority:** HIGH  
**Estimated Time:** 3 hours

Create the primary landing section:

```html
<section class="hero bg-gradient-to-br from-peach-50 to-neutral-100 py-16">
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="hero-content">
        <h1 class="text-4xl lg:text-6xl font-display text-navy-800 mb-6">
          De 12 horas exausta para 
          <span class="text-burgundy-700">empresária livre</span>
        </h1>
        
        <p class="text-xl font-body text-navy-600 mb-8 leading-relaxed">
          Transforme seu negócio em uma máquina que trabalha para você, 
          não contra você. Método comprovado para empreendedoras que 
          faturam R$20k+ mas querem sua liberdade de volta.
        </p>
        
        {{ primaryCTA("Quero minha transformação", "hero", "hero_primary") }}
        
        <div class="social-proof mt-8">
          <div class="flex items-center space-x-2">
            <div class="flex -space-x-2">
              <!-- Client photos -->
            </div>
            <span class="text-sm font-body text-neutral-600">
              +200 empreendedoras transformadas
            </span>
          </div>
        </div>
      </div>
      
      <div class="hero-image">
        <img src="/assets/images/hero-amanda.jpg" 
             alt="Mulher empreendedora confiante trabalhando com liberdade"
             class="rounded-lg shadow-2xl w-full h-auto"
             loading="eager">
      </div>
    </div>
  </div>
</section>
```

---

## LANDING PAGE STRUCTURE TASKS

### Task 3.1: 9-Section Landing Page Implementation
**Priority:** CRITICAL  
**Estimated Time:** 8 hours

Implement the complete landing page structure with "Must Prove → Evidence → CTA" logic:

**Section Structure:**
1. **Hero:** Value proposition + primary CTA
2. **Problem Agitation:** Amanda's pain points with emotional resonance
3. **Solution Introduction:** Mentoring approach overview
4. **Social Proof:** Testimonials and transformation stories
5. **Method Breakdown:** Module 1.1 and 1.4 preview
6. **About/Authority:** Mentor credibility and background
7. **Objection Handling:** Common concerns and responses
8. **Final CTA:** Urgency and scarcity elements
9. **Footer:** Contact, policies, social links

**Each Section Must Include:**
- Semantic HTML structure (`<section>`, proper headings)
- Mobile-first responsive design
- Accessibility attributes (ARIA labels, alt text)
- Performance optimization (lazy loading for below-fold)
- Analytics tracking preparation

### Task 3.2: Mobile-First Responsive Implementation
**Priority:** HIGH  
**Estimated Time:** 4 hours

Ensure perfect mobile experience across all viewport sizes:

**Breakpoint Strategy:**
```css
/* Mobile-first approach */
.container {
  @apply px-4;
}

@screen sm {
  .container {
    @apply px-6;
  }
}

@screen md {
  .container {
    @apply px-8;
  }
}

@screen lg {
  .container {
    @apply px-12 max-w-7xl mx-auto;
  }
}
```

**Mobile Optimizations:**
- Touch-friendly button sizes (minimum 44px)
- Readable font sizes without zoom (16px minimum)
- Proper spacing between interactive elements
- Horizontal scrolling elimination
- Modal behavior optimized for mobile keyboards

---

## ACCESSIBILITY IMPLEMENTATION TASKS

### Task 4.1: Semantic HTML Structure
**Priority:** CRITICAL  
**Estimated Time:** 3 hours

Implement proper semantic structure throughout:

**Requirements:**
- Logical heading hierarchy (h1 → h2 → h3)
- Landmark roles (`main`, `navigation`, `contentinfo`)
- Form labels and descriptions
- Image alt text following descriptive guidelines
- Link text that makes sense out of context

### Task 4.2: ARIA Patterns Implementation
**Priority:** HIGH  
**Estimated Time:** 2 hours

Add ARIA attributes for screen reader optimization:

**Modal ARIA Pattern:**
```html
<div role="dialog" 
     aria-labelledby="modal-title"
     aria-describedby="modal-description"
     aria-modal="true">
  <!-- Modal content -->
</div>
```

**Form ARIA Enhancements:**
```html
<div class="form-group">
  <label for="email" class="sr-only">Seu melhor email</label>
  <input type="email" 
         id="email"
         aria-describedby="email-hint email-error"
         aria-required="true"
         aria-invalid="false">
  <div id="email-hint" class="form-hint">
    Enviaremos o questionário completo por email
  </div>
  <div id="email-error" class="form-error hidden" role="alert">
    <!-- Error message -->
  </div>
</div>
```

### Task 4.3: Keyboard Navigation
**Priority:** HIGH  
**Estimated Time:** 2 hours

Ensure complete keyboard accessibility:

**Requirements:**
- Tab order logical and intuitive
- Focus indicators visible and high-contrast
- Modal focus trapping
- Skip links for screen readers
- All interactive elements keyboard accessible

---

## PERFORMANCE OPTIMIZATION TASKS

### Task 5.1: Image Optimization Pipeline  
**Priority:** HIGH  
**Estimated Time:** 2 hours

Set up automated image optimization:

```javascript
// vite.config.js - Image processing
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  plugins: [
    // Image optimization plugin
  ]
});
```

**Image Requirements:**
- WebP format with fallbacks
- Responsive images with srcset
- Lazy loading for below-fold images
- Proper alt text for all images
- Size optimization without quality loss

### Task 5.2: Code Splitting Strategy
**Priority:** MEDIUM  
**Estimated Time:** 2 hours

Implement strategic code splitting for performance:

```javascript
// main.js - Conditional loading
// Core functionality loaded immediately
import './analytics.js';

// Modal loaded on first CTA interaction
let modalComponent = null;
document.addEventListener('click', async (e) => {
  if (e.target.matches('[data-modal-trigger]')) {
    if (!modalComponent) {
      modalComponent = await import('./modal-component.js');
    }
    modalComponent.show();
  }
});
```

### Task 5.3: Lazy Loading Implementation
**Priority:** MEDIUM  
**Estimated Time:** 1 hour

Implement comprehensive lazy loading:

```html
<!-- Images -->
<img src="/assets/images/hero-amanda.jpg" 
     loading="lazy"
     decoding="async"
     alt="...">

<!-- Background images via CSS -->
<div class="lazy-bg" data-bg="/assets/images/testimonial-bg.jpg">
  <!-- Content -->
</div>
```

---

## VALIDATION AND TESTING TASKS

### Task 6.1: Accessibility Testing Setup
**Priority:** CRITICAL  
**Estimated Time:** 1 hour

Configure automated accessibility testing:

```bash
# Install testing tools
npm install --save-dev @axe-core/cli pa11y-ci

# Add to package.json scripts
{
  "scripts": {
    "test:a11y": "axe --dir dist --exclude '#gtm'",
    "test:pa11y": "pa11y-ci --sitemap http://localhost:8080/sitemap.xml"
  }
}
```

### Task 6.2: Cross-Browser Testing
**Priority:** HIGH  
**Estimated Time:** 2 hours

Test across required browser matrix:
- Chrome (latest)
- Safari (latest)  
- Firefox (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Task 6.3: Performance Validation
**Priority:** HIGH  
**Estimated Time:** 1 hour

Run comprehensive performance testing:

```bash
# Lighthouse CI configuration
npm install --save-dev @lhci/cli

# lighthouse.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:8080/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

---

## GATE 1 COMPLETION CHECKLIST

### Technical Validation
- [ ] `npm run build` completes successfully
- [ ] `npm run dev` serves site without errors
- [ ] All components render correctly
- [ ] Modal functionality operational
- [ ] Forms ready for integration
- [ ] Responsive design validated

### Quality Validation  
- [ ] axe-core accessibility test passes (0 violations)
- [ ] Lighthouse Performance score ≥90
- [ ] Lighthouse Accessibility score ≥95
- [ ] Cross-browser compatibility verified
- [ ] Mobile optimization confirmed

### Code Quality
- [ ] ESLint passes with zero errors
- [ ] Prettier formatting applied
- [ ] TypeScript types where applicable
- [ ] Comments and documentation complete

### Deliverables for Gate Progression
1. **Working prototype** at localhost with all components
2. **Screenshot gallery** showing all UI states
3. **Accessibility audit results** with zero violations
4. **Performance report** meeting all targets
5. **Component documentation** for handoff to FCI

**Gate 1 Status:** Ready for validation by EPL  
**Next Gate:** Gate 2 (integrations_ok) - FCI takes over with working UI foundation
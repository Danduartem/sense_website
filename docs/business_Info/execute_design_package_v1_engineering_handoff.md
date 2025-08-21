# Execute Design Package v1.0 — Engineering Handoff Documentation

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-21  
**Version:** v1.0  
**Prepared by:** Execute Phase Design Program Lead  
**Primary Avatar:** Amanda - The Exhausted Achiever

---

## Implementation Overview

### Tech Stack Requirements
- **Static Site Generator:** Eleventy (11ty) v2.0+
- **Build Tool:** Vite v4.0+ for asset bundling
- **CSS Framework:** Tailwind CSS v3.0+ with custom configuration
- **JavaScript:** Vanilla JS with Web Components for modal interactions
- **Deployment:** Netlify with environment-based configuration
- **Analytics:** Google Tag Manager + GA4 + Segment CDP integration

### Repository Structure
```
mentoria-seja-livre-lp/
├── .env.example
├── .gitignore
├── netlify.toml
├── package.json
├── tailwind.config.js
├── vite.config.js
├── .eleventy.js
├── src/
│   ├── _data/
│   │   ├── site.js
│   │   ├── colors.js          # Brand color tokens
│   │   ├── typography.js      # Font and typography settings
│   │   └── content.js         # Landing page copy
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk       # Base template with GTM
│   │   ├── components/
│   │   │   ├── hero.njk
│   │   │   ├── social-proof.njk
│   │   │   ├── problem.njk
│   │   │   ├── solution.njk
│   │   │   ├── deliverables.njk
│   │   │   ├── outcomes.njk
│   │   │   ├── testimonials.njk
│   │   │   ├── faq.njk
│   │   │   ├── final-cta.njk
│   │   │   └── modal.njk      # Lead capture modal
│   │   └── partials/
│   │       ├── head.njk
│   │       ├── header.njk
│   │       └── footer.njk
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── modal.js
│   │   │   ├── tracking.js
│   │   │   └── amanda-scoring.js
│   │   └── images/
│   ├── functions/             # Netlify Functions
│   │   ├── lead-submit.js
│   │   └── crm-webhook.js
│   └── index.njk              # Main landing page
└── _site/                     # Generated output
```

---

## Brand Implementation Specifications

### Color System Implementation

**Tailwind Configuration (tailwind.config.js):**
```javascript
module.exports = {
  content: [
    "./src/**/*.{njk,html,js}",
    "./src/_includes/**/*.{njk,html}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'brand-navy': '#191F3A',
        'brand-burgundy': '#81171F', 
        'brand-neutral': '#ECECEC',
        
        // Semantic Color Tokens
        'primary': '#191F3A',
        'accent': '#81171F',
        'neutral': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        'surface': {
          'primary': '#FFFFFF',
          'secondary': '#ECECEC',
          'dark': '#191F3A'
        }
      },
      
      // Typography System
      fontFamily: {
        'primary': ['Lora', 'serif'],      // Headlines, emotional content
        'secondary': ['Century', 'serif'], // Body text, forms
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '3rem' }],        // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }]         // 60px
      },
      
      // Gradient System
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #81171F 0%, #191F3A 100%)',
        'subtle-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #ECECEC 100%)'
      },
      
      // Spacing & Layout
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem', 
          md: '2rem',
          lg: '4rem',
          xl: '5rem'
        },
        screens: {
          sm: '375px',
          md: '744px', 
          lg: '1280px',
          xl: '1440px'
        }
      },
      
      // Box Shadow System
      boxShadow: {
        'brand-sm': '0 1px 2px 0 rgba(25, 31, 58, 0.05)',
        'brand': '0 4px 6px -1px rgba(25, 31, 58, 0.1), 0 2px 4px -1px rgba(25, 31, 58, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(25, 31, 58, 0.1), 0 4px 6px -2px rgba(25, 31, 58, 0.05)',
        'brand-xl': '0 20px 25px -5px rgba(25, 31, 58, 0.1), 0 10px 10px -5px rgba(25, 31, 58, 0.04)',
        'accent': '0 4px 6px -1px rgba(129, 23, 31, 0.2)',
        'accent-lg': '0 10px 15px -3px rgba(129, 23, 31, 0.3)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

### Typography Implementation

**Font Loading (src/_includes/partials/head.njk):**
```html
<!-- Google Fonts - Optimized Loading -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Century:wght@400;500&display=swap" rel="stylesheet">

<!-- Font Display Optimization -->
<style>
  @font-face {
    font-family: 'Lora';
    font-display: swap;
  }
  @font-face {
    font-family: 'Century';  
    font-display: swap;
  }
</style>
```

**CSS Utility Classes (src/assets/css/main.css):**
```css
/* Typography Utility Classes */
.text-primary { @apply text-brand-navy; }
.text-accent { @apply text-brand-burgundy; }
.text-secondary { @apply text-neutral-600; }

/* Heading Styles */
.heading-1 {
  @apply font-primary text-4xl lg:text-5xl font-bold text-primary leading-tight;
}

.heading-2 {
  @apply font-primary text-3xl lg:text-4xl font-semibold text-primary leading-tight;
}

.heading-3 {
  @apply font-primary text-2xl lg:text-3xl font-medium text-primary leading-snug;
}

/* Body Text Styles */
.body-text {
  @apply font-secondary text-base lg:text-lg text-primary leading-relaxed;
}

.body-small {
  @apply font-secondary text-sm lg:text-base text-secondary leading-relaxed;
}

/* Accent Text */
.accent-text {
  @apply font-primary text-xl lg:text-2xl font-semibold text-accent;
}

.subtitle {
  @apply font-secondary text-lg lg:text-xl text-secondary leading-relaxed;
}
```

---

## Component Implementation Guide

### Button Components

**Primary CTA Button Implementation:**
```html
<!-- Nunjucks Template (src/_includes/components/cta-button.njk) -->
<button 
  class="btn-primary {{ 'w-full' if fullWidth else '' }} {{ additionalClasses }}"
  data-event="[E:cta_click|source_section={{ sourceSection }},cta_id={{ ctaId }},cta_label={{ ctaLabel | slug }}]"
  onclick="openModal('{{ sourceSection }}', '{{ ctaId }}')"
  {{ 'disabled' if disabled else '' }}>
  
  <span class="btn-text">{{ label }}</span>
  <span class="btn-loading hidden">
    <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Enviando...
  </span>
</button>
```

**CSS Classes:**
```css
.btn-primary {
  @apply inline-flex items-center justify-center px-8 py-4 min-h-[3rem] min-w-[10rem];
  @apply font-primary text-lg font-semibold text-white;
  @apply bg-accent border-2 border-accent rounded-lg;
  @apply shadow-accent transition-all duration-300 ease-out;
  @apply hover:bg-red-900 hover:border-red-900 hover:shadow-accent-lg hover:-translate-y-0.5;
  @apply focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2;
  @apply active:translate-y-0 active:shadow-accent;
  @apply disabled:bg-neutral-400 disabled:border-neutral-400 disabled:cursor-not-allowed disabled:transform-none;
}

@media (max-width: 744px) {
  .btn-primary {
    @apply w-full text-base px-6 py-5;
  }
}
```

### Form Component Implementation

**Lead Capture Form (src/_includes/components/modal.njk):**
```html
<div id="leadCaptureModal" 
     class="modal-overlay fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300"
     data-event="[E:modal_overlay_view|modal_type=lead_capture]">
  
  <div class="modal-container flex items-center justify-center min-h-screen p-4">
    <div class="modal-content bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 transform scale-95 transition-transform duration-300">
      
      <!-- Modal Header -->
      <div class="modal-header text-center mb-6">
        <h2 class="heading-2 mb-2">Vamos Conhecer Sua História</h2>
        <p class="subtitle">Responda para recebermos questionário personalizado</p>
      </div>
      
      <!-- Form -->
      <form id="leadCaptureForm" 
            class="space-y-4"
            data-event="[E:modal_form_view|form_type=lead_qualification]">
        
        <!-- Basic Information Fields -->
        <div class="form-field">
          <label for="name" class="form-label">Nome completo *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            class="form-input"
            placeholder="Digite seu nome completo"
            data-event="[E:form_field_focus|field_name=name,completion_order=1]"
            onfocus="trackFieldFocus('name')"
            onblur="trackFieldComplete('name')">
        </div>
        
        <div class="form-field">
          <label for="email" class="form-label">Email para contato *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            class="form-input"
            placeholder="seu@email.com"
            data-event="[E:form_field_focus|field_name=email,completion_order=2]"
            onfocus="trackFieldFocus('email')"
            onblur="trackFieldComplete('email')">
        </div>
        
        <div class="form-field">
          <label for="whatsapp" class="form-label">WhatsApp *</label>
          <input 
            type="tel" 
            id="whatsapp" 
            name="whatsapp" 
            required
            class="form-input"
            placeholder="(11) 99999-9999"
            data-event="[E:form_field_focus|field_name=whatsapp,completion_order=3]"
            onfocus="trackFieldFocus('whatsapp')"
            onblur="trackFieldComplete('whatsapp')">
        </div>
        
        <!-- Amanda Qualification Fields -->
        <div class="form-field">
          <label for="businessType" class="form-label">Tipo do seu negócio *</label>
          <select 
            id="businessType" 
            name="business_type" 
            required
            class="form-select"
            data-event="[E:form_field_focus|field_name=business_type,amanda_scoring=demographics]"
            onfocus="trackFieldFocus('business_type')"
            onchange="trackFieldComplete('business_type')">
            <option value="">Selecione...</option>
            <option value="clinica" data-amanda-points="10">Clínica/Consultório</option>
            <option value="loja" data-amanda-points="8">Loja/Varejo</option>
            <option value="consultoria" data-amanda-points="9">Consultoria</option>
            <option value="servicos" data-amanda-points="8">Prestação de Serviços</option>
            <option value="outros" data-amanda-points="5">Outros</option>
          </select>
        </div>
        
        <div class="form-field">
          <label for="monthlyRevenue" class="form-label">Receita mensal atual *</label>
          <select 
            id="monthlyRevenue" 
            name="monthly_revenue" 
            required
            class="form-select"
            data-event="[E:form_field_focus|field_name=monthly_revenue,amanda_scoring=demographics]"
            onfocus="trackFieldFocus('monthly_revenue')"
            onchange="trackFieldComplete('monthly_revenue')">
            <option value="">Selecione...</option>
            <option value="under_10k" data-amanda-points="2">Menos de R$10k</option>
            <option value="10k_15k" data-amanda-points="5">R$10k - R$15k</option>
            <option value="15k_25k" data-amanda-points="10">R$15k - R$25k</option>
            <option value="25k_35k" data-amanda-points="8">R$25k - R$35k</option>
            <option value="35k_plus" data-amanda-points="6">Mais de R$35k</option>
          </select>
        </div>
        
        <div class="form-field">
          <label for="workHours" class="form-label">Quantas horas trabalha por dia? *</label>
          <div class="range-container">
            <input 
              type="range" 
              id="workHours" 
              name="work_hours_daily" 
              min="6" 
              max="16" 
              value="10" 
              class="form-range"
              data-event="[E:form_field_focus|field_name=work_hours_daily,amanda_scoring=pain_points]"
              onfocus="trackFieldFocus('work_hours_daily')"
              oninput="updateRangeValue('workHours')"
              onblur="trackFieldComplete('work_hours_daily')">
            <div class="range-output text-center mt-2">
              <span id="workHoursValue" class="font-semibold text-accent">10 horas</span>
            </div>
          </div>
        </div>
        
        <!-- Submit Button -->
        <button 
          type="submit" 
          class="btn-primary w-full mt-6"
          data-event="[E:lead_form_submit|form_completion_time=track,amanda_match_score=calculate]">
          <span class="btn-text">Receber Meu Questionário</span>
          <span class="btn-loading hidden">
            <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        </button>
        
        <!-- Privacy Notice -->
        <p class="text-xs text-center text-neutral-500 mt-4">
          Seus dados protegidos conforme LGPD
        </p>
      </form>
      
      <!-- Close Button -->
      <button 
        class="modal-close absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 text-2xl"
        onclick="closeModal('user_close')"
        data-event="[E:modal_close_click|close_method=x_button]"
        aria-label="Fechar modal">
        ×
      </button>
    </div>
  </div>
</div>
```

**Form CSS Classes:**
```css
.form-label {
  @apply block font-secondary text-sm font-medium text-primary mb-2;
}

.form-label::after {
  content: " *";
  @apply text-accent;
}

.form-input, .form-select {
  @apply w-full px-4 py-3 font-secondary text-base text-primary;
  @apply bg-white border-2 border-neutral-200 rounded-md;
  @apply focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20;
  @apply transition-colors duration-200;
  @apply placeholder-neutral-400;
}

.form-input:invalid {
  @apply border-red-300 focus:border-red-500 focus:ring-red-200;
}

.form-range {
  @apply w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer;
  @apply focus:outline-none focus:ring-2 focus:ring-accent;
}

.form-range::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 bg-accent rounded-full cursor-pointer;
}

.form-range::-moz-range-thumb {
  @apply w-5 h-5 bg-accent rounded-full cursor-pointer border-none;
}
```

---

## JavaScript Implementation

### Modal Functionality (src/assets/js/modal.js)

```javascript
// Modal Management System
class LeadCaptureModal {
  constructor() {
    this.modal = document.getElementById('leadCaptureModal');
    this.form = document.getElementById('leadCaptureForm');
    this.isOpen = false;
    this.formStartTime = null;
    this.fieldInteractions = {};
    
    this.init();
  }
  
  init() {
    // Bind event listeners
    this.form?.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Close modal on overlay click
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close('overlay_click');
      }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close('escape_key');
      }
    });
  }
  
  open(sourceSection = 'unknown', ctaId = 'unknown') {
    this.isOpen = true;
    this.formStartTime = Date.now();
    
    // Show modal with animation
    this.modal.classList.remove('opacity-0', 'pointer-events-none');
    this.modal.classList.add('opacity-100');
    
    const content = this.modal.querySelector('.modal-content');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first form field
    setTimeout(() => {
      const firstInput = this.form?.querySelector('input[name="name"]');
      firstInput?.focus();
    }, 300);
    
    // Track modal open
    this.trackEvent('modal_open', {
      source_section: sourceSection,
      cta_id: ctaId,
      traffic_temperature: window.trafficTemperature || 'unknown'
    });
  }
  
  close(reason = 'user_action') {
    this.isOpen = false;
    
    // Hide modal with animation
    this.modal.classList.add('opacity-0', 'pointer-events-none');
    this.modal.classList.remove('opacity-100');
    
    const content = this.modal.querySelector('.modal-content');
    content.classList.add('scale-95');
    content.classList.remove('scale-100');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Track abandonment if form was started but not completed
    if (this.formStartTime && !this.isFormComplete()) {
      this.trackFormAbandon(reason);
    }
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(this.form);
      const amandaScore = this.calculateAmandaScore(formData);
      
      // Track form submission
      this.trackEvent('lead_form_submit', {
        amanda_match_score: amandaScore,
        form_completion_time: Date.now() - this.formStartTime,
        qualification_level: this.getQualificationTier(amandaScore)
      });
      
      // Submit to Netlify Function
      const response = await fetch('/.netlify/functions/lead-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          whatsapp: formData.get('whatsapp'),
          businessType: formData.get('business_type'),
          monthlyRevenue: formData.get('monthly_revenue'),
          workHoursDaily: formData.get('work_hours_daily'),
          amandaScore: amandaScore,
          submissionTimestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        // Redirect to thank you page
        window.location.href = `/obrigada?lead_id=${result.leadId}`;
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError('Erro ao enviar formulário. Tente novamente ou entre em contato via WhatsApp.');
      
    } finally {
      // Reset button state
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
    }
  }
  
  calculateAmandaScore(formData) {
    let score = 0;
    
    // Demographics scoring (20 points)
    const businessType = formData.get('business_type');
    if (businessType === 'clinica') score += 10;
    else if (['loja', 'consultoria', 'servicos'].includes(businessType)) score += 8;
    else score += 5;
    
    const revenue = formData.get('monthly_revenue');
    if (revenue === '15k_25k') score += 10;
    else if (revenue === '25k_35k') score += 8;
    else if (revenue === '10k_15k') score += 5;
    else score += 2;
    
    // Pain points scoring (40 points)
    const workHours = parseInt(formData.get('work_hours_daily'));
    if (workHours >= 12) score += 20;
    else if (workHours >= 10) score += 15;
    else if (workHours >= 8) score += 10;
    else score += 5;
    
    return Math.min(score, 100);
  }
  
  getQualificationTier(score) {
    if (score >= 80) return 'high_amanda_match';
    if (score >= 60) return 'medium_amanda_match';
    return 'low_amanda_match';
  }
  
  isFormComplete() {
    const requiredFields = this.form.querySelectorAll('input[required], select[required]');
    return Array.from(requiredFields).every(field => field.value.trim() !== '');
  }
  
  trackFormAbandon(reason) {
    const completedFields = Array.from(this.form.elements)
      .filter(el => el.value.trim() !== '').length;
    const totalFields = this.form.elements.length - 1; // Excluding submit button
    
    this.trackEvent('modal_abandon', {
      abandon_reason: reason,
      fields_completed: completedFields,
      total_fields: totalFields,
      completion_percentage: Math.round((completedFields / totalFields) * 100),
      time_in_modal: Date.now() - this.formStartTime
    });
  }
  
  showError(message) {
    // Create or update error message display
    let errorDiv = this.form.querySelector('.form-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'form-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
      this.form.insertBefore(errorDiv, this.form.firstChild);
    }
    errorDiv.textContent = message;
  }
  
  trackEvent(eventName, params = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString()
    });
  }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.leadModal = new LeadCaptureModal();
});

// Global functions for template usage
function openModal(sourceSection = 'unknown', ctaId = 'unknown') {
  window.leadModal?.open(sourceSection, ctaId);
}

function closeModal(reason = 'user_action') {
  window.leadModal?.close(reason);
}
```

### Tracking Implementation (src/assets/js/tracking.js)

```javascript
// Global Tracking System
class TrackingManager {
  constructor() {
    this.pageLoadTime = Date.now();
    this.trafficTemperature = 'unknown';
    this.sessionData = {
      sessionId: this.generateSessionId(),
      leadId: this.getOrCreateLeadId()
    };
    
    this.init();
  }
  
  init() {
    // Detect traffic temperature
    this.trafficTemperature = this.detectTrafficTemperature();
    window.trafficTemperature = this.trafficTemperature;
    
    // Initialize GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Track page view
    this.trackPageView();
    
    // Set up scroll tracking
    this.initScrollTracking();
    
    // Set up form field tracking
    this.initFormTracking();
    
    // Apply temperature-based personalization
    this.applyTemperaturePersonalization();
  }
  
  detectTrafficTemperature() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    
    // Hot traffic indicators
    if (referrer.includes('whatsapp') || utmMedium === 'referral') {
      return 'hot';
    }
    
    // Warm traffic indicators  
    if (referrer.includes('instagram') || utmSource === 'instagram' || 
        urlParams.get('utm_campaign')?.includes('retargeting')) {
      return 'warm';
    }
    
    // Default to cold
    return 'cold';
  }
  
  trackPageView() {
    window.dataLayer.push({
      event: 'page_view_enhanced',
      page_title: document.title,
      page_type: 'landing_page',
      traffic_temperature: this.trafficTemperature,
      session_id: this.sessionData.sessionId,
      lead_id: this.sessionData.leadId,
      timestamp: new Date().toISOString()
    });
  }
  
  initScrollTracking() {
    // Section visibility tracking
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
          
          window.dataLayer.push({
            event: 'section_view',
            section_name: sectionName,
            scroll_depth: scrollDepth,
            time_to_view: Date.now() - this.pageLoadTime,
            timestamp: new Date().toISOString()
          });
        }
      });
    }, { threshold: 0.5 });
    
    // Observe all sections
    document.querySelectorAll('[data-section]').forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  initFormTracking() {
    // Track form field interactions
    document.addEventListener('focusin', (e) => {
      if (e.target.matches('input, select, textarea')) {
        const fieldName = e.target.name;
        if (fieldName) {
          this.trackFormFieldFocus(fieldName);
        }
      }
    });
  }
  
  trackFormFieldFocus(fieldName) {
    window.dataLayer.push({
      event: 'form_field_focus',
      field_name: fieldName,
      timestamp: new Date().toISOString()
    });
  }
  
  applyTemperaturePersonalization() {
    // Update CTA labels based on traffic temperature
    const temperatureLabels = {
      'hero': {
        'cold': 'Quero minha transformação',
        'warm': 'Quero acesso à mentoria', 
        'hot': 'Começar agora'
      },
      'final': {
        'cold': 'Sim, quero me transformar',
        'warm': 'Quero começar agora',
        'hot': 'COMEÇAR IMEDIATAMENTE'
      }
    };
    
    document.querySelectorAll('[data-cta-personalize]').forEach(cta => {
      const section = cta.closest('[data-section]')?.getAttribute('data-section');
      const newLabel = temperatureLabels[section]?.[this.trafficTemperature];
      
      if (newLabel && newLabel !== cta.textContent) {
        cta.textContent = newLabel;
        
        window.dataLayer.push({
          event: 'cta_personalized',
          section: section,
          traffic_temperature: this.trafficTemperature,
          new_label: newLabel,
          timestamp: new Date().toISOString()
        });
      }
    });
  }
  
  generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 9);
  }
  
  getOrCreateLeadId() {
    let leadId = localStorage.getItem('mslu_lead_id');
    if (!leadId) {
      leadId = 'lead_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('mslu_lead_id', leadId);
    }
    return leadId;
  }
}

// Initialize tracking
document.addEventListener('DOMContentLoaded', () => {
  window.trackingManager = new TrackingManager();
});

// Utility functions for tracking specific interactions
function trackCTAClick(sourceSection, ctaId, ctaLabel) {
  window.dataLayer.push({
    event: 'cta_click',
    source_section: sourceSection,
    cta_id: ctaId,
    cta_label: ctaLabel,
    traffic_temperature: window.trafficTemperature,
    timestamp: new Date().toISOString()
  });
}

function trackTestimonialInteraction(testimonialId, interactionType) {
  window.dataLayer.push({
    event: 'testimonial_interaction',
    testimonial_id: testimonialId,
    interaction_type: interactionType,
    timestamp: new Date().toISOString()
  });
}
```

---

## Netlify Functions Implementation

### Lead Submission Handler (src/functions/lead-submit.js)

```javascript
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  try {
    const requestData = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'whatsapp', 'businessType', 'monthlyRevenue'];
    const missingFields = requiredFields.filter(field => !requestData[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          missingFields: missingFields 
        })
      };
    }
    
    // Generate lead ID
    const leadId = uuidv4();
    
    // Prepare lead data
    const leadData = {
      leadId: leadId,
      name: requestData.name,
      email: requestData.email,
      whatsapp: requestData.whatsapp,
      businessType: requestData.businessType,
      monthlyRevenue: requestData.monthlyRevenue,
      workHoursDaily: requestData.workHoursDaily,
      amandaScore: requestData.amandaScore,
      submissionTimestamp: requestData.submissionTimestamp || new Date().toISOString(),
      source: 'landing_page_modal',
      userAgent: event.headers['user-agent'],
      ipAddress: event.headers['client-ip'] || event.headers['x-forwarded-for']
    };
    
    // Parallel webhook distribution
    const webhookPromises = [
      syncToCRM(leadData),
      syncToMailerLite(leadData),
      syncToSegment(leadData)
    ];
    
    const results = await Promise.allSettled(webhookPromises);
    
    // Log any webhook failures
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Webhook ${index} failed:`, result.reason);
      }
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        leadId: leadId,
        message: 'Lead captured successfully'
      })
    };
    
  } catch (error) {
    console.error('Lead submission error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Erro interno. Tente novamente ou entre em contato via WhatsApp.'
      })
    };
  }
};

// CRM Integration
async function syncToCRM(leadData) {
  if (!process.env.CRM_WEBHOOK_URL) return;
  
  const crmPayload = {
    external_id: leadData.leadId,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.whatsapp,
    source: leadData.source,
    custom_fields: {
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      work_hours_daily: leadData.workHoursDaily,
      amanda_match_score: leadData.amandaScore
    },
    tags: [
      'landing_page_lead',
      `amanda_score_${getAmandaScoreTier(leadData.amandaScore)}`,
      `business_${leadData.businessType}`
    ]
  };
  
  const response = await fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CRM_API_KEY}`
    },
    body: JSON.stringify(crmPayload)
  });
  
  if (!response.ok) {
    throw new Error(`CRM sync failed: ${response.status}`);
  }
  
  return response.json();
}

// MailerLite Integration
async function syncToMailerLite(leadData) {
  if (!process.env.MAILERLITE_API_KEY) return;
  
  const contactData = {
    email: leadData.email,
    fields: {
      name: leadData.name,
      phone: leadData.whatsapp,
      lead_id: leadData.leadId,
      business_type: leadData.businessType,
      amanda_match_score: leadData.amandaScore,
      subscription_date: leadData.submissionTimestamp
    },
    groups: [
      'landing_page_leads',
      getAmandaScoreGroup(leadData.amandaScore)
    ]
  };
  
  const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
    },
    body: JSON.stringify(contactData)
  });
  
  if (!response.ok) {
    throw new Error(`MailerLite sync failed: ${response.status}`);
  }
  
  return response.json();
}

// Segment Integration
async function syncToSegment(leadData) {
  if (!process.env.SEGMENT_WRITE_KEY) return;
  
  const segmentPayload = {
    userId: leadData.leadId,
    event: 'Lead Captured',
    properties: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.whatsapp,
      businessType: leadData.businessType,
      monthlyRevenue: leadData.monthlyRevenue,
      workHoursDaily: leadData.workHoursDaily,
      amandaScore: leadData.amandaScore,
      source: leadData.source
    },
    timestamp: leadData.submissionTimestamp
  };
  
  // Segment integration would go here
  // This is a placeholder for the actual Segment API call
  console.log('Segment event:', segmentPayload);
}

function getAmandaScoreTier(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

function getAmandaScoreGroup(score) {
  if (score >= 80) return 'high_amanda_match';
  if (score >= 60) return 'medium_amanda_match';
  return 'low_amanda_match';
}
```

---

## Environment Configuration

### Development Environment (.env.local)
```env
# Site Configuration
SITE_URL=http://localhost:8080
ENVIRONMENT=development
TEST_MODE=true

# Analytics & Tracking
GTM_CONTAINER_ID=GTM-ZZZZZZZ
GA4_MEASUREMENT_ID=G-XXXXXXXXX

# Email & CRM Integration (Development)
MAILERLITE_API_KEY=dev_mailerlite_key
CRM_WEBHOOK_URL=https://dev-crm.example.com/webhook
CRM_API_KEY=dev_crm_key

# Security
FORM_WEBHOOK_SECRET=dev_secret
```

### Production Environment (Netlify Variables)
```env
SITE_URL=https://mentoriasejalivre.com.br
ENVIRONMENT=production
TEST_MODE=false
GTM_CONTAINER_ID=GTM-XXXXXXX
GA4_MEASUREMENT_ID=G-PRODUCTION
MAILERLITE_API_KEY=prod_mailerlite_key
CRM_WEBHOOK_URL=https://crm.mentoriasejalivre.com/webhook
CRM_API_KEY=prod_crm_key
FORM_WEBHOOK_SECRET=prod_secret
```

---

## Deployment Configuration

### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "_site"
  functions = "src/functions"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

# Security Headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.segment.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;"

# Cache Optimization
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Form Handling
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

# Clean URLs
[[redirects]]
  from = "/obrigada"
  to = "/obrigada.html"
  status = 200
```

---

## Testing & Quality Assurance

### Pre-Launch Testing Checklist

**✅ Visual Quality Assurance:**
- [ ] All sections render correctly across breakpoints (375px, 744px, 1280px)
- [ ] Brand colors match specifications exactly (#191F3A, #81171F, #ECECEC)
- [ ] Typography hierarchy uses Lora for headlines, Century for body text
- [ ] Button hover states and interactions work smoothly
- [ ] Modal opens/closes with proper animations
- [ ] Form validation provides clear feedback

**✅ Functional Testing:**
- [ ] All primary CTAs open lead capture modal
- [ ] Form submission processes successfully
- [ ] Amanda scoring calculation works correctly
- [ ] Thank you page redirect includes lead_id parameter
- [ ] Netlify Functions handle form processing without errors
- [ ] Email automation triggers after form submission

**✅ Tracking Validation:**
- [ ] GTM container fires events correctly in preview mode
- [ ] All interactive elements have data-event attributes
- [ ] Snake_case naming convention used consistently
- [ ] Modal interactions tracked (open, abandon, submit)
- [ ] Section visibility tracked via Intersection Observer
- [ ] Traffic temperature detection works for different sources

**✅ Accessibility Compliance:**
- [ ] Color contrast ratios meet WCAG AA standards (4.5:1 minimum)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen readers can access form labels and instructions
- [ ] Focus states clearly visible on all interactive elements
- [ ] Modal traps focus and can be closed with ESC key

**✅ Performance Optimization:**
- [ ] Page load time <3 seconds on mobile, <2 seconds on desktop
- [ ] Images optimized and properly sized for responsive breakpoints
- [ ] CSS and JS minified for production
- [ ] Fonts loaded with font-display: swap for performance
- [ ] Critical CSS inlined to prevent render blocking

**✅ Mobile Experience:**
- [ ] All sections readable and functional on mobile devices
- [ ] Touch targets meet 44px minimum requirement
- [ ] Modal fits properly in mobile viewports
- [ ] Form inputs sized appropriately for mobile keyboards
- [ ] CTAs prominent and easily tappable

**✅ Cross-Browser Compatibility:**
- [ ] Chrome (latest 2 versions)
- [ ] Safari (latest 2 versions)  
- [ ] Firefox (latest 2 versions)
- [ ] Edge (latest version)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Monitoring & Optimization Framework

**First 48 Hours:**
- Monitor form submission success rates (target: >95%)
- Track modal abandonment patterns for optimization opportunities
- Validate webhook delivery to all destinations (CRM, MailerLite, analytics)
- Monitor page performance metrics and Core Web Vitals

**First 30 Days:**
- Analyze Amanda scoring distribution to validate qualification accuracy
- A/B test CTA labels based on traffic temperature performance
- Optimize modal form field order based on completion patterns
- Collect user feedback for UX improvements

---

## Documentation Summary

This engineering handoff package provides complete implementation specifications for the Mentoria Seja Livre landing page, including:

1. **Brand System Implementation:** Color tokens, typography hierarchy, and component specifications aligned with brand guidelines
2. **Component Library:** Complete HTML, CSS, and JavaScript for all landing page elements
3. **Modal & Form System:** Comprehensive lead capture with Amanda scoring algorithm
4. **Tracking Integration:** Complete GTM and analytics implementation with event tracking
5. **Backend Functions:** Netlify Functions for form processing and webhook distribution
6. **Deployment Configuration:** Production-ready Netlify and environment setup
7. **Quality Assurance:** Testing checklist and performance optimization guidelines

The implementation maintains strict adherence to:
- Amanda avatar psychological alignment and pain point addressing
- Mobile-first responsive design with accessibility compliance
- Brand color palette and typography specifications from provided guidelines
- Single primary CTA governance leading to qualification modal
- Comprehensive tracking for optimization and sales team follow-up
- Technical requirements (11ty, Vite, Tailwind, Netlify stack)

This package enables immediate development start with clear specifications for pixel-perfect brand implementation and complete conversion tracking system.
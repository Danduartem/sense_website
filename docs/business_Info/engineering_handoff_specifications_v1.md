# Engineering Handoff Specifications v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** Prototype & Handoff Engineer (PHE) - Execute Phase  
**Primary Avatar:** Amanda - The Exhausted Achiever

---

## Engineering Handoff Overview

This document provides complete specifications for 11ty + Vite + Tailwind CSS implementation of the Mentoria Seja Livre landing page, including component architecture, design tokens, measurement integration, and deployment requirements.

**Tech Stack Confirmed:**
- **Static Site Generator:** Eleventy (11ty) v2.0+
- **Build Tool:** Vite v4.0+ for asset bundling
- **CSS Framework:** Tailwind CSS v3.0+ with custom configuration
- **Deployment:** Netlify with serverless functions
- **Analytics:** GTM + GA4 + Segment CDP integration

---

## Design Token Implementation

### Tailwind CSS Configuration

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_includes/**/*.njk",
  ],
  theme: {
    extend: {
      // Brand Colors
      colors: {
        'navy': {
          DEFAULT: '#191F3A',
          50: '#F4F5F7',
          100: '#E9EAED',
          200: '#C8CCD4',
          300: '#A7AEBB',
          400: '#656F89',
          500: '#191F3A',
          600: '#171C34',
          700: '#15192C',
          800: '#121523',
          900: '#0F1222',
        },
        'burgundy': {
          DEFAULT: '#81171F',
          50: '#FDF4F4',
          100: '#FCE8E9',
          200: '#F7C5C8',
          300: '#F2A2A7',
          400: '#E85C65',
          500: '#81171F',
          600: '#74151C',
          700: '#611218',
          800: '#4E0E13',
          900: '#400B10',
        },
        'gray-custom': {
          DEFAULT: '#ECECEC',
          50: '#FFFFFF',
          100: '#ECECEC',
          200: '#D9D9D9',
          300: '#C6C6C6',
          400: '#A0A0A0',
          500: '#7A7A7A',
          600: '#545454',
          700: '#2E2E2E',
          800: '#080808',
          900: '#000000',
        },
      },
      
      // Typography
      fontFamily: {
        'primary': ['Lora', 'serif'],
        'secondary': ['Century', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
      },
      
      // Spacing Scale
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      
      // Box Shadows
      boxShadow: {
        'sm': '0 1px 2px rgba(25, 31, 58, 0.1)',
        'DEFAULT': '0 2px 4px rgba(25, 31, 58, 0.1)',
        'md': '0 4px 8px rgba(25, 31, 58, 0.12)',
        'lg': '0 8px 16px rgba(25, 31, 58, 0.15)',
        'xl': '0 20px 40px rgba(25, 31, 58, 0.2)',
        'focus': '0 0 0 3px rgba(129, 23, 31, 0.1)',
        'cta': '0 4px 12px rgba(129, 23, 31, 0.3)',
        'cta-hover': '0 6px 16px rgba(129, 23, 31, 0.4)',
      },
      
      // Border Radius
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      
      // Animation
      animation: {
        'modal-slide-in': 'modalSlideIn 0.3s ease-out',
        'pain-pulse': 'painItemPulse 0.6s ease',
        'spinner': 'spin 1s linear infinite',
      },
      
      keyframes: {
        modalSlideIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9) translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        painItemPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      
      // Breakpoints (Mobile First)
      screens: {
        'sm': '375px',
        'md': '744px',
        'lg': '1280px',
        'xl': '1440px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### CSS Custom Properties Integration
```css
/* src/assets/css/tokens.css */
:root {
  /* Brand Colors */
  --color-navy: #191F3A;
  --color-burgundy: #81171F;
  --color-gray: #ECECEC;
  
  /* Semantic Colors */
  --color-success: #38A169;
  --color-warning: #DD6B20;
  --color-error: #E53E3E;
  --color-info: #3182CE;
  
  /* Typography */
  --font-primary: 'Lora', serif;
  --font-secondary: 'Century', sans-serif;
  
  /* Animation Durations */
  --duration-fast: 0.15s;
  --duration-normal: 0.3s;
  --duration-slow: 0.5s;
  
  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-tooltip: 1100;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0.01s;
    --duration-normal: 0.01s;
    --duration-slow: 0.01s;
  }
}
```

---

## Component Architecture

### 11ty Template Structure

**src/_includes/layouts/base.njk:**
```html
<!DOCTYPE html>
<html lang="pt-BR" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title or site.title }}</title>
  <meta name="description" content="{{ description or site.description }}">
  
  <!-- Preload Critical Fonts -->
  <link rel="preload" href="/assets/fonts/lora-v20-latin-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/century-gothic-regular.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Critical CSS -->
  <style>
    {% include "css/critical.css" %}
  </style>
  
  <!-- GTM - Head -->
  {% if not site.testMode %}
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','{{ site.gtmId }}');</script>
  <!-- End Google Tag Manager -->
  {% endif %}
  
  <!-- DataLayer Initialization -->
  <script>
    window.dataLayer = window.dataLayer || [];
    
    // Initialize identity management
    class IdentityManager {
      constructor() {
        this.leadId = this.getOrCreateLeadId();
        this.sessionId = this.getOrCreateSessionId();
        this.initializeTracking();
      }
      
      getOrCreateLeadId() {
        let leadId = localStorage.getItem('mslu_lead_id');
        if (!leadId) {
          leadId = this.generateUUID();
          localStorage.setItem('mslu_lead_id', leadId);
        }
        return leadId;
      }
      
      getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('mslu_session_id');
        if (!sessionId) {
          sessionId = this.generateUUID();
          sessionStorage.setItem('mslu_session_id', sessionId);
        }
        return sessionId;
      }
      
      generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      initializeTracking() {
        // Enhanced page view
        window.dataLayer.push({
          event: 'page_view_enhanced',
          page_title: document.title,
          page_type: '{{ page_type | default: "landing" }}',
          amanda_relevance: {{ amanda_relevance | default: 5 }},
          lead_id: this.leadId,
          session_id: this.sessionId,
          test_mode: {{ site.testMode | default: false }},
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      window.identityManager = new IdentityManager();
    });
  </script>
</head>

<body class="font-secondary text-navy bg-white min-h-full">
  {% if not site.testMode %}
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ site.gtmId }}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  {% endif %}
  
  <!-- Skip Link -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-navy text-white px-4 py-2 rounded z-50">
    Pular para o conteúdo principal
  </a>
  
  <!-- Main Content -->
  <main id="main-content">
    {{ content | safe }}
  </main>
  
  <!-- Modal Component -->
  {% include "components/modal.njk" %}
  
  <!-- Scripts -->
  <script type="module" src="{{ '/assets/js/main.js' | url }}"></script>
  
  <!-- Non-critical CSS -->
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | url }}">
  
  <!-- Intersection Observer for Section Tracking -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            window.dataLayer.push({
              event: 'section_view',
              section_name: section.dataset.section,
              time_to_view: performance.now(),
              scroll_percentage: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            });
          }
        });
      }, { threshold: 0.5 });
      
      document.querySelectorAll('[data-section]').forEach(section => {
        observer.observe(section);
      });
    });
  </script>
</body>
</html>
```

### Landing Page Template

**src/index.njk:**
```html
---
layout: layouts/base.njk
title: "Mentoria Seja Livre | Transforme Exaustão Empresarial em Liberdade Financeira"
description: "Para de trabalhar 12+ horas sem resultado. Mentoria específica para mulheres empreendedoras que querem trabalhar menos, faturar mais e honrar a energia feminina."
page_type: "landing_page"
amanda_relevance: 10
---

<!-- Hero Section -->
{% include "sections/hero.njk" %}

<!-- Social Proof Strip -->
{% include "sections/social-proof.njk" %}

<!-- Problem Agitation -->
{% include "sections/problem-agitation.njk" %}

<!-- Solution Overview -->
{% include "sections/solution-overview.njk" %}

<!-- Program Deliverables -->
{% include "sections/program-deliverables.njk" %}

<!-- Transformation Outcomes -->
{% include "sections/transformation-outcomes.njk" %}

<!-- Detailed Testimonials -->
{% include "sections/detailed-testimonials.njk" %}

<!-- FAQ -->
{% include "sections/faq.njk" %}

<!-- Final CTA -->
{% include "sections/final-cta.njk" %}
```

### Component Templates

**src/_includes/components/cta-button.njk:**
```html
{# 
  CTA Button Component
  Parameters:
  - label: Button text
  - source_section: Section where button appears
  - cta_id: primary, secondary, or custom
  - style: primary, secondary, or custom classes
  - href: Optional link (default opens modal)
#}

{% set buttonClasses = "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-burgundy focus:ring-opacity-50" %}

{% if style == "primary" or not style %}
  {% set specificClasses = "bg-gradient-to-br from-burgundy to-burgundy-600 text-white shadow-cta hover:shadow-cta-hover hover:from-burgundy-600 hover:to-burgundy-700 hover:-translate-y-0.5 active:translate-y-0" %}
{% elif style == "secondary" %}
  {% set specificClasses = "border-2 border-burgundy text-burgundy bg-white hover:bg-burgundy hover:text-white" %}
{% endif %}

<button 
  type="button"
  class="{{ buttonClasses }} {{ specificClasses }} {% if mobile_full %}w-full sm:w-auto{% endif %}"
  data-cta-source="{{ source_section }}"
  data-cta-id="{{ cta_id | default: 'primary' }}"
  onclick="trackCTAClick('{{ source_section }}', '{{ cta_id | default: 'primary' }}', '{{ label | lower | replace(' ', '_') }}'); openModal('{{ source_section }}', '{{ cta_id | default: 'primary' }}');"
  {% if href %}onclick="window.location.href='{{ href }}'"{% endif %}
>
  {{ label }}
  
  <!-- Loading Spinner (Hidden by default) -->
  <svg class="animate-spin -mr-1 ml-3 h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</button>
```

**src/_includes/components/modal.njk:**
```html
<!-- Lead Capture Modal -->
<div 
  id="questionario-modal" 
  class="fixed inset-0 bg-navy bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 invisible transition-all duration-300"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-hidden animate-modal-slide-in">
    <!-- Modal Header -->
    <div class="bg-gradient-to-r from-navy to-navy-600 text-white p-6 text-center relative">
      <h2 id="modal-title" class="font-primary text-2xl font-semibold">
        Transforme Sua Vida Empresarial
      </h2>
      <p id="modal-description" class="text-navy-100 mt-2">
        Preencha as informações para começar sua jornada
      </p>
      
      <!-- Close Button -->
      <button 
        type="button"
        class="absolute top-4 right-4 text-navy-100 hover:text-white p-2 rounded transition-colors"
        onclick="closeModal()"
        aria-label="Fechar modal"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    
    <!-- Progress Bar -->
    <div class="bg-gray-custom p-5 border-b">
      <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div id="progress-fill" class="bg-gradient-to-r from-burgundy to-burgundy-600 h-2 rounded-full transition-all duration-500" style="width: 33%"></div>
      </div>
      <p class="text-sm font-medium text-navy text-center">
        Etapa <span id="current-step">1</span> de 3 - <span id="step-description">Informações básicas</span>
      </p>
    </div>
    
    <!-- Form Content -->
    <div class="p-6 max-h-96 overflow-y-auto">
      <form id="lead-capture-form" class="space-y-6">
        
        <!-- Basic Information -->
        <div id="form-step-1" class="form-step">
          <h3 class="font-primary text-lg font-semibold text-navy mb-4">
            Vamos nos conhecer melhor:
          </h3>
          
          <div class="space-y-4">
            <div>
              <label for="lead-name" class="block text-sm font-medium text-navy mb-1">
                Nome completo *
              </label>
              <input 
                type="text" 
                id="lead-name" 
                name="name" 
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-burgundy focus:ring-0 transition-colors"
                aria-describedby="name-error"
              >
              <div id="name-error" class="validation-message hidden text-error text-sm mt-1" aria-live="polite"></div>
            </div>
            
            <div>
              <label for="lead-email" class="block text-sm font-medium text-navy mb-1">
                Seu melhor email *
              </label>
              <input 
                type="email" 
                id="lead-email" 
                name="email" 
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-burgundy focus:ring-0 transition-colors"
                aria-describedby="email-error"
              >
              <div id="email-error" class="validation-message hidden text-error text-sm mt-1" aria-live="polite"></div>
            </div>
            
            <div>
              <label for="lead-phone" class="block text-sm font-medium text-navy mb-1">
                WhatsApp (com DDD) *
              </label>
              <input 
                type="tel" 
                id="lead-phone" 
                name="phone" 
                required
                placeholder="11987654321"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-burgundy focus:ring-0 transition-colors"
                aria-describedby="phone-error"
              >
              <div id="phone-error" class="validation-message hidden text-error text-sm mt-1" aria-live="polite"></div>
            </div>
          </div>
        </div>
        
        <!-- Business Information -->
        <div id="form-step-2" class="form-step hidden">
          <h3 class="font-primary text-lg font-semibold text-navy mb-4">
            Me conte sobre seu empreendimento:
          </h3>
          
          <div class="space-y-4">
            <div>
              <label for="business-type" class="block text-sm font-medium text-navy mb-1">
                Tipo de negócio *
              </label>
              <select 
                id="business-type" 
                name="business_type" 
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-burgundy focus:ring-0 transition-colors"
              >
                <option value="">Selecione seu tipo de negócio</option>
                <option value="clinica">Clínica/Consultório</option>
                <option value="loja">Loja/E-commerce</option>
                <option value="estetica">Salão/Estética</option>
                <option value="arquitetura">Arquitetura/Design</option>
                <option value="advocacia">Advocacia/Consultoria</option>
                <option value="academia">Academia/Fitness</option>
                <option value="nutricao">Nutrição/Wellness</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div>
              <label for="monthly-revenue" class="block text-sm font-medium text-navy mb-1">
                Receita mensal atual *
              </label>
              <select 
                id="monthly-revenue" 
                name="monthly_revenue" 
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-burgundy focus:ring-0 transition-colors"
              >
                <option value="">Selecione sua faixa de receita</option>
                <option value="ate_10k">Até R$ 10k</option>
                <option value="10k_20k">R$ 10k - 20k</option>
                <option value="20k_35k">R$ 20k - 35k</option>
                <option value="acima_35k">Acima de R$ 35k</option>
              </select>
            </div>
            
            <div>
              <label for="work-hours" class="block text-sm font-medium text-navy mb-1">
                Quantas horas trabalha por dia: <span id="hours-display">8</span>h
              </label>
              <input 
                type="range" 
                id="work-hours" 
                name="work_hours_daily" 
                min="6" 
                max="16" 
                value="8"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>6h</span>
                <span>16h+</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Qualification -->
        <div id="form-step-3" class="form-step hidden">
          <h3 class="font-primary text-lg font-semibold text-navy mb-4">
            Algumas perguntas finais:
          </h3>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-navy mb-3">
                Qual seu principal desafio hoje? *
              </label>
              <div class="space-y-2">
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="main_struggle" value="exhaustion_overwork" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Exaustão e sobrecarga de trabalho</span>
                </label>
                
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="main_struggle" value="lack_systems" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Falta de sistemas organizados</span>
                </label>
                
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="main_struggle" value="delegation_difficulty" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Dificuldade para delegar tarefas</span>
                </label>
                
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="main_struggle" value="pricing_issues" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Preços baixos e margem apertada</span>
                </label>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-navy mb-3">
                A energia feminina é importante no seu trabalho?
              </label>
              <div class="space-y-2">
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="feminine_energy" value="muito_importante" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Muito importante - quero honrar minha sensibilidade</span>
                </label>
                
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="feminine_energy" value="importante" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Importante - preciso equilibrar firmeza e cuidado</span>
                </label>
                
                <label class="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:border-burgundy transition-colors">
                  <input type="radio" name="feminine_energy" value="pouco_importante" class="sr-only">
                  <div class="radio-indicator w-4 h-4 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Pouco importante - foco apenas em resultados</span>
                </label>
              </div>
            </div>
            
            <div>
              <label for="readiness-scale" class="block text-sm font-medium text-navy mb-1">
                Em uma escala de 1 a 10, o quanto está pronta para mudanças: <span id="readiness-display">5</span>
              </label>
              <input 
                type="range" 
                id="readiness-scale" 
                name="transformation_readiness" 
                min="1" 
                max="10" 
                value="5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 (não estou pronta)</span>
                <span>10 (estou muito pronta)</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Amanda Score Display -->
        <div id="amanda-score-indicator" class="bg-gradient-to-r from-gray-custom to-white p-4 rounded-lg border-l-4 border-burgundy">
          <div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Compatibilidade Amanda</div>
          <div class="font-primary text-2xl font-semibold text-navy">
            <span id="amanda-score-value">0</span>/100
          </div>
          <div id="amanda-score-tier" class="text-sm font-medium mt-1">Calculando...</div>
        </div>
        
        <!-- Form Navigation -->
        <div class="flex justify-between pt-6">
          <button 
            type="button" 
            id="prev-step-btn"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors hidden"
            onclick="previousStep()"
          >
            Anterior
          </button>
          
          <button 
            type="button" 
            id="next-step-btn"
            class="px-6 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy-600 transition-colors"
            onclick="nextStep()"
          >
            Próximo
          </button>
          
          <button 
            type="submit" 
            id="submit-btn"
            class="px-8 py-3 bg-gradient-to-r from-burgundy to-burgundy-600 text-white font-semibold rounded-md hover:from-burgundy-600 hover:to-burgundy-700 transition-all hidden"
          >
            Continuar Minha Transformação
          </button>
        </div>
      </form>
    </div>
    
    <!-- Privacy Notice -->
    <div class="bg-gray-50 px-6 py-4 text-center border-t">
      <p class="text-xs text-gray-600">
        🔒 Seus dados estão seguros e protegidos (LGPD)<br>
        Não compartilhamos informações e não enviamos spam.
      </p>
    </div>
  </div>
</div>
```

---

## JavaScript Implementation

### Main JavaScript Module

**src/assets/js/main.js:**
```javascript
// Main JavaScript Entry Point
import { ModalManager } from './modules/modal.js';
import { FormManager } from './modules/form.js';
import { TrackingManager } from './modules/tracking.js';
import { AmandaScoring } from './modules/amanda-scoring.js';

class App {
  constructor() {
    this.modalManager = new ModalManager();
    this.formManager = new FormManager();
    this.trackingManager = new TrackingManager();
    this.amandaScoring = new AmandaScoring();
    
    this.init();
  }
  
  init() {
    // Initialize components
    this.modalManager.init();
    this.formManager.init();
    this.trackingManager.init();
    this.amandaScoring.init();
    
    // Set up global functions for template usage
    this.setupGlobalFunctions();
    
    // Initialize page-specific functionality
    this.initializePageTracking();
  }
  
  setupGlobalFunctions() {
    // Global functions accessible from templates
    window.trackCTAClick = (sourceSection, ctaId, ctaLabel) => {
      this.trackingManager.trackEvent('cta_click', {
        source_section: sourceSection,
        cta_id: ctaId,
        cta_label: ctaLabel,
        timestamp: new Date().toISOString()
      });
    };
    
    window.openModal = (sourceSection, ctaId) => {
      this.modalManager.open(sourceSection, ctaId);
    };
    
    window.closeModal = () => {
      this.modalManager.close();
    };
    
    window.nextStep = () => {
      this.formManager.nextStep();
    };
    
    window.previousStep = () => {
      this.formManager.previousStep();
    };
  }
  
  initializePageTracking() {
    // Scroll depth tracking
    this.trackingManager.initScrollTracking();
    
    // Time on page tracking
    this.trackingManager.initTimeTracking();
    
    // Exit intent tracking
    this.trackingManager.initExitIntentTracking();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
```

### Modal Management Module

**src/assets/js/modules/modal.js:**
```javascript
export class ModalManager {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.sourceSection = '';
    this.ctaId = '';
    this.openTime = null;
  }
  
  init() {
    this.modal = document.getElementById('questionario-modal');
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }
  
  open(sourceSection = '', ctaId = '') {
    if (!this.modal) return;
    
    this.sourceSection = sourceSection;
    this.ctaId = ctaId;
    this.openTime = performance.now();
    
    // Track modal opening
    window.dataLayer.push({
      event: 'modal_open',
      source_section: sourceSection,
      cta_id: ctaId,
      lead_id: window.identityManager?.leadId,
      timestamp: new Date().toISOString()
    });
    
    // Show modal
    this.modal.classList.remove('opacity-0', 'invisible');
    this.modal.classList.add('opacity-100', 'visible');
    this.isOpen = true;
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first form field
    setTimeout(() => {
      const firstInput = this.modal.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }, 300);
    
    // Setup focus trap
    this.setupFocusTrap();
  }
  
  close() {
    if (!this.modal || !this.isOpen) return;
    
    const timeInModal = performance.now() - this.openTime;
    const fieldsCompleted = this.getCompletedFieldsCount();
    const formCompletionPercentage = this.getFormCompletionPercentage();
    
    // Track modal abandonment
    window.dataLayer.push({
      event: 'modal_abandon',
      abandon_method: 'close_button',
      time_in_modal: Math.round(timeInModal),
      fields_completed: fieldsCompleted,
      form_completion_percentage: formCompletionPercentage,
      amanda_score_at_abandon: window.app?.amandaScoring?.getCurrentScore() || 0,
      source_section: this.sourceSection,
      timestamp: new Date().toISOString()
    });
    
    // Hide modal
    this.modal.classList.remove('opacity-100', 'visible');
    this.modal.classList.add('opacity-0', 'invisible');
    this.isOpen = false;
    
    // Re-enable body scroll
    document.body.style.overflow = '';
    
    // Reset form state
    this.resetModalState();
  }
  
  setupEventListeners() {
    // Close button
    const closeBtn = this.modal?.querySelector('[onclick="closeModal()"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    
    // Background click
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.trackBackgroundClick();
        this.close();
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.trackEscapeKey();
        this.close();
      }
    });
  }
  
  setupKeyboardNavigation() {
    // Focus trap implementation
    this.modal?.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabKey(e);
      }
    });
  }
  
  setupFocusTrap() {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];
  }
  
  handleTabKey(e) {
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        this.firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
  
  trackBackgroundClick() {
    const timeInModal = performance.now() - this.openTime;
    window.dataLayer.push({
      event: 'modal_abandon',
      abandon_method: 'background_click',
      time_in_modal: Math.round(timeInModal),
      fields_completed: this.getCompletedFieldsCount(),
      form_completion_percentage: this.getFormCompletionPercentage()
    });
  }
  
  trackEscapeKey() {
    const timeInModal = performance.now() - this.openTime;
    window.dataLayer.push({
      event: 'modal_abandon',
      abandon_method: 'escape_key',
      time_in_modal: Math.round(timeInModal),
      fields_completed: this.getCompletedFieldsCount()
    });
  }
  
  getCompletedFieldsCount() {
    const formInputs = this.modal?.querySelectorAll('input, select, textarea');
    let completed = 0;
    
    formInputs?.forEach(input => {
      if (input.type === 'radio' || input.type === 'checkbox') {
        if (input.checked) completed++;
      } else if (input.value.trim() !== '') {
        completed++;
      }
    });
    
    return completed;
  }
  
  getFormCompletionPercentage() {
    const totalFields = this.modal?.querySelectorAll('input, select, textarea').length || 1;
    const completedFields = this.getCompletedFieldsCount();
    return Math.round((completedFields / totalFields) * 100);
  }
  
  resetModalState() {
    // Reset form to step 1
    window.app?.formManager?.resetToFirstStep();
    
    // Clear form data
    const form = this.modal?.querySelector('form');
    if (form) {
      form.reset();
    }
    
    // Reset Amanda score
    window.app?.amandaScoring?.resetScore();
  }
}
```

### Form Management Module

**src/assets/js/modules/form.js:**
```javascript
export class FormManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.form = null;
    this.formStartTime = null;
  }
  
  init() {
    this.form = document.getElementById('lead-capture-form');
    this.setupFormValidation();
    this.setupStepNavigation();
    this.setupRangeSliders();
    this.setupRadioButtons();
    this.setupFormSubmission();
  }
  
  nextStep() {
    if (!this.validateCurrentStep()) {
      return;
    }
    
    if (this.currentStep < this.totalSteps) {
      this.hideStep(this.currentStep);
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgressBar();
      this.updateNavigation();
      
      // Track step progression
      window.dataLayer.push({
        event: 'form_step_advance',
        from_step: this.currentStep - 1,
        to_step: this.currentStep,
        form_completion_percentage: (this.currentStep / this.totalSteps) * 100
      });
    }
  }
  
  previousStep() {
    if (this.currentStep > 1) {
      this.hideStep(this.currentStep);
      this.currentStep--;
      this.showStep(this.currentStep);
      this.updateProgressBar();
      this.updateNavigation();
      
      // Track step regression
      window.dataLayer.push({
        event: 'form_step_back',
        from_step: this.currentStep + 1,
        to_step: this.currentStep
      });
    }
  }
  
  showStep(stepNumber) {
    const step = document.getElementById(`form-step-${stepNumber}`);
    if (step) {
      step.classList.remove('hidden');
      
      // Focus first input in step
      const firstInput = step.querySelector('input, select, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }
  
  hideStep(stepNumber) {
    const step = document.getElementById(`form-step-${stepNumber}`);
    if (step) {
      step.classList.add('hidden');
    }
  }
  
  updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const currentStepElement = document.getElementById('current-step');
    const stepDescription = document.getElementById('step-description');
    
    if (progressFill) {
      const percentage = (this.currentStep / this.totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
    }
    
    if (currentStepElement) {
      currentStepElement.textContent = this.currentStep;
    }
    
    if (stepDescription) {
      const descriptions = {
        1: 'Informações básicas',
        2: 'Sobre seu negócio', 
        3: 'Perfil de transformação'
      };
      stepDescription.textContent = descriptions[this.currentStep];
    }
  }
  
  updateNavigation() {
    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Previous button
    if (prevBtn) {
      if (this.currentStep > 1) {
        prevBtn.classList.remove('hidden');
      } else {
        prevBtn.classList.add('hidden');
      }
    }
    
    // Next/Submit buttons
    if (this.currentStep < this.totalSteps) {
      nextBtn?.classList.remove('hidden');
      submitBtn?.classList.add('hidden');
    } else {
      nextBtn?.classList.add('hidden');
      submitBtn?.classList.remove('hidden');
    }
  }
  
  validateCurrentStep() {
    const currentStepElement = document.getElementById(`form-step-${this.currentStep}`);
    const requiredFields = currentStepElement?.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields?.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório.';
    }
    
    // Email validation
    if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Digite um email válido.';
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Digite um WhatsApp válido (ex: 11987654321).';
    }
    
    // Show/hide error message
    this.showFieldError(field, errorMessage);
    
    // Update field styling
    if (isValid) {
      field.classList.remove('border-error');
      field.classList.add('border-success');
    } else {
      field.classList.remove('border-success');
      field.classList.add('border-error');
    }
    
    return isValid;
  }
  
  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.id.replace('lead-', '')}-error`);
    
    if (errorElement) {
      if (message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        
        // Track validation error
        window.dataLayer.push({
          event: 'validation_error_shown',
          field_name: field.name,
          error_type: 'validation',
          error_message: message
        });
      } else {
        errorElement.classList.add('hidden');
      }
    }
  }
  
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  isValidPhone(phone) {
    // Brazilian phone validation (11 digits)
    return /^\d{10,11}$/.test(phone.replace(/\D/g, ''));
  }
  
  setupFormValidation() {
    // Real-time validation
    this.form?.addEventListener('input', (e) => {
      if (e.target.matches('input, select, textarea')) {
        this.validateField(e.target);
        
        // Update Amanda score in real-time
        window.app?.amandaScoring?.updateScore();
      }
    });
    
    // Track form start
    this.form?.addEventListener('focusin', (e) => {
      if (!this.formStartTime) {
        this.formStartTime = performance.now();
        window.dataLayer.push({
          event: 'form_start',
          source_section: window.app?.modalManager?.sourceSection,
          time_to_start: this.formStartTime
        });
      }
    });
  }
  
  setupRangeSliders() {
    // Work hours slider
    const workHoursSlider = document.getElementById('work-hours');
    const hoursDisplay = document.getElementById('hours-display');
    
    workHoursSlider?.addEventListener('input', (e) => {
      const value = e.target.value;
      hoursDisplay.textContent = value;
      
      // Track slider interaction
      window.dataLayer.push({
        event: 'slider_change',
        slider_field: 'work_hours_daily',
        selected_value: value,
        amanda_score_impact: value >= 10 ? 15 : (value >= 8 ? 10 : 5)
      });
    });
    
    // Readiness slider
    const readinessSlider = document.getElementById('readiness-scale');
    const readinessDisplay = document.getElementById('readiness-display');
    
    readinessSlider?.addEventListener('input', (e) => {
      const value = e.target.value;
      readinessDisplay.textContent = value;
      
      // Track readiness change
      window.dataLayer.push({
        event: 'slider_change',
        slider_field: 'transformation_readiness',
        selected_value: value,
        readiness_level: value >= 8 ? 'high' : (value >= 6 ? 'medium' : 'low')
      });
    });
  }
  
  setupRadioButtons() {
    // Custom radio button styling and interaction
    this.form?.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        // Update visual state
        this.updateRadioGroup(e.target);
        
        // Track selection
        window.dataLayer.push({
          event: 'radio_select',
          radio_group: e.target.name,
          selected_value: e.target.value,
          amanda_alignment: this.getAmandaAlignment(e.target.name, e.target.value)
        });
      });
    });
  }
  
  updateRadioGroup(selectedRadio) {
    const groupName = selectedRadio.name;
    const radioGroup = this.form?.querySelectorAll(`input[name="${groupName}"]`);
    
    radioGroup?.forEach(radio => {
      const label = radio.closest('label');
      const indicator = label?.querySelector('.radio-indicator');
      
      if (radio === selectedRadio) {
        label?.classList.add('border-burgundy', 'bg-burgundy', 'bg-opacity-10');
        indicator?.classList.add('border-burgundy', 'bg-burgundy');
      } else {
        label?.classList.remove('border-burgundy', 'bg-burgundy', 'bg-opacity-10');
        indicator?.classList.remove('border-burgundy', 'bg-burgundy');
      }
    });
  }
  
  getAmandaAlignment(fieldName, value) {
    const alignmentMap = {
      'main_struggle': {
        'exhaustion_overwork': 'perfect',
        'delegation_difficulty': 'high',
        'lack_systems': 'medium',
        'pricing_issues': 'medium'
      },
      'feminine_energy': {
        'muito_importante': 'perfect',
        'importante': 'high',
        'pouco_importante': 'low'
      }
    };
    
    return alignmentMap[fieldName]?.[value] || 'medium';
  }
  
  setupFormSubmission() {
    this.form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!this.validateCurrentStep()) {
        return;
      }
      
      await this.submitForm();
    });
  }
  
  async submitForm() {
    const submitBtn = document.getElementById('submit-btn');
    const formData = new FormData(this.form);
    const amandaScore = window.app?.amandaScoring?.getCurrentScore() || 0;
    
    // Show loading state
    this.setSubmitButtonLoading(true);
    
    // Prepare submission data
    const submissionData = {
      // Basic info
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      
      // Business info
      business_type: formData.get('business_type'),
      monthly_revenue: formData.get('monthly_revenue'),
      work_hours_daily: formData.get('work_hours_daily'),
      
      // Qualification
      main_struggle: formData.get('main_struggle'),
      feminine_energy: formData.get('feminine_energy'),
      transformation_readiness: formData.get('transformation_readiness'),
      
      // Metadata
      amanda_match_score: amandaScore,
      source_section: window.app?.modalManager?.sourceSection,
      cta_id: window.app?.modalManager?.ctaId,
      lead_id: window.identityManager?.leadId,
      form_completion_time: Math.round(performance.now() - this.formStartTime),
      timestamp: new Date().toISOString()
    };
    
    try {
      // Track form submission attempt
      window.dataLayer.push({
        event: 'form_submit',
        amanda_match_score: amandaScore,
        lead_source: 'landing_page_modal',
        form_completion_time: submissionData.form_completion_time,
        source_section: submissionData.source_section
      });
      
      // Submit to Netlify Function
      const response = await fetch('/.netlify/functions/lead-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Track successful submission
        window.dataLayer.push({
          event: 'form_submit_success',
          lead_id: result.leadId,
          amanda_match_score: amandaScore
        });
        
        // Redirect to thank you page
        window.location.href = `/obrigada?lead_id=${result.leadId}`;
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track submission error
      window.dataLayer.push({
        event: 'form_submit_error',
        error_type: 'network_error',
        error_message: error.message
      });
      
      // Show error message
      this.showSubmissionError();
      
    } finally {
      this.setSubmitButtonLoading(false);
    }
  }
  
  setSubmitButtonLoading(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    const spinner = submitBtn?.querySelector('.animate-spin');
    
    if (isLoading) {
      submitBtn?.setAttribute('disabled', 'true');
      submitBtn?.classList.add('opacity-75');
      spinner?.classList.remove('hidden');
    } else {
      submitBtn?.removeAttribute('disabled');
      submitBtn?.classList.remove('opacity-75');
      spinner?.classList.add('hidden');
    }
  }
  
  showSubmissionError() {
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-error bg-opacity-10 border border-error text-error px-4 py-3 rounded mt-4';
    errorDiv.innerHTML = `
      <strong>Ops!</strong> Algo deu errado. Tente novamente ou entre em contato via WhatsApp.
    `;
    
    const form = document.getElementById('lead-capture-form');
    form?.appendChild(errorDiv);
    
    // Remove error after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
  
  resetToFirstStep() {
    // Hide all steps
    for (let i = 1; i <= this.totalSteps; i++) {
      this.hideStep(i);
    }
    
    // Reset to step 1
    this.currentStep = 1;
    this.showStep(1);
    this.updateProgressBar();
    this.updateNavigation();
    
    // Reset form start time
    this.formStartTime = null;
  }
}
```

### Amanda Scoring Module

**src/assets/js/modules/amanda-scoring.js:**
```javascript
export class AmandaScoring {
  constructor() {
    this.currentScore = 0;
    this.scoreBreakdown = {
      demographics: 0,
      painPoints: 0,
      behavioral: 0
    };
  }
  
  init() {
    this.updateScoreDisplay();
  }
  
  updateScore() {
    this.calculateScore();
    this.updateScoreDisplay();
    this.trackScoreChange();
  }
  
  calculateScore() {
    this.scoreBreakdown = {
      demographics: this.calculateDemographicsScore(),
      painPoints: this.calculatePainPointsScore(),
      behavioral: this.calculateBehavioralScore()
    };
    
    this.currentScore = Math.min(
      this.scoreBreakdown.demographics + 
      this.scoreBreakdown.painPoints + 
      this.scoreBreakdown.behavioral,
      100
    );
  }
  
  calculateDemographicsScore() {
    let score = 0;
    
    // Business type (10 points for Amanda-aligned businesses)
    const businessType = document.getElementById('business-type')?.value;
    const amandaBusinessTypes = ['clinica', 'loja', 'estetica', 'arquitetura', 'advocacia', 'nutricao'];
    if (amandaBusinessTypes.includes(businessType)) {
      score += 10;
    }
    
    // Monthly revenue (5 points for Amanda target range)
    const monthlyRevenue = document.getElementById('monthly-revenue')?.value;
    if (monthlyRevenue === '20k_35k') {
      score += 5; // Perfect Amanda range
    } else if (monthlyRevenue === '10k_20k' || monthlyRevenue === 'acima_35k') {
      score += 3; // Close to Amanda range
    }
    
    // Work hours (5 points for high hours indicating overwork)
    const workHours = parseInt(document.getElementById('work-hours')?.value || 0);
    if (workHours >= 12) {
      score += 5; // Perfect Amanda alignment (12+ hours)
    } else if (workHours >= 10) {
      score += 3; // High alignment
    } else if (workHours >= 8) {
      score += 1; // Some alignment
    }
    
    return Math.min(score, 20); // Max 20 points for demographics
  }
  
  calculatePainPointsScore() {
    let score = 0;
    
    // Main struggle (up to 15 points)
    const mainStruggle = document.querySelector('input[name="main_struggle"]:checked')?.value;
    switch (mainStruggle) {
      case 'exhaustion_overwork':
        score += 15; // Perfect Amanda alignment
        break;
      case 'delegation_difficulty':
        score += 12; // High alignment
        break;
      case 'lack_systems':
        score += 8; // Medium alignment
        break;
      case 'pricing_issues':
        score += 6; // Some alignment
        break;
    }
    
    // Work hours contribute to pain points too (up to 15 points)
    const workHours = parseInt(document.getElementById('work-hours')?.value || 0);
    if (workHours >= 14) {
      score += 15; // Extreme overwork
    } else if (workHours >= 12) {
      score += 12; // High overwork
    } else if (workHours >= 10) {
      score += 8; // Moderate overwork
    } else if (workHours >= 8) {
      score += 4; // Some overwork
    }
    
    // Additional pain points from business context (up to 10 points)
    const businessType = document.getElementById('business-type')?.value;
    const monthlyRevenue = document.getElementById('monthly-revenue')?.value;
    
    // Service-based businesses with moderate revenue suggest delegation struggles
    if (['clinica', 'advocacia', 'arquitetura'].includes(businessType) && 
        ['10k_20k', '20k_35k'].includes(monthlyRevenue)) {
      score += 10;
    }
    
    return Math.min(score, 40); // Max 40 points for pain points
  }
  
  calculateBehavioralScore() {
    let score = 0;
    
    // Feminine energy importance (up to 15 points)
    const feminineEnergy = document.querySelector('input[name="feminine_energy"]:checked')?.value;
    switch (feminineEnergy) {
      case 'muito_importante':
        score += 15; // Perfect Amanda alignment
        break;
      case 'importante':
        score += 10; // Good alignment
        break;
      case 'pouco_importante':
        score += 0; // No alignment
        break;
    }
    
    // Transformation readiness (up to 15 points)
    const readiness = parseInt(document.getElementById('readiness-scale')?.value || 5);
    if (readiness >= 9) {
      score += 15; // Very ready
    } else if (readiness >= 7) {
      score += 12; // Ready
    } else if (readiness >= 5) {
      score += 8; // Somewhat ready
    } else if (readiness >= 3) {
      score += 4; // Low readiness
    }
    
    // Business maturity indicator (up to 10 points)
    const businessType = document.getElementById('business-type')?.value;
    const monthlyRevenue = document.getElementById('monthly-revenue')?.value;
    
    // Established businesses show implementation readiness
    if (businessType && ['20k_35k', 'acima_35k'].includes(monthlyRevenue)) {
      score += 10;
    } else if (businessType && monthlyRevenue === '10k_20k') {
      score += 6;
    }
    
    return Math.min(score, 40); // Max 40 points for behavioral
  }
  
  updateScoreDisplay() {
    const scoreValue = document.getElementById('amanda-score-value');
    const scoreTier = document.getElementById('amanda-score-tier');
    
    if (scoreValue) {
      scoreValue.textContent = this.currentScore;
    }
    
    if (scoreTier) {
      const tier = this.getScoreTier();
      scoreTier.textContent = tier.label;
      scoreTier.className = `text-sm font-medium mt-1 ${tier.colorClass}`;
    }
  }
  
  getScoreTier() {
    if (this.currentScore >= 80) {
      return {
        label: 'Perfeita compatibilidade com Amanda',
        colorClass: 'text-success',
        priority: 'high'
      };
    } else if (this.currentScore >= 60) {
      return {
        label: 'Boa compatibilidade com Amanda',
        colorClass: 'text-warning',
        priority: 'medium'
      };
    } else if (this.currentScore >= 40) {
      return {
        label: 'Compatibilidade moderada',
        colorClass: 'text-info',
        priority: 'low'
      };
    } else {
      return {
        label: 'Baixa compatibilidade',
        colorClass: 'text-error',
        priority: 'very_low'
      };
    }
  }
  
  trackScoreChange() {
    const tier = this.getScoreTier();
    
    window.dataLayer.push({
      event: 'amanda_score_update',
      demographics_points: this.scoreBreakdown.demographics,
      pain_points: this.scoreBreakdown.painPoints,
      behavioral_points: this.scoreBreakdown.behavioral,
      total_score: this.currentScore,
      score_tier: tier.priority,
      score_label: tier.label
    });
  }
  
  getCurrentScore() {
    return this.currentScore;
  }
  
  getScoreBreakdown() {
    return this.scoreBreakdown;
  }
  
  resetScore() {
    this.currentScore = 0;
    this.scoreBreakdown = {
      demographics: 0,
      painPoints: 0,
      behavioral: 0
    };
    this.updateScoreDisplay();
  }
}
```

---

## Netlify Configuration

### Netlify Functions

**netlify/functions/lead-submit.js:**
```javascript
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight request
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
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // Generate lead ID if not provided
    const leadId = data.lead_id || uuidv4();
    
    // Prepare lead data for integrations
    const leadData = {
      leadId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessType: data.business_type,
      monthlyRevenue: data.monthly_revenue,
      workHoursDaily: data.work_hours_daily,
      mainStruggle: data.main_struggle,
      feminineEnergy: data.feminine_energy,
      transformationReadiness: data.transformation_readiness,
      amandaScore: data.amanda_match_score,
      sourceSection: data.source_section,
      ctaId: data.cta_id,
      timestamp: new Date().toISOString(),
      userAgent: event.headers['user-agent'],
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for']
    };
    
    // Parallel webhook distribution
    const webhookPromises = [];
    
    // Sync to CRM
    if (process.env.CRM_WEBHOOK_URL) {
      webhookPromises.push(syncToCRM(leadData));
    }
    
    // Sync to MailerLite
    if (process.env.MAILERLITE_API_KEY) {
      webhookPromises.push(syncToMailerLite(leadData));
    }
    
    // Sync to Segment
    if (process.env.SEGMENT_WRITE_KEY) {
      webhookPromises.push(syncToSegment(leadData));
    }
    
    // Execute all webhooks
    const results = await Promise.allSettled(webhookPromises);
    
    // Log any failures but don't block response
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
  const payload = {
    external_id: leadData.leadId,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    source: 'landing_page_modal',
    tags: [
      'landing_page_lead',
      `amanda_score_${getAmandaScoreTier(leadData.amandaScore)}`,
      `source_${leadData.sourceSection}`,
      `business_${leadData.businessType}`
    ],
    custom_fields: {
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      work_hours_daily: leadData.workHoursDaily,
      main_struggle: leadData.mainStruggle,
      feminine_energy: leadData.feminineEnergy,
      transformation_readiness: leadData.transformationReadiness,
      amanda_match_score: leadData.amandaScore,
      source_section: leadData.sourceSection,
      cta_id: leadData.ctaId
    }
  };

  const response = await fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CRM_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`CRM sync failed: ${response.status}`);
  }

  return response.json();
}

// MailerLite Integration
async function syncToMailerLite(leadData) {
  const payload = {
    email: leadData.email,
    fields: {
      name: leadData.name,
      phone: leadData.phone,
      lead_id: leadData.leadId,
      business_type: leadData.businessType,
      amanda_match_score: leadData.amandaScore,
      source_section: leadData.sourceSection,
      main_struggle: leadData.mainStruggle,
      transformation_readiness: leadData.transformationReadiness
    },
    groups: [
      'landing_page_leads',
      getAmandaScoreGroup(leadData.amandaScore),
      `business_${leadData.businessType}`
    ]
  };

  const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`MailerLite sync failed: ${response.status}`);
  }

  // Trigger questionnaire automation
  await triggerQuestionnaireEmail(leadData);

  return response.json();
}

// Segment Integration
async function syncToSegment(leadData) {
  const payload = {
    userId: leadData.leadId,
    event: 'Lead Qualified',
    properties: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      amanda_match_score: leadData.amandaScore,
      source_section: leadData.sourceSection,
      lead_quality: getAmandaScoreTier(leadData.amandaScore)
    },
    context: {
      ip: leadData.ip,
      userAgent: leadData.userAgent
    },
    timestamp: leadData.timestamp
  };

  const response = await fetch('https://api.segment.io/v1/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.SEGMENT_WRITE_KEY + ':').toString('base64')}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Segment sync failed: ${response.status}`);
  }

  return response.json();
}

// Utility functions
function getAmandaScoreTier(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  if (score >= 40) return 'low';
  return 'very_low';
}

function getAmandaScoreGroup(score) {
  if (score >= 80) return 'amanda_high_match';
  if (score >= 60) return 'amanda_medium_match';
  return 'amanda_low_match';
}

async function triggerQuestionnaireEmail(leadData) {
  // Trigger MailerLite automation for questionnaire
  const automationPayload = {
    email: leadData.email,
    automation_id: process.env.MAILERLITE_QUESTIONNAIRE_AUTOMATION_ID,
    variables: {
      name: leadData.name,
          lead_id: leadData.leadId,
      amanda_score: leadData.amandaScore
    }
  };

  try {
    await fetch('https://api.mailerlite.com/api/v2/automations/trigger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
      },
      body: JSON.stringify(automationPayload)
    });
  } catch (error) {
    console.error('Questionnaire email trigger failed:', error);
  }
}
```

### Environment Variables

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "_site"
  functions = "netlify/functions"

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
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.segment.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:"

# Cache Headers
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirects
[[redirects]]
  from = "/obrigada"
  to = "/obrigada/index.html"
  status = 200

# Branch Deploys
[context.branch-deploy]
  command = "npm run build:staging"

[context.branch-deploy.environment]
  TEST_MODE = "true"
  GTM_CONTAINER_ID = "GTM-STAGING"
```

---

## Asset Optimization & Performance

### Critical CSS Extraction

**src/_includes/css/critical.css:**
```css
/* Critical CSS for above-fold content */
/* Include only essential styles for hero section and modal */

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Typography Base */
@font-face {
  font-family: 'Lora';
  src: url('/assets/fonts/lora-v20-latin-600.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: 'Century';
  src: url('/assets/fonts/century-gothic-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* Essential utility classes */
.font-primary { font-family: 'Lora', serif; }
.font-secondary { font-family: 'Century', sans-serif; }
.text-navy { color: #191F3A; }
.text-white { color: #FFFFFF; }
.bg-white { background-color: #FFFFFF; }
.bg-burgundy { background-color: #81171F; }

/* Hero section critical styles */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
}

/* CTA Button critical styles */
.cta-button-primary {
  background: linear-gradient(135deg, #81171F 0%, #A61E26 100%);
  color: #FFFFFF;
  font-family: 'Lora', serif;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  min-height: 56px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Modal critical styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 31, 58, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.visible {
  opacity: 1;
  visibility: visible;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only.focus:not(.sr-only) {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Image Optimization

**src/_data/images.js:**
```javascript
module.exports = {
  // Trust strip photos
  trustPhotos: [
    {
      src: '/assets/images/trust-clinica.webp',
      alt: 'Empreendedora proprietária de clínica',
      business: 'Clínica',
      loading: 'eager' // Above fold
    },
    {
      src: '/assets/images/trust-loja.webp',
      alt: 'Proprietária de loja de roupas',
      business: 'Loja',
      loading: 'lazy'
    }
    // Continue for all trust photos
  ],
  
  // Testimonial photos (when available)
  testimonialPhotos: [
    {
      src: '/assets/images/testimonial-marina.webp',
      alt: 'Marina, proprietária de clínica em São Paulo',
      name: 'Marina',
      business: 'Clínica',
      loading: 'lazy'
    }
    // Continue for all testimonials
  ],
  
  // Hero image/video
  heroMedia: {
    type: 'image', // or 'video'
    src: '/assets/images/hero-amanda-entrepreneur.webp',
    alt: 'Mulher empreendedora trabalhando exaustivamente até tarde',
    loading: 'eager'
  }
};
```

---

## Accessibility Implementation

### ARIA Labels and Semantic HTML

**Complete accessibility attributes for all interactive elements:**

```html
<!-- Modal with full ARIA support -->
<div 
  id="questionario-modal"
  class="modal-overlay"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-hidden="true"
>
  <!-- Form with proper labeling -->
  <form id="lead-capture-form" aria-label="Formulário de qualificação para mentoria">
    <fieldset>
      <legend class="sr-only">Informações básicas</legend>
      
      <div class="form-field">
        <label for="lead-name" class="required">
          Nome completo
          <span aria-label="obrigatório">*</span>
        </label>
        <input 
          type="text"
          id="lead-name"
          name="name"
          required
          aria-describedby="name-error name-help"
          aria-invalid="false"
          autocomplete="name"
        >
        <div id="name-help" class="sr-only">
          Digite seu nome completo
        </div>
        <div id="name-error" class="validation-message" aria-live="polite"></div>
      </div>
    </fieldset>
  </form>
</div>

<!-- Pain point checklist with proper semantics -->
<section aria-labelledby="pain-points-heading">
  <h2 id="pain-points-heading">Você se reconhece nesta rotina?</h2>
  
  <ul class="pain-checklist" role="list">
    <li class="pain-item" role="listitem">
      <button 
        type="button"
        class="pain-button"
        aria-pressed="false"
        aria-describedby="pain-1-description"
      >
        <span class="pain-checkbox" aria-hidden="true">✓</span>
        <span class="pain-text">Trabalha 12+ horas por dia</span>
      </button>
      <div id="pain-1-description" class="sr-only">
        Clique para indicar se este problema se aplica a você
      </div>
    </li>
  </ul>
</section>
```

### Keyboard Navigation

**Tab order and focus management:**

```javascript
// Keyboard navigation for pain checklist
document.querySelectorAll('.pain-item').forEach((item, index) => {
  item.setAttribute('tabindex', '0');
  
  item.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        item.click();
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusNextPainItem(index);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousPainItem(index);
        break;
    }
  });
});

// Modal focus trap
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}
```

---

## Quality Assurance Checklist

### Pre-Launch Validation

**Technical Validation:**
- [ ] 11ty builds successfully with all templates
- [ ] Vite bundles assets correctly
- [ ] Tailwind CSS generates proper utility classes
- [ ] All JavaScript modules load without errors
- [ ] GTM container fires events correctly
- [ ] Netlify functions deploy and respond properly
- [ ] Environment variables configured correctly
- [ ] HTTPS enforced across all interactions

**Performance Validation:**
- [ ] Page Speed Insights score >90 mobile/desktop
- [ ] Critical CSS inlined and non-critical deferred
- [ ] Images optimized (WebP format, proper sizing)
- [ ] JavaScript code splitting implemented
- [ ] Font loading optimized with font-display: swap
- [ ] Service worker caching (if implemented)

**Accessibility Validation:**
- [ ] WCAG 2.1 AA compliance verified
- [ ] Screen reader testing completed
- [ ] Keyboard navigation works throughout
- [ ] Color contrast ratios meet requirements
- [ ] Focus indicators visible and distinct
- [ ] Alt text provided for all images
- [ ] Form labels properly associated

**Cross-Browser Validation:**
- [ ] Chrome (desktop/mobile) - Latest 2 versions
- [ ] Safari (desktop/mobile) - Latest 2 versions  
- [ ] Firefox (desktop) - Latest version
- [ ] Edge (desktop) - Latest version
- [ ] Mobile responsiveness at all breakpoints

**Analytics Validation:**
- [ ] GTM preview mode shows all events firing
- [ ] GA4 receives events with proper parameters
- [ ] Segment events flow to connected destinations
- [ ] CRM integration receives lead data
- [ ] MailerLite automation triggers correctly
- [ ] Amanda scoring calculation verified

### Post-Launch Monitoring

**Week 1 Monitoring:**
- [ ] Error rate <0.1% across all functions
- [ ] Page load times <3 seconds on mobile
- [ ] Form submission success rate >99%
- [ ] Analytics data flowing correctly
- [ ] No console errors reported
- [ ] Modal functionality across devices

**Week 2-4 Optimization:**
- [ ] A/B testing framework deployed
- [ ] Amanda score distribution analysis
- [ ] Drop-off point identification
- [ ] Mobile vs desktop performance comparison
- [ ] Sales team alert optimization
- [ ] Content performance measurement

---

## Deployment Instructions

### Build Process

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run eleventy:dev\" \"npm run vite:dev\"",
    "eleventy:dev": "eleventy --serve --watch",
    "vite:dev": "vite build --watch",
    "build": "npm run vite:build && npm run eleventy:build",
    "vite:build": "vite build",
    "eleventy:build": "eleventy",
    "build:staging": "NODE_ENV=staging npm run build",
    "preview": "npm run build && npx http-server _site",
    "lint": "eslint src/assets/js/**/*.js",
    "lint:fix": "eslint src/assets/js/**/*.js --fix"
  }
}
```

### Deployment Checklist

**Pre-deployment:**
1. [ ] Update environment variables in Netlify dashboard
2. [ ] Configure GTM containers (staging/production)
3. [ ] Set up CRM webhook endpoints
4. [ ] Configure MailerLite API keys and automation IDs
5. [ ] Test Segment integration with proper write keys
6. [ ] Upload optimized images to `/assets/images/`
7. [ ] Configure domain DNS for custom domain

**Deployment Steps:**
1. [ ] Deploy to staging branch for final testing
2. [ ] Validate all functionality in staging environment
3. [ ] Run accessibility audit on staging
4. [ ] Merge to main branch for production deployment
5. [ ] Monitor deployment logs for any errors
6. [ ] Verify production analytics are flowing correctly

**Post-deployment:**
1. [ ] Test complete user flow from landing to thank you page
2. [ ] Verify modal submission triggers all integrations
3. [ ] Confirm email automation sends questionnaire
4. [ ] Test sales team alert triggers for high Amanda scores
5. [ ] Monitor error rates and performance metrics
6. [ ] Set up monitoring alerts for critical failures

This engineering handoff provides complete specifications for implementing the Mentoria Seja Livre landing page with 11ty + Vite + Tailwind CSS, ensuring all design, functionality, measurement, and accessibility requirements are met for successful launch and optimization.

---

*Prepared by Prototype & Handoff Engineer (PHE) - Execute Phase Design Program Lead coordination*
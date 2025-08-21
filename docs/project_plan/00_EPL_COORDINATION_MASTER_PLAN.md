# Engineering Program Lead - Master Coordination Plan
## Mentoria Seja Livre Landing Page Development

**Project:** Brazilian Female Entrepreneur Mentoring Program Landing Page  
**Client:** Mentoria Seja Livre  
**Primary Avatar:** Amanda - The Exhausted Achiever  
**Market:** Brazil + Portugal (Portuguese-speaking)  
**Timeline:** 5 Sprints via Sequential Gate Validation  

---

## EXECUTIVE SUMMARY

This development project transforms a comprehensive business specification into a production-ready web application using Eleventy + Vite + Tailwind CSS architecture. The solution targets Amanda, a 35-year-old Brazilian female entrepreneur earning R$20k/month but working 12+ hours daily, seeking business transformation to achieve work-life balance.

**Core Business Value:**
- Lead qualification through Amanda avatar scoring (20/40/40 point distribution)
- Relationship-building conversion flow (no automated payments)
- LGPD-compliant data collection with consent management
- Multi-platform webhook distribution (CRM + MailerLite + Segment)
- WhatsApp automation integration for post-booking engagement

---

## SUBAGENT ROSTER & GATE OWNERSHIP

### 1. Frontend UI & Accessibility Lead (FE-UI) - **Gate 1: ui_ok**
**Scope:** Component library, design system, accessibility, responsive implementation
**Key Deliverables:**
- Eleventy + Vite + Tailwind foundation with custom design tokens
- Lead capture modal Web Component with progressive disclosure
- Landing page sections (9-section structure with "Must Prove → Evidence → CTA" logic)
- Mobile-first responsive design with accessibility compliance (WCAG 2.1 AA)
- Performance optimization (lazy loading, image optimization, code splitting)

### 2. Forms, Checkout & Integrations Engineer (FCI) - **Gate 2: integrations_ok**
**Scope:** Lead capture forms, Amanda scoring, client-side validation, UTM handling
**Key Deliverables:**
- Amanda avatar scoring algorithm (Demographics:20 + Pain Points:40 + Behavior:40)
- Progressive form disclosure with mobile optimization
- lead_id generation and UTM parameter capture
- Form validation with conservative error messaging
- Stripe integration setup (for future payment processing)

### 3. Analytics & Tagging Engineer (ATE) - **Gate 3: analytics_ok**
**Scope:** GTM + GA4 implementation, event tracking, consent management
**Key Deliverables:**
- GTM container with GA4 configuration and custom events
- Snake_case event implementation (modal_open, lead_form_submit, etc.)
- Google Consent Mode v2 for LGPD compliance
- Data layer implementation with structured event pushing
- Amanda match score tracking and qualification parameter capture

### 4. Backend/Webhooks & CRM Integrations (BWE) - **Gate 4: backend_ok**
**Scope:** Netlify Functions, webhook processing, multi-platform data distribution
**Key Deliverables:**
- Netlify serverless functions for form processing
- Webhook distribution to CRM + MailerLite + Segment
- Amanda score-based lead routing and sales team alerts
- Server-side GA4 event implementation for lead qualification
- WhatsApp automation trigger integration

### 5. DevOps & QA Engineer (DQE) - **Gate 5: release_ok**
**Scope:** CI/CD pipeline, performance validation, monitoring, production deployment
**Key Deliverables:**
- Netlify deployment pipeline with performance budgets
- Core Web Vitals validation (LCP ≤2.5s mobile, JS ≤200KB gzipped)
- Error monitoring and uptime alerts
- Security headers (CSP with GTM/Segment allowlisting)
- HTTPS enforcement and LGPD compliance validation

---

## TECHNICAL ARCHITECTURE OVERVIEW

### Repository Structure
```
mentoria-seja-livre-lp/
├── src/
│   ├── _data/
│   │   ├── site.json (configuration)
│   │   ├── tracking.json (GTM/GA4 config)
│   │   └── content.json (Portuguese content)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk
│   │   ├── components/
│   │   │   ├── lead-capture-modal.njk
│   │   │   ├── testimonial-carousel.njk
│   │   │   └── cta-buttons.njk
│   │   └── partials/
│   │       ├── head.njk
│   │       ├── gtm-head.njk
│   │       └── footer.njk
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css (Tailwind entry)
│   │   │   └── components.css
│   │   ├── js/
│   │   │   ├── main.js (entry point)
│   │   │   ├── amanda-scoring.js
│   │   │   ├── modal-component.js
│   │   │   └── analytics.js
│   │   └── images/
│   ├── functions/
│   │   ├── lead-capture.js
│   │   ├── webhook-distributor.js
│   │   └── amanda-qualifier.js
│   ├── pages/
│   │   ├── obrigada.njk (thank you)
│   │   ├── privacidade.njk (privacy)
│   │   └── termos.njk (terms)
│   └── index.njk (main landing page)
├── netlify.toml
├── tailwind.config.js
├── vite.config.js
├── .eleventy.js
└── package.json
```

### Technology Stack
- **Static Site Generator:** Eleventy (11ty) with Nunjucks templating
- **Build System:** Vite for bundling, HMR, and asset optimization
- **CSS Framework:** Tailwind CSS with custom design tokens
- **JavaScript:** Vanilla JS with ES6+ modules, Web API focus
- **Analytics:** GA4 via Google Tag Manager with Consent Mode v2
- **Backend:** Netlify Functions for serverless processing
- **Deployment:** Netlify with automated CI/CD pipeline
- **Integrations:** Stripe + MailerLite + CRM + Segment + WhatsApp

---

## AMANDA AVATAR SCORING SYSTEM

### Scoring Algorithm (100-point scale)
```javascript
// Demographics (20 points)
const demographicScore = {
  age: (35-42 years) ? 5 : 0,
  gender: (female) ? 5 : 0,
  location: (Brazil/Portugal) ? 5 : 0,
  income: (R$15k-30k/month) ? 5 : 0
};

// Pain Points (40 points)
const painPointScore = {
  workHours: (10+ hours/day) ? 10 : 0,
  exhaustion: (rating 7-10) ? 10 : 0,
  delegation: (struggle rating 7-10) ? 10 : 0,
  trapped: (feeling rating 7-10) ? 10 : 0
};

// Behavior (40 points)
const behaviorScore = {
  businessOwner: (yes) ? 10 : 0,
  teamSize: (3+ employees) ? 10 : 0,
  investmentReady: (R$5k+ budget) ? 10 : 0,
  timeCommitment: (available for mentoring) ? 10 : 0
};
```

### Lead Qualification Routing
- **80-100 points:** High-priority lead → Immediate WhatsApp + Sales team alert
- **60-79 points:** Qualified lead → Standard nurture sequence
- **40-59 points:** Lower priority → Extended nurture sequence
- **0-39 points:** Unqualified → Educational content sequence

---

## CRITICAL EVENTS TRACKING (Snake_case)

### Primary Conversion Events
```javascript
// Modal and Form Interactions
dataLayer.push({
  event: 'modal_open',
  source_section: 'hero_cta',
  cta_id: 'quero_transformacao_primary',
  traffic_temperature: 'cold'
});

dataLayer.push({
  event: 'lead_form_submit',
  amanda_match_score: 78,
  qualification_tier: 'high_priority',
  form_completion_time: 247,
  lead_id: 'lead_2024_001234'
});

// Journey Progression Events
dataLayer.push({
  event: 'questionnaire_click',
  email_delivered: true,
  amanda_score: 78
});

dataLayer.push({
  event: 'calendar_booking_complete',
  booking_date: '2024-02-15',
  booking_time: '14:00',
  amanda_score: 78
});

dataLayer.push({
  event: 'whatsapp_message_sent',
  message_type: 'jucana_video',
  automation_trigger: 'post_booking'
});
```

### Avatar Measurement Parameters
```javascript
// Amanda Match Scoring
amanda_match_score: 0-100,
qualification_tier: 'high_priority|qualified|lower_priority|unqualified',
pain_point_alignment: 'high|medium|low',
demographic_match: 'perfect|partial|minimal',
behavior_indicators: 'strong|moderate|weak'
```

---

## 5-GATE VALIDATION PROCESS

### Gate 1: ui_ok (FE-UI Ownership)
**Validation Criteria:**
- [ ] Eleventy builds successfully with Vite bundling
- [ ] Tailwind CSS compiled with custom design tokens
- [ ] Landing page 9-section structure implemented
- [ ] Lead capture modal Web Component functional
- [ ] Responsive design (320px+ viewport support)
- [ ] Accessibility: semantic HTML, ARIA patterns, keyboard navigation
- [ ] Performance: images optimized, lazy loading, code splitting

**Evidence Required:**
- Component demonstration screenshots
- Accessibility audit results (axe-core)
- Responsive behavior validation across devices
- Performance metrics (Lighthouse scores)

### Gate 2: integrations_ok (FCI Ownership)
**Validation Criteria:**
- [ ] Amanda scoring algorithm implemented and tested
- [ ] Lead capture forms with progressive disclosure
- [ ] lead_id generation and UTM parameter capture
- [ ] Form validation with Portuguese error messaging
- [ ] Stripe Payment Element setup (for future use)
- [ ] Error handling and graceful degradation

**Evidence Required:**
- Amanda scoring test scenarios with expected outputs
- Form functionality demonstration
- UTM parameter capture validation
- Error state handling screenshots

### Gate 3: analytics_ok (ATE Ownership)
**Validation Criteria:**
- [ ] GTM container published with GA4 configuration
- [ ] Snake_case event implementation verified
- [ ] Google Consent Mode v2 functional
- [ ] Data layer structure validated
- [ ] Amanda match score tracking operational
- [ ] No PII exposure in event parameters

**Evidence Required:**
- Tag Assistant screenshots showing event firing
- GA4 DebugView validation of events
- Consent Mode functionality demonstration
- Data layer inspection results

### Gate 4: backend_ok (BWE Ownership)
**Validation Criteria:**
- [ ] Netlify Functions processing form submissions
- [ ] Webhook distribution to CRM + MailerLite + Segment
- [ ] Amanda score-based lead routing functional
- [ ] Server-side GA4 events firing correctly
- [ ] WhatsApp automation triggers working
- [ ] Error handling and retry logic implemented

**Evidence Required:**
- Webhook processing logs
- Multi-platform sync test results
- Lead routing validation by Amanda score
- Server-side event confirmation

### Gate 5: release_ok (DQE Ownership)
**Validation Criteria:**
- [ ] Netlify deployment pipeline functional
- [ ] Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.10 (mobile)
- [ ] JavaScript bundle ≤200KB gzipped
- [ ] Security headers implemented (CSP with GTM allowlisting)
- [ ] LGPD compliance validated
- [ ] Error monitoring and alerts active

**Evidence Required:**
- Production deployment success confirmation
- Core Web Vitals performance report
- Security headers validation
- Monitoring dashboard screenshots

---

## EPIC IMPLEMENTATION ROADMAP

### Sprint 1: Foundation (E0, E1, E2)
**Duration:** 5 days  
**Gate Target:** ui_ok preparation

**FE-UI Tasks:**
- Initialize Eleventy + Vite + Tailwind foundation
- Create design token system for Brazilian visual identity
- Implement base layout and navigation structure
- Set up component library architecture

**ATE Tasks:**
- Configure GTM container with GA4 integration
- Implement Google Consent Mode v2 foundation
- Create data layer initialization framework

**DQE Tasks:**
- Set up Netlify deployment pipeline
- Configure build process and performance budgets
- Implement basic CI/CD workflow

### Sprint 2: Content & Forms (E3, E7, E8)
**Duration:** 8 days  
**Gate Target:** ui_ok → integrations_ok

**FE-UI Tasks:**
- Build 9-section landing page structure
- Implement lead capture modal Web Component
- Create testimonial and social proof components
- Optimize mobile responsiveness and accessibility

**FCI Tasks:**
- Develop Amanda avatar scoring algorithm
- Implement progressive form disclosure
- Create lead_id generation and UTM capture
- Build form validation with Portuguese messaging

**ATE Tasks:**
- Implement snake_case event tracking
- Set up modal and form interaction events
- Configure Amanda score parameter tracking

### Sprint 3: Commerce & Integration (E5, E6)
**Duration:** 7 days  
**Gate Target:** integrations_ok → analytics_ok → backend_ok

**FCI Tasks:**
- Complete Stripe Payment Element setup
- Finalize form submission workflows
- Test error handling and edge cases

**BWE Tasks:**
- Build Netlify Functions for webhook processing
- Implement multi-platform distribution (CRM + MailerLite + Segment)
- Create Amanda score-based lead routing
- Set up WhatsApp automation triggers

**ATE Tasks:**
- Validate all event tracking implementation
- Test consent management workflows
- Verify data layer structure compliance

### Sprint 4: Performance & Monitoring (E10, E12, E13)
**Duration:** 6 days  
**Gate Target:** backend_ok → release_ok

**DQE Tasks:**
- Implement Core Web Vitals optimization
- Set up error monitoring and alerting
- Configure security headers and LGPD compliance
- Run comprehensive performance testing

**FE-UI Tasks:**
- Optimize bundle sizes and loading performance
- Implement advanced lazy loading strategies
- Fine-tune accessibility implementation

**BWE Tasks:**
- Optimize serverless function performance
- Implement comprehensive error handling
- Test webhook reliability and retry logic

### Sprint 5: Content Migration & Launch (E11, E4)
**Duration:** 4 days  
**Gate Target:** Production deployment

**All Teams:**
- Content migration and final testing
- Production deployment and monitoring validation
- MailerLite automation handoff
- Documentation completion

---

## PERFORMANCE & COMPLIANCE TARGETS

### Core Web Vitals (Mobile)
- **Largest Contentful Paint (LCP):** ≤2.5 seconds
- **Interaction to Next Paint (INP):** ≤200 milliseconds  
- **Cumulative Layout Shift (CLS):** ≤0.10

### Bundle Size Budgets
- **JavaScript Bundle:** ≤200KB gzipped
- **CSS Bundle:** ≤80KB gzipped
- **Total Page Weight:** ≤2MB including images

### Accessibility Standards
- **WCAG 2.1 AA Compliance:** Full compliance validated
- **Keyboard Navigation:** Complete keyboard accessibility
- **Screen Reader Support:** Proper ARIA labeling and structure
- **Color Contrast:** Minimum 4.5:1 ratio for normal text

### LGPD Compliance
- **Consent Management:** Google Consent Mode v2 implementation
- **Data Processing:** Explicit opt-in for all tracking
- **Privacy Policy:** Clear data usage explanation in Portuguese
- **Cookie Management:** Granular consent options

---

## RISK MITIGATION STRATEGIES

### Technical Risks
**Risk:** Eleventy build complexity with Vite integration  
**Mitigation:** Early prototype validation, fallback to standard 11ty build

**Risk:** Amanda scoring algorithm accuracy  
**Mitigation:** A/B testing framework, manual validation by sales team

**Risk:** Multi-platform webhook reliability  
**Mitigation:** Retry logic, dead letter queues, manual reconciliation tools

### Business Risks
**Risk:** LGPD compliance gaps  
**Mitigation:** Legal review checkpoint, conservative data collection approach

**Risk:** Performance degradation on mobile  
**Mitigation:** Continuous monitoring, performance budgets in CI/CD

**Risk:** WhatsApp automation reliability  
**Mitigation:** Fallback to manual outreach, multiple communication channels

---

## HANDOFF REQUIREMENTS

### To Sales Team
- Amanda scoring explanation and lead qualification criteria
- CRM integration workflow and lead routing logic
- WhatsApp automation sequence and manual fallback procedures

### To Marketing Team  
- GTM container access and event documentation
- A/B testing framework for conversion optimization
- Performance monitoring dashboards and alert setup

### To Technical Team
- Complete Development Execution Pack (DEP)
- Deployment procedures and troubleshooting guides
- Monitoring and maintenance workflows

---

**Next Step:** Coordinate all 5 subagents through detailed gate-specific task assignments and validation criteria.
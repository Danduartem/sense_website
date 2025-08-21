# Data Layer Engineer (DLE) - GTM Implementation Brief

## Primary Directive
Create complete data layer architecture and JavaScript utilities for Mentoria Seja Livre's landing page conversion flow with Amanda avatar qualification and 11ty integration.

## Project Context
**Client:** Mentoria Seja Livre
**Avatar:** Amanda - The Exhausted Achiever (female entrepreneur, R$20k/month, 35 years old, works 12+ hours daily)
**Tech Stack:** 11ty + Vite + Tailwind + Netlify + GTM + GA4 + Segment + MailerLite + Custom CRM
**Conversion Flow:** CTA → Modal Collection → Thank You Page → Email Questionnaire → Calendly Booking → WhatsApp Automation → Sales Call

## Critical Requirements
- **NAMING FREEZE:** Use approved events from Define framework - NO renaming allowed
- **snake_case everywhere:** events, parameters, variables, functions
- **Amanda scoring:** 0-100 scale calculation for qualification
- **lead_id progression:** lead_id → user_id upon program enrollment
- **test_mode handling:** test_mode=true for staging/development
- **Mobile-first:** All implementations optimized for mobile experience
- **11ty integration:** Compatible with Eleventy static site generator

## Core Deliverables

### 1. DataLayer Foundation Architecture
Create comprehensive JavaScript foundation with:
- Global dataLayer initialization for 11ty base template
- Identity management with lead_id/user_id progression
- Amanda avatar scoring algorithm (Demographics 20pts + Pain Points 40pts + Behavior 40pts)
- Session tracking with 30-minute timeout
- Traffic source detection and UTM persistence
- Test mode detection based on hostname

### 2. Landing Page Event Implementation
Implement push shapes for all landing page sections:

**Modal & Form Events:**
```javascript
// Modal open tracking
function trackModalOpen(sourceSection, ctaId, trafficTemperature)

// Form progression tracking  
function trackFormStart(formFieldFocus, timeToStart)

// Lead form submission with Amanda scoring
function trackLeadFormSubmit(formData, calculatedAmandaScore)

// Modal abandonment tracking
function trackModalAbandon(timeInModal, fieldsCompleted, abandonReason)
```

**Landing Page Navigation:**
```javascript
// CTA click tracking across all sections
function trackCtaClick(sourceSection, ctaId, ctaLabel, trafficTemp)

// Section viewport tracking with Intersection Observer
function trackSectionView(sectionName, timeToView, scrollDepth)

// Testimonial interaction tracking
function trackTestimonialInteraction(testimonialId, interactionType)
```

### 3. Amanda Avatar Scoring Function
Implement precise qualification algorithm:

```javascript
function calculateAmandaScore(formData) {
  let score = 0;
  
  // Demographics (20 points)
  if (formData.get('gender') === 'feminino') score += 10;
  if (formData.get('age') >= 30 && formData.get('age') <= 40) score += 5;
  if (formData.get('monthly_revenue') === '15k_25k') score += 5;
  
  // Pain Points (40 points)
  if (parseInt(formData.get('work_hours_daily')) >= 10) score += 15;
  if (formData.get('main_struggle') === 'exhaustion_overwork') score += 15;
  if (formData.get('delegation_struggle') === 'sim') score += 10;
  
  // Behavioral Indicators (40 points)
  if (formData.get('feminine_energy_importance') === 'muito_importante') score += 15;
  if (formData.get('leadership_interest') === 'alto') score += 15;
  if (parseInt(formData.get('transformation_readiness')) >= 8) score += 10;
  
  return Math.min(score, 100);
}
```

### 4. 11ty Template Integration
Provide ready-to-implement code for:
- Base template with dataLayer initialization
- Enhanced page view tracking with 11ty variables
- Identity management cookie system
- Modal Web Component implementation
- Form submission handling with validation

### 5. Email & Questionnaire Tracking
Implement event shapes for post-modal flow:
- `questionnaire_email_sent` automation trigger
- `questionnaire_click` with timing parameters
- `questionnaire_complete` with readiness scoring
- `questionnaire_abandon` with completion percentage

### 6. Mobile & Performance Optimization
Ensure all implementations:
- Load asynchronously without blocking page render
- Work on iOS and Android browsers
- Minimal JavaScript execution time (<100ms)
- Graceful degradation if tracking fails

## Technical Specifications

### DataLayer Event Structure
```javascript
// Standard event structure
{
  event: 'event_name',
  event_timestamp: '2025-01-15T10:30:00Z',
  test_mode: boolean,
  lead_id: 'uuid_v4',
  user_id: null, // Set after enrollment
  amanda_match_score: 0-100,
  source_section: 'hero|social_proof|problem|solution|deliverables|outcomes|testimonials|faq|final',
  // ... specific event parameters
}
```

### Identity Management Requirements
- **lead_id:** Generate UUID on first interaction, persist 365 days
- **user_id:** Promote from lead_id upon program enrollment 
- **session_id:** Generate per session, 30-minute timeout
- **Cross-domain tracking:** Support subdomain persistence
- **Test environment handling:** Separate test vs production identities

### Error Handling Standards
- No JavaScript errors should break user experience
- Graceful degradation when tracking systems fail
- Console warnings for debugging in development
- Retry logic for failed network requests

## Integration Points with Other Subagents

**GTB (Tag Builder):** Provide exact dataLayer event shapes for GTM variable mapping
**SSE (Server Engineer):** Define webhook payload structure for lead submission
**QPS (Privacy Steward):** Implement consent-aware tracking and PII protection
**DOC (Documentation):** Provide implementation code examples and integration guides

## Success Criteria
- All landing page interactions tracked with proper event names and parameters
- Amanda scoring algorithm validated with sample data sets
- 11ty integration tested on development environment
- Mobile performance verified on iOS and Android
- Identity progression from lead_id to user_id working correctly
- Test mode properly separates development from production data

## Delivery Format
Provide:
1. Complete JavaScript modules ready for 11ty integration
2. DataLayer initialization code for base template
3. Modal Web Component with tracking integration
4. Amanda scoring function with validation tests
5. Implementation documentation with code examples
6. Performance optimization guidelines

Start with the DataLayer foundation and identity management, then proceed to landing page event implementation. Coordinate with other subagents for integration points.
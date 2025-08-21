# QA Validation Procedures — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** QA & Privacy Steward Agent  
**Implementation:** GTM Analytics v1.0

---

## Overview

This document provides comprehensive QA validation procedures for the Mentoria Seja Livre GTM tracking implementation. The testing framework ensures Amanda avatar qualification accuracy, cross-platform data consistency, LGPD compliance, and performance standards.

**Testing Scope:**
- Complete conversion funnel validation
- Amanda scoring algorithm accuracy
- Cross-platform data synchronization
- Privacy compliance and consent management
- Performance impact assessment
- Error handling and reliability

---

## Table of Contents

1. [Pre-Launch Validation](#1-pre-launch-validation)
2. [Cross-Browser Testing Matrix](#2-cross-browser-testing-matrix)
3. [Event Validation Procedures](#3-event-validation-procedures)
4. [Amanda Scoring Validation](#4-amanda-scoring-validation)
5. [Cross-Platform Integration Testing](#5-cross-platform-integration-testing)
6. [Privacy & Consent Validation](#6-privacy--consent-validation)
7. [Performance Testing](#7-performance-testing)
8. [Post-Launch Monitoring](#8-post-launch-monitoring)

---

## 1. Pre-Launch Validation

### Critical Path Testing Checklist

**Phase 1: Foundation Setup (Week 1)**

```markdown
## ✅ DataLayer Foundation
- [ ] GTM container loads without errors
- [ ] Identity manager initializes successfully
- [ ] Lead ID generation and cookie persistence working
- [ ] Session tracking and traffic source attribution accurate
- [ ] Test mode parameter correctly excludes development events
- [ ] Console shows no JavaScript errors during initialization

## ✅ Modal Functionality
- [ ] Modal opens from all primary CTA buttons
- [ ] Form fields display correctly on mobile and desktop
- [ ] Amanda scoring calculation executes without errors
- [ ] Form validation provides appropriate error messages
- [ ] Modal close/abandon tracking fires correctly
- [ ] Accessibility compliance (keyboard navigation, screen readers)

## ✅ GTM Configuration
- [ ] All tags fire in GTM Preview mode
- [ ] DataLayer variables populate with correct values
- [ ] Event triggers filter test mode properly
- [ ] GA4 tags receive events with proper parameters
- [ ] Consent mode integration functions correctly
```

**Phase 2: Integration Testing (Week 2)**

```markdown
## ✅ Webhook Integration
- [ ] Lead submission triggers all destination webhooks
- [ ] CRM integration receives complete lead data
- [ ] MailerLite contact creation and automation trigger
- [ ] Segment events flow to data warehouse
- [ ] Error handling for webhook failures implemented
- [ ] Retry logic for failed requests working

## ✅ Email Automation
- [ ] Questionnaire email sends within 5 minutes
- [ ] Email links track clicks accurately
- [ ] Questionnaire completion triggers calendar access
- [ ] Reminder sequences send at correct intervals
- [ ] Email personalization displays properly

## ✅ Thank You Page Flow
- [ ] Redirect occurs after successful form submission
- [ ] 80% progress bar displays correctly
- [ ] Lead ID parameter passed properly
- [ ] Next step messaging clear and accurate
- [ ] Thank you page events tracked properly
```

---

## 2. Cross-Browser Testing Matrix

### Browser Compatibility Requirements

| Test Case | Chrome 119+ | Safari 17+ | Firefox 119+ | Edge 119+ | Mobile Chrome | Mobile Safari |
|-----------|-------------|-------------|--------------|-----------|---------------|---------------|
| **Modal Open** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Form Submit** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **GTM Events** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Webhook Calls** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Cookie Persistence** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Performance <2s** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Device Testing Requirements

**Desktop Testing (1920x1080, 1366x768, 1440x900):**
- Modal displays properly at all resolutions
- Form fields remain accessible and readable
- CTA buttons maintain appropriate sizing
- Performance impact <100ms on JavaScript execution

**Mobile Testing (375x667, 414x896, 360x740):**
- Modal adapted for mobile viewport
- Touch interactions work smoothly
- Form completion possible without horizontal scrolling
- Performance maintains <2 second page load

**Tablet Testing (768x1024, 1024x768):**
- Modal scales appropriately for tablet size
- Form usability optimized for touch input
- Performance between mobile and desktop standards

---

## 3. Event Validation Procedures

### Modal Interaction Validation

**Test Case 1: Modal Open Event**
```javascript
// Expected DataLayer Push
{
  event: 'modal_open',
  source_section: 'hero', // or other section
  cta_id: 'cta_primary',
  traffic_temperature: 'cold|warm|hot',
  lead_id: 'uuid-format',
  timestamp: '2025-08-20T12:00:00.000Z',
  test_mode: false
}

// Validation Steps:
1. Click any primary CTA button
2. Verify modal opens within 300ms
3. Check GTM Preview shows modal_open event
4. Confirm all required parameters present
5. Validate source_section matches CTA location
```

**Test Case 2: Lead Form Submit Event**
```javascript
// Expected DataLayer Push
{
  event: 'lead_form_submit',
  amanda_match_score: 75, // 0-100 calculated score
  amanda_score_tier: 'medium', // high|medium|low
  lead_source: 'landing_page_modal',
  form_completion_time: 45000, // milliseconds
  source_section: 'hero',
  cta_id: 'cta_primary',
  qualification_inputs: {
    business_type: 'clinic',
    monthly_revenue: '15k_25k',
    work_hours_daily: '12',
    main_struggle: 'exhaustion_overwork'
  },
  user_email: 'amanda@example.com',
  user_name: 'Amanda Silva',
  lead_id: 'uuid-format',
  timestamp: '2025-08-20T12:05:00.000Z',
  test_mode: false
}

// Validation Steps:
1. Complete modal form with test data
2. Submit form and verify success message
3. Check GTM Preview shows lead_form_submit event
4. Validate Amanda score calculation accuracy
5. Confirm all form fields captured in qualification_inputs
6. Verify email/name in user_email/user_name parameters
```

### Section Tracking Validation

**Test Case 3: Section View Events**
```javascript
// Expected DataLayer Push for each section
{
  event: 'section_view',
  section_name: 'problem', // hero|social_proof|problem|etc.
  scroll_depth: 45, // percentage
  time_to_view: 15000, // milliseconds since page load
  lead_id: 'uuid-format',
  timestamp: '2025-08-20T12:02:00.000Z',
  test_mode: false
}

// Validation Steps:
1. Scroll through landing page slowly
2. Verify section_view events fire at 50% visibility
3. Check scroll_depth calculation accuracy
4. Validate time_to_view progression makes sense
5. Confirm all 9 sections trigger events
```

---

## 4. Amanda Scoring Validation

### Scoring Algorithm Test Cases

**Test Case 1: High Amanda Score (80-100)**
```javascript
// Test Data Input
const testData = {
  gender: 'feminino', // +10 points
  age: 35, // +5 points (30-40 range)
  monthly_revenue: '15k_25k', // +5 points
  work_hours_daily: 12, // +15 points (≥10)
  main_struggle: 'exhaustion_overwork', // +15 points
  delegation_struggle: 'sim', // +10 points
  feminine_energy_importance: 'muito_importante', // +15 points
  leadership_interest: 'alto', // +15 points
  transformation_readiness: 9 // +10 points (≥8)
};

// Expected Calculation: 10+5+5+15+15+10+15+15+10 = 100 points
// Expected Tier: 'high'

// Validation Steps:
1. Input test data into modal form
2. Submit form and capture amanda_match_score
3. Verify score equals 100
4. Confirm amanda_score_tier equals 'high'
5. Check CRM receives priority flag for 80+ scores
```

**Test Case 2: Medium Amanda Score (60-79)**
```javascript
// Test Data Input
const testData = {
  gender: 'feminino', // +10 points
  age: 45, // +0 points (outside 30-40)
  monthly_revenue: 'under_10k', // +0 points
  work_hours_daily: 8, // +0 points (<10)
  main_struggle: 'exhaustion_overwork', // +15 points
  delegation_struggle: 'sim', // +10 points
  feminine_energy_importance: 'muito_importante', // +15 points
  leadership_interest: 'alto', // +15 points
  transformation_readiness: 7 // +0 points (<8)
};

// Expected Calculation: 10+0+0+0+15+10+15+15+0 = 65 points
// Expected Tier: 'medium'
```

**Test Case 3: Low Amanda Score (<60)**
```javascript
// Test Data Input
const testData = {
  gender: 'masculino', // +0 points
  age: 25, // +0 points
  monthly_revenue: 'under_10k', // +0 points
  work_hours_daily: 6, // +0 points
  main_struggle: 'time_management', // +0 points
  delegation_struggle: 'nao', // +0 points
  feminine_energy_importance: 'pouco_importante', // +0 points
  leadership_interest: 'baixo', // +0 points
  transformation_readiness: 4 // +0 points
};

// Expected Calculation: 0+0+0+0+0+0+0+0+0 = 0 points
// Expected Tier: 'low'
```

### Server-Side Validation

```javascript
// Validation: Client vs Server Score Calculation
// Test that client-side and server-side Amanda calculations match

// Test Steps:
1. Submit form with known test data
2. Capture client-side calculated score from DataLayer
3. Check server response for server-side calculated score
4. Verify both calculations match exactly
5. Test edge cases (boundary values, missing fields)
6. Confirm error handling for invalid inputs
```

---

## 5. Cross-Platform Integration Testing

### CRM Integration Validation

**Test Case 1: Lead Creation**
```json
{
  "test_scenario": "New lead submission to CRM",
  "expected_crm_payload": {
    "external_id": "uuid-format",
    "name": "Amanda Silva",
    "email": "amanda@example.com",
    "phone": "+5511999999999",
    "source": "landing_page_modal",
    "amanda_match_score": 75,
    "custom_fields": {
      "business_type": "clinic",
      "monthly_revenue": "15k_25k",
      "work_hours_daily": "12",
      "main_struggle": "exhaustion_overwork",
      "source_section": "hero",
      "cta_id": "cta_primary"
    },
    "tags": [
      "landing_page_lead",
      "amanda_score_medium",
      "source_hero"
    ]
  },
  "validation_steps": [
    "Submit test form with complete data",
    "Check CRM webhook receives POST request",
    "Verify all required fields present in payload",
    "Confirm lead appears in CRM with correct Amanda score",
    "Validate tags applied correctly for segmentation"
  ]
}
```

### MailerLite Integration Validation

**Test Case 2: Contact Sync and Automation**
```json
{
  "test_scenario": "MailerLite contact creation and questionnaire automation",
  "expected_mailerlite_payload": {
    "email": "amanda@example.com",
    "fields": {
      "name": "Amanda Silva",
      "phone": "+5511999999999",
      "lead_id": "uuid-format",
      "business_type": "clinic",
      "amanda_match_score": 75,
      "source_section": "hero",
      "subscription_date": "2025-08-20T12:00:00.000Z"
    },
    "groups": [
      "landing_page_leads",
      "amanda_qualified"
    ]
  },
  "automation_validation": [
    "Contact created within 30 seconds",
    "Questionnaire email triggered within 5 minutes",
    "Email personalisation uses correct name and context",
    "Segmentation groups assigned based on Amanda score",
    "Automation sequence progresses correctly"
  ]
}
```

### GA4 Integration Validation

**Test Case 3: Enhanced Ecommerce Configuration**
```javascript
// Expected GA4 Custom Dimensions
const expectedCustomDimensions = {
  custom_dimension_1: 'amanda_match_score', // Scope: Event
  custom_dimension_2: 'transformation_stage', // Scope: User
  custom_dimension_3: 'traffic_source', // Scope: Session
  custom_dimension_4: 'source_section', // Scope: Event
  custom_dimension_5: 'amanda_score_tier' // Scope: Event
};

// Validation Steps:
// 1. Submit test form
// 2. Check GA4 DebugView for lead_form_submit event
// 3. Verify all custom dimensions populated
// 4. Confirm audience building works with dimensions
// 5. Test conversion events marked properly
```

### Segment CDP Validation

**Test Case 4: Unified Customer Profile**
```javascript
// Expected Segment Event
{
  "userId": "uuid-lead-id",
  "event": "Lead Form Submit",
  "properties": {
    "amanda_match_score": 75,
    "business_type": "clinic",
    "monthly_revenue": "15k_25k",
    "source_section": "hero",
    "lead_source": "landing_page_modal"
  },
  "context": {
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "page": {
      "title": "Mentoria Seja Livre",
      "url": "https://mentoriasejalivre.com.br",
      "path": "/"
    }
  },
  "timestamp": "2025-08-20T12:00:00.000Z"
}

// Validation Steps:
// 1. Check Segment debugger for incoming events
// 2. Verify user profile creation with traits
// 3. Confirm data flows to warehouse destinations
// 4. Test audience segmentation based on Amanda score
// 5. Validate cross-platform identity resolution
```

---

## 6. Privacy & Consent Validation

### LGPD Compliance Testing

**Test Case 1: Consent Banner Functionality**
```markdown
## Consent Banner Validation
- [ ] Banner displays on first visit
- [ ] Three consent options clearly presented
- [ ] "Aceitar Todos" grants all consent types
- [ ] "Apenas Essenciais" denies marketing/analytics
- [ ] "Personalizar" shows granular consent options
- [ ] Consent choice persists across sessions
- [ ] Google Consent Mode updates correctly
```

**Test Case 2: Consent Mode Implementation**
```javascript
// Test Consent Denied Scenario
gtag('consent', 'update', {
  'analytics_storage': 'denied',
  'marketing_storage': 'denied'
});

// Expected Behavior:
// 1. GA4 tags should not fire
// 2. MailerLite marketing automation paused
// 3. Essential functionality continues working
// 4. CRM integration continues (legitimate interest)

// Test Consent Granted Scenario
gtag('consent', 'update', {
  'analytics_storage': 'granted',
  'marketing_storage': 'granted'
});

// Expected Behavior:
// 1. All GA4 tags fire normally
// 2. MailerLite automation resumes
// 3. Full tracking and personalization active
```

### PII Protection Validation

**Test Case 3: Data Sanitization**
```javascript
// Test PII Exclusion from Analytics
const formData = {
  name: "Amanda Silva",
  email: "amanda@example.com",
  phone: "+5511999999999",
  business_type: "clinic"
};

// Expected GA4 Parameters (PII Removed):
const expectedGA4Data = {
  amanda_match_score: 75,
  business_type: "clinic",
  source_section: "hero",
  lead_id: "uuid-format"
  // NO email, phone, or name
};

// Validation Steps:
// 1. Submit form with PII data
// 2. Check GA4 DebugView events
// 3. Confirm NO email/phone parameters in GA4
// 4. Verify CRM receives complete PII (legitimate processing)
// 5. Test data retention policies compliance
```

---

## 7. Performance Testing

### Page Load Impact Assessment

**Test Case 1: JavaScript Execution Time**
```javascript
// Performance Benchmarks
const performanceTargets = {
  dataLayerInit: 50, // milliseconds
  modalOpen: 300, // milliseconds
  formSubmission: 2000, // milliseconds
  pageLoadImpact: 100, // additional ms from tracking
  totalPageLoad: 2000 // milliseconds (mobile)
};

// Testing Process:
// 1. Measure baseline page load without tracking
// 2. Enable tracking and measure impact
// 3. Test on 3G mobile connection simulation
// 4. Validate Core Web Vitals compliance
// 5. Check GTM container size impact
```

**Test Case 2: Core Web Vitals**
```javascript
// Web Vitals Targets
const webVitalsTargets = {
  LCP: 2.5, // seconds (Largest Contentful Paint)
  FID: 100, // milliseconds (First Input Delay)
  CLS: 0.1 // Cumulative Layout Shift
};

// Validation Steps:
// 1. Use Chrome Lighthouse for baseline measurement
// 2. Test with tracking implementation active
// 3. Ensure tracking doesn't impact LCP/FID/CLS scores
// 4. Optimize any performance regressions
// 5. Document performance impact report
```

### Error Handling Testing

**Test Case 3: Network Failure Scenarios**
```javascript
// Simulated Failure Scenarios
const failureTests = [
  {
    scenario: 'GTM container load failure',
    expected: 'Graceful degradation, core functionality works',
    test: 'Block *.googletagmanager.com in DevTools'
  },
  {
    scenario: 'Webhook endpoint unavailable',
    expected: 'Form submission succeeds, retry logic triggered',
    test: 'Block /.netlify/functions/* endpoints'
  },
  {
    scenario: 'Third-party script failures',
    expected: 'Tracking fails gracefully, UX unaffected',
    test: 'Block Segment, MailerLite domains'
  }
];

// Validation for each scenario:
// 1. Simulate failure condition
// 2. Test form submission still works
// 3. Verify error logging captures failure
// 4. Confirm retry mechanisms activate
// 5. Check user experience remains smooth
```

---

## 8. Post-Launch Monitoring

### First 48 Hours Monitoring

**Critical Metrics Dashboard**
```javascript
const criticalMetrics = {
  modalOpenRate: {
    target: '>15%',
    calculation: 'modal_open_events / page_views',
    alertThreshold: '<10%'
  },
  formCompletionRate: {
    target: '>40%',
    calculation: 'lead_form_submit / modal_open',
    alertThreshold: '<30%'
  },
  webhookSuccessRate: {
    target: '>95%',
    calculation: 'successful_webhooks / total_webhook_attempts',
    alertThreshold: '<90%'
  },
  emailDeliveryRate: {
    target: '>98%',
    calculation: 'emails_delivered / emails_sent',
    alertThreshold: '<95%'
  },
  amandaScoreDistribution: {
    target: 'Average >70',
    calculation: 'sum(amanda_scores) / lead_count',
    alertThreshold: '<60'
  }
};
```

### Weekly Data Quality Audit

**Data Consistency Checks**
```sql
-- Example GA4 vs CRM Data Consistency Query
SELECT 
  DATE(event_timestamp) as date,
  COUNT(*) as ga4_events,
  (SELECT COUNT(*) FROM crm_leads WHERE DATE(created_at) = DATE(event_timestamp)) as crm_leads,
  ABS(COUNT(*) - (SELECT COUNT(*) FROM crm_leads WHERE DATE(created_at) = DATE(event_timestamp))) as discrepancy
FROM ga4_events 
WHERE event_name = 'lead_form_submit'
  AND _TABLE_SUFFIX BETWEEN '20250820' AND '20250827'
GROUP BY DATE(event_timestamp)
HAVING discrepancy > 5; -- Alert if >5 lead discrepancy
```

### Monthly Optimization Review

**Performance Optimization Checklist**
```markdown
## Monthly Review Tasks
- [ ] Amanda score correlation analysis with conversion rates
- [ ] Drop-off point identification and optimization
- [ ] Cross-platform data consistency audit
- [ ] Performance impact assessment and optimization
- [ ] A/B testing framework deployment
- [ ] Privacy compliance review and updates
- [ ] Documentation updates based on learnings
- [ ] Tracking enhancement opportunities identification
```

---

## Test Execution Templates

### Manual Testing Checklist

```markdown
## Pre-Production Test Execution

**Tester:** [Name]
**Date:** [YYYY-MM-DD]
**Environment:** [Staging/Production]
**Browser:** [Chrome/Safari/Firefox/Edge]
**Device:** [Desktop/Mobile/Tablet]

### Modal Functionality ✅
- [ ] Modal opens from hero CTA
- [ ] Modal opens from problem section CTA
- [ ] Modal opens from final CTA
- [ ] Form validation works correctly
- [ ] Amanda scoring calculates properly
- [ ] Form submission succeeds
- [ ] Thank you page redirect works
- [ ] Modal abandon tracking fires

### Event Tracking ✅
- [ ] modal_open events in GTM Preview
- [ ] lead_form_submit events in GTM Preview
- [ ] section_view events fire on scroll
- [ ] cta_click events track properly
- [ ] All required parameters present
- [ ] Test mode filtering works

### Cross-Platform Integration ✅
- [ ] GA4 receives events in DebugView
- [ ] Segment events visible in debugger
- [ ] CRM webhook creates lead record
- [ ] MailerLite contact creation works
- [ ] Email automation triggers correctly

### Performance & Errors ✅
- [ ] Page loads within 2 seconds
- [ ] No JavaScript console errors
- [ ] Modal responsive on mobile
- [ ] Accessibility compliance verified
- [ ] Network failures handled gracefully

**Notes:**
[Any issues, observations, or recommendations]

**Test Result:** PASS / FAIL
**Approved for Production:** YES / NO
```

### Automated Testing Script

```javascript
// Automated QA Testing Script
// Run with: node qa-automated-tests.js

const puppeteer = require('puppeteer');

async function runQATests() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🎯 Starting Mentoria Seja Livre QA Tests...');
  
  // Test 1: Page Load and Tracking Initialization
  await page.goto('https://mentoriasejalivre.com.br');
  await page.waitForSelector('[data-cta="cta_primary"]');
  
  // Test 2: Modal Opening
  await page.click('[data-cta="cta_primary"]');
  await page.waitForSelector('.modal-open', { timeout: 5000 });
  console.log('✅ Modal opens successfully');
  
  // Test 3: Form Completion and Submission
  await page.type('input[name="name"]', 'Amanda Test');
  await page.type('input[name="email"]', 'amanda.test@example.com');
  await page.type('input[name="phone"]', '+5511999999999');
  await page.select('select[name="business_type"]', 'clinic');
  await page.select('select[name="monthly_revenue"]', '15k_25k');
  await page.select('select[name="work_hours_daily"]', '12');
  
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  console.log('✅ Form submission successful');
  
  // Test 4: Thank You Page Validation
  const progressBar = await page.$('.progress-bar');
  if (progressBar) {
    console.log('✅ Thank you page displays progress bar');
  } else {
    console.log('❌ Progress bar missing on thank you page');
  }
  
  await browser.close();
  console.log('🎉 QA Tests Completed');
}

// Run tests
runQATests().catch(console.error);
```

---

## Success Criteria

### Technical Validation ✅
- All events fire correctly in GTM Preview
- Cross-platform data consistency maintained
- Performance impact <100ms JavaScript execution
- Zero JavaScript errors in console
- Mobile responsiveness across devices

### Business Validation ✅
- Amanda scoring accuracy >95% for test cases
- Lead qualification segmentation working
- Sales team alert system functional
- Attribution tracking complete and accurate
- Privacy compliance verified

### Integration Validation ✅
- GA4 custom dimensions populating
- Segment customer profiles building
- CRM lead creation and scoring
- MailerLite automation triggering
- Cross-platform identity resolution

**Final QA Sign-off Required Before Production Deployment**

---

*This QA validation framework ensures the Mentoria Seja Livre tracking implementation meets all technical, business, and compliance requirements while maintaining optimal user experience and performance standards.*
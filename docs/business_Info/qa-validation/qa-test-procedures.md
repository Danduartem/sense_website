# QA Test Procedures - Mentoria Seja Livre GTM Implementation

## Overview
This document provides comprehensive testing procedures for validating the complete GTM tracking implementation with LGPD compliance and Amanda avatar qualification.

## Pre-Testing Setup

### Environment Preparation
1. **Development Environment**
   - URL: http://localhost:8080
   - GTM Container: GTM-ZZZZZZZ (Development)
   - test_mode: true

2. **Staging Environment**
   - URL: https://staging--mentoria-seja-livre.netlify.app
   - GTM Container: GTM-YYYYYYY (Staging)
   - test_mode: true

3. **Production Environment**
   - URL: https://mentoriasejalivre.com.br
   - GTM Container: GTM-XXXXXXX (Production)
   - test_mode: false

### Required Testing Tools
- Google Tag Assistant
- GA4 DebugView
- Browser Developer Tools (Chrome, Safari, Firefox)
- Postman (for webhook testing)
- Mobile devices (iOS Safari, Android Chrome)

## Test Case 1: Landing Page Core Flow

### TC1.1: Page Load and DataLayer Initialization
**Objective:** Verify proper page load and dataLayer setup

**Steps:**
1. Navigate to landing page
2. Open browser developer tools → Console
3. Check for JavaScript errors
4. Verify dataLayer initialization

**Expected Results:**
- No JavaScript errors in console
- `window.dataLayer` array exists
- Initial page_view_enhanced event present
- test_mode parameter correct for environment

**Evidence to Collect:**
- Console screenshot showing dataLayer
- Tag Assistant screenshot showing page load

### TC1.2: Modal Opening and Event Tracking
**Objective:** Validate modal open tracking from different sections

**Test Data:**
```
Hero Section CTA: "Quero minha transformação"
Problem Section CTA: "Isso precisa mudar"
Final Section CTA: "Sim, quero me transformar"
```

**Steps:**
1. Click hero section CTA
2. Verify modal opens
3. Check Tag Assistant for modal_open event
4. Close modal
5. Repeat for other sections

**Expected Results:**
- Modal opens smoothly on all devices
- modal_open event fires with correct parameters:
  - source_section: "hero", "problem", "final"
  - cta_id: "cta_primary"
  - lead_id: UUID format
  - test_mode: environment appropriate

**Evidence to Collect:**
- Tag Assistant screenshots for each section
- GA4 DebugView showing events

### TC1.3: Form Field Interaction Tracking
**Objective:** Verify form start tracking when user begins filling

**Steps:**
1. Open modal from hero section
2. Click in "Name" field
3. Check for modal_form_start event
4. Fill first few fields
5. Verify tracking continues

**Expected Results:**
- modal_form_start event fires on first field focus
- form_field_focus parameter shows "name"
- time_to_start parameter present
- Submit button becomes enabled

**Evidence to Collect:**
- Tag Assistant showing form start event
- Console log of dataLayer events

## Test Case 2: Amanda Scoring and Form Submission

### TC2.1: Amanda Score Calculation Validation
**Objective:** Verify accurate Amanda scoring calculation

**Test Data - High Score (Expected ~85):**
```
Name: "Maria Teste"
Email: "maria@teste.com"
Phone: "+5511999999999"
Business Type: "clinica_estetica"
Monthly Revenue: "15k_25k"
Work Hours Daily: "12"
Main Struggle: "exhaustion_overwork"
Delegation Struggle: "sim"
Feminine Energy Importance: "muito_importante"
Leadership Interest: "alto"
Transformation Readiness: "9"
```

**Test Data - Medium Score (Expected ~65):**
```
Name: "Ana Teste"
Email: "ana@teste.com"
Phone: "+5511888888888"
Business Type: "loja_roupas"
Monthly Revenue: "10k_15k"
Work Hours Daily: "8"
Main Struggle: "low_revenue"
Delegation Struggle: "parcialmente"
Feminine Energy Importance: "importante"
Leadership Interest: "medio"
Transformation Readiness: "6"
```

**Steps:**
1. Fill modal form with high score test data
2. Submit form
3. Verify amanda_match_score in dataLayer
4. Check server response includes calculated score
5. Repeat with medium score test data

**Expected Results:**
- High score test: amanda_match_score between 80-90
- Medium score test: amanda_match_score between 60-70
- Server calculation matches client calculation (±5)
- lead_form_submit event fires with all parameters

**Evidence to Collect:**
- Network tab showing form submission payload
- Tag Assistant screenshot of conversion event
- Thank you page with score display

### TC2.2: Form Submission and Webhook Distribution
**Objective:** Validate complete webhook distribution process

**Steps:**
1. Submit form with valid test data
2. Monitor network requests
3. Check webhook responses
4. Verify data reaches all destinations

**Expected Webhook Calls:**
- /.netlify/functions/lead-submit (200 OK)
- CRM webhook endpoint (success)
- MailerLite contact creation (success)
- GA4 server event (success)
- Segment track event (success)

**Evidence to Collect:**
- Network tab showing all webhook calls
- CRM dashboard with new lead record
- MailerLite contacts list with new subscriber
- GA4 real-time showing conversion

## Test Case 3: Thank You Page and Email Flow

### TC3.1: Thank You Page Display and Tracking
**Objective:** Verify thank you page functionality and tracking

**Steps:**
1. Complete form submission
2. Verify redirect to thank you page
3. Check URL parameters (lead_id, amanda_score, source)
4. Verify progress bar shows 80%
5. Check thank_you_page_view event

**Expected Results:**
- Redirect to /obrigada with correct parameters
- Progress bar displays and animates to 80%
- Amanda score displayed if available
- thank_you_page_view event tracked

**Evidence to Collect:**
- Thank you page screenshot
- Tag Assistant showing page view event
- URL parameters verification

### TC3.2: Email Automation Trigger
**Objective:** Validate questionnaire email automation

**Note:** This requires coordination with MailerLite automation setup

**Steps:**
1. Submit form with valid email
2. Wait 5 minutes
3. Check test email account
4. Verify questionnaire email received
5. Click questionnaire link

**Expected Results:**
- Email received within 5 minutes
- Email contains personalized content
- questionnaire_click event fires when link clicked

**Evidence to Collect:**
- Email screenshot
- MailerLite automation logs
- Click tracking verification

## Test Case 4: Cross-Browser and Mobile Testing

### TC4.1: Cross-Browser Compatibility
**Required Browsers:**
- Chrome Desktop (Windows/Mac)
- Safari Desktop (Mac)
- Firefox Desktop (Windows/Mac)
- Edge Desktop (Windows)

**Steps for Each Browser:**
1. Load landing page
2. Test modal opening
3. Complete form submission
4. Verify tracking events
5. Check console for errors

**Expected Results:**
- Consistent behavior across all browsers
- No JavaScript errors
- All tracking events fire correctly
- Form submission successful

**Evidence to Collect:**
- Screenshots from each browser
- Console error logs (should be empty)
- Tracking event verification

### TC4.2: Mobile Device Testing
**Required Devices:**
- iPhone (Safari)
- Android Phone (Chrome)
- iPad (Safari)

**Steps:**
1. Load page on mobile device
2. Test modal opening and usability
3. Fill form fields (test touch targets)
4. Submit form
5. Verify tracking

**Expected Results:**
- Modal opens and closes smoothly
- Form fields are touch-friendly (>44px)
- All tracking events fire on mobile
- Performance acceptable (<3 seconds load)

**Evidence to Collect:**
- Mobile screenshots
- Performance metrics
- Touch interaction videos

## Test Case 5: LGPD Compliance and Consent Management

### TC5.1: Consent Banner Display and Functionality
**Objective:** Verify LGPD consent management

**Steps:**
1. Load page in incognito mode
2. Verify consent banner appears
3. Test "Accept All" button
4. Verify consent is stored
5. Test "Essential Only" button
6. Test "Customize" preferences

**Expected Results:**
- Consent banner displays on first visit
- Consent choices are stored in localStorage
- Google Consent Mode updates correctly
- Marketing tags respect consent settings

**Evidence to Collect:**
- Consent banner screenshots
- localStorage inspection
- Tag Assistant showing consent-gated tags

### TC5.2: PII Firewall Validation
**Objective:** Ensure no PII reaches analytics destinations

**Steps:**
1. Submit form with test email/phone
2. Check GA4 events for PII
3. Verify Segment events
4. Confirm CRM gets full data

**Expected Results:**
- GA4 events contain no email/phone
- Segment events sanitized appropriately
- CRM receives complete contact information
- lead_id used for attribution

**Evidence to Collect:**
- GA4 DebugView screenshots
- Segment debugger inspection
- CRM data verification

## Test Case 6: Error Handling and Edge Cases

### TC6.1: Network Failure Scenarios
**Objective:** Test graceful degradation

**Steps:**
1. Block webhook endpoints in browser
2. Submit form
3. Verify user experience unaffected
4. Check error handling
5. Test retry mechanisms

**Expected Results:**
- Form submission completes for user
- Error logged but not shown to user
- Retry mechanisms attempt failed webhooks
- User redirected to thank you page

**Evidence to Collect:**
- Console error logs
- Network failure screenshots
- User experience videos

### TC6.2: Invalid Data Handling
**Objective:** Test form validation

**Test Cases:**
- Empty required fields
- Invalid email format
- Invalid phone format
- Duplicate submissions

**Steps:**
1. Submit form with invalid data
2. Verify validation messages
3. Test error state styling
4. Confirm accessibility (screen readers)

**Expected Results:**
- Clear validation error messages
- Form does not submit with errors
- Error states are accessible
- User can correct and resubmit

**Evidence to Collect:**
- Validation error screenshots
- Accessibility testing results

## Test Case 7: Performance and Security

### TC7.1: Page Performance Impact
**Objective:** Verify GTM implementation doesn't degrade performance

**Tools:** Chrome Lighthouse, WebPageTest

**Steps:**
1. Run Lighthouse audit before GTM
2. Run Lighthouse audit after GTM
3. Compare Core Web Vitals
4. Test on 3G connection

**Acceptance Criteria:**
- Page load time increase <2 seconds
- First Contentful Paint <3 seconds
- Lighthouse performance score >85
- GTM execution time <100ms

**Evidence to Collect:**
- Lighthouse reports before/after
- Performance metrics comparison
- Mobile performance results

### TC7.2: Security and Rate Limiting
**Objective:** Test webhook security measures

**Steps:**
1. Attempt form submission spam
2. Test rate limiting (>10 requests/minute)
3. Verify webhook signature validation
4. Test malicious input handling

**Expected Results:**
- Rate limiting blocks excessive requests
- Invalid signatures rejected
- XSS attempts sanitized
- SQL injection attempts blocked

**Evidence to Collect:**
- Rate limiting error responses
- Security test results
- Input sanitization verification

## Evidence Package Assembly

### Required Documentation
1. **Test Execution Summary**
   - All test cases passed/failed
   - Browser compatibility matrix
   - Performance benchmark results

2. **Screenshot Collection**
   - Tag Assistant validation for all events
   - GA4 DebugView event confirmations
   - Cross-browser functionality proof
   - Mobile device testing results

3. **Technical Validation**
   - Network request logs
   - Console error reports (should be empty)
   - DataLayer event structure validation
   - Webhook response confirmations

4. **Compliance Verification**
   - LGPD consent implementation proof
   - PII firewall confirmation
   - Data retention compliance
   - Accessibility testing results

### Acceptance Criteria Summary
- [ ] All landing page events track correctly
- [ ] Amanda scoring calculation accurate
- [ ] Form submission and webhooks functional
- [ ] Cross-browser compatibility confirmed
- [ ] Mobile optimization validated
- [ ] LGPD compliance implemented
- [ ] Performance standards met
- [ ] Security measures effective
- [ ] Error handling graceful
- [ ] Complete evidence package assembled

## Post-Launch Monitoring

### First 24 Hours
- Monitor conversion funnel metrics
- Check webhook success rates
- Verify email automation delivery
- Monitor error rates and console warnings

### First Week
- Analyze Amanda score distribution
- Review drop-off points for optimization
- Validate attribution accuracy
- Confirm cross-device tracking

### Ongoing Quality Assurance
- Weekly performance reviews
- Monthly data quality audits
- Quarterly compliance checks
- Annual security assessments
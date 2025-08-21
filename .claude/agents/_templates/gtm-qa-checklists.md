# GTM Phase — QA Validation Checklists

## Overview
These checklists ensure comprehensive validation of the GTM tracking implementation across privacy compliance, technical functionality, and operational readiness. Each checklist must be completed with evidence before production deployment.

---

## Privacy & Compliance Validation Checklist

### GDPR & Consent Management Validation
- [ ] **Consent Mode Implementation**
  - [ ] Consent initialization script loads before GTM
  - [ ] Default consent state is "denied" for analytics and marketing
  - [ ] Consent preferences persist across page loads
  - [ ] Consent updates propagate to GTM correctly
  - **Evidence:** Screenshots of consent banner functionality and GTM consent state

- [ ] **Marketing Tag Gating**
  - [ ] GA4 tags blocked when analytics consent denied
  - [ ] Marketing pixels blocked when marketing consent denied
  - [ ] CRM integration continues when marketing consent denied (functional requirement)
  - [ ] MailerLite sync stops when marketing consent denied
  - **Evidence:** Tag Assistant screenshots showing tag suppression by consent state

- [ ] **PII Data Protection**
  - [ ] No email addresses in data layer events
  - [ ] No phone numbers in data layer events
  - [ ] No full names in data layer events
  - [ ] Personal data replaced with sanitized IDs (lead_id, user_id)
  - **Evidence:** Data layer audit report showing zero PII violations

- [ ] **Data Retention Compliance**
  - [ ] lead_id expires after 365 days as documented
  - [ ] User can request data deletion through documented process
  - [ ] Analytics data retention set per privacy policy
  - [ ] Server logs include only necessary data with appropriate retention
  - **Evidence:** Privacy policy alignment document and retention configuration

### Cross-Border Data Transfer Validation
- [ ] **Data Processing Locations**
  - [ ] GA4 data processing location configured correctly
  - [ ] Server-side events processed in compliant regions
  - [ ] Third-party integrations (CRM, MailerLite) comply with data transfer requirements
  - **Evidence:** Data processing addendum and configuration documentation

---

## Technical Implementation Validation Checklist

### Data Layer Implementation Validation
- [ ] **Core Utility Functions**
  - [ ] `pushEvent()` function works correctly across all browsers
  - [ ] `generateLeadId()` creates unique, persistent identifiers
  - [ ] `trackPageView()` fires on all page types including SPA navigation
  - [ ] `trackFormStart()` fires on first form field interaction
  - [ ] `trackCTAClick()` captures all CTA interactions with proper attribution
  - **Evidence:** Browser console testing across Chrome, Firefox, Safari, Edge

- [ ] **Lead ID Management**
  - [ ] lead_id generates on first visit
  - [ ] lead_id persists across page refreshes
  - [ ] lead_id persists across browser tab close/reopen
  - [ ] lead_id available in both localStorage and cookies
  - [ ] lead_id expiry mechanism works correctly (365 days)
  - **Evidence:** DevTools inspection showing persistence across sessions

- [ ] **UTM Parameter Handling**
  - [ ] UTM parameters captured on page entry with UTMs
  - [ ] UTM parameters stored in sessionStorage correctly
  - [ ] UTM parameters attached only to lead_submit events
  - [ ] UTM parameters persist across page navigation
  - [ ] UTM parameters clear at session end
  - **Evidence:** UTM attribution testing with various traffic sources

### GTM Container Validation
- [ ] **Variable Configuration**
  - [ ] All Data Layer Variables (DLVs) populate with expected values
  - [ ] Default values display when data unavailable
  - [ ] Constant variables return correct environment-specific values
  - [ ] Lookup tables map values correctly
  - [ ] Custom JavaScript variables execute without errors
  - **Evidence:** GTM Preview Mode screenshots showing variable values

- [ ] **Trigger Functionality**
  - [ ] Custom event triggers fire on expected user actions
  - [ ] Trigger conditions properly filter events
  - [ ] Element visibility triggers work with intersection observer
  - [ ] Click triggers target correct elements with CSS selectors
  - [ ] Form submission triggers capture all form types
  - **Evidence:** GTM Preview Mode trigger firing validation

- [ ] **Tag Implementation**
  - [ ] GA4 Configuration tag fires on all pages
  - [ ] GA4 Event tags fire with correct parameters
  - [ ] Custom HTML tags execute without JavaScript errors
  - [ ] Server-side tags route to correct endpoints
  - [ ] Consent settings prevent tags from firing when denied
  - **Evidence:** Tag Assistant analysis and GA4 DebugView logs

### Server-Side Infrastructure Validation
- [ ] **Webhook Security**
  - [ ] Stripe webhook signature verification working
  - [ ] Webhook endpoints reject invalid signatures
  - [ ] Input validation prevents malicious payload processing
  - [ ] Rate limiting protects against abuse
  - [ ] HTTPS enforced for all webhook endpoints
  - **Evidence:** Security testing results and webhook logs

- [ ] **Event Processing**
  - [ ] Purchase events process within 30 seconds
  - [ ] Idempotency prevents duplicate event processing
  - [ ] Failed events queue for retry with exponential backoff
  - [ ] Server events appear in GA4 within 5 minutes
  - [ ] Error handling logs issues without breaking processing
  - **Evidence:** Webhook processing logs and GA4 server event verification

- [ ] **Integration Reliability**
  - [ ] CRM contact creation succeeds >95% of attempts
  - [ ] MailerLite subscriber updates succeed >95% of attempts  
  - [ ] Failed integrations retry automatically
  - [ ] Manual recovery procedures work for failed events
  - [ ] Health check endpoints return accurate system status
  - **Evidence:** Integration success rate reports and manual recovery testing

---

## User Journey Flow Validation Checklist

### Critical Flow Testing
- [ ] **Cold Traffic to Purchase Flow**
  - [ ] Home page visit triggers page_view with correct page_id
  - [ ] Hero CTA click captures cta_click with source_section
  - [ ] Service page form interaction fires form_start event
  - [ ] Form submission creates lead_submit with UTM attribution
  - [ ] Pricing page visit shows pricing_view event
  - [ ] Checkout initiation fires checkout_start with pricing_tier
  - [ ] Payment completion triggers purchase_success server event
  - **Evidence:** Complete flow screenshots with Tag Assistant validation

- [ ] **Content to Newsletter Flow**
  - [ ] Article page visit fires page_view with content categorization
  - [ ] Scroll depth tracking captures user engagement
  - [ ] Newsletter form interaction triggers form_start
  - [ ] Newsletter signup creates newsletter_signup event
  - [ ] MailerLite automation triggers correctly
  - **Evidence:** Newsletter signup flow validation with automation confirmation

- [ ] **Direct Sales Consultation Flow**
  - [ ] Contact page visit with UTMs captures attribution
  - [ ] Contact form start triggers form_start event
  - [ ] Contact form submission creates contact_submit event
  - [ ] CRM opportunity creation succeeds
  - [ ] Sales team notification triggers
  - **Evidence:** Sales flow validation with CRM record verification

### Cross-Device Attribution Testing
- [ ] **Multi-Device Journey**
  - [ ] lead_id persists when switching devices (where technically possible)
  - [ ] Attribution maintains across email link clicks
  - [ ] Server-side events connect to original lead_id
  - [ ] Cross-device conversion attribution works in GA4
  - **Evidence:** Multi-device testing documentation with attribution verification

---

## Environment & Performance Validation Checklist

### Environment Separation Validation
- [ ] **Staging Environment**
  - [ ] test_mode=true flag on staging hostname
  - [ ] Staging GTM container ID differs from production
  - [ ] Staging GA4 property separate from production
  - [ ] Staging webhook endpoints don't affect production systems
  - [ ] Staging data excluded from production KPI dashboards
  - **Evidence:** Environment configuration verification and data separation proof

- [ ] **Production Environment**
  - [ ] test_mode=false flag on production hostname  
  - [ ] Production GTM container properly configured
  - [ ] Production GA4 property receiving clean data
  - [ ] Production webhook endpoints secured and monitored
  - [ ] Production consent management fully functional
  - **Evidence:** Production environment validation and monitoring setup

### Performance Impact Validation
- [ ] **Page Load Performance**
  - [ ] GTM container loads asynchronously without blocking rendering
  - [ ] Data layer initialization doesn't delay page interactivity
  - [ ] Tracking events don't interfere with form submissions
  - [ ] Server-side processing doesn't impact user-facing performance
  - [ ] Overall page load time impact <100ms
  - **Evidence:** Lighthouse performance reports before/after tracking implementation

- [ ] **Mobile Performance**
  - [ ] Tracking works consistently on iOS Safari
  - [ ] Tracking works consistently on Android Chrome
  - [ ] Mobile data layer events match desktop functionality
  - [ ] Mobile consent management works properly
  - [ ] Mobile server events process correctly
  - **Evidence:** Mobile device testing across iOS and Android platforms

---

## Cross-Browser Compatibility Checklist

### Desktop Browser Testing
- [ ] **Chrome (latest)**
  - [ ] All events fire correctly
  - [ ] lead_id persists properly
  - [ ] Consent management works
  - [ ] GTM Preview Mode functions
  - **Evidence:** Chrome testing screenshots

- [ ] **Firefox (latest)**
  - [ ] All events fire correctly
  - [ ] localStorage/cookie fallback works
  - [ ] Form tracking functions properly
  - [ ] Server events process correctly
  - **Evidence:** Firefox testing screenshots

- [ ] **Safari (latest)**
  - [ ] Tracking works with ITP restrictions
  - [ ] lead_id persistence adapted for Safari
  - [ ] Cookie handling complies with Safari policies
  - [ ] All critical events fire correctly
  - **Evidence:** Safari testing with ITP considerations documented

- [ ] **Edge (latest)**
  - [ ] All tracking functionality works
  - [ ] Consent management functions properly
  - [ ] Server integration works correctly
  - [ ] Performance impact acceptable
  - **Evidence:** Edge testing screenshots

### Mobile Browser Testing
- [ ] **iOS Safari**
  - [ ] Touch events tracked correctly
  - [ ] Form interactions work properly
  - [ ] lead_id persistence works within iOS limitations
  - [ ] Consent banner displays and functions correctly
  - **Evidence:** iOS Safari testing documentation

- [ ] **Android Chrome**
  - [ ] All tracking events function properly
  - [ ] Form submissions work correctly
  - [ ] Server events process from mobile interactions
  - [ ] Performance impact acceptable on mobile
  - **Evidence:** Android Chrome testing documentation

---

## Operational Readiness Checklist

### Monitoring & Alerting Setup
- [ ] **System Health Monitoring**
  - [ ] Webhook endpoint health checks configured
  - [ ] GTM container firing rate monitoring
  - [ ] GA4 event volume monitoring
  - [ ] CRM integration success rate monitoring
  - [ ] MailerLite integration monitoring
  - **Evidence:** Monitoring dashboard screenshots and alert configuration

- [ ] **Alert Configuration**
  - [ ] Webhook failure alerts configured (<95% success rate)
  - [ ] Event volume drop alerts (>20% decrease)
  - [ ] Server error rate alerts (>5% error rate)
  - [ ] Integration failure alerts (CRM, MailerLite)
  - [ ] PII violation alerts (immediate notification)
  - **Evidence:** Alert testing and notification verification

### Documentation Completeness
- [ ] **Technical Documentation**
  - [ ] Data layer implementation guide complete
  - [ ] GTM container documentation up to date
  - [ ] Server infrastructure documentation complete
  - [ ] Integration guides for all third-party systems
  - [ ] API documentation current and accurate
  - **Evidence:** Documentation review checklist with stakeholder sign-off

- [ ] **Operational Procedures**
  - [ ] Daily monitoring procedures documented
  - [ ] Troubleshooting guides created for common issues
  - [ ] Emergency response procedures documented
  - [ ] Change management processes defined
  - [ ] Team training materials complete
  - **Evidence:** Procedure documentation review and team training completion

### Team Readiness
- [ ] **Development Team**
  - [ ] Data layer utilities usage training completed
  - [ ] GTM container modification procedures understood
  - [ ] Debugging and validation procedures mastered
  - [ ] Emergency response procedures practiced
  - **Evidence:** Team training completion certificates and competency validation

- [ ] **Operations Team**
  - [ ] Daily monitoring procedures trained
  - [ ] Alert response procedures understood
  - [ ] Escalation procedures practiced
  - [ ] System recovery procedures validated
  - **Evidence:** Operations team readiness assessment and drill completion

---

## Final Production Readiness Gate

### Executive Checklist
- [ ] **Privacy & Compliance**: 100% of privacy requirements met with zero violations
- [ ] **Technical Functionality**: >99% of critical events firing correctly with all required parameters
- [ ] **Attribution Accuracy**: >95% of marketing attribution working correctly across channels
- [ ] **Operational Readiness**: All monitoring, documentation, and team training complete
- [ ] **Performance Impact**: <100ms impact on page load time; no user experience degradation
- [ ] **Cross-Environment**: Clear separation between staging and production data
- [ ] **Risk Mitigation**: All identified risks have documented mitigation strategies

### Sign-off Required From:
- [ ] **Privacy Officer**: Compliance requirements met
- [ ] **QA Lead**: All validation procedures passed with evidence
- [ ] **Development Lead**: Technical implementation complete and tested
- [ ] **DevOps Lead**: Infrastructure deployed and monitored
- [ ] **Marketing Director**: Attribution and analytics requirements satisfied
- [ ] **Analytics Manager**: Data quality and reporting ready
- [ ] **CTO**: Overall technical readiness approved for production

**Final Gate:** All checklist items completed with documented evidence and stakeholder sign-off before production deployment authorization.
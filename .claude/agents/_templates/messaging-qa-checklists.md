# Messaging Phase — QA & Quality Assurance Checklists

This document provides comprehensive quality assurance checklists for all Messaging Phase agents to ensure compliance, deliverability, and conversion optimization across Email and WhatsApp automation sequences.

## Master Quality Gates

### 🎯 Content Quality Gate
**Responsible**: Email Copy Lead (ECL) + Messaging Program Lead (MPL)

- [ ] **Subject Line Optimization**
  - A/B variants provided for all email assets
  - Character count optimized for mobile (30-50 chars)
  - Spam trigger words avoided (FREE, GUARANTEED, !!!)
  - Personalization variables tested with realistic data
  - Deliverability score analysis completed

- [ ] **Email Body Quality**
  - Single primary CTA per email (Action + Outcome formula)
  - Mobile-first design with scannable formatting
  - Voice consistency aligned with Avatar VoC research
  - Merge fields include graceful fallbacks
  - Risk-reversal elements included where appropriate

- [ ] **Cross-Channel Voice Consistency**
  - Email and WhatsApp messaging tone aligned
  - Avatar language patterns maintained across sequences
  - Proof integration consistent between channels
  - CTA approaches coordinated for attribution tracking

---

### 🔧 Technical Integration Gate
**Responsible**: Trigger & Journey Mapper (TJM) + Messaging Program Lead (MPL)

- [ ] **Sequence Logic Validation**
  - Entry conditions trigger correctly with test data
  - Exit conditions prevent abandoned sequences
  - Suppression rules activate when expected
  - Edge case handling documented and tested
  - Error recovery procedures validated

- [ ] **Trigger & Timing Optimization**
  - Europe/Lisbon timezone handling with DST awareness
  - Quiet hours respected (09:00-18:00 weekdays)
  - Weekend handling appropriate per channel (email enabled, WhatsApp disabled)
  - Business holiday suppression configured
  - Rate limiting prevents platform throttling

- [ ] **UTM Parameter Management**
  - All links include proper UTM parameters
  - UTM conventions align with v1B specifications
  - Dynamic parameter generation tested
  - Attribution tracking complete across channels
  - Test mode exclusion documented for analytics

- [ ] **Integration Specifications**
  - Email platform webhooks configured and tested
  - WhatsApp BSP integration specifications documented
  - CRM data synchronization validated
  - Cross-platform trigger coordination functional

---

### 📊 Evidence & Proof Gate
**Responsible**: VoC & Proof Curator (VPC) + Messaging Program Lead (MPL)

- [ ] **Claims Verification**
  - All significant claims backed by verifiable evidence
  - Case study metrics include methodology and timeframe
  - Testimonials have legal usage permissions and consent
  - Conservative reframes provided for unsupported claims
  - Proof mapping complete for all messaging assets

- [ ] **Testimonial Quality**
  - Specific outcomes mentioned (not generic praise)
  - Emotional language demonstrates transformation impact
  - Objections addressed through client experiences
  - Avatar alignment strong (same language patterns/situation)
  - Attribution complete with consent documentation

- [ ] **Social Proof Integration**
  - Client logos current with usage permissions
  - Awards and certifications verified and documented
  - Media mentions authentic with proper attribution
  - Cross-channel proof consistency maintained
  - Regular proof verification scheduled (quarterly audit)

---

### ⚖️ Compliance & Legal Gate
**Responsible**: Compliance & Deliverability Steward (CDS) + Messaging Program Lead (MPL)

- [ ] **GDPR Compliance**
  - Consent mechanisms implemented with timestamp tracking
  - Data retention policies documented and automated
  - Subject rights procedures (access, rectification, erasure) functional
  - Privacy policy updated for messaging channels
  - Cross-border data handling compliant with EU regulations

- [ ] **Email Deliverability**
  - SPF, DKIM, DMARC records configured and validated
  - Sender reputation monitoring active with alerting
  - Unsubscribe mechanisms functional in all templates
  - Bounce handling processes working correctly
  - List hygiene procedures automated

- [ ] **WhatsApp Compliance**
  - All templates approved by BSP with documentation
  - Template categories correctly assigned (Utility/Marketing)
  - Opt-in consent validated with proper storage
  - STOP keyword processing functional
  - Quality rating maintained above minimum thresholds
  - Rate limits configured and respected

---

### 🎨 WhatsApp Template Gate
**Responsible**: WhatsApp Template Lead (WTL) + Compliance & Deliverability Steward (CDS)

- [ ] **Template Structure Quality**
  - Variable syntax correct and sequential ({{1}}, {{2}}, etc.)
  - Character limits respected (Header: 60, Body: 1024, Footer: 60)
  - Buttons properly formatted with valid URLs/actions
  - Multi-language variants culturally adapted
  - Template naming follows BSP conventions

- [ ] **Content & Compliance**
  - Template category justification documented
  - Business use case clearly described with user benefit
  - Sample data provided for all variables
  - Opt-in consent mechanism documented for Marketing templates
  - No prohibited content (spam, misleading claims, inappropriate language)

- [ ] **Technical Integration**
  - Variable mapping tested with realistic data
  - Button functionality validated (URL, Quick Reply, Call)
  - Template approval status tracked and current
  - Integration with automation platform validated
  - Fallback strategies defined for template failures

---

## Agent-Specific QA Checklists

### Email Copy Lead (ECL) Quality Checklist

**Content Standards:**
- [ ] Subject lines follow Pain→Promise or Curiosity→Value structure
- [ ] Preheader text complements subject line (not redundant)
- [ ] Opening hook addresses Avatar's immediate pain/outcome
- [ ] Body provides specific, actionable value
- [ ] Single primary CTA with Action + Outcome clarity
- [ ] Risk reversal included where appropriate
- [ ] Email signature includes required legal/compliance elements

**Technical Quality:**
- [ ] HTML and plain text versions provided
- [ ] Mobile rendering tested across major email clients
- [ ] Merge fields tested with missing/empty data scenarios
- [ ] Links include proper UTM parameters (source=email, medium=automation)
- [ ] Tracking pixels configured for open/click measurement
- [ ] Unsubscribe link present and functional

**Voice & Brand Alignment:**
- [ ] Copy uses Avatar's actual language from VoC research
- [ ] Tone consistent with brand voice guidelines
- [ ] No marketing jargon - customer language exclusively
- [ ] Objection handling present where relevant
- [ ] Proof integration natural and credible

### WhatsApp Template Lead (WTL) Quality Checklist

**Template Quality:**
- [ ] Template name follows naming convention: company_category_purpose_language
- [ ] Category assignment appropriate (Utility for service delivery, Marketing for promotional)
- [ ] Language variants culturally adapted (pt-PT vs en-US)
- [ ] Character limits respected across all template components
- [ ] Variables sequential and mapped correctly

**Button Configuration:**
- [ ] URL buttons include UTM parameters (source=whatsapp, medium=automation)
- [ ] Quick Reply buttons have appropriate payload mapping
- [ ] Phone number buttons use correct international format
- [ ] Button text clear and action-oriented (max 25 characters)
- [ ] Maximum 3 buttons per template respected

**Compliance Readiness:**
- [ ] Template category justification documented
- [ ] Business use case description clear and user-focused
- [ ] Sample variable data provided for approval review
- [ ] Opt-in consent requirements specified for Marketing templates
- [ ] Template submission package complete with all required documentation

### Trigger & Journey Mapper (TJM) Quality Checklist

**Sequence Logic:**
- [ ] Entry conditions specific and validated with test data
- [ ] Exit conditions comprehensive (purchase_success, unsubscribed, etc.)
- [ ] Step timing optimized for engagement patterns
- [ ] Conditions between steps prevent double-sends or missed messages
- [ ] Sequence branching logic handles all user paths

**Suppression & Timing:**
- [ ] Suppression rules prevent over-messaging (active sales threads, support tickets)
- [ ] Quiet hours configured for Europe/Lisbon timezone
- [ ] Weekend handling appropriate per channel
- [ ] Holiday suppression configured with Portuguese holidays
- [ ] Rate limiting prevents platform throttling

**UTM & Attribution:**
- [ ] UTM parameters consistent across all generated links
- [ ] Campaign naming aligns with sequence ID (nopay, customer)
- [ ] Content parameter matches asset ID exactly
- [ ] Attribution setup complete for cross-channel measurement
- [ ] Test mode exclusion documented for analytics accuracy

**Integration Specifications:**
- [ ] Email platform configuration requirements documented
- [ ] WhatsApp BSP integration specifications complete
- [ ] CRM data synchronization requirements specified
- [ ] Webhook endpoints configured for sequence events
- [ ] Error handling and retry logic specified

### VoC & Proof Curator (VPC) Quality Checklist

**Evidence Quality:**
- [ ] All Level 1 claims have direct client testimonials or verified case studies
- [ ] Level 2 claims backed by aggregated data with methodology disclosed
- [ ] Level 3 claims supported by industry statistics from credible sources
- [ ] No unacceptable proof (fabricated testimonials, stock photos as client imagery)

**Testimonial Standards:**
- [ ] Specific problem/situation clearly described
- [ ] Solution implementation process explained
- [ ] Quantified results with numbers and timeframes
- [ ] Emotional impact of transformation included
- [ ] Strong recommendation with reasoning

**Legal & Consent:**
- [ ] Written permission obtained for all testimonial usage
- [ ] Consent covers all intended usage contexts (email, WhatsApp, website)
- [ ] Consent renewal dates tracked and managed
- [ ] GDPR compliance for testimonial data handling
- [ ] Right to withdraw consent procedures documented

**Format Optimization:**
- [ ] Email versions: short (1 line), medium (2-3 lines), long (full testimonial)
- [ ] WhatsApp versions optimized for character limits
- [ ] Portuguese translations culturally appropriate
- [ ] Cross-channel consistency maintained
- [ ] Attribution consistent (name, title, company, location)

### Compliance & Deliverability Steward (CDS) Quality Checklist

**GDPR & Privacy:**
- [ ] Consent collection mechanisms implemented and tested
- [ ] Granular consent options available (email marketing, WhatsApp marketing)
- [ ] Double opt-in configured for email marketing consent
- [ ] Consent withdrawal mechanisms functional (unsubscribe, STOP, account settings)
- [ ] Data retention policies automated with deletion schedules
- [ ] Privacy policy updated for messaging channels

**Email Authentication & Deliverability:**
- [ ] SPF record includes all sending sources (ESP, internal servers)
- [ ] DKIM signing configured and validated
- [ ] DMARC policy set to quarantine with reporting enabled
- [ ] Sender reputation scores above minimum thresholds
- [ ] Feedback loops configured with major ISPs
- [ ] Bounce handling automated with categorization

**WhatsApp BSP Management:**
- [ ] Template approval tracking system operational
- [ ] BSP relationship maintained with escalation procedures
- [ ] Quality rating monitoring with improvement procedures
- [ ] Rate limits configured to prevent violations
- [ ] Opt-in consent tracking with audit trail
- [ ] STOP keyword processing automated

**Monitoring & Alerting:**
- [ ] Deliverability metrics monitored with threshold alerts
- [ ] Compliance violation detection automated
- [ ] GDPR request processing tracked with SLA monitoring
- [ ] Template rejection alerts configured
- [ ] Sender reputation monitoring with trend analysis

## Cross-Agent Integration Validation

### Email ↔ WhatsApp Consistency Check
- [ ] Voice and tone aligned across channels
- [ ] Proof elements consistent in both formats
- [ ] CTA messaging coordinated for attribution
- [ ] Timing coordination prevents channel conflicts
- [ ] Opt-out mechanisms respect cross-channel preferences

### Copy ↔ Website Alignment Check  
- [ ] Brand voice consistent with website copy
- [ ] Proof elements align with website claims
- [ ] Block ID patterns compatible for cross-reference
- [ ] Measurement events align with website tracking
- [ ] Legal disclaimers consistent across properties

### Automation ↔ CRM Integration Check
- [ ] Lead data synchronization tested and validated
- [ ] Sequence enrollment triggers match CRM workflows
- [ ] Suppression rules integrate with CRM thread status
- [ ] Attribution data flows to CRM for sales context
- [ ] Opt-out preferences sync across systems

## Final Integration Testing Protocol

### 1. Smoke Testing (Day 1)
- [ ] All sequences trigger correctly with test data
- [ ] UTM parameters generate properly in all links
- [ ] Opt-out mechanisms functional across channels
- [ ] Basic integration points responsive

### 2. User Journey Testing (Day 2-3)
- [ ] Complete NO-PAY sequence walkthrough with test user
- [ ] Complete CUSTOMER sequence walkthrough with test purchase
- [ ] Cross-channel coordination tested (email → WhatsApp)
- [ ] Edge cases tested (timezone boundaries, weekend handling)

### 3. Compliance Validation (Day 4)
- [ ] GDPR consent mechanisms tested with real scenarios
- [ ] Email deliverability validated with seed list testing
- [ ] WhatsApp template approval status verified
- [ ] Legal compliance reviewed by qualified counsel

### 4. Performance & Scale Testing (Day 5)
- [ ] Load testing with realistic user volumes
- [ ] Rate limiting validated under peak conditions
- [ ] Error handling tested with system failures
- [ ] Recovery procedures validated

## Sign-off Criteria

### Content Quality Sign-off
- [ ] **MPL Approval**: All content meets brand voice and conversion standards
- [ ] **ECL Validation**: Email copy optimized for engagement and deliverability
- [ ] **WTL Confirmation**: WhatsApp templates approved and deployment-ready
- [ ] **VPC Verification**: All claims backed by appropriate evidence

### Technical Quality Sign-off
- [ ] **TJM Validation**: All automation logic tested and functioning correctly
- [ ] **Integration Testing**: Cross-platform functionality validated
- [ ] **Performance Testing**: System handles expected load without degradation
- [ ] **Monitoring Setup**: All alerts and monitoring systems operational

### Compliance Sign-off
- [ ] **CDS Certification**: All legal and regulatory requirements satisfied
- [ ] **Privacy Officer Review**: GDPR compliance verified and documented
- [ ] **Legal Counsel Review**: Risk mitigation strategies approved
- [ ] **Business Owner Approval**: Final business sign-off on messaging strategy

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Review Schedule**: Monthly (content), Quarterly (compliance), Annually (legal)  
**Owner**: Messaging Program Lead (MPL)  
**Approvers**: Legal Counsel, Privacy Officer, Business Owner